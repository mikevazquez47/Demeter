(() => {
  'use strict';
  // Compatibility layer: the main application already owns the DOM.
  // The original Phase 1 shell replaced document.body and disabled all
  // navigation, which broke the functional modules added in later phases.
  // Keep this file harmless so existing references remain compatible.
  document.documentElement.classList.remove('phase1');
})();
