import '../style.css'
import { mountAuthenticatedShell } from '../components/shared.js'
import { supabase } from '../lib/supabase.js'

// Mount shared header & footer with 'showKong' as active
mountAuthenticatedShell('showKong')

if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}

// ─── Initial Showcase Projects Data ───
const projectsData = [
  {
    id: 'safewalk-mfu',
    title: 'SafeWalk MFU — Smart Campus Safety & Safe Routes',
    shortDesc: 'แอปนำทางเลือกเส้นทางกลับหอพักที่ปลอดภัยที่สุดใน ม.แม่ฟ้าหลวง พร้อมระบุจุดเสี่ยง ไฟส่องสว่าง และปุ่มแจ้งเตือน SOS ฉุกเฉิน',
    creator: {
      name: 'Narin K.',
      faculty: 'วิศวกรรมคอมพิวเตอร์',
      uni: 'ม.แม่ฟ้าหลวง (MFU)',
      initial: 'N',
      avatarBg: 'bg-[#6d5dfb]',
    },
    category: 'Web & Mobile',
    isAward: true,
    isTrending: true,
    badge: '🏆 ชนะเลิศ Hackathon MFU 2025',
    badgeClass: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm',
    bannerGradient: 'from-[#1e144f] via-[#4d3db2] to-[#ff7a59]',
    cardAccent: '#6d5dfb',
    tags: ['Flutter', 'Google Maps API', 'FastAPI', 'IoT'],
    upvotes: 184,
    views: 1420,
    createdAt: '2026-03-01',
    story: 'พัฒนาขึ้นจากปัญหาจริงของนักศึกษาที่ต้องเดินกลับหอช่วงดึก โดยเฉพาะทางเปลี่ยวและจุดที่ไฟทางดับ ทีมได้ลงพื้นที่เก็บข้อมูลจุดเสี่ยงกว่า 120 จุดในมหาวิทยาลัย และเชื่อมต่อกับกล้องวงจรปิดเพื่อประเมินความปลอดภัยแบบเรียลไทม์',
    features: [
      'Safe Route Real-time — แนะนำเส้นทางเดินที่สว่างที่สุดและมีคนสัญจรพลุกพล่าน',
      'Virtual Companion — เดินเป็นเพื่อนผ่านระบบติดตาม GPS แชร์สดกับเพื่อนสนิท',
      'SOS One-Tap — กดแจ้งเตือนฉุกเฉินส่งพิกัดแม่นยำไปยังศูนย์รักษาความปลอดภัยมหาวิทยาลัยทันที',
      'Community Hazard Report — แจ้งจุดไฟดับ พื้นผิวถนนชำรุด หรือจุดไม่ปลอดภัยลงแผนที่กลาง',
    ],
    team: [
      { name: 'Narin K.', role: 'Project Lead & Mobile Dev', avatar: 'N' },
      { name: 'Pitchaya S.', role: 'IoT & Backend Dev', avatar: 'P' },
      { name: 'Kornkanok T.', role: 'UX/UI & User Research', avatar: 'K' },
    ],
    liveUrl: 'https://safewalk-mfu.demo.app',
    githubUrl: 'https://github.com/safewalk-mfu/app',
    comments: [
      { author: 'Aj. Danai', time: '1 วันที่แล้ว', text: 'เป็นโปรเจกต์ที่แก้ปัญหาได้ตรงจุดมาก ลองเชื่อมกับระบบ รปภ. มหาวิทยาลัยดูครับ ยินดีให้คำปรึกษา' },
      { author: 'Beam_CE', time: '3 วันที่แล้ว', text: 'ชอบฟีเจอร์ Virtual Companion มากครับ ดูใช้งานง่ายตอนเดินดึกๆ' },
    ],
  },
  {
    id: 'kasetsense',
    title: 'KasetSense — AI วินิจฉัยโรคพืชและคาดการณ์ผลผลิตเกษตรกร',
    shortDesc: 'ระบบ AI ตรวจจับโรคพืชเศรษฐกิจไทยจากภาพถ่ายใบไม้ความแม่นยำ 94.8% พร้อมแนะนำแนวทางรักษาด้วยสารชีวภัณฑ์',
    creator: {
      name: 'Tanapat W.',
      faculty: 'Data Science & AI',
      uni: 'จุฬาลงกรณ์มหาวิทยาลัย',
      initial: 'T',
      avatarBg: 'bg-[#1eaa75]',
    },
    category: 'AI & Data',
    isAward: true,
    isTrending: true,
    badge: '🤖 Best Capstone Project 2025',
    badgeClass: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm',
    bannerGradient: 'from-[#0d3b2e] via-[#1eaa75] to-[#86efac]',
    cardAccent: '#1eaa75',
    tags: ['AI', 'PyTorch', 'FastAPI', 'Computer Vision'],
    upvotes: 215,
    views: 1980,
    createdAt: '2026-03-02',
    story: 'ร่วมมือกับกลุ่มวิสาหกิจชุมชน รวบรวม Dataset ภาพถ่ายใบพืชกว่า 15,000 ภาพ โดยปรับแต่งโมเดล Lightweight ให้ประมวลผลได้รวดเร็วภายใน 1.5 วินาทีแม้บนสมาร์ตโฟนทั่วไปที่ความเร็วอินเทอร์เน็ตต่ำ',
    features: [
      'ตรวจจับโรคพืช 24 ชนิด ครอบคลุม ข้าว ข้าวโพด ทุเรียน มันสำปะหลัง',
      'คำแนะนำการรักษาที่ปลอดภัย ลดต้นทุนเคมีเกษตรได้เฉลี่ย 35%',
      'Dashboard สรุปแนวโน้มการระบาดตามพิกัดและสภาพอากาศ',
      'ทำงานแบบ Offline First บันทึกรูปไว้แล้วซิงค์ผลเมื่อมีสัญญาณเน็ต',
    ],
    team: [
      { name: 'Tanapat W.', role: 'AI / ML Engineer', avatar: 'T' },
      { name: 'Sirilak M.', role: 'Frontend & Cloud Architect', avatar: 'S' },
      { name: 'Dr. Pongpan', role: 'Advisor (Agronomy)', avatar: 'P' },
    ],
    liveUrl: 'https://kasetsense-ai.web.app',
    githubUrl: 'https://github.com/tanapatw/kasetsense-core',
    comments: [
      { author: 'Chaiwat_Farmer', time: '2 วันที่แล้ว', text: 'ทดลองใช้ตรวจใบข้าวโพดแล้ว แนะนำยาชีวภาพเข้าใจง่ายมากครับ' },
      { author: 'May_Data', time: '4 วันที่แล้ว', text: 'โมเดลทำ Inference เร็วมาก เทรนบน YOLO หรือ ResNet หรอคะ?' },
    ],
  },
  {
    id: 'queuemai',
    title: 'QueueMai — จองคิวโรงอาหาร & กู้ชีพอาหารเหลือ (Food Waste Rescue)',
    shortDesc: 'ระบบสั่งอาหารล่วงหน้าเพื่อลดคิวช่วงพักเที่ยง พร้อมฟีเจอร์ Blind Box ลดขยะอาหารตอนเย็นในราคาสบายกระเป๋านักศึกษา',
    creator: {
      name: 'Preme R.',
      faculty: 'Software Engineering',
      uni: 'สจล. (KMITL)',
      initial: 'P',
      avatarBg: 'bg-[#ff7a59]',
    },
    category: 'เพื่อสังคม',
    isAward: false,
    isTrending: true,
    badge: '🔥 ยอดใช้งาน 8,000+ ครั้ง/เดือน',
    badgeClass: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm',
    bannerGradient: 'from-[#3a1c12] via-[#ff7a59] to-[#ffd493]',
    cardAccent: '#ff7a59',
    tags: ['Next.js', 'Supabase', 'Tailwind', 'FoodWaste'],
    upvotes: 142,
    views: 1120,
    createdAt: '2026-03-03',
    story: 'โรงอาหารมหาวิทยาลัยมีปัญหาแถวยาวเหยียดจนนักศึกษาไม่มีเวลากินข้าว ขณะที่ตอนเย็นร้านค้ากลับมีอาหารเหลือทิ้งเฉลี่ย 15-20 จานต่อร้าน จึงทำแพลตฟอร์มที่เชื่อมสองจุดนี้เข้าด้วยกัน',
    features: [
      'Real-time Queue Status — สั่งล่วงหน้า เดินมารับอาหารตอนทำเสร็จพอดี',
      'Happy Hour Box — อาหารคุณภาพดีลดราคา 50-70% ก่อนปิดร้าน ช่วยลดขยะอาหาร',
      'ระบบแต้มสะสม Green Points แลกส่วนลดกับร้านค้าพันธมิตร',
      'Merchant Portal ให้ป้าๆ น้าๆ ร้านอาหารใช้งานง่ายด้วยไอคอนใหญ่',
    ],
    team: [
      { name: 'Preme R.', role: 'Fullstack Dev & Product', avatar: 'P' },
      { name: 'Chanon D.', role: 'UI/UX & Operations', avatar: 'C' },
    ],
    liveUrl: 'https://queuemai.kmitl.ac.th',
    githubUrl: 'https://github.com/preme-r/queuemai',
    comments: [
      { author: 'Art_Engineer', time: '5 วันที่แล้ว', text: 'ตั้งแต่มีแอปนี้ไม่ต้องไปแย่งต่อแถวข้าวแกงอีกต่อไป ดีมากกก' },
    ],
  },
  {
    id: 'finbuddy',
    title: 'FinBuddy — จัดการงบและออมเงินร่วมกับเพื่อนฉบับ Gamification',
    shortDesc: 'แอปบันทึกรายรับ-รายจ่ายที่เปลี่ยนการคุมเงินให้เป็นเกมเลี้ยงสัตว์ร่วมกับแก๊งเพื่อน ยิ่งประหยัดสัตว์เลี้ยงยิ่งเลเวลอัพ',
    creator: {
      name: 'Natacha B.',
      faculty: 'Interactive Media Design',
      uni: 'มจธ. (KMUTT)',
      initial: 'N',
      avatarBg: 'bg-[#26649c]',
    },
    category: 'Design',
    isAward: true,
    isTrending: false,
    badge: '🎨 UX/UI Design Excellence 2025',
    badgeClass: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm',
    bannerGradient: 'from-[#112440] via-[#26649c] to-[#99d5ff]',
    cardAccent: '#26649c',
    tags: ['Figma', 'React', 'Gamification', 'FinTech'],
    upvotes: 178,
    views: 1650,
    createdAt: '2026-02-24',
    story: 'จากการวิจัยพฤติกรรมทางการเงินของเด็ก Gen Z พบว่า 82% เลิกจดบันทึกรายรับรายจ่ายหลังสัปดาห์แรกเพราะรู้สึกน่าเบื่อและเครียด FinBuddy จึงใช้จิตวิทยาเกมและ Social Accountability เข้ามาช่วยให้การออมกลายเป็นเรื่องสนุก',
    features: [
      'Virtual Pet Buddy — สัตว์เลี้ยงคู่ใจที่เติบโตและแสดงอารมณ์ตามวินัยการเงิน',
      'Split Bill Instant — สแกนสลิปพร้อมหารค่าทริป/ค่าหอกับเพื่อนอัตโนมัติ',
      'Savings Quest — ตั้งภารกิจเก็บเงินไปคอนเสิร์ตแข่งกับเพื่อนในกลุ่ม',
      'Micro-budget Insights — แจ้งเตือนเมื่อค่ากาแฟและชานมไข่มุกเริ่มเกินงบสัปดาห์',
    ],
    team: [
      { name: 'Natacha B.', role: 'UI/UX Design Lead', avatar: 'N' },
      { name: 'Kittipong V.', role: 'Mobile Developer (React)', avatar: 'K' },
    ],
    liveUrl: 'https://finbuddy-student.app',
    githubUrl: 'https://github.com/natacha-b/finbuddy',
    comments: [
      { author: 'Jane_BBA', time: '1 สัปดาห์ที่แล้ว', text: 'UI น่ารักจนอยากเปิดเข้ามาจดบัญชีทุกวันเลย สัตว์เลี้ยงดุมากเวลาสั่งชานม 555' },
    ],
  },
  {
    id: 'echolearn',
    title: 'EchoLearn — AI แปลงเสียงเลคเชอร์เป็นชีทสรุป & Flashcard ภาษาไทย',
    shortDesc: 'บันทึกเสียงอาจารย์สอนในห้องเรียน แปลงเป็นโน้ตสรุปภาษาไทยที่เข้าใจง่าย พร้อมสร้าง Flashcard สำหรับทบทวนสอบอัตโนมัติ',
    creator: {
      name: 'Arthit S.',
      faculty: 'วิทยาการคอมพิวเตอร์',
      uni: 'มหาวิทยาลัยเชียงใหม่ (CMU)',
      initial: 'A',
      avatarBg: 'bg-[#9333ea]',
    },
    category: 'AI & Data',
    isAward: false,
    isTrending: true,
    badge: '✨ กำลังมาแรงในหมวด EdTech',
    badgeClass: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm',
    bannerGradient: 'from-[#2e0854] via-[#7e22ce] to-[#f472b6]',
    cardAccent: '#9333ea',
    tags: ['AI', 'Python', 'Next.js', 'NLP'],
    upvotes: 264,
    views: 2450,
    createdAt: '2026-03-04',
    story: 'เกิดจากปัญหาที่ห้องเลคเชอร์ 300 คน พูดเร็วและมีคำศัพท์เฉพาะทางภาษาไทยปนอังกฤษ ทำให้จดเลคเชอร์ไม่ทัน เราจึงปรับแต่งโมเดล Whisper ให้เข้าใจสำเนียงไทยและคำศัพท์เฉพาะวิชาการได้แม่นยำขึ้นกว่า 90%',
    features: [
      'Speech-to-Text ภาษาไทยที่มีความแม่นยำสูง แม้มีเสียงก้องในห้องบรรยายขนาดใหญ่',
      'Auto Summarize — สรุปประเด็นสำคัญ ไฮไลต์จุดที่อาจารย์ย้ำว่าจะออกสอบ',
      'Interactive Flashcards — สุ่มคำถามและทวนแบบ Spaced Repetition',
      'ส่งออกเป็น PDF, Notion Page และ Markdown ได้ในคลิกเดียว',
    ],
    team: [
      { name: 'Arthit S.', role: 'AI & NLP Engineer', avatar: 'A' },
      { name: 'Varisa K.', role: 'Frontend & Education Tech', avatar: 'V' },
    ],
    liveUrl: 'https://echolearn.cmu.edu',
    githubUrl: 'https://github.com/arthit-s/echolearn',
    comments: [
      { author: 'Pop_Med', time: '1 วันที่แล้ว', text: 'คำศัพท์เฉพาะทางแพทย์ถอดได้แม่นมาก ช่วยตอนเตรียมสอบไฟนอลได้เยอะเลย' },
      { author: 'Mint_Law', time: '2 วันที่แล้ว', text: 'ชีทสรุปออกมาอ่านง่าย เป็นระเบียบมากครับ ขอบคุณที่สร้างขึ้นมา!' },
    ],
  },
  {
    id: 'mindspace',
    title: 'MindSpace — แพลตฟอร์มพื้นที่ปลอดภัย & ปรึกษาสุขภาพจิตนิรนาม',
    shortDesc: 'ชุมชนปลอดภัยสำหรับระบายความเครียดจากการเรียนและชีวิตมหาลัยแบบนิรนาม พร้อมระบบนัดคุย Peer Listener ที่ผ่านการอบรม',
    creator: {
      name: 'Ploypailin J.',
      faculty: 'จิตวิทยา & วิศวกรรมคอมฯ',
      uni: 'จุฬาลงกรณ์มหาวิทยาลัย',
      initial: 'P',
      avatarBg: 'bg-[#059669]',
    },
    category: 'เพื่อสังคม',
    isAward: true,
    isTrending: false,
    badge: '💚 Social Innovation Grant Winner',
    badgeClass: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm',
    bannerGradient: 'from-[#062c24] via-[#059669] to-[#a7f3d0]',
    cardAccent: '#059669',
    tags: ['Next.js', 'WebRTC', 'Supabase', 'Encrypted'],
    upvotes: 195,
    views: 1890,
    createdAt: '2026-02-18',
    story: 'สถิตินักศึกษากว่า 40% เผชิญภาวะหมดไฟและความเครียดสูง แต่ไม่กล้าเข้าพบอาจารย์หรือไปโรงพยาบาลเพราะกังวลเรื่องความเป็นส่วนตัว MindSpace ถูกออกแบบให้เป็น First-line Safe Space ที่รักษาความลับและความเป็นนิรนาม 100%',
    features: [
      'Anonymous Room — พื้นที่พูดคุยแลกเปลี่ยนแบบนิรนาม ไม่มีการจัดเก็บข้อมูลส่วนตัว',
      'Certified Peer Listener — นัดหมายพูดคุย 1:1 กับเพื่อนที่ผ่านการอบรมด้านการรับฟังอย่างเข้าอกเข้าใจ',
      'AI Mood Journal — บันทึกอารมณ์พร้อมกราฟวิเคราะห์แนวโน้มสุขภาพจิตรายสัปดาห์',
      'Hotline Crisis Directory — รวมเบอร์สายด่วนและช่องทางช่วยเหลือวิกฤตตลอด 24 ชั่วโมง',
    ],
    team: [
      { name: 'Ploypailin J.', role: 'Founder & Psychology Lead', avatar: 'P' },
      { name: 'Krit T.', role: 'Security & Fullstack Engineer', avatar: 'K' },
    ],
    liveUrl: 'https://mindspace-safezone.org',
    githubUrl: 'https://github.com/ploypailin-j/mindspace',
    comments: [
      { author: 'Anonymous_User', time: '3 วันที่แล้ว', text: 'เป็นพื้นที่ที่ช่วยให้รู้สึกว่าไม่ได้สู้ปัญหาอยู่คนเดียวจริงๆ ขอบคุณผู้พัฒนาครับ' },
    ],
  },
]

