# Fase 6 — Salud, alimentación, ejercicio y hábitos

## Alcance
Implementación privada dentro de `Mi Centro de Control` para seguimiento personal de salud, alimentación, ejercicio, pasos, hábitos y estado emocional.

## Datos
La fase usa las tablas existentes de Supabase:
- `health_records`
- `medical_appointments`
- `meals`
- `weekly_menus`
- `menu_items`
- `shopping_items`
- `training_plans`
- `workouts`
- `steps_daily`
- `habits`
- `habit_logs`
- `emotional_checkins`

Todas tienen RLS habilitado y los registros se escriben con `auth.uid()` como propietario.

## UX
La navegación añade `Bienestar` al menú lateral y al menú inferior móvil. El módulo se divide en seis vistas: Salud, Alimentación, Ejercicio, Pasos, Hábitos y Estado emocional.

## Seguridad y salud
La aplicación no diagnostica ni prescribe tratamientos. La pantalla de Salud muestra el aviso de seguimiento personal y recomienda atención profesional cuando corresponda.

## Archivos
- `phase6-wellbeing.js`: UI, formularios, lecturas y escrituras.
- `phase6-wellbeing.css`: estilos del módulo.
- `phase1-shell.js`: carga el módulo sin reemplazar el DOM de la aplicación.

## Prueba manual de aceptación
1. Iniciar sesión.
2. Abrir Bienestar.
3. Crear un registro de salud.
4. Crear una comida.
5. Añadir un artículo a compras y marcarlo realizado.
6. Crear un plan y un entrenamiento.
7. Registrar pasos.
8. Confirmar que aparecen los hábitos iniciales y guardar cumplimiento.
9. Guardar un check-in emocional.
10. Recargar y confirmar persistencia.
11. Cerrar sesión y confirmar que Bienestar no queda visible sin autenticación.
