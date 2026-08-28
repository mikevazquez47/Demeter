# Fase 4 — Alumnas, paquetes, pagos y finanzas del estudio

## Alcance implementado
- CRUD de alumnas: alta, edición, estado y archivo mediante estado `inactive`.
- Catálogo de paquetes con precio, clases, vigencia y estado.
- Registro de pagos asociado a alumna y paquete.
- Cada pago genera un movimiento de ingreso en `transactions` del área `studio`.
- Finanzas del estudio: cuentas de activo, ingresos, gastos, liquidez y resultado mensual.
- Operaciones monetarias críticas implementadas como RPC transaccionales en PostgreSQL.
- RLS mantiene aislamiento por `user_id`.

## Operaciones atómicas
`register_studio_movement` valida propietario, cuenta, tipo, monto y saldo; crea el movimiento y actualiza el saldo en una sola transacción.

`register_studio_payment` valida alumna, paquete y cuenta; crea el paquete contratado cuando corresponde, crea el ingreso financiero, actualiza el saldo y crea el pago enlazado. Si una parte falla, PostgreSQL revierte la operación completa.

## Pruebas de esquema
- Ambas funciones RPC existen con las firmas esperadas.
- `students`, `packages`, `student_packages`, `payments`, `accounts` y `transactions` tienen RLS activo.
- Cada una tiene 4 políticas de propietario: SELECT, INSERT, UPDATE y DELETE.
- No se insertaron datos demo.

## Página de prueba
`fase-4-test.html` contiene un login privado y la interfaz del módulo de estudio. La página usa Supabase Auth y las RPC de operaciones monetarias.

## Pendiente antes de aprobar definitivamente
- Prueba manual en navegador con la cuenta real de Marco.
- Verificar desde UI: crear alumna → crear paquete → registrar pago → comprobar ingreso y saldo de cuenta.
- Probar gasto → comprobar saldo → comprobar resultado mensual.
- Probar intento de gasto mayor al saldo y confirmar rechazo.
- Revisar consola del navegador y responsive en móvil.
