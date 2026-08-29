# Checklist de validación — Fase 2

## Supabase
- [x] Proyecto activo.
- [x] `profiles` creado.
- [x] Perfil del usuario existente creado.
- [x] Zona horaria `America/Mexico_City`.
- [x] Moneda `MXN`.
- [x] RLS habilitado en tablas privadas.
- [x] Políticas de propietario creadas.
- [x] Acceso `anon` revocado en tablas privadas.
- [x] Índices de `user_id` creados.
- [x] Funciones internas endurecidas.

## Aplicación
- [x] Login privado.
- [x] Sin registro público.
- [x] Sesión persistente.
- [x] Renovación automática de token.
- [x] Logout.
- [x] Dashboard bloqueado sin sesión.
- [x] Diseño de Fase 1 conservado.
- [x] Navegación funcional todavía limitada a Fase 1.

## Pruebas pendientes
- [ ] Abrir aplicación desplegada en navegador.
- [ ] Login con las credenciales reales de Marco.
- [ ] Recargar página y comprobar persistencia.
- [ ] Cerrar sesión y comprobar bloqueo.
- [ ] Comprobar que una sesión no autenticada no puede leer tablas privadas.
- [ ] Comprobar una operación CRUD autenticada sobre una tabla de prueba antes de Fase 3.
- [ ] Habilitar protección contra contraseñas filtradas en Supabase Auth.

No se marca la fase como 100% cerrada hasta completar las pruebas de navegador y la configuración pendiente de Auth.
