import { openDialog, escapeHtml, readLocal, saveLocal } from './refresh.js'

export function openJoinRequest(team, role) {
  const dialog = openDialog('ขอเข้าร่วมทีม ' + team, `
    <p class="dialog-description">บอกให้ทีมรู้จักคุณสั้น ๆ และเล่าว่าคุณอยากช่วยโปรเจกต์อย่างไร</p>
    <div class="join-summary"><strong>${escapeHtml(team)} · ${escapeHtml(role)}</strong><small>คำขอจะบันทึกไว้ในอุปกรณ์นี้เพื่อทดลองใช้งาน</small></div>
    <form id="requestForm"><label>แนะนำตัวสั้น ๆ<input name="intro" required maxlength="300" placeholder="เช่น ชั้นปี สาขา และสิ่งที่คุณสนใจ"></label><label>ทักษะที่ช่วยทีมได้<input name="skills" required maxlength="300" placeholder="เช่น UX/UI, User Research, Prototype"></label><label>ข้อความถึงทีม<textarea name="message" required maxlength="2000" rows="3" placeholder="เล่าว่าทำไมคุณถึงอยากร่วมทีม และคุณช่วยให้โปรเจกต์เดินหน้าต่ออย่างไร"></textarea></label><p class="form-error" role="alert" hidden></p><div class="modal-footer"><span></span><div><button class="button button-neutral" data-close-dialog type="button">ยกเลิก</button><button class="button button-primary" type="submit">บันทึกคำขอ Join</button></div></div></form>`, 'join-dialog')
  dialog.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault()
    const data=Object.fromEntries(new FormData(e.currentTarget))
    if(Object.values(data).some(v=>!v.trim())){const err=dialog.querySelector('.form-error');err.hidden=false;err.textContent='กรุณากรอกข้อมูลให้ครบ';return}
    const requests=readLocal('showkong.join-requests',[])
    requests.push({...data,team,role,id:crypto.randomUUID(),createdAt:new Date().toISOString()})
    if(!saveLocal('showkong.join-requests',requests)){const err=dialog.querySelector('.form-error');err.hidden=false;err.textContent='บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์';return}
    dialog.close()
    openDialog('บันทึกคำขอเข้าร่วมแล้ว',`<div class="success-content"><p>คำขอสำหรับทีม ${escapeHtml(team)} ถูกบันทึกบนอุปกรณ์นี้แล้ว<br>ยังไม่ได้ส่งถึงทีมจริง</p><button class="button button-primary" data-close-dialog type="button">กลับไปดูทีม</button></div>`)
  })
}