// ─── Local Storage State for Upvotes ───
const UPVOTE_STORAGE_KEY = 'showkong_user_upvotes'
function getStoredUpvotes() {
  try {
    return JSON.parse(localStorage.getItem(UPVOTE_STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}
function saveStoredUpvotes(state) {
  try {
    localStorage.setItem(UPVOTE_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage issues
  }
}

let userUpvotes = getStoredUpvotes()

// ─── DOM References ───
const projectsContainer = document.querySelector('#projectsContainer')
const emptyState = document.querySelector('#emptyState')
const searchInput = document.querySelector('#showcaseSearch')
const sortBySelect = document.querySelector('#sortBy')
const categoryTabs = document.querySelector('#categoryTabs')
const tagFilters = document.querySelector('#tagFilters')
const clearFiltersBtn = document.querySelector('#clearFiltersBtn')
const resetSearchBtn = document.querySelector('#resetSearchBtn')
const projectCountText = document.querySelector('#projectCountText')

// Modal elements
const projectDetailModal = document.querySelector('#projectDetailModal')
const closeDetailModal = document.querySelector('#closeDetailModal')
const modalBanner = document.querySelector('#modalBanner')
const modalBadge = document.querySelector('#modalBadge')
const modalTitle = document.querySelector('#modalTitle')
const modalCreator = document.querySelector('#modalCreator')
const modalLiveBtn = document.querySelector('#modalLiveBtn')
const modalGithubBtn = document.querySelector('#modalGithubBtn')
const modalUpvoteBtn = document.querySelector('#modalUpvoteBtn')
const modalUpvoteCount = document.querySelector('#modalUpvoteCount')
const modalShareBtn = document.querySelector('#modalShareBtn')
const modalStory = document.querySelector('#modalStory')
const modalFeatures = document.querySelector('#modalFeatures')
const modalTechStack = document.querySelector('#modalTechStack')
const modalTeam = document.querySelector('#modalTeam')
const modalCommentsList = document.querySelector('#modalCommentsList')
const commentCount = document.querySelector('#commentCount')
const commentForm = document.querySelector('#commentForm')
const commentInput = document.querySelector('#commentInput')

// Toast element
const toastNotification = document.querySelector('#toastNotification')
const toastMessage = document.querySelector('#toastMessage')

// Active state filters
let activeCategory = 'ทั้งหมด'
let activeTag = null
let activeSearchQuery = ''
let currentSelectedProject = null

// ─── Rendering Helpers ───

function getProjectUpvoteCount(project) {
  const isVoted = Boolean(userUpvotes[project.id])
  return isVoted ? project.upvotes + 1 : project.upvotes
}

function renderProjects() {
  const query = activeSearchQuery.trim().toLowerCase()
  const sortBy = sortBySelect?.value || 'upvotes'

  // Filter
  const filtered = projectsData.filter((p) => {
    // Category filter
    if (activeCategory === 'กำลังมาแรง' && !p.isTrending) return false
    if (activeCategory === 'ผลงานรางวัล' && !p.isAward) return false
    if (activeCategory !== 'ทั้งหมด' && activeCategory !== 'กำลังมาแรง' && activeCategory !== 'ผลงานรางวัล') {
      if (p.category !== activeCategory) return false
    }

    // Tag filter
    if (activeTag && !p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())) {
      return false
    }

    // Search query
    if (query) {
      const matchTitle = p.title.toLowerCase().includes(query)
      const matchDesc = p.shortDesc.toLowerCase().includes(query)
      const matchCreator = p.creator.name.toLowerCase().includes(query) || p.creator.uni.toLowerCase().includes(query)
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(query))
      const matchStory = p.story.toLowerCase().includes(query)
      if (!matchTitle && !matchDesc && !matchCreator && !matchTags && !matchStory) {
        return false
      }
    }

    return true
  })

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'upvotes') {
      return getProjectUpvoteCount(b) - getProjectUpvoteCount(a)
    }
    if (sortBy === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if (sortBy === 'views') {
      return b.views - a.views
    }
    return 0
  })

  // Update count text
  if (projectCountText) {
    projectCountText.textContent = `กำลังแสดง ${filtered.length} ผลงาน`
  }

  // Handle empty state
  if (filtered.length === 0) {
    projectsContainer.innerHTML = ''
    emptyState.classList.remove('hidden')
    emptyState.classList.add('flex')
    return
  }

  emptyState.classList.add('hidden')
  emptyState.classList.remove('flex')

  // Render cards
  projectsContainer.innerHTML = filtered.map((project) => createProjectCardHtml(project)).join('')

  // Attach card event listeners
  attachCardEvents()
}

