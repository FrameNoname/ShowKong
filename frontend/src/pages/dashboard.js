import { mountRefresh, readLocal, saveLocal, openDialog, toast } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'

mountRefresh('dashboard')
document.querySelector('[data-shared-footer]').remove()
const requests = [
  { id:'mint', name:'Mint', role:'UX Researcher', team:'SheetQuest' },
  { id:'ken', name:'Ken', role:'Frontend Developer', team:'SafeWalk' },
  { id:'korn', name:'Korn', role:'Frontend Developer', team:'SheetQuest' },
  { id:'fern', name:'Fern', role:'Data Analyst', team:'SafeWalk' },
  { id:'pim', name:'Pim', role:'Content Designer', team:'SheetQuest' },
]
const feedback = [
  { id:'nan', name:'Nan', team:'SheetQuest', message:'Flow การสมัครใช้งานยังยาวไปนิด' },
  { id:'beam', name:'Beam', team:'SafeWalk', message:'อยากให้เพิ่ม Dark Mode' },
  { id:'aom', name:'Aom', team:'SheetQuest', message:'อยากทดลอง Prototype รอบถัดไป' },
]
const myProjects = [
  { name:'SheetQuest', title:'แอปช่วยเรียนแบบเกม', description:'กำลังเตรียม Prototype สำหรับทดสอบรอบที่ 2', meta:'สมาชิก 4 คน · อัปเดตเมื่อ 2 ชม. ที่แล้ว', progress:70 },
  { name:'SafeWalk', title:'เส้นทางปลอดภัยในมหาวิทยาลัย', description:'กำลังสรุปผลทดสอบกับนักศึกษาช่วงกลางคืน', meta:'สมาชิก 3 คน · อัปเดตเมื่อวาน', progress:45 },
]
let state = readLocal('showkong.dashboard-demo', { accepted:[], read:[] })
if(!Array.isArray(state.accepted)||!Array.isArray(state.read))state={accepted:[],read:[]}
function requestRow(r) {
  return `<div class="request-row"><span class="avatar">${r.name[0]}</span><div class="request-copy"><strong>${r.name}</strong><small>${r.role}</small></div><button class="button button-small button-primary" type="button" data-accept="${r.id}" aria-label="รับ ${r.name} เข้าทีม">รับ</button><button class="button button-small button-neutral" type="button" data-request="${r.id}" aria-label="ดูคำขอของ ${r.name}">ดู</button></div>`
}
function feedbackRow(f) {
  return `<button class="feedback-row" type="button" data-feedback="${f.id}"><strong>${f.name} แสดงความคิดเห็นใน ${f.team}</strong><p>“${f.message}”</p></button>`
}
function deadlines() {
  return `<div class="deadline-row"><span class="activity-icon">${designIcon('dashboard/imgCalendar')}</span><div><strong>SheetQuest · Demo รอบ 2</strong><small>18 ก.ย. 2026</small></div></div><div class="deadline-row"><span class="activity-icon">${designIcon('dashboard/imgCalendar1')}</span><div><strong>SafeWalk · สรุปผลทดสอบ</strong><small>22 ก.ย. 2026</small></div></div>`
}
function render() {
  const pending = requests.filter(r=>!state.accepted.includes(r.id))
  const unread = feedback.filter(f=>!state.read.includes(f.id))
  document.querySelector('main').innerHTML = `
  <div class="dashboard-container"><section class="dashboard-hero"><h1>สวัสดี Athich</h1><p>วันนี้มี ${pending.length+unread.length+2} รายการที่ต้องจัดการ และ 2 โปรเจกต์กำลังดำเนินอยู่</p></section>
  <section class="dashboard-stats" aria-label="สรุปภาพรวม">${[
    ['Projects','2','โปรเจกต์ที่กำลังทำ','projects'],
    ['Feedback',unread.length,'Feedback ที่ยังไม่ได้อ่าน','feedback'],
    ['JoinRequests',pending.length,'คำขอเข้าทีมที่รอตอบ','requests'],
    ['Deadlines','2','กำหนดส่งใกล้ถึง','deadlines'],
  ].map(([icon,count,label,key])=>`<button class="stat-card" type="button" data-view="${key}"><span class="stat-icon">${designIcon('dashboard/imgIcon'+icon)}</span><strong>${count}</strong><span>${label}</span></button>`).join('')}</section>
  <div class="dashboard-columns"><div class="dashboard-left"><section class="dashboard-panel my-projects" id="myProjects"><div class="section-heading-row"><h2>โปรเจกต์ของฉัน</h2><button class="text-link" data-view="projects" type="button">ดูทั้งหมด →</button></div>${myProjects.map((p,i)=>`<article class="dashboard-project"><div class="dashboard-cover ${i?'alt':''}"><span>กำลังทำ</span></div><div><h3>${p.name} — ${p.title}</h3><p>${p.description}</p><small>${p.meta}</small><div class="project-progress-row"><progress value="${p.progress}" max="100" aria-label="ความคืบหน้า ${p.name}">${p.progress}%</progress><span>${p.progress}%</span><button class="button button-small button-neutral" type="button" data-manage="${p.name}">จัดการโปรเจกต์</button></div></div></article>`).join('')}</section>
  <section class="dashboard-panel"><div class="section-heading-row"><h2>กิจกรรมล่าสุด</h2><button class="text-link" type="button" data-view="activity">ทั้งหมด</button></div>${[
    ['imgIcon','Mew อัปเดตความคืบหน้าใน SheetQuest','Prototype พร้อมทดสอบรอบที่ 2','2 ชม.'],
    ['imgIconFeedback','Nan แสดงความคิดเห็นใน SafeWalk','ขอให้เพิ่มจุดแจ้งเหตุบริเวณหอพัก','5 ชม.'],
    ['imgIcon1','Korn ส่งคำขอเข้าร่วมทีม','สนใจตำแหน่ง Frontend Developer','เมื่อวาน']
  ].map(([icon,title,body,time])=>`<div class="activity-row"><span class="activity-icon">${designIcon('dashboard/'+icon)}</span><div><strong>${title}</strong><p>${body}</p></div><time>${time}</time></div>`).join('')}</section></div>
  <aside class="dashboard-panel action-center"><h2>ต้องจัดการ</h2><div class="action-summary">${designIcon('dashboard/imgIcon2')}<strong>มี ${pending.length+unread.length+2} รายการที่รอคุณอยู่</strong></div><section class="action-section"><h3>คำขอเข้าทีม</h3>${pending.slice(0,2).map(requestRow).join('')||'<p class="sample-note">ตอบรับคำขอทั้งหมดแล้ว</p>'}</section><section class="action-section"><h3>Feedback ที่ยังไม่ได้อ่าน</h3>${unread.slice(0,2).map(feedbackRow).join('')||'<p class="sample-note">อ่าน Feedback ครบแล้ว</p>'}</section><section class="action-section"><h3>กำหนดส่งใกล้ถึง</h3>${deadlines()}</section><button class="button button-neutral full-width" type="button" data-view="all">ดูงานทั้งหมด</button></aside></div><p class="sample-note">ข้อมูลตัวอย่างตามดีไซน์ · การตอบรับและการอ่านบันทึกบนอุปกรณ์นี้</p></div>`
}
document.addEventListener('click',e=>{
  const accept=e.target.closest('[data-accept]')
  if(accept) {
    const request=requests.find(r=>r.id===accept.dataset.accept)
    if(!request||state.accepted.includes(request.id))return
    const next={...state,accepted:[...state.accepted,request.id]}
    if(!saveLocal('showkong.dashboard-demo',next)){toast('บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บ');return}
    state=next
    accept.closest('dialog')?.close()
    render()
    toast('บันทึกการรับ '+request.name+' ในข้อมูลตัวอย่างแล้ว')
    return
  }
  const requestButton=e.target.closest('[data-request]')
  if(requestButton) {
    const r=requests.find(r=>r.id===requestButton.dataset.request)
    requestButton.closest('dialog')?.close()
    openDialog('คำขอเข้าทีมจาก '+r.name,`<div class="join-summary"><strong>${r.team}</strong><span>${r.role}</span></div><p class="dialog-description">${r.name} สนใจร่วมทีมในตำแหน่ง ${r.role}</p><p class="sample-note">คำขอตัวอย่างสำหรับทดลองหน้าจอ</p><button class="button button-primary full-width" data-accept="${r.id}" type="button">รับเข้าทีม</button>`)
    return
  }
  const feedbackButton=e.target.closest('[data-feedback]')
  if(feedbackButton) {
    const f=feedback.find(f=>f.id===feedbackButton.dataset.feedback)
    const next={...state,read:[...new Set([...state.read,f.id])]}
    if(saveLocal('showkong.dashboard-demo',next))state=next
    feedbackButton.closest('dialog')?.close()
    render()
    openDialog('Feedback ของ '+f.team,`<p class="dialog-description"><strong>${f.name}</strong></p><p class="dialog-description">“${f.message}”</p><button class="button button-primary" data-close-dialog type="button">อ่านแล้ว</button>`)
    return
  }
  const manage=e.target.closest('[data-manage]')
  if(manage) {
    const p=myProjects.find(p=>p.name===manage.dataset.manage)
    openDialog('จัดการ '+p.name,`<p class="dialog-description">${p.description}</p><div class="join-summary"><strong>ความคืบหน้า ${p.progress}%</strong><span>${p.meta}</span></div><div class="button-row"><a class="button button-primary" href="/pages/post.html?project=${p.name}">อัปเดตความคืบหน้า</a><a class="button button-neutral" href="/pages/team-detail.html?team=${p.name}">ดูทีม</a></div>`)
    return
  }
  const view=e.target.closest('[data-view]')
  if(!view)return
  const key=view.dataset.view
  const pending=requests.filter(r=>!state.accepted.includes(r.id))
  const unread=feedback.filter(f=>!state.read.includes(f.id))
  if(key==='projects'){document.querySelector('#myProjects').scrollIntoView({behavior:'smooth'});return}
  if(key==='activity'){openDialog('กิจกรรมทั้งหมด',document.querySelector('.dashboard-left > section:last-child').innerHTML.replace(/<button[\s\S]*?<\/button>/,''));return}
  const content = (['requests','all'].includes(key)?'<h3>คำขอเข้าทีม</h3>'+(pending.map(requestRow).join('')||'<p class="dialog-description">ไม่มีคำขอค้างอยู่</p>'):'')+
    (['feedback','all'].includes(key)?'<h3 class="dialog-description">Feedback</h3>'+(unread.map(feedbackRow).join('')||'<p class="dialog-description">อ่านครบแล้ว</p>'):'')+
    (['deadlines','all'].includes(key)?'<h3 class="dialog-description">กำหนดส่งใกล้ถึง</h3>'+deadlines():'')
  openDialog('รายการที่ต้องจัดการ',content)
})
render()
