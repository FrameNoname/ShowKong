import { mountRefresh, toast, openDialog, readLocal, saveLocal } from '../components/refresh.js'
import { openJoinRequest } from '../components/join-request.js'
import { POSTS_KEY } from '../components/composer.js'
import './feed.css'

// Mount navbar and shell for feed page
mountRefresh('feed')

const ICONS = {
  heart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  comment: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
  share: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
  search: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  fire: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  users: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  dots: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>`,
  image: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
}

// Initial Mock Seed Posts
const SEED_POSTS = [
  {
    id: 'post-1',
    category: 'showcase',
    categoryLabel: 'โชว์ของ',
    author: {
      name: 'Krittin P.',
      meta: 'Tech Lead · 2 ชม. ที่แล้ว',
      initials: 'KP',
      color: 'violet'
    },
    image: '/projects/sheetquest.webp',
    title: 'SheetQuest — เรียนให้เหมือนเล่นเกม',
    link: 'showkong.dev/projects/sheetquest',
    description: 'เพิ่มระบบภารกิจรายสัปดาห์ และ Leaderboard ให้ผู้ใช้สามารถแข่งขันกับเพื่อนได้แล้ววันนี้ พร้อมระบบ Flashcard สรุปเนื้อหาสำคัญก่อนสอบ!',
    tags: ['#EdTech', '#Flutter', '#Gamification'],
    ctaText: 'ลองใช้ Prototype',
    ctaAction: 'prototype',
    projectName: 'SheetQuest',
    likes: 128,
    comments: 14,
    shares: 6,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773300000
  },
  {
    id: 'post-2',
    category: 'challenge',
    categoryLabel: 'สปอนเซอร์ชาเลนจ์',
    author: {
      name: 'Siam Innovation Group',
      meta: 'พาร์ทเนอร์อย่างเป็นทางการ · 3 ชม. ที่แล้ว',
      initials: 'SIG',
      color: 'coral'
    },
    title: 'ประกวดออกแบบระบบ Smart City เพื่อความปลอดภัยชุมชน',
    description: 'ขอเชิญชวนนิสิต นักศึกษา ทุกสถาบัน ร่วมส่งข้อเสนอและผลงานนวัตกรรมแก้ปัญหาความปลอดภัยสาธารณะด้วย AI & IoT ชิงเงินรางวัลและโอกาสร่วมงานจริงกับบริษัท',
    tags: ['#SmartCity', '#AI', '#Safety', '#IoT'],
    prize: {
      amount: '75,000 บาท',
      deadline: '⏳ หมดเขต 30 เม.ย. 2026',
      teams: '👥 สมัครแล้ว 18 ทีม'
    },
    ctaText: 'ดูรายละเอียดชาเลนจ์',
    ctaAction: 'challenge',
    likes: 89,
    comments: 7,
    shares: 24,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773296000
  },
  {
    id: 'post-3',
    category: 'showcase',
    categoryLabel: 'โชว์ของ',
    author: {
      name: 'Nut C.',
      meta: 'Tech Lead · 4 ชม. ที่แล้ว',
      initials: 'NC',
      color: 'blue'
    },
    image: '/projects/safewalk.webp',
    title: 'SafeWalk AI — กลับหออย่างมั่นใจ',
    link: 'showkong.dev/projects/safewalk',
    description: 'ระบบแนะนำเส้นทางเดินเท้าที่ปลอดภัยรอบมหาวิทยาลัยช่วงกลางคืน วิเคราะห์จากความสว่างของไฟทางและจุดเสี่ยง พร้อมระบบ Buddy Walk และปุ่ม SOS ฉุกเฉิน',
    tags: ['#AI', '#ComputerVision', '#IoT', '#Safety'],
    ctaText: 'ลองใช้ Prototype',
    ctaAction: 'prototype',
    projectName: 'SafeWalk',
    likes: 96,
    comments: 8,
    shares: 15,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773292000
  },
  {
    id: 'post-4',
    category: 'showcase',
    categoryLabel: 'โชว์ของ',
    author: {
      name: 'GreenIoT Lab',
      meta: 'นักศึกษา มจธ. · 5 ชม. ที่แล้ว',
      initials: 'GL',
      color: 'green'
    },
    image: '/projects/greenloop.webp',
    title: 'GreenLoop — แยกขยะให้มีรางวัล',
    link: 'showkong.dev/projects/greenloop',
    description: 'ถังขยะอัจฉริยะระบบ AI Vision คัดแยกขยะอัตโนมัติแม่นยำ 94% เชื่อมแต้ม GreenPoints สะสมแลกส่วนลดเครื่องดื่มในมหาวิทยาลัย ทดสอบใช้งานจริงแล้ว 3 จุด',
    tags: ['#IoT', '#Recycle', '#Sustainability', '#AI'],
    ctaText: 'ลองใช้ Prototype',
    ctaAction: 'prototype',
    projectName: 'GreenLoop',
    likes: 64,
    comments: 12,
    shares: 11,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773288000
  },
  {
    id: 'post-5',
    category: 'recruitment',
    categoryLabel: 'หาทีม',
    author: {
      name: 'Natthawat Dev',
      meta: 'SheetQuest Team · 6 ชม. ที่แล้ว',
      initials: 'ND',
      color: 'violet'
    },
    roleBox: {
      title: 'UX/UI Designer (Gamification Specialist)',
      desc: 'รับ 1 ตำแหน่ง · มีพื้นฐาน Figma เข้าใจ User Journey และชอบออกแบบระบบเควส Gamification มาร่วมลุยรอบ Final Hackathon 2026 ด้วยกัน!',
      projectContext: 'โปรเจกต์: SheetQuest (เข้ารอบ 10 ทีมสุดท้าย Hackathon 2026)',
      accent: 'violet',
      team: 'SheetQuest',
      role: 'UX/UI Designer'
    },
    tags: ['#Figma', '#UIUX', '#Gamification', '#Research'],
    likes: 45,
    comments: 6,
    shares: 8,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773284000
  },
  {
    id: 'post-6',
    category: 'challenge',
    categoryLabel: 'ชาเลนจ์',
    author: {
      name: 'BKK Smart Campus',
      meta: 'ผู้สนับสนุนโครงการ · 7 ชม. ที่แล้ว',
      initials: 'BSC',
      color: 'coral'
    },
    title: 'ประกวดไอเดีย Green Campus ลดคาร์บอนในมหาวิทยาลัย',
    description: 'สนับสนุนทุนตั้งต้นสำหรับทีมนิสิตนักศึกษาที่พัฒนาโปรเจกต์ประหยัดพลังงานหรือจัดการทรัพยากรอย่างยั่งยืน พร้อมพี่เลี้ยงจากผู้เชี่ยวชาญด้าน ESG',
    tags: ['#Sustainability', '#GreenEnergy', '#Campus', '#ESG'],
    prize: {
      amount: '15,000 บาท',
      deadline: '⏳ หมดเขต 15 พ.ค. 2026',
      teams: '👥 สมัครแล้ว 12 ทีม'
    },
    ctaText: 'ดูรายละเอียดชาเลนจ์',
    ctaAction: 'challenge',
    likes: 52,
    comments: 4,
    shares: 19,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773280000
  },
  {
    id: 'post-7',
    category: 'discussion',
    categoryLabel: 'แลกเปลี่ยน',
    author: {
      name: 'Pawarit B.',
      meta: 'Product Thinker · 8 ชม. ที่แล้ว',
      initials: 'PB',
      color: 'teal'
    },
    discussionText: 'ทุกคนคิดว่า UX ของแอปการศึกษา ควรเน้นที่ความสนุกแบบ Gamification หรือความเรียบง่ายโฟกัสที่เนื้อหามากกว่ากันครับ? 🤔 อยากฟังมุมมองของเพื่อนๆ ทั้งสาย Dev และสายออกแบบว่าอะไรช่วยให้ผู้ใช้งานเรียนได้ต่อเนื่องที่สุด',
    tags: ['#Discussion', '#EdTech', '#UXUI', '#Learning'],
    likes: 142,
    comments: 27,
    shares: 12,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773276000
  },
  {
    id: 'post-8',
    category: 'recruitment',
    categoryLabel: 'หาทีม',
    author: {
      name: 'Woranart App',
      meta: 'FinTrack Team · 10 ชม. ที่แล้ว',
      initials: 'WA',
      color: 'blue'
    },
    roleBox: {
      title: 'Frontend Developer (React / Tailwind)',
      desc: 'รับ 1 ตำแหน่ง · ช่วยสร้าง Dashboard บันทึกรายจ่ายนักศึกษา และเชื่อมโยง REST API กับ Supabase มีดีไซน์ Figma พร้อมเริ่มพัฒนาได้ทันที',
      projectContext: 'โปรเจกต์: FinTrack (วางแผนเปิดทดสอบ Beta สิ้นเดือนนี้)',
      accent: 'blue',
      team: 'FinTrack',
      role: 'Frontend Developer'
    },
    tags: ['#React', '#Tailwind', '#Vite', '#Frontend'],
    likes: 38,
    comments: 5,
    shares: 7,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773268000
  },
  {
    id: 'post-9',
    category: 'showcase',
    categoryLabel: 'โชว์ของ',
    author: {
      name: 'Thanaporn C.',
      meta: 'KMUTT Builder · 12 ชม. ที่แล้ว',
      initials: 'TC',
      color: 'blue'
    },
    image: '/projects/campusfix.webp',
    title: 'CampusFix — แจ้งปัญหาในมหาวิทยาลัยแบบเรียลไทม์',
    link: 'showkong.dev/projects/campusfix',
    description: 'ระบบแจ้งเรื่องร้องเรียนและปัญหาความชำรุดในมหาวิทยาลัย ติดตามสถานะได้แบบโปร่งใส พร้อมระบบ AI จัดหมวดหมู่อัตโนมัติและแจ้งเตือนผ่าน LINE Notify',
    tags: ['#MobileApp', '#React', '#LINEAPI', '#SmartCampus'],
    ctaText: 'ลองใช้ Prototype',
    ctaAction: 'prototype',
    projectName: 'CampusFix',
    likes: 74,
    comments: 9,
    shares: 14,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773260000
  },
  {
    id: 'post-10',
    category: 'recruitment',
    categoryLabel: 'หาทีม',
    author: {
      name: 'Pitcha Media',
      meta: 'StudyWithMe Team · 1 วันที่แล้ว',
      initials: 'PM',
      color: 'amber'
    },
    roleBox: {
      title: 'Content Creator & Community Lead',
      desc: 'รับ 1 ตำแหน่ง · ชอบทำวิดีโอสั้นลง TikTok / Reels สื่อสารเรื่องการอ่านหนังสือและชวนเพื่อนมาแชร์สรุปบทเรียนด้วยกันอย่างสร้างสรรค์',
      projectContext: 'โปรเจกต์: StudyWithMe คอมมูนิตี้อ่านหนังสือของเด็กมหาวิทยาลัย',
      accent: 'amber',
      team: 'StudyWithMe',
      role: 'Content Creator'
    },
    tags: ['#Content', '#TikTok', '#Community', '#Marketing'],
    likes: 41,
    comments: 3,
    shares: 10,
    isLiked: false,
    isBookmarked: false,
    timestamp: 1773210000
  }
]

// Trending Tags data
const TRENDING_TAGS = [
  { name: '#EdTech', count: 28 },
  { name: '#AI', count: 45 },
  { name: '#Gamification', count: 19 },
  { name: '#IoT', count: 14 },
  { name: '#SmartCity', count: 12 },
  { name: '#UIUX', count: 33 },
  { name: '#Sustainability', count: 16 }
]

// Suggested creators data
const CREATORS = [
  { name: 'Krittin P.', handle: '@krittin_p', role: 'SheetQuest Creator', initials: 'KP' },
  { name: 'Fahsai Design', handle: '@fahsai_ui', role: 'Product Designer', initials: 'FD' },
  { name: 'Nut C.', handle: '@nut_ai', role: 'AI & IoT Developer', initials: 'NC' },
  { name: 'Pitcha K.', handle: '@pitcha_media', role: 'Community Strategist', initials: 'PK' }
]

// Spotlight Carousel Featured Projects Data
const SPOTLIGHT_PROJECTS = [
  {
    id: 'spotlight-1',
    theme: 'theme-violet',
    pill: '✦ โปรเจกต์เด่นประจำสัปดาห์',
    title: 'SheetQuest — เรียนรู้ผ่านเควสสั้นทุกวัน',
    desc: 'เปลี่ยนบทเรียนและสไลด์เนื้อหาให้เป็นเควสสั้น 3-5 นาที พร้อมระบบ gamification สะสมแต้มและแข่งขันกับเพื่อนในคอมมูนิตี้',
    meta: 'ทีมพัฒนา: EdTech Innovators · ความคืบหน้า 80%',
    ctaText: 'ดูโปรเจกต์',
    ctaLink: '/pages/show-kong.html',
    floatBadges: [
      { pos: 'left', text: '⭐ เลเวล 5' },
      { pos: 'right', text: '🔥 สตรีค 7 วัน' }
    ],
    screenHeader: ['QUESTS TODAY', '+50 EXP'],
    screenItems: [
      { icon: '✓', type: 'checked', text: 'ทบทวน Quiz สถิติเบื้องต้น' },
      { icon: '⏱', type: 'ongoing', text: 'ตอบ Flashcard คำศัพท์ 5 ข้อ' },
      { icon: '★', type: 'star', text: 'ชวนเพื่อน 1 คนเข้ากลุ่มอ่าน' }
    ],
    feedback: {
      badge: '⚡ Fast Feedback',
      title: 'เปิดทดสอบ Beta แล้ววันนี้',
      text: 'ทดลองใช้ Prototype และร่วมตอบแบบสอบถาม รับ Badge พิเศษสำหรับผู้ทดสอบกลุ่มแรก'
    }
  },
  {
    id: 'spotlight-2',
    theme: 'theme-blue',
    pill: '✦ AI & Safety Innovation',
    title: 'SafeWalk AI — กลับหออย่างมั่นใจทุกค่ำคืน',
    desc: 'ระบบนำทางเส้นทางเดินเท้าปลอดภัยรอบมหาวิทยาลัย วิเคราะห์แสงไฟทางและจุดเสี่ยง พร้อมระบบ Buddy Walk และปุ่ม SOS ส่งพิกัดด่วน',
    meta: 'ทีมพัฒนา: SafeCampus Lab · ความคืบหน้า 75%',
    ctaText: 'ดูโปรเจกต์',
    ctaLink: '/pages/show-kong.html',
    floatBadges: [
      { pos: 'left', text: '🛡️ ปลอดภัย 98%' },
      { pos: 'right', text: '📍 พิกัดสด SOS' }
    ],
    screenHeader: ['LIVE SAFE ROUTE', 'LIGHT 94%'],
    screenItems: [
      { icon: '✓', type: 'checked', text: 'เส้นทางหน้าหอพักสว่าง ปลอดภัย' },
      { icon: '⚡', type: 'ongoing', text: 'จับคู่เดินกับเพื่อน Buddy Walk' },
      { icon: '★', type: 'star', text: 'แจ้งสถานะถึงหอพักเรียบร้อย' }
    ],
    feedback: {
      badge: '⚡ SafeRoute Testing',
      title: 'เปิดให้ทดลองเดินจริงรอบมหาวิทยาลัย',
      text: 'ร่วมทดสอบฟังก์ชัน SOS และส่งรายงานจุดไฟดับเพื่อรับ Safety Badge ประจำวิทยาเขต'
    }
  },
  {
    id: 'spotlight-3',
    theme: 'theme-green',
    pill: '✦ นวัตกรรมเพื่อสิ่งแวดล้อม',
    title: 'GreenLoop — แยกขยะให้มีรางวัลด้วย AI Vision',
    desc: 'ถังขยะอัจฉริยะคัดแยกขยะอัตโนมัติแม่นยำ 94% เชื่อมคะแนนสะสม GreenPoints แลกรับส่วนลดร้านค้าและเครื่องดื่มในมหาวิทยาลัย',
    meta: 'ทีมพัฒนา: GreenTech KMUTT · ความคืบหน้า 90%',
    ctaText: 'ดูโปรเจกต์',
    ctaLink: '/pages/show-kong.html',
    floatBadges: [
      { pos: 'left', text: '🌱 ลดคาร์บอน 12kg' },
      { pos: 'right', text: '🎁 +250 Points' }
    ],
    screenHeader: ['GREEN SCANNER', 'AUTO-AI'],
    screenItems: [
      { icon: '✓', type: 'checked', text: 'สแกนขวดพลาสติก PET สำเร็จ' },
      { icon: '♻️', type: 'ongoing', text: 'คัดแยกขยะรีไซเคิลถูกต้อง' },
      { icon: '★', type: 'star', text: 'รับแต้มส่วนลดร้านกาแฟ 10.-' }
    ],
    feedback: {
      badge: '⚡ Pilot Deployment',
      title: 'ทดลองใช้งานจริงแล้ว 3 จุดทั่วมหาวิทยาลัย',
      text: 'ร่วมแชร์สถิติการทิ้งขยะของคุณผ่านแอป เพื่อรับโบนัสแต้มสองเท่าประจำสัปดาห์'
    }
  },
  {
    id: 'spotlight-4',
    theme: 'theme-indigo',
    pill: '✦ Smart Campus Platform',
    title: 'CampusFix — แจ้งซ่อมและปัญหาพื้นที่แบบเรียลไทม์',
    desc: 'แพลตฟอร์มแจ้งปัญหาพื้นที่สาธารณะในมหาวิทยาลัย คัดแยกหมวดหมู่อัตโนมัติด้วย AI และติดตามความคืบหน้าโปร่งใสพร้อมแจ้งเตือน LINE',
    meta: 'ทีมพัฒนา: KMUTT Dev Club · ความคืบหน้า 85%',
    ctaText: 'ดูโปรเจกต์',
    ctaLink: '/pages/show-kong.html',
    floatBadges: [
      { pos: 'left', text: '⚡ ตอบกลับไว 15 นาที' },
      { pos: 'right', text: '📢 แจ้งผ่าน LINE' }
    ],
    screenHeader: ['CAMPUS TICKET', 'LIVE FEED'],
    screenItems: [
      { icon: '✓', type: 'checked', text: 'แจ้งปัญหาเครื่องปรับอากาศชำรุด' },
      { icon: '⏱', type: 'ongoing', text: 'เจ้าหน้าที่รับเรื่องและกำลังเข้าตรวจ' },
      { icon: '★', type: 'star', text: 'อัปเดตสถานะสำเร็จ พร้อมให้ดาว' }
    ],
    feedback: {
      badge: '⚡ Student Feedback',
      title: 'เปิดทดสอบระบบติดตามงานซ่อม',
      text: 'ร่วมเป็นกลุ่มแรกที่ทดลองแจ้งปัญหาและรับสรุป Timeline การดำเนินงานอย่างโปร่งใส'
    }
  }
]

// Load local user posts and combine with seed posts
function getCombinedPosts() {
  const localList = readLocal(POSTS_KEY, [])
  const formattedLocal = localList.map(item => {
    // Determine category mapping
    let cat = 'showcase'
    let catLabel = item.type || 'โชว์ของ'
    if (item.type === 'กำลังหาทีม' || item.type === 'หาทีม') {
      cat = 'recruitment'
      catLabel = 'หาทีม'
    } else if (item.type === 'แลกเปลี่ยน' || item.type === 'ขอ Feedback') {
      cat = 'discussion'
      catLabel = 'แลกเปลี่ยน'
    }

    const tagsArr = typeof item.tags === 'string' 
      ? item.tags.split(/[\s,]+/).filter(Boolean).map(t => t.startsWith('#') ? t : '#' + t)
      : (item.tags || ['#ShowKong'])

    const imageSrc = item.image || (Array.isArray(item.images) && item.images[0]?.data) || ''

    return {
      id: item.id,
      isLocal: true,
      category: cat,
      categoryLabel: catLabel,
      author: {
        name: 'Pluem (คุณ)',
        meta: 'Student Builder · เมื่อสักครู่',
        initials: 'P',
        color: 'violet'
      },
      image: imageSrc,
      title: item.title,
      link: item.demo || item.link || '',
      description: item.description || item.desc || '',
      discussionText: item.description,
      roleBox: cat === 'recruitment' ? {
        title: item.roleTitle || item.title || 'มองหาเพื่อนร่วมทีม',
        desc: item.description,
        projectContext: `โปรเจกต์: ${item.title}`,
        team: item.title,
        role: item.roleTitle || 'ทีมงาน'
      } : null,
      tags: tagsArr,
      ctaText: 'ลองใช้ Prototype',
      ctaAction: 'prototype',
      projectName: item.title,
      likes: item.likes || 0,
      comments: item.comments || 0,
      shares: item.shares || 0,
      isLiked: false,
      isBookmarked: false,
      timestamp: item.createdAt ? new Date(item.createdAt).getTime() : Date.now()
    }
  })

  return [...formattedLocal, ...SEED_POSTS]
}

// Current State
let currentFilter = 'ทั้งหมด'
let currentSearch = ''
let currentSort = 'latest'
let visibleCount = 7
let newlyCreatedId = null

// Main Render Function
function renderPage() {
  const main = document.getElementById('main-content') || document.querySelector('main')
  if (!main) return

  main.innerHTML = `
    <div class="feed-page-wrapper">
      <div class="feed-container">
        
        <!-- 1. Hero Spotlight Auto-Slide Carousel -->
        <section class="feed-hero-carousel-wrapper" aria-label="โปรเจกต์เด่นประจำสัปดาห์">
          <div class="feed-hero-carousel" id="feedHeroCarousel">
            <div class="feed-hero-track" id="feedHeroTrack">
              ${SPOTLIGHT_PROJECTS.map(proj => `
                <div class="feed-hero-slide">
                  <div class="feed-hero-card ${proj.theme}">
                    <div class="feed-hero-copy">
                      <div class="feed-hero-pill">
                        <span class="sparkle">✦</span>
                        <span>${escapeHtml(proj.pill)}</span>
                      </div>
                      <h2 class="feed-hero-title">${escapeHtml(proj.title)}</h2>
                      <p class="feed-hero-desc">${escapeHtml(proj.desc)}</p>
                      <div class="feed-hero-meta">${escapeHtml(proj.meta)}</div>
                      <a href="${proj.ctaLink}" class="feed-hero-cta">
                        <span>${escapeHtml(proj.ctaText)}</span>
                        <span>→</span>
                      </a>
                    </div>

                    <div class="feed-hero-visual">
                      <div class="feed-phone-mockup">
                        ${proj.floatBadges.map(b => `
                          <div class="feed-float-badge ${b.pos}">${b.text}</div>
                        `).join('')}
                        <div class="feed-phone-screen">
                          <div class="feed-phone-header">
                            <span>${proj.screenHeader[0]}</span>
                            <span>${proj.screenHeader[1]}</span>
                          </div>
                          ${proj.screenItems.map(item => `
                            <div class="feed-quest-item">
                              <span class="feed-quest-icon ${item.type}">${item.icon}</span>
                              <span>${escapeHtml(item.text)}</span>
                            </div>
                          `).join('')}
                        </div>
                      </div>

                      <div class="feed-feedback-card">
                        <span class="feed-feedback-badge">${escapeHtml(proj.feedback.badge)}</span>
                        <h4>${escapeHtml(proj.feedback.title)}</h4>
                        <p>${escapeHtml(proj.feedback.text)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Navigation Controls -->
            <button class="feed-carousel-arrow prev" id="feedHeroPrev" aria-label="โปรเจกต์ก่อนหน้า" type="button">‹</button>
            <button class="feed-carousel-arrow next" id="feedHeroNext" aria-label="โปรเจกต์ถัดไป" type="button">›</button>

            <!-- Indicators -->
            <div class="feed-carousel-dots" id="feedHeroDots" role="tablist">
              ${SPOTLIGHT_PROJECTS.map((_, i) => `
                <button class="feed-carousel-dot ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-label="ดูสไลด์ที่ ${i + 1}" aria-current="${i === 0 ? 'true' : 'false'}" type="button"></button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 2. Search, Filter Chips & Sort Controls -->
        <section class="feed-toolbar-panel" aria-label="เครื่องมือค้นหาและตัวกรองฟีด">
          <div class="feed-toolbar-top">
            <div class="feed-search-box">
              ${ICONS.search}
              <input type="search" id="feedSearchInput" class="feed-search-input" placeholder="ค้นหาโปรเจกต์ ปัญหา หรือผู้ใช้..." value="${escapeHtml(currentSearch)}">
            </div>
            <select id="feedSortSelect" class="feed-sort-select" aria-label="เรียงลำดับฟีด">
              <option value="latest" ${currentSort === 'latest' ? 'selected' : ''}>เรียงตาม: ล่าสุด</option>
              <option value="popular" ${currentSort === 'popular' ? 'selected' : ''}>ผู้สนใจมากที่สุด</option>
              <option value="likes" ${currentSort === 'likes' ? 'selected' : ''}>ถูกใจมากที่สุด</option>
            </select>
          </div>

          <div class="feed-filter-chips" role="tablist">
            ${['ทั้งหมด', 'โชว์ของ', 'หาทีม', 'ชาเลนจ์', 'แลกเปลี่ยน', '#EdTech', '#AI', '#IoT']
              .map(chip => `
                <button class="feed-chip ${currentFilter === chip ? 'is-active' : ''}" data-filter="${chip}" type="button">
                  ${chip}
                </button>
              `).join('')}
          </div>
        </section>

        <!-- 3. Feed Layout: Stream + Sidebar -->
        <div class="feed-layout">
          <!-- Left Stream Column -->
          <div class="feed-stream">
            
            <!-- Feed Inline Composer Box (Feed Specific Posting) -->
            <div class="feed-composer-card" id="feedComposerCard">
              <div class="feed-composer-trigger-row">
                <div class="feed-avatar violet">P</div>
                <button class="feed-composer-trigger-btn" id="openFeedComposerBtn" type="button">
                  คุณกำลังสร้างอะไรอยู่? แบ่งปันไอเดีย หรืออัปเดตความคืบหน้า...
                </button>
              </div>
              <div class="feed-composer-quick-actions">
                <button class="feed-quick-action js-quick-post-btn" data-type="โชว์ของ" type="button">
                  <span class="quick-icon">🚀</span>
                  <span>โชว์ของ</span>
                </button>
                <button class="feed-quick-action js-quick-post-btn" data-type="กำลังหาทีม" type="button">
                  <span class="quick-icon">👥</span>
                  <span>หาเพื่อนร่วมทีม</span>
                </button>
                <button class="feed-quick-action js-quick-post-btn" data-type="แลกเปลี่ยน" type="button">
                  <span class="quick-icon">💬</span>
                  <span>ชวนคุย / สอบถาม</span>
                </button>
                <button class="feed-quick-action js-quick-post-btn" data-type="ความคืบหน้า" type="button">
                  <span class="quick-icon">📢</span>
                  <span>อัปเดตงาน</span>
                </button>
              </div>
            </div>

            <!-- Post Stream Items Container -->
            <main id="feedPostStream">
              ${renderPostList()}
            </main>

          </div>

          <!-- Right Sidebar Column -->
          <aside class="feed-sidebar" aria-label="แถบข้างข้อมูลแนะนำ">
            
            <!-- Widget 1: Trending Tags -->
            <div class="feed-widget">
              <div class="feed-widget-header">
                ${ICONS.fire}
                <span>แท็กยอดนิยม</span>
              </div>
              <div class="feed-trending-tags">
                ${TRENDING_TAGS.map(t => `
                  <button class="feed-trending-tag-item" data-tag="${t.name}" type="button">
                    <span>${t.name}</span>
                    <small>(${t.count})</small>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Widget 2: Spotlight Recruitment -->
            <div class="feed-widget feed-spotlight-widget">
              <div class="feed-spotlight-badge">🔥 เปิดรับสมัครด่วน</div>
              <div class="feed-spotlight-project">GreenLoop — ถังขยะ AI</div>
              <div class="feed-spotlight-role">UX/UI Designer · 1 ตำแหน่ง</div>
              <p class="feed-spotlight-desc">ร่วมลุยสร้างนวัตกรรมแยกขยะเพื่อสิ่งแวดล้อม พร้อมส่งผลงานเข้าประกวด Hackathon ระดับประเทศ มีพี่เลี้ยงคอยดูแล</p>
              <button class="feed-spotlight-btn js-quick-join" data-team="GreenLoop" data-role="UX/UI Designer" type="button">
                สมัครเข้าร่วมทีม →
              </button>
            </div>

            <!-- Widget 3: Suggested Builders -->
            <div class="feed-widget">
              <div class="feed-widget-header">
                ${ICONS.users}
                <span>ผู้สร้างแนะนำ</span>
              </div>
              <div class="feed-creator-list">
                ${CREATORS.map(c => `
                  <div class="feed-creator-item">
                    <div class="feed-creator-avatar" style="background: linear-gradient(135deg, #7c3aed, #9333ea);">
                      ${c.initials}
                    </div>
                    <div class="feed-creator-info">
                      <div class="feed-creator-name">${c.name}</div>
                      <div class="feed-creator-bio">${c.role}</div>
                    </div>
                    <button class="feed-follow-btn js-follow-btn" type="button">ติดตาม</button>
                  </div>
                `).join('')}
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  `

  bindEventListeners()
  interceptNavbarPost()
  initSpotlightCarousel()
}

let currentSpotlightIndex = 0
let spotlightInterval = null

function initSpotlightCarousel() {
  const track = document.getElementById('feedHeroTrack')
  const dotsContainer = document.getElementById('feedHeroDots')
  const prevBtn = document.getElementById('feedHeroPrev')
  const nextBtn = document.getElementById('feedHeroNext')
  const carousel = document.getElementById('feedHeroCarousel')

  if (!track || !carousel || !dotsContainer) return

  const totalSlides = SPOTLIGHT_PROJECTS.length

  function goToSlide(index) {
    currentSpotlightIndex = (index + totalSlides) % totalSlides
    track.style.transform = `translateX(-${currentSpotlightIndex * 100}%)`
    dotsContainer.querySelectorAll('.feed-carousel-dot').forEach((d, i) => {
      const isActive = i === currentSpotlightIndex
      d.classList.toggle('is-active', isActive)
      d.setAttribute('aria-current', isActive ? 'true' : 'false')
    })
  }

  function startAutoSlide() {
    stopAutoSlide()
    spotlightInterval = setInterval(() => {
      goToSlide(currentSpotlightIndex + 1)
    }, 4500)
  }

  function stopAutoSlide() {
    if (spotlightInterval) {
      clearInterval(spotlightInterval)
      spotlightInterval = null
    }
  }

  prevBtn?.addEventListener('click', () => {
    goToSlide(currentSpotlightIndex - 1)
    startAutoSlide()
  })

  nextBtn?.addEventListener('click', () => {
    goToSlide(currentSpotlightIndex + 1)
    startAutoSlide()
  })

  dotsContainer.addEventListener('click', e => {
    const dot = e.target.closest('.feed-carousel-dot')
    if (dot) {
      const idx = Number(dot.dataset.index)
      goToSlide(idx)
      startAutoSlide()
    }
  })

  // Pause on hover so reading isn't disrupted
  carousel.addEventListener('mouseenter', stopAutoSlide)
  carousel.addEventListener('mouseleave', startAutoSlide)

  // Touch / swipe support for mobile
  let touchStartX = 0
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX
    stopAutoSlide()
  }, { passive: true })

  carousel.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX
    if (touchStartX - touchEndX > 45) {
      goToSlide(currentSpotlightIndex + 1)
    } else if (touchEndX - touchStartX > 45) {
      goToSlide(currentSpotlightIndex - 1)
    }
    startAutoSlide()
  }, { passive: true })

  startAutoSlide()
}

