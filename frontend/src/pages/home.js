import '../style.css'
import '../refresh.css'
import '../home-journey.css'
import '../home-develop-sections.css'
import { siteFooter } from '../components/shared.js'
import { openLoginModal } from '../components/login-modal.js'
import { supabase } from '../lib/supabase.js'
import { designIcon } from '../components/design-assets.js'
import { projects, categoryChips, projectCard, bindProjectDetails } from '../components/projects.js'
import { setupHomeSpotlight } from '../components/home-spotlight.js'

document.querySelector('[data-shared-header]').innerHTML = `
<header class="site-header">
  <a class="brand" href="/"><span class="brand-mark">S</span><span>ShowKong</span></a>
  <nav class="main-nav" aria-label="เมนูหลัก"><a class="nav-link is-active" href="/" aria-current="page">หน้าแรก</a><a class="nav-link" href="#featured">โปรเจกต์มาแรง</a><a class="nav-link" href="#works">ผลงานมาแรง</a><a class="nav-link" href="/pages/post.html">สร้างโปรเจกต์</a></nav>
  <div class="header-actions"><button class="button button-neutral js-open-login" type="button">เข้าสู่ระบบ</button></div>
  <button class="mobile-menu-button" type="button" aria-label="เปิดเมนู" aria-expanded="false">เมนู</button>
</header>`
document.querySelector('main').innerHTML = `
<section class="discovery-hero">
  ${designIcon('home/imgHeroAmbientGlow', 'hero-ambient')}
  <div class="page-container discovery-hero-inner">
    <div class="discovery-hero-copy">
      <p class="eyebrow">SHOWKONG — พื้นที่ของนักสร้างรุ่นใหม่</p>
      <h1>เริ่มสร้างโปรเจกต์กับเรา</h1>
      <p>ค้นหาโปรเจกต์ที่สนใจ เจอเพื่อนร่วมทีม และช่วยกันเปลี่ยนไอเดียให้เป็นผลงานจริง</p>
      <form action="/pages/explore-projects.html" class="hero-search"><input name="q" aria-label="ค้นหาโปรเจกต์ ทักษะ หรือทีม" type="search" placeholder="ค้นหาโปรเจกต์ ทักษะ หรือทีมที่สนใจ"><button type="submit" aria-label="ค้นหา">${designIcon('home/imgSearchIcon')}</button></form>
      <a class="start-project-link" href="/pages/post.html">หรือเริ่มสร้างโปรเจกต์ของคุณ →</a>
    </div>
    <div class="collaboration-visual" aria-label="ตัวอย่างโปรเจกต์ SheetQuest">
      <div class="collaboration-background has-image"><img class="collaboration-background-image" src="/projects/sheetquest.webp" alt="" width="960" height="600">${designIcon('home/imgVisualGlow', 'visual-ambient')}</div>
      <article class="collaboration-card"><span class="status-pill">${designIcon('home/imgStatusDot')}เปิดรับสมาชิกใหม่</span><h2>SheetQuest</h2><p>เปลี่ยนไฟล์เรียนให้เป็นเกม พร้อมสร้างแบบทดสอบและแฟลชการ์ดด้วย AI</p><div class="mini-tags"><span>EdTech</span><span>AI</span><span>Gamification</span></div><div class="collaboration-members"><span>สมาชิกปัจจุบัน 3 คน</span>${designIcon('home/imgTeamAvatars', 'team-avatars')}</div></article>
      <div class="collaboration-proof">${designIcon('home/imgProofIcon')}พร้อมทดลองกับผู้ใช้</div>
      <div class="collaboration-role"><small>ตำแหน่งที่เปิดรับ</small><strong>UX Researcher</strong></div>
    </div>
  </div>
</section>
<section class="trending-section" id="featured"><div class="discovery-panel"><div class="section-heading-row"><div><h2>โปรเจกต์มาแรง</h2><p>ค้นหาไอเดียที่น่าสนใจ แล้วเข้าไปดูทีมที่กำลังเปิดรับสมาชิก</p></div><a class="soft-link" href="/pages/explore-projects.html">ดูโปรเจกต์ทั้งหมด →</a></div><div class="chip-row discovery-filters">${categoryChips()}</div><div class="discovery-grid" id="homeProjects" aria-live="polite">${projects.map(p=>projectCard(p,true,true)).join('')}</div></div></section>
<section class="home-works" id="works"><div class="page-container"><div class="section-heading-row"><div><p class="eyebrow">ผลงานเด่นประจำสัปดาห์</p><h2>ผลงานมาแรง</h2></div><a class="soft-link" href="/pages/show-kong.html">ดูผลงานทั้งหมด →</a></div><div class="work-grid">${projects.slice(0,3).map((p,i)=>`<a class="work-card" href="/pages/show-kong.html"><div class="work-cover cover-${p.color}"><img class="work-cover-image" src="${p.image}" alt="" width="960" height="600"><span class="work-category">${p.category}</span><h3>${p.name}</h3></div><div class="work-copy"><small>${p.tags}</small><p>${p.description}</p><div class="work-metrics">${p.metrics.map((m,j)=>`<div><strong>${designIcon('home/imgMetricIcon'+(j||''))}${m}</strong><small>${['เข้าชม','ถูกใจ',i===1?'ใช้งานจริง':'ผู้ทดลอง'][j]}</small></div>`).join('')}</div></div></a>`).join('')}</div></div></section>
<section class="home-journey" id="how-it-works" aria-labelledby="journey-title">
  <div class="page-container">
    <div class="journey-heading">
      <div><p class="journey-eyebrow"><span aria-hidden="true">✦</span> เล็ก ๆ วันนี้ เป็นผลงานจริงวันหน้า</p><h2 id="journey-title">จาก “อยากลองทำ”<br>สู่ <span>“เราทำได้แล้ว”</span></h2></div>
      <p class="journey-intro">ShowKong ช่วยให้ทุกก้าวมีความหมาย<br>ตั้งแต่ไอเดียแรก เพื่อนร่วมทีม ไปจนถึงผลงานที่ภูมิใจ</p>
    </div>
    <ol class="journey-steps" role="list">
      <li class="journey-step journey-idea">
        <div class="journey-marker"><span>01</span><small>เริ่มจากคุณ</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-note"><span class="journey-note-label">MY NEXT IDEA <span>✦</span></span><strong>ถ้ามีแอปที่ช่วยให้<br>การเรียนสนุกขึ้นล่ะ?</strong><div class="journey-note-lines"><i></i><i></i></div><span class="journey-note-tag">Education</span></div><span class="journey-spark">✧</span></div>
        <div class="journey-copy"><h3>เล่าไอเดียที่อยากทำ</h3><p>บอกสิ่งที่อยากสร้าง ปัญหาที่อยากแก้ และทักษะที่ยังขาด ให้คนที่สนใจได้มาเห็น</p><span class="journey-outcome">ไอเดียได้ก้าวแรก</span></div>
      </li>
      <li class="journey-step journey-team">
        <div class="journey-marker"><span>02</span><small>เจอคนที่ใช่</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-team-stack"><div><span class="journey-person person-design">D</span><span><strong>Designer</strong><small>เติมมุมมองใหม่</small></span><b>＋</b></div><div><span class="journey-person person-dev">&lt;/&gt;</span><span><strong>Developer</strong><small>ช่วยให้ไอเดียเป็นจริง</small></span><b>＋</b></div></div><span class="journey-match">✦ ต่างทักษะ เป้าหมายเดียวกัน</span></div>
        <div class="journey-copy"><h3>เติมทีมให้ครบมุม</h3><p>เจอเพื่อนต่างคณะที่สนใจเรื่องเดียวกัน นำความถนัดของแต่ละคนมาสร้างไปด้วยกัน</p><span class="journey-outcome">มีเพื่อนร่วมทาง</span></div>
      </li>
      <li class="journey-step journey-test">
        <div class="journey-marker"><span>03</span><small>ลองแล้วเรียนรู้</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-demo"><span><i></i><i></i><i></i><small>Demo / version 01</small></span><div class="journey-demo-content"><span>▷</span><div><strong>ลองใช้ไอเดียของเรา</strong><small>พร้อมรับมุมมองใหม่ ๆ</small></div></div></div><div class="journey-feedback"><span>“</span><p>ลองแล้ว! ถ้าเพิ่มตรงนี้<br>จะใช้ง่ายขึ้นอีกนะ</p><b>↗</b></div></div>
        <div class="journey-copy"><h3>ลองจริง แล้วไปต่อ</h3><p>แชร์ Demo ให้ชุมชนทดลอง รับ Feedback และพัฒนาไอเดียจากเสียงของผู้ใช้จริง</p><span class="journey-outcome">ได้เรียนรู้จากการลงมือ</span></div>
      </li>
      <li class="journey-step journey-work">
        <div class="journey-marker"><span>04</span><small>ภูมิใจกับสิ่งที่สร้าง</small></div>
        <div class="journey-art" aria-hidden="true"><div class="journey-portfolio"><img src="/projects/sheetquest.webp" alt="" width="960" height="600" loading="lazy"><div><small>BUILT TOGETHER</small><strong>จากไอเดีย สู่ผลงานจริง</strong><span>Design · Development</span></div></div><span class="journey-finish">✓ ผลงานที่เล่าเรื่องของคุณ</span></div>
        <div class="journey-copy"><h3>เปลี่ยนเป็นพอร์ตของคุณ</h3><p>เก็บบทบาท สิ่งที่ได้ลงมือทำ และผลลัพธ์ เป็นผลงานที่บอกได้ว่าคุณทำอะไรเป็น</p><span class="journey-outcome">มีผลงานให้โอกาสต่อไป</span></div>
      </li>
    </ol>
  </div>
</section>
<section class="develop-home-featured page-container" id="spotlight" aria-labelledby="spotlight-title">
  <div class="develop-section-heading">
    <div>
      <p class="eyebrow">กำลังเกิดขึ้นบน ShowKong</p>
      <h2 id="spotlight-title">โปรเจกต์ที่กำลังหาเพื่อน</h2>
      <p>เข้าร่วมตั้งแต่วันแรก เลือกจากปัญหาที่สนใจ และสร้างผลงานที่เล่าได้มากกว่าหนึ่งบรรทัดในเรซูเม่</p>
    </div>
    <a class="button button-neutral spotlight-login-link" href="/pages/explore-projects.html">ดูโปรเจกต์ทั้งหมด</a>
  </div>
  <div class="spotlight-carousel" data-project-carousel aria-label="โปรเจกต์แนะนำ" aria-roledescription="carousel" tabindex="0">
    <p class="sr-only" data-carousel-status aria-live="polite">โปรเจกต์ที่ 1 จาก 3: SheetQuest</p>
    <article class="spotlight-card" data-spotlight-card data-theme="purple">
      <div class="spotlight-media"><span class="spotlight-media-glow" aria-hidden="true"></span><img data-spotlight-image src="/images/projects/sheetquest-preview.webp" alt="หน้าจอแดชบอร์ดภารกิจการเรียนของ SheetQuest" width="1376" height="768" loading="lazy"></div>
      <div class="spotlight-content">
        <button class="spotlight-save" type="button" data-spotlight-save aria-label="บันทึกโปรเจกต์ SheetQuest" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 4.4 13A5.2 5.2 0 0 1 11.8 5.6l.2.2.2-.2A5.2 5.2 0 0 1 19.6 13L12 20.6Z"/></svg></button>
        <p class="spotlight-badge" data-spotlight-badge><i></i>ShowKong Spotlight · กำลังมาแรง</p>
        <h3 data-spotlight-title>SheetQuest — เรียนให้เหมือนเล่นเกม</h3>
        <p class="spotlight-hook" data-spotlight-hook>เปลี่ยนบทเรียนธรรมดา ให้กลายเป็นภารกิจที่นักเรียนอยากทำ</p>
        <p class="spotlight-summary" data-spotlight-summary>เปลี่ยนบทเรียนและแบบฝึกหัดให้เป็นภารกิจที่สนุก มีเป้าหมาย และวัดความก้าวหน้าได้</p>
        <div class="spotlight-tags" data-spotlight-tags aria-label="ทักษะที่เกี่ยวข้อง"><span>Education</span><span>UX/UI</span><span>Frontend</span></div>
        <div class="spotlight-proof" data-spotlight-proof aria-label="ความสนใจและจำนวนสมาชิก"><span><strong>1.2K</strong> Views</span><span><strong>94</strong> Likes</span><span><strong>3/5</strong> คนในทีม</span></div>
        <div class="spotlight-role"><span data-spotlight-role-label>เหลือ 1 ตำแหน่ง</span><strong data-spotlight-role>กำลังหา Marketing 1 คน</strong></div>
        <div class="spotlight-actions"><a class="button button-primary spotlight-login-link" data-spotlight-detail href="/pages/explore-projects.html?project=sheetquest">ดูโปรเจกต์</a><a class="button button-neutral spotlight-login-link" data-spotlight-join href="/pages/team-detail.html?team=sheetquest">ขอเข้าร่วมทีม</a></div>
      </div>
    </article>
    <div class="spotlight-controls">
      <button class="spotlight-arrow" type="button" data-carousel-prev aria-label="ดูโปรเจกต์ก่อนหน้า"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <div class="spotlight-dots" role="group" aria-label="เลือกโปรเจกต์"><button class="is-active" type="button" data-carousel-dot="0" aria-label="ดู SheetQuest" aria-current="true"></button><button type="button" data-carousel-dot="1" aria-label="ดู GreenLoop"></button><button type="button" data-carousel-dot="2" aria-label="ดู SafeWalk"></button></div>
      <button class="spotlight-arrow" type="button" data-carousel-next aria-label="ดูโปรเจกต์ถัดไป"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
  </div>
</section>
<section class="home-project-cta page-container" aria-labelledby="home-project-cta-title">
  <div class="home-project-cta-content">
    <p class="home-project-cta-eyebrow">ถึงตาของไอเดียคุณแล้ว</p>
    <h2 id="home-project-cta-title"><span>ไอเดียของคุณ อาจเป็นโปรเจกต์ต่อไป</span><span>บน ShowKong</span></h2>
    <p class="home-project-cta-description">สร้างโปรเจกต์ บอกทักษะที่กำลังหา และพบเพื่อนร่วมทีมที่พร้อมเปลี่ยนไอเดียให้เป็นผลงานจริง</p>
    <div class="home-project-cta-actions"><a class="button home-project-cta-primary" href="/pages/post.html">สร้างโปรเจกต์ของฉัน</a><a class="button home-project-cta-secondary" href="#how-it-works">ดูวิธีเริ่มต้น</a></div>
  </div>
</section>`
document.querySelector('[data-shared-footer]').innerHTML = siteFooter()
document.querySelector('.discovery-filters').addEventListener('click', e=>{
  const button=e.target.closest('[data-category]')
  if(!button)return
  document.querySelectorAll('[data-category]').forEach(b=>{ b.classList.toggle('is-active',b===button); b.setAttribute('aria-pressed',String(b===button)) })
  const filtered=projects.filter(p=>button.dataset.category==='ทั้งหมด'||p.category===button.dataset.category)
  document.querySelector('#homeProjects').innerHTML=filtered.map(p=>projectCard(p,true,true)).join('')
})
document.querySelector('.mobile-menu-button').addEventListener('click', e=>{
  const open=document.querySelector('.main-nav').classList.toggle('is-open')
  e.currentTarget.setAttribute('aria-expanded',String(open))
})
document.querySelector('.js-open-login').addEventListener('click',()=>openLoginModal())
if(location.hash==='#login')openLoginModal()
bindProjectDetails()
setupHomeSpotlight()

document.addEventListener('click',async event=>{
  const link=event.target.closest('.main-nav a[href="/pages/post.html"],.start-project-link,.home-project-cta-primary,.spotlight-login-link,.trending-section .soft-link,.home-works a[href],.refresh-dialog a[href^="/pages/team-detail"],.refresh-dialog a[href="/pages/find-team.html"]')
  if(!link)return
  event.preventDefault()
  const destination=new URL(link.href,location.origin)
  const redirectTo=destination.pathname+destination.search+destination.hash
  if(supabase){
    const {data,error}=await supabase.auth.getSession()
    if(!error&&data.session){location.assign(redirectTo);return}
  }
  const sourceDialog=link.closest('dialog')
  if(sourceDialog){
    sourceDialog.addEventListener('close',()=>openLoginModal({redirectTo}),{once:true})
    sourceDialog.close()
  }else{
    openLoginModal({redirectTo})
  }
})

if (supabase) {
  const { data, error } = await supabase.auth.getSession()
  if (!error && data.session) window.location.replace('/pages/feed.html')
}

