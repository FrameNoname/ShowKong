const pagePaths = {
  home: '/',
  feed: '/pages/feed.html',
  explore: '/pages/explore-projects.html',
  teams: '/pages/find-team.html',
  showcase: '/pages/show-kong.html',
  showKong: '/pages/show-kong.html',
  challenges: '/pages/sponsored-challenge.html',
  post: '/pages/post.html',
}

export function authenticatedHeader(activePage = '') {
  const navItems = [
    ['feed', 'Feed'],
    ['explore', 'สำรวจโปรเจกต์'],
    ['teams', 'หาทีม'],
    ['showKong', 'ShowKong'],
    ['challenges', 'ชาเลนจ์'],
  ]

  return `
    <header class="site-header">
      <a class="brand" href="${pagePaths.feed}" aria-label="ShowKong Feed">
        <span class="brand-mark">S</span>
        <span>ShowKong</span>
      </a>
      <nav class="main-nav" aria-label="เมนูหลัก">
        ${navItems.map(([key, label]) => `
          <a class="nav-link ${(activePage === key || (key === 'showKong' && (activePage === 'showcase' || activePage === 'showKong'))) ? 'is-active' : ''}" href="${pagePaths[key]}">${label}</a>
        `).join('')}
      </nav>
      <div class="header-actions">
        <a class="button button-primary" href="${pagePaths.post}">โพสต์โปรเจกต์</a>
        <button class="avatar avatar-sm" type="button" aria-label="เปิดโปรไฟล์ของ Pluem">P</button>
      </div>
      <button class="mobile-menu-button" type="button" aria-label="เปิดเมนู" aria-expanded="false">เมนู</button>
    </header>
  `
}

export function siteFooter() {
  return `
    <footer class="site-footer" id="about">
      <div>
        <a class="footer-brand" href="${pagePaths.home}">ShowKong</a>
        <p>พื้นที่ให้ไอเดียเจอคน ให้ผลงานเจอโอกาส<br>และให้นักศึกษาได้เริ่มก่อนพร้อม</p>
      </div>
      <div class="footer-meta">
        <nav aria-label="เมนูท้ายเว็บไซต์">
          <a href="${pagePaths.explore}">สำรวจโปรเจกต์</a>
          <a href="${pagePaths.teams}">หาทีม</a>
          <a href="${pagePaths.showKong}">ShowKong (โชว์ผลงาน)</a>
          <a href="${pagePaths.challenges}">ชาเลนจ์</a>
          <a href="#about">เกี่ยวกับเรา</a>
        </nav>
        <p>© 2026 ShowKong — Built for student builders.</p>
      </div>
    </footer>
  `
}

export function communityCta() {
  return `
    <section class="community-cta page-container" aria-labelledby="community-cta-title">
      <div>
        <p class="eyebrow eyebrow-light">พร้อมเปลี่ยนไอเดียให้มีคนเห็นหรือยัง?</p>
        <h2 id="community-cta-title">โปรเจกต์ต่อไป อาจเริ่มจาก<br>คนที่คุณยังไม่รู้จัก</h2>
        <p>โพสต์สิ่งที่คุณอยากสร้าง แล้วให้ทักษะ ความสนใจ และโอกาสพาคนที่ใช่มาเจอกัน</p>
      </div>
      <div class="cta-actions">
        <button class="button button-light js-open-post" type="button">สร้างโปรเจกต์แรก</button>
        <a href="#how-it-works">ดูวิธีใช้งาน</a>
      </div>
    </section>
  `
}

// Home-only CTA. The shared communityCta above remains unchanged for authenticated pages.
export function homeProjectCta() {
  return `
    <section class="home-project-cta page-container" aria-labelledby="home-project-cta-title">
      <div class="home-project-cta__content">
        <p class="home-project-cta__eyebrow">ถึงตาของไอเดียคุณแล้ว</p>
        <h2 id="home-project-cta-title">
          <span>ไอเดียของคุณ อาจเป็นโปรเจกต์ต่อไป</span>
          <span>บน ShowKong</span>
        </h2>
        <p class="home-project-cta__description">สร้างโปรเจกต์ บอกทักษะที่กำลังหา และพบเพื่อนร่วมทีมที่พร้อมเปลี่ยนไอเดียให้เป็นผลงานจริง</p>
        <div class="home-project-cta__actions">
          <button class="button home-project-cta__primary js-open-post" type="button">สร้างโปรเจกต์ของฉัน</button>
          <a class="button home-project-cta__secondary" href="#paths">ดูวิธีเริ่มต้น</a>
        </div>
      </div>
    </section>
  `
}

export function mountAuthenticatedShell(activePage) {
  const header = document.querySelector('[data-shared-header]')
  const footer = document.querySelector('[data-shared-footer]')
  const cta = document.querySelector('[data-shared-cta]')

  if (header) header.innerHTML = authenticatedHeader(activePage)
  if (footer) footer.innerHTML = siteFooter()
  if (cta) cta.innerHTML = communityCta()

  const menuButton = document.querySelector('.mobile-menu-button')
  menuButton?.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav')
    const isOpen = nav?.classList.toggle('is-open') ?? false
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })
}

export { pagePaths }
  