// Render the list of posts based on current filters and sort
function renderPostList() {
  let list = getCombinedPosts()

  // Filter by search
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase()
    list = list.filter(p => 
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.author?.name.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q)) ||
      p.roleBox?.title?.toLowerCase().includes(q) ||
      p.discussionText?.toLowerCase().includes(q)
    )
  }

  // Filter by category or tag
  if (currentFilter !== 'ทั้งหมด') {
    if (currentFilter.startsWith('#')) {
      list = list.filter(p => p.tags?.includes(currentFilter))
    } else {
      list = list.filter(p => p.categoryLabel === currentFilter)
    }
  }

  // Sort
  if (currentSort === 'likes') {
    list.sort((a, b) => b.likes - a.likes)
  } else if (currentSort === 'popular') {
    list.sort((a, b) => (b.comments + b.shares + b.likes) - (a.comments + a.shares + a.likes))
  } else {
    list.sort((a, b) => b.timestamp - a.timestamp)
  }

  if (list.length === 0) {
    return `
      <div class="feed-empty-state">
        <h3>ไม่พบโพสต์ที่ตรงกับเงื่อนไข</h3>
        <p>ลองค้นหาด้วยคำอื่น หรือเลือกแท็กหมวดหมู่อื่นดูสิ</p>
      </div>
    `
  }

  const visibleList = list.slice(0, visibleCount)

  const itemsHtml = visibleList.map(post => {
    const isNew = post.id === newlyCreatedId
    const highlightClass = isNew ? ' feed-new-post-highlight' : ''

    // 1. Showcase post with media
    if (post.category === 'showcase') {
      return `
        <article class="feed-card${highlightClass}" id="${post.id}" data-id="${post.id}">
          <div class="feed-post-header">
            <div class="feed-avatar ${post.author.color || 'violet'}">${post.author.initials}</div>
            <div class="feed-author-info">
              <div class="feed-author-name">${escapeHtml(post.author.name)}</div>
              <div class="feed-author-meta">${escapeHtml(post.author.meta)}</div>
            </div>
            <span class="feed-badge showcase">${escapeHtml(post.categoryLabel)}</span>
            ${post.isLocal ? `
              <button class="feed-more-btn js-delete-local-post" data-id="${post.id}" title="ลบโพสต์ของคุณ" type="button">
                🗑️
              </button>
            ` : `
              <button class="feed-more-btn" aria-label="เพิ่มเติม" type="button">${ICONS.dots}</button>
            `}
          </div>

          ${post.image ? `
            <div class="feed-post-media">
              <img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy">
            </div>
          ` : ''}

          <h3 class="feed-post-title">${escapeHtml(post.title)}</h3>
          ${post.link ? `<a href="${post.link.startsWith('http') ? post.link : 'https://' + post.link}" target="_blank" rel="noopener" class="feed-post-link">${escapeHtml(post.link)}</a>` : ''}
          <p class="feed-post-desc">${escapeHtml(post.description)}</p>

          <div class="feed-post-tags">
            ${post.tags.map(t => `<span class="feed-tag js-tag-click" data-tag="${t}">${t}</span>`).join('')}
          </div>

          <div style="margin: 12px 0 8px;">
            <button class="feed-primary-btn js-prototype-btn" data-project="${post.projectName || post.title}" type="button">
              <span>${post.ctaText || 'ลองใช้ Prototype'}</span>
            </button>
          </div>

          ${renderPostFooter(post)}
        </article>
      `
    }

    // 2. Sponsored Challenge post
    if (post.category === 'challenge') {
      return `
        <article class="feed-card${highlightClass}" id="${post.id}" data-id="${post.id}">
          <div class="feed-post-header">
            <div class="feed-avatar ${post.author.color || 'coral'}">${post.author.initials}</div>
            <div class="feed-author-info">
              <div class="feed-author-name">${escapeHtml(post.author.name)}</div>
              <div class="feed-author-meta">${escapeHtml(post.author.meta)}</div>
            </div>
            <span class="feed-badge challenge">${escapeHtml(post.categoryLabel)}</span>
            <button class="feed-more-btn" aria-label="เพิ่มเติม" type="button">${ICONS.dots}</button>
          </div>

          <h3 class="feed-post-title">${escapeHtml(post.title)}</h3>
          <p class="feed-post-desc">${escapeHtml(post.description)}</p>

          <div class="feed-post-tags">
            ${post.tags.map(t => `<span class="feed-tag js-tag-click" data-tag="${t}">${t}</span>`).join('')}
          </div>

          <div class="feed-prize-box">
            <div class="feed-prize-label">เงินรางวัลรวม</div>
            <div class="feed-prize-amount">${escapeHtml(post.prize.amount)}</div>
            <div class="feed-prize-meta">
              <span>${escapeHtml(post.prize.deadline)}</span>
              <span>${escapeHtml(post.prize.teams)}</span>
            </div>
            <a href="/pages/sponsored-challenge.html" class="feed-challenge-btn" style="margin-top: 14px;">
              ${escapeHtml(post.ctaText)}
            </a>
          </div>

          ${renderPostFooter(post)}
        </article>
      `
    }

    // 3. Team Recruitment post
    if (post.category === 'recruitment') {
      const box = post.roleBox || {
        title: post.title,
        desc: post.description,
        projectContext: `โปรเจกต์: ${post.title}`,
        team: post.title,
        role: 'ทีมงาน'
      }
      return `
        <article class="feed-card${highlightClass}" id="${post.id}" data-id="${post.id}">
          <div class="feed-post-header">
            <div class="feed-avatar ${post.author.color || 'violet'}">${post.author.initials}</div>
            <div class="feed-author-info">
              <div class="feed-author-name">${escapeHtml(post.author.name)}</div>
              <div class="feed-author-meta">${escapeHtml(post.author.meta)}</div>
            </div>
            <span class="feed-badge recruitment">${escapeHtml(post.categoryLabel)}</span>
            ${post.isLocal ? `
              <button class="feed-more-btn js-delete-local-post" data-id="${post.id}" title="ลบโพสต์ของคุณ" type="button">
                🗑️
              </button>
            ` : `
              <button class="feed-more-btn" aria-label="เพิ่มเติม" type="button">${ICONS.dots}</button>
            `}
          </div>

          <div class="feed-role-box ${box.accent || ''}">
            <div class="feed-role-title">${escapeHtml(box.title)}</div>
            <div class="feed-role-desc">${escapeHtml(box.desc)}</div>
            <div class="feed-post-tags" style="margin: 8px 0;">
              ${post.tags.map(t => `<span class="feed-tag js-tag-click" data-tag="${t}">${t}</span>`).join('')}
            </div>
            <div class="feed-project-context">${escapeHtml(box.projectContext)}</div>
            
            <div class="feed-role-actions">
              <a href="/pages/find-team.html" class="feed-btn-secondary">ดูรายละเอียด</a>
              <button class="feed-primary-btn js-join-btn" data-team="${escapeHtml(box.team || 'ShowKong')}" data-role="${escapeHtml(box.role || 'Contributor')}" type="button">
                ขอร่วมทีม
              </button>
            </div>
          </div>

          ${renderPostFooter(post)}
        </article>
      `
    }

    // 4. Community Discussion post
    if (post.category === 'discussion') {
      return `
        <article class="feed-card${highlightClass}" id="${post.id}" data-id="${post.id}">
          <div class="feed-post-header">
            <div class="feed-avatar ${post.author.color || 'teal'}">${post.author.initials}</div>
            <div class="feed-author-info">
              <div class="feed-author-name">${escapeHtml(post.author.name)}</div>
              <div class="feed-author-meta">${escapeHtml(post.author.meta)}</div>
            </div>
            <span class="feed-badge discussion">${escapeHtml(post.categoryLabel)}</span>
            ${post.isLocal ? `
              <button class="feed-more-btn js-delete-local-post" data-id="${post.id}" title="ลบโพสต์ของคุณ" type="button">
                🗑️
              </button>
            ` : `
              <button class="feed-more-btn" aria-label="เพิ่มเติม" type="button">${ICONS.dots}</button>
            `}
          </div>

          <div class="feed-discussion-box">
            ${escapeHtml(post.discussionText || post.description)}
          </div>

          <div class="feed-post-tags">
            ${post.tags.map(t => `<span class="feed-tag js-tag-click" data-tag="${t}">${t}</span>`).join('')}
          </div>

          ${renderPostFooter(post)}
        </article>
      `
    }

    return ''
  }).join('')

  const loadMoreHtml = list.length > visibleCount ? `
    <div class="feed-load-more-wrap">
      <button class="feed-load-more-btn" id="feedLoadMoreBtn" type="button">
        ดูเพิ่มเติม (${list.length - visibleCount} โพสต์)
      </button>
    </div>
  ` : ''

  return itemsHtml + loadMoreHtml
}

