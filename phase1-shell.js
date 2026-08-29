(() => {
  'use strict';

  function installVisualBridge() {
    if (document.getElementById('mc-visual-bridge')) return;
    const style = document.createElement('style');
    style.id = 'mc-visual-bridge';
    style.textContent = `
      .mc-functional #appView { display:block !important; width:100%; }
      .mc-functional #appView > .segment { display:none !important; }
      .mc-functional .top { display:none !important; }
      .mc-functional .card { background:#fff !important; color:#25242A !important; border:1px solid #dedbd5 !important; box-shadow:0 8px 30px rgba(37,36,42,.06) !important; border-radius:18px !important; }
      .mc-functional .metric { background:#fff !important; color:#25242A !important; }
      .mc-functional .metric-g { border-left:4px solid #7AA68A !important; }
      .mc-functional .metric-p { border-left:4px solid #56345C !important; }
      .mc-functional .metric-o { border-left:4px solid #D99A3D !important; }
      .mc-functional .metric-b { border-left:4px solid #8C93AD !important; }
      .mc-functional .big { color:#25242A !important; }
      .mc-functional .good { color:#7AA68A !important; }
      .mc-functional .bad { color:#C85C5C !important; }
      .mc-functional .blue { color:#68738F !important; }
      .mc-functional .kicker { color:#817A84 !important; }
      .mc-functional .muted, .mc-functional .note { color:#777178 !important; }
      .mc-functional .summary .mini, .mc-functional .analytics-card, .mc-functional .goal-kpi, .mc-functional .goal-next { background:#F8F7F4 !important; border-color:#dedbd5 !important; color:#25242A !important; }
      .mc-functional .goal-card { background:#fff !important; border-color:#dedbd5 !important; }
      .mc-functional .progress { background:#e8e5df !important; }
      .mc-functional .fill { background:#56345C !important; }
      .mc-functional .fill.green { background:#7AA68A !important; }
      .mc-functional .primary { background:#56345C !important; box-shadow:none !important; }
      .mc-functional .secondary, .mc-functional input, .mc-functional select { background:#FAF9F7 !important; color:#25242A !important; border-color:#d8d4cf !important; }
      .mc-functional .quick button { background:#fff !important; color:#5f5961 !important; border-color:#dedbd5 !important; box-shadow:0 8px 30px rgba(37,36,42,.06) !important; }
      .mc-functional .tabs, .mc-legacy-tabs { display:none !important; }
      .mc-functional .alert { background:#FBF5EC !important; border-color:#EADFCC !important; }
      .mc-functional .error { background:#FBEFEF !important; color:#8E4545 !important; border-color:#E5CACA !important; }
      .mc-functional .modal-card { background:#fff !important; color:#25242A !important; border-color:#dedbd5 !important; }
      .mc-functional .modal-card .close { background:#EEECE8 !important; color:#25242A !important; }
      .mc-functional .goal-priority { background:#f1efec !important; color:#6f6a71 !important; }
      .mc-functional .goal-priority.high { background:#f3e7e9 !important; color:#C85C5C !important; }
      .mc-functional .goal-priority.low { background:#edf3ee !important; color:#5d866b !important; }
      @media (max-width:680px) {
        .mc-functional #appView .grid { grid-template-columns:1fr !important; }
        .mc-functional #appView .span2, .mc-functional #appView .wide { grid-column:auto !important; }
      }
    `;
    document.head.appendChild(style);
  }

  // Fase 1 shell: envuelve la aplicación funcional sin romper los nodos
  // que necesita el código heredado (en particular #tabs).
  function boot() {
    if (document.querySelector('.mc-app')) return;
    document.documentElement.classList.add('phase1');
    document.body.classList.add('mc-page');
    installVisualBridge();

    const source = document.createElement('div');
    source.id = 'mc-source';
    while (document.body.firstChild) source.appendChild(document.body.firstChild);

    const appView = source.querySelector('#appView');
    const loginView = source.querySelector('#loginView');
    const errorBox = source.querySelector('#errorBox');
    const editModal = source.querySelector('#editModal');
    const deleteModal = source.querySelector('#deleteModal');
    const toast = source.querySelector('#toast');
    const oldTabs = source.querySelector('#tabs');

    document.body.innerHTML = `
      <div class="mc-app">
        <aside class="mc-sidebar" aria-label="Navegación principal">
          <div class="mc-brand"><span class="mc-mark">M</span><div><strong>Mi Centro</strong><small>de Control</small></div></div>
          <div class="mc-owner"><span class="mc-avatar">M</span><div><strong id="mc-owner-name">Marco</strong><small>Cuenta privada</small></div></div>
          <nav class="mc-nav">
            <button class="mc-nav-item active" data-view="dashboard"><span>⌂</span><em>Inicio</em></button>
            <button class="mc-nav-item" data-view="registrar"><span>$</span><em>Finanzas</em></button>
            <button class="mc-nav-item" data-view="finanzas"><span>▤</span><em>Presupuestos</em></button>
            <button class="mc-nav-item" data-view="metas"><span>◇</span><em>Metas</em></button>
            <button class="mc-nav-item" data-view="dashboard" data-disabled-future="true"><span>◎</span><em>Estudio</em></button>
            <button class="mc-nav-item" data-view="dashboard" data-disabled-future="true"><span>♡</span><em>Salud y hábitos</em></button>
            <button class="mc-nav-item" data-view="dashboard" data-disabled-future="true"><span>◷</span><em>Recordatorios</em></button>
            <button class="mc-nav-item" data-view="finanzas" data-disabled-future="true"><span>◌</span><em>Reportes</em></button>
          </nav>
          <div class="mc-sidebar-foot"><span>MXN</span><span>America/Mexico_City</span></div>
        </aside>
        <main class="mc-main">
          <header class="mc-header">
            <div><p class="mc-eyebrow">CENTRO DE CONTROL · PERSONAL</p><h1 id="mc-page-title">Buenos días, Marco</h1><p class="mc-sub">Tu información importante, en un solo lugar.</p></div>
            <div class="mc-header-actions"><span class="mc-date" id="mc-date"></span><button class="mc-icon-btn" id="mc-logout" type="button">Salir</button><button class="mc-avatar mc-avatar-large" type="button" aria-label="Perfil">M</button></div>
          </header>
          <div class="mc-scope" role="tablist" aria-label="Área de trabajo"><button id="mc-personal" class="active" type="button">Personal</button><button id="mc-studio" type="button">Estudio</button></div>
          <section class="mc-functional" id="mc-functional"></section>
        </main>
        <nav class="mc-bottom" aria-label="Navegación móvil"><button class="active" data-view="dashboard"><span>⌂</span><small>Inicio</small></button><button data-view="registrar"><span>$</span><small>Finanzas</small></button><button data-view="finanzas"><span>▤</span><small>Presupuestos</small></button><button data-view="metas"><span>◇</span><small>Metas</small></button></nav>
      </div>
      <div class="mc-auth" id="mc-auth"></div>
    `;

    const functional = document.getElementById('mc-functional');
    if (errorBox) functional.appendChild(errorBox);
    if (loginView) document.getElementById('mc-auth').appendChild(loginView);
    if (appView) functional.appendChild(appView);
    if (editModal) document.body.appendChild(editModal);
    if (deleteModal) document.body.appendChild(deleteModal);
    if (toast) document.body.appendChild(toast);

    // El código financiero necesita #tabs para actualizar su estado.
    // Se conserva en el DOM pero queda visualmente oculto.
    if (oldTabs) {
      oldTabs.classList.add('mc-legacy-tabs');
      document.body.appendChild(oldTabs);
    }

    const date = new Intl.DateTimeFormat('es-MX', {timeZone:'America/Mexico_City',weekday:'long',day:'numeric',month:'long'}).format(new Date());
    document.getElementById('mc-date').textContent = date.charAt(0).toUpperCase() + date.slice(1);

    function activate(view, button) {
      if (button?.dataset.disabledFuture === 'true') return;
      document.querySelectorAll('.mc-nav-item, .mc-bottom button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`[data-view="${view}"]`).forEach(b => b.classList.add('active'));
      if (typeof window.show === 'function') window.show(view, button);
    }

    document.querySelectorAll('.mc-nav-item, .mc-bottom button').forEach(button => button.addEventListener('click', () => activate(button.dataset.view, button)));
    document.getElementById('mc-personal').addEventListener('click', () => { if (typeof window.setMode === 'function') window.setMode('personal'); document.getElementById('mc-personal').classList.add('active'); document.getElementById('mc-studio').classList.remove('active'); });
    document.getElementById('mc-studio').addEventListener('click', () => { if (typeof window.setMode === 'function') window.setMode('studio'); document.getElementById('mc-studio').classList.add('active'); document.getElementById('mc-personal').classList.remove('active'); });
    document.getElementById('mc-logout').addEventListener('click', () => { const legacyLogout = document.getElementById('logoutButton'); if (legacyLogout) legacyLogout.click(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
