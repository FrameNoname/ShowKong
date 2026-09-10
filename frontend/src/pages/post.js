import { mountRefresh } from '../components/refresh.js'
import { composerForm, bindComposer, showPostSuccess } from '../components/composer.js'
import { supabase } from '../lib/supabase.js'

mountRefresh('post')
if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

// ─── DOM References ───
const form = document.querySelector('#postForm')
const titleInput = document.querySelector('#postTitle')
const descInput = document.querySelector('#postDescription')
const topicSelect = document.querySelector('#postTopic')
const milestoneSelect = document.querySelector('#postMilestone')
const tagsInput = document.querySelector('#postTags')
const demoUrlInput = document.querySelector('#postDemoUrl')
const githubUrlInput = document.querySelector('#postGithubUrl')
const imageInput = document.querySelector('#postImages')
const uploadPreview = document.querySelector('#uploadPreview')
const dropZone = document.querySelector('#dropZone')
const successModal = document.querySelector('#successModal')
const saveDraftBtn = document.querySelector('#saveDraftBtn')
const draftAlert = document.querySelector('#draftAlert')
const restoreDraftBtn = document.querySelector('#restoreDraftBtn')
const discardDraftBtn = document.querySelector('#discardDraftBtn')
const titleCharCount = document.querySelector('#titleCharCount')
const descCharCount = document.querySelector('#descCharCount')
const postToast = document.querySelector('#postToast')
const postToastMsg = document.querySelector('#postToastMsg')
const rolesRecruitingContainer = document.querySelector('#rolesRecruitingContainer')

// Quality meter elements
const qualityScoreText = document.querySelector('#qualityScoreText')
const qualityProgressBar = document.querySelector('#qualityProgressBar')
const checkType = document.querySelector('#checkType')
const checkTitle = document.querySelector('#checkTitle')
const checkDesc = document.querySelector('#checkDesc')
const checkMedia = document.querySelector('#checkMedia')

// Live Preview elements
const previewType = document.querySelector('#previewType')
const previewMeta = document.querySelector('#previewMeta')
const previewTitle = document.querySelector('#previewTitle')
const previewBody = document.querySelector('#previewBody')
const previewTags = document.querySelector('#previewTags')
const previewLinks = document.querySelector('#previewLinks')
const previewRoles = document.querySelector('#previewRoles')
const previewRolesList = document.querySelector('#previewRolesList')
const previewCardImages = document.querySelector('#previewCardImages')
const previewBanner = document.querySelector('#previewBanner')

// Step progress indicators
const stepIndicator1 = document.querySelector('#stepIndicator1')
const stepIndicator2 = document.querySelector('#stepIndicator2')
const stepIndicator3 = document.querySelector('#stepIndicator3')
const stepBar1 = document.querySelector('#stepBar1')
const stepBar2 = document.querySelector('#stepBar2')

// Circular quality ring
const qualityRing = document.querySelector('#qualityRing')
const qualityHint = document.querySelector('#qualityHint')

let activePostType = 'ไอเดียใหม่'
let selectedRoles = []
let selectedFiles = []

const DRAFT_STORAGE_KEY = 'showkong_post_draft'
const USER_POSTS_STORAGE_KEY = 'showkong_user_posts'

const typeConfig = {
  'ไอเดียใหม่': {
    color: '#6d5dfb',
    bg: '#f1eeff',
    border: '#6d5dfb',
    accent: 'purple',
    badge: '💡 ไอเดียใหม่',
    gradient: 'from-[#160e3d] via-[#4d3db2] to-[#7f67fb]',
  },
  'กำลังหาทีม': {
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#f97316',
    accent: 'orange',
    badge: '👥 กำลังหาทีม',
    gradient: 'from-[#3a1c12] via-[#ff7a59] to-[#ffd493]',
  },
  'ขอ Feedback': {
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#3b82f6',
    accent: 'blue',
    badge: '🧪 ขอ Feedback',
    gradient: 'from-[#0c1a3d] via-[#2563eb] to-[#93c5fd]',
  },
  'ความคืบหน้า': {
    color: '#059669',
    bg: '#ecfdf5',
    border: '#10b981',
    accent: 'green',
    badge: '📈 ความคืบหน้า',
    gradient: 'from-[#062c24] via-[#059669] to-[#a7f3d0]',
  },
}

