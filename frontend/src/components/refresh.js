import '../style.css'
import '../refresh.css'
import { mountAuthenticatedShell } from './shared.js'

export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export function mountRefresh(activePage) {
  document.body.classList.add('refresh-page')
  mountAuthenticatedShell(activePage)
  const nav = document.querySelector('.main-nav')
  if (nav) {
    nav.querySelector('a[href="/pages/show-kong.html"]').textContent = 'โชว์ผลงาน'
    nav.insertAdjacentHTML('beforeend', `<a class="nav-link ${activePage === 'challenges' ? 'is-active' : ''}" href="/pages/sponsored-challenge.html">ชาเลนจ์</a>`)
    nav.insertAdjacentHTML('beforeend', `<a class="nav-link mobile-dashboard-link ${activePage === 'dashboard' ? 'is-active' : ''}" href="/pages/dashboard.html">Dashboard</a>`)
    nav.insertAdjacentHTML('beforeend', '<a class="nav-link mobile-dashboard-link" href="/pages/post.html">โพสต์โปรเจกต์</a>')
    nav.querySelector('.is-active')?.setAttribute('aria-current', 'page')
  }
  const avatar = document.querySelector('.header-actions .avatar')
  if (avatar) avatar.outerHTML = `<a class="avatar avatar-sm ${activePage === 'dashboard' ? 'avatar-active' : ''}" href="/pages/dashboard.html" aria-label="เปิด Dashboard" ${activePage === 'dashboard' ? 'aria-current="page"' : ''}>P</a>`
}

export function readLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
export function saveLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false }
}
export function toast(message) {
  let el = document.querySelector('#pageNotice')
  if (!el) {
    el = document.createElement('div')
    el.id = 'pageNotice'
    el.className = 'page-notice'
    el.setAttribute('role', 'status')
    document.body.append(el)
  }
  el.textContent = message
  el.hidden = false
  clearTimeout(toast.timer)
  toast.timer = setTimeout(() => { el.hidden = true }, 6000)
}

export function openDialog(title, content, className = '') {
  const previous = document.activeElement
  const dialog = document.createElement('dialog')
  dialog.className = `refresh-dialog ${className}`
  dialog.setAttribute('aria-labelledby', 'refreshDialogTitle')
  dialog.innerHTML = `<div class="modal-header"><h2 id="refreshDialogTitle">${escapeHtml(title)}</h2><button class="icon-button" data-close-dialog aria-label="ปิด" type="button">×</button></div>${content}`
  document.body.append(dialog)
  dialog.addEventListener('click', e => {
    if (e.target.closest('[data-close-dialog]') || e.target === dialog && (e.clientX < dialog.getBoundingClientRect().left || e.clientX > dialog.getBoundingClientRect().right || e.clientY < dialog.getBoundingClientRect().top || e.clientY > dialog.getBoundingClientRect().bottom)) dialog.close()
  })
  dialog.addEventListener('close', () => { dialog.remove(); document.body.classList.remove('modal-open'); previous?.focus() }, { once: true })
  dialog.showModal()
  document.body.classList.add('modal-open')
  return dialog
}
