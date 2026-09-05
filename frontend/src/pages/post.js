import '../style.css'
import { mountAuthenticatedShell } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'

mountAuthenticatedShell('post')

if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

// ─── Elements ───
const form = document.querySelector('#postForm')
const titleInput = document.querySelector('#postTitle')
const descInput = document.querySelector('#postDescription')
const topicSelect = document.querySelector('#postTopic')
const tagsInput = document.querySelector('#postTags')
const demoUrlInput = document.querySelector('#postDemoUrl')
const githubUrlInput = document.querySelector('#postGithubUrl')
const imageInput = document.querySelector('#postImages')
const uploadPreview = document.querySelector('#uploadPreview')
const dropZone = document.querySelector('#dropZone')
const successModal = document.querySelector('#successModal')

// Preview elements
const previewType = document.querySelector('#previewType')
const previewTitle = document.querySelector('#previewTitle')
const previewBody = document.querySelector('#previewBody')
const previewTags = document.querySelector('#previewTags')
const previewLinks = document.querySelector('#previewLinks')

let activePostType = 'ไอเดียใหม่'

const typeConfig = {
  'ไอเดียใหม่': { color: '#5948ef', bg: '#f1eeff' },
  'กำลังหาทีม': { color: '#b85134', bg: '#fff0ea' },
  'ขอ Feedback': { color: '#26649c', bg: '#eaf5ff' },
  'ความคืบหน้า': { color: '#187b59', bg: '#e9f9f2' },
}

// ─── Post Type Chips ───
document.querySelector('[data-post-types]').addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return

  document.querySelectorAll('[data-post-types] button').forEach((b) => b.classList.remove('is-active'))
  button.classList.add('is-active')
  activePostType = button.dataset.value
  updatePreview()
})

// ─── Live Preview ───
function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[c])
}

function updatePreview() {
  const config = typeConfig[activePostType] || typeConfig['ไอเดียใหม่']
  previewType.textContent = activePostType
  previewType.style.color = config.color
  previewType.style.backgroundColor = config.bg

  const title = titleInput.value.trim()
  previewTitle.textContent = title || 'ชื่อโปรเจกต์ของคุณ'
  previewTitle.classList.toggle('text-[#9996a8]', !title)

  const desc = descInput.value.trim()
  previewBody.textContent = desc || 'รายละเอียดจะปรากฏที่นี่ เมื่อคุณเริ่มพิมพ์ในฟอร์ม...'
  previewBody.classList.toggle('text-[#9996a8]', !desc)

  // Tags
  const tags = tagsInput.value
    .split(/[,、\s]+/)
    .map((t) => t.replace(/^#/, '').trim())
    .filter(Boolean)

  if (tags.length > 0) {
    previewTags.innerHTML = tags
      .map((tag) => `<span class="px-2 py-0.5 rounded-md bg-[var(--brand-soft)] text-[var(--brand)] text-xs font-medium">${escapeHtml(tag)}</span>`)
      .join('')
    previewTags.hidden = false
  } else {
    previewTags.hidden = true
  }

  // Links
  const demo = demoUrlInput.value.trim()
  const github = githubUrlInput.value.trim()
  if (demo || github) {
    let html = ''
    if (demo) html += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--page)] text-xs text-[var(--muted)]"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/><path stroke-linecap="round" stroke-linejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101"/></svg>Demo</span>`
    if (github) html += `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--page)] text-xs text-[var(--muted)]"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</span>`
    previewLinks.innerHTML = html
    previewLinks.hidden = false
  } else {
    previewLinks.hidden = true
  }
}

titleInput.addEventListener('input', updatePreview)
descInput.addEventListener('input', updatePreview)
tagsInput.addEventListener('input', updatePreview)
demoUrlInput.addEventListener('input', updatePreview)
githubUrlInput.addEventListener('input', updatePreview)
topicSelect.addEventListener('change', updatePreview)

// ─── Image Upload ───
let selectedFiles = []

function renderImagePreviews() {
  if (selectedFiles.length === 0) {
    uploadPreview.hidden = true
    uploadPreview.innerHTML = ''
    return
  }

  uploadPreview.hidden = false
  uploadPreview.innerHTML = selectedFiles.map((file, index) => {
    const url = URL.createObjectURL(file)
    return `
      <div class="relative group rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--page)] aspect-square">
        <img src="${url}" alt="${escapeHtml(file.name)}" class="w-full h-full object-cover">
        <button type="button" data-remove="${index}" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white grid place-items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500" aria-label="ลบรูป ${escapeHtml(file.name)}">×</button>
        <span class="absolute bottom-0 inset-x-0 px-2 py-1 bg-black/50 text-white text-[10px] truncate">${escapeHtml(file.name)}</span>
      </div>
    `
  }).join('')
}

function addFiles(newFiles) {
  const remaining = 4 - selectedFiles.length
  const toAdd = [...newFiles].slice(0, remaining)
  selectedFiles.push(...toAdd)
  renderImagePreviews()
}

imageInput.addEventListener('change', () => {
  addFiles(imageInput.files)
  imageInput.value = ''
})

uploadPreview.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('[data-remove]')
  if (!removeBtn) return
  const index = Number(removeBtn.dataset.remove)
  selectedFiles.splice(index, 1)
  renderImagePreviews()
})

// Drag and drop
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropZone.classList.add('border-[var(--brand)]', 'bg-[#f9f7ff]')
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('border-[var(--brand)]', 'bg-[#f9f7ff]')
})

dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('border-[var(--brand)]', 'bg-[#f9f7ff]')
  const files = [...event.dataTransfer.files].filter((f) => f.type.startsWith('image/'))
  addFiles(files)
})

// ─── Draft Save (visual feedback only) ───
document.querySelector('#saveDraftBtn').addEventListener('click', () => {
  const btn = document.querySelector('#saveDraftBtn')
  const originalText = btn.innerHTML
  btn.innerHTML = `<svg class="w-4 h-4 mr-1.5 text-[var(--green)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>บันทึกแล้ว!`
  btn.disabled = true
  setTimeout(() => {
    btn.innerHTML = originalText
    btn.disabled = false
  }, 2000)
})

// ─── Submit ───
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const submitBtn = document.querySelector('#submitPostBtn')
  submitBtn.disabled = true
  submitBtn.textContent = 'กำลังโพสต์...'

  // Simulate a small delay for UX
  setTimeout(() => {
    form.reset()
    selectedFiles = []
    renderImagePreviews()
    activePostType = 'ไอเดียใหม่'
    document.querySelectorAll('[data-post-types] button').forEach((b) => b.classList.remove('is-active'))
    document.querySelector('[data-post-types] button').classList.add('is-active')
    updatePreview()

    submitBtn.disabled = false
    submitBtn.textContent = 'โพสต์โปรเจกต์'

    successModal.hidden = false
    document.body.classList.add('modal-open')
  }, 600)
})

// ─── Success Modal ───
document.querySelector('#postAnother').addEventListener('click', () => {
  successModal.hidden = true
  document.body.classList.remove('modal-open')
  titleInput.focus()
})

successModal.addEventListener('click', (event) => {
  if (event.target === successModal) {
    successModal.hidden = true
    document.body.classList.remove('modal-open')
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !successModal.hidden) {
    successModal.hidden = true
    document.body.classList.remove('modal-open')
  }
})

// ─── Init ───
updatePreview()
