import '../style.css'
import { mountAuthenticatedShell } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'

mountAuthenticatedShell('teams')

if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

const teams = {
  SheetQuest: {
    name: 'SheetQuest',
    topic: 'Education',
    subtitle: 'เรียนให้เหมือนเล่นเกม',
    description: 'เปลี่ยนการทบทวนบทเรียนให้เป็นเควสต์สั้น ๆ ที่เล่นกับเพื่อนได้ ทีมกำลังพัฒนา Prototype รอบที่ 3 หลังทดลองกับนักศึกษาแล้ว 42 คน',
    tags: ['การศึกษา', 'Gamification', 'Mobile & Web'],
    match: 94,
    role: 'UX/UI Designer',
    open: 1,
    availability: 'เริ่มงานได้ทันที · ประมาณ 6 ชม./สัปดาห์',
    roleDescription: 'ช่วยปรับ User Flow สร้าง UI Kit และร่วมทดสอบ Prototype รอบถัดไป',
    roleSkills: ['Figma', 'Research', 'Prototype'],
    timeline: [
      'มิ.ย. 2026 — เริ่มทำโปรเจกต์เป็น Learning Experience',
      'ก.ค. 2026 — สร้าง Prototype ระบบเควสต์รอบแรก',
      'ส.ค. 2026 — ทดลองกับนักศึกษา 42 คนและเก็บ Feedback',
      'ก.ย. 2026 — ปรับระบบรางวัลและเปิดรับ UX/UI Designer',
    ],
    evidence: 'Prototype 3 รอบ · ผู้ทดลอง 42 คน\nอัตราทำเควสต์จบ 76% · คะแนนความพึงพอใจ 4.6/5\nหลักฐาน: Figma Prototype · Test Report · Demo Video',
    review: '“ทีมแบ่งงานชัดเจนและรับฟัง Feedback จริง ทุกสัปดาห์มีสิ่งที่เดินหน้าต่อได้”\n\n— Narin, Content Designer · ร่วมทีม 3 เดือน',
    members: [
      ['Korn', 'Frontend Developer'],
      ['Narin', 'Content Designer'],
      ['Mew', 'Backend Developer'],
    ],
    workingStyle: 'ประชุม: Online ทุกวันเสาร์ 20:00\nทำงานร่วมกัน: Discord + Notion\nเวลาที่คาดหวัง: 6 ชม./สัปดาห์\nระยะโปรเจกต์: อีกประมาณ 10 สัปดาห์',
  },
  GreenLoop: {
    name: 'GreenLoop', topic: 'Environment', subtitle: 'แยกขยะให้มีรางวัล',
    description: 'ระบบสะสมแต้มจากการแยกขยะที่ช่วยให้พฤติกรรมรักษ์โลกสนุกขึ้น ทีมผ่านการทดสอบกับผู้ใช้จริงแล้ว 342 คนและกำลังพัฒนา Web App รอบใหม่',
    tags: ['สิ่งแวดล้อม', 'Recycling', 'Web App'], match: 88, role: 'Frontend Developer', open: 2,
    availability: 'เริ่มงานภายในเดือนนี้ · ประมาณ 5 ชม./สัปดาห์',
    roleDescription: 'พัฒนาหน้าจอสแกนถังขยะและระบบแลกแต้มจาก Prototype ที่ผ่านการทดสอบแล้ว',
    roleSkills: ['JavaScript', 'Responsive', 'API'],
    timeline: ['เม.ย. 2026 — เริ่มสำรวจพฤติกรรมการแยกขยะ', 'มิ.ย. 2026 — สร้าง Prototype ระบบสะสมแต้ม', 'ส.ค. 2026 — ทดลองกับผู้ใช้ 342 คน', 'ก.ย. 2026 — เปิดรับ Frontend Developer เพื่อพัฒนา Web App'],
    evidence: 'Prototype 2 รอบ · ผู้ทดลอง 342 คน\nผู้ใช้ 68% แยกขยะต่อเนื่องหลังทดลอง\nหลักฐาน: Research Report · Prototype · Analytics',
    review: '“ทุกคนสื่อสารตรงไปตรงมาและเปิดให้เสนอทางเลือกใหม่ ๆ ได้เสมอ”\n\n— Beam, Product Designer · ร่วมทีม 4 เดือน',
    members: [['Aom', 'Backend Developer'], ['Mint', 'Marketing'], ['Beam', 'Product Designer']],
    workingStyle: 'ประชุม: Online วันอาทิตย์ 19:00\nทำงานร่วมกัน: Discord + Trello\nเวลาที่คาดหวัง: 5 ชม./สัปดาห์\nระยะโปรเจกต์: อีกประมาณ 12 สัปดาห์',
  },
  LocalLens: {
    name: 'LocalLens', topic: 'Business', subtitle: 'พาร้านท้องถิ่นให้คนค้นพบ',
    description: 'พื้นที่รวมเรื่องราวและข้อเสนอจากร้านค้าใกล้มหาวิทยาลัย ช่วยให้ร้านเล็กเข้าถึงนักศึกษา และให้นักศึกษาได้ทำ Micro-project กับโจทย์จริง',
    tags: ['ธุรกิจ', 'Local Commerce', 'Content'], match: 84, role: 'Content Creator', open: 1,
    availability: 'เริ่มงานได้ทันที · ประมาณ 4 ชม./สัปดาห์',
    roleDescription: 'วางแนวทางคอนเทนต์ สัมภาษณ์เจ้าของร้าน และเล่าเรื่องร้านท้องถิ่นให้น่าสนใจ',
    roleSkills: ['Content', 'Interview', 'Social Media'],
    timeline: ['ก.ค. 2026 — สำรวจปัญหาร้านค้าใกล้มหาวิทยาลัย', 'ส.ค. 2026 — ทดลองรูปแบบโปรไฟล์ร้านค้า', 'ส.ค. 2026 — เริ่มทำงานกับร้าน 8 แห่ง', 'ก.ย. 2026 — เปิดรับ Content Creator'],
    evidence: 'ร่วมทดลองกับร้านค้า 8 แห่ง\nคอนเทนต์ต้นแบบมียอดเข้าถึงรวม 12,400 ครั้ง\nหลักฐาน: Content Plan · Interview Notes · Insight Report',
    review: '“ได้ทำงานกับโจทย์จริงและเห็นผลของคอนเทนต์ชัดเจน ทีมให้เครดิตทุกคนเสมอ”\n\n— Pim, Marketing Intern · ร่วมทีม 2 เดือน',
    members: [['Ploy', 'UX/UI Designer'], ['Tan', 'Business Developer']],
    workingStyle: 'ประชุม: Hybrid วันพุธ 18:30\nทำงานร่วมกัน: LINE + Notion\nเวลาที่คาดหวัง: 4 ชม./สัปดาห์\nระยะโปรเจกต์: อีกประมาณ 8 สัปดาห์',
  },
  SafeWalk: {
    name: 'SafeWalk', topic: 'Community', subtitle: 'กลับหออย่างมั่นใจ',
    description: 'แอปช่วยนักศึกษาเลือกเส้นทางกลับหอที่ปลอดภัย ทีมกำลังเก็บข้อมูลจากผู้ใช้และหอพักเพื่อปรับคำแนะนำให้เหมาะกับพื้นที่จริง',
    tags: ['ชุมชน', 'Campus Safety', 'Mobile App'], match: 81, role: 'User Researcher', open: 2,
    availability: 'เริ่มงานสัปดาห์หน้า · ประมาณ 6 ชม./สัปดาห์',
    roleDescription: 'ช่วยวางแผนสัมภาษณ์ เก็บข้อมูลผู้ใช้จริง และสรุป Insight เพื่อพัฒนาเส้นทางที่ปลอดภัยขึ้น',
    roleSkills: ['Interview', 'Research', 'Synthesis'],
    timeline: ['พ.ค. 2026 — เริ่มสำรวจความปลอดภัยรอบมหาวิทยาลัย', 'มิ.ย. 2026 — สร้างแผนที่เส้นทางต้นแบบ', 'ส.ค. 2026 — ทดลองกับหอพัก 5 แห่ง', 'ก.ย. 2026 — เปิดรับ User Researcher เพิ่ม'],
    evidence: 'ทดสอบพื้นที่จริงกับหอพัก 5 แห่ง\nเก็บจุดเสี่ยงและข้อเสนอแนะแล้ว 126 รายการ\nหลักฐาน: Field Notes · Route Map · Test Report',
    review: '“ทีมให้ความสำคัญกับข้อมูลจริงและความปลอดภัยของผู้ใช้ก่อนตัดสินใจทุกครั้ง”\n\n— Fern, Data Volunteer · ร่วมทีม 3 เดือน',
    members: [['Narin', 'Mobile Developer'], ['Mew', 'Mobile Developer'], ['Kan', 'Data Analyst']],
    workingStyle: 'ประชุม: Online วันเสาร์ 18:00\nทำงานร่วมกัน: Discord + Notion\nเวลาที่คาดหวัง: 6 ชม./สัปดาห์\nระยะโปรเจกต์: อีกประมาณ 10 สัปดาห์',
  },
}

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
})[character])