// ─── Post Templates ───
const templates = {
  'find-team': {
    type: 'กำลังหาทีม',
    topic: 'เทคโนโลยี',
    milestone: '⚙️ กำลังพัฒนา',
    title: 'ตามหาทีมสร้างแอปพลิเคชัน...',
    desc: `🎯 ปัญหาที่ต้องการแก้:\nเรากำลังพัฒนาโปรเจกต์ที่ช่วยแก้ปัญหา...\n\n🛠️ สแต็กเทคโนโลยีที่ใช้:\nFlutter / FastAPI / Supabase\n\n👥 ตำแหน่งที่ต้องการร่วมทีม:\n- UX/UI Designer (1 คน) ช่วยวาง Flow และ User Journey\n- Backend Developer (1 คน) ออกแบบ API และ Database\n\n⏳ กรอบเวลาการทำงาน:\nสัปดาห์ละ 5-8 ชั่วโมง มีการคุยอัปเดตสัปดาห์ละ 1 ครั้ง`,
    tags: 'FindTeam, UX/UI, Flutter, FastAPI, Hackathon',
    roles: ['UX/UI Designer', 'Backend Developer'],
  },
  'feedback': {
    type: 'ขอ Feedback',
    topic: 'การศึกษา',
    milestone: '🎮 มี Prototype / Demo ให้ลองแล้ว',
    title: 'ขอความคิดเห็นและทดสอบ Prototype แอป...',
    desc: `🧪 สิ่งที่อยากให้เพื่อนๆ ช่วยทดสอบ:\nเราเพิ่งทำ Interactive Prototype เวอร์ชันแรกเสร็จ อยากให้ช่วยลองเล่นในจุดสำคัญ:\n1. ขั้นตอน Onboarding เข้าใจง่ายหรือไม่?\n2. ฟังก์ชันหลักใช้งานติดขัดตรงไหนบ้าง?\n\n🔗 ลิงก์ทดลองใช้งาน:\nสามารถคลิกเล่น Live Demo หรือลองใส่ข้อมูลทดสอบได้เลยครับ\n\n🙏 ขอบคุณทุกคำแนะนำและข้อเสนอแนะล่วงหน้านะครับ!`,
    tags: 'Prototype, UserTesting, Feedback, EdTech, Figma',
    roles: [],
  },
  'new-idea': {
    type: 'ไอเดียใหม่',
    topic: 'ชุมชน',
    milestone: '💭 ไอเดีย / วางแผน',
    title: 'ไอเดีย: แพลตฟอร์มช่วย...',
    desc: `💡 ที่มาของไอเดีย:\nจากประสบการณ์ที่เราสังเกตเห็นปัญหาในมหาวิทยาลัย/ชุมชน...\n\n🚀 แนวทางแก้ไขและคุณค่า:\nอยากสร้างระบบที่ช่วยให้...\n\n❓ คำถามที่อยากถามชุมชน:\n- เพื่อนๆ คิดว่าไอเดียนี้น่าสนใจและมีประโยชน์จริงไหม?\n- มี Pain point หรือมุมมองเพิ่มเติมที่ควรระวังไหมครับ?`,
    tags: 'Idea, Brainstorm, Community, Solution',
    roles: [],
  },
  'milestone': {
    type: 'ความคืบหน้า',
    topic: 'เทคโนโลยี',
    milestone: '🚀 เปิดให้ใช้งานจริงแล้ว',
    title: 'Milestone Update: เปิดตัวเวอร์ชันทดสอบแรกแล้ว!',
    desc: `🎉 อัปเดตความคืบหน้าโปรเจกต์:\nหลังจากพัฒนามาตลอด 3 สัปดาห์ ตอนนี้เรามีผู้ทดลองใช้งานครบ 100 คนแล้ว!\n\n📈 สถิติที่น่าสนใจ:\n- มีการทดสอบระบบมากกว่า 450 ครั้ง\n- อัตราความพึงพอใจ 4.8 / 5 ดาว\n\nขอบคุณทุก Feedback จากชุมชน ShowKong ที่ช่วยให้เราปรับปรุงมาจนถึงจุดนี้ครับ!`,
    tags: 'Milestone, Launch, Success, Progress',
    roles: [],
  },
}

// ─── Post Type Switcher ───
document.querySelectorAll('[data-post-types] .type-card').forEach((btn) => {
  btn.addEventListener('click', () => {
    setActivePostType(btn.dataset.value)
  })
})

function setActivePostType(typeName) {
  activePostType = typeName
  document.querySelectorAll('[data-post-types] .type-card').forEach((card) => {
    const isTarget = card.dataset.value === typeName
    if (isTarget) {
      card.classList.add('is-active', 'border-[#6d5dfb]', 'bg-[#f9f8ff]')
      card.classList.remove('border-gray-200')
    } else {
      card.classList.remove('is-active', 'border-[#6d5dfb]', 'bg-[#f9f8ff]')
      card.classList.add('border-gray-200')
    }
  })

  // Show/highlight roles container if seeking team
  if (rolesRecruitingContainer) {
    if (typeName === 'กำลังหาทีม') {
      rolesRecruitingContainer.classList.remove('opacity-60')
      rolesRecruitingContainer.classList.add('ring-2', 'ring-orange-300')
    } else {
      rolesRecruitingContainer.classList.remove('ring-2', 'ring-orange-300')
      rolesRecruitingContainer.classList.add('opacity-60')
    }
  }

  updatePreview()
  saveDraftToStorage()
}

