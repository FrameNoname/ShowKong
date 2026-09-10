import { mountRefresh } from '../components/refresh.js'
import { composerForm, bindComposer, showPostSuccess } from '../components/composer.js'
import { supabase } from '../lib/supabase.js'

mountRefresh('post')
if (supabase) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) window.location.replace('/pages/login.html')
}
document.querySelector('main').innerHTML='<section class="composer-page"><div class="modal-header"><h1>สร้างโพสต์โปรเจกต์</h1><a class="icon-button" href="/pages/feed.html" aria-label="กลับไป Feed">×</a></div><p class="dialog-description">แชร์ไอเดีย หาทีม หรือขอความคิดเห็นจากชุมชน</p>'+composerForm()+'</section>'
const params=new URLSearchParams(location.search)
const preset=params.has('challenge')?{title:params.get('challenge'),type:'กำลังหาทีม'}:params.has('project')?{title:params.get('project'),type:'ความคืบหน้า'}:{}
bindComposer(document.querySelector('.composer-page'),()=>showPostSuccess(()=>{location.href='/pages/feed.html'}),()=>{location.href='/pages/feed.html'},preset)
