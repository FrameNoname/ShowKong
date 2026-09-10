import '../style.css'
import '../refresh.css'
import '../home-cta.css'
import '../home-journey.css'
import { siteFooter } from '../components/shared.js'
import { openLoginModal } from '../components/login-modal.js'
import { supabase } from '../lib/supabase.js'
import { designIcon } from '../components/design-assets.js'
import { projects, categoryChips, projectCard, bindProjectDetails } from '../components/projects.js'

document.querySelector('[data-shared-header]').innerHTML = `
<header class="site-header">
  <a class="brand" href="/"><span class="brand-mark">S</span><span>ShowKong</span></a>
  <nav class="main-nav" aria-label="เมนูหลัก"><a class="nav-link is-active" href="/" aria-current="page">หน้าแรก</a><a class="nav-link" href="#featured">โปรเจกต์มาแรง</a><a class="nav-link" href="#works">ผลงานมาแรง</a><a class="nav-link" href="/pages/post.html">สร้างโปรเจกต์</a></nav>
  <div class="header-actions"><button class="button button-neutral js-open-login" type="button">เข้าสู่ระบบ</button></div>
  <button class="mobile-menu-button" type="button" aria-label="เปิดเมนู" aria-expanded="false">เมนู</button>
</header>`
document.querySelector('main').innerHTML = `
<section class="discovery-hero">
  ${designIcon('home/imgHeroAmbientGlow', 'hero-ambient')}
  <div class="page-container discovery-hero-inner">
    <div class="discovery-hero-copy">
      <p class="eyebrow">SHOWKONG — พื้นที่ของนักสร้างรุ่นใหม่</p>
      <h1>เริ่มสร้างโปรเจกต์กับเรา</h1>
      <p>ค้นหาโปรเจกต์ที่สนใจ เจอเพื่อนร่วมทีม และช่วยกันเปลี่ยนไอเดียให้เป็นผลงานจริง</p>
      <form action="/pages/explore-projects.html" class="hero-search"><input name="q" aria-label="ค้นหาโปรเจกต์ ทักษะ หรือทีม" type="search" placeholder="ค้นหาโปรเจกต์ ทักษะ หรือทีมที่สนใจ"><button type="submit" aria-label="ค้นหา">${designIcon('home/imgSearchIcon')}</button></form>
      <a class="start-project-link" href="/pages/post.html">หรือเริ่มสร้างโปรเจกต์ของคุณ →</a>
    </div>
    <div class="collaboration-visual" aria-label="ตัวอย่างโปรเจกต์ SheetQuest">
      <div class="collaboration-background has-image"><img class="collaboration-background-image" src="/projects/sheetquest.webp" alt="" width="960" height="600">${designIcon('home/imgVisualGlow', 'visual-ambient')}</div>
      <article class="collaboration-card"><span class="status-pill">${designIcon('home/imgStatusDot')}เปิดรับสมาชิกใหม่</span><h2>SheetQuest</h2><p>เปลี่ยนไฟล์เรียนให้เป็นเกม พร้อมสร้างแบบทดสอบและแฟลชการ์ดด้วย AI</p><div class="mini-tags"><span>EdTech</span><span>AI</span><span>Gamification</span></div><div class="collaboration-members"><span>สมาชิกปัจจุบัน 3 คน</span>${designIcon('home/imgTeamAvatars', 'team-avatars')}</div></article>
      <div class="collaboration-proof">${designIcon('home/imgProofIcon')}พร้อมทดลองกับผู้ใช้</div>
      <div class="collaboration-role"><small>ตำแหน่งที่เปิดรับ</small><strong>UX Researcher</strong></div>
    </div>
  </div>
</section>
<section class="trending-section" id="featured"><div class="discovery-panel"><div class="section-heading-row"><div><h2>โปรเจกต์มาแรง</h2><p>ค้นหาไอเดียที่น่าสนใจ แล้วเข้าไปดูทีมที่กำลังเปิดรับสมาชิก</p></div><a class="soft-link" href="/pages/explore-projects.html">ดูโปรเจกต์ทั้งหมด →</a></div><div class="chip-row discovery-filters">${categoryChips()}</div><div class="discovery-grid" id="homeProjects" aria-live="polite">${projects.map(p=>projectCard(p,true,true)).join('')}</div></div></section>
<section class="home-works" id="works"><div class="page-container"><div class="section-heading-row"><div><p class="eyebrow">ผลงานเด่นประจำสัปดาห์</p><h2>ผลงานมาแรง</h2></div><a class="soft-link" href="/pages/show-kong.html">ดูผลงานทั้งหมด →</a></div><div class="work-grid">${projects.slice(0,3).map((p,i)=>`<a class="work-card" href="/pages/show-kong.html"><div class="work-cover cover-${p.color}"><img class="work-cover-image" src="${p.image}" alt="" width="960" height="600"><span class="work-category">${p.category}</span><h3>${p.name}</h3></div><div class="work-copy"><small>${p.tags}</small><p>${p.description}</p><div class="work-metrics">${p.metrics.map((m,j)=>`<div><strong>${designIcon('home/imgMetricIcon'+(j||''))}${m}</strong><small>${['เข้าชม','ถูกใจ',i===1?'ใช้งานจริง':'ผู้ทดลอง'][j]}</small></div>`).join('')}</div></div></a>`).join('')}</div></div></section>
<section class="home-journey" id="how-it-works" aria-labelledby="journey-title">
  <div class="page-container">
    <div class="journey-heading">
      <div><p class="journey-eyebrow"><span aria-hidden="true">✦</span> เล็ก ๆ วันนี้ เป็นผลงานจริงวันหน้า</p><h2 id="journey-title">จาก “อยากลองทำ”<br>สู่ <span>“เราทำได้แล้ว”</span></h2></div>
      <p class="journey-intro">ShowKong ช่วยให้ทุกก้าวมีความหมาย<br>ตั้งแต่ไอเดียแรก เพื่อนร่วมทีม ไปจนถึงผลงานที่ภูมิใจ</p>
    </div>
    <ol class="journey-steps" role="list">
      <li class="journey-step journey-idea">
        <div class="journey-marker"><span>01</span><small>เริ่มจากคุณ</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-note"><span class="journey-note-label">MY NEXT IDEA <span>✦</span></span><strong>ถ้ามีแอปที่ช่วยให้<br>การเรียนสนุกขึ้นล่ะ?</strong><div class="journey-note-lines"><i></i><i></i></div><span class="journey-note-tag">Education</span></div><span class="journey-spark">✧</span></div>
        <div class="journey-copy"><h3>เล่าไอเดียที่อยากทำ</h3><p>บอกสิ่งที่อยากสร้าง ปัญหาที่อยากแก้ และทักษะที่ยังขาด ให้คนที่สนใจได้มาเห็น</p><span class="journey-outcome">ไอเดียได้ก้าวแรก</span></div>
      </li>
      <li class="journey-step journey-team">
        <div class="journey-marker"><span>02</span><small>เจอคนที่ใช่</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-team-stack"><div><span class="journey-person person-design">D</span><span><strong>Designer</strong><small>เติมมุมมองใหม่</small></span><b>＋</b></div><div><span class="journey-person person-dev">&lt;/&gt;</span><span><strong>Developer</strong><small>ช่วยให้ไอเดียเป็นจริง</small></span><b>＋</b></div></div><span class="journey-match">✦ ต่างทักษะ เป้าหมายเดียวกัน</span></div>
        <div class="journey-copy"><h3>เติมทีมให้ครบมุม</h3><p>เจอเพื่อนต่างคณะที่สนใจเรื่องเดียวกัน นำความถนัดของแต่ละคนมาสร้างไปด้วยกัน</p><span class="journey-outcome">มีเพื่อนร่วมทาง</span></div>
      </li>
      <li class="journey-step journey-test">
        <div class="journey-marker"><span>03</span><small>ลองแล้วเรียนรู้</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-demo"><span><i></i><i></i><i></i><small>Demo / version 01</small></span><div class="journey-demo-content"><span>▷</span><div><strong>ลองใช้ไอเดียของเรา</strong><small>พร้อมรับมุมมองใหม่ ๆ</small></div></div></div><div class="journey-feedback"><span>“</span><p>ลองแล้ว! ถ้าเพิ่มตรงนี้<br>จะใช้ง่ายขึ้นอีกนะ</p><b>↗</b></div></div>
        <div class="journey-copy"><h3>ลองจริง แล้วไปต่อ</h3><p>แชร์ Demo ให้ชุมชนทดลอง รับ Feedback และพัฒนาไอเดียจากเสียงของผู้ใช้จริง</p><span class="journey-outcome">ได้เรียนรู้จากการลงมือ</span></div>
      </li>
      <li class="journey-step journey-work">
        <div class="journey-marker"><span>04</span><small>ภูมิใจกับสิ่งที่สร้าง</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-portfolio"><img src="/projects/sheetquest.webp" alt="" width="960" height="600" loading="lazy"><div><small>BUILT TOGETHER</small><strong>จากไอเดีย สู่ผลงานจริง</strong><span>Design · Development</span></div></div><span class="journey-finish">✓ ผลงานที่เล่าเรื่องของคุณ</span></div>
        <div class="journey-copy"><h3>เปลี่ยนเป็นพอร์ตของคุณ</h3><p>เก็บบทบาท สิ่งที่ได้ลงมือทำ และผลลัพธ์ เป็นผลงานที่บอกได้ว่าคุณทำอะไรเป็น</p><span class="journey-outcome">มีผลงานให้โอกาสต่อไป</span></div>
      </li>
    </ol>
  </div>
</section>
<section class="home-create page-container" aria-labelledby="home-create-title">
  <div class="home-create-copy">
    <p class="home-create-eyebrow"><span aria-hidden="true">✦</span> พื้นที่เล็ก ๆ สำหรับไอเดียใหญ่ ๆ</p>
    <h2 id="home-create-title">มีไอเดียแล้ว?<br><span>มาเริ่มไปด้วยกัน</span></h2>
    <p class="home-create-description">ไม่ต้องเก่งทุกอย่าง ก็เริ่มสร้างได้<br>แชร์สิ่งที่อยากทำ แล้วหาเพื่อนมาช่วยเติมทักษะที่ขาด</p>
    <div class="home-create-actions">
      <a class="button home-create-primary" href="/pages/post.html">เริ่มสร้างโปรเจกต์ <span aria-hidden="true">↗</span></a>
      <a class="home-create-guide" href="#how-it-works">ดูวิธีเริ่มต้น <span aria-hidden="true">→</span></a>
    </div>
    <p class="home-create-note">เริ่มจากไอเดียสั้น ๆ แล้วค่อยต่อยอดไปด้วยกัน</p>
  </div>
  <div class="home-create-visual" aria-hidden="true">
    <div class="home-create-orbit"></div>
    <div class="home-create-sticker">ไอเดีย + คนที่ใช่ = เป็นไปได้ <span>✦</span></div>
    <div class="home-create-preview">
      <div class="home-create-cover"><img src="/projects/greenloop.webp" alt="" width="960" height="600" loading="lazy"><span>จุดเริ่มต้นของสิ่งใหม่</span></div>
      <div class="home-create-preview-copy"><small>YOUR NEXT PROJECT</small><h3>โปรเจกต์ใหม่ของคุณ</h3><p>หนึ่งไอเดีย หลายทักษะ ความเป็นไปได้อีกเพียบ</p><div class="home-create-skills"><span>Design</span><span>Development</span><span>Marketing</span></div><div class="home-create-team"><div class="home-create-avatars"><span>คุณ</span><span>✦</span><span>＋</span></div><span>เติมทีมให้ไอเดียของคุณ</span></div></div>
    </div>
    <div class="home-create-caption"><span>↳</span> ชิ้นต่อไปในพอร์ต อาจเริ่มจากตรงนี้</div>
  </div>
</section>`
document.querySelector('[data-shared-footer]').innerHTML = siteFooter()
document.querySelector('.discovery-filters').addEventListener('click', e=>{
  const button=e.target.closest('[data-category]')
  if(!button)return
  document.querySelectorAll('[data-category]').forEach(b=>{ b.classList.toggle('is-active',b===button); b.setAttribute('aria-pressed',String(b===button)) })
  const filtered=projects.filter(p=>button.dataset.category==='ทั้งหมด'||p.category===button.dataset.category)
  document.querySelector('#homeProjects').innerHTML=filtered.map(p=>projectCard(p,true,true)).join('')
})
document.querySelector('.mobile-menu-button').addEventListener('click', e=>{
  const open=document.querySelector('.main-nav').classList.toggle('is-open')
  e.currentTarget.setAttribute('aria-expanded',String(open))
})
document.querySelector('.js-open-login').addEventListener('click',()=>openLoginModal())
if(location.hash==='#login')openLoginModal()
bindProjectDetails()