// ─── Templates Quick Apply ───
document.querySelectorAll('.template-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.template
    const tpl = templates[key]
    if (!tpl) return

    setActivePostType(tpl.type)
    if (tpl.title && !titleInput.value) titleInput.value = tpl.title
    if (tpl.desc) descInput.value = tpl.desc
    if (tpl.topic) topicSelect.value = tpl.topic
    if (tpl.milestone) milestoneSelect.value = tpl.milestone
    if (tpl.tags) tagsInput.value = tpl.tags

    selectedRoles = [...tpl.roles]
    renderSelectedRoles()

    showToast(`นำเข้าเทมเพลต "${tpl.type}" เรียบร้อยแล้ว ✨`)
    updatePreview()
    saveDraftToStorage()
  })
})

// ─── Role Recruiting Chips ───
const rolePillsContainer = document.querySelector('#rolePillsContainer')
const customRoleInput = document.querySelector('#customRoleInput')
const addCustomRoleBtn = document.querySelector('#addCustomRoleBtn')
const customTagInput = document.querySelector('#customTagInput')
const addCustomTagBtn = document.querySelector('#addCustomTagBtn')

rolePillsContainer?.addEventListener('click', (event) => {
  const pill = event.target.closest('.role-pill')
  if (!pill) return
  const role = pill.dataset.role
  const isCustom = pill.dataset.custom === 'true'
  const idx = selectedRoles.indexOf(role)

  if (idx > -1) {
    selectedRoles.splice(idx, 1)
    if (isCustom) {
      pill.remove()
    } else {
      pill.classList.remove('bg-orange-500', 'text-white', 'border-orange-500')
      pill.classList.add('bg-white', 'text-gray-700', 'border-orange-200')
    }
  } else {
    selectedRoles.push(role)
    pill.classList.remove('bg-white', 'text-gray-700', 'border-orange-200')
    pill.classList.add('bg-orange-500', 'text-white', 'border-orange-500')
  }
  renderSelectedRoles()
  updatePreview()
  saveDraftToStorage()
})

function addCustomRole(roleName) {
  const cleanRole = roleName.trim()
  if (!cleanRole) return
  if (selectedRoles.includes(cleanRole)) {
    showToast(`ตำแหน่ง "${cleanRole}" ถูกเลือกไว้แล้ว`)
    return
  }

  // Check if pill already exists in predefined list
  const existingPill = rolePillsContainer?.querySelector(`[data-role="${cleanRole}"]`)
  if (existingPill) {
    selectedRoles.push(cleanRole)
    renderSelectedRoles()
  } else {
    // Add custom pill to container
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'role-pill px-3 py-1.5 rounded-xl border text-xs font-semibold bg-orange-500 text-white border-orange-500 transition-all flex items-center gap-1'
    btn.dataset.role = cleanRole
    btn.dataset.custom = 'true'
    btn.innerHTML = `<span>✓ ${escapeHtml(cleanRole)}</span><span class="text-[10px] opacity-75 hover:opacity-100">✕</span>`
    rolePillsContainer?.appendChild(btn)
    selectedRoles.push(cleanRole)
  }

  if (customRoleInput) customRoleInput.value = ''
  showToast(`เพิ่มตำแหน่ง "${cleanRole}" แล้ว 🎉`)
  renderSelectedRoles()
  updatePreview()
  saveDraftToStorage()
}

addCustomRoleBtn?.addEventListener('click', () => {
  if (customRoleInput) addCustomRole(customRoleInput.value)
})

customRoleInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addCustomRole(customRoleInput.value)
  }
})

function renderSelectedRoles() {
  document.querySelectorAll('#rolePillsContainer .role-pill').forEach((pill) => {
    const roleName = pill.dataset.role
    const isSelected = selectedRoles.includes(roleName)
    const isCustom = pill.dataset.custom === 'true'

    if (isSelected) {
      pill.classList.remove('bg-white', 'text-gray-700', 'border-orange-200')
      pill.classList.add('bg-orange-500', 'text-white', 'border-orange-500')
      if (isCustom) {
        pill.innerHTML = `<span>✓ ${escapeHtml(roleName)}</span><span class="text-[10px] opacity-75 hover:opacity-100">✕</span>`
      } else {
        pill.textContent = `✓ ${roleName}`
      }
    } else {
      pill.classList.remove('bg-orange-500', 'text-white', 'border-orange-500')
      pill.classList.add('bg-white', 'text-gray-700', 'border-orange-200')
      if (!isCustom) {
        pill.textContent = `+ ${roleName}`
      }
    }
  })
}

