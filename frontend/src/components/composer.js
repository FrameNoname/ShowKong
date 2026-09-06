import { designIcon } from './design-assets.js'
import { readLocal, saveLocal, escapeHtml, openDialog } from './refresh.js'

const DRAFT_KEY = 'showkong.post-draft'
export const POSTS_KEY = 'showkong.local-posts'
export function composerForm() {
  return `<form class="composer-form" id="postForm">
    <fieldset><legend>ประเภทโพสต์</legend><div class="chip-row" data-post-types>${[['ไอเดียใหม่','ไอเดียใหม่'],['กำลังหาทีม','หาสมาชิก'],['ขอ Feedback','ขอ Feedback'],['ความคืบหน้า','ความคืบหน้า']].map(([v,label],i)=>`<button class="chip ${i===0?'is-active':''}" type="button" data-value="${v}" aria-pressed="${i===0}">${label}</button>`).join('')}</div></fieldset>
    <label>ชื่อโปรเจกต์<input name="title" id="postTitle" required maxlength="160" placeholder="เช่น SafeWalk — แอปช่วยหาเส้นทางกลับหออย่างปลอดภัย"></label>
    <label>เล่าเกี่ยวกับโปรเจกต์<textarea name="description" id="postDescription" required maxlength="6000" rows="4" placeholder="โปรเจกต์นี้แก้ปัญหาอะไร ตอนนี้ทำถึงไหนแล้ว และต้องการให้คนในชุมชนช่วยอะไร..."></textarea></label>
    <div class="form-row"><label>หัวข้อ<select name="topic" id="postTopic"><option value="">เลือกหัวข้อ</option><option>เทคโนโลยี</option><option>การศึกษา</option><option>ชุมชน</option><option>สิ่งแวดล้อม</option><option>ธุรกิจ</option><option>สุขภาพและชุมชน</option></select></label><label>แท็กทักษะ<input name="tags" id="postTags" maxlength="300" placeholder="เช่น #UX #Research"></label></div>
    <details class="composer-links"><summary>เพิ่มลิงก์ Demo หรือ GitHub (ไม่บังคับ)</summary><div class="form-row"><label>Demo<input name="demo" type="url" placeholder="https://"></label><label>GitHub<input name="github" type="url" placeholder="https://github.com/"></label></div></details>
    <div class="upload-section"><div><strong>รูปภาพประกอบ</strong><span>เพิ่มได้สูงสุด 4 รูป</span></div><label class="upload-drop" id="dropZone"><input id="postImages" type="file" accept="image/png,image/jpeg" multiple>${designIcon('composer/imgIconAddImage')}<strong>คลิกเพื่อเพิ่มรูป หรือลากไฟล์มาวาง</strong><small>รองรับ PNG, JPG ไม่เกิน 10 MB ต่อรูป</small></label><div class="upload-preview" id="uploadPreview" hidden></div></div>
    <p class="form-error" id="postError" role="alert" hidden></p><div class="modal-footer"><span class="draft-status" role="status">บันทึกร่างบนอุปกรณ์นี้อัตโนมัติ</span><div><button class="button button-neutral" type="button" data-cancel-post>ยกเลิก</button><button class="button button-primary" id="submitPostBtn" type="submit">โพสต์โปรเจกต์</button></div></div>
  </form>`
}
export function bindComposer(root, onComplete, onCancel, preset = {}) {
  const form = root.querySelector('#postForm')
  const saved = readLocal(DRAFT_KEY,{})
  let type = preset.type || saved.type || 'ไอเดียใหม่'
  let images = []
  let disposed = false
  let revision = 0
  const error = message => { const el=root.querySelector('#postError');el.textContent=message;el.hidden=!message }
  const setType = () => root.querySelectorAll('[data-value]').forEach(b=>{b.classList.toggle('is-active',b.dataset.value===type);b.setAttribute('aria-pressed',String(b.dataset.value===type))})
  for(const name of ['title','description','topic','tags','demo','github'])form.elements[name].value = preset[name] ?? saved[name] ?? ''
  setType()
  function draft() {
    const data={...Object.fromEntries(new FormData(form)),type}
    root.querySelector('.draft-status').textContent=saveLocal(DRAFT_KEY,data)?'บันทึกร่างบนอุปกรณ์นี้แล้ว':'ไม่สามารถบันทึกร่างได้'
  }
  form.addEventListener('input',draft)
  root.querySelector('[data-post-types]').addEventListener('click',e=>{const b=e.target.closest('[data-value]');if(b){type=b.dataset.value;setType();draft()}})
  function previews() {
    const el=root.querySelector('#uploadPreview')
    el.hidden=!images.length
    el.innerHTML=images.map((img,i)=>`<div class="upload-item"><img src="${img.data}" alt="${escapeHtml(img.name)}"><div><div><strong>${escapeHtml(img.name)}</strong><small>${(img.size/1024/1024).toFixed(1)} MB · พร้อมแนบ</small></div><button class="soft-link" type="button" data-remove="${i}" aria-label="ลบรูป ${escapeHtml(img.name)}">ลบ</button></div></div>`).join('')
  }
  async function addImages(files) {
    const chosen=[...files]
    if(images.length+chosen.length>4){error('เพิ่มรูปได้สูงสุด 4 รูป กรุณาลบบางรูปก่อน');return}
    if(chosen.some(f=>!['image/png','image/jpeg'].includes(f.type)||f.size>10*1024*1024)){error('กรุณาเลือกไฟล์ PNG หรือ JPG ขนาดไม่เกิน 10 MB ต่อรูป');return}
    const currentRevision=++revision
    const button=root.querySelector('#submitPostBtn')
    button.disabled=true
    try{
      const loaded=await Promise.all(chosen.map(file=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve({name:file.name,size:file.size,data:reader.result});reader.onerror=()=>reject(new Error('อ่านรูปภาพไม่ได้'));reader.readAsDataURL(file)})))
      if(disposed||currentRevision!==revision)return
      images.push(...loaded);previews();error('')
    }catch{error('อ่านรูปภาพไม่ได้ กรุณาลองใหม่')}finally{if(!disposed)button.disabled=false}
  }
  root.querySelector('#postImages').addEventListener('change',e=>{addImages(e.target.files);e.target.value=''})
  root.querySelector('#uploadPreview').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){images.splice(Number(b.dataset.remove),1);previews()}})
  const drop=root.querySelector('#dropZone')
  drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('dragging')})
  drop.addEventListener('dragleave',()=>drop.classList.remove('dragging'))
  drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('dragging');addImages(e.dataTransfer.files)})
  root.querySelector('[data-cancel-post]').addEventListener('click',()=>{disposed=true;onCancel()})
  form.addEventListener('submit',e=>{
    e.preventDefault()
    const values=Object.fromEntries(new FormData(form))
    if(!values.title.trim()||!values.description.trim()){error('กรุณากรอกชื่อและรายละเอียดโปรเจกต์');return}
    for(const key of ['demo','github']) {
      if(values[key]&&!/^https?:\/\//i.test(values[key])){error('ลิงก์ต้องขึ้นต้นด้วย https:// หรือ http://');return}
    }
    const posts=readLocal(POSTS_KEY,[])
    const post={...values,id:crypto.randomUUID(),type,images,createdAt:new Date().toISOString()}
    if(!saveLocal(POSTS_KEY,[post,...posts])){error('พื้นที่จัดเก็บไม่พอ ลองลดจำนวนรูปหรือขนาดไฟล์แล้วโพสต์อีกครั้ง');return}
    saveLocal(DRAFT_KEY,{})
    disposed=true
    onComplete(post)
  })
  return ()=>{disposed=true;revision++}
}
export function showPostSuccess(onClose) {
  const dialog=openDialog('โพสต์โปรเจกต์แล้ว!',`<div class="success-content"><span class="success-check">✓</span><p>โพสต์ของคุณถูกเพิ่มลง Feed บนอุปกรณ์นี้แล้ว<br>ยังไม่ได้เผยแพร่ให้สมาชิกคนอื่นเห็น</p><button class="button button-primary" data-close-dialog type="button">ดูโพสต์ใน Feed</button></div>`)
  dialog.addEventListener('close',onClose,{once:true})
}
