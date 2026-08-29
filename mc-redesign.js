(() => {
  'use strict';

  const views = {inicio:'dashboard',finanzas:'registrar',metas:'metas',bienestar:'bienestar',alimentacion:'alimentacion',ejercicio:'ejercicio',pasos:'pasos',habitos:'habitos',emocional:'estado-emocional'};

  function addAuthGuard(){
    if(document.getElementById('mc-auth-guard-style')) return;
    const s=document.createElement('style'); s.id='mc-auth-guard-style'; s.textContent=`
      #loginView:not(.hidden){position:fixed!important;inset:0!important;z-index:99999!important;display:grid!important;place-items:center!important;margin:0!important;max-width:none!important;width:100%!important;padding:24px!important;background:rgba(251,249,247,.98)!important;pointer-events:auto!important}
      #loginView:not(.hidden) form,#loginView:not(.hidden) input,#loginView:not(.hidden) button,#loginView:not(.hidden) label{pointer-events:auto!important;position:relative!important;z-index:100000!important}
      #loginView:not(.hidden) input{user-select:text!important;-webkit-user-select:text!important;cursor:text!important;opacity:1!important}
      #loginView:not(.hidden) button{cursor:pointer!important}
      body.mc-auth-lock #appView,body.mc-auth-lock .mc-redesign-sidebar,body.mc-auth-lock .mc-redesign-bottom,body.mc-auth-lock .mc-safe-sidebar,body.mc-auth-lock .mc-safe-bottom,body.mc-auth-lock #tabs{visibility:hidden!important;pointer-events:none!important}
      body.mc-auth-lock>.top,body.mc-auth-lock>main{pointer-events:none!important}
      body.mc-auth-lock #loginView{pointer-events:auto!important}
    `; document.head.appendChild(s);
  }

  function syncAuth(){
    const login=document.getElementById('loginView');
    if(!login) return;
    const locked=!login.classList.contains('hidden');
    document.body.classList.toggle('mc-auth-lock',locked);
    if(locked){login.style.zIndex='99999';login.style.pointerEvents='auto';}
  }

  function go(view){
    const target=views[view]||view;
    try{if(typeof window.show==='function')window.show(target,document.querySelector('#tabs button'));}catch(e){console.warn('MC navigation:',e)}
    syncNav(view); updateHomeVisibility(target==='dashboard');
  }
  function syncNav(active){document.querySelectorAll('.mc-redesign-nav button,.mc-redesign-bottom button').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===active));}
  function updateHomeVisibility(isHome){document.body.classList.toggle('mc-home-active',isHome);}
  function buildNavigation(){
    if(document.querySelector('.mc-redesign-sidebar'))return;
    const sidebar=document.createElement('aside');sidebar.className='mc-redesign-sidebar';sidebar.setAttribute('aria-label','Navegación principal');
    sidebar.innerHTML=`<div class="mc-redesign-brand"><span class="mc-redesign-mark">M</span><div><strong>Mi Centro de Control</strong><small>Marco · MXN</small></div></div><nav class="mc-redesign-nav"><button data-view="inicio" class="active"><span>⌂</span>Inicio</button><button data-view="finanzas"><span>$</span>Finanzas</button><button data-view="metas"><span>◎</span>Metas</button><button data-view="bienestar"><span>♡</span>Bienestar</button><button data-view="recordatorios" disabled><span>◷</span>Recordatorios</button><button data-view="reportes" disabled><span>▥</span>Reportes</button></nav><div class="mc-redesign-foot"><span>MXN</span><span>Ciudad de México</span></div>`;
    document.body.appendChild(sidebar);
    const bottom=document.createElement('nav');bottom.className='mc-redesign-bottom';bottom.setAttribute('aria-label','Navegación móvil');
    bottom.innerHTML=`<button data-view="inicio" class="active"><span>⌂</span>Inicio</button><button data-view="finanzas"><span>$</span>Finanzas</button><button data-view="metas"><span>◎</span>Metas</button><button data-view="bienestar"><span>♡</span>Bienestar</button><button data-view="mas" disabled><span>•••</span>Más</button>`;
    document.body.appendChild(bottom);
    document.querySelectorAll('.mc-redesign-nav button:not(:disabled),.mc-redesign-bottom button:not(:disabled)').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.view)));
  }
  function replaceHome(){
    const home=document.getElementById('mc-home-redesign');if(!home||home.dataset.finalDesign==='true')return;
    home.dataset.finalDesign='true';
    home.innerHTML=`<div class="home-welcome"><h2>Hola, Marco 👋</h2><p>Aquí tienes lo importante de hoy.</p></div><div class="card home-kpi home-mint"><div class="home-icon">◉</div><div class="home-label">Disponible</div><div class="home-value" id="mc-home-available">$0.00</div></div><div class="card home-kpi home-pink"><div class="home-icon">◎</div><div class="home-label">Metas activas</div><div class="home-value" id="mc-home-goals">0</div></div><div class="card home-kpi home-sky"><div class="home-icon">👟</div><div class="home-label">Pasos hoy</div><div class="home-value" id="mc-home-steps">Sin registrar</div></div><div class="card home-kpi home-peach"><div class="home-icon">✓</div><div class="home-label">Hábitos de hoy</div><div class="home-value" id="mc-home-habits">Sin registrar</div></div><div class="card home-panel home-panel-wide"><h3>Qué hacer ahora</h3><div class="home-list" id="mc-home-attention"><div class="home-empty">No hay nada pendiente por atender.</div></div></div><div class="home-quick-actions"><button class="quick-action quick-action-dark" data-action="finance">＋ Registrar</button><button class="quick-action quick-action-pink" data-action="goal">◎ Nueva meta</button><button class="quick-action quick-action-mint" data-action="wellness">♡ Bienestar</button></div><div class="home-modules"><button class="card home-module home-module-pink" data-view="finanzas"><div><h4>Finanzas</h4><p>Ingresos, egresos y disponible.</p></div><span class="module-icon">$</span></button><button class="card home-module home-module-mint" data-view="metas"><div><h4>Metas</h4><p>Progreso y próximos hitos.</p></div><span class="module-icon">◎</span></button><button class="card home-module home-module-sky" data-view="bienestar"><div><h4>Bienestar</h4><p>Salud, hábitos y movimiento.</p></div><span class="module-icon">♡</span></button></div>`;
    home.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.view)));
    home.querySelector('[data-action="finance"]')?.addEventListener('click',()=>go('finanzas'));
    home.querySelector('[data-action="goal"]')?.addEventListener('click',()=>go('metas'));
    home.querySelector('[data-action="wellness"]')?.addEventListener('click',()=>go('bienestar'));
  }
  function syncHome(){const available=document.getElementById('liq'),target=document.getElementById('mc-home-available');if(available&&target)target.textContent=available.textContent||'$0.00';const goals=document.querySelectorAll('.goal-card').length,g=document.getElementById('mc-home-goals');if(g)g.textContent=String(goals);}
  function updateTop(){const title=document.getElementById('pageTitle'),subtitle=document.getElementById('pageSubtitle');if(!title||!subtitle)return;if(document.querySelector('.view.active')?.id==='dashboard'){title.textContent='';subtitle.textContent='';}}
  function install(){
    addAuthGuard();document.documentElement.classList.add('phase1');document.body.classList.add('mc-page');buildNavigation();replaceHome();syncHome();syncAuth();updateHomeVisibility(document.querySelector('.view.active')?.id==='dashboard');updateTop();
    const observer=new MutationObserver(()=>{replaceHome();syncHome();updateTop();syncAuth();});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  }
  function start(){if(document.body.classList.contains('mc-redesign-ready'))return;document.body.classList.add('mc-redesign-ready');let attempts=0;const timer=setInterval(()=>{attempts++;if(document.getElementById('appView')||attempts>80){clearInterval(timer);install();}},100);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();