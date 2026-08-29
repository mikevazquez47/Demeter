# Fase 5 — Metas

Modulo privado de metas conectado a Supabase.

Incluye nombre, categoria, descripcion, motivo, fechas, objetivo, progreso, unidad, estado, notas e hitos.

Estados: Pendiente, Activa, Pausada, Completada y Cancelada.

El progreso y dias restantes se calculan en la interfaz. El progreso es manual en esta fase.

Las tablas `goals` y `goal_milestones` tienen RLS y politicas por propietario. No se insertan datos demo.

Las conexiones automaticas con finanzas, pagos del estudio, pasos y ejercicio quedan para una fase posterior.