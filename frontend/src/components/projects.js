import { designIcon } from './design-assets.js'
import { escapeHtml, openDialog } from './refresh.js'

export const projects = [
  { name: 'SheetQuest', category: 'การศึกษา', subtitle: 'เรียนให้เหมือนเล่นเกม', role: 'UX Researcher', phase: 'Prototype', proof: 'ผู้ติดตาม 128 คน', score: 128, color: 'violet', tags: 'EdTech · AI', description: 'เปลี่ยนไฟล์เรียนให้เป็น Quiz และ Flashcards พร้อมระบบภารกิจและ EXP', metrics: ['1.2K', '186', '42 คน'] },
  { name: 'GreenLoop', category: 'สิ่งแวดล้อม', subtitle: 'แยกขยะให้มีรางวัล', role: 'Marketing', phase: 'MVP', proof: 'ทดลองแล้ว 64 คน', score: 64, color: 'green', tags: 'Environment · IoT', description: 'ระบบแยกขยะสะสมแต้มที่เชื่อมร้านค้าและกิจกรรมนักศึกษาในมหาวิทยาลัย', metrics: ['980', '124', '3 จุด'] },
  { name: 'SafeWalk', category: 'เทคโนโลยี', subtitle: 'กลับหออย่างมั่นใจ', role: 'Data Analyst', phase: 'Beta', proof: 'ผู้ติดตาม 96 คน', score: 96, color: 'blue', tags: 'Community · Mobile', description: 'แผนที่เส้นทางปลอดภัยพร้อมจุดแจ้งเหตุและระบบเดินทางร่วมกันช่วงกลางคืน', metrics: ['1.5K', '203', '75 คน'] },
  { name: 'UniSwap', category: 'ธุรกิจ', subtitle: 'แลกของในมหาวิทยาลัย', role: 'UX Designer', phase: 'Prototype', proof: 'บันทึก 42 ครั้ง', score: 42, color: 'coral' },
  { name: 'SkillBridge', category: 'การศึกษา', subtitle: 'พอร์ตทักษะที่ตรวจสอบได้', role: 'Backend Developer', phase: 'Idea', proof: 'ผู้สนใจ 88 คน', score: 88, color: 'plum' },
  { name: 'MoodMate', category: 'สุขภาพและชุมชน', subtitle: 'เช็กอินใจของนักศึกษา', role: 'Content Designer', phase: 'Beta', proof: 'ทดลองแล้ว 120 คน', score: 120, color: 'pink' },
  { name: 'CampusFix', category: 'เทคโนโลยี', subtitle: 'แจ้งปัญหาในมหาวิทยาลัย', role: 'Mobile Developer', phase: 'Prototype', proof: 'ผู้ติดตาม 74 คน', score: 74, color: 'cyan' },
  { name: 'LocalLink', category: 'ธุรกิจ', subtitle: 'ร่วมงานกับธุรกิจท้องถิ่น', role: 'Sales & Marketing', phase: 'MVP', proof: 'ผู้สนใจ 56 คน', score: 56, color: 'orange' },
]
export const categories = ['ทั้งหมด', 'เทคโนโลยี', 'การศึกษา', 'สิ่งแวดล้อม', 'ธุรกิจ', 'สุขภาพและชุมชน']
export function categoryChips(attribute = 'data-category') {
  return categories.map((name, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}" ${attribute}="${name}" aria-pressed="${i === 0}" type="button">${name}</button>`).join('')
}
export function projectCard(project, recruitment = false) {
  const i = projects.indexOf(project)
  return `<button class="discovery-card" type="button" data-project="${project.name}" aria-label="ดูโปรเจกต์ ${project.name}">
    <span class="project-cover cover-${project.color}">${designIcon('home/imgThumbnailDecoration', 'cover-decoration')}<span class="cover-category">${project.category}</span><span class="cover-icon">${designIcon('home/imgProjectIconVector' + (i || ''))}</span><strong>${project.name}</strong></span>
    <span class="discovery-card-copy"><span>${project.subtitle}</span><small>${recruitment ? 'เปิดรับ ' + project.role : project.phase + ' · ' + project.proof}</small></span>
  </button>`
}
export function bindProjectDetails(root = document) {
  root.addEventListener('click', e => {
    const button = e.target.closest('[data-project]')
    if (!button) return
    const project = projects.find(p => p.name === button.dataset.project)
    if (!project) return
    const hasTeam = ['SheetQuest', 'GreenLoop', 'SafeWalk'].includes(project.name)
    openDialog(project.name, `<div class="project-cover detail-project-cover cover-${project.color}"><strong>${project.subtitle}</strong></div><p class="dialog-description">${escapeHtml(project.description || project.subtitle)}</p><div class="chip-row"><span class="chip is-active">${project.category}</span><span class="chip">${project.phase}</span></div><p class="dialog-description">${project.proof} · เปิดรับ ${project.role}</p><a class="button button-primary full-width" href="/pages/${hasTeam ? 'team-detail.html?team=' + project.name : 'find-team.html'}">${hasTeam ? 'ดูรายละเอียดทีม' : 'ค้นหาทีมที่เปิดรับ'}</a>`)
  })
}
