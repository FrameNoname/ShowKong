import '../style.css'
import { mountAuthenticatedShell } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'

mountAuthenticatedShell('feed')

if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

const posts = [
  {
    type: 'กำลังหาทีม', author: 'Narin', initial: 'N', meta: '2 ชม. · เทคโนโลยีเพื่อชุมชน',
    title: 'กำลังหา User Researcher มาช่วยทดสอบ SafeWalk',
    body: 'ทีมกำลังทำแอปช่วยนักศึกษาเลือกเส้นทางกลับหอที่ปลอดภัย อยากได้คนช่วยวางแผนสัมภาษณ์และสรุป insight จากผู้ใช้จริง',
    detailTitle: 'สิ่งที่ทีมต้องการ', detail: 'สัมภาษณ์ผู้ใช้ 8–10 คน · ใช้เวลาประมาณ 2 สัปดาห์ · มี Mentor ดูแล',
    stats: '18 สนใจ · 6 ความคิดเห็น', actions: ['ดูประวัติทีม', 'ขอ Join ทีม'], accent: 'purple',
  },
  {
    type: 'ขอ Feedback', author: 'Mew', initial: 'M', meta: '5 ชม. · สิ่งแวดล้อม',
    title: 'ช่วยทดลอง Prototype ระบบสะสมแต้มแยกขยะหน่อย',
    body: 'เราเพิ่งทำ flow ตั้งแต่สแกนถังขยะจนแลกแต้มเสร็จ อยากรู้ว่าขั้นตอนไหนยังงง และรางวัลแบบไหนจูงใจจริง',
    detailTitle: 'สิ่งที่อยากให้ช่วยดู', detail: 'Prototype 7 หน้าจอ · ใช้เวลาทดลอง 5 นาที · เปิดรับ Feedback ถึงวันศุกร์',
    stats: '32 ทดลองแล้ว · 11 Feedback', actions: ['ทดลอง Demo', 'ให้ Feedback'], accent: 'orange',
  },
  {
    type: 'ไอเดียใหม่', author: 'Korn', initial: 'K', meta: 'เมื่อวาน · ธุรกิจและชุมชน',
    title: 'ถ้านักศึกษาได้ทำ Micro-project ให้ร้านค้าใกล้มหาวิทยาลัยล่ะ?',
    body: 'อยากทำพื้นที่ที่ร้านค้าลงโจทย์สั้น ๆ แบบออกแบบเมนู ทำคอนเทนต์ หรือวิจัยลูกค้า แล้วนักศึกษารวมทีมรับงานจริงได้',
    detailTitle: 'กำลังมองหา', detail: 'คนสาย Business 1 คน และ Developer 1 คน มาช่วย validate โมเดลรายได้',
    stats: '41 สนใจ · 15 ความคิดเห็น', actions: ['สนใจไอเดียนี้', 'ชวนคุย'], accent: 'blue',
  },
  {
    type: 'ความคืบหน้า', author: 'SheetQuest', initial: 'S', meta: '2 วันที่แล้ว · การศึกษา',
    title: 'Milestone แรก: มีนักศึกษาทดลองใช้ครบ 186 คนแล้ว',
    body: 'หลังปรับ onboarding เวอร์ชันล่าสุด อัตราทำแบบฝึกหัดแรกสำเร็จเพิ่มจาก 48% เป็น 71% ขอบคุณทุก Feedback จากชุมชน ShowKong',
    detailTitle: 'หลักฐานความคืบหน้า', detail: '186 testers · Completion +23% · เตรียมเปิด Case Study ฉบับเต็ม',
    stats: '76 ถูกใจ · 9 ความคิดเห็น', actions: ['ดู Case Study', 'ติดตาม'], accent: 'green',
  },
]

const stream = document.querySelector('#postStream')
const postModal = document.querySelector('#postModal')
const successModal = document.querySelector('#successModal')
const postForm = document.querySelector('#postForm')
let activePostType = 'ไอเดียใหม่'

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character])
}

