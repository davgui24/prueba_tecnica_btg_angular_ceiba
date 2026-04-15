# BTG Pactual - Gestión de Fondos (Angular)

Esta aplicación es una solución técnica desarrollada en **Angular 19+** para la gestión de fondos de inversión (FPV/FIC). Permite a los usuarios visualizar un catálogo de fondos, realizar suscripciones con validación de saldo y gestionar cancelaciones con un historial de transacciones en tiempo real.

## Características Principales

* **Gestión de Saldo:** Control de saldo disponible con un monto inicial de **COP $500.000**.
* **Suscripción Validada:** Validación de montos mínimos y selección obligatoria del método de notificación (**Email/SMS**) mediante diálogos modales para cumplir con el requerimiento del Punto 5.
* **Cancelación de Participación:** Retorno automático de fondos al saldo disponible tras la cancelación de un fondo activo.
* **Historial de Transacciones:** Registro reactivo durante la sesión de todos los movimientos (suscripciones y cancelaciones).
* **Consumo Asíncrono:** Implementación de servicios Mock con RxJS para simular respuestas de API con estados de carga (`spinner`) y manejo de errores.
* **Diseño Responsivo:** Interfaz construida con **Angular Material**, optimizada para escritorio y dispositivos móviles.

## Stack Tecnológico

* **Framework:** Angular 19 (Componentes Standalone).
* **Gestión de Estado:** Angular Signals (para reactividad de grano fino).
* **UI Library:** Angular Material (Cards, Dialogs, Radio Buttons, SnackBar, Icons).
* **Programación Reactiva:** RxJS para el manejo de flujos asíncronos y servicios.
* **Estilos:** SCSS con Flexbox y CSS Grid.

## Estructura del Directorio

```text
src/app/
├── models/      # Interfaces de TypeScript (Fund, Transaction).
├── services/    # Lógica de negocio (Portfolio) y servicios de datos (Mock API).
├── pages/       # Vistas principales de la aplicación.
│   └── home/
│       ├── home.ts
│       ├── home.html
│       ├── home.scss
│       └── subscribe-dialog.component.ts # Modal para selección de notificación.
├── app.config.ts # Configuración global y proveedores.
└── app.routes.ts # Definición de rutas.


## Descarga, Instalación y Ejecución

### 1. Descarga del Proyecto
Puede obtener el código fuente mediante los siguientes métodos:
- Clonación por Git:
  git clone https://github.com/davgui24/prueba_tecnica_btg_angular_ceiba
- Descarga directa:
  Descargue el archivo comprimido (.zip) desde el repositorio y descomprímalo en su equipo.

### 2. Instalación de Dependencias
Desde la terminal, acceda a la carpeta raíz del proyecto y ejecute:
npm istall

### 3. Ejecución
Para iniciar la aplicación en un navegador:
ng server -o