const requestedTeam = new URLSearchParams(window.location.search).get('team')
const team = teams[requestedTeam] || teams.SheetQuest
const setText = (id, value) => { document.querySelector(`#${id}`).textContent = value }

document.title = `${team.name} — ShowKong`
setText('detailEyebrow', `ทีมเปิดรับสมาชิก · ${team.topic}`)
setText('detailName', team.name)
setText('detailSubtitle', team.subtitle)
setText('detailDescription', team.description)
setText('detailMatch', `ตรงกับคุณ ${team.match}%`)
setText('detailOpenRole', `เปิดรับ ${team.role} ${team.open} คน`)
setText('detailAvailability', team.availability)
setText('timelineTitle', `Timeline ของ ${team.name}`)
setText('detailEvidence', team.evidence)
setText('detailReview', team.review)
setText('memberCount', team.members.length)
setText('detailWorkingStyle', team.workingStyle)
setText('sidebarRole', `${team.role} · ${team.open} คน`)
setText('sidebarRoleDescription', team.roleDescription)
setText('detailJoinTitle', `ขอ Join ทีม ${team.name}`)
setText('detailJoinSummary', `${team.name} · ${team.role}`)
setText('detailJoinMeta', `ตรงกับคุณ ${team.match}% · ${team.availability.replace('ประมาณ ', '')}`)