function createProjectCardHtml(project) {
  const isUpvoted = Boolean(userUpvotes[project.id])
  const currentCount = getProjectUpvoteCount(project)

  return `
    <article 
      class="group flex flex-col bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-[0_4px_20px_rgba(27,21,57,0.04)] hover:shadow-[0_16px_36px_rgba(27,21,57,0.12)] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      data-project-id="${project.id}"
    >
      <!-- Card Banner / Preview -->
      <div class="relative h-44 bg-gradient-to-br ${project.bannerGradient} p-5 flex flex-col justify-between overflow-hidden">
        <div class="flex items-start justify-between gap-2 z-10">
          <span class="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${project.badgeClass}">
            ${project.badge}
          </span>
          <span class="inline-flex items-center gap-1 text-[11px] font-medium text-white/80 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full">
            <svg class="w-3 h-3 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>
            ${project.views.toLocaleString()}
          </span>
        </div>

        <div class="z-10">
          <span class="text-xs font-semibold uppercase tracking-wider text-white/70 block mb-1">${project.category}</span>
          <h3 class="text-base font-bold text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-white">
            ${project.title}
          </h3>
        </div>

        <!-- Subtle ambient radial pattern inside banner -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
        <div class="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-300"></div>
      </div>

      <!-- Card Body -->
      <div class="flex-1 p-5 flex flex-col justify-between gap-4">
        <div>
          <!-- Creator Info -->
          <div class="flex items-center gap-2.5 mb-3">
            <span class="w-8 h-8 rounded-full ${project.creator.avatarBg} text-white font-bold text-xs grid place-items-center shrink-0 shadow-sm">
              ${project.creator.initial}
            </span>
            <div class="min-w-0">
              <span class="block text-xs font-bold text-[var(--text)] truncate">${project.creator.name}</span>
              <span class="block text-[11px] text-gray-400 truncate">${project.creator.faculty} · ${project.creator.uni}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
            ${project.shortDesc}
          </p>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            ${project.tags
              .map(
                (tag) => `
              <span class="px-2 py-0.5 rounded-md bg-[#f3f1fd] text-[#6d5dfb] text-[11px] font-medium">
                #${tag}
              </span>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Card Footer -->
        <div class="pt-3.5 border-t border-gray-100 flex items-center justify-between gap-2">
          <!-- Upvote Button -->
          <button 
            type="button" 
            class="js-upvote-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              isUpvoted
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600'
            }"
            data-id="${project.id}"
            title="กดโหวตให้ผลงานนี้"
          >
            <span class="transition-transform duration-200 ${isUpvoted ? 'scale-110' : ''}">${isUpvoted ? '❤️' : '🤍'}</span>
            <span>${currentCount}</span>
          </button>

          <!-- Action buttons -->
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              class="js-open-detail text-xs font-bold text-[#6d5dfb] hover:text-[#5b4be0] px-2.5 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
              data-id="${project.id}"
            >
              ดูเรื่องราว →
            </button>
          </div>
        </div>
      </div>
    </article>
  `
}

function attachCardEvents() {
  // Upvote button handler
  document.querySelectorAll('.js-upvote-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const projectId = btn.getAttribute('data-id')
      toggleUpvote(projectId)
    })
  })

  // Open detail on card click
  document.querySelectorAll('[data-project-id]').forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id')
      const project = projectsData.find((p) => p.id === projectId)
      if (project) openDetailModal(project)
    })
  })

  // Open detail on "ดูเรื่องราว" button
  document.querySelectorAll('.js-open-detail').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const projectId = btn.getAttribute('data-id')
      const project = projectsData.find((p) => p.id === projectId)
      if (project) openDetailModal(project)
    })
  })
}

// ─── Upvoting Logic ───
function toggleUpvote(projectId) {
  const isUpvoted = Boolean(userUpvotes[projectId])
  if (isUpvoted) {
    delete userUpvotes[projectId]
  } else {
    userUpvotes[projectId] = true
    showToast('ขอบคุณที่ร่วมโหวตสนับสนุนผลงานนี้! 🎉')
  }

  saveStoredUpvotes(userUpvotes)
  renderProjects()

  // Update modal upvote button if modal is currently open
  if (currentSelectedProject && currentSelectedProject.id === projectId) {
    updateModalUpvoteState(currentSelectedProject)
  }
}

function updateModalUpvoteState(project) {
  const isUpvoted = Boolean(userUpvotes[project.id])
  const count = getProjectUpvoteCount(project)
  modalUpvoteCount.textContent = count

  if (isUpvoted) {
    modalUpvoteBtn.className =
      'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs transition-all shadow-sm'
    modalUpvoteBtn.querySelector('.heart-icon').textContent = '❤️'
  } else {
    modalUpvoteBtn.className =
      'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6d5dfb] font-bold text-xs transition-all'
    modalUpvoteBtn.querySelector('.heart-icon').textContent = '🤍'
  }
}

// ─── Detail Modal Logic ───
function openDetailModal(project) {
  currentSelectedProject = project

  // Set banner & badge
  modalBanner.className = `relative h-48 sm:h-56 p-6 flex flex-col justify-between text-white bg-gradient-to-br ${project.bannerGradient}`
  modalBadge.textContent = project.badge
  modalBadge.className = `px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md ${project.badgeClass}`
  modalTitle.textContent = project.title
  modalCreator.textContent = `สร้างโดย ${project.creator.name} · ${project.creator.faculty} · ${project.creator.uni}`

  // Links
  modalLiveBtn.href = project.liveUrl
  modalGithubBtn.href = project.githubUrl

  // Upvote state
  updateModalUpvoteState(project)

  // Story & Problem
  modalStory.textContent = project.story

  // Features list
  modalFeatures.innerHTML = project.features
    .map(
      (feat) => `
      <li class="flex items-start gap-2.5">
        <span class="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center text-xs font-bold shrink-0 mt-0.5">✓</span>
        <span>${feat}</span>
      </li>
    `,
    )
    .join('')

  // Tech stack pills
  modalTechStack.innerHTML = project.tags
    .map(
      (tag) => `
      <span class="px-3 py-1 rounded-lg bg-[#f3f1fd] text-[#6d5dfb] text-xs font-semibold">
        #${tag}
      </span>
    `,
    )
    .join('')

  // Team list
  modalTeam.innerHTML = project.team
    .map(
      (member) => `
      <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <span class="w-9 h-9 rounded-full bg-[#6d5dfb] text-white font-bold text-xs grid place-items-center shrink-0">
          ${member.avatar}
        </span>
        <div class="min-w-0">
          <span class="block text-xs font-bold text-gray-900 truncate">${member.name}</span>
          <span class="block text-[11px] text-gray-500 truncate">${member.role}</span>
        </div>
      </div>
    `,
    )
    .join('')

  // Comments
  renderCommentsList(project)

  // Show modal
  projectDetailModal.hidden = false
  document.body.style.overflow = 'hidden'
}

function renderCommentsList(project) {
  commentCount.textContent = `${project.comments.length} ความคิดเห็น`
  modalCommentsList.innerHTML = project.comments
    .map(
      (c) => `
      <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-gray-900">${c.author}</span>
          <span class="text-gray-400 text-[10px]">${c.time}</span>
        </div>
        <p class="text-gray-600 leading-relaxed">${c.text}</p>
      </div>
    `,
    )
    .join('')
}

function closeDetailModalDialog() {
  projectDetailModal.hidden = true
  document.body.style.overflow = ''
  currentSelectedProject = null
}

// ─── Toast System ───
let toastTimeout = null
function showToast(msg) {
  if (toastTimeout) clearTimeout(toastTimeout)
  toastMessage.textContent = msg
  toastNotification.classList.remove('translate-y-16', 'opacity-0')
  toastNotification.classList.add('translate-y-0', 'opacity-100')

  toastTimeout = setTimeout(() => {
    toastNotification.classList.remove('translate-y-0', 'opacity-100')
    toastNotification.classList.add('translate-y-16', 'opacity-0')
  }, 2600)
}

// ─── Event Listeners Setup ───

// Search input
searchInput?.addEventListener('input', (e) => {
  activeSearchQuery = e.target.value
  renderProjects()
})

// Sort By
sortBySelect?.addEventListener('change', () => {
  renderProjects()
})

// Category tabs
categoryTabs?.querySelectorAll('[data-category]').forEach((tab) => {
  tab.addEventListener('click', () => {
    categoryTabs.querySelectorAll('[data-category]').forEach((t) => t.classList.remove('is-active'))
    tab.classList.add('is-active')
    activeCategory = tab.getAttribute('data-category')
    renderProjects()
  })
})

// Tag chips
tagFilters?.querySelectorAll('.tag-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const tag = chip.getAttribute('data-tag')
    if (activeTag === tag) {
      activeTag = null
      chip.classList.remove('bg-[#6d5dfb]', 'text-white', 'border-[#6d5dfb]')
      chip.classList.add('bg-white', 'text-gray-600')
      clearFiltersBtn?.classList.add('hidden')
    } else {
      tagFilters.querySelectorAll('.tag-chip').forEach((c) => {
        c.classList.remove('bg-[#6d5dfb]', 'text-white', 'border-[#6d5dfb]')
        c.classList.add('bg-white', 'text-gray-600')
      })
      activeTag = tag
      chip.classList.remove('bg-white', 'text-gray-600')
      chip.classList.add('bg-[#6d5dfb]', 'text-white', 'border-[#6d5dfb]')
      clearFiltersBtn?.classList.remove('hidden')
    }
    renderProjects()
  })
})

// Clear filters button
clearFiltersBtn?.addEventListener('click', () => {
  activeTag = null
  tagFilters.querySelectorAll('.tag-chip').forEach((c) => {
    c.classList.remove('bg-[#6d5dfb]', 'text-white', 'border-[#6d5dfb]')
    c.classList.add('bg-white', 'text-gray-600')
  })
  clearFiltersBtn.classList.add('hidden')
  renderProjects()
})

// Reset search button from empty state
resetSearchBtn?.addEventListener('click', () => {
  activeSearchQuery = ''
  if (searchInput) searchInput.value = ''
  activeCategory = 'ทั้งหมด'
  categoryTabs?.querySelectorAll('[data-category]').forEach((t) => {
    if (t.getAttribute('data-category') === 'ทั้งหมด') t.classList.add('is-active')
    else t.classList.remove('is-active')
  })
  activeTag = null
  clearFiltersBtn?.classList.add('hidden')
  tagFilters?.querySelectorAll('.tag-chip').forEach((c) => {
    c.classList.remove('bg-[#6d5dfb]', 'text-white', 'border-[#6d5dfb]')
    c.classList.add('bg-white', 'text-gray-600')
  })
  renderProjects()
})

// Modal close
closeDetailModal?.addEventListener('click', closeDetailModalDialog)

projectDetailModal?.addEventListener('click', (e) => {
  if (e.target === projectDetailModal) {
    closeDetailModalDialog()
  }
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !projectDetailModal.hidden) {
    closeDetailModalDialog()
  }
})

// Modal Upvote
modalUpvoteBtn?.addEventListener('click', () => {
  if (currentSelectedProject) {
    toggleUpvote(currentSelectedProject.id)
  }
})

// Modal Share Link
modalShareBtn?.addEventListener('click', async () => {
  if (currentSelectedProject) {
    const url = `${window.location.origin}/pages/show-kong.html#${currentSelectedProject.id}`
    try {
      await navigator.clipboard.writeText(url)
      showToast('คัดลอกลิงก์ผลงานเรียบร้อยแล้ว! 📋')
    } catch {
      showToast('คัดลอกลิงก์: ' + url)
    }
  }
})

// Modal Comment Submit
commentForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = commentInput.value.trim()
  if (!text || !currentSelectedProject) return

  currentSelectedProject.comments.unshift({
    author: 'คุณ (Pluem)',
    time: 'เมื่อสักครู่',
    text: text,
  })

  commentInput.value = ''
  renderCommentsList(currentSelectedProject)
  showToast('ส่งความคิดเห็นเรียบร้อยแล้ว ✨')
})

// Check URL Hash on load (e.g. /pages/show-kong.html#safewalk-mfu)
function checkInitialHash() {
  const hash = window.location.hash.replace('#', '')
  if (hash) {
    const project = projectsData.find((p) => p.id === hash)
    if (project) {
      setTimeout(() => openDetailModal(project), 300)
    }
  }
}

// Initial render
renderProjects()
checkInitialHash()
