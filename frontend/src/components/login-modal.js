import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

let isLoginModalMounted = false

export function loginModalMarkup() {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-6 opacity-0 transition-opacity duration-300 ease-out pointer-events-none" id="loginModal" hidden>
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="loginBackdrop"></div>
      <section class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative z-10 translate-y-8 scale-95 opacity-0 transition-all duration-400 ease-out" id="loginPanel" role="dialog" aria-modal="true" aria-labelledby="loginModalTitle">
        <button class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 text-xl transition js-close-login" type="button" aria-label="ปิด">×</button>

        <div class="text-center mb-6">
          <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-3">ShowKong Account</span>
          <h2 id="loginModalTitle" class="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h2>
          <p class="text-gray-500 text-sm mt-1">ยินดีต้อนรับกลับสู่ ShowKong — เริ่มต้นสร้างโอกาสไปด้วยกัน</p>
        </div>

        <form id="modalLoginForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email หรือ Username</label>
            <input type="text" id="modalLoginEmail" required placeholder="name@example.com หรือ username" autocomplete="username"
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input type="password" id="modalLoginPassword" required placeholder="กรอกรหัสผ่านของคุณ" autocomplete="current-password"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" />
              <button type="button" id="modalTogglePasswordBtn" aria-label="แสดงหรือซ่อนรหัสผ่าน" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 transition cursor-pointer">
                <svg id="modalEyeOff" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <svg id="modalEyeOn" class="w-4 h-4 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>
          </div>

          <p id="modalLoginError" class="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2" hidden></p>

          <button type="submit" id="modalLoginSubmit"
            class="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition duration-200">
            เข้าสู่ระบบ
          </button>

          <div class="text-center text-sm text-gray-500 mt-2">
            ยังไม่มีบัญชี? <a href="/pages/register.html" class="text-blue-600 font-medium hover:underline">สมัครสมาชิกที่นี่</a>
          </div>
        </form>
      </section>
    </div>
  `
}

export function openLoginModal() {
  ensureLoginModal()
  const modal = document.querySelector('#loginModal')
  const panel = document.querySelector('#loginPanel')
  if (!modal) return

  // Unhide แต่ยังไม่แสดง (opacity-0 อยู่)
  modal.hidden = false
  document.body.classList.add('modal-open')

  // Trigger reflow ก่อน แล้วค่อย animate เข้ามา
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none')
      modal.classList.add('opacity-100', 'pointer-events-auto')
      if (panel) {
        panel.classList.remove('translate-y-8', 'scale-95', 'opacity-0')
        panel.classList.add('translate-y-0', 'scale-100', 'opacity-100')
      }
    })
  })

  setTimeout(() => {
    document.querySelector('#modalLoginEmail')?.focus()
  }, 350)
}

export function closeLoginModal() {
  const modal = document.querySelector('#loginModal')
  const panel = document.querySelector('#loginPanel')
  if (!modal) return

  // Animate ออก
  modal.classList.remove('opacity-100', 'pointer-events-auto')
  modal.classList.add('opacity-0', 'pointer-events-none')
  if (panel) {
    panel.classList.remove('translate-y-0', 'scale-100', 'opacity-100')
    panel.classList.add('translate-y-8', 'scale-95', 'opacity-0')
  }

  // รอ animation จบแล้วค่อย hidden
  setTimeout(() => {
    modal.hidden = true
    document.body.classList.remove('modal-open')
    const errorElement = document.querySelector('#modalLoginError')
    if (errorElement) {
      errorElement.textContent = ''
      errorElement.hidden = true
    }
  }, 300)
}

export function ensureLoginModal() {
  if (isLoginModalMounted) return
  if (!document.querySelector('#loginModal')) {
    document.body.insertAdjacentHTML('beforeend', loginModalMarkup())
  }
  bindLoginModalEvents()
  isLoginModalMounted = true
}

function bindLoginModalEvents() {
  const modal = document.querySelector('#loginModal')
  if (!modal) return

  modal.querySelectorAll('.js-close-login').forEach((btn) => {
    btn.addEventListener('click', closeLoginModal)
  })

  // คลิก backdrop (พื้นหลังสีดำ) เพื่อปิด
  document.querySelector('#loginBackdrop')?.addEventListener('click', closeLoginModal)

  // Password visibility toggle in modal
  const modalPwd = document.querySelector('#modalLoginPassword')
  const modalToggleBtn = document.querySelector('#modalTogglePasswordBtn')
  const modalEyeOff = document.querySelector('#modalEyeOff')
  const modalEyeOn = document.querySelector('#modalEyeOn')
  modalToggleBtn?.addEventListener('click', () => {
    const isPwd = modalPwd?.type === 'password'
    if (modalPwd) modalPwd.type = isPwd ? 'text' : 'password'
    modalEyeOff?.classList.toggle('hidden', isPwd)
    modalEyeOn?.classList.toggle('hidden', !isPwd)
  })

  const form = document.querySelector('#modalLoginForm')
  const errorElem = document.querySelector('#modalLoginError')
  const submitBtn = document.querySelector('#modalLoginSubmit')

  form?.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!isSupabaseConfigured) {
      showError('ยังไม่ได้ตั้งค่า Supabase ในไฟล์ .env จึงยังเข้าสู่ระบบไม่ได้')
      return
    }

    const email = document.querySelector('#modalLoginEmail')?.value.trim()
    const password = document.querySelector('#modalLoginPassword')?.value

    if (!email || !password) {
      showError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = 'กำลังเข้าสู่ระบบ...'
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        showError(error.message)
      } else {
        window.location.replace('/pages/feed.html')
      }
    } catch (err) {
      showError(err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = 'เข้าสู่ระบบ'
      }
    }
  })

  function showError(msg) {
    if (!errorElem) return
    errorElem.textContent = msg
    errorElem.hidden = false
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.querySelector('#loginModal')
    if (modal && !modal.hidden) {
      closeLoginModal()
    }
  }
})
