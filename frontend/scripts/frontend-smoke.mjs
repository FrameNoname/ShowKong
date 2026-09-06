import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import assert from 'node:assert/strict'
import path from 'node:path'

// Set SHOWKONG_PLAYWRIGHT to a preinstalled Playwright package when needed.
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.SHOWKONG_PLAYWRIGHT || 'playwright')
const output = path.resolve(process.env.SHOWKONG_QA_OUTPUT || '../qa-output')
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const base = process.env.SHOWKONG_BASE_URL || 'http://127.0.0.1:5173'
const context = await browser.newContext()
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
const pages = ['/', '/pages/explore-projects.html', '/pages/find-team.html', '/pages/team-detail.html', '/pages/feed.html', '/pages/post.html', '/pages/sponsored-challenge.html', '/pages/dashboard.html', '/pages/show-kong.html']
const results = []
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({width,height:1000})
    for (const route of pages) {
      const response = await page.goto(base + route)
      assert.equal(response.status(), 200, route)
      await page.waitForLoadState('networkidle')
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => undefined))))
      if (route !== '/pages/show-kong.html') {
        assert.equal(await page.evaluate(() => document.fonts.check('16px "ShowKong Anuphan"', 'ทดสอบ')), true, 'Anuphan must be loaded')
      }
      const diagnostics = await page.evaluate(() => ({
        title: document.title,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),
        hasContent: Boolean(document.querySelector('main')?.textContent.trim()),
      }))
      assert.equal(diagnostics.hasContent,true,route+' empty')
      assert.deepEqual(diagnostics.brokenImages,[],route+' broken images')
      if(route!=='/pages/show-kong.html')assert.equal(diagnostics.overflow,false,route+' overflow at '+width)
      results.push({route,width,...diagnostics})
      if(width===1440||width===390)await page.screenshot({path:path.join(output,(route==='/'?'home':route.split('/').at(-1).replace('.html',''))+'-'+width+'.png'),fullPage:true})
    }
  }
  await page.setViewportSize({width:1440,height:1000})
  await page.goto(base+'/pages/explore-projects.html')
  assert.equal(await page.locator('[data-weekly-dot][aria-current="true"]').getAttribute('data-weekly-dot'),'0')
  await page.locator('[data-weekly-next]').click()
  await page.waitForTimeout(700)
  assert.equal(await page.locator('[data-weekly-dot][aria-current="true"]').getAttribute('data-weekly-dot'),'1')
  await page.locator('[data-weekly-dot="0"]').click()
  await page.waitForTimeout(700)
  await page.locator('[data-weekly-prev]').click()
  await page.waitForTimeout(700)
  assert.equal(await page.locator('[data-weekly-dot][aria-current="true"]').getAttribute('data-weekly-dot'),'7')
  await page.locator('[data-weekly-dot="0"]').click()
  await page.waitForTimeout(700)
  await page.locator('.brand').focus()
  await page.locator('.brand').hover()
  await page.waitForTimeout(5200)
  assert.equal(await page.locator('[data-weekly-dot][aria-current="true"]').getAttribute('data-weekly-dot'),'1')
  await page.locator('[data-weekly-carousel]').hover()
  await page.waitForTimeout(5200)
  assert.equal(await page.locator('[data-weekly-dot][aria-current="true"]').getAttribute('data-weekly-dot'),'1')
  await page.locator('#projectSearch').fill('GreenLoop')
  assert.equal(await page.locator('#projectGrid .discovery-card').count(),1)
  await page.locator('#projectGrid .discovery-card').click()
  assert.equal(await page.getByRole('dialog').count(),1)
  await page.keyboard.press('Escape')
  await page.locator('#projectSearch').fill('not-a-project')
  assert.equal(await page.locator('#projectGrid .empty-state').count(),1)
  await page.goto(base+'/pages/find-team.html')
  await page.locator('#teamSearch').fill('SafeWalk')
  assert.equal(await page.locator('#teamGrid .team-card').count(),1)
  await page.locator('[data-join]').click()
  await page.getByRole('dialog').locator('[name=intro]').fill('ทดสอบผู้ใช้งาน')
  await page.getByRole('dialog').locator('[name=skills]').fill('Research')
  await page.getByRole('dialog').locator('[name=message]').fill('สนใจเข้าร่วมทีมเพื่อทดสอบการใช้งาน')
  await page.getByRole('dialog').getByRole('button',{name:'บันทึกคำขอ Join',exact:true}).click()
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('showkong.join-requests')).length),1)
  await page.keyboard.press('Escape')
  await page.goto(base+'/pages/sponsored-challenge.html')
  await page.locator('[data-category="Technology"]').click()
  assert.equal(await page.locator('.challenge-item').count(),1)
  await page.locator('[data-challenge="safety"]').click()
  assert.match(await page.getByRole('dialog').innerText(),/ปลอดภัย/)
  await page.keyboard.press('Escape')
  await page.goto(base+'/pages/dashboard.html')
  await page.locator('[data-accept="mint"]').click()
  assert.equal(await page.locator('[data-view="requests"] strong').innerText(),'4')
  await page.locator('[data-feedback="nan"]').click()
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('[data-view="feedback"] strong').innerText(),'2')
  await page.reload()
  assert.equal(await page.locator('[data-view="requests"] strong').innerText(),'4')
  await page.goto(base+'/pages/post.html')
  await page.locator('#postTitle').fill('QA <script>not executable</script>')
  await page.locator('#postDescription').fill('ทดสอบสร้างโพสต์และแนบภาพจากแบบ')
  await page.reload()
  assert.equal(await page.locator('#postTitle').inputValue(),'QA <script>not executable</script>')
  await page.locator('#postImages').setInputFiles({
    name:'test.png', mimeType:'image/png',
    buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jM1sAAAAASUVORK5CYII=','base64'),
  })
  await page.locator('.upload-item').waitFor()
  await page.locator('#submitPostBtn').click()
  await page.getByRole('button',{name:'ดูโพสต์ใน Feed',exact:true}).click()
  await page.waitForURL('**/pages/feed.html')
  assert.match(await page.locator('.feed-post').first().innerText(),/QA <script>not executable<\/script>/)
  assert.equal(await page.locator('.feed-post').first().locator('.post-images img').count(),1)
  await page.reload()
  assert.match(await page.locator('.feed-post').first().innerText(),/QA/)
  await page.locator('.header-actions a[href="/pages/post.html"]').click()
  await page.getByRole('dialog').locator('#postTitle').fill('Modal draft')
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('dialog').count(),0)
  await page.setViewportSize({width:390,height:844})
  await page.locator('.mobile-menu-button').click()
  await page.locator('.mobile-dashboard-link[href="/pages/dashboard.html"]').click()
  await page.waitForURL('**/pages/dashboard.html')
  assert.deepEqual(errors,[])
  console.log(JSON.stringify({pageChecks:results.length,widths:[1440,1024,768,390,320],overflow:results.filter(r=>r.overflow),interactions:'passed',consoleErrors:errors,screenshots:output},null,2))
} finally {
  await browser.close()
}
