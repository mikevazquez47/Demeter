/* Demeter Finance — Motor de metas v1
   Este módulo prepara la lógica de cálculo sin tocar la lógica estable de movimientos.
*/
(function(){
  'use strict';
  window.DemeterGoals = {
    calculate: function(goal){
      const target = Number(goal.target_amount || 0);
      const current = Number(goal.current_amount || 0);
      const remaining = Math.max(0, target - current);
      const today = new Date();
      const deadline = goal.target_date ? new Date(goal.target_date + 'T23:59:59') : null;
      let months = 0;
      if (deadline && !Number.isNaN(deadline.getTime())) {
        months = Math.max(1, (deadline.getFullYear()-today.getFullYear())*12 + deadline.getMonth()-today.getMonth() + (deadline.getDate()>=today.getDate()?0: -0.5));
      }
      const monthly = months ? remaining/months : remaining;
      const weekly = monthly*12/52;
      const pct = target > 0 ? Math.min(100, Math.max(0, current/target*100)) : 0;
      let status = 'sin fecha';
      if (deadline && !Number.isNaN(deadline.getTime())) {
        if (remaining <= 0) status = 'completada';
        else if (months <= 0) status = 'vencida';
        else status = 'en curso';
      }
      return {target,current,remaining,months,monthly,weekly,pct,status};
    },
    format: function(value){
      return '$' + Number(value||0).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
    }
  };
})();
