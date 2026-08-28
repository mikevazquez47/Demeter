# Plan de implementación — Mi Centro de Control

## Estado de partida inspeccionado
El repositorio `mikevazquez47/Demeter` contiene una aplicación funcional basada en HTML/CSS/JavaScript vanilla. `index.html` concentra gran parte de la UI y lógica; existen módulos separados como `goals.js`, `analytics.js` y `phase8-budget.js`. El estado actual ya contiene lógica de metas, presupuestos y sesión de Supabase referenciada desde la interfaz, pero no se identificó un proyecto Node/Next.js ni `package.json` en la raíz.

La actividad reciente del repositorio muestra trabajo hasta Fase 8, incluyendo integración de presupuestos y correcciones de persistencia de metas. Por tanto, reemplazar el proyecto por Next.js en esta iteración violaría el requisito de no destruir código funcional sin justificarlo.

## Estrategia
Se mantiene la base actual durante la transición y se evoluciona por capas. La migración tecnológica a Next.js/TypeScript queda como decisión futura, no como supuesto automático. Si se decide hacerla, se hará con una estrategia de coexistencia/migración y pruebas de paridad.

## Fases
### Fase 0 — Inspección y arquitectura
- [x] Identificar framework/lenguaje/estilos actuales.
- [x] Identificar persistencia existente y señales de autenticación.
- [x] Revisar automatización/CI existente.
- [x] Documentar PRD, modelo de datos y sistema visual.
- [ ] Definir contrato exacto de persistencia Supabase antes de Fase 2.

### Fase 1 — Sistema visual y estructura
- Login privado visual.
- Shell de aplicación.
- Sidebar desktop y navegación móvil.
- Dashboard vacío.
- Componentes reutilizables.
- Tema claro con la paleta definida.
- No tocar todavía la lógica de negocio existente salvo adaptadores necesarios.

### Fase 2 — Auth + PostgreSQL/Supabase
- Crear esquema con `owner_id` en entidades privadas.
- RLS para que cada fila pertenezca al usuario autenticado.
- Login/logout/sesión persistente.
- Validaciones cliente/servidor.
- Confirmaciones de borrado.
- Exportación básica.
- Migración controlada de datos existentes si aplica.

### Fase 3 — Finanzas + presupuestos
- Modelo de movimientos normalizado.
- Separación `personal` / `studio`.
- Categorías.
- Presupuestos por periodo.
- Cálculo de utilización desde movimientos reales.
- Reportes base.

### Fase 4 — Operación del estudio
- Alumnas.
- Paquetes.
- Pagos.
- Historial.
- Vencimientos.
- Integración con ingresos del estudio sin doble captura.

### Fase 5 — Metas
- Metas e hitos.
- Estados y fechas.
- Actualización manual.
- Adaptadores para futuras conexiones automáticas.

### Fase 6 — Bienestar personal
- Salud privada.
- Alimentación.
- Ejercicio.
- Pasos.
- Hábitos.
- Check-in emocional.

### Fase 7 — Dashboard + recordatorios + reportes
- Agregaciones reales.
- Recordatorios internos.
- Reportes semanales/mensuales.
- CSV/PDF.

### Fase 8 — Calidad y entrega
- Lint/type checks/tests.
- Revisión de consola.
- QA responsive.
- Seguridad/RLS.
- Backups/exportación.
- Documentación de mantenimiento.

## Regla de avance
No se inicia una fase nueva hasta que la anterior tenga: implementación, prueba manual mínima, pruebas automatizadas disponibles para el stack, documentación actualizada y una lista explícita de deuda/riesgos.
