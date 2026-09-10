import '../style.css'

import { homeProjectCta, siteFooter } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'
import { openLoginModal } from '../components/login-modal.js'

const ctaSlot = document.querySelector('[data-shared-cta]')
const footerSlot = document.querySelector('[data-shared-footer]')

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

  const { data, error } = await supabase.auth.getSession()
  if (!error && data.session) window.location.replace('/pages/feed.html')
}

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
