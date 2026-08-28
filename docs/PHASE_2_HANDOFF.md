# Handoff Fase 2

## Para probar
1. Abrir la aplicación desde el despliegue que apunte a la rama de Fase 2.
2. Confirmar que aparece la pantalla de acceso privado.
3. Introducir las credenciales existentes de Marco.
4. Confirmar entrada al dashboard.
5. Recargar la página y confirmar que la sesión permanece.
6. Pulsar `Salir` y confirmar que vuelve al acceso privado.
7. Intentar acceder sin sesión y confirmar que no aparece el contenido de la aplicación.

## Seguridad de Supabase
El proyecto ya tiene RLS en las tablas privadas y políticas por propietario. La publishable key está diseñada para el cliente y no sustituye las políticas RLS.

## Pendiente de proveedor
En el panel de Supabase Auth se debe activar Leaked Password Protection.

## Siguiente fase
Una vez aprobada Fase 2, la siguiente fase será Fase 3: Finanzas y presupuestos. No debe empezarse antes de validar el login manual.
