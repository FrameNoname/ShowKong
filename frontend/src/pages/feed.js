import { mountRefresh, escapeHtml, openDialog, readLocal, saveLocal, toast } from '../components/refresh.js'
import { composerForm, bindComposer, POSTS_KEY, showPostSuccess } from '../components/composer.js'
import { openJoinRequest } from '../components/join-request.js'
import { supabase } from '../lib/supabase.js'
import '../feed-anime.css'

mountRefresh('feed')
if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}
document.querySelector('[data-shared-footer]')?.remove()

const posts = [
  {id:'safewalk',type:'กำลังหาทีม',author:'SafeWalk Team',initial:'S',meta:'2 ชม. · เทคโนโลยีเพื่อชุมชน',title:'กำลังหา User Researcher มาช่วยทดสอบ SafeWalk',body:'ทีมกำลังทำแอปช่วยนักศึกษาเลือกเส้นทางกลับหอที่ปลอดภัย อยากได้คนช่วยวางแผนสัมภาษณ์และสรุป insight จากผู้ใช้จริง',detailTitle:'สิ่งที่ทีมต้องการ',detail:'สัมภาษณ์ผู้ใช้ 8–10 คน · ใช้เวลาประมาณ 2 สัปดาห์ · มี Mentor ดูแล',stats:'18 ถูกใจ · 6 ความคิดเห็น',tags:['UserResearch','UX','Safety'],actions:['ดูประวัติทีม','ขอ Join ทีม'],team:'SafeWalk'},
  {id:'greenloop',type:'ขอ Feedback',author:'GreenLoop',initial:'G',meta:'5 ชม. · สิ่งแวดล้อม',title:'ช่วยทดลอง Prototype ระบบสะสมแต้มแยกขยะหน่อย',body:'เราเพิ่งทำ flow ตั้งแต่สแกนถังขยะจนแลกแต้มเสร็จ อยากรู้ว่าขั้นตอนไหนยังงง และรางวัลแบบไหนจูงใจจริง',detailTitle:'สิ่งที่อยากให้ช่วยดู',detail:'Prototype 7 หน้าจอ · ใช้เวลาทดลอง 5 นาที · เปิดรับ Feedback ถึงวันศุกร์',stats:'32 ถูกใจ · 11 ความคิดเห็น',tags:['Prototype','Feedback','GreenTech'],actions:['ทดลอง Demo','ให้ Feedback']},
  {id:'micro',type:'ไอเดียใหม่',author:'Pluem',initial:'P',meta:'เมื่อวาน · ธุรกิจและชุมชน',title:'ถ้านักศึกษาได้ทำ Micro-project ให้ร้านค้าใกล้มหาวิทยาลัยล่ะ?',body:'อยากทำพื้นที่ที่ร้านค้าลงโจทย์สั้น ๆ แบบออกแบบเมนู ทำคอนเทนต์ หรือวิจัยลูกค้า แล้วนักศึกษารวมทีมรับงานจริงได้',detailTitle:'กำลังมองหา',detail:'คนสาย Business 1 คน และ Developer 1 คน มาช่วย validate โมเดลรายได้',stats:'41 ถูกใจ · 15 ความคิดเห็น',tags:['MicroProject','LocalBusiness','Student'],actions:['สนใจไอเดียนี้','ชวนคุย']},
  {id:'sheetquest',type:'ความคืบหน้า',author:'SheetQuest',initial:'S',meta:'2 วันที่แล้ว · การศึกษา',title:'Milestone แรก: มีนักศึกษาทดลองใช้ครบ 186 คนแล้ว',body:'หลังปรับ onboarding เวอร์ชันล่าสุด อัตราทำแบบฝึกหัดแรกสำเร็จเพิ่มจาก 48% เป็น 71% ขอบคุณทุก Feedback จากชุมชน ShowKong',detailTitle:'หลักฐานความคืบหน้า',detail:'186 testers · Completion +23% · เตรียมเปิด Case Study ฉบับเต็ม',stats:'76 ถูกใจ · 9 ความคิดเห็น',tags:['EdTech','Milestone','CaseStudy'],actions:['ดู Case Study','ติดตาม']},
]

let filter = 'ทั้งหมด'
let localPosts = readLocal(POSTS_KEY, [])
let toggles = readLocal('showkong.feed-actions', {})

