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
  { name:'SheetQuest',role:'UX/UI Designer',topic:'การศึกษา',skills:['UX/UI','Research'],tags:['Figma','Research','Prototype'],members:3,work:'Online · เสาร์ 20:00',duration:10,deadline:18,color:'#6d5dfb',image:'/projects/sheetquest.webp' },
  { name:'GreenLoop',role:'Frontend Developer',topic:'สิ่งแวดล้อม',skills:['Developer','Frontend'],tags:['React','API','Tailwind'],members:4,work:'Hybrid · อังคารและพฤหัส 19:00',duration:12,deadline:22,color:'#13a476',image:'/projects/greenloop.webp' },
  { name:'LocalLens',role:'Content Creator',topic:'ธุรกิจ',skills:['Content','Marketing'],tags:['Video','Copywriting','Social'],members:2,work:'Flexible · นัดหมายรายสัปดาห์',duration:8,deadline:25,color:'#e9870d',image:'/projects/locallink.webp' },
  { name:'SafeWalk',role:'User Researcher',topic:'ชุมชน',skills:['UX/UI','Research'],tags:['Interview','Survey','Insight'],members:3,work:'Online · อาทิตย์ 14:00',duration:6,deadline:20,color:'#1988c4',image:'/projects/safewalk.webp' },
]

function teamHeroSlide(team, index) {
  return `<article class="team-hero-slide" aria-roledescription="สไลด์" aria-label="${index + 1} จาก ${teams.length}">
    <div class="page-container team-hero-inner">
      <div class="team-hero-copy">
        <span class="team-hero-label">● ทีมกำลังเปิดรับ · ${team.topic}</span>
        <h1>${team.role}<br>สำหรับทีม ${team.name}</h1>
        <p>ร่วมสร้างโปรเจกต์กับทีม ${team.members} คน ในรูปแบบ ${team.work} พร้อมทำงานร่วมกันประมาณ ${team.duration} สัปดาห์</p>
        <div class="hero-facts">${team.tags.slice(0,2).map(tag=>`<span>${tag}</span>`).join('')}<span>ปิดรับ ${team.deadline} ก.ย.</span></div>
        <button class="button button-light" type="button" data-join="${team.name}">ขอ Join ทีม →</button>
      </div>
      <div class="team-hero-card">
        <div class="team-hero-image"><img src="${team.image}" alt="" width="960" height="600"><span>${team.name}</span></div>
        <div class="team-hero-card-copy"><small>ตำแหน่งที่เปิดรับ</small><strong>${team.role}</strong><p>${team.work}</p><div class="mini-tags">${team.tags.map(tag=>`<span>${tag}</span>`).join('')}</div></div>
      </div>
    </div>
  </article>`
}

function teamHeroCarousel() {
  return `<div class="team-hero-carousel" data-team-carousel aria-roledescription="carousel" aria-label="ทีมที่กำลังเปิดรับสมาชิก">
    <div class="team-hero-viewport"><div class="team-hero-track">${teams.map(teamHeroSlide).join('')}</div></div>
    <div class="team-hero-controls">
      <button class="team-hero-arrow" data-team-prev type="button" aria-label="ดูทีมก่อนหน้า">←</button>
      <div class="team-hero-dots" aria-label="เลือกทีม">${teams.map((team,index)=>`<button class="team-hero-dot${index===0?' is-active':''}" data-team-dot="${index}" type="button" aria-label="ดูทีม ${team.name}" aria-current="${index===0?'true':'false'}"></button>`).join('')}</div>
      <button class="team-hero-arrow" data-team-next type="button" aria-label="ดูทีมถัดไป">→</button>
      <span class="sr-only" data-team-status aria-live="polite"></span>
    </div>
  </div>`
}