function postCard(post) {
  return `
    <article class="feed-post" data-type="${escapeHtml(post.type)}">
      <div class="post-author"><span class="avatar">${escapeHtml(post.initial)}</span><div><strong>${escapeHtml(post.author)}</strong><span>${escapeHtml(post.meta)}</span></div><span class="post-type type-${post.accent}">${escapeHtml(post.type)}</span></div>
      <h2>${escapeHtml(post.title)}</h2>
      <p>${escapeHtml(post.body)}</p>
      <div class="post-detail"><strong>${escapeHtml(post.detailTitle)}</strong><span>${escapeHtml(post.detail)}</span></div>
      <div class="post-footer"><span>${escapeHtml(post.stats)}</span><div>${post.actions.map((action, index) => `<button class="button button-small ${index === post.actions.length - 1 ? 'button-primary' : 'button-neutral'}" type="button">${escapeHtml(action)}</button>`).join('')}</div></div>
    </article>
  `
}

function renderPosts(filter = 'ทั้งหมด') {
  const filtered = filter === 'ทั้งหมด' ? posts : posts.filter((post) => post.type === filter)
  stream.innerHTML = filtered.length
    ? filtered.map(postCard).join('')
    : '<div class="empty-state"><h2>ยังไม่มีโพสต์ประเภทนี้</h2><p>ลองเลือกตัวกรองอื่น หรือสร้างโพสต์แรกของคุณได้เลย</p></div>'
}

function setModalOpen(isOpen) {
  postModal.hidden = !isOpen
  document.body.classList.toggle('modal-open', isOpen)
  if (isOpen) setTimeout(() => document.querySelector('#postTitle')?.focus(), 20)
}

document.querySelectorAll('.js-open-post').forEach((button) => {
  button.addEventListener('click', () => {
    setModalOpen(true)
  })
})

document.querySelectorAll('.js-close-post').forEach((button) => button.addEventListener('click', () => setModalOpen(false)))
postModal.addEventListener('click', (event) => { if (event.target === postModal) setModalOpen(false) })

document.querySelectorAll('[data-post-types], [data-feed-filters]').forEach((group) => {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('button')
    if (!button) return
    group.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'))
    button.classList.add('is-active')

    if (group.hasAttribute('data-post-types')) activePostType = button.dataset.value
    if (group.hasAttribute('data-feed-filters')) renderPosts(button.dataset.filter)
  })
})

const imageInput = document.querySelector('#postImages')
const uploadPreview = document.querySelector('#uploadPreview')
imageInput.addEventListener('change', () => {
  const files = [...imageInput.files].slice(0, 4)
  uploadPreview.innerHTML = files.map((file) => `<span><strong>${escapeHtml(file.name)}</strong><small>${(file.size / 1024 / 1024).toFixed(1)} MB</small></span>`).join('')
  uploadPreview.hidden = files.length === 0
})

postForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = document.querySelector('#postTitle').value.trim()
  const description = document.querySelector('#postDescription').value.trim()
  const topic = document.querySelector('#postTopic').value
  const tags = document.querySelector('#postTags').value.trim()

  posts.unshift({
    type: activePostType,
    author: 'Pluem',
    initial: 'P',
    meta: `เมื่อสักครู่ · ${topic === 'เลือกหัวข้อ' ? 'โปรเจกต์ใหม่' : topic}`,
    title,
    body: description,
    detailTitle: tags ? 'ทักษะที่เกี่ยวข้อง' : 'อัปเดตจากเจ้าของโปรเจกต์',
    detail: tags || 'เปิดรับความคิดเห็นและคนที่สนใจร่วมพัฒนาโปรเจกต์นี้',
    stats: '0 สนใจ · 0 ความคิดเห็น',
    actions: ['บันทึก', 'ดูโพสต์'],
    accent: 'purple',
  })

  renderPosts()
  postForm.reset()
  uploadPreview.hidden = true
  uploadPreview.innerHTML = ''
  setModalOpen(false)
  successModal.hidden = false
})

document.querySelector('#closeSuccess').addEventListener('click', () => {
  successModal.hidden = true
  document.body.classList.remove('modal-open')
  stream.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  if (!successModal.hidden) successModal.hidden = true
  if (!postModal.hidden) setModalOpen(false)
})

if (window.location.hash === '#post-project') setModalOpen(true)
renderPosts()