document.querySelector('main').innerHTML = `
<!-- Floating Left Skyscraper Ad -->
<aside class="floating-ad-skyscraper floating-ad-left" id="floatingAdLeft">
  <div class="skyscraper-card">
    <button class="ad-close-btn" data-close-ad="floatingAdLeft" title="ปิดโฆษณา" aria-label="ปิดโฆษณา">✕</button>
    <div class="ad-box" data-ad-trigger="ufa11k">
      <span class="ad-badge">แทงบอล 24H</span>
      <img src="/images/banners/ad_left.jpg" alt="ShowKong League แทงบอลออนไลน์">
    </div>
  </div>
</aside>

<!-- Floating Right Skyscraper Ad -->
<aside class="floating-ad-skyscraper floating-ad-right" id="floatingAdRight">
  <div class="skyscraper-card">
    <button class="ad-close-btn" data-close-ad="floatingAdRight" title="ปิดโฆษณา" aria-label="ปิดโฆษณา">✕</button>
    <div class="ad-box" data-ad-trigger="sexy365">
      <span class="ad-badge">สล็อต 77</span>
      <img src="/images/banners/ad_right.jpg" alt="ShowKong Rewards สล็อตแตกง่าย">
    </div>
  </div>
</aside>

<!-- Floating Sticky Bottom Banner Ad -->
<div class="floating-ad-bottom-wrapper" id="floatingAdBottom">
  <div class="bottom-ad-card">
    <button class="ad-close-btn" data-close-ad="floatingAdBottom" title="ปิดโฆษณา" aria-label="ปิดโฆษณา">✕</button>
    <div class="ad-box" data-ad-trigger="sexy365">
      <span class="ad-badge">VIP คาสิโนสด</span>
      <img src="/images/banners/ad_sexy365.png" alt="SEXY365BET สมัครสมาชิกรับโบนัส">
    </div>
  </div>
</div>

<div class="feed-canvas">
  <!-- Top 2-Banner Grid -->
  <section class="feed-top-ads" aria-label="ผู้สนับสนุน">
    <div class="top-ad-item" id="topAd1">
      <div class="ad-box" data-ad-trigger="mahagame" title="คลิกเพื่อรับสิทธิ์ MAHAGAME66">
        <span class="ad-badge">VIP SPONSOR</span>
        <img src="/images/banners/ad_mahagame.png" alt="MAHAGAME66 รวมสล็อตกว่า 5,000 เกม">
      </div>
    </div>
    <div class="top-ad-item" id="topAd2">
      <div class="ad-box" data-ad-trigger="ufagool" title="คลิกเพื่อรับสิทธิ์ UFAGOOL">
        <span class="ad-badge">OFFICIAL PARTNER</span>
        <img src="/images/banners/ad_ufagool.png" alt="UFAGOOL เว็บตรงจากบ้านผลบอล">
      </div>
    </div>
  </section>

  <section class="feed-toolbar">
    <h1>เลือกดูตามสิ่งที่อยากทำ</h1>
    <div class="chip-row feed-filters" data-feed-filters>
      ${[['ทั้งหมด','สำหรับคุณ'],['ไอเดียใหม่','ไอเดียใหม่'],['กำลังหาทีม','กำลังหาทีม'],['ขอ Feedback','ขอ Feedback'],['เปิดให้ทดลอง','เปิดให้ทดลอง'],['ความคืบหน้า','ความคืบหน้า']].map(([key,label],i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-filter="${key}" aria-pressed="${i===0}">${label}</button>`).join('')}
    </div>
  </section>

  <div class="feed-columns">
    <div class="post-stream" id="postStream" aria-live="polite"></div>
    <aside class="feed-sidebar">
      <article class="sidebar-card trending-card">
        <h3>หัวข้อกำลังมาแรง</h3>
        ${[['EdTech',24],['LocalBusiness',18],['GreenTech',13],['UserResearch',11]].map(([tag,n])=>`<p><span>#${tag}</span><small>${n} โพสต์</small></p>`).join('')}
      </article>

      <!-- Sidebar Gambling Sponsor Card -->
      <article class="sidebar-ad-card">
        <h4><span>🎰</span> เว็บตรงสปอนเซอร์หลัก</h4>
        <p>แทงบอล & สล็อตออนไลน์อันดับ 1 ระบบออโต้ ฝาก-ถอน 5 วินาที</p>
        <div class="ad-box" data-ad-trigger="ufa11k">
          <span class="ad-badge">อันดับ 1</span>
          <img src="/images/banners/ad_ufa11k.png" alt="UFA11K เว็บแทงบอลอันดับ 1">
        </div>
        <button class="button button-small sponsored-cta-button" style="width:100%;margin-top:10px" data-ad-trigger="ufa11k" type="button">เข้าสู่ระบบ UFA11K ➜</button>
      </article>
    </aside>
  </div>