document.querySelector('main').innerHTML = `
<section class="team-hero">${teamHeroCarousel()}</section>
<section class="team-matches page-container"><div class="section-heading-row team-heading"><div><p class="eyebrow">ทีมที่ดี เริ่มจากทักษะที่เติมเต็มกัน</p><h2>ตำแหน่งที่กำลังเปิดรับ</h2><p>เลือกจากตำแหน่ง ทักษะ และรูปแบบการทำงานที่เหมาะกับคุณ</p></div><p id="teamCount" role="status"></p></div><div class="search-and-sort"><label class="search-field"><input id="teamSearch" type="search" aria-label="ค้นหาตำแหน่งในทีม" placeholder="ค้นหาชื่อทีม หัวข้อ หรือทักษะที่ต้องการ">${designIcon('challenge/imgIconSearch')}</label><select id="teamStatus" aria-label="สถานะทีม"><option value="open">สถานะ: เปิดรับสมาชิก</option><option value="all">สถานะ: ทั้งหมด</option></select></div><div class="chip-row team-skill-filters" data-skill-filters>${['ทั้งหมด','UX/UI','Developer','Marketing','Content'].map((s,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-skill="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div><div class="topic-filter"><strong>กรองตามหัวข้อ</strong><div class="chip-row" data-topic-filters>${['ทั้งหมด','เทคโนโลยี','การศึกษา','ชุมชน','สิ่งแวดล้อม','ธุรกิจ'].map((s,i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-topic="${s}" aria-pressed="${i===0}">${s}</button>`).join('')}</div></div><div class="team-content"><div class="open-teams"><div class="chip-row team-tabs" data-team-tabs><button class="chip is-active" type="button" data-sort="default" aria-pressed="true">ตำแหน่งที่เปิดรับ</button><button class="chip" type="button" data-sort="newest" aria-pressed="false">เปิดรับล่าสุด</button><button class="chip" type="button" data-sort="deadline" aria-pressed="false">ใกล้ปิดรับ</button></div><div class="team-grid" id="teamGrid" aria-live="polite"></div><p class="sample-note">แสดงตำแหน่งตัวอย่างทั้งหมด 4 ตำแหน่ง</p></div></div></section>`

function initTeamHeroCarousel() {
  const carousel = document.querySelector('[data-team-carousel]')
  const track = carousel?.querySelector('.team-hero-track')
  const slides = track ? [...track.children] : []
  if (!carousel || !track || slides.length < 2) return

  const dots = [...carousel.querySelectorAll('[data-team-dot]')]
  const status = carousel.querySelector('[data-team-status]')
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)')
  const firstClone = slides[0].cloneNode(true)
  const lastClone = slides.at(-1).cloneNode(true)
  firstClone.setAttribute('aria-hidden','true')
  lastClone.setAttribute('aria-hidden','true')
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
    track.classList.toggle('is-jumping',!animated)
    track.style.transform = `translate3d(-${position * 100}%,0,0)`
    if(!animated) requestAnimationFrame(()=>track.classList.remove('is-jumping'))
  }
  function updateState(announce = false) {
    slides.forEach((slide,index)=>{
      const active=index===current
      slide.setAttribute('aria-hidden',String(!active))
      slide.inert=!active
    })
    dots.forEach((dot,index)=>{
      const active=index===current
      dot.classList.toggle('is-active',active)
      dot.setAttribute('aria-current',String(active))
    })
    if(announce) status.textContent=`${teams[current].role} ทีม ${teams[current].name} สไลด์ ${current+1} จาก ${slides.length}`
  }
  function syncAutoplay() {
    clearInterval(timer)
    if(pointerInside||focusInside||document.hidden||motionPreference.matches)return
    timer=setInterval(()=>move(1),5000)
  }
  function move(direction,initiatedByUser=false) {
    if(animating)return
    animating=true
    position+=direction
    current=(current+direction+slides.length)%slides.length
    updateState(initiatedByUser)
    placeTrack()
    if(initiatedByUser)syncAutoplay()
  }
  function goTo(index) {
    if(animating||index===current)return
    current=index
    position=index+1
    animating=true
    updateState(true)
    placeTrack()
    syncAutoplay()
  }

  track.addEventListener('transitionend',event=>{
    if(event.propertyName!=='transform')return
    if(position===0){position=slides.length;placeTrack(false)}
    else if(position===slides.length+1){position=1;placeTrack(false)}
    animating=false
  })
  carousel.querySelector('[data-team-prev]').addEventListener('click',()=>move(-1,true))
  carousel.querySelector('[data-team-next]').addEventListener('click',()=>move(1,true))
  dots.forEach(dot=>dot.addEventListener('click',()=>goTo(Number(dot.dataset.teamDot))))
  carousel.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft')move(-1,true)
    if(event.key==='ArrowRight')move(1,true)
  })
  carousel.addEventListener('pointerenter',()=>{pointerInside=true;syncAutoplay()})
  carousel.addEventListener('pointerleave',()=>{pointerInside=false;syncAutoplay()})
  carousel.addEventListener('focusin',()=>{focusInside=true;syncAutoplay()})
  carousel.addEventListener('focusout',()=>requestAnimationFrame(()=>{focusInside=carousel.contains(document.activeElement);syncAutoplay()}))
  document.addEventListener('visibilitychange',syncAutoplay)
  motionPreference.addEventListener?.('change',syncAutoplay)

  updateState()
  placeTrack(false)
  syncAutoplay()
}

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
document.querySelector('main').addEventListener('click',e=>{const b=e.target.closest('[data-join]');if(b){const t=teams.find(t=>t.name===b.dataset.join);openJoinRequest(t.name,t.role)}})
render()
initTeamHeroCarousel()
