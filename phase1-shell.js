(() => {
  'use strict';
  const modules = [
    ['Inicio', '⌂'], ['Finanzas', '$'], ['Presupuestos', '▤'], ['Metas', '◇'],
    ['Estudio', '◎'], ['Salud y hábitos', '♡'], ['Recordatorios', '◷'], ['Reportes', '◌']
  ];
  const empty = 'No hay datos registrados todavía.';

  function render() {
    document.documentElement.classList.add('phase1');
    document.title = 'Mi Centro de Control';
    document.body.innerHTML = `
      <div class="mc-app">
        <aside class="mc-sidebar" aria-label="Navegación principal">
          <div class="mc-brand"><span class="mc-mark">M</span><div><strong>Mi Centro</strong><small>de Control</small></div></div>
          <div class="mc-owner"><span class="mc-avatar">M</span><div><strong>Marco</strong><small>Cuenta privada</small></div></div>
          <nav class="mc-nav">${modules.map(([label, icon], i) => `<button class="mc-nav-item ${i === 0 ? 'active' : ''}" data-module="${label}" ${i ? 'disabled' : ''}><span>${icon}</span><em>${label}</em></button>`).join('')}</nav>
          <div class="mc-sidebar-foot"><span>MXN</span><span>America/Mexico_City</span></div>
        </aside>
        <main class="mc-main">
          <header class="mc-header">
            <div><p class="mc-eyebrow">CENTRO DE CONTROL · PERSONAL</p><h1>Buenos días, Marco</h1><p class="mc-sub">Tu información importante, en un solo lugar.</p></div>
            <div class="mc-header-actions"><span class="mc-date" id="mc-date"></span><button class="mc-icon-btn" aria-label="Notificaciones">◷</button><button class="mc-avatar mc-avatar-large" aria-label="Perfil">M</button></div>
          </header>
          <div class="mc-scope" role="tablist" aria-label="Área de trabajo"><button class="active">Personal</button><button>Estudio</button></div>
          <section class="mc-grid mc-overview" aria-label="Resumen general">
            <article class="mc-card mc-hero"><div><p class="mc-label">Resumen general</p><h2>Todo bajo control.</h2><p>Cuando conectemos tus datos, aquí tendrás una lectura rápida de lo que requiere atención.</p></div><span class="mc-hero-orb" aria-hidden="true"></span></article>
            ${[['Finanzas','Tu balance aparecerá aquí.','finance'],['Presupuestos','Tus límites y consumo aparecerán aquí.','budget'],['Metas','Tu progreso aparecerá aquí.','goals'],['Estudio','La operación del estudio aparecerá aquí.','studio'],['Salud y hábitos','Tu seguimiento personal aparecerá aquí.','health'],['Recordatorios','Tus pendientes aparecerán aquí.','reminders']].map(([title,text,kind]) => `<article class="mc-card mc-module mc-${kind}"><div class="mc-module-head"><span class="mc-module-icon" aria-hidden="true">${kind === 'finance' ? '$' : kind === 'budget' ? '▤' : kind === 'goals' ? '◇' : kind === 'studio' ? '◎' : kind === 'health' ? '♡' : '◷'}</span><div><h3>${title}</h3><p>${text}</p></div></div><div class="mc-empty">${empty}</div></article>`).join('')}
          </section>
          <section class="mc-grid mc-secondary">
            <article class="mc-card"><div class="mc-section-head"><div><p class="mc-label">Actividad</p><h2>Próximamente</h2></div><span class="mc-status">Fase 1</span></div><div class="mc-empty mc-empty-large"><strong>La actividad aparecerá aquí</strong><span>Esta fase prepara la estructura. Los datos reales se incorporarán en las siguientes fases.</span></div></article>
            <article class="mc-card"><div class="mc-section-head"><div><p class="mc-label">Recordatorios</p><h2>Pendientes</h2></div><button class="mc-link" disabled>Ver todos</button></div><div class="mc-empty mc-empty-large"><strong>No hay recordatorios registrados.</strong><span>Cuando el módulo esté activo podrás gestionar tus pendientes desde aquí.</span></div></article>
          </section>
        </main>
        <nav class="mc-bottom" aria-label="Navegación móvil">${modules.slice(0,5).map(([label, icon], i) => `<button class="${i === 0 ? 'active' : ''}" ${i ? 'disabled' : ''}><span>${icon}</span><small>${label}</small></button>`).join('')}</nav>
      </div>`;
    const d = new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
    document.getElementById('mc-date').textContent = d.charAt(0).toUpperCase() + d.slice(1);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