function renderPostFooter(post) {
  return `
    <div class="feed-post-footer">
      <div class="feed-footer-left">
        <button class="feed-action-btn js-like-btn ${post.isLiked ? 'liked' : ''}" data-id="${post.id}" type="button" aria-label="ถูกใจ">
          ${ICONS.heart}
          <span class="js-like-count">${post.likes}</span>
        </button>

        <button class="feed-action-btn js-comment-btn" data-id="${post.id}" type="button" aria-label="ความคิดเห็น">
          ${ICONS.comment}
          <span>${post.comments}</span>
        </button>

        <button class="feed-action-btn js-share-btn" data-title="${escapeHtml(post.title || post.author.name)}" type="button" aria-label="แชร์">
          ${ICONS.share}
          <span>แชร์</span>
        </button>
      </div>

      <button class="feed-action-btn js-bookmark-btn ${post.isBookmarked ? 'bookmarked' : ''}" data-id="${post.id}" type="button" aria-label="บันทึก">
        ${ICONS.bookmark}
      </button>
    </div>
  `
}

// Intercept Navbar "โพสต์" button to trigger feed-specific post modal
function interceptNavbarPost() {
  const navPostBtn = document.querySelector('.header-actions a[href="/pages/post.html"]') || document.querySelector('.header-actions .button-primary')
  if (navPostBtn) {
    navPostBtn.addEventListener('click', e => {
      e.preventDefault()
      openFeedComposerModal('โชว์ของ')
    })
  }
}

