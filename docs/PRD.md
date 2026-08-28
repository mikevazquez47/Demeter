# PRD — Mi Centro de Control

## 1. Producto
Aplicación web privada de uso individual para organizar finanzas personales, operación y finanzas del estudio de pole, alumnas, paquetes, pagos, metas, presupuestos, salud, alimentación, ejercicio, pasos, hábitos, estado emocional, recordatorios y reportes.

**Usuario objetivo:** Marco, un único propietario autenticado.
**Idioma:** español.
**Moneda:** MXN.
**Zona horaria:** `America/Mexico_City`.
**Acceso:** sin registro público; ninguna vista ni dato debe quedar expuesto sin autenticación.

## 2. Principios
- Privacidad por defecto.
- Datos reales separados de cualquier seed/demo.
- Finanzas personales y del estudio son dominios distintos, aunque compartan infraestructura.
- Los módulos deben poder crecer sin acoplar toda la aplicación.
- Formularios rápidos y lectura ejecutiva.
- Mobile-first sin sacrificar escritorio.
- Accesibilidad y contraste como requisitos funcionales.

## 3. Alcance del MVP
1. Autenticación privada y protección de rutas.
2. Dashboard ejecutivo conectado a datos reales.
3. Finanzas personales y del estudio.
4. Presupuestos por área/categoría/periodo.
5. Alumnas, paquetes y pagos del estudio.
6. Metas con progreso e hitos.
7. Salud, alimentación, ejercicio, pasos, hábitos y check-in emocional.
8. Recordatorios internos.
9. Reportes semanales y mensuales.
10. Exportación de datos a CSV y, si resulta estable, PDF.

## 4. Requisitos clave
### Finanzas
Los movimientos deben tener propietario, área, tipo, monto, fecha y metadatos suficientes para reportes. Los gastos deben poder vincularse al presupuesto correspondiente sin duplicar registros.

### Presupuestos
El gasto utilizado se calcula a partir de movimientos reales del mismo propietario, área, categoría y periodo. Estados: <80% verde, 80–99% ámbar, >=100% rojo.

### Estudio
Alumnas, paquetes y pagos deben mantener historial. Un pago debe poder alimentar tanto el estado de cuenta de la alumna como las finanzas del estudio, evitando doble captura.

### Salud
Es seguimiento personal, no sistema clínico. No habrá diagnósticos ni recomendaciones médicas peligrosas.

## 5. No objetivos del MVP
- Registro público.
- Portal para alumnas o instructoras.
- Aplicación móvil nativa.
- Modo oscuro funcional.
- Automatizaciones externas de recordatorios.
- Diagnóstico médico.
- Integraciones bancarias automáticas.

## 6. Criterios de aceptación
El MVP se considera funcional cuando Marco puede autenticarse, crear/editar/eliminar registros autorizados, consultar los módulos definidos, ver el dashboard actualizado, generar reportes y exportar sus datos desde computadora y celular, sin que un usuario no autenticado pueda consultar información privada.

## 7. Riesgos principales
- El repositorio actual es una aplicación vanilla HTML/CSS/JS, no un proyecto Next.js.
- La persistencia existente utiliza al menos `localStorage` en algunos módulos, por lo que no equivale a una base de datos segura multi-registro.
- El repositorio GitHub actual es público. Esto no expone por sí mismo datos de Supabase si las credenciales no están comprometidas, pero es una mala configuración para un proyecto que contiene lógica de una herramienta privada; debe evaluarse moverlo a privado antes de almacenar secretos o lógica sensible.
- La migración debe hacerse incrementalmente para no romper la versión funcional actual.
