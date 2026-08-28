/* Demeter Finance — Fase 6: análisis financiero
   Módulo independiente. No modifica la lógica de movimientos.
*/
window.DemeterAnalytics = (() => {
  const money = v => '$' + Number(v || 0).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2});
  const monthKey = d => String(d || '').slice(0,7);
  const analyze = (transactions=[], months=6) => {
    const valid = transactions.filter(t => !String(t.concept||'').startsWith('__TRANSFER__:'));
    const now = new Date();
    const keys=[];
    for(let i=months-1;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);keys.push(d.toISOString().slice(0,7));}
    const monthly=keys.map(k=>{
      const rows=valid.filter(t=>monthKey(t.transaction_date)===k);
      const income=rows.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0);
      const expense=rows.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);
      return {month:k,income,expense,net:income-expense,count:rows.length};
    });
    const current=monthly[monthly.length-1]||{income:0,expense:0,net:0,count:0};
    const previous=monthly.length>1?monthly[monthly.length-2]:current;
    const avgExpense=monthly.slice(0,-1).reduce((s,m)=>s+m.expense,0)/Math.max(1,monthly.length-1);
    const avgIncome=monthly.slice(0,-1).reduce((s,m)=>s+m.income,0)/Math.max(1,monthly.length-1);
    const expenseDelta=avgExpense?((current.expense-avgExpense)/avgExpense)*100:0;
    const incomeDelta=avgIncome?((current.income-avgIncome)/avgIncome)*100:0;
    const categories={};
    valid.filter(t=>t.type==='expense'&&monthKey(t.transaction_date)===current.month).forEach(t=>{const c=t.category||'Sin categoría';categories[c]=(categories[c]||0)+Number(t.amount||0);});
    const topCategories=Object.entries(categories).sort((a,b)=>b[1]-a[1]).map(([name,amount])=>({name,amount,share:current.expense?amount/current.expense*100:0}));
    let insight='Flujo estable.';
    if(current.expense>current.income) insight='Estás gastando más de lo que ingresas este mes.';
    else if(expenseDelta>15) insight=`Tus gastos están ${expenseDelta.toFixed(0)}% por encima de tu promedio reciente.`;
    else if(incomeDelta<-15) insight=`Tus ingresos están ${Math.abs(incomeDelta).toFixed(0)}% por debajo de tu promedio reciente.`;
    else if(current.net>0) insight='Tienes flujo positivo este mes.';
    return {monthly,current,previous,avgExpense,avgIncome,expenseDelta,incomeDelta,topCategories,insight,formatMoney:money};
  };
  return {analyze,money};
})();