// ─── Markdown Formatting Toolbar ───
document.querySelectorAll('.format-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const format = btn.dataset.format
    const start = descInput.selectionStart
    const end = descInput.selectionEnd
    const sel = descInput.value.substring(start, end)
    let replacement = ''

    if (format === 'bold') replacement = `**${sel || 'ข้อความตัวหนา'}**`
    if (format === 'italic') replacement = `*${sel || 'ข้อความตัวเอียง'}*`
    if (format === 'bullet') replacement = `\n• ${sel || 'หัวข้อสำคัญ'}`
    if (format === 'code') replacement = `\`${sel || 'code'}\``

    descInput.setRangeText(replacement, start, end, 'end')
    descInput.focus()
    updatePreview()
    saveDraftToStorage()
  })
})

document.querySelector('#insertStructureBtn')?.addEventListener('click', () => {
  const structure = `\n\n🎯 ปัญหาที่แก้ (Problem):\n\n⚡ วิธีการแก้ไขและฟีเจอร์เด่น (Solution & Features):\n- \n- \n\n🤝 สิ่งที่ต้องการให้ชุมชนช่วย:\n`
  descInput.value += structure
  descInput.focus()
  updatePreview()
  saveDraftToStorage()
})

// ─── Tag Suggestion Pills & Custom Tag Input ───
function addTag(tag) {
  const cleanTag = tag.replace(/^#/, '').trim()
  if (!cleanTag) return

  const current = tagsInput.value.trim()
  const tagsArr = current
    ? current.split(/[,、\s]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
    : []

  if (!tagsArr.includes(cleanTag)) {
    tagsArr.push(cleanTag)
    tagsInput.value = tagsArr.join(', ')
    updatePreview()
    saveDraftToStorage()
    showToast(`เพิ่มแท็ก #${cleanTag} แล้ว 🏷️`)
  } else {
    showToast(`มีแท็ก #${cleanTag} อยู่แล้ว`)
  }
}

document.querySelectorAll('.tag-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    addTag(pill.dataset.tag)
  })
})

addCustomTagBtn?.addEventListener('click', () => {
  if (customTagInput) {
    addTag(customTagInput.value)
    customTagInput.value = ''
  }
})

customTagInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTag(customTagInput.value)
    customTagInput.value = ''
  }
})

