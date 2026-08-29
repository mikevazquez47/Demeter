# Modelo de datos — Mi Centro de Control

## Convenciones
- PostgreSQL/Supabase como persistencia objetivo.
- Todas las entidades privadas incluyen `owner_id uuid` apuntando al usuario autenticado.
- Montos monetarios: `numeric(14,2)` en MXN; no usar `float` para dinero.
- Fechas de negocio se almacenan con semántica explícita; timestamps con zona cuando aplique.
- `created_at` y `updated_at` en entidades mutables.
- RLS obligatoria en todas las tablas privadas.

## Entidades núcleo

### profiles
`id`, `display_name`, `timezone`, `currency`, `created_at`, `updated_at`.

Aunque exista un único usuario, `id` debe corresponder al usuario de Supabase.

### financial_accounts
Cuenta o medio donde existe dinero/deuda: `owner_id`, `area` (`personal|studio`), `name`, `type`, `opening_balance`, `active`.

### financial_categories
`owner_id`, `area`, `name`, `kind` (`income|expense`), `active`, `sort_order`.

### financial_transactions
`owner_id`, `area`, `account_id`, `category_id`, `kind`, `amount`, `transaction_date`, `payment_method`, `description`, `note`, `is_recurring`, `receipt_path`.

### budgets
`owner_id`, `area`, `name`, `category_id`, `allocated_amount`, `start_date`, `end_date`, `is_recurring`, `note`.

El gasto utilizado se calcula desde `financial_transactions`; no se guarda como valor autoritativo.

### students
`owner_id`, `name`, `phone`, `joined_at`, `status`, `notes`.

### packages
`owner_id`, `name`, `description`, `price`, `class_count`, `validity_days`, `active`.

### student_packages
Contrato histórico entre alumna y paquete: `owner_id`, `student_id`, `package_id`, `price`, `start_date`, `expiration_date`, `status`, `notes`.

### payments
`owner_id`, `student_id`, `student_package_id`, `amount`, `payment_date`, `payment_method`, `period_start`, `period_end`, `note`, `financial_transaction_id`.

`financial_transaction_id` permite reflejar un pago recibido en finanzas del estudio sin duplicar el movimiento económico.

### goals
`owner_id`, `area/category`, `name`, `description`, `reason`, `start_date`, `deadline`, `target_value`, `current_value`, `unit`, `status`, `notes`.

### goal_milestones
`owner_id`, `goal_id`, `name`, `target_value`, `completed_at`, `sort_order`.

### health_records
`owner_id`, `record_date`, `weight`, `optional_metrics jsonb`, `allergies`, `dietary_restrictions`, `medical_conditions`, `injuries`, `notes`.

Acceso estrictamente privado.

### medical_appointments
`owner_id`, `date_time`, `provider`, `purpose`, `status`, `notes`.

### meals
`owner_id`, `meal_date`, `meal_type`, `description`, `favorite`, `energy`, `hunger`, `digestion`, `notes`.

### weekly_menus
`owner_id`, `week_start`, `notes`.

### menu_items
`owner_id`, `weekly_menu_id`, `date`, `meal_type`, `meal_id`, `completed`.

### shopping_items
`owner_id`, `name`, `quantity`, `unit`, `checked`, `note`.

### workouts
`owner_id`, `workout_date`, `exercise_type`, `duration_minutes`, `intensity`, `completed`, `notes`.

### training_plans
`owner_id`, `name`, `week_start`, `notes`.

### steps_daily
`owner_id`, `date`, `steps`, `daily_goal`.

### habits
`owner_id`, `name`, `active`, `sort_order`.

### habit_logs
`owner_id`, `habit_id`, `date`, `completed`.

### emotional_checkins
`owner_id`, `date`, `one_word`, `short_phrase`, `notes`.

### reminders
`owner_id`, `type`, `title`, `due_at`, `completed`, `related_entity_type`, `related_entity_id`, `notes`.

## Relaciones críticas
- `students 1:N student_packages`.
- `student_packages 1:N payments`.
- `payments 0..1:1 financial_transactions`.
- `goals 1:N goal_milestones`.
- `budgets N:1 financial_categories`.
- `financial_transactions N:1 financial_categories`.
- `financial_transactions N:1 financial_accounts`.
- Todas las relaciones incluyen validación de propietario para evitar referencias cruzadas entre usuarios.

## Decisiones pendientes
1. Definir tipos exactos de cuenta (efectivo, banco, tarjeta, inversión, préstamo, etc.) antes de Fase 3.
2. Definir si `health_records` será una tabla histórica de mediciones o un perfil + mediciones separadas; para el MVP se recomienda separar mediciones repetibles de datos de perfil.
3. Definir política de almacenamiento de comprobantes en Supabase Storage antes de habilitar uploads.
4. Definir estrategia de backup fuera de Supabase antes de considerar el MVP terminado.
