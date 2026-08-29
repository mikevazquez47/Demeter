(()=>{'use strict';
const $=id=>document.getElementById(id);
const uid=()=>window.currentUser?.id||window.user?.id||'local';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
let data={sleep:'',energy:'',wellbeing:'',water:'',steps:0,mood:'',moodEnergy:3,habits:[],meals:[],exercise:[]};
function inject(){
 const host=$('view-bienestar');
 if(!host||$('wellnessModule'))return;
 const s=document.createElement('style');
 s.textContent=`#wellnessModule{margin-top:8px}.w-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.w-sub{color:#777986;font-size:14px}.w-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.w-card{background:#fff;border:1px solid #E6E1DE;border-radius:16px;padding:18px}.w-card h3{margin:0 0 5px;font-size:17px}.w-icon{font-size:24px;margin-bottom:9px}.w-num{font-size:26px;font-weight:800}.w-small{color:#777986;font-size:13px}.w-btn{margin-top:13px;border:1px solid #E6E1DE;background:#fff;border-radius:10px;padding:9px 12px;color:#273247;cursor:pointer}.w-btn:hover{background:#E2F0E8}.w-green{background:#E2F0E8}.w-blue{background:#E4EEF8}.w-peach{background:#F9E9D7}.w-pink{background:#F8E7E6}.w-section{margin-top:20px}.w-actions{display:flex;gap:8px;flex-wrap:wrap}.w-pill{border:1px solid #E6E1DE;background:#fff;border-radius:999px;padding:8px 12px;cursor:pointer}.w-pill.on{background:#E2F0E8;border-color:#9FC8B0}.w-modal{position:fixed;inset:0;background:rgba(39,50,71,.2);backdrop-filter:blur(4px);z-index:9999;display:grid;place-items:center;padding:16px}.w-modal>div{width:min(500px,100%);background:#fff;border:1px solid #E6E1DE;border-radius:20px;padding:22px;box-shadow:0 20px 60px rgba(39,50,71,.18)}.w-modal form{display:grid;gap:12px}.w-modal label{font-size:13px;font-weight:700;color:#777986}.w-modal input,.w-modal select{width:100%;margin-top:6px;padding:11px;border:1px solid #E6E1DE;border-radius:10px;background:#fff;color:#273247}.w-save{border:0;background:#273247;color:#fff;border-radius:10px;padding:12px;font-weight:800;cursor:pointer}.w-close{border:0;background:none;font-size:24px;cursor:pointer;color:#273247}@media(max-width:760px){.w-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.w-grid{grid-template-columns:1fr}.w-head{align-items:flex-start}}`;
 document.head.appendChild(s);
 const wrap=document.createElement('div');wrap.id='wellnessModule';
 wrap.innerHTML=`<div class="w-head"><div><h2 style="margin:0">Bienestar</h2><div class="w-sub">Cuida lo importante sin saturarte de métricas.</div></div></div><div class="w-grid"><div class="w-card w-green"><div class="w-icon">😴</div><h3>Salud</h3><div class="w-num" id="wSleep">—</div><div class="w-small">Sueño</div><button type="button" class="w-btn" data-open="health">Registrar</button></div><div class="w-card w-peach"><div class="w-icon">🍽️</div><h3>Alimentación</h3><div class="w-num" id="wMeals">0</div><div class="w-small">registros hoy</div><button type="button" class="w-btn" data-open="meal">+ Comida</button></div><div class="w-card w-blue"><div class="w-icon">🏋️</div><h3>Ejercicio</h3><div class="w-num" id="wExercise">0</div><div class="w-small">sesiones hoy</div><button type="button" class="w-btn" data-open="exercise">+ Ejercicio</button></div><div class="w-card w-blue"><div class="w-icon">👟</div><h3>Pasos</h3><div class="w-num" id="wSteps">0</div><div class="w-small">de 10,000</div><button type="button" class="w-btn" data-open="steps">Registrar</button></div><div class="w-card w-green"><div class="w-icon">✓</div><h3>Hábitos</h3><div class="w-num" id="wHabits">0</div><div class="w-small">completados hoy</div><button type="button" class="w-btn" data-open="habits">Ver hábitos</button></div><div class="w-card w-pink"><div class="w-icon">🙂</div><h3>Estado emocional</h3><div class="w-num" id="wMood">—</div><div class="w-small">check-in de hoy</div><button type="button" class="w-btn" data-open="mood">Check-in</button></div></div><div class="w-section w-card"><h3>Acciones rápidas</h3><div class="w-actions"><button type="button" class="w-pill" data-open="health">Salud</button><button type="button" class="w-pill" data-open="meal">Comida</button><button type="button" class="w-pill" data-open="exercise">Ejercicio</button><button type="button" class="w-pill" data-open="steps">Pasos</button><button type="button" class="w-pill" data-open="habits">Hábitos</button><button type="button" class="w-pill" data-open="mood">Estado emocional</button></div></div>`;
 host.appendChild(wrap);
 const modal=document.createElement('div');modal.id='wellnessModal';modal.className='w-modal';modal.style.display='none';
 modal.innerHTML=`<div><div class="w-head"><h2 id="wTitle" style="margin:0">Registrar</h2><button type="button" id="wClose" class="w-close">×</button></div><form id="wForm"><div id="wFields"></div><button type="submit" class="w-save">Guardar</button></form></div>`;
 document.body.appendChild(modal);
 $('wClose').addEventListener('click',closeModal);
 modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
 wrap.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){e.preventDefault();e.stopPropagation();openModal(b.dataset.open)}});
 $('wForm').addEventListener('submit',save);
 load();
}
function closeModal(){$('wellnessModal').style.display='none'}
function openModal(type){
 const title={health:'Salud',meal:'Registrar comida',exercise:'Registrar ejercicio',steps:'Registrar pasos',habits:'Hábitos',mood:'Check-in emocional'}[type]||'Registrar';
 $('wTitle').textContent=title;
 let f='';
 if(type==='health')f='<label>Sueño (horas)<input id="wfSleep" type="number" min="0" max="24" step="0.1" value="'+esc(data.sleep)+'"></label><label>Energía (1–5)<input id="wfEnergy" type="number" min="1" max="5" value="'+esc(data.energy)+'"></label><label>Bienestar general (1–5)<input id="wfWell" type="number" min="1" max="5" value="'+esc(data.wellbeing)+'"></label>';
 if(type==='meal')f='<label>Comida<select id="wfMeal"><option>Desayuno</option><option>Comida</option><option>Cena</option><option>Snack</option></select></label>';
 if(type==='exercise')f='<label>Actividad<input id="wfExercise" placeholder="Ej. Gym, ballet, pole..."></label><label>Duración (min)<input id="wfDuration" type="number" min="1"></label>';
 if(type==='steps')f='<label>Pasos<input id="wfSteps" type="number" min="0" value="'+Number(data.steps||0)+'"></label>';
 if(type==='habits')f='<div class="w-actions"><button type="button" class="w-pill" data-h="Dormir 7–8 h">Dormir 7–8 h</button><button type="button" class="w-pill" data-h="Entrenar">Entrenar</button><button type="button" class="w-pill" data-h="Beber agua">Beber agua</button><button type="button" class="w-pill" data-h="Leer">Leer</button></div>';
 if(type==='mood')f='<label>¿Cómo te sientes hoy?<select id="wfMood"><option>😞</option><option>😕</option><option>😐</option><option>🙂</option><option>😄</option></select></label><label>Energía (1–5)<input id="wfMoodEnergy" type="number" min="1" max="5" value="'+Number(data.moodEnergy||3)+'"></label>';
 f+='<input type="hidden" id="wfType" value="'+type+'">';$('wFields').innerHTML=f;$('wellnessModal').style.display='grid';
 document.querySelectorAll('#wFields [data-h]').forEach(b=>{if(data.habits?.includes(b.dataset.h))b.classList.add('on');b.addEventListener('click',()=>b.classList.toggle('on'))});
}
function save(e){
 e.preventDefault();
 const type=$('wfType').value;
 if(type==='health'){data.sleep=$('wfSleep').value;data.energy=$('wfEnergy').value;data.wellbeing=$('wfWell').value}
 if(type==='meal')data.meals=[...(data.meals||[]),$('wfMeal').value]
 if(type==='exercise')data.exercise=[...(data.exercise||[]),{name:$('wfExercise').value.trim(),duration:Number($('wfDuration').value||0)}]
 if(type==='steps')data.steps=Number($('wfSteps').value||0)
 if(type==='mood'){data.mood=$('wfMood').value;data.moodEnergy=Number($('wfMoodEnergy').value||3)}
 if(type==='habits')data.habits=[...document.querySelectorAll('#wFields [data-h].on')].map(x=>x.dataset.h)
 localStorage.setItem('wellness_'+uid(),JSON.stringify(data));closeModal();render();
}
function load(){try{const x=JSON.parse(localStorage.getItem('wellness_'+uid())||'null');if(x)data={...data,...x}}catch(e){}render()}
function render(){if(!$('wellnessModule'))return;$('wSleep').textContent=data.sleep?data.sleep+' h':'—';$('wMeals').textContent=data.meals?.length||0;$('wExercise').textContent=data.exercise?.length||0;$('wSteps').textContent=(data.steps||0).toLocaleString('es-MX');$('wHabits').textContent=data.habits?.length||0;$('wMood').textContent=data.mood||'—'}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();