// ─── Live Preview & Character Counters ───
function escapeHtml(str = '') {
  return String(str).replace(/[&<>'"]/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[c])
}

function updatePreview() {
  const config = typeConfig[activePostType] || typeConfig['ไอเดียใหม่']

  // Update Preview Type badge
  if (previewType) {
    previewType.textContent = config.badge
    previewType.style.color = '#fff'
    previewType.style.backgroundColor = 'rgba(255,255,255,0.25)'
  }

  // Update preview banner gradient
  if (previewBanner && config.gradient) {
    // Remove all gradient classes and apply new one
    previewBanner.className = previewBanner.className.replace(/from-\[.*?\]\s*via-\[.*?\]\s*to-\[.*?\]/g, '')
    previewBanner.className = `relative h-28 bg-gradient-to-br ${config.gradient} p-4 flex flex-col justify-between`
  }

  // Update Meta (topic + milestone)
  if (previewMeta) {
    const topicVal = topicSelect?.value || 'ทั่วไป'
    const milestoneVal = milestoneSelect?.value || ''
    previewMeta.textContent = `เมื่อสักครู่ · ${topicVal} ${milestoneVal ? '· ' + milestoneVal.split(' ')[0] : ''}`
  }

  // Title
  const title = titleInput.value.trim()
  if (previewTitle) {
    previewTitle.textContent = title || 'ชื่อโปรเจกต์ของคุณจะแสดงที่นี่'
    previewTitle.classList.toggle('text-gray-400', !title)
    previewTitle.classList.toggle('text-gray-900', Boolean(title))
  }
  if (titleCharCount) {
    titleCharCount.textContent = `${titleInput.value.length}/100`
  }

  // Description
  const desc = descInput.value.trim()
  if (previewBody) {
    previewBody.textContent = desc || 'พิมพ์รายละเอียดในฟอร์มด้านซ้ายเพื่อดูตัวอย่างข้อความสด...'
    previewBody.classList.toggle('text-gray-400', !desc)
    previewBody.classList.toggle('text-gray-600', Boolean(desc))
  }
  if (descCharCount) {
    descCharCount.textContent = `${desc.length} ตัวอักษร`
  }

  // Roles in preview
  if (previewRoles && previewRolesList) {
    if (selectedRoles.length > 0) {
      previewRoles.hidden = false
      previewRolesList.innerHTML = selectedRoles
        .map(
          (r) => `<span class="px-2 py-0.5 rounded-md bg-white border border-orange-200 text-orange-800 text-[10px] font-bold">${escapeHtml(r)}</span>`,
        )
        .join('')
    } else {
      previewRoles.hidden = true
    }
  }

  // Tags
  const tags = tagsInput.value
    .split(/[,、\s]+/)
    .map((t) => t.replace(/^#/, '').trim())
    .filter(Boolean)

  if (previewTags) {
    if (tags.length > 0) {
      previewTags.innerHTML = tags
        .map(
          (t) => `<span class="px-2 py-0.5 rounded-md bg-purple-50 text-[#6d5dfb] text-[11px] font-medium">#${escapeHtml(t)}</span>`,
        )
        .join('')
      previewTags.hidden = false
    } else {
      previewTags.hidden = true
    }
  }

  // Links
  const demo = demoUrlInput.value.trim()
  const github = githubUrlInput.value.trim()
  if (previewLinks) {
    if (demo || github) {
      let html = ''
      if (demo) {
        html += `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 text-[#6d5dfb] text-xs font-bold"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>Live Demo</span>`
      }
      if (github) {
        html += `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</span>`
      }
      previewLinks.innerHTML = html
      previewLinks.hidden = false
    } else {
      previewLinks.hidden = true
    }
  }

  // Update Quality Score
  updateQualityScore()
}

// ─── Quality Score Calculator ───
function updateQualityScore() {
  let score = 0

  const hasType = Boolean(activePostType && topicSelect?.value)
  const hasTitle = titleInput.value.trim().length >= 8
  const hasDesc = descInput.value.trim().length >= 35
  const hasMedia = selectedFiles.length > 0 || Boolean(demoUrlInput.value.trim() || githubUrlInput.value.trim())

  if (hasType) score += 25
  if (hasTitle) score += 25
  if (hasDesc) score += 25
  if (hasMedia) score += 25

  if (qualityScoreText) qualityScoreText.textContent = `${score}%`
  if (qualityProgressBar) qualityProgressBar.style.width = `${score}%`

  // Update circular ring
  const circumference = 213.6 // 2 * PI * 34
  if (qualityRing) {
    qualityRing.style.strokeDashoffset = circumference - (circumference * score) / 100
  }

  // Update quality hint text
  if (qualityHint) {
    if (score === 100) qualityHint.textContent = '🎉 สมบูรณ์แบบ! พร้อมโพสต์แล้ว'
    else if (score >= 75) qualityHint.textContent = '🔥 เกือบครบแล้ว! เพิ่มอีกนิดเดียว'
    else if (score >= 50) qualityHint.textContent = '💪 ดีมาก! เพิ่มข้อมูลอีกหน่อยจะสมบูรณ์'
    else qualityHint.textContent = 'เพิ่มข้อมูลให้ครบเพื่อโพสต์ที่น่าสนใจ'
  }

  // Update stepper progress indicators
  updateStepperProgress(hasType, hasTitle, hasDesc, hasMedia)

  updateChecklistItem(checkType, hasType)
  updateChecklistItem(checkTitle, hasTitle)
  updateChecklistItem(checkDesc, hasDesc)
  updateChecklistItem(checkMedia, hasMedia)
}

function updateChecklistItem(itemEl, isComplete) {
  if (!itemEl) return
  const icon = itemEl.querySelector('.check-icon')
  if (isComplete) {
    itemEl.classList.add('text-emerald-600', 'font-semibold', 'bg-emerald-50/50')
    itemEl.classList.remove('text-gray-500')
    if (icon) {
      icon.textContent = '✓'
      icon.className = 'check-icon w-5 h-5 rounded-full bg-emerald-500 text-white grid place-items-center text-[11px] font-bold shrink-0 transition-all'
    }
  } else {
    itemEl.classList.remove('text-emerald-600', 'font-semibold', 'bg-emerald-50/50')
    itemEl.classList.add('text-gray-500')
    if (icon) {
      icon.textContent = '○'
      icon.className = 'check-icon w-5 h-5 rounded-full bg-gray-100 text-gray-300 grid place-items-center text-[11px] font-bold shrink-0 transition-all'
    }
  }
}

// ─── Stepper Progress ───
function updateStepperProgress(hasType, hasTitle, hasDesc, hasMedia) {
  const step1Done = hasType && hasTitle
  const step2Done = hasDesc
  const step3Done = hasMedia

  function activateStep(indicator, done) {
    const dot = indicator?.querySelector('.step-dot')
    const labels = indicator?.querySelectorAll('div span')
    if (!dot) return
    if (done) {
      dot.className = 'step-dot w-9 h-9 rounded-full bg-emerald-500 text-white text-sm font-bold grid place-items-center shadow-md shadow-emerald-500/30 transition-all'
      dot.textContent = '✓'
      if (labels?.[0]) labels[0].className = 'block text-xs font-bold text-emerald-700'
    } else if (indicator === getCurrentStepIndicator(hasType, hasTitle, hasDesc, hasMedia)) {
      dot.className = 'step-dot w-9 h-9 rounded-full bg-[#6d5dfb] text-white text-sm font-bold grid place-items-center shadow-md shadow-purple-500/30 transition-all animate-pulse'
      if (labels?.[0]) labels[0].className = 'block text-xs font-bold text-gray-900'
    } else {
      const origNum = indicator === stepIndicator1 ? '1' : indicator === stepIndicator2 ? '2' : '3'
      dot.className = 'step-dot w-9 h-9 rounded-full bg-gray-200 text-gray-500 text-sm font-bold grid place-items-center transition-all'
      dot.textContent = origNum
      if (labels?.[0]) labels[0].className = 'block text-xs font-bold text-gray-400'
    }
  }

  function getCurrentStepIndicator(ht, htl, hd, hm) {
    if (!ht || !htl) return stepIndicator1
    if (!hd) return stepIndicator2
    if (!hm) return stepIndicator3
    return null
  }

  activateStep(stepIndicator1, step1Done)
  activateStep(stepIndicator2, step2Done)
  activateStep(stepIndicator3, step3Done)

  if (stepBar1) stepBar1.style.width = step1Done ? '100%' : (hasType ? '50%' : '0%')
  if (stepBar2) stepBar2.style.width = step2Done ? (step3Done ? '100%' : '50%') : '0%'
}

// ─── Input Listeners ───
titleInput.addEventListener('input', () => {
  updatePreview()
  saveDraftToStorage()
})
descInput.addEventListener('input', () => {
  updatePreview()
  saveDraftToStorage()
})
tagsInput.addEventListener('input', () => {
  updatePreview()
  saveDraftToStorage()
})
demoUrlInput.addEventListener('input', () => {
  updatePreview()
  saveDraftToStorage()
})
githubUrlInput.addEventListener('input', () => {
  updatePreview()
  saveDraftToStorage()
})
topicSelect.addEventListener('change', () => {
  updatePreview()
  saveDraftToStorage()
})
milestoneSelect.addEventListener('change', () => {
  updatePreview()
  saveDraftToStorage()
})

// ─── Image Upload & Previews ───
function renderImagePreviews() {
  const countText = document.querySelector('#imageCountText')
  if (countText) {
    countText.textContent = `อัปโหลดแล้ว ${selectedFiles.length}/4 รูป`
  }

  if (selectedFiles.length === 0) {
    uploadPreview.hidden = true
    uploadPreview.innerHTML = ''
    if (previewCardImages) {
      previewCardImages.hidden = true
      previewCardImages.innerHTML = ''
    }
    updateQualityScore()
    return
  }

  uploadPreview.hidden = false
  uploadPreview.innerHTML = selectedFiles
    .map((file, index) => {
      const url = URL.createObjectURL(file)
      return `
      <div class="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square shadow-xs">
        <img src="${url}" alt="${escapeHtml(file.name)}" class="w-full h-full object-cover">
        <button type="button" data-remove="${index}" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white grid place-items-center text-xs hover:bg-rose-600 transition-colors shadow-sm" aria-label="ลบรูป">✕</button>
        <span class="absolute bottom-0 inset-x-0 px-2.5 py-1 bg-black/60 text-white text-[10px] truncate backdrop-blur-xs">${escapeHtml(file.name)}</span>
      </div>
    `
    })
    .join('')

  // Mirror into Live Preview card
  if (previewCardImages) {
    previewCardImages.hidden = false
    previewCardImages.innerHTML = selectedFiles
      .slice(0, 2)
      .map((file) => {
        const url = URL.createObjectURL(file)
        return `<img src="${url}" alt="Preview" class="w-full h-24 object-cover rounded-lg border border-gray-200">`
      })
      .join('')
  }

  updateQualityScore()
}

function addFiles(newFiles) {
  const remaining = 4 - selectedFiles.length
  const toAdd = [...newFiles].slice(0, remaining)
  selectedFiles.push(...toAdd)
  renderImagePreviews()
  showToast(`เพิ่มรูปภาพ ${toAdd.length} รูปเรียบร้อย 🖼️`)
}

imageInput?.addEventListener('change', () => {
  addFiles(imageInput.files)
  imageInput.value = ''
})

uploadPreview?.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('[data-remove]')
  if (!removeBtn) return
  const index = Number(removeBtn.dataset.remove)
  selectedFiles.splice(index, 1)
  renderImagePreviews()
})

// Drag and drop
dropZone?.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropZone.classList.add('border-[#6d5dfb]', 'bg-purple-50/60')
})

