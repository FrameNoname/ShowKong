import { mountRefresh, openDialog } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'

mountRefresh('challenges')
document.querySelector('[data-shared-footer]').remove()
const challenges = [
  { id: 'localbiz', title: 'ออกแบบเมนูใหม่ให้ร้านน้ำอ้อย', organization: 'LocalBiz Network', category: 'Design', tag: 'UX/UI Design', tags: ['UX/UI Design','Branding','Local Business'], description: 'สร้างประสบการณ์เลือกเมนูที่เข้าใจง่าย ช่วยให้ลูกค้าตัดสินใจเร็วขึ้น และเพิ่มยอดขายให้ร้านค้าท้องถิ่น', reward: 25000, deadline: '18 ก.ย. 2026', fullDeadline: '18 กันยายน 2026', team: 'ทีม 3–4 คน', featured: true },
  { id: 'campus', title: 'ออกแบบจุดแยกขยะที่คนอยากใช้', organization: 'MFU Green Campus', category: 'Social Impact', tag: 'Sustainability', description: 'คิดประสบการณ์และระบบรางวัลที่ทำให้นักศึกษาแยกขยะได้ง่ายและอยากกลับมาใช้อีก', reward: 15000, deadline: '25 ก.ย. 2026' },
  { id: 'safety', title: 'ทำให้การเดินทางกลับหอปลอดภัยขึ้น', organization: 'Chiang Rai Smart City', category: 'Technology', tag: 'Campus Safety', description: 'สำรวจปัญหาและออกแบบบริการดิจิทัลสำหรับนักศึกษาที่เดินทางช่วงกลางคืน', reward: 20000, deadline: '30 ก.ย. 2026' },
  { id: 'portfolio', title: 'สร้าง Portfolio ที่ HR ตรวจสอบได้', organization: 'CareerLink Thailand', category: 'Business', tag: 'Future of Work', description: 'ออกแบบวิธีนำเสนอผลงาน บทบาท และหลักฐานการทำงานให้นักศึกษาใช้ได้จริง', reward: 18000, deadline: '5 ต.ค. 2026' },
]
const money = n => n.toLocaleString('en-US') + ' บาท'

function heroSlide(challenge, index) {
  return `<article class="challenge-hero-slide" aria-roledescription="สไลด์" aria-label="${index + 1} จาก ${challenges.length}">
    <div class="page-container challenge-hero-inner">
      <div>
        <span class="sponsored-label">SPONSORED CHALLENGE · ${challenge.organization}</span>
        <h1>${challenge.title}</h1>
        <p>${challenge.description}</p>
        <div class="hero-facts"><span>${challenge.category}</span><span>${challenge.tag}</span><span>ส่งภายใน ${challenge.deadline}</span></div>
      </div>
      <div class="prize-card">
        ${designIcon('challenge/imgIllustrationTrophy')}
        <small>รางวัลสำหรับทีมที่ชนะ</small>
        <strong>${money(challenge.reward)}</strong>
        <p>โดย ${challenge.organization}</p>
        <p class="prize-deadline">ปิดรับผลงาน ${challenge.fullDeadline || challenge.deadline}</p>
        <button class="button button-primary full-width" type="button" data-challenge="${challenge.id}">ดูรายละเอียดโจทย์</button>
      </div>
    </div>
  </article>`
}

function heroCarousel() {
  return `<div class="challenge-hero-carousel" data-challenge-carousel aria-roledescription="carousel" aria-label="ชาเลนจ์จากองค์กร">
    <div class="challenge-hero-viewport"><div class="challenge-hero-track">${challenges.map(heroSlide).join('')}</div></div>
    <div class="challenge-hero-controls">
      <button class="challenge-hero-arrow" data-challenge-prev type="button" aria-label="ดูชาเลนจ์ก่อนหน้า">←</button>
      <div class="challenge-hero-dots" aria-label="เลือกชาเลนจ์">${challenges.map((challenge, index) => `<button class="challenge-hero-dot${index === 0 ? ' is-active' : ''}" data-challenge-dot="${index}" type="button" aria-label="ดู ${challenge.title}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}</div>
      <button class="challenge-hero-arrow" data-challenge-next type="button" aria-label="ดูชาเลนจ์ถัดไป">→</button>
      <span class="sr-only" data-challenge-status aria-live="polite"></span>
    </div>
  </div>`
}

document.querySelector('main').innerHTML = `
<section class="challenge-hero">${heroCarousel()}</section>
<section class="challenge-list page-container"><div class="section-heading-row"><div><h2>ชาเลนจ์ที่เปิดรับ</h2><p>เลือกโจทย์ที่ตรงกับความสนใจและทักษะของทีมคุณ</p></div><span class="soft-link" id="challengeCount" role="status">4 โจทย์กำลังเปิดรับ</span></div><div class="challenge-filters"><label class="search-field">${designIcon('challenge/imgIconSearch')}<input id="challengeSearch" type="search" placeholder="ค้นหาชาเลนจ์หรือองค์กร" aria-label="ค้นหาชาเลนจ์หรือองค์กร"></label><div class="chip-row" id="challengeCategories">${['ทั้งหมด','Design','Technology','Business','Social Impact'].map((c,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-category="${c}" aria-pressed="${i===0}">${c}</button>`).join('')}</div></div><div id="challengeResults" aria-live="polite"></div><p class="sample-note">ตัวอย่างชาเลนจ์ตามดีไซน์ · ยังไม่เปิดรับสมัครผ่านระบบ</p></section>`

function initHeroCarousel() {
  const carousel = document.querySelector('[data-challenge-carousel]')
  const track = carousel?.querySelector('.challenge-hero-track')
  const slides = track ? [...track.children] : []
  if (!carousel || !track || slides.length < 2) return

  const dots = [...carousel.querySelectorAll('[data-challenge-dot]')]
  const status = carousel.querySelector('[data-challenge-status]')
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
    track.style.transform = `translate3d(-${position * 100}%,0,0)`
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
    if (announce) status.textContent = `${challenges[current].title} สไลด์ ${current + 1} จาก ${slides.length}`
  }

  function stopAutoplay() { clearInterval(timer) }
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
  carousel.querySelector('[data-challenge-prev]').addEventListener('click', () => move(-1, true))
  carousel.querySelector('[data-challenge-next]').addEventListener('click', () => move(1, true))
  dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.challengeDot))))
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

