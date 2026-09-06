import { mountRefresh } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'
import { projects, categoryChips, projectCard, bindProjectDetails } from '../components/projects.js'

mountRefresh('explore')

function weeklyProjectSlide(project, index) {
  const description = project.description || `${project.subtitle} พร้อมเปิดรับคนที่อยากมาช่วยพัฒนาไอเดียและทดลองกับผู้ใช้จริง`
  return `<article class="weekly-project" aria-roledescription="สไลด์" aria-label="${index + 1} จาก ${projects.length}">
    <div class="weekly-project-copy">
      <span class="weekly-label">● โปรเจกต์เด่นประจำสัปดาห์</span>
      <h2>${project.name} — ${project.subtitle}</h2>
      <p>${description}</p>
      <p class="weekly-meta">${project.phase} · ${project.proof} · เปิดรับ ${project.role}</p>
      <button class="button button-light" data-project="${project.name}" type="button">ดูโปรเจกต์ →</button>
    </div>
    <div class="weekly-card">${projectCard(project)}</div>
  </article>`
}

function weeklyCarousel() {
  return `<div class="weekly-carousel" data-weekly-carousel aria-roledescription="carousel" aria-label="โปรเจกต์เด่นประจำสัปดาห์">
    <div class="weekly-viewport">
      <div class="weekly-track">${projects.map(weeklyProjectSlide).join('')}</div>
    </div>
    <div class="weekly-carousel-controls">
      <button class="weekly-arrow" data-weekly-prev type="button" aria-label="ดูโปรเจกต์ก่อนหน้า">←</button>
      <div class="weekly-dots" aria-label="เลือกโปรเจกต์">
        ${projects.map((project, index) => `<button class="weekly-dot${index === 0 ? ' is-active' : ''}" data-weekly-dot="${index}" type="button" aria-label="ดู ${project.name}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}
      </div>
      <button class="weekly-arrow" data-weekly-next type="button" aria-label="ดูโปรเจกต์ถัดไป">→</button>
      <span class="sr-only" data-weekly-status aria-live="polite"></span>
    </div>
    <p class="weekly-autoplay-hint">เลื่อนอัตโนมัติทุก 5 วินาที · วางเมาส์หรือโฟกัสเพื่อหยุดชั่วคราว</p>
  </div>`
}

document.querySelector('main').innerHTML = `
<section class="explore-intro"><div class="page-container"><p class="eyebrow">ค้นพบสิ่งที่นักศึกษากำลังสร้าง</p><h1>สำรวจโปรเจกต์</h1><p>ติดตามไอเดีย ทดลองใช้ Prototype และส่ง Feedback ให้โปรเจกต์ที่คุณสนใจ</p><div class="search-and-sort"><label class="search-field"><input id="projectSearch" type="search" aria-label="ค้นหาโปรเจกต์" placeholder="ค้นหาชื่อโปรเจกต์ ปัญหา หรือหมวดหมู่">${designIcon('challenge/imgIconSearch')}</label><select id="projectSort" aria-label="เรียงโปรเจกต์"><option value="featured">เรียงตาม: มาแรง</option><option value="popular">ผู้สนใจมากที่สุด</option><option value="name">ชื่อโปรเจกต์ A–Z</option></select></div><div class="chip-row quick-categories" data-category-group>${categoryChips()}</div></div></section>
<section class="explore-featured"><div class="section-heading-row"><h2>โปรเจกต์เด่นประจำสัปดาห์</h2><p>คัดจากความสนใจและ Feedback ในชุมชน</p></div>${weeklyCarousel()}
<div class="discovery-panel"><div class="section-heading-row"><div><h2>ค้นพบโปรเจกต์</h2><p>สำรวจไอเดีย Prototype และโปรเจกต์ที่กำลังทดลองกับผู้ใช้</p></div><span class="soft-link" id="projectCount" role="status">8 โปรเจกต์</span></div><div class="chip-row discovery-filters" data-category-group>${categoryChips()}</div><div class="discovery-grid" id="projectGrid" aria-live="polite"></div></div></section>`

function initWeeklyCarousel() {
  const carousel = document.querySelector('[data-weekly-carousel]')
  const track = carousel?.querySelector('.weekly-track')
  const slides = track ? [...track.children] : []
  if (!carousel || !track || slides.length < 2) return

  const dots = [...carousel.querySelectorAll('[data-weekly-dot]')]
  const status = carousel.querySelector('[data-weekly-status]')
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
  const firstClone = slides[0].cloneNode(true)
  const lastClone = slides.at(-1).cloneNode(true)
  firstClone.setAttribute('aria-hidden', 'true')
  lastClone.setAttribute('aria-hidden', 'true')
  firstClone.inert = true
  lastClone.inert = true
  track.prepend(lastClone)
  track.append(firstClone)

  let current = 0
  let position = 1
  let timer
  let animating = false
  let pointerInside = false
  let focusInside = false

  function placeTrack(animated = true) {
    track.classList.toggle('is-jumping', !animated)
    track.style.transform = `translate3d(-${position * 100}%, 0, 0)`
    if (!animated) requestAnimationFrame(() => track.classList.remove('is-jumping'))
  }

  function updateState(announce = false) {
    slides.forEach((slide, index) => {
      const active = index === current
      slide.setAttribute('aria-hidden', String(!active))
      slide.inert = !active
    })
    dots.forEach((dot, index) => {
      const active = index === current
      dot.classList.toggle('is-active', active)
      dot.setAttribute('aria-current', String(active))
    })
    if (announce) status.textContent = `${projects[current].name} สไลด์ ${current + 1} จาก ${slides.length}`
  }

  function stopAutoplay() {
    clearInterval(timer)
  }

  function syncAutoplay() {
    stopAutoplay()
    if (pointerInside || focusInside || document.hidden || motionPreference.matches) return
    timer = setInterval(() => move(1), 5000)
  }

  function move(direction, initiatedByUser = false) {
    if (animating) return
    animating = true
    position += direction
    current = (current + direction + slides.length) % slides.length
    updateState(initiatedByUser)
    placeTrack()
    if (initiatedByUser) syncAutoplay()
  }

  function goTo(index) {
    if (animating || index === current) return
    current = index
    position = index + 1
    animating = true
    updateState(true)
    placeTrack()
    syncAutoplay()
  }

  track.addEventListener('transitionend', event => {
    if (event.propertyName !== 'transform') return
    if (position === 0) {
      position = slides.length
      placeTrack(false)
    } else if (position === slides.length + 1) {
      position = 1
      placeTrack(false)
    }
    animating = false
  })
  carousel.querySelector('[data-weekly-prev]').addEventListener('click', () => move(-1, true))
  carousel.querySelector('[data-weekly-next]').addEventListener('click', () => move(1, true))
  dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.weeklyDot))))
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') move(-1, true)
    if (event.key === 'ArrowRight') move(1, true)
  })
  carousel.addEventListener('pointerenter', () => { pointerInside = true; syncAutoplay() })
  carousel.addEventListener('pointerleave', () => { pointerInside = false; syncAutoplay() })
  carousel.addEventListener('focusin', () => { focusInside = true; syncAutoplay() })
  carousel.addEventListener('focusout', () => requestAnimationFrame(() => {
    focusInside = carousel.contains(document.activeElement)
    syncAutoplay()
  }))
  document.addEventListener('visibilitychange', syncAutoplay)
  motionPreference.addEventListener?.('change', syncAutoplay)

  updateState()
  placeTrack(false)
  syncAutoplay()
}

const params = new URLSearchParams(location.search)
const search = document.querySelector('#projectSearch')
search.value = params.get('q') || ''
let category = params.get('category') || 'ทั้งหมด'
function render() {
  const query = search.value.trim().toLowerCase()
  let filtered = projects.filter(p => (category === 'ทั้งหมด' || p.category === category || category === 'ชุมชน' && p.category === 'สุขภาพและชุมชน') && [p.name,p.subtitle,p.category,p.role,p.tags || ''].join(' ').toLowerCase().includes(query))
  const sort = document.querySelector('#projectSort').value
  if (sort === 'popular') filtered.sort((a,b)=>b.score-a.score)
  if (sort === 'name') filtered.sort((a,b)=>a.name.localeCompare(b.name))
  document.querySelector('#projectGrid').innerHTML = filtered.length ? filtered.map(p=>projectCard(p)).join('') : '<div class="empty-state"><h2>ไม่พบโปรเจกต์ที่ค้นหา</h2><p>ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p></div>'
  document.querySelector('#projectCount').textContent = filtered.length + ' โปรเจกต์'
  document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('is-active',b.dataset.category===category);b.setAttribute('aria-pressed',String(b.dataset.category===category))})
}
document.querySelectorAll('[data-category-group]').forEach(group=>group.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;render()}}))
search.addEventListener('input',render)
document.querySelector('#projectSort').addEventListener('change',render)
render()
initWeeklyCarousel()
bindProjectDetails()
