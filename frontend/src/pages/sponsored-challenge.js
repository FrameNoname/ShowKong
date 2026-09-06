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
document.querySelector('main').innerHTML = `
<section class="challenge-hero"><div class="page-container challenge-hero-inner"><div><span class="sponsored-label">SPONSORED CHALLENGE</span><h1>โจทย์จริงจากองค์กร<br>รางวัลจริงสำหรับทีมที่พร้อมลงมือทำ</h1><p>เลือกโจทย์ที่สนใจ รวมทีม และสร้างผลงานจากปัญหาจริง พร้อมโอกาสรับรางวัลและคำแนะนำจากองค์กร</p><div class="hero-facts"><span>4 โจทย์เปิดรับ</span><span>รางวัลรวม ${money(challenges.reduce((s,c)=>s+c.reward,0))}</span><span>มี Mentor จากองค์กร</span></div></div><div class="prize-card">${designIcon('challenge/imgIllustrationTrophy')}<small>รางวัลสูงสุด</small><strong>25,000 บาท</strong><p>โดย LocalBiz Network</p><p>ปิดรับผลงาน 18 กันยายน 2026</p></div></div></section>
<section class="challenge-list page-container"><div class="section-heading-row"><div><h2>ชาเลนจ์ที่เปิดรับ</h2><p>เลือกโจทย์ที่ตรงกับความสนใจและทักษะของทีมคุณ</p></div><span class="soft-link" id="challengeCount" role="status">4 โจทย์กำลังเปิดรับ</span></div><div class="challenge-filters"><label class="search-field">${designIcon('challenge/imgIconSearch')}<input id="challengeSearch" type="search" placeholder="ค้นหาชาเลนจ์หรือองค์กร" aria-label="ค้นหาชาเลนจ์หรือองค์กร"></label><div class="chip-row" id="challengeCategories">${['ทั้งหมด','Design','Technology','Business','Social Impact'].map((c,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-category="${c}" aria-pressed="${i===0}">${c}</button>`).join('')}</div></div><div id="challengeResults" aria-live="polite"></div><p class="sample-note">ตัวอย่างชาเลนจ์ตามดีไซน์ · ยังไม่เปิดรับสมัครผ่านระบบ</p></section>`
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
document.querySelector('#challengeResults').addEventListener('click',e=>{
  const b=e.target.closest('[data-challenge]'); if(!b)return
  const c=challenges.find(c=>c.id===b.dataset.challenge)
  openDialog(c.title,`<p class="dialog-description">${c.organization}</p><div class="challenge-tags"><span>${c.tag}</span></div><p class="dialog-description">${c.description}</p><div class="join-summary"><strong>รางวัล ${money(c.reward)}</strong><span>กำหนดส่ง ${c.deadline}</span>${c.team?`<span>${c.team} · มี Mentor ให้คำแนะนำ</span>`:''}</div><p class="sample-note">โจทย์ตัวอย่างจากดีไซน์ ยังไม่เปิดรับสมัครผ่านระบบ</p><a class="button button-primary full-width" href="/pages/post.html?challenge=${encodeURIComponent(c.title)}">สร้างโพสต์หาเพื่อนร่วมทีม</a>`)
})
render()
