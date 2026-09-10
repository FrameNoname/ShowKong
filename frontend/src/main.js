import './style.css'
import { isSupabaseConfigured, supabase } from './lib/supabase.js'

const errorMessage = document.querySelector('#errorMessage')

function showError(message) {
  if (!errorMessage) return
  errorMessage.textContent = message
  errorMessage.classList.remove('hidden')
}

// Avatar File Preview & DataURL conversion
const avatarFileInput = document.querySelector('#avatarFileInput')
const avatarPreviewImg = document.querySelector('#avatarPreviewImg')
const avatarPlaceholder = document.querySelector('#avatarPlaceholder')
const avatarFileName = document.querySelector('#avatarFileName')
const avatarUrlHidden = document.querySelector('#avatarUrl')

avatarFileInput?.addEventListener('change', () => {
  const file = avatarFileInput.files?.[0]
  if (!file) return

  if (avatarFileName) {
    avatarFileName.textContent = file.name
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const dataUrl = e.target?.result
    if (avatarPreviewImg) {
      avatarPreviewImg.src = dataUrl
      avatarPreviewImg.classList.remove('hidden')
    }
    if (avatarPlaceholder) {
      avatarPlaceholder.classList.add('hidden')
    }
    if (avatarUrlHidden) {
      avatarUrlHidden.value = dataUrl
    }
  }
  reader.readAsDataURL(file)
})

// Google Sign-up integration
const googleSignUpBtn = document.querySelector('#googleSignUpBtn')
googleSignUpBtn?.addEventListener('click', async () => {
  if (!isSupabaseConfigured) {
    showError('ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env จึงยังสมัครด้วย Google ไม่ได้')
    return
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/pages/feed.html`,
    },
  })

  if (error) {
    showError(error.message)
  }
})

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

const registerForm = document.querySelector('#registerForm')
const registerSubmitBtn = document.querySelector('#registerSubmitBtn')
const registerSubmitText = document.querySelector('#registerSubmitText')

registerForm?.addEventListener('submit', async (event) => {
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
    avatar_url: document.querySelector('#avatarUrl')?.value?.trim() || '',
    github_url: document.querySelector('#githubUrl')?.value?.trim() || '',
  }

  if (registerSubmitBtn) {
    registerSubmitBtn.disabled = true
    if (registerSubmitText) registerSubmitText.textContent = 'กำลังสร้างบัญชี...'
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: profile },
    })

    if (error) {
      showError(error.message)
    } else if (data.session) {
      window.location.replace('/pages/feed.html')
    } else {
      window.location.replace('/pages/login.html')
    }
  } catch (err) {
    showError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ')
  } finally {
    if (registerSubmitBtn) {
      registerSubmitBtn.disabled = false
      if (registerSubmitText) registerSubmitText.textContent = 'สมัครสมาชิกและสร้างโปรไฟล์'
    }
  }
})
