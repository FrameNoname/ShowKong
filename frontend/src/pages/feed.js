import { mountRefresh, escapeHtml, openDialog, readLocal, saveLocal, toast } from '../components/refresh.js'
import { composerForm, bindComposer, POSTS_KEY, showPostSuccess } from '../components/composer.js'
import { openJoinRequest } from '../components/join-request.js'
import { supabase } from '../lib/supabase.js'

// Feed-only DaisyUI component styles, with Tailwind handling ShowKong colors.
const daisyStyles=document.createElement('link')
daisyStyles.rel='stylesheet'
daisyStyles.href='https://cdn.jsdelivr.net/npm/daisyui@5/components/join.css'
document.head.append(daisyStyles)
mountRefresh('feed')
document.title='ฟีด — ShowKong'
document.querySelector('.header-actions .avatar')?.setAttribute('aria-label','เปิดโปรไฟล์ของคุณ')
document.querySelector('.header-actions a[href="/pages/post.html"]')?.remove()
document.querySelector('.brand')?.setAttribute('aria-label','ShowKong ฟีด')
if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}
document.querySelector('[data-shared-footer]').remove()
const posts = [
  {id:'safewalk',type:'กำลังหาทีม',author:'SafeWalk Team',initial:'S',meta:'2 ชม. · เทคโนโลยีเพื่อชุมชน',title:'กำลังหา User Researcher มาช่วยทดสอบ SafeWalk',body:'ทีมกำลังทำแอปช่วยนักศึกษาเลือกเส้นทางกลับหอที่ปลอดภัย อยากได้คนช่วยวางแผนสัมภาษณ์และสรุป insight จากผู้ใช้จริง',detailTitle:'สิ่งที่ทีมต้องการ',detail:'สัมภาษณ์ผู้ใช้ 8–10 คน · ใช้เวลาประมาณ 2 สัปดาห์ · มี Mentor ดูแล',stats:'18 ถูกใจ · 6 ความคิดเห็น',tags:['UserResearch','UX','Safety'],actions:['ดูประวัติทีม','ขอ Join ทีม'],team:'SafeWalk'},
  {id:'greenloop',type:'ขอ Feedback',author:'GreenLoop',initial:'G',meta:'5 ชม. · สิ่งแวดล้อม',title:'ช่วยทดลอง Prototype ระบบสะสมแต้มแยกขยะหน่อย',body:'เราเพิ่งทำ flow ตั้งแต่สแกนถังขยะจนแลกแต้มเสร็จ อยากรู้ว่าขั้นตอนไหนยังงง และรางวัลแบบไหนจูงใจจริง',detailTitle:'สิ่งที่อยากให้ช่วยดู',detail:'Prototype 7 หน้าจอ · ใช้เวลาทดลอง 5 นาที · เปิดรับ Feedback ถึงวันศุกร์',stats:'32 ถูกใจ · 11 ความคิดเห็น',tags:['Prototype','Feedback','GreenTech'],actions:['ทดลอง Demo','ให้ Feedback']},
  {id:'micro',type:'ไอเดียใหม่',author:'Pluem',initial:'P',meta:'เมื่อวาน · ธุรกิจและชุมชน',title:'ถ้านักศึกษาได้ทำ Micro-project ให้ร้านค้าใกล้มหาวิทยาลัยล่ะ?',body:'อยากทำพื้นที่ที่ร้านค้าลงโจทย์สั้น ๆ แบบออกแบบเมนู ทำคอนเทนต์ หรือวิจัยลูกค้า แล้วนักศึกษารวมทีมรับงานจริงได้',detailTitle:'กำลังมองหา',detail:'คนสาย Business 1 คน และ Developer 1 คน มาช่วย validate โมเดลรายได้',stats:'41 ถูกใจ · 15 ความคิดเห็น',tags:['MicroProject','LocalBusiness','Student'],actions:['สนใจไอเดียนี้','ชวนคุย']},
  {id:'sheetquest',type:'ความคืบหน้า',author:'SheetQuest',initial:'S',meta:'2 วันที่แล้ว · การศึกษา',title:'Milestone แรก: มีนักศึกษาทดลองใช้ครบ 186 คนแล้ว',body:'หลังปรับ onboarding เวอร์ชันล่าสุด อัตราทำแบบฝึกหัดแรกสำเร็จเพิ่มจาก 48% เป็น 71% ขอบคุณทุก Feedback จากชุมชน ShowKong',detailTitle:'หลักฐานความคืบหน้า',detail:'186 testers · Completion +23% · เตรียมเปิด Case Study ฉบับเต็ม',stats:'76 ถูกใจ · 9 ความคิดเห็น',tags:['EdTech','Milestone','CaseStudy'],actions:['ดู Case Study','ติดตาม']},
]
const proofOfWork={
  greenloop:{image:'/images/projects/greenloop-preview.webp',skills:['UI/UX'],endorsement:'👀 ผู้สรรหาบุคลากร 3 คนดูแล้ว'},
  sheetquest:{image:'/images/projects/sheetquest-preview.webp',skills:['Data Analysis'],endorsement:'⭐ Startup ผ่านการรับรอง'},
}
function safeProjectLink(value){
  try{const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null}catch{return null}
}
function hasPrototype(p){return Boolean(proofOfWork[p.id]||safeProjectLink(p.demo))}
function matchesSkill(p){
  const aliases={'JavaScript':['javascript','js'],'UI/UX':['ui/ux','ux','ui','userresearch'],'Data Analysis':['data analysis','dataanalysis']}
  const skills=[...(proofOfWork[p.id]?.skills||[]),...p.tags].map(t=>t.toLowerCase())
  return !selectedSkill||aliases[selectedSkill].some(t=>skills.includes(t))
}
let filter='ทั้งหมด'
let selectedSkill=''
let search=''
let selectedTag=''
let localPosts=readLocal(POSTS_KEY,[])
let toggles=readLocal('showkong.feed-actions',{})
// Icons stay local to the feed; the shared navigation and styles are unchanged.
function feedIcon(name, className='h-5 w-5'){
  const paths={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4Z"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>'}
  return `<svg aria-hidden="true" class="${className} shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.grid}</svg>`
}
let savedOnly=false
const panel='rounded-[22px] border border-line bg-white shadow-[0_3px_14px_rgba(35,24,70,0.035)]'
document.querySelector('main').innerHTML=`
<div class="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:py-8 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-brand [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-brand">
  <div class="mx-auto grid max-w-[800px] grid-cols-1 items-start gap-6 xl:max-w-none xl:grid-cols-[240px_minmax(0,1fr)_240px]">
    <aside class="hidden min-w-0 xl:sticky xl:top-6 xl:col-start-1 xl:row-start-1 xl:block">
      <section class="${panel} overflow-hidden"><div class="h-16 bg-linear-to-br from-[#6d5dfb] via-[#8a62e4] to-[#ffb19c]"></div><div class="px-4 pb-4"><span class="relative -mt-6 mb-3 grid h-12 w-12 place-items-center rounded-2xl border-4 border-white bg-brand-soft text-lg font-bold text-brand-dark">P</span><h2 class="text-sm font-bold">พื้นที่ของคุณ</h2><p class="mt-1 text-xs leading-5 text-muted">ไอเดียเล็ก ๆ ก็เป็นจุดเริ่มต้นได้</p><a href="/pages/dashboard.html" class="mt-3 flex items-center justify-between rounded-xl bg-page px-3 py-2.5 text-xs font-semibold hover:bg-brand-soft">จัดการโปรเจกต์ ${feedIcon('arrow','h-4 w-4')}</a>
      <nav aria-label="เมนูชุมชน" class="mt-4 flex flex-col gap-1 border-t border-line pt-3">
        <button type="button" data-view="all" aria-pressed="true" class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-page aria-pressed:bg-brand-soft aria-pressed:font-semibold aria-pressed:text-brand">${feedIcon('home')}ฟีดชุมชน</button>
        <a href="/pages/show-kong.html" class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-page">${feedIcon('grid')}โชว์ผลงาน</a>
        <a href="/pages/find-team.html" class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-page">${feedIcon('people')}หาเพื่อนร่วมทีม</a>
        <button type="button" data-view="saved" aria-pressed="false" class="aria-pressed:[&_svg]:fill-current flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted hover:bg-page aria-pressed:bg-brand aria-pressed:font-semibold aria-pressed:text-white">${feedIcon('bookmark')}บันทึกไว้</button>
      </nav><button type="button" data-compose class="mt-4 w-full rounded-full bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-dark">+ สร้างโพสต์</button></div></section>
      <p class="px-3 py-4 text-[11px] leading-5 text-muted">ShowKong · สร้างสิ่งใหม่ไปด้วยกัน<br>โพสต์ตัวอย่าง · ปฏิสัมพันธ์บันทึกบนอุปกรณ์นี้</p>
    </aside>
    <section class="min-w-0 xl:col-start-2 xl:row-start-1" aria-label="ฟีดชุมชน">
      <h1 class="sr-only">ฟีดชุมชน ShowKong</h1>
      <section class="${panel} p-4 sm:p-5" aria-label="สร้างโพสต์"><div class="flex items-center gap-3"><span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft font-bold text-brand">P</span><button type="button" data-compose class="w-full rounded-full bg-[#f5f3fa] px-4 py-3.5 text-left text-sm text-muted hover:bg-brand-soft">กำลังทำอะไรอยู่? เล่าให้ชุมชนฟังหน่อย</button></div><div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3"><div class="flex gap-4"><button type="button" data-compose class="flex min-h-10 items-center gap-2 text-xs font-medium text-muted hover:text-brand">${feedIcon('grid','h-4 w-4')}แชร์ไอเดีย</button><button type="button" data-compose="กำลังหาทีม" class="flex min-h-10 items-center gap-2 text-xs font-medium text-muted hover:text-brand">${feedIcon('people','h-4 w-4')}ประกาศหาทีม</button></div><button type="button" data-compose class="rounded-full bg-linear-to-r from-brand to-[#8750dc] px-5 py-2.5 text-xs font-semibold text-white hover:brightness-110">โพสต์ ↗</button></div></section>
      <section aria-label="การค้นหาและตัวกรองฟีด" class="mt-6 rounded-2xl border border-line bg-white p-4 sm:p-5">
        <div class="flex flex-col gap-4 min-[1200px]:flex-row">
          <div class="relative min-w-0 min-[1200px]:w-[30%] min-[1200px]:shrink-0"><span class="pointer-events-none absolute left-3 top-3.5 text-muted">${feedIcon('search')}</span><label for="feed-search" class="sr-only">ค้นหาโปรเจกต์ ผู้คน หรือทักษะ</label><input id="feed-search" type="search" placeholder="ค้นหาโปรเจกต์หรือทักษะ…" class="min-h-12 w-full rounded-xl border border-line bg-page py-3 pr-3 pl-10 text-sm"></div>
          <div class="min-w-0 flex-1"><div class="join flex w-full flex-wrap gap-1 rounded-xl bg-page p-1" role="group" aria-label="ตัวกรองฟีด" data-feed-filters>${[['ทั้งหมด','ทั้งหมด'],['กำลังหาทีม','กำลังหาทีม'],['trending','Prototype มาแรง']].map(([key,label],i)=>`<button class="join-item min-h-11 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft aria-pressed:bg-brand aria-pressed:text-white" type="button" data-filter="${key}" aria-pressed="${i===0}">${label}</button>`).join('')}</div></div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4" role="group" aria-label="กรองตามทักษะ"><button type="button" data-view="saved" aria-pressed="false" aria-label="แสดงโพสต์ที่บันทึกไว้" class="aria-pressed:[&_svg]:fill-current min-h-10 rounded-full border border-line p-2.5 text-muted hover:bg-brand-soft aria-pressed:bg-brand aria-pressed:text-white xl:hidden">${feedIcon('bookmark','h-4 w-4')}</button><span class="mr-1 text-xs font-semibold text-muted">ทักษะ</span>${['JavaScript','UI/UX','Data Analysis'].map(skill=>`<button type="button" data-skill="${skill}" aria-pressed="false" class="min-h-10 rounded-full border border-line px-4 py-2 text-sm text-muted hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand-soft aria-pressed:text-brand-dark">${skill}</button>`).join('')}</div>
      </section>
      <div class="mb-3 mt-1 flex items-center justify-between gap-3 text-xs text-muted"><p id="feed-count" role="status"></p><button type="button" data-clear class="text-brand hover:underline" hidden>ล้างตัวกรองทั้งหมด ×</button></div>
      <div class="flex flex-col gap-5" id="postStream" aria-live="polite"></div>
    </section>
    <aside class="hidden min-w-0 flex-col gap-5 xl:sticky xl:top-6 xl:col-start-3 xl:row-start-1 xl:flex">
      <section class="${panel} p-5"><h2 class="text-sm font-bold"><span class="mr-2 text-brand">#</span>เรื่องที่ชุมชนสนใจ</h2><div class="mt-3 flex flex-col gap-1">${[['EdTech','การเรียนรู้ที่ไปได้ไกลกว่าเดิม'],['LocalBusiness','ไอเดียเพื่อธุรกิจใกล้ตัว'],['GreenTech','สร้างสิ่งดี ๆ ให้โลก'],['UserResearch','เริ่มจากเข้าใจผู้ใช้']].map(([tag,desc])=>`<button type="button" data-tag="${tag}" aria-pressed="false" class="rounded-xl px-2 py-3 text-left hover:bg-page aria-pressed:bg-brand-soft"><span class="block text-xs font-semibold">#${tag}</span><span class="mt-1 block text-[11px] text-muted">${desc}</span></button>`).join('')}</div></section>
      <section class="${panel} p-5"><h2 class="text-sm font-bold">โปรเจกต์น่ารู้จัก <span class="text-brand">↗</span></h2><a href="/pages/team-detail.html?team=SafeWalk" class="mt-4 flex items-center gap-3 rounded-xl p-1 hover:bg-page"><span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft font-bold text-brand">S</span><span><strong class="block text-xs">SafeWalk</strong><span class="mt-1 block text-[11px] text-muted">กำลังหา User Researcher</span></span></a><a href="/pages/show-kong.html" class="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand">สำรวจผลงานทั้งหมด ${feedIcon('arrow','h-4 w-4')}</a></section>
    </aside>
  </div>
</div>`

function allPosts(){
  return [...localPosts.map(p=>({...p,isOwner:true,author:'คุณ',initial:'P',meta:'โพสต์บนอุปกรณ์นี้ · '+(p.topic||'โปรเจกต์ใหม่'),body:p.description,detailTitle:'อัปเดตจากเจ้าของโปรเจกต์',detail:'เปิดรับความคิดเห็นและคนที่สนใจร่วมพัฒนาโปรเจกต์นี้',stats:'บันทึกบนอุปกรณ์นี้',tags:p.tags.split(/[,\s]+/).filter(Boolean).map(t=>t.replace(/^#/,'')),actions:['ดูโพสต์']})),...posts]
}
function prototypePanel(p){
  const proof=proofOfWork[p.id]
  const image=proof?.image||p.images?.[0]?.data
  if(!image||!hasPrototype(p))return ''
  const demo=safeProjectLink(p.demo)
  const buttonClass='inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-brand-dark shadow-lg transition-transform hover:scale-105 focus-visible:outline-4 focus-visible:outline-white'
  return `<figure class="mt-5 overflow-hidden rounded-2xl border border-line"><div class="relative isolate grid min-h-64 place-items-center overflow-hidden bg-brand-dark sm:min-h-80">
    <img class="absolute inset-0 h-full w-full object-cover" src="${escapeHtml(image)}" alt="ตัวอย่างโปรเจกต์ — ${escapeHtml(p.title)}" loading="lazy">
    <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-[#17112e]/90 via-[#17112e]/35 to-[#17112e]/20"></div>
    <span class="absolute left-4 top-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs font-semibold tracking-wider text-white">Prototype แบบโต้ตอบ</span>
    <div class="relative z-10 flex flex-col items-center gap-3 px-4 py-16 text-center">${demo?`<a class="${buttonClass}" href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span> เปิด Demo</a>`:`<button type="button" data-action="run-demo" data-post="${escapeHtml(p.id)}" class="${buttonClass}"><span aria-hidden="true">▶</span> ทดลอง Prototype</button>`}<span class="text-xs text-white/90">${demo?'เปิด Demo ในแท็บใหม่':'ตัวอย่างโปรเจกต์ · ยังไม่ได้แนบ Demo'}</span></div>
    <span class="absolute bottom-4 left-4 text-xs font-medium text-white/90">ลงมือสร้าง ทดลอง และพัฒนาไปด้วยกัน</span></div>
    ${proof?`<figcaption class="flex flex-wrap items-center gap-2 bg-[#faf8ff] px-4 py-3"><span class="rounded-full border border-[#ded3fa] bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark">${proof.endorsement}</span><span class="text-xs text-muted">ข้อมูลตัวอย่าง · ยังไม่ได้ยืนยันกิจกรรมจริง</span></figcaption>`:''}</figure>`
}
function postCard(p){
  const preview=hasPrototype(p)

  const tone={
    'กำลังหาทีม':{avatar:'bg-linear-to-br from-[#6d5dfb] to-[#9333ea] text-white',label:'bg-[#eae2ff] text-[#5a2ca0]',mark:'＋'},
    'ขอ Feedback':{avatar:'bg-linear-to-br from-[#047857] to-[#0d9488] text-white',label:'bg-[#d4f5e5] text-[#166044]',mark:'↗'},
    'ไอเดียใหม่':{avatar:'bg-linear-to-br from-[#c2410c] to-[#be185d] text-white',label:'bg-[#ffe3d6] text-[#9a3412]',mark:'✦'},
    'ความคืบหน้า':{avatar:'bg-linear-to-br from-[#26649c] to-[#4f46e5] text-white',label:'bg-[#dfeaff] text-[#334e9c]',mark:'↗'},
  }[p.type]||{avatar:'bg-brand-soft text-brand-dark',label:'bg-brand-soft text-brand-dark',mark:'✦'}

  const ownerActions=p.isOwner?`<div class="ml-1 flex gap-1.5"><button class="rounded-lg border-0 bg-[#f4f2fa] px-[9px] py-1.5 text-xs font-semibold text-[#625f75] transition-colors hover:bg-[#ece8ff] hover:text-[#5948ef]" type="button" data-owner-action="edit" data-post="${escapeHtml(p.id)}" aria-label="แก้ไขโพสต์ ${escapeHtml(p.title)}">แก้ไข</button><button class="rounded-lg border-0 bg-[#f4f2fa] px-[9px] py-1.5 text-xs font-semibold text-[#625f75] transition-colors hover:bg-[#fff0ee] hover:text-[#b42318]" type="button" data-owner-action="delete" data-post="${escapeHtml(p.id)}" aria-label="ลบโพสต์ ${escapeHtml(p.title)}">ลบ</button></div>`:''
  return `<article class="overflow-hidden rounded-[22px] border border-line bg-white p-4 shadow-[0_3px_14px_rgba(35,24,70,0.035)] sm:p-5" id="post-${encodeURIComponent(p.id)}" data-type="${escapeHtml(p.type)}"><div class="flex flex-wrap items-center gap-3"><span class="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg font-bold ${tone.avatar}">${escapeHtml(p.initial)}</span><div class="min-w-0 flex-1"><strong class="block text-sm">${escapeHtml(p.author)}</strong><span class="mt-0.5 block text-xs text-muted">${escapeHtml(p.meta)}</span></div><span class="rounded-full px-3 py-1.5 text-xs font-medium ${tone.label}"><span aria-hidden="true">${tone.mark}</span> ${escapeHtml(p.type)}</span>${ownerActions}</div><div class="mt-4"><h2 class="text-xl font-bold leading-8 sm:text-2xl">${escapeHtml(p.title)}</h2><p class="mt-3 text-base leading-7 text-muted">${escapeHtml(p.body)}</p>${prototypePanel(p)}${!preview&&p.images?.length?`<div class="mt-4 grid grid-cols-2 gap-2 [&_img]:max-h-64 [&_img]:rounded-lg [&_img]:object-cover">${p.images.map(img=>`<img src="${escapeHtml(img.data)}" alt="${escapeHtml(img.name)}">`).join('')}</div>`:''}${p.id==='safewalk'?`<div class="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-[#e5dfff] bg-[#faf8ff] p-4 text-xs"><div><span class="text-muted">ตำแหน่งที่เปิดรับ</span><strong class="mt-1 block text-brand-dark">User Researcher</strong></div><div><span class="text-muted">ระยะเวลาร่วมงาน</span><strong class="mt-1 block">ประมาณ 2 สัปดาห์</strong></div></div>`:''}<div class="mt-4 flex flex-col gap-1 rounded-r-xl border-l-[3px] border-[#9c83ff] bg-linear-to-r from-[#f1eeff] to-[#faf9ff] px-4 py-2 text-xs leading-6"><strong>${escapeHtml(p.detailTitle)}</strong><span>${escapeHtml(p.detail)}</span></div><div class="mt-3 flex flex-wrap gap-2">${p.tags.map(t=>`<button type="button" data-tag="${escapeHtml(t)}" class="rounded-md bg-[#f5f2ff] px-2 py-1 text-xs text-[#6750b3] hover:bg-[#eae2ff] hover:text-brand-dark">#${escapeHtml(t)}</button>`).join('')}</div><div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3"><div class="flex items-center gap-3"><button type="button" data-action="like" data-post="${escapeHtml(p.id)}" aria-pressed="${Boolean(toggles[p.id+'like'])}" aria-label="${toggles[p.id+'like']?'เลิกถูกใจ':'ถูกใจ'} ${escapeHtml(p.title)}" title="ถูกใจ · บันทึกบนอุปกรณ์นี้" class="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs text-muted transition-colors hover:bg-[#fff0f5] hover:text-[#be185d] aria-pressed:bg-[#fff0f5] aria-pressed:text-[#be185d]"><svg aria-hidden="true" viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="${toggles[p.id+'like']?'currentColor':'none'}" stroke="currentColor" stroke-width="1.7"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg><span>ถูกใจ</span><span>${(Number.parseInt(p.stats,10)||0)+(toggles[p.id+'like']?1:0)}</span></button><button type="button" data-action="save" data-post="${escapeHtml(p.id)}" aria-pressed="${Boolean(toggles[p.id+'save'])}" aria-label="${toggles[p.id+'save']?'เลิกบันทึก':'บันทึกโพสต์'} ${escapeHtml(p.title)}" class="aria-pressed:[&_svg]:fill-current grid min-h-11 min-w-11 place-items-center rounded-full text-muted hover:bg-brand-soft aria-pressed:bg-brand aria-pressed:text-white">${feedIcon('bookmark','h-[18px] w-[18px]')}</button><span class="text-xs text-muted">${p.isOwner?'โพสต์ของคุณ':escapeHtml(p.stats.split(' · ')[1]||'')}</span></div><div class="flex flex-wrap items-center gap-2"><button type="button" data-action="ให้ Feedback" data-post="${escapeHtml(p.id)}" class="min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">Feedback</button>${safeProjectLink(p.github)?`<a href="${escapeHtml(safeProjectLink(p.github))}" target="_blank" rel="noopener noreferrer" class="min-h-11 rounded-full border border-line px-4 py-2.5 text-sm font-semibold hover:bg-page" >ดู Code ↗</a>`:`<button type="button" data-action="view-code" data-post="${escapeHtml(p.id)}" class="min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted hover:bg-page" >ดู Code</button>`}</div></div><div class="mt-3 flex flex-wrap justify-end gap-2">${p.actions.filter(action=>!['ให้ Feedback','ทดลอง Demo'].includes(action)).map((action,i)=>{
    const primary=i===p.actions.length-1
    if(action==='ดูประวัติทีม')return `<a class="rounded-full px-3 py-2.5 text-xs font-medium text-muted hover:bg-page" href="/pages/team-detail.html?team=${p.team}">${action}</a>`
    const isToggle=['ติดตาม','สนใจไอเดียนี้'].includes(action)
    return `<button class="rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${primary?'bg-linear-to-r from-[#6d5dfb] to-[#8750dc] text-white shadow-sm hover:brightness-110':'text-muted hover:bg-page'}" data-action="${action}" data-post="${p.id}" type="button" ${isToggle?`aria-pressed="${Boolean(toggles[p.id+action])}"`:''}>${toggles[p.id+action]?(action==='ติดตาม'?'ติดตามแล้ว':'สนใจแล้ว'):action}</button>`
  }).join('')}</div></div></article>`
}
function render(){
  const visible=allPosts().filter(p=>matchesSkill(p)&&(!savedOnly||toggles[p.id+'save'])&&(filter==='ทั้งหมด'||p.type===filter||(filter==='trending'&&hasPrototype(p)))&&(!selectedTag||p.tags.includes(selectedTag))&&[p.title,p.body,p.author,...p.tags].join(' ').toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  if(filter==='trending')visible.sort((a,b)=>(Number.parseInt(b.stats,10)||0)-(Number.parseInt(a.stats,10)||0))
  document.querySelectorAll('[data-skill]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.skill===selectedSkill)))
  document.querySelector('#feed-count').textContent=`${savedOnly?'บันทึกไว้ · ':''}${visible.length} โพสต์${selectedTag?' · #'+selectedTag:''}`
  document.querySelector('[data-clear]').hidden=filter==='ทั้งหมด'&&!search&&!selectedTag&&!savedOnly&&!selectedSkill
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.view==='saved')===savedOnly)))
  document.querySelector('#postStream').innerHTML=visible.length?visible.map(postCard).join(''):'<div class="empty-state"><h2>ยังไม่พบโพสต์ที่ตรงกัน</h2><p>ลองเปลี่ยนตัวกรอง หรือกดบันทึกโพสต์ที่สนใจเพื่อกลับมาดูภายหลัง</p></div>'
  document.querySelectorAll('[data-tag]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tag===selectedTag)))
}
function openComposer(initialType){
  const dialog=openDialog('สร้างโพสต์โปรเจกต์','<p class="dialog-description">แชร์ไอเดีย หาทีม หรือขอความคิดเห็นจากชุมชน</p>'+composerForm())
  const dispose=bindComposer(dialog,()=>{
    dialog.close();localPosts=readLocal(POSTS_KEY,[]);filter='ทั้งหมด';search='';selectedTag='';selectedSkill='';savedOnly=false;document.querySelector('#feed-search').value=''
    document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('is-active',b.dataset.filter==='ทั้งหมด');b.setAttribute('aria-pressed',String(b.dataset.filter==='ทั้งหมด'))})
    render();showPostSuccess(()=>document.querySelector('#postStream').scrollIntoView({behavior:'smooth'}))
  },()=>dialog.close())
  if(typeof initialType==='string')dialog.querySelector(`[data-value="${initialType}"]`)?.click()
  dialog.addEventListener('close',()=>{dispose();if(location.hash==='#post-project')history.replaceState(null,'',location.pathname)},{once:true})
}
function openEditPost(post){
  const dialog=openDialog('แก้ไขโพสต์','<p class="dialog-description">ปรับรายละเอียดโพสต์ของคุณ แล้วกดบันทึกการแก้ไข</p>'+composerForm())
  const dispose=bindComposer(dialog,()=>{
    dialog.close();localPosts=readLocal(POSTS_KEY,[]);render();toast('บันทึกการแก้ไขแล้ว')
  },()=>dialog.close(),post)
  dialog.addEventListener('close',dispose,{once:true})
}
function openDeletePost(post){
  const dialog=openDialog('ลบโพสต์',`<p class="dialog-description">ต้องการลบ “${escapeHtml(post.title)}” ใช่หรือไม่? เมื่อลบแล้วจะนำกลับคืนมาไม่ได้</p><div class="modal-footer"><span></span><div><button class="button button-neutral" type="button" data-cancel-delete>ยกเลิก</button><button class="inline-flex min-h-10 items-center justify-center rounded-lg border-0 bg-[#c9362b] px-5 py-[9px] text-sm font-semibold text-white transition-colors hover:bg-[#aa2e25]" type="button" data-confirm-delete>ลบโพสต์</button></div></div>`)
  dialog.querySelector('[data-cancel-delete]').addEventListener('click',()=>dialog.close())
  dialog.querySelector('[data-confirm-delete]').addEventListener('click',()=>{
    const nextPosts=localPosts.filter(item=>item.id!==post.id)
    if(!saveLocal(POSTS_KEY,nextPosts)){toast('ลบโพสต์ไม่ได้ กรุณาลองใหม่');return}
    localPosts=nextPosts;dialog.close();render();toast('ลบโพสต์แล้ว')
  })
}
document.querySelectorAll('[data-compose]').forEach(button=>button.addEventListener('click',()=>openComposer(button.dataset.compose)))
document.querySelector('#feed-search').addEventListener('input',e=>{search=e.target.value.trim();render()})
document.querySelector('main').addEventListener('click',e=>{
  const skill=e.target.closest('[data-skill]')
  if(skill){selectedSkill=selectedSkill===skill.dataset.skill?'':skill.dataset.skill;render()}
  const view=e.target.closest('[data-view]')
  if(view){savedOnly=view.dataset.view==='saved'?!savedOnly:false;render()}
  const tag=e.target.closest('[data-tag]')
  if(tag){selectedTag=selectedTag===tag.dataset.tag?'':tag.dataset.tag;render()}
  if(e.target.closest('[data-clear]')){
    filter='ทั้งหมด';search='';selectedTag='';selectedSkill='';savedOnly=false;document.querySelector('#feed-search').value=''
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)))
    render()
  }
})
document.querySelector('[data-feed-filters]').addEventListener('click',e=>{
  const b=e.target.closest('[data-filter]');if(!b)return
  filter=b.dataset.filter
  e.currentTarget.querySelectorAll('button').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))})
  render()
})
document.querySelector('#postStream').addEventListener('click',e=>{
  const ownerAction=e.target.closest('[data-owner-action]')
  if(ownerAction){
    const post=localPosts.find(item=>item.id===ownerAction.dataset.post)
    if(!post)return
    if(ownerAction.dataset.ownerAction==='edit')openEditPost(post)
    else if(ownerAction.dataset.ownerAction==='delete')openDeletePost(post)
    return
  }
  const b=e.target.closest('[data-action]');if(!b)return
  const p=allPosts().find(p=>p.id===b.dataset.post)
  const action=b.dataset.action
  if(!p)return
  if(action==='run-demo'||action==='view-code'){
    const isDemo=action==='run-demo'
    openDialog(isDemo?'ตัวอย่าง Prototype':'ดู Code',`<p class="dialog-description"><strong>${escapeHtml(p.title)}</strong></p><p class="dialog-description">${isDemo?'นี่คือตัวอย่างโปรเจกต์ เจ้าของยังไม่ได้แนบลิงก์ Demo ที่ใช้งานได้':'เจ้าของยังไม่ได้แนบลิงก์ Code Repository แบบสาธารณะ'}</p>${isDemo&&proofOfWork[p.id]?`<img class="w-full rounded-xl" src="${proofOfWork[p.id].image}" alt="${escapeHtml(p.title)}">`:''}`)
    return
  }
  if(action==='like'||action==='save'){
    const key=p.id+action
    const next={...toggles,[key]:!toggles[key]}
    if(!saveLocal('showkong.feed-actions',next)){toast('บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บ');return}
    toggles=next
    if(action==='save'&&savedOnly){render();document.querySelector('[data-clear]').focus({preventScroll:true});return}
    // Replace only this post so the timeline stays put, then restore keyboard focus.
    const article=b.closest('article')
    article.outerHTML=postCard(p)
    document.getElementById('post-'+encodeURIComponent(p.id)).querySelector(`[data-action="${action}"]`).focus({preventScroll:true})
    return
  }
  if(action==='ขอ Join ทีม'){openJoinRequest('SafeWalk','User Researcher');return}
  if(['ติดตาม','สนใจไอเดียนี้'].includes(action)){
    const next={...toggles,[p.id+action]:!toggles[p.id+action]}
    if(saveLocal('showkong.feed-actions',next)){toggles=next;render()}else toast('บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บ')
    return
  }
  if(['ให้ Feedback','ชวนคุย'].includes(action)){
    const dialog=openDialog(action,`<p class="dialog-description">${escapeHtml(p.title)}</p><form><label>ข้อความ<textarea name="message" required maxlength="2000" rows="4" placeholder="แชร์ความคิดเห็นของคุณ"></textarea></label><p class="sample-note">ข้อความจะบันทึกบนอุปกรณ์นี้ ยังไม่ได้ส่งถึงเจ้าของโพสต์</p><p class="form-error" role="alert" hidden></p><button class="button button-primary" type="submit">บันทึกข้อความ</button></form>`)
    dialog.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const message=new FormData(e.currentTarget).get('message').trim();if(!message)return;const saved=readLocal('showkong.feedback',[]);if(saveLocal('showkong.feedback',[...saved,{postId:p.id,message}])){dialog.close();toast('บันทึกข้อความบนอุปกรณ์นี้แล้ว')}else{const error=dialog.querySelector('.form-error');error.hidden=false;error.textContent='ไม่สามารถบันทึกข้อความได้'}})
    return
  }
  let links=''
  for(const [key,label]of [['demo','เปิด Demo'],['github','เปิด GitHub']]){
    if(p[key]&&/^https?:\/\//i.test(p[key]))links+=`<a class="button button-neutral" href="${escapeHtml(p[key])}" target="_blank" rel="noopener noreferrer">${label}</a>`
  }
  openDialog(action==='ดูโพสต์'?p.title:action,`<p class="dialog-description"><strong>${escapeHtml(p.title)}</strong></p><p class="dialog-description">${escapeHtml(p.body)}</p><div class="join-summary"><strong>${escapeHtml(p.detailTitle)}</strong><span>${escapeHtml(p.detail)}</span></div>${links?`<div class="button-row">${links}</div>`:'<p class="sample-note">โพสต์ตัวอย่างนี้ยังไม่มีลิงก์ Demo หรือ Case Study แนบมา</p>'}`)
})
render()
if(location.hash==='#post-project')openComposer()
else if(location.hash.startsWith('#post-'))requestAnimationFrame(()=>{
  const target=document.getElementById(location.hash.slice(1))
  if(!target)return
  target.scrollIntoView({block:'center'})
  target.classList.add('ring-2','ring-[#6d5dfb]','ring-offset-4')
  setTimeout(()=>target.classList.remove('ring-2','ring-[#6d5dfb]','ring-offset-4'),2400)
})
