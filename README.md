# BTG Pactual - Gestión de Fondos (Angular)

Esta aplicación es una solución técnica desarrollada en **Angular 19+** para la gestión de fondos de inversión (FPV/FIC). Permite a los usuarios visualizar un catálogo de fondos, realizar suscripciones con validación de saldo y gestionar cancelaciones con un historial de transacciones en tiempo real.

## Características Principales

* **Gestión de Saldo:** Control centralizado del saldo disponible con un monto inicial de **COP $500.000**.
* **Suscripción Validada:** Validación de montos mínimos y selección obligatoria del método de notificación (**Email/SMS**) mediante diálogos modales (Cumplimiento de Requerimiento Técnico).
* **Cancelación de Participación:** Retorno automático de fondos al saldo disponible tras la cancelación de un fondo activo.
* **Historial de Transacciones:** Registro reactivo de todos los movimientos (suscripciones y cancelaciones) realizados durante la sesión.
* **Consumo Asíncrono:** Implementación de servicios Mock con RxJS para simular latencia de red, incluyendo estados de carga (`spinner`) y manejo de errores.
* **Diseño Responsivo:** Interfaz construida con **Angular Material**, optimizada para escritorio y dispositivos móviles.

## Stack Tecnológico

* **Framework:** Angular 19 (Componentes Standalone).
* **Gestión de Estado:** Angular Signals (para reactividad de grano fino).
* **UI Library:** Angular Material (Cards, Dialogs, Radio Buttons, SnackBar, Icons).
* **Programación Reactiva:** RxJS para el manejo de flujos asíncronos y conversión a Promesas con `firstValueFrom`.
* **Estilos:** SCSS con Flexbox y CSS Grid.

## Estructura del Proyecto

```text
src/app/
├── models/      # Interfaces de TypeScript (Fund, Transaction).
├── services/    # Lógica de negocio (Portfolio) y Mock API.
├── pages/       # Componentes de página principal.
│   └── home/
│       ├── home.ts
│       ├── home.html
│       ├── home.scss
│       └── subscribe-dialog.component.ts # Modal de selección de notificación.
├── app.config.ts # Proveedores globales y configuración de animaciones.
└── app.routes.ts # Definición de rutas.