import { mountRefresh } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'
import { projects, categoryChips, projectCard, bindProjectDetails } from '../components/projects.js'

mountRefresh('explore')
document.querySelector('main').innerHTML = `
<section class="explore-intro"><div class="page-container"><p class="eyebrow">ค้นพบสิ่งที่นักศึกษากำลังสร้าง</p><h1>สำรวจโปรเจกต์</h1><p>ติดตามไอเดีย ทดลองใช้ Prototype และส่ง Feedback ให้โปรเจกต์ที่คุณสนใจ</p><div class="search-and-sort"><label class="search-field"><input id="projectSearch" type="search" aria-label="ค้นหาโปรเจกต์" placeholder="ค้นหาชื่อโปรเจกต์ ปัญหา หรือหมวดหมู่">${designIcon('challenge/imgIconSearch')}</label><select id="projectSort" aria-label="เรียงโปรเจกต์"><option value="featured">เรียงตาม: มาแรง</option><option value="popular">ผู้สนใจมากที่สุด</option><option value="name">ชื่อโปรเจกต์ A–Z</option></select></div><div class="chip-row quick-categories" data-category-group>${categoryChips()}</div></div></section>
<section class="explore-featured"><div class="section-heading-row"><h2>โปรเจกต์เด่นประจำสัปดาห์</h2><p>คัดจากความสนใจและ Feedback ในชุมชน</p></div><div class="weekly-project"><div><span class="weekly-label">● โปรเจกต์เด่นประจำสัปดาห์</span><h2>SheetQuest — เปลี่ยนบทเรียนให้เป็นเกม</h2><p>สร้าง Quiz และ Flashcard จากบทเรียน พร้อมระบบเกมที่ช่วยให้นักศึกษาอยากกลับมาเรียนต่อ</p><p class="weekly-meta">Prototype · ทดลองกับผู้ใช้แล้ว 42 คน · ผู้ติดตาม 128 คน</p><button class="button button-light" data-project="SheetQuest" type="button">ดูโปรเจกต์ →</button></div><div class="weekly-card">${projectCard(projects[0])}</div></div>
<div class="discovery-panel"><div class="section-heading-row"><div><h2>ค้นพบโปรเจกต์</h2><p>สำรวจไอเดีย Prototype และโปรเจกต์ที่กำลังทดลองกับผู้ใช้</p></div><span class="soft-link" id="projectCount" role="status">8 โปรเจกต์</span></div><div class="chip-row discovery-filters" data-category-group>${categoryChips()}</div><div class="discovery-grid" id="projectGrid" aria-live="polite"></div></div></section>`
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
bindProjectDetails()
