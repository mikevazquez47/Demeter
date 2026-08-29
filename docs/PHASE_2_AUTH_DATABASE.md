# Fase 2 — Autenticación privada y base de datos

## Estado
Implementación realizada sobre el proyecto Supabase `Demeter Fitness` (`gconmsfozomwfisnmgdq`) y sobre la rama `phase-2-auth-database`.

## Autenticación
- El acceso es exclusivamente mediante correo + contraseña.
- No existe registro público en la interfaz.
- Se usa `supabase.auth.signInWithPassword()`.
- La sesión usa persistencia y renovación automática del token.
- La aplicación consulta la sesión existente al cargar.
- El cierre de sesión usa `supabase.auth.signOut()`.
- Si no existe una sesión válida, el dashboard queda bloqueado detrás de la pantalla de acceso.
- El diseño de acceso utiliza el mismo sistema visual de Fase 1.

La integración sigue la API oficial de Supabase para autenticación por contraseña.

## Base de datos
Se añadió `public.profiles` asociado 1:1 con `auth.users`.

Configuración del perfil:
- `display_name`: Marco por defecto.
- `timezone`: `America/Mexico_City`.
- `currency`: `MXN`.

Existe un trigger de creación de usuario para crear el perfil automáticamente. El usuario existente ya tiene perfil y configuración correcta.

## Tablas privadas preparadas
- profiles
- accounts
- transactions
- financial_settings
- financial_categories
- budgets
- students
- packages
- student_packages
- payments
- goals
- goal_milestones
- health_records
- medical_appointments
- meals
- weekly_menus
- menu_items
- shopping_items
- training_plans
- workouts
- steps_daily
- habits
- habit_logs
- emotional_checkins
- reminders

No se agregaron datos demo ni seeds en estas tablas.

## Seguridad
Todas las tablas privadas tienen RLS activado.

Cada tabla tiene cuatro políticas para el propietario autenticado:
- SELECT: solo filas cuyo `user_id` corresponde a `auth.uid()`.
- INSERT: el nuevo `user_id` debe corresponder a `auth.uid()`.
- UPDATE: solo filas propias y el nuevo propietario debe seguir siendo el usuario autenticado.
- DELETE: solo filas propias.

`profiles` es la excepción estructural: su propietario se determina mediante `profiles.id = auth.uid()`.

El rol `anon` no tiene permisos sobre las tablas privadas.

También se agregaron índices sobre `user_id` y consultas frecuentes por usuario/fecha para reducir el coste de RLS y las consultas del futuro dashboard.

## Seguridad adicional
- Se revocó la ejecución pública de las funciones internas `handle_new_user()` y `set_updated_at()`.
- `handle_new_user()` permanece `SECURITY DEFINER` únicamente porque es invocada por el trigger de `auth.users`.
- No se utiliza `service_role` en el frontend.
- La publishable key existente es una credencial pública destinada al cliente; no sustituye RLS.

## Verificación realizada
- El proyecto Supabase está activo.
- Hay 1 perfil configurado.
- Las 25 tablas privadas previstas aparecen con RLS habilitado.
- Las tablas privadas tienen cuatro políticas de propietario cada una.
- El asesor de seguridad de Supabase ya no reporta problemas de RLS ni de funciones SECURITY DEFINER públicas.

## Pendiente antes de cerrar completamente la fase
Supabase sigue reportando `auth_leaked_password_protection` como advertencia. Debe habilitarse desde la configuración de Auth del proyecto. No se cambia automáticamente desde la aplicación porque es una configuración del proveedor de autenticación.

Además, la prueba completa de login requiere ejecutar la aplicación en navegador e introducir las credenciales reales de Marco. La contraseña no se almacena en el repositorio ni se solicita al usuario por este medio.

## Alcance excluido
Esta fase no implementa todavía CRUD funcional de finanzas, presupuestos, alumnas, pagos, metas, salud, alimentación, ejercicio, pasos, hábitos, recordatorios ni reportes. Las tablas quedan preparadas para las fases posteriores, pero no se habilitan como módulos funcionales todavía.