let category = 'ทั้งหมด'
function card(c) {
  return `<article class="challenge-item"><div class="challenge-item-header"><div class="challenge-tags"><span>${c.tag}</span></div><span class="organization">${c.organization}</span></div><h3>${c.title}</h3><p class="challenge-description">${c.description}</p><dl><div><dt>รางวัล</dt><dd>${money(c.reward)}</dd></div><div><dt>กำหนดส่ง</dt><dd>${c.deadline}</dd></div></dl><button class="button button-primary full-width" type="button" data-challenge="${c.id}">ดูรายละเอียดโจทย์</button></article>`
}
function featured(c) {
  return `<article class="featured-challenge"><div><div><span class="featured-label">FEATURED CHALLENGE</span><span class="organization">${c.organization}</span></div><h3>${c.title}</h3><p class="challenge-description">${c.description}</p><div class="challenge-tags">${c.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="challenge-meta"><span>${c.team}</span><span>ส่งผลงานภายใน ${c.deadline}</span><span>มี Mentor ให้คำแนะนำ</span></div></div><div class="featured-prize"><p>เงินรางวัลรวม</p><strong>${money(c.reward)}</strong><p>พร้อมใบประกาศและโอกาสนำเสนอผลงานกับองค์กร</p><button type="button" class="button button-primary" data-challenge="${c.id}">ดูรายละเอียดโจทย์</button></div></article>`
}
function render() {
  const query = document.querySelector('#challengeSearch').value.trim().toLowerCase()
  const visible = challenges.filter(c=>(category==='ทั้งหมด'||c.category===category) && [c.title,c.organization,c.description,c.tag].join(' ').toLowerCase().includes(query))
  const top = visible.find(c=>c.featured)
  const others = visible.filter(c=>!c.featured)
  document.querySelector('#challengeCount').textContent = visible.length + ' โจทย์กำลังเปิดรับ'
  document.querySelector('#challengeResults').innerHTML = visible.length ? (top ? featured(top) : '') + (others.length ? `<div class="section-heading-row challenge-subheading"><h3>${top?'โจทย์อื่นที่น่าสนใจ':'โจทย์ที่ค้นพบ'}</h3><p>อัปเดตโจทย์ใหม่ทุกสัปดาห์</p></div><div class="challenge-grid">${others.map(card).join('')}</div>` : '') : '<div class="empty-state"><h2>ยังไม่พบชาเลนจ์ที่ตรงกับคำค้นหา</h2><p>ลองเปลี่ยนหมวดหมู่หรือชื่อองค์กร</p></div>'
}
document.querySelector('#challengeSearch').addEventListener('input',render)
document.querySelector('#challengeCategories').addEventListener('click',e=>{
  const b=e.target.closest('[data-category]'); if(!b)return
  category=b.dataset.category
  e.currentTarget.querySelectorAll('button').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))})
  render()
})
document.querySelector('main').addEventListener('click',e=>{
  const b=e.target.closest('[data-challenge]'); if(!b)return
  const c=challenges.find(c=>c.id===b.dataset.challenge)
  openDialog(c.title,`<p class="dialog-description">${c.organization}</p><div class="challenge-tags"><span>${c.tag}</span></div><p class="dialog-description">${c.description}</p><div class="join-summary"><strong>รางวัล ${money(c.reward)}</strong><span>กำหนดส่ง ${c.deadline}</span>${c.team?`<span>${c.team} · มี Mentor ให้คำแนะนำ</span>`:''}</div><p class="sample-note">โจทย์ตัวอย่างจากดีไซน์ ยังไม่เปิดรับสมัครผ่านระบบ</p><a class="button button-primary full-width" href="/pages/post.html?challenge=${encodeURIComponent(c.title)}">สร้างโพสต์หาเพื่อนร่วมทีม</a>`)
})
render()
initHeroCarousel()
