# Design System — Mi Centro de Control

## Dirección
Elegante, limpia, moderna, cálida y profesional. La interfaz debe transmitir organización ejecutiva, bienestar, calma, progreso y control, con una referencia sutil al universo de un estudio de pole.

## Tokens de color
| Token | Hex | Uso |
|---|---|---|
| `background` | `#F8F7F4` | Fondo principal |
| `foreground` | `#25242A` | Texto principal |
| `primary` | `#56345C` | Acciones y énfasis |
| `secondary` | `#A982B5` | Lavanda / metas |
| `success` | `#7AA68A` | Avance y cumplimiento |
| `warning` | `#D99A3D` | Advertencias |
| `danger` | `#C85C5C` | Error / exceso |
| `surface` | `#EEECE8` | Superficies secundarias |

## Semántica por módulo
- Finanzas: ciruela + grafito.
- Metas: lavanda.
- Salud/hábitos: verde salvia.
- Advertencias: ámbar.
- Errores/presupuesto excedido: terracota.

No usar neón ni colores infantiles.

## Tipografía
- Títulos: Manrope o Plus Jakarta Sans.
- Texto: Inter.
- Números financieros: Manrope, grandes y de alto contraste.

## Componentes
Todos deben ser reutilizables y tener estados `default`, `hover`, `focus`, `disabled`, `loading` y `error` cuando aplique.

Componentes base:
- Card.
- Button.
- Input.
- Select.
- Modal.
- Table.
- Badge.
- Progress.
- Chart container.
- Alert.
- Empty state.
- Toast/confirmation.

## Layout
### Escritorio
Sidebar persistente. Contenido central con ancho legible y grid adaptable.

### Móvil
Navegación inferior o menú compacto. Formularios de una columna. Acciones primarias accesibles con el pulgar. No depender de hover.

## Accesibilidad
- Contraste suficiente entre texto y fondo.
- Foco visible por teclado.
- Labels explícitos para inputs.
- Botones con nombres accesibles.
- Estados de error no comunicados únicamente mediante color.
- Áreas táctiles cómodas en móvil.

## Dashboard
El dashboard no debe intentar mostrar todos los datos. Priorizar: balance, flujo, pendientes, presupuestos en riesgo, metas activas, estado del estudio, actividad personal y próximos recordatorios.

En ausencia de datos usar estados vacíos explícitos, por ejemplo: `No hay movimientos registrados todavía.` Nunca presentar datos demo como reales.

## Modo oscuro
No se implementa en el MVP. Los tokens deben quedar centralizados para permitirlo después sin reescribir componentes.