dropZone?.addEventListener('dragleave', () => {
  dropZone.classList.remove('border-[#6d5dfb]', 'bg-purple-50/60')
})

dropZone?.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('border-[#6d5dfb]', 'bg-purple-50/60')
  const files = [...event.dataTransfer.files].filter((f) => f.type.startsWith('image/'))
  addFiles(files)
})

// ─── Toast System ───
let toastTimer = null
function showToast(msg) {
  if (!postToast || !postToastMsg) return
  if (toastTimer) clearTimeout(toastTimer)

  postToastMsg.textContent = msg
  postToast.classList.remove('translate-y-16', 'opacity-0')
  postToast.classList.add('translate-y-0', 'opacity-100')

  toastTimer = setTimeout(() => {
    postToast.classList.remove('translate-y-0', 'opacity-100')
    postToast.classList.add('translate-y-16', 'opacity-0')
  }, 2500)
}

// ─── Draft System (localStorage) ───
let draftTimeout = null
function saveDraftToStorage() {
  if (draftTimeout) clearTimeout(draftTimeout)
  draftTimeout = setTimeout(() => {
    const draft = {
      type: activePostType,
      title: titleInput.value,
      desc: descInput.value,
      topic: topicSelect.value,
      milestone: milestoneSelect.value,
      tags: tagsInput.value,
      demoUrl: demoUrlInput.value,
      githubUrl: githubUrlInput.value,
      roles: selectedRoles,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
    const statusText = document.querySelector('#draftStatusText')
    if (statusText) statusText.textContent = `บันทึกร่างเมื่อ ${draft.savedAt}`
  }, 400)
}

function checkDraftOnLoad() {
  try {
    const draftJson = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!draftJson) return
    const draft = JSON.parse(draftJson)
    if (draft.title || draft.desc) {
      if (draftAlert) draftAlert.hidden = false
    }
  } catch {}
}

