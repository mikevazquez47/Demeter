(() => {
  'use strict';
  const modules = [
    ['Inicio', '⌂'], ['Finanzas', '$'], ['Presupuestos', '▤'], ['Metas', '◇'],
    ['Estudio', '◎'], ['Salud y hábitos', '♡'], ['Recordatorios', '◷'], ['Reportes', '◌']
  ];
  const empty = 'No hay datos registrados todavía.';
  const SUPABASE_URL = 'https://gconmsfozomwfisnmgdq.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ZLXQ1aAgucleTv3g6nfOuQ_zB4T6Acd';
  let authClient = null;

  function render() {
    document.documentElement.classList.add('phase1');
    document.title = 'Mi Centro de Control';
    document.body.innerHTML = `
      <div class="mc-app">
        <aside class="mc-sidebar" aria-label="Navegación principal">
          <div class="mc-brand"><span class="mc-mark">M</span><div><strong>Mi Centro</strong><small>de Control</small></div></div>
          <div class="mc-owner"><span class="mc-avatar">M</span><div><strong id="mc-owner-name">Marco</strong><small>Cuenta privada</small></div></div>
          <nav class="mc-nav">${modules.map(([label, icon], i) => `<button class="mc-nav-item ${i === 0 ? 'active' : ''}" data-module="${label}" ${i ? 'disabled' : ''}><span>${icon}</span><em>${label}</em></button>`).join('')}</nav>
          <div class="mc-sidebar-foot"><span>MXN</span><span>America/Mexico_City</span></div>
        </aside>
        <main class="mc-main">
          <header class="mc-header">
            <div><p class="mc-eyebrow">CENTRO DE CONTROL · PERSONAL</p><h1>Buenos días, Marco</h1><p class="mc-sub">Tu información importante, en un solo lugar.</p></div>
            <div class="mc-header-actions"><span class="mc-date" id="mc-date"></span><button class="mc-icon-btn" aria-label="Cerrar sesión" id="mc-logout">Salir</button><button class="mc-avatar mc-avatar-large" aria-label="Perfil">M</button></div>
          </header>
          <div class="mc-scope" role="tablist" aria-label="Área de trabajo"><button class="active">Personal</button><button>Estudio</button></div>
          <section class="mc-grid mc-overview" aria-label="Resumen general">
            <article class="mc-card mc-hero"><div><p class="mc-label">Resumen general</p><h2>Todo bajo control.</h2><p>Cuando conectemos tus datos, aquí tendrás una lectura rápida de lo que requiere atención.</p></div><span class="mc-hero-orb" aria-hidden="true"></span></article>
            ${[['Finanzas','Tu balance aparecerá aquí.','finance'],['Presupuestos','Tus límites y consumo aparecerán aquí.','budget'],['Metas','Tu progreso aparecerá aquí.','goals'],['Estudio','La operación del estudio aparecerá aquí.','studio'],['Salud y hábitos','Tu seguimiento personal aparecerá aquí.','health'],['Recordatorios','Tus pendientes aparecerán aquí.','reminders']].map(([title,text,kind]) => `<article class="mc-card mc-module mc-${kind}"><div class="mc-module-head"><span class="mc-module-icon" aria-hidden="true">${kind === 'finance' ? '$' : kind === 'budget' ? '▤' : kind === 'goals' ? '◇' : kind === 'studio' ? '◎' : kind === 'health' ? '♡' : '◷'}</span><div><h3>${title}</h3><p>${text}</p></div></div><div class="mc-empty">${empty}</div></article>`).join('')}
          </section>
          <section class="mc-grid mc-secondary">
            <article class="mc-card"><div class="mc-section-head"><div><p class="mc-label">Actividad</p><h2>Próximamente</h2></div><span class="mc-status">Fase 2</span></div><div class="mc-empty mc-empty-large"><strong>La actividad aparecerá aquí</strong><span>La sesión y la base de datos ya están preparadas; los módulos funcionales se incorporarán después.</span></div></article>
            <article class="mc-card"><div class="mc-section-head"><div><p class="mc-label">Recordatorios</p><h2>Pendientes</h2></div><button class="mc-link" disabled>Ver todos</button></div><div class="mc-empty mc-empty-large"><strong>No hay recordatorios registrados.</strong><span>Cuando el módulo esté activo podrás gestionar tus pendientes desde aquí.</span></div></article>
          </section>
        </main>
        <nav class="mc-bottom" aria-label="Navegación móvil">${modules.slice(0,5).map(([label, icon], i) => `<button class="${i === 0 ? 'active' : ''}" ${i ? 'disabled' : ''}><span>${icon}</span><small>${label}</small></button>`).join('')}</nav>
      </div>
      <div class="mc-auth" id="mc-auth" hidden>
        <section class="mc-auth-card" aria-labelledby="mc-auth-title">
          <div class="mc-brand mc-auth-brand"><span class="mc-mark">M</span><div><strong>Mi Centro</strong><small>de Control</small></div></div>
          <p class="mc-label">ACCESO PRIVADO</p>
          <h1 id="mc-auth-title">Bienvenido de nuevo, Marco</h1>
          <p class="mc-auth-sub">Esta aplicación es privada. No existe registro público.</p>
          <form id="mc-login-form" class="mc-auth-form">
            <label>Correo electrónico<input id="mc-email" type="email" autocomplete="username" required></label>
            <label>Contraseña<input id="mc-password" type="password" autocomplete="current-password" required></label>
            <button class="mc-auth-submit" id="mc-login-button" type="submit">Iniciar sesión</button>
          </form>
          <p class="mc-auth-error" id="mc-auth-error" role="alert"></p>
        </section>
      </div>`;

    const d = new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
    document.getElementById('mc-date').textContent = d.charAt(0).toUpperCase() + d.slice(1);
    bindAuth();
  }

  function setAuthenticated(user) {
    document.getElementById('mc-auth').hidden = true;
    document.querySelector('.mc-app').classList.remove('mc-locked');
    const name = user?.user_metadata?.name || 'Marco';
    document.getElementById('mc-owner-name').textContent = name;
    document.querySelector('.mc-header h1').textContent = `Buenos días, ${name}`;
    document.getElementById('mc-password').value = '';
  }

  function setLoggedOut() {
    document.getElementById('mc-auth').hidden = false;
    document.querySelector('.mc-app').classList.add('mc-locked');
    document.getElementById('mc-email').focus();
  }

  function bindAuth() {
    if (!window.supabase) {
      document.getElementById('mc-auth-error').textContent = 'No se pudo cargar el cliente de autenticación.';
      return;
    }
    authClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });

    document.getElementById('mc-login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = document.getElementById('mc-login-button');
      const error = document.getElementById('mc-auth-error');
      button.disabled = true;
      button.textContent = 'Verificando...';
      error.textContent = '';
      const { data, error: signInError } = await authClient.auth.signInWithPassword({
        email: document.getElementById('mc-email').value.trim(),
        password: document.getElementById('mc-password').value
      });
      if (signInError) {
        error.textContent = 'No se pudo iniciar sesión. Revisa tus datos e inténtalo nuevamente.';
      } else {
        setAuthenticated(data.user);
      }
      button.disabled = false;
      button.textContent = 'Iniciar sesión';
    });

    document.getElementById('mc-logout').addEventListener('click', async () => {
      const button = document.getElementById('mc-logout');
      button.disabled = true;
      const { error } = await authClient.auth.signOut();
      if (error) document.getElementById('mc-auth-error').textContent = 'No se pudo cerrar la sesión.';
      button.disabled = false;
    });

    authClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setAuthenticated(session.user); else setLoggedOut();
    });

    authClient.auth.getSession().then(({ data }) => {
      if (data.session?.user) setAuthenticated(data.session.user); else setLoggedOut();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();