</div>`

function allPosts() {
  return [
    ...localPosts.map(p => ({
      ...p,
      isOwner: true,
      author: 'คุณ',
      initial: 'P',
      meta: 'โพสต์บนอุปกรณ์นี้ · ' + (p.topic || 'โปรเจกต์ใหม่'),
      body: p.description,
      detailTitle: 'อัปเดตจากเจ้าของโปรเจกต์',
      detail: 'เปิดรับความคิดเห็นและคนที่สนใจร่วมพัฒนาโปรเจกต์นี้',
      stats: 'บันทึกบนอุปกรณ์นี้',
      tags: p.tags.split(/[,\s]+/).filter(Boolean).map(t => t.replace(/^#/, '')),
      actions: ['ดูโพสต์']
    })),
    ...posts
  ]
}

function sponsoredCard() {
  return `
  <article class="feed-post sponsored-feed-post" id="post-sponsored-ufa">
    <div class="post-author">
      <span class="avatar sponsored-author-badge">VIP</span>
      <div>
        <strong>UFA11K x MAHAGAME66 (Official Sponsor)</strong>
        <span>ผู้สนับสนุนอย่างเป็นทางการ · โฆษณาแนะนำ</span>
      </div>
      <span class="post-type" style="background:#f59e0b;color:#000;border-color:#f59e0b;font-weight:700">สปอนเซอร์ VIP</span>
    </div>
    <h2>🎁 แจกเครดิตฟรี 100% สมาชิกใหม่ ShowKong แตกง่าย จ่ายจริง 5 วิ</h2>
    <p>เปิดยูสเซอร์ใหม่วันนี้ รับโบนัสต้อนรับทันที 100% ศูนย์รวมสล็อตมากกว่า 5,000 เกม พร้อมแทงบอล คาสิโนสด บาคาร่า ฝาก-ถอน อัตโนมัติ ปลอดภัย ไม่โดนอายัดบัญชี</p>
    <div class="ad-box" data-ad-trigger="ufa11k" style="margin: 12px 0;">
      <span class="ad-badge">สล็อต & บอลโลก</span>
      <img class="sponsored-banner-img" src="/images/banners/ad_ufa11k.png" alt="UFA11K โปรโมชั่น" style="margin:0">
    </div>
    <div class="post-detail" style="border-color: rgba(245,158,11,0.3)">
      <strong style="color: #fbbf24">สิทธิพิเศษเฉพาะชาว ShowKong</strong>
      <span>ใช้โค้ด <b>SHOWKONG77</b> เมื่อสมัครสมาชิก รับฟรีสปิน 50 ครั้งทันที!</span>
    </div>
    <div class="post-tags">
      <span>#เว็บตรงมั่นคง</span>
      <span>#สล็อตแตกง่าย</span>
      <span>#แทงบอลออนไลน์</span>
      <span>#ฝากถอนออโต้</span>
    </div>
    <div class="post-footer">
      <span>ยอดเข้าชม 15.4k · รีวิว 4.9/5</span>
      <div>
        <button class="button button-small sponsored-cta-button" type="button" data-ad-trigger="promo">รับเครดิตฟรี 100% 🚀</button>
      </div>
    </div>
  </article>`
}

function postCard(p) {
  const ownerActions = p.isOwner
    ? `<div class="ml-1 flex gap-1.5"><button class="rounded-lg border-0 bg-[#f4f2fa] px-[9px] py-1.5 text-xs font-semibold text-[#625f75] transition-colors hover:bg-[#ece8ff] hover:text-[#5948ef]" type="button" data-owner-action="edit" data-post="${escapeHtml(p.id)}" aria-label="แก้ไขโพสต์ ${escapeHtml(p.title)}">แก้ไข</button><button class="rounded-lg border-0 bg-[#f4f2fa] px-[9px] py-1.5 text-xs font-semibold text-[#625f75] transition-colors hover:bg-[#fff0ee] hover:text-[#b42318]" type="button" data-owner-action="delete" data-post="${escapeHtml(p.id)}" aria-label="ลบโพสต์ ${escapeHtml(p.title)}">ลบ</button></div>`
    : ''
  return `<article class="feed-post" id="post-${encodeURIComponent(p.id)}" data-type="${escapeHtml(p.type)}"><div class="post-author"><span class="avatar">${p.initial}</span><div><strong>${escapeHtml(p.author)}</strong><span>${escapeHtml(p.meta)}</span></div><span class="post-type">${escapeHtml(p.type)}</span>${ownerActions}</div><h2>${escapeHtml(p.title)}</h2><p>${escapeHtml(p.body)}</p>${p.images?.length?`<div class="post-images">${p.images.map(img=>`<img src="${escapeHtml(img.data)}" alt="${escapeHtml(img.name)}">`).join('')}</div>`:''}<div class="post-detail"><strong>${escapeHtml(p.detailTitle)}</strong><span>${escapeHtml(p.detail)}</span></div><div class="post-tags">${p.tags.map(t=>`<span>#${escapeHtml(t)}</span>`).join('')}</div><div class="post-footer"><span>${escapeHtml(p.stats)}</span><div>${p.actions.map((action,i)=>{
    const primary=i===p.actions.length-1
    if(action==='ดูประวัติทีม')return `<a class="button button-small button-neutral" href="/pages/team-detail.html?team=${p.team}">${action}</a>`
    const isToggle=['ติดตาม','สนใจไอเดียนี้'].includes(action)
    return `<button class="button button-small ${primary?'button-primary':'button-neutral'}" data-action="${action}" data-post="${p.id}" type="button" ${isToggle?`aria-pressed="${Boolean(toggles[p.id+action])}"`:''}>${toggles[p.id+action]?(action==='ติดตาม'?'ติดตามแล้ว':'สนใจแล้ว'):action}</button>`
  }).join('')}</div></div></article>`
}

function render() {
  const visible = allPosts().filter(p => filter === 'ทั้งหมด' || p.type === filter || (filter === 'เปิดให้ทดลอง' && p.id === 'greenloop'))
  if (!visible.length) {
    document.querySelector('#postStream').innerHTML = '<div class="empty-state"><h2>ยังไม่มีโพสต์ประเภทนี้</h2><p>เลือกตัวกรองอื่น หรือสร้างโพสต์แรกของคุณได้เลย</p></div>'
    return
  }
  const cards = visible.map(postCard)
  if (filter === 'ทั้งหมด') {
    if (cards.length >= 2) {
      cards.splice(2, 0, sponsoredCard())
    } else {
      cards.push(sponsoredCard())
    }
  }
  document.querySelector('#postStream').innerHTML = cards.join('')
}

function openComposer() {
  const dialog = openDialog('สร้างโพสต์โปรเจกต์', '<p class="dialog-description">แชร์ไอเดีย หาทีม หรือขอความคิดเห็นจากชุมชน</p>' + composerForm())
  const dispose = bindComposer(dialog, () => {
    dialog.close(); localPosts = readLocal(POSTS_KEY, []); filter = 'ทั้งหมด'
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('is-active', b.dataset.filter === 'ทั้งหมด'); b.setAttribute('aria-pressed', String(b.dataset.filter === 'ทั้งหมด')) })
    render(); showPostSuccess(() => document.querySelector('#postStream').scrollIntoView({ behavior: 'smooth' }))
  }, () => dialog.close())
  dialog.addEventListener('close', () => { dispose(); if (location.hash === '#post-project') history.replaceState(null, '', location.pathname) }, { once: true })
}

function openEditPost(post) {
  const dialog = openDialog('แก้ไขโพสต์', '<p class="dialog-description">ปรับรายละเอียดโพสต์ของคุณ แล้วกดบันทึกการแก้ไข</p>' + composerForm())
  const dispose = bindComposer(dialog, () => {
    dialog.close(); localPosts = readLocal(POSTS_KEY, []); render(); toast('บันทึกการแก้ไขแล้ว')
  }, () => dialog.close(), post)
  dialog.addEventListener('close', dispose, { once: true })
}

function openDeletePost(post) {
  const dialog = openDialog('ลบโพสต์', `<p class="dialog-description">ต้องการลบ “${escapeHtml(post.title)}” ใช่หรือไม่? เมื่อลบแล้วจะนำกลับคืนมาไม่ได้</p><div class="modal-footer"><span></span><div><button class="button button-neutral" type="button" data-cancel-delete>ยกเลิก</button><button class="inline-flex min-h-10 items-center justify-center rounded-lg border-0 bg-[#c9362b] px-5 py-[9px] text-sm font-semibold text-white transition-colors hover:bg-[#aa2e25]" type="button" data-confirm-delete>ลบโพสต์</button></div></div>`)
  dialog.querySelector('[data-cancel-delete]').addEventListener('click', () => dialog.close())
  dialog.querySelector('[data-confirm-delete]').addEventListener('click', () => {
    const nextPosts = localPosts.filter(item => item.id !== post.id)
    if (!saveLocal(POSTS_KEY, nextPosts)) { toast('ลบโพสต์ไม่ได้ กรุณาลองใหม่'); return }
    localPosts = nextPosts; dialog.close(); render(); toast('ลบโพสต์แล้ว')
  })
}

export function openAdModal(adKey) {
  const titles = {
    mahagame: 'MAHAGAME66 — ศูนย์รวมเกมสล็อต 5,000+ เกม',
    ufagool: 'UFAGOOL — เว็บตรงจากบ้านผลบอล อันดับ 1',
    sexy365: 'SEXY365BET — คาสิโนสด & สล็อต ฝากถอนปลอดภัย',
    ufa11k: 'UFA11K — เว็บแทงบอล & คาสิโนตรง มั่นคง 100%',
    promo: 'รับโบนัสพิเศษ สมาชิก ShowKong'
  }
  const banners = {
    mahagame: '/images/banners/ad_mahagame.png',
    ufagool: '/images/banners/ad_ufagool.png',
    sexy365: '/images/banners/ad_sexy365.png',
    ufa11k: '/images/banners/ad_ufa11k.png',
    promo: '/images/banners/ad_sexy365.png'
  }
  const bannerSrc = banners[adKey] || banners.mahagame
  const dialog = openDialog(titles[adKey] || 'สปอนเซอร์ ShowKong VIP', `
    <div class="casino-modal-content">
      <div style="border-radius:10px;overflow:hidden;margin-bottom:14px;border:1px solid #f59e0b">
        <img src="${bannerSrc}" alt="Sponsor Banner" style="width:100%;display:block">
      </div>
      <div class="casino-modal-header">
        <h3>🎰 ทางเข้าเล่นเว็บตรง ไม่ผ่านเอเย่นต์</h3>
        <p>บริการตลอด 24 ชั่วโมง ฝาก-ถอน ระบบออโต้ ภายใน 5 วินาที</p>
      </div>
      <div class="casino-features">
        <div class="casino-feature-item"><span>⚡</span>ฝากถอน 5 วิ</div>
        <div class="casino-feature-item"><span>🛡️</span>ปลอดภัย 100%</div>
        <div class="casino-feature-item"><span>🎁</span>โบนัสฟรี 100%</div>
      </div>
      <div class="casino-promo-box">
        <p style="margin:0;font-size:12px;color:#94a3b8">โค้ดโปรโมชั่นพิเศษสำหรับชาว ShowKong:</p>
        <div class="casino-promo-code">SHOWKONG77</div>
        <p style="margin:4px 0 0;font-size:11px;color:#22c55e">✓ สิทธิ์ใช้ได้ทันที รับฟรีสปิน 50 ครั้ง</p>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
        <button class="button button-neutral" type="button" data-close-dialog>ไว้คราวหลัง</button>
        <button class="button button-primary sponsored-cta-button" type="button" data-copy-code>คัดลอกโค้ด & รับเครดิตฟรี</button>
      </div>
    </div>
  `, 'casino-popup-modal')
  dialog.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close())
  dialog.querySelector('[data-copy-code]')?.addEventListener('click', () => {
    navigator.clipboard?.writeText('SHOWKONG77')
    toast('🎉 คัดลอกโค้ด SHOWKONG77 สำเร็จ! รับเครดิตฟรีแล้ว')
    dialog.close()
  })
}

// Global click handler for ads and close buttons
document.addEventListener('click', e => {
  const closeBtn = e.target.closest('[data-close-ad]')
  if (closeBtn) {
    const targetId = closeBtn.dataset.closeAd
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.style.transition = 'all 0.25s ease'
      targetEl.style.opacity = '0'
      targetEl.style.transform = targetId === 'floatingAdBottom' ? 'translateX(-50%) translateY(100%)' : 'scale(0.8)'
      setTimeout(() => targetEl.remove(), 260)
      toast('ปิดโฆษณาเรียบร้อย')
    }
    return
  }
  const adTrigger = e.target.closest('[data-ad-trigger]')
  if (adTrigger) {
    openAdModal(adTrigger.dataset.adTrigger)
    return
  }
})

document.querySelector('.header-actions a[href="/pages/post.html"]')?.addEventListener('click', e => { e.preventDefault(); openComposer() })
document.querySelector('[data-feed-filters]')?.addEventListener('click', e => {
  const b = e.target.closest('[data-filter]'); if (!b) return
  filter = b.dataset.filter
  e.currentTarget.querySelectorAll('button').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)) })
  render()
})

document.querySelector('#postStream')?.addEventListener('click', e => {
  const ownerAction = e.target.closest('[data-owner-action]')
  if (ownerAction) {
    const post = localPosts.find(item => item.id === ownerAction.dataset.post)
    if (!post) return
    if (ownerAction.dataset.ownerAction === 'edit') openEditPost(post)
    else if (ownerAction.dataset.ownerAction === 'delete') openDeletePost(post)
    return
  }
  const b = e.target.closest('[data-action]'); if (!b) return
  const p = allPosts().find(p => p.id === b.dataset.post)
  if (!p) return
  const action = b.dataset.action
  if (action === 'ขอ Join ทีม') { openJoinRequest('SafeWalk', 'User Researcher'); return }
  if (['ติดตาม', 'สนใจไอเดียนี้'].includes(action)) {
    const next = { ...toggles, [p.id + action]: !toggles[p.id + action] }
    if (saveLocal('showkong.feed-actions', next)) { toggles = next; render() } else toast('บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บ')
    return
  }
  if (['ให้ Feedback', 'ชวนคุย'].includes(action)) {
    const dialog = openDialog(action, `<p class="dialog-description">${escapeHtml(p.title)}</p><form><label>ข้อความ<textarea name="message" required maxlength="2000" rows="4" placeholder="แชร์ความคิดเห็นของคุณ"></textarea></label><p class="sample-note">ข้อความจะบันทึกบนอุปกรณ์นี้ ยังไม่ได้ส่งถึงเจ้าของโพสต์</p><p class="form-error" role="alert" hidden></p><button class="button button-primary" type="submit">บันทึกข้อความ</button></form>`)
    dialog.querySelector('form').addEventListener('submit', e => {
      e.preventDefault(); const message = new FormData(e.currentTarget).get('message').trim(); if (!message) return; const saved = readLocal('showkong.feedback', [])
      if (saveLocal('showkong.feedback', [...saved, { postId: p.id, message }])) { dialog.close(); toast('บันทึกข้อความบนอุปกรณ์นี้แล้ว') } else { const error = dialog.querySelector('.form-error'); error.hidden = false; error.textContent = 'ไม่สามารถบันทึกข้อความได้' }
    })
    return
  }
  let links = ''
  for (const [key, label] of [['demo', 'เปิด Demo'], ['github', 'เปิด GitHub']]) {
    if (p[key] && /^https?:\/\//i.test(p[key])) links += `<a class="button button-neutral" href="${escapeHtml(p[key])}" target="_blank" rel="noopener noreferrer">${label}</a>`
  }
  openDialog(action === 'ดูโพสต์' ? p.title : action, `<p class="dialog-description"><strong>${escapeHtml(p.title)}</strong></p><p class="dialog-description">${escapeHtml(p.body)}</p><div class="join-summary"><strong>${escapeHtml(p.detailTitle)}</strong><span>${escapeHtml(p.detail)}</span></div>${links ? `<div class="button-row">${links}</div>` : '<p class="sample-note">โพสต์ตัวอย่างนี้ยังไม่มีลิงก์ Demo หรือ Case Study แนบมา</p>'}`)
})

render()
if (location.hash === '#post-project') openComposer()
else if (location.hash.startsWith('#post-')) requestAnimationFrame(() => {
  const target = document.getElementById(location.hash.slice(1))
  if (!target) return
  target.scrollIntoView({ block: 'center' })
  target.classList.add('ring-2', 'ring-[#6d5dfb]', 'ring-offset-4')
  setTimeout(() => target.classList.remove('ring-2', 'ring-[#6d5dfb]', 'ring-offset-4'), 2400)
})
