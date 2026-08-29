(() => {
  'use strict';

  // Fase 1: shell visual. Conserva el DOM funcional de Finanzas/Fase 5
  // y lo coloca dentro del layout aprobado, sin reemplazar la lógica de la app.
  function boot() {
    document.documentElement.classList.add('phase1');
    document.body.classList.add('mc-page');

    const source = document.createElement('div');
    source.id = 'mc-source';
    while (document.body.firstChild) source.appendChild(document.body.firstChild);

    const appView = source.querySelector('#appView');
    const loginView = source.querySelector('#loginView');
    const errorBox = source.querySelector('#errorBox');
    const editModal = source.querySelector('#editModal');
    const deleteModal = source.querySelector('#deleteModal');
    const toast = source.querySelector('#toast');

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
            <div>
              <p class="mc-eyebrow">CENTRO DE CONTROL · PERSONAL</p>
              <h1 id="mc-page-title">Buenos días, Marco</h1>
              <p class="mc-sub">Tu información importante, en un solo lugar.</p>
            </div>
            <div class="mc-header-actions">
              <span class="mc-date" id="mc-date"></span>
              <button class="mc-icon-btn" id="mc-logout" type="button">Salir</button>
              <button class="mc-avatar mc-avatar-large" type="button" aria-label="Perfil">M</button>
            </div>
          </header>
          <div class="mc-scope" role="tablist" aria-label="Área de trabajo">
            <button id="mc-personal" class="active" type="button">Personal</button>
            <button id="mc-studio" type="button">Estudio</button>
          </div>
          <section class="mc-functional" id="mc-functional"></section>
        </main>
        <nav class="mc-bottom" aria-label="Navegación móvil">
          <button class="active" data-view="dashboard"><span>⌂</span><small>Inicio</small></button>
          <button data-view="registrar"><span>$</span><small>Finanzas</small></button>
          <button data-view="finanzas"><span>▤</span><small>Presupuestos</small></button>
          <button data-view="metas"><span>◇</span><small>Metas</small></button>
        </nav>
      </div>
      <div class="mc-auth" id="mc-auth" hidden></div>
    `;

    const functional = document.getElementById('mc-functional');
    const auth = document.getElementById('mc-auth');
    if (errorBox) functional.appendChild(errorBox);
    if (loginView) auth.appendChild(loginView);
    if (appView) functional.appendChild(appView);
    if (editModal) document.body.appendChild(editModal);
    if (deleteModal) document.body.appendChild(deleteModal);
    if (toast) document.body.appendChild(toast);

    const oldTabs = source.querySelector('#tabs');
    if (oldTabs) oldTabs.remove();

    const date = new Intl.DateTimeFormat('es-MX', {
      timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'long'
    }).format(new Date());
    document.getElementById('mc-date').textContent = date.charAt(0).toUpperCase() + date.slice(1);

    function syncAuth() {
      auth.hidden = !loginView || loginView.classList.contains('hidden');
      document.querySelector('.mc-app').classList.toggle('mc-locked', !auth.hidden);
    }
    if (loginView) {
      new MutationObserver(syncAuth).observe(loginView, { attributes: true, attributeFilter: ['class'] });
      syncAuth();
    }

    function activate(view, button) {
      if (button?.dataset.disabledFuture === 'true') return;
      document.querySelectorAll('.mc-nav-item, .mc-bottom button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`[data-view="${view}"]`).forEach(b => b.classList.add('active'));
      if (typeof window.show === 'function') window.show(view, button);
    }

    document.querySelectorAll('.mc-nav-item, .mc-bottom button').forEach(button => {
      button.addEventListener('click', () => activate(button.dataset.view, button));
    });

    document.getElementById('mc-personal').addEventListener('click', () => {
      if (typeof window.setMode === 'function') window.setMode('personal');
      document.getElementById('mc-personal').classList.add('active');
      document.getElementById('mc-studio').classList.remove('active');
    });
    document.getElementById('mc-studio').addEventListener('click', () => {
      if (typeof window.setMode === 'function') window.setMode('studio');
      document.getElementById('mc-studio').classList.add('active');
      document.getElementById('mc-personal').classList.remove('active');
    });

    document.getElementById('mc-logout').addEventListener('click', async () => {
      if (window.supabase) {
        const client = window.supabase.createClient('https://gconmsfozomwfisnmgdq.supabase.co', 'sb_publishable_ZLXQ1aAgucleTv3g6nfOuQ_zB4T6Acd');
        await client.auth.signOut();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