restoreDraftBtn?.addEventListener('click', () => {
  try {
    const draftJson = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!draftJson) return
    const draft = JSON.parse(draftJson)

    if (draft.type) setActivePostType(draft.type)
    if (draft.title) titleInput.value = draft.title
    if (draft.desc) descInput.value = draft.desc
    if (draft.topic) topicSelect.value = draft.topic
    if (draft.milestone) milestoneSelect.value = draft.milestone
    if (draft.tags) tagsInput.value = draft.tags
    if (draft.demoUrl) demoUrlInput.value = draft.demoUrl
    if (draft.githubUrl) githubUrlInput.value = draft.githubUrl
    if (draft.roles) {
      selectedRoles = [...draft.roles]
      // Re-create any custom pills not in initial list
      selectedRoles.forEach((role) => {
        const existingPill = rolePillsContainer?.querySelector(`[data-role="${role}"]`)
        if (!existingPill) {
          const btn = document.createElement('button')
          btn.type = 'button'
          btn.className = 'role-pill px-3 py-1.5 rounded-xl border text-xs font-semibold bg-orange-500 text-white border-orange-500 transition-all flex items-center gap-1'
          btn.dataset.role = role
          btn.dataset.custom = 'true'
          btn.innerHTML = `<span>✓ ${escapeHtml(role)}</span><span class="text-[10px] opacity-75 hover:opacity-100">✕</span>`
          rolePillsContainer?.appendChild(btn)
        }
      })
      renderSelectedRoles()
    }

    if (draftAlert) draftAlert.hidden = true
    updatePreview()
    showToast('กู้คืนฉบับร่างเรียบร้อยแล้ว ✨')
  } catch {}
})

discardDraftBtn?.addEventListener('click', () => {
  localStorage.removeItem(DRAFT_STORAGE_KEY)
  if (draftAlert) draftAlert.hidden = true
  showToast('ลบฉบับร่างเรียบร้อย')
})

saveDraftBtn?.addEventListener('click', () => {
  saveDraftToStorage()
  showToast('บันทึกฉบับร่างลงในเครื่องเรียบร้อยแล้ว 💾')
})

// ─── Form Submit ───
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const submitBtn = document.querySelector('#submitPostBtn')
  submitBtn.disabled = true
  submitBtn.innerHTML = `
    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    <span>กำลังบันทึกโพสต์...</span>
  `

  const newPost = {
    id: 'user_post_' + Date.now(),
    type: activePostType,
    author: 'คุณ (Pluem)',
    initial: 'P',
    meta: `เมื่อสักครู่ · ${topicSelect.value || 'โปรเจกต์ใหม่'}`,
    title: titleInput.value.trim(),
    body: descInput.value.trim(),
    topic: topicSelect.value,
    milestone: milestoneSelect.value,
    tags: tagsInput.value.trim(),
    demoUrl: demoUrlInput.value.trim(),
    githubUrl: githubUrlInput.value.trim(),
    roles: [...selectedRoles],
    stats: '0 สนใจ · 0 ความคิดเห็น',
    accent: typeConfig[activePostType]?.accent || 'purple',
    createdAt: new Date().toISOString(),
  }

  // Save to persistent user posts
  try {
    const existing = JSON.parse(localStorage.getItem(USER_POSTS_STORAGE_KEY)) || []
    existing.unshift(newPost)
    localStorage.setItem(USER_POSTS_STORAGE_KEY, JSON.stringify(existing))
    localStorage.removeItem(DRAFT_STORAGE_KEY)
  } catch {}

  setTimeout(() => {
    form.reset()
    selectedFiles = []
    selectedRoles = []
    // Remove custom added role pills
    rolePillsContainer?.querySelectorAll('[data-custom="true"]').forEach((p) => p.remove())
    renderImagePreviews()
    renderSelectedRoles()
    setActivePostType('ไอเดียใหม่')
    updatePreview()

    submitBtn.disabled = false
    submitBtn.innerHTML = '<span>🚀</span><span>โพสต์โปรเจกต์</span>'

    successModal.hidden = false
    document.body.classList.add('modal-open')
  }, 600)
})

