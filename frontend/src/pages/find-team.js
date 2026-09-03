import '../style.css'
import { mountAuthenticatedShell } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'

mountAuthenticatedShell('teams')

if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

const teams = [
  { name: 'SheetQuest', role: 'UX/UI Designer', match: 94, open: 1, topic: 'การศึกษา', focus: 'Gamification', skills: ['UX/UI', 'Research'], members: 'Developer 2 · Content 1', history: 'เริ่ม มี.ค. 2026 · มี Demo แล้ว 2 รอบ' },
  { name: 'GreenLoop', role: 'Frontend Developer', match: 88, open: 2, topic: 'สิ่งแวดล้อม', focus: 'Recycling', skills: ['Developer', 'Frontend'], members: 'Backend 1 · Marketing 2', history: 'เริ่ม เม.ย. 2026 · ทดลองกับผู้ใช้ 342 คน' },
  { name: 'LocalLens', role: 'Content Creator', match: 84, open: 1, topic: 'ธุรกิจ', focus: 'Local Commerce', skills: ['Content', 'Marketing'], members: 'UX/UI 1 · Business 1', history: 'เริ่ม ก.ค. 2026 · ทำงานกับร้านแล้ว 8 แห่ง' },
  { name: 'SafeWalk', role: 'User Researcher', match: 81, open: 2, topic: 'ชุมชน', focus: 'Campus Safety', skills: ['UX/UI', 'Research'], members: 'Mobile Dev 2 · Data 1', history: 'เริ่ม พ.ค. 2026 · ทดสอบแล้ว 5 หอพัก' },
]

const grid = document.querySelector('#teamGrid')
const search = document.querySelector('#teamSearch')
const count = document.querySelector('#teamCount')
let activeSkill = 'ทั้งหมด'
let activeTopic = 'ทั้งหมด'

function teamCard(team) {
  return `
    <article class="team-card" data-name="${team.name.toLowerCase()}" data-topic="${team.topic}" data-skills="${team.skills.join(' ').toLowerCase()}">
      <span class="info-mark">i</span>
      <h3>${team.name} — ${team.role}</h3>
      <p><strong>ตรงกับคุณ ${team.match}%</strong> · เปิดรับ ${team.open} คน</p>
      <p>หัวข้อ: ${team.topic} · ${team.focus}<br>ทีมมีแล้ว: ${team.members}</p>
      <p>ประวัติทีม: ${team.history}</p>
      <div class="team-card-actions"><a class="button button-small button-neutral" href="/pages/team-detail.html?team=${encodeURIComponent(team.name)}">ดูประวัติทีม</a><button class="button button-small button-primary js-request-join" type="button" data-team="${team.name}" data-role="${team.role}">ขอ Join ทีม</button></div>
    </article>
  `
}

function renderTeams() {
  const query = search.value.trim().toLowerCase()
  const filtered = teams.filter((team) => {
    const searchable = `${team.name} ${team.role} ${team.topic} ${team.focus} ${team.skills.join(' ')}`.toLowerCase()
    const matchesQuery = !query || searchable.includes(query)
    const matchesSkill = activeSkill === 'ทั้งหมด' || team.skills.includes(activeSkill) || team.role.includes(activeSkill)
    const matchesTopic = activeTopic === 'ทั้งหมด' || team.topic === activeTopic
    return matchesQuery && matchesSkill && matchesTopic
  })

  grid.innerHTML = filtered.length ? filtered.map(teamCard).join('') : '<div class="empty-state team-empty"><h2>ยังไม่พบทีมที่ตรงกับตัวกรอง</h2><p>ลองเปลี่ยนคำค้นหา ทักษะ หรือหัวข้อดูอีกครั้ง</p></div>'
  count.textContent = `พบ ${filtered.length} ทีมที่เข้ากับคุณ`
  bindJoinButtons()
}

function activateChip(group, button) {
  group.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'))
  button.classList.add('is-active')
}

document.querySelector('[data-skill-filters]').addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return
  activateChip(event.currentTarget, button)
  activeSkill = button.dataset.skill
  renderTeams()
})

document.querySelector('[data-topic-filters]').addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return
  activateChip(event.currentTarget, button)
  activeTopic = button.dataset.topic
  renderTeams()
})

document.querySelector('[data-team-tabs]').addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (button) activateChip(event.currentTarget, button)
})

search.addEventListener('input', renderTeams)

const joinModal = document.querySelector('#joinModal')
const joinSuccess = document.querySelector('#joinSuccess')

function setJoinOpen(isOpen) {
  joinModal.hidden = !isOpen
  document.body.classList.toggle('modal-open', isOpen)
}

function bindJoinButtons() {
  document.querySelectorAll('.js-request-join').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('#joinTeamName').textContent = button.dataset.team
      document.querySelector('#joinTeamRole').textContent = `ตำแหน่งที่เปิดรับ: ${button.dataset.role}`
      setJoinOpen(true)
    })
  })
}

document.querySelectorAll('#closeJoin, #cancelJoin').forEach((button) => button.addEventListener('click', () => setJoinOpen(false)))
joinModal.addEventListener('click', (event) => { if (event.target === joinModal) setJoinOpen(false) })
document.querySelector('#joinForm').addEventListener('submit', (event) => {
  event.preventDefault()
  event.currentTarget.reset()
  setJoinOpen(false)
  joinSuccess.hidden = false
  document.body.classList.add('modal-open')
})
document.querySelector('#closeJoinSuccess').addEventListener('click', () => {
  joinSuccess.hidden = true
  document.body.classList.remove('modal-open')
})

document.querySelectorAll('.js-open-post').forEach((button) => {
  button.addEventListener('click', () => { window.location.href = '/pages/feed.html#post-project' })
})

renderTeams()
