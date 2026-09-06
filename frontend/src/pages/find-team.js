import { mountRefresh } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'
import { openJoinRequest } from '../components/join-request.js'
import { supabase } from '../lib/supabase.js'

mountRefresh('teams')
if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}
const teams = [
  { name:'SheetQuest',role:'UX/UI Designer',topic:'การศึกษา',skills:['UX/UI','Research'],tags:['Figma','Research','Prototype'],members:3,work:'Online · เสาร์ 20:00',duration:10,deadline:18,color:'#6d5dfb' },
  { name:'GreenLoop',role:'Frontend Developer',topic:'สิ่งแวดล้อม',skills:['Developer','Frontend'],tags:['React','API','Tailwind'],members:4,work:'Hybrid · อังคารและพฤหัส 19:00',duration:12,deadline:22,color:'#13a476' },
  { name:'LocalLens',role:'Content Creator',topic:'ธุรกิจ',skills:['Content','Marketing'],tags:['Video','Copywriting','Social'],members:2,work:'Flexible · นัดหมายรายสัปดาห์',duration:8,deadline:25,color:'#e9870d' },
  { name:'SafeWalk',role:'User Researcher',topic:'ชุมชน',skills:['UX/UI','Research'],tags:['Interview','Survey','Insight'],members:3,work:'Online · อาทิตย์ 14:00',duration:6,deadline:20,color:'#1988c4' },
]
document.querySelector('main').innerHTML = `
<section class="explore-intro"><div class="page-container"><p class="eyebrow">ทีมที่ดี เริ่มจากทักษะที่เติมเต็มกัน</p><h1>หาตำแหน่งในทีมที่เหมาะกับคุณ</h1><p>เลือกจากตำแหน่งที่เปิดรับ ดูทักษะ รูปแบบการทำงาน และเวลาที่ต้องใช้ ก่อนส่งคำขอเข้าร่วมทีม</p><div class="search-and-sort"><label class="search-field"><input id="teamSearch" type="search" aria-label="ค้นหาตำแหน่งในทีม" placeholder="ค้นหาชื่อทีม หัวข้อ หรือทักษะที่ต้องการ">${designIcon('challenge/imgIconSearch')}</label><select id="teamStatus" aria-label="สถานะทีม"><option value="open">สถานะ: เปิดรับสมาชิก</option><option value="all">สถานะ: ทั้งหมด</option></select></div><div class="chip-row quick-categories" data-skill-filters>${['ทั้งหมด','UX/UI','Developer','Marketing','Content'].map((s,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-skill="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div></div></section>
<section class="team-matches page-container"><div class="section-heading-row team-heading"><h2>ตำแหน่งที่กำลังเปิดรับ</h2><p id="teamCount" role="status"></p></div><div class="topic-filter"><strong>กรองตามหัวข้อ</strong><div class="chip-row" data-topic-filters>${['ทั้งหมด','เทคโนโลยี','การศึกษา','ชุมชน','สิ่งแวดล้อม','ธุรกิจ'].map((s,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-topic="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div></div><div class="team-content"><div class="open-teams"><div class="chip-row team-tabs" data-team-tabs><button class="chip is-active" type="button" data-sort="default" aria-pressed="true">ตำแหน่งที่เปิดรับ</button><button class="chip" type="button" data-sort="newest" aria-pressed="false">เปิดรับล่าสุด</button><button class="chip" type="button" data-sort="deadline" aria-pressed="false">ใกล้ปิดรับ</button></div><div class="team-grid" id="teamGrid" aria-live="polite"></div><p class="sample-note">แสดงตำแหน่งตัวอย่างทั้งหมด 4 ตำแหน่ง</p></div></div></section>`
let activeSkill='ทั้งหมด',activeTopic='ทั้งหมด',sort='default'
function render() {
  const query=document.querySelector('#teamSearch').value.trim().toLowerCase()
  let filtered=teams.filter(t=>(activeSkill==='ทั้งหมด'||t.skills.includes(activeSkill))&&(activeTopic==='ทั้งหมด'||t.topic===activeTopic)&&[t.name,t.role,t.topic,...t.tags].join(' ').toLowerCase().includes(query))
  if(sort==='newest')filtered.reverse()
  if(sort==='deadline')filtered.sort((a,b)=>a.deadline-b.deadline)
  document.querySelector('#teamCount').textContent='พบ '+filtered.length+' ตำแหน่ง'
  document.querySelector('#teamGrid').innerHTML=filtered.map(t=>`<article class="team-card"><div><h3><span class="role-accent" style="--role-color:${t.color}"></span>${t.role}</h3><p>โปรเจกต์ ${t.name} · ทีม ${t.members} คน</p><div class="mini-tags">${t.tags.map(s=>`<span>${s}</span>`).join('')}</div></div><div class="role-work"><span>รูปแบบการทำงาน</span><p>${t.work}</p><small>ระยะเวลา ${t.duration} สัปดาห์</small></div><div class="role-actions"><small>ปิดรับ ${t.deadline} ก.ย.</small><div class="team-card-actions"><a class="button button-small button-neutral" href="/pages/team-detail.html?team=${t.name}">ดูรายละเอียด</a><button class="button button-small button-primary" type="button" data-join="${t.name}">ขอ Join ทีม</button></div></div></article>`).join('')||'<div class="empty-state team-empty"><h2>ยังไม่พบตำแหน่งที่ตรงกับตัวกรอง</h2><p>ลองเปลี่ยนคำค้นหา ทักษะ หรือหัวข้อดูอีกครั้ง</p></div>'
}
for(const [selector,key] of [['[data-skill-filters]','skill'],['[data-topic-filters]','topic'],['[data-team-tabs]','sort']]){
  document.querySelector(selector).addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return
    e.currentTarget.querySelectorAll('button').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))})
    if(key==='skill')activeSkill=b.dataset.skill
    if(key==='topic')activeTopic=b.dataset.topic
    if(key==='sort')sort=b.dataset.sort
    render()
  })
}
document.querySelector('#teamSearch').addEventListener('input',render)
document.querySelector('#teamStatus').addEventListener('change',render)
document.querySelector('#teamGrid').addEventListener('click',e=>{const b=e.target.closest('[data-join]');if(b){const t=teams.find(t=>t.name===b.dataset.join);openJoinRequest(t.name,t.role)}})
render()
