# Supabase — Mi Centro de Control

El proyecto de Supabase usado por la aplicación es el proyecto existente **Demeter Fitness**.

- Project ref: `gconmsfozomwfisnmgdq`
- Región: `us-east-1`
- Auth: correo + contraseña
- Moneda de negocio: MXN
- Zona horaria de negocio: America/Mexico_City

## Importante

La `publishable key` puede utilizarse en el frontend. La `service_role` key nunca debe incluirse en este repositorio ni en el navegador.

Las tablas privadas dependen de Supabase Auth + PostgreSQL RLS. La clave pública por sí sola no concede acceso a los datos.

## Cambios de Fase 2

La migración aplicada en Supabase crea `profiles`, prepara las entidades privadas del Centro de Control y activa políticas de propietario para los registros con `user_id`. `profiles` usa `id = auth.uid()` como vínculo de propietario.

No hay seed/demo data en las nuevas entidades.

## Auth

El frontend usa `signInWithPassword`, `getSession`, `onAuthStateChange` y `signOut`. No existe flujo de registro público.

## Configuración pendiente

Habilitar **Leaked Password Protection** en Supabase Auth antes de considerar completada la revisión de seguridad de autenticación.
