import { mountRefresh, readLocal, saveLocal, openDialog, toast, escapeHtml } from '../components/refresh.js'
import { designIcon } from '../components/design-assets.js'
import { composerForm, bindComposer, POSTS_KEY } from '../components/composer.js'

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
let localPosts = readLocal(POSTS_KEY, [])
const POSTS_PER_PAGE = 5
let postsPage = 1
function requestRow(r) {
  return `<div class="request-row"><span class="avatar">${r.name[0]}</span><div class="request-copy"><strong>${r.name}</strong><small>${r.role}</small></div><button class="button button-small button-primary" type="button" data-accept="${r.id}" aria-label="รับ ${r.name} เข้าทีม">รับ</button><button class="button button-small button-neutral" type="button" data-request="${r.id}" aria-label="ดูคำขอของ ${r.name}">ดู</button></div>`
}
function feedbackRow(f) {
  return `<button class="feedback-row" type="button" data-feedback="${f.id}"><strong>${f.name} แสดงความคิดเห็นใน ${f.team}</strong><p>“${f.message}”</p></button>`
}
function deadlines() {
  return `<div class="deadline-row"><span class="activity-icon">${designIcon('dashboard/imgCalendar')}</span><div><strong>SheetQuest · Demo รอบ 2</strong><small>18 ก.ย. 2026</small></div></div><div class="deadline-row"><span class="activity-icon">${designIcon('dashboard/imgCalendar1')}</span><div><strong>SafeWalk · สรุปผลทดสอบ</strong><small>22 ก.ย. 2026</small></div></div>`
}
function myPostRows() {
  if(!localPosts.length)return `<div class="rounded-2xl border border-dashed border-[#cbc6df] bg-[#faf9fd] px-5 py-8 text-center"><h3 class="text-lg font-semibold text-[#191629]">ยังไม่มีโพสต์ของคุณ</h3><p class="mt-2 text-sm text-[#625f75]">สร้างโพสต์แรก แล้วกลับมาจัดการทั้งหมดได้จากหน้านี้</p><a class="button button-primary mt-4" href="/pages/post.html">สร้างโพสต์</a></div>`
  const totalPages=Math.ceil(localPosts.length/POSTS_PER_PAGE)
  postsPage=Math.min(Math.max(postsPage,1),totalPages)
  const start=(postsPage-1)*POSTS_PER_PAGE
  const pagePosts=localPosts.slice(start,start+POSTS_PER_PAGE)
  const rows=pagePosts.map(post=>{
    const tags=String(post.tags||'').split(/[,\s]+/).filter(Boolean).map(tag=>tag.replace(/^#/,''))
    const createdAt=post.createdAt&&Number.isFinite(new Date(post.createdAt).getTime())?new Intl.DateTimeFormat('th-TH',{dateStyle:'medium'}).format(new Date(post.createdAt)):'บันทึกบนอุปกรณ์นี้'
    return `<article class="rounded-2xl border border-[#e3e0ed] bg-white p-5 shadow-[0_4px_16px_rgba(23,21,43,0.04)]" data-dashboard-post="${escapeHtml(post.id)}"><div class="flex flex-wrap items-center gap-2"><span class="rounded-full bg-[#f1eeff] px-3 py-1 text-xs font-semibold text-[#5948ef]">${escapeHtml(post.type||'โพสต์')}</span><time class="text-xs text-[#777287]">${escapeHtml(createdAt)}</time></div><h3 class="mt-3 text-lg font-semibold text-[#191629]">${escapeHtml(post.title)}</h3><p class="mt-1.5 text-sm leading-6 text-[#625f75]">${escapeHtml(post.description)}</p>${tags.length?`<div class="mt-3 flex flex-wrap gap-1.5">${tags.map(tag=>`<span class="rounded-full bg-[#f7f5fc] px-2.5 py-1 text-xs text-[#625f75]">#${escapeHtml(tag)}</span>`).join('')}</div>`:''}<div class="mt-4 flex flex-wrap justify-end gap-2 border-t border-[#efedf5] pt-4"><a class="button button-small button-neutral" href="/pages/feed.html#post-${encodeURIComponent(post.id)}">ดูใน Feed</a><button class="button button-small button-neutral" type="button" data-edit-my-post="${escapeHtml(post.id)}">แก้ไข</button><button class="rounded-lg border border-[#f0c7c3] bg-[#fff7f6] px-4 py-2 text-sm font-semibold text-[#b42318] transition-colors hover:bg-[#fff0ee]" type="button" data-delete-my-post="${escapeHtml(post.id)}">ลบ</button></div></article>`
  }).join('')
  const pagination=totalPages>1?`<nav class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#efedf5] pt-4" aria-label="เปลี่ยนหน้าโพสต์ของฉัน"><span class="text-xs text-[#777287]">หน้า ${postsPage} จาก ${totalPages} · ทั้งหมด ${localPosts.length} โพสต์</span><div class="flex gap-2"><button class="button button-small button-neutral disabled:cursor-not-allowed disabled:opacity-40" type="button" data-post-page="${postsPage-1}" ${postsPage===1?'disabled':''}>← ก่อนหน้า</button><button class="button button-small button-neutral disabled:cursor-not-allowed disabled:opacity-40" type="button" data-post-page="${postsPage+1}" ${postsPage===totalPages?'disabled':''}>ถัดไป →</button></div></nav>`:''
  return `<div class="grid gap-3">${rows}</div>${pagination}`
}
function openEditPost(post) {
  const dialog=openDialog('แก้ไขโพสต์','<p class="dialog-description">แก้รายละเอียดโพสต์ของคุณได้จากที่นี่</p>'+composerForm())
  const dispose=bindComposer(dialog,()=>{dialog.close();localPosts=readLocal(POSTS_KEY,[]);render();toast('บันทึกการแก้ไขแล้ว')},()=>dialog.close(),post)
  dialog.addEventListener('close',dispose,{once:true})
}
function openDeletePost(post) {
  const dialog=openDialog('ลบโพสต์',`<p class="dialog-description">ต้องการลบ “${escapeHtml(post.title)}” ใช่หรือไม่? เมื่อลบแล้วจะนำกลับคืนมาไม่ได้</p><div class="modal-footer"><span></span><div><button class="button button-neutral" type="button" data-cancel-delete>ยกเลิก</button><button class="inline-flex min-h-10 items-center justify-center rounded-lg border-0 bg-[#c9362b] px-5 py-[9px] text-sm font-semibold text-white transition-colors hover:bg-[#aa2e25]" type="button" data-confirm-delete>ลบโพสต์</button></div></div>`)
  dialog.querySelector('[data-cancel-delete]').addEventListener('click',()=>dialog.close())
  dialog.querySelector('[data-confirm-delete]').addEventListener('click',()=>{
    const nextPosts=localPosts.filter(item=>item.id!==post.id)
    if(!saveLocal(POSTS_KEY,nextPosts)){toast('ลบโพสต์ไม่ได้ กรุณาลองใหม่');return}
    localPosts=nextPosts;dialog.close();render();toast('ลบโพสต์แล้ว')
  })
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
  <section class="dashboard-panel" id="myPosts"><div class="section-heading-row"><h2>โพสต์ของฉัน</h2><a class="text-link" href="/pages/post.html">สร้างโพสต์ใหม่ →</a></div>${myPostRows()}</section>
  <section class="dashboard-panel"><div class="section-heading-row"><h2>กิจกรรมล่าสุด</h2><button class="text-link" type="button" data-view="activity">ทั้งหมด</button></div>${[
    ['imgIcon','Mew อัปเดตความคืบหน้าใน SheetQuest','Prototype พร้อมทดสอบรอบที่ 2','2 ชม.'],
    ['imgIconFeedback','Nan แสดงความคิดเห็นใน SafeWalk','ขอให้เพิ่มจุดแจ้งเหตุบริเวณหอพัก','5 ชม.'],
    ['imgIcon1','Korn ส่งคำขอเข้าร่วมทีม','สนใจตำแหน่ง Frontend Developer','เมื่อวาน']
  ].map(([icon,title,body,time])=>`<div class="activity-row"><span class="activity-icon">${designIcon('dashboard/'+icon)}</span><div><strong>${title}</strong><p>${body}</p></div><time>${time}</time></div>`).join('')}</section></div>
  <aside class="dashboard-panel action-center"><h2>ต้องจัดการ</h2><div class="action-summary">${designIcon('dashboard/imgIcon2')}<strong>มี ${pending.length+unread.length+2} รายการที่รอคุณอยู่</strong></div><section class="action-section"><h3>คำขอเข้าทีม</h3>${pending.slice(0,2).map(requestRow).join('')||'<p class="sample-note">ตอบรับคำขอทั้งหมดแล้ว</p>'}</section><section class="action-section"><h3>Feedback ที่ยังไม่ได้อ่าน</h3>${unread.slice(0,2).map(feedbackRow).join('')||'<p class="sample-note">อ่าน Feedback ครบแล้ว</p>'}</section><section class="action-section"><h3>กำหนดส่งใกล้ถึง</h3>${deadlines()}</section><button class="button button-neutral full-width" type="button" data-view="all">ดูงานทั้งหมด</button></aside></div><p class="sample-note">ข้อมูลตัวอย่างตามดีไซน์ · การตอบรับและการอ่านบันทึกบนอุปกรณ์นี้</p></div>`
}
document.addEventListener('click',e=>{
  const postPage=e.target.closest('[data-post-page]')
  if(postPage&&!postPage.disabled){
    postsPage=Number(postPage.dataset.postPage)||1
    render()
    requestAnimationFrame(()=>document.querySelector('#myPosts')?.scrollIntoView({block:'start'}))
    return
  }
  const editPost=e.target.closest('[data-edit-my-post]')
  if(editPost){
    const post=localPosts.find(item=>item.id===editPost.dataset.editMyPost)
    if(post)openEditPost(post)
    return
  }
  const deletePost=e.target.closest('[data-delete-my-post]')
  if(deletePost){
    const post=localPosts.find(item=>item.id===deletePost.dataset.deleteMyPost)
    if(post)openDeletePost(post)
    return
  }
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
  if(key==='posts'){document.querySelector('#myPosts').scrollIntoView({behavior:'smooth'});return}
  if(key==='activity'){openDialog('กิจกรรมทั้งหมด',document.querySelector('.dashboard-left > section:last-child').innerHTML.replace(/<button[\s\S]*?<\/button>/,''));return}
  const content = (['requests','all'].includes(key)?'<h3>คำขอเข้าทีม</h3>'+(pending.map(requestRow).join('')||'<p class="dialog-description">ไม่มีคำขอค้างอยู่</p>'):'')+
    (['feedback','all'].includes(key)?'<h3 class="dialog-description">Feedback</h3>'+(unread.map(feedbackRow).join('')||'<p class="dialog-description">อ่านครบแล้ว</p>'):'')+
    (['deadlines','all'].includes(key)?'<h3 class="dialog-description">กำหนดส่งใกล้ถึง</h3>'+deadlines():'')
  openDialog('รายการที่ต้องจัดการ',content)
})
render()
