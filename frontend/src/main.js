import './style.css'
import { isSupabaseConfigured, supabase } from './lib/supabase.js'

const errorMessage = document.querySelector('#errorMessage')

function showError(message) {
  if (!errorMessage) return
  errorMessage.textContent = message
  errorMessage.classList.remove('hidden')
}

document.querySelector('#loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!isSupabaseConfigured) {
    showError('ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env จึงยังเข้าสู่ระบบไม่ได้')
    return
  }

  const email = document.querySelector('#loginEmail').value.trim()
  const password = document.querySelector('#loginPassword').value
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) showError(error.message)
  else window.location.replace('/pages/feed.html')
})

document.querySelector('#registerForm')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!isSupabaseConfigured) {
    showError('ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env จึงยังสมัครสมาชิกไม่ได้')
    return
  }

  const email = document.querySelector('#email').value.trim()
  const password = document.querySelector('#password').value
  const profile = {
    username: document.querySelector('#username').value.trim(),
    full_name: document.querySelector('#fullName').value.trim(),
    age: Number(document.querySelector('#age').value),
    university: document.querySelector('#university').value.trim(),
    faculty: document.querySelector('#faculty').value.trim(),
    year: document.querySelector('#year').value,
    avatar_url: document.querySelector('#avatarUrl').value.trim(),
    github_url: document.querySelector('#githubUrl').value.trim(),
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: profile },
  })

  if (error) showError(error.message)
  else if (data.session) window.location.replace('/pages/feed.html')
  else window.location.replace('/pages/login.html')
})
