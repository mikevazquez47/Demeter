# Notas de Fase 2

1. Se conserva la aplicación vanilla actual en lugar de migrarla a Next.js durante esta fase. La migración sigue siendo una decisión futura.
2. La autenticación se mantiene en cliente porque la aplicación actual es una SPA estática. Si el proyecto migra a Next.js/SSR, la autenticación deberá pasar a clientes server/client y cookies siguiendo la arquitectura SSR de Supabase.
3. No se añadió recuperación de contraseña en esta fase porque el alcance aprobado exige login, sesión y logout; se puede añadir posteriormente sin cambiar el modelo de datos.
4. La base de datos se prepara desde ahora para todos los dominios, pero los módulos de negocio siguen bloqueados hasta sus respectivas fases.
5. No se mezclan datos personales y del estudio: las entidades financieras incluyen `area` cuando corresponde y las entidades de operación del estudio son independientes.