<<<<<<< HEAD
if (ctaSlot) ctaSlot.innerHTML = homeProjectCta()
if (footerSlot) footerSlot.innerHTML = siteFooter()

document.querySelectorAll('.js-open-post').forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = '/pages/register.html'
  })
})

document.querySelectorAll('.js-open-login, [href="/pages/login.html"], [href="./pages/login.html"]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    openLoginModal()
  })
})

const menuButton = document.querySelector('.mobile-menu-button')

menuButton?.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav')
  const isOpen = nav?.classList.toggle('is-open') ?? false
  menuButton.setAttribute('aria-expanded', String(isOpen))
})

async function redirectSignedInUser() {
  if (!supabase) return

=======
document.addEventListener('click',async event=>{
  const link=event.target.closest('.main-nav a[href="/pages/post.html"],.start-project-link,.home-create-primary,.trending-section .soft-link,.home-works a[href],.refresh-dialog a[href^="/pages/team-detail"],.refresh-dialog a[href="/pages/find-team.html"]')
  if(!link)return
  event.preventDefault()
  const destination=new URL(link.href,location.origin)
  const redirectTo=destination.pathname+destination.search+destination.hash
  if(supabase){
    const {data,error}=await supabase.auth.getSession()
    if(!error&&data.session){location.assign(redirectTo);return}
  }
  const sourceDialog=link.closest('dialog')
  if(sourceDialog){
    sourceDialog.addEventListener('close',()=>openLoginModal({redirectTo}),{once:true})
    sourceDialog.close()
  }else{
    openLoginModal({redirectTo})
  }
})

if (supabase) {
>>>>>>> origin/plume-dev
  const { data, error } = await supabase.auth.getSession()
  if (!error && data.session) window.location.replace('/pages/feed.html')
}

<<<<<<< HEAD
redirectSignedInUser()

if (window.location.hash === '#login') {
  openLoginModal()
}

const spotlightProjects = [
  {
    id: 'sheetquest',
    shortName: 'SheetQuest',
    theme: 'purple',
    badge: 'ShowKong Spotlight · กำลังมาแรง',
    title: 'SheetQuest — เรียนให้เหมือนเล่นเกม',
    hook: 'เปลี่ยนบทเรียนธรรมดา ให้กลายเป็นภารกิจที่นักเรียนอยากทำ',
    summary: 'เปลี่ยนบทเรียนและแบบฝึกหัดให้เป็นภารกิจที่สนุก มีเป้าหมาย และวัดความก้าวหน้าได้',
    tags: ['Education', 'UX/UI', 'Frontend'],
    stats: [
      { value: '1.2K', label: 'Views' },
      { value: '94', label: 'Likes' },
      { value: '3/5', label: 'คนในทีม' },
    ],
    roleLabel: 'เหลือ 1 ตำแหน่ง',
    role: 'กำลังหา Marketing 1 คน',
    image: '/images/projects/sheetquest-preview.webp',
    imageAlt: 'หน้าจอแดชบอร์ดภารกิจการเรียนของ SheetQuest',
    detailUrl: '/pages/showkong.html?project=sheetquest',
    joinUrl: '/pages/register.html?project=sheetquest',
  },
  {
    id: 'greenloop',
    shortName: 'GreenLoop',
    theme: 'green',
    badge: 'ShowKong Spotlight · สร้างผลกระทบ',
    title: 'GreenLoop — แยกขยะให้มีรางวัล',
    hook: 'เปลี่ยนขยะในมหาวิทยาลัย ให้กลายเป็นรางวัลที่ทุกคนอยากสะสม',
    summary: 'ระบบสะสมแต้มจากการแยกขยะภายในมหาวิทยาลัย พร้อมรางวัลจากร้านค้ารอบชุมชน',
    tags: ['Sustainability', 'Backend', 'Marketing'],
    stats: [
      { value: '860', label: 'Views' },
      { value: '71', label: 'Likes' },
      { value: '4/5', label: 'คนในทีม' },
    ],
    roleLabel: 'เหลือ 1 ตำแหน่ง',
    role: 'กำลังหา Mobile Developer 1 คน',
    image: '/images/projects/greenloop-preview.webp',
    imageAlt: 'หน้าจอสะสมแต้มจากการแยกขยะของ GreenLoop',
    detailUrl: '/pages/showkong.html?project=greenloop',
    joinUrl: '/pages/register.html?project=greenloop',
  },
  {
    id: 'safewalk',
    shortName: 'SafeWalk',
    theme: 'teal',
    badge: 'ShowKong Spotlight · ชุมชนกำลังสนใจ',
    title: 'SafeWalk — กลับหออย่างมั่นใจ',
    hook: 'เส้นทางกลับหอที่ปลอดภัยขึ้น จากข้อมูลของคนที่เดินจริง',
    summary: 'แอปแนะนำเส้นทางปลอดภัยสำหรับนักศึกษา โดยอ้างอิงข้อมูล แสงสว่าง และรายงานจากผู้ใช้จริง',
    tags: ['Community', 'Mobile Dev', 'Research'],
    stats: [
      { value: '1K', label: 'Views' },
      { value: '88', label: 'Likes' },
      { value: '3/4', label: 'คนในทีม' },
    ],
    roleLabel: 'เหลือ 1 ตำแหน่ง',
    role: 'กำลังหา UX Researcher 1 คน',
    image: '/images/projects/safewalk-preview.webp',
    imageAlt: 'หน้าจอแผนที่เส้นทางกลับหอที่ปลอดภัยของ SafeWalk',
    detailUrl: '/pages/showkong.html?project=safewalk',
    joinUrl: '/pages/register.html?project=safewalk',
  },
]

function setupSpotlightCarousel() {
  const carousel = document.querySelector('[data-project-carousel]')
  const card = carousel?.querySelector('[data-spotlight-card]')

  if (!carousel || !card) return

  const elements = {
    image: card.querySelector('[data-spotlight-image]'),
    badge: card.querySelector('[data-spotlight-badge]'),
    title: card.querySelector('[data-spotlight-title]'),
    hook: card.querySelector('[data-spotlight-hook]'),
    summary: card.querySelector('[data-spotlight-summary]'),
    tags: card.querySelector('[data-spotlight-tags]'),
    proof: card.querySelector('[data-spotlight-proof]'),
    roleLabel: card.querySelector('[data-spotlight-role-label]'),
    role: card.querySelector('[data-spotlight-role]'),
    detail: card.querySelector('[data-spotlight-detail]'),
    join: card.querySelector('[data-spotlight-join]'),
    save: card.querySelector('[data-spotlight-save]'),
    status: carousel.querySelector('[data-carousel-status]'),
    dots: [...carousel.querySelectorAll('[data-carousel-dot]')],
  }

  const savedProjects = new Set()
  let activeIndex = 0
  let touchStartX = null

  const replaceBadge = (text) => {
    const dot = document.createElement('i')
    elements.badge.replaceChildren(dot, document.createTextNode(text))
  }

  const replaceTags = (tags) => {
    const fragment = document.createDocumentFragment()
    tags.forEach((tag) => {
      const item = document.createElement('span')
      item.textContent = tag
      fragment.append(item)
    })
    elements.tags.replaceChildren(fragment)
  }

  const replaceStats = (stats) => {
    const fragment = document.createDocumentFragment()
    stats.forEach(({ value, label }) => {
      const item = document.createElement('span')
      const strong = document.createElement('strong')
      strong.textContent = value
      item.append(strong, document.createTextNode(label))
      fragment.append(item)
    })
    elements.proof.replaceChildren(fragment)
  }

  const updateSavedState = (project) => {
    const isSaved = savedProjects.has(project.id)
    elements.save.classList.toggle('is-saved', isSaved)
    elements.save.setAttribute('aria-pressed', String(isSaved))
    elements.save.setAttribute('aria-label', `${isSaved ? 'ยกเลิกการบันทึก' : 'บันทึกโปรเจกต์'} ${project.shortName}`)
  }

  const renderProject = (index, shouldAnnounce = true) => {
    activeIndex = (index + spotlightProjects.length) % spotlightProjects.length
    const project = spotlightProjects[activeIndex]

    card.dataset.theme = project.theme
    elements.image.src = project.image
    elements.image.alt = project.imageAlt
    replaceBadge(project.badge)
    elements.title.textContent = project.title
    elements.hook.textContent = project.hook
    elements.summary.textContent = project.summary
    replaceTags(project.tags)
    replaceStats(project.stats)
    elements.roleLabel.textContent = project.roleLabel
    elements.role.textContent = project.role
    elements.detail.href = project.detailUrl
    elements.join.href = project.joinUrl
    updateSavedState(project)

    elements.dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex
      dot.classList.toggle('is-active', isActive)
      if (isActive) dot.setAttribute('aria-current', 'true')
      else dot.removeAttribute('aria-current')
    })

    if (shouldAnnounce) {
      elements.status.textContent = `โปรเจกต์ที่ ${activeIndex + 1} จาก ${spotlightProjects.length}: ${project.shortName}`
    }

    card.classList.remove('is-switching')
    void card.offsetWidth
    card.classList.add('is-switching')
    window.setTimeout(() => card.classList.remove('is-switching'), 280)
  }

  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
    renderProject(activeIndex - 1)
  })

  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
    renderProject(activeIndex + 1)
  })

  elements.dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      renderProject(Number(dot.dataset.carouselDot))
    })
  })

  elements.save.addEventListener('click', () => {
    const project = spotlightProjects[activeIndex]
    if (savedProjects.has(project.id)) savedProjects.delete(project.id)
    else savedProjects.add(project.id)
    updateSavedState(project)
  })

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      renderProject(activeIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      renderProject(activeIndex + 1)
    }
  })

  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null
  }, { passive: true })

  carousel.addEventListener('touchend', (event) => {
    if (touchStartX === null) return
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const distance = touchEndX - touchStartX
    touchStartX = null

    if (Math.abs(distance) < 48) return
    renderProject(activeIndex + (distance < 0 ? 1 : -1))
  }, { passive: true })

  spotlightProjects.slice(1).forEach(({ image }) => {
    const preloadImage = new Image()
    preloadImage.src = image
  })

  renderProject(0, false)
}

setupSpotlightCarousel()
=======
>>>>>>> origin/plume-dev
