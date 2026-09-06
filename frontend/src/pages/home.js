import '../style.css'
import '../refresh.css'
import { communityCta, siteFooter } from '../components/shared.js'
import { openLoginModal } from '../components/login-modal.js'
import { supabase } from '../lib/supabase.js'
import { designIcon } from '../components/design-assets.js'
import { projects, categories, categoryChips, projectCard, bindProjectDetails } from '../components/projects.js'

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
      <div class="hero-categories"><span>หมวดยอดนิยม:</span>${categories.slice(1,5).map(c => `<a href="/pages/explore-projects.html?category=${encodeURIComponent(c)}">${c}</a>`).join('')}</div>
      <a class="start-project-link" href="/pages/post.html">หรือเริ่มสร้างโปรเจกต์ของคุณ →</a>
    </div>
    <div class="collaboration-visual" aria-label="ตัวอย่างโปรเจกต์ SheetQuest">
      <div class="collaboration-background">${designIcon('home/imgVisualGlow', 'visual-ambient')}</div>
      <article class="collaboration-card"><span class="status-pill">${designIcon('home/imgStatusDot')}เปิดรับสมาชิกใหม่</span><h2>SheetQuest</h2><p>เปลี่ยนไฟล์เรียนให้เป็นเกม พร้อมสร้างแบบทดสอบและแฟลชการ์ดด้วย AI</p><div class="mini-tags"><span>EdTech</span><span>AI</span><span>Gamification</span></div><div class="collaboration-members"><span>สมาชิกปัจจุบัน 3 คน</span>${designIcon('home/imgTeamAvatars', 'team-avatars')}</div></article>
      <div class="collaboration-proof">${designIcon('home/imgProofIcon')}พร้อมทดลองกับผู้ใช้</div>
      <div class="collaboration-role"><small>ตำแหน่งที่เปิดรับ</small><strong>UX Researcher</strong></div>
    </div>
  </div>
</section>
<section class="trending-section" id="featured"><div class="discovery-panel"><div class="section-heading-row"><div><h2>โปรเจกต์มาแรง</h2><p>ค้นหาไอเดียที่น่าสนใจ แล้วเข้าไปดูทีมที่กำลังเปิดรับสมาชิก</p></div><a class="soft-link" href="/pages/explore-projects.html">ดูโปรเจกต์ทั้งหมด →</a></div><div class="chip-row discovery-filters">${categoryChips()}</div><div class="discovery-grid" id="homeProjects" aria-live="polite">${projects.map(p=>projectCard(p,true)).join('')}</div></div></section>
<section class="home-benefits"><div class="page-container"><p class="eyebrow">ทำไมต้อง ShowKong</p><h2>เริ่มจากไอเดีย ไปได้ไกลกว่าห้องเรียน</h2><div class="benefit-grid">${[
['หาเพื่อนร่วมทีมที่ใช่','ค้นหาคนต่างคณะที่มีทักษะตรงกับสิ่งที่โปรเจกต์ยังขาด'],
['ทดลองกับผู้ใช้จริง','นำไอเดียไปให้คนในชุมชนทดลอง รับความคิดเห็น และพัฒนาต่อ'],
['มี Portfolio ที่พิสูจน์ได้','เก็บบทบาท ผลลัพธ์ และเสียงตอบรับเป็นหลักฐานการทำงานจริง'],
].map(([title,body],i)=>`<article class="benefit-card"><span class="benefit-icon benefit-${i}">${designIcon('home/imgBenefitIconVector'+(i||''))}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></div></section>
<section class="home-works" id="works"><div class="page-container"><div class="section-heading-row"><div><p class="eyebrow">ผลงานเด่นประจำสัปดาห์</p><h2>ผลงานมาแรง</h2></div><a class="soft-link" href="/pages/show-kong.html">ดูผลงานทั้งหมด →</a></div><div class="work-grid">${projects.slice(0,3).map((p,i)=>`<a class="work-card" href="/pages/show-kong.html"><div class="work-cover cover-${p.color}">${designIcon('home/imgCoverDecoration','cover-decoration')}<span class="work-icon">${designIcon('home/imgCoverIconVector'+(i||''))}</span><h3>${p.name}</h3></div><div class="work-copy"><small>${p.tags}</small><p>${p.description}</p><div class="work-metrics">${p.metrics.map((m,j)=>`<div><strong>${designIcon('home/imgMetricIcon'+(j||''))}${m}</strong><small>${['เข้าชม','ถูกใจ',i===1?'ใช้งานจริง':'ผู้ทดลอง'][j]}</small></div>`).join('')}</div></div></a>`).join('')}</div></div></section>
<section class="home-how" id="how-it-works"><div class="page-container"><p class="eyebrow">เริ่มต้นง่าย ๆ</p><h2>เปลี่ยนไอเดียให้เป็นผลงานใน 4 ขั้นตอน</h2><div class="steps-grid">${[
['โพสต์ไอเดีย','บอกปัญหา สิ่งที่อยากสร้าง และทักษะที่ทีมยังขาด'],
['หาเพื่อนร่วมทีม','ค้นหาคนต่างคณะ แล้วส่งคำขอเข้าร่วมทีมที่สนใจ'],
['ทดลองและอัปเดต','แชร์ Demo รับ Feedback และบันทึกความคืบหน้าของโปรเจกต์'],
['เก็บเป็น Portfolio','สรุปบทบาท ผลลัพธ์ และหลักฐานให้คนอื่นตรวจสอบได้']
].map(([title,body],i)=>`<article class="step-card"><span>0${i+1}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></div></section>
${communityCta()}`
document.querySelector('[data-shared-footer]').innerHTML = siteFooter()
document.querySelector('.discovery-filters').addEventListener('click', e=>{
  const button=e.target.closest('[data-category]')
  if(!button)return
  document.querySelectorAll('[data-category]').forEach(b=>{ b.classList.toggle('is-active',b===button); b.setAttribute('aria-pressed',String(b===button)) })
  const filtered=projects.filter(p=>button.dataset.category==='ทั้งหมด'||p.category===button.dataset.category)
  document.querySelector('#homeProjects').innerHTML=filtered.map(p=>projectCard(p,true)).join('')
})
document.querySelector('.mobile-menu-button').addEventListener('click', e=>{
  const open=document.querySelector('.main-nav').classList.toggle('is-open')
  e.currentTarget.setAttribute('aria-expanded',String(open))
})
document.querySelector('.js-open-login').addEventListener('click',openLoginModal)
document.querySelectorAll('.js-open-post').forEach(b=>b.addEventListener('click',()=>{location.href='/pages/post.html'}))
if(location.hash==='#login')openLoginModal()
bindProjectDetails()
if (supabase) {
  const { data, error } = await supabase.auth.getSession()
  if (!error && data.session) window.location.replace('/pages/feed.html')
}

