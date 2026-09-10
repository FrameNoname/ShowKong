const spotlightProjects = [
  { id:'sheetquest', shortName:'SheetQuest', theme:'purple', badge:'ShowKong Spotlight · กำลังมาแรง', title:'SheetQuest — เรียนให้เหมือนเล่นเกม', hook:'เปลี่ยนบทเรียนธรรมดา ให้กลายเป็นภารกิจที่นักเรียนอยากทำ', summary:'เปลี่ยนบทเรียนและแบบฝึกหัดให้เป็นภารกิจที่สนุก มีเป้าหมาย และวัดความก้าวหน้าได้', tags:['Education','UX/UI','Frontend'], stats:[['1.2K','Views'],['94','Likes'],['3/5','คนในทีม']], roleLabel:'เหลือ 1 ตำแหน่ง', role:'กำลังหา Marketing 1 คน', image:'/images/projects/sheetquest-preview.webp', imageAlt:'หน้าจอแดชบอร์ดภารกิจการเรียนของ SheetQuest' },
  { id:'greenloop', shortName:'GreenLoop', theme:'green', badge:'ShowKong Spotlight · สร้างผลกระทบ', title:'GreenLoop — แยกขยะให้มีรางวัล', hook:'เปลี่ยนขยะในมหาวิทยาลัย ให้กลายเป็นรางวัลที่ทุกคนอยากสะสม', summary:'ระบบสะสมแต้มจากการแยกขยะภายในมหาวิทยาลัย พร้อมรางวัลจากร้านค้ารอบชุมชน', tags:['Sustainability','Backend','Marketing'], stats:[['860','Views'],['71','Likes'],['4/5','คนในทีม']], roleLabel:'เหลือ 1 ตำแหน่ง', role:'กำลังหา Mobile Developer 1 คน', image:'/images/projects/greenloop-preview.webp', imageAlt:'หน้าจอสะสมแต้มจากการแยกขยะของ GreenLoop' },
  { id:'safewalk', shortName:'SafeWalk', theme:'teal', badge:'ShowKong Spotlight · ชุมชนกำลังสนใจ', title:'SafeWalk — กลับหออย่างมั่นใจ', hook:'เส้นทางกลับหอที่ปลอดภัยขึ้น จากข้อมูลของคนที่เดินจริง', summary:'แอปแนะนำเส้นทางปลอดภัยสำหรับนักศึกษา โดยอ้างอิงข้อมูล แสงสว่าง และรายงานจากผู้ใช้จริง', tags:['Community','Mobile Dev','Research'], stats:[['1K','Views'],['88','Likes'],['3/4','คนในทีม']], roleLabel:'เหลือ 1 ตำแหน่ง', role:'กำลังหา UX Researcher 1 คน', image:'/images/projects/safewalk-preview.webp', imageAlt:'หน้าจอแผนที่เส้นทางกลับหอที่ปลอดภัยของ SafeWalk' },
]

export function setupHomeSpotlight() {
  const carousel=document.querySelector('[data-project-carousel]')
  const card=carousel?.querySelector('[data-spotlight-card]')
  if(!carousel||!card)return
  const get=name=>card.querySelector(`[data-spotlight-${name}]`)
  const elements={ image:get('image'), badge:get('badge'), title:get('title'), hook:get('hook'), summary:get('summary'), tags:get('tags'), proof:get('proof'), roleLabel:get('role-label'), role:get('role'), detail:get('detail'), join:get('join'), save:get('save'), status:carousel.querySelector('[data-carousel-status]'), dots:[...carousel.querySelectorAll('[data-carousel-dot]')] }
  const saved=new Set()
  let active=0
  let touchStart=null

  const updateSaved=project=>{
    const isSaved=saved.has(project.id)
    elements.save.classList.toggle('is-saved',isSaved)
    elements.save.setAttribute('aria-pressed',String(isSaved))
    elements.save.setAttribute('aria-label',`${isSaved?'ยกเลิกการบันทึก':'บันทึกโปรเจกต์'} ${project.shortName}`)
  }
  const render=(index,announce=true)=>{
    active=(index+spotlightProjects.length)%spotlightProjects.length
    const project=spotlightProjects[active]
    card.dataset.theme=project.theme
    elements.image.src=project.image
    elements.image.alt=project.imageAlt
    elements.badge.replaceChildren(Object.assign(document.createElement('i')),document.createTextNode(project.badge))
    elements.title.textContent=project.title
    elements.hook.textContent=project.hook
    elements.summary.textContent=project.summary
    elements.tags.replaceChildren(...project.tags.map(tag=>Object.assign(document.createElement('span'),{textContent:tag})))
    elements.proof.replaceChildren(...project.stats.map(([value,label])=>{const span=document.createElement('span');const strong=document.createElement('strong');strong.textContent=value;span.append(strong,document.createTextNode(label));return span}))
    elements.roleLabel.textContent=project.roleLabel
    elements.role.textContent=project.role
    elements.detail.href=`/pages/explore-projects.html?project=${project.id}`
    elements.join.href=`/pages/team-detail.html?team=${project.id}`
    elements.dots.forEach((dot,i)=>{const selected=i===active;dot.classList.toggle('is-active',selected);selected?dot.setAttribute('aria-current','true'):dot.removeAttribute('aria-current')})
    updateSaved(project)
    if(announce)elements.status.textContent=`โปรเจกต์ที่ ${active+1} จาก ${spotlightProjects.length}: ${project.shortName}`
    card.classList.remove('is-switching');void card.offsetWidth;card.classList.add('is-switching');setTimeout(()=>card.classList.remove('is-switching'),280)
  }
  carousel.querySelector('[data-carousel-prev]').addEventListener('click',()=>render(active-1))
  carousel.querySelector('[data-carousel-next]').addEventListener('click',()=>render(active+1))
  elements.dots.forEach(dot=>dot.addEventListener('click',()=>render(Number(dot.dataset.carouselDot))))
  elements.save.addEventListener('click',()=>{const project=spotlightProjects[active];saved.has(project.id)?saved.delete(project.id):saved.add(project.id);updateSaved(project)})
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();render(active+(event.key==='ArrowLeft'?-1:1))}})
  carousel.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0]?.clientX??null},{passive:true})
  carousel.addEventListener('touchend',event=>{if(touchStart===null)return;const distance=(event.changedTouches[0]?.clientX??touchStart)-touchStart;touchStart=null;if(Math.abs(distance)>=48)render(active+(distance<0?1:-1))},{passive:true})
  spotlightProjects.slice(1).forEach(({image})=>{const preload=new Image();preload.src=image})
  render(0,false)
}