document.querySelector('#detailTags').innerHTML = team.tags.map((tag) => `<span class="chip is-active">${escapeHtml(tag)}</span>`).join('')
document.querySelector('#sidebarSkills').innerHTML = team.roleSkills.map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join('')
document.querySelector('#detailTimeline').innerHTML = team.timeline.map((event) => `<li>${escapeHtml(event)}</li>`).join('')
document.querySelector('#detailMembers').innerHTML = team.members.map(([name, role]) => `
  <div class="member-row">
    <span class="avatar">${escapeHtml(name.charAt(0))}</span>
    <div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(role)}</span></div>
  </div>
`).join('')

const joinModal = document.querySelector('#detailJoinModal')
const joinSuccess = document.querySelector('#detailJoinSuccess')

function setJoinOpen(isOpen) {
  joinModal.hidden = !isOpen
  document.body.classList.toggle('modal-open', isOpen)
  if (isOpen) setTimeout(() => joinModal.querySelector('input')?.focus(), 20)
}

document.querySelectorAll('.js-detail-join').forEach((button) => button.addEventListener('click', () => setJoinOpen(true)))
document.querySelectorAll('#closeDetailJoin, #cancelDetailJoin').forEach((button) => button.addEventListener('click', () => setJoinOpen(false)))
joinModal.addEventListener('click', (event) => { if (event.target === joinModal) setJoinOpen(false) })
document.querySelector('#detailJoinForm').addEventListener('submit', (event) => {
  event.preventDefault()
  event.currentTarget.reset()
  setJoinOpen(false)
  joinSuccess.hidden = false
  document.body.classList.add('modal-open')
})
document.querySelector('#closeDetailJoinSuccess').addEventListener('click', () => {
  joinSuccess.hidden = true
  document.body.classList.remove('modal-open')
})

document.querySelectorAll('.js-open-post').forEach((button) => {
  button.addEventListener('click', () => { window.location.href = '/pages/feed.html#post-project' })
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  if (!joinSuccess.hidden) {
    joinSuccess.hidden = true
    document.body.classList.remove('modal-open')
  } else if (!joinModal.hidden) {
    setJoinOpen(false)
  }
})