// Open Feed-Specific Post Composer Modal
export function openFeedComposerModal(initialType = 'โชว์ของ') {
  let activeType = initialType
  let attachedImageData = ''

  function getFieldsHtml(type) {
    if (type === 'โชว์ของ' || type === 'ความคืบหน้า') {
      return `
        <div class="feed-form-group">
          <label>ชื่อโปรเจกต์ หรือ ไฮไลท์ผลงาน *</label>
          <input type="text" name="title" required maxlength="160" class="feed-form-input" placeholder="เช่น FitMate — แอปแนะนำท่าออกกำลังกายด้วย AI">
        </div>
        <div class="feed-form-group">
          <label>เล่าสิ่งที่สร้าง หรือการอัปเดตใหม่ *</label>
          <textarea name="description" required maxlength="3000" rows="3" class="feed-form-textarea" placeholder="เล่าว่าโปรเจกต์นี้ทำอะไร มีฟีเจอร์เด่นอะไร หรือแก้ปัญหาอะไรให้นักศึกษา..."></textarea>
        </div>
        <div class="feed-form-group">
          <label>ลิงก์ Prototype หรือ เว็บไซต์ (ไม่บังคับ)</label>
          <input type="url" name="demo" class="feed-form-input" placeholder="https://">
        </div>
        <div class="feed-form-group">
          <label>รูปภาพประกอบผลงาน (ไม่บังคับ)</label>
          <div class="feed-upload-box" id="feedUploadBox">
            <input type="file" id="feedImageFile" accept="image/png,image/jpeg,image/webp" style="display: none;">
            <div>${ICONS.image}</div>
            <strong style="font-size: 13px; display: block; margin: 4px 0;">คลิกเพื่ออัปโหลดรูปภาพผลงาน</strong>
            <small style="color: #79738c; font-size: 11.5px;">รองรับ JPG, PNG, WebP ขนาดไม่เกิน 5MB</small>
          </div>
          <div class="feed-upload-preview" id="feedUploadPreview" hidden></div>
        </div>
      `
    }

    if (type === 'กำลังหาทีม') {
      return `
        <div class="feed-form-group">
          <label>ชื่อโปรเจกต์ของคุณ *</label>
          <input type="text" name="title" required maxlength="160" class="feed-form-input" placeholder="เช่น SafeCampus — แพลตฟอร์มแจ้งเหตุฉุกเฉิน">
        </div>
        <div class="feed-form-group">
          <label>ตำแหน่งที่เปิดรับสมัคร *</label>
          <input type="text" name="roleTitle" required maxlength="120" class="feed-form-input" placeholder="เช่น UX/UI Designer (Figma), Frontend Developer (React)">
        </div>
        <div class="feed-form-group">
          <label>รายละเอียดบทบาทและเป้าหมายของทีม *</label>
          <textarea name="description" required maxlength="3000" rows="3" class="feed-form-textarea" placeholder="บอกทักษะที่มองหา กำหนดการทำงาน หรือเป้าหมายในการส่งประกวด Hackathon..."></textarea>
        </div>
      `
    }

    if (type === 'แลกเปลี่ยน') {
      return `
        <div class="feed-form-group">
          <label>สิ่งที่คุณอยากชวนคุย หรือสอบถาม *</label>
          <textarea name="description" required maxlength="3000" rows="4" class="feed-form-textarea" placeholder="คุณกำลังคิดอะไรอยู่? แชร์คำถาม ไอเดีย หรือขอความคิดเห็นจากนักสร้างในชุมชน ShowKong..."></textarea>
        </div>
      `
    }

    return ''
  }

  const modalHtml = `
    <div class="feed-modal-user-header">
      <div class="feed-avatar violet" style="width: 44px; height: 44px; font-size: 15px;">P</div>
      <div class="feed-modal-user-info">
        <div class="feed-modal-user-name">Pluem (คุณ)</div>
        <div class="feed-modal-dest-badge">🌐 โพสต์ลงบน ShowKong Feed</div>
      </div>
    </div>

    <form id="feedModalForm">
      <div class="feed-type-selector" id="feedTypeSelector">
        <button type="button" class="feed-type-btn ${activeType === 'โชว์ของ' ? 'is-active' : ''}" data-type="โชว์ของ">🚀 โชว์ของ</button>
        <button type="button" class="feed-type-btn ${activeType === 'กำลังหาทีม' ? 'is-active' : ''}" data-type="กำลังหาทีม">👥 หาเพื่อนร่วมทีม</button>
        <button type="button" class="feed-type-btn ${activeType === 'แลกเปลี่ยน' ? 'is-active' : ''}" data-type="แลกเปลี่ยน">💬 แลกเปลี่ยน</button>
        <button type="button" class="feed-type-btn ${activeType === 'ความคืบหน้า' ? 'is-active' : ''}" data-type="ความคืบหน้า">📢 อัปเดตงาน</button>
      </div>

      <div id="feedModalFieldsContainer">
        ${getFieldsHtml(activeType)}
      </div>

      <div class="feed-form-group" style="margin-top: 14px;">
        <label>แท็กหัวข้อ / ทักษะ (คั่นด้วยวรรคหรือจุลภาค)</label>
        <input type="text" name="tags" class="feed-form-input" placeholder="เช่น #EdTech #AI #Flutter #UIUX">
      </div>

      <p class="form-error" id="feedModalError" role="alert" style="color: #ea580c; font-size: 13px; font-weight: 500; margin: 8px 0;" hidden></p>

      <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; border-top: 1px solid #f0edf8; padding-top: 16px;">
        <button type="button" class="button button-neutral" data-close-dialog>ยกเลิก</button>
        <button type="submit" class="button button-primary" id="feedSubmitPostBtn">โพสต์ลง Feed</button>
      </div>
    </form>
  `

  const dialog = openDialog('สร้างโพสต์บน Feed', modalHtml, 'feed-composer-modal')

  const form = dialog.querySelector('#feedModalForm')
  const fieldsContainer = dialog.querySelector('#feedModalFieldsContainer')
  const typeSelector = dialog.querySelector('#feedTypeSelector')
  const errorEl = dialog.querySelector('#feedModalError')

  function setupImageUpload() {
    const uploadBox = dialog.querySelector('#feedUploadBox')
    const fileInput = dialog.querySelector('#feedImageFile')
    const previewEl = dialog.querySelector('#feedUploadPreview')

    if (!uploadBox || !fileInput || !previewEl) return

    uploadBox.addEventListener('click', () => fileInput.click())

    fileInput.addEventListener('change', e => {
      const file = e.target.files?.[0]
      if (!file) return
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        errorEl.textContent = 'กรุณาเลือกไฟล์ PNG, JPG หรือ WebP'
        errorEl.hidden = false
        return
      }
      const reader = new FileReader()
      reader.onload = ev => {
        attachedImageData = ev.target.result
        previewEl.hidden = false
        previewEl.innerHTML = `
          <img src="${attachedImageData}" alt="Preview">
          <button type="button" class="feed-remove-img-btn" id="feedRemoveImgBtn" title="ลบรูป">✕</button>
        `
        uploadBox.style.display = 'none'

        previewEl.querySelector('#feedRemoveImgBtn')?.addEventListener('click', () => {
          attachedImageData = ''
          previewEl.hidden = true
          previewEl.innerHTML = ''
          uploadBox.style.display = 'block'
          fileInput.value = ''
        })
      }
      reader.readAsDataURL(file)
    })
  }

  setupImageUpload()

  // Type Selector Click
  typeSelector.addEventListener('click', e => {
    const btn = e.target.closest('.feed-type-btn')
    if (!btn) return
    activeType = btn.dataset.type
    typeSelector.querySelectorAll('.feed-type-btn').forEach(b => b.classList.remove('is-active'))
    btn.classList.add('is-active')
    fieldsContainer.innerHTML = getFieldsHtml(activeType)
    setupImageUpload()
  })

  // Form Submit
  form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form)
    const title = (formData.get('title') || '').trim()
    const description = (formData.get('description') || '').trim()
    const roleTitle = (formData.get('roleTitle') || '').trim()
    const demo = (formData.get('demo') || '').trim()
    const rawTags = (formData.get('tags') || '').trim()

    if (activeType !== 'แลกเปลี่ยน' && !title) {
      errorEl.textContent = 'กรุณากรอกชื่อโปรเจกต์หรือหัวข้อ'
      errorEl.hidden = false
      return
    }

    if (!description) {
      errorEl.textContent = 'กรุณากรอกรายละเอียดของโพสต์'
      errorEl.hidden = false
      return
    }

    const postObj = {
      id: 'local-' + Date.now(),
      type: activeType,
      title: title || 'แชร์แนวคิด & แลกเปลี่ยน',
      description,
      roleTitle,
      demo,
      tags: rawTags,
      image: attachedImageData,
      createdAt: new Date().toISOString()
    }

    const currentLocalPosts = readLocal(POSTS_KEY, [])
    const nextLocalPosts = [postObj, ...currentLocalPosts]
    saveLocal(POSTS_KEY, nextLocalPosts)

    newlyCreatedId = postObj.id
    refreshStream()

    dialog.close()
    toast('เผยแพร่โพสต์ลงบน Feed เรียบร้อยแล้ว! 🎉')

    // Smooth scroll to top of stream to highlight new post
    const streamEl = document.getElementById('feedPostStream')
    if (streamEl) {
      streamEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

function bindEventListeners() {
  const container = document.querySelector('.feed-page-wrapper')
  if (!container) return

  // Search input with debounce
  const searchInput = document.getElementById('feedSearchInput')
  if (searchInput) {
    let timer
    searchInput.addEventListener('input', e => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        currentSearch = e.target.value
        refreshStream()
      }, 250)
    })
  }

  // Sort dropdown
  const sortSelect = document.getElementById('feedSortSelect')
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      currentSort = e.target.value
      refreshStream()
    })
  }

  // Filter Chips
  container.querySelectorAll('.feed-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter
      container.querySelectorAll('.feed-chip').forEach(c => c.classList.remove('is-active'))
      btn.classList.add('is-active')
      refreshStream()
    })
  })

  // Trending Tag Click in Sidebar
  container.querySelectorAll('.feed-trending-tag-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag
      currentFilter = tag
      currentSearch = ''
      if (searchInput) searchInput.value = ''
      container.querySelectorAll('.feed-chip').forEach(c => {
        c.classList.toggle('is-active', c.dataset.filter === tag)
      })
      refreshStream()
      window.scrollTo({ top: 400, behavior: 'smooth' })
    })
  })

  // Composer Trigger and Quick Actions
  const openComposerBtn = document.getElementById('openFeedComposerBtn')
  if (openComposerBtn) {
    openComposerBtn.addEventListener('click', () => openFeedComposerModal('โชว์ของ'))
  }

  container.querySelectorAll('.js-quick-post-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openFeedComposerModal(btn.dataset.type || 'โชว์ของ')
    })
  })

  // Delegated clicks inside stream & cards
  container.addEventListener('click', e => {
    // Delete local user post
    const delBtn = e.target.closest('.js-delete-local-post')
    if (delBtn) {
      const postId = delBtn.dataset.id
      if (confirm('คุณต้องการลบโพสต์นี้ออกจาก Feed หรือไม่?')) {
        const posts = readLocal(POSTS_KEY, [])
        const filtered = posts.filter(p => p.id !== postId)
        saveLocal(POSTS_KEY, filtered)
        toast('ลบโพสต์แล้ว')
        refreshStream()
      }
      return
    }

    // In-post Tag clicks
    const tagEl = e.target.closest('.js-tag-click')
    if (tagEl) {
      const tag = tagEl.dataset.tag
      currentFilter = tag
      currentSearch = ''
      if (searchInput) searchInput.value = ''
      container.querySelectorAll('.feed-chip').forEach(c => {
        c.classList.toggle('is-active', c.dataset.filter === tag)
      })
      refreshStream()
      window.scrollTo({ top: 400, behavior: 'smooth' })
      return
    }

    // Like toggle
    const likeBtn = e.target.closest('.js-like-btn')
    if (likeBtn) {
      const postId = likeBtn.dataset.id
      const allPosts = getCombinedPosts()
      const post = allPosts.find(p => p.id === postId)
      if (post) {
        post.isLiked = !post.isLiked
        post.likes += post.isLiked ? 1 : -1
        likeBtn.classList.toggle('liked', post.isLiked)
        const countSpan = likeBtn.querySelector('.js-like-count')
        if (countSpan) countSpan.textContent = post.likes
      }
      return
    }

    // Bookmark toggle
    const bmBtn = e.target.closest('.js-bookmark-btn')
    if (bmBtn) {
      const postId = bmBtn.dataset.id
      const allPosts = getCombinedPosts()
      const post = allPosts.find(p => p.id === postId)
      if (post) {
        post.isBookmarked = !post.isBookmarked
        bmBtn.classList.toggle('bookmarked', post.isBookmarked)
        toast(post.isBookmarked ? 'บันทึกโพสต์แล้ว' : 'ยกเลิกการบันทึกแล้ว')
      }
      return
    }

    // Share button
    const shareBtn = e.target.closest('.js-share-btn')
    if (shareBtn) {
      navigator.clipboard?.writeText(window.location.href)
      toast('คัดลอกลิงก์โพสต์เรียบร้อยแล้ว!')
      return
    }

    // Comment button
    const commentBtn = e.target.closest('.js-comment-btn')
    if (commentBtn) {
      toast('ระบบความคิดเห็นกำลังจะเปิดให้ใช้งานเร็วๆ นี้')
      return
    }

    // Join team button
    const joinBtn = e.target.closest('.js-join-btn, .js-quick-join')
    if (joinBtn) {
      const team = joinBtn.dataset.team || 'ShowKong'
      const role = joinBtn.dataset.role || 'Contributor'
      openJoinRequest(team, role)
      return
    }

    // Prototype button
    const protoBtn = e.target.closest('.js-prototype-btn')
    if (protoBtn) {
      const proj = protoBtn.dataset.project
      openDialog(`ทดลองใช้ Prototype: ${proj}`, `
        <div style="padding: 10px 0;">
          <p style="color: #4e4a60; line-height: 1.6; margin-bottom: 20px;">
            กำลังเปิดสภาพแวดล้อมทดสอบ Prototype ของโปรเจกต์ <strong>${escapeHtml(proj)}</strong> บน ShowKong Sandbox
          </p>
          <div style="background: #f1eeff; border-radius: 16px; padding: 24px; text-align: center; border: 1px dashed #6d5dfb;">
            <div style="font-size: 32px; margin-bottom: 8px;">🚀</div>
            <h4 style="font-size: 16px; font-weight: 700; color: #191629; margin-bottom: 6px;">ระบบจำลองพร้อมใช้งาน</h4>
            <p style="font-size: 13px; color: #66617a; margin-bottom: 16px;">เข้าสู่หน้าทดสอบผลงานพร้อมระบบ Interactive Mockup</p>
            <a href="/pages/show-kong.html" class="button button-primary">เปิดดูผลงานแบบเต็มจอ</a>
          </div>
        </div>
      `)
      return
    }

    // Follow toggle in sidebar
    const followBtn = e.target.closest('.js-follow-btn')
    if (followBtn) {
      const isFollowing = followBtn.classList.toggle('is-following')
      followBtn.textContent = isFollowing ? 'กำลังติดตาม' : 'ติดตาม'
      toast(isFollowing ? 'ติดตามผู้สร้างแล้ว' : 'ยกเลิกการติดตาม')
      return
    }

    // Load more
    const loadMoreBtn = e.target.closest('#feedLoadMoreBtn')
    if (loadMoreBtn) {
      visibleCount += 4
      refreshStream()
      return
    }
  })
}

function refreshStream() {
  const stream = document.getElementById('feedPostStream')
  if (stream) {
    stream.innerHTML = renderPostList()
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Initial render
renderPage()
