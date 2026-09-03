import '../style.css'
import { communityCta, siteFooter } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'
import { openLoginModal } from '../components/login-modal.js'

const ctaSlot = document.querySelector('[data-shared-cta]')
const footerSlot = document.querySelector('[data-shared-footer]')

if (ctaSlot) ctaSlot.innerHTML = communityCta()
if (footerSlot) footerSlot.innerHTML = siteFooter()

document.querySelectorAll('.js-open-post').forEach((button) => {
  button.addEventListener('click', () => {
    window.location.href = '/pages/register.html'
  })
})

document.querySelectorAll('.js-open-login, [href="/pages/login.html"], [href="./pages/login.html"]').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    openLoginModal()
  })
})

const menuButton = document.querySelector('.mobile-menu-button')
menuButton?.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav')
  const isOpen = nav?.classList.toggle('is-open') ?? false
  menuButton.setAttribute('aria-expanded', String(isOpen))
})

async function redirectSignedInUser() {
  if (!supabase) return

  const { data, error } = await supabase.auth.getSession()
  if (!error && data.session) window.location.replace('/pages/feed.html')
}

redirectSignedInUser()

if (window.location.hash === '#login') {
  openLoginModal()
}