// ─── Success Modal Actions ───
document.querySelector('#postAnother')?.addEventListener('click', () => {
  successModal.hidden = true
  document.body.classList.remove('modal-open')
  titleInput.focus()
})

successModal?.addEventListener('click', (event) => {
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

// ─── AI Writing Assistant ───
document.querySelectorAll('.ai-suggest-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.suggest

    if (action === 'problem') {
      const structure = `\n\n🎯 ปัญหาที่ต้องการแก้ไข (Problem):\n[อธิบายปัญหาที่พบในมหาวิทยาลัยหรือชุมชน]\n\n⚡ วิธีการแก้ไขและฟีเจอร์เด่น (Solution & Features):\n• [ฟีเจอร์ที่ 1]\n• [ฟีเจอร์ที่ 2]\n• [ฟีเจอร์ที่ 3]\n\n🛠️ สแต็กเทคโนโลยีที่ใช้:\n[เช่น Flutter / FastAPI / Supabase / TensorFlow]\n\n🤝 สิ่งที่ต้องการจากชุมชน:\n[ทดสอบ Prototype / ร่วมทีม / Feedback / คำปรึกษา]\n`
      descInput.value += structure
      descInput.focus()
      updatePreview()
      saveDraftToStorage()
      showToast('ใส่โครงสร้างเนื้อหาโพสต์ให้แล้ว! ✨ กรอกรายละเอียดเพิ่มเติมได้เลย')
    }

    if (action === 'catchy-title') {
      const desc = descInput.value.trim()
      const suggestedTitles = [
        'แอปช่วยแก้ปัญหา [X] ให้นักศึกษาในมหาวิทยาลัย — พร้อม Demo ให้ลองเล่น!',
        '[ชื่อแอป] — ระบบ [ฟีเจอร์เด่น] ที่ใช้ AI ช่วยนักศึกษาทำ [สิ่งที่ทำ] ได้เร็วขึ้น 3 เท่า',
        'จาก Pain Point สู่ Solution: สร้าง [ชื่อโปรเจกต์] เพื่อแก้ปัญหา [ปัญหา] ในมหาลัย',
      ]
      const randomTitle = suggestedTitles[Math.floor(Math.random() * suggestedTitles.length)]
      if (!titleInput.value.trim()) {
        titleInput.value = randomTitle
      } else {
        titleInput.value = titleInput.value + ' — ' + randomTitle.split(' — ')[1] || ''
      }
      updatePreview()
      saveDraftToStorage()
      showToast('แนะนำชื่อโปรเจกต์ให้แล้ว! แก้ไขตามต้องการได้เลย 🎯')
    }

    if (action === 'tags') {
      const desc = (descInput.value + ' ' + titleInput.value).toLowerCase()
      const tagMap = {
        'flutter': 'Flutter', 'react': 'React', 'next': 'Next.js', 'vue': 'Vue',
        'python': 'Python', 'ai': 'AI', 'ml': 'MachineLearning', 'nlp': 'NLP',
        'fastapi': 'FastAPI', 'supabase': 'Supabase', 'firebase': 'Firebase',
        'figma': 'Figma', 'ux': 'UX/UI', 'ui': 'UX/UI', 'design': 'Design',
        'mobile': 'MobileApp', 'web': 'WebApp', 'iot': 'IoT',
        'สุขภาพ': 'HealthTech', 'การเงิน': 'FinTech', 'การศึกษา': 'EdTech',
        'ชุมชน': 'Community', 'สิ่งแวดล้อม': 'GreenTech', 'อาหาร': 'FoodTech',
        'hackathon': 'Hackathon', 'startup': 'Startup',
      }
      const suggested = []
      Object.entries(tagMap).forEach(([keyword, tag]) => {
        if (desc.includes(keyword) && !suggested.includes(tag)) {
          suggested.push(tag)
        }
      })
      if (suggested.length === 0) suggested.push('Prototype', 'Innovation', 'StudentProject')
      const currentTags = tagsInput.value.trim()
      tagsInput.value = currentTags ? currentTags + ', ' + suggested.join(', ') : suggested.join(', ')
      updatePreview()
      saveDraftToStorage()
      showToast(`เพิ่มแท็กแนะนำ ${suggested.length} รายการแล้ว! 🏷️`)
    }
  })
})

// ─── Init ───
updatePreview()
checkDraftOnLoad()
