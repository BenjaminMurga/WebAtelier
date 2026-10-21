# Estándar Mobile-Native: Sensación de Aplicación Instalada en Teléfonos

## 1. Filosofía de Ingeniería Mobile-First
Un sitio web moderno no debe sentirse como una página pesada encerrada en un navegador móvil; debe comportarse con la inmediatez, fluidez y ergonomía de una **aplicación nativa de iOS o Android**.

La mayoría de los reportes donde una interfaz se siente "torpe" en el teléfono no son fallas de diseño visual, sino fricciones de la capa de plataforma: retardos táctiles de 300ms, destellos grises al tocar botones, saltos de viewport con la barra de Safari o zooms forzados al escribir en formularios.

---

## 2. Matriz de Síntomas Móviles y Soluciones Obligatorias

| Defecto Común en Móvil | Causa Técnica | Solución Canónica WebAtelier |
| :--- | :--- | :--- |
| **Hover pegado (*Sticky Hover*)** | En pantallas táctiles no hay cursor; el navegador simula un hover en el primer toque y lo deja activo. | Encapsular todo `:hover` dentro de `@media (hover: hover) and (pointer: fine)`. |
| **Parpadeo gris al pulsar (*Tap Flash*)** | WebKit/Blink añade un resaltado gris semitransparente predeterminado en cada toque. | Inyectar `-webkit-tap-highlight-color: transparent;` en todos los controles interactivos. |
| **Salto de viewport (Bug del `100vh`)** | La barra de navegación de Safari/Chrome se expande y colapsa, cortando el fondo. | Utilizar `100dvh` (*Dynamic Viewport Height*) para la app y `100svh` para el hero. |
| **Zoom forzado al tocar inputs** | iOS Safari fuerza un zoom automático si un `<input>` o `<textarea>` tiene menos de 16px. | Garantizar `font-size: 16px` o `1rem` mínimo en todos los campos de formulario. |
| **Retardo táctil (*Tap Lag*)** | El navegador espera 300ms para comprobar si el usuario hará un doble toque. | Declarar `touch-action: manipulation;` en botones, enlaces y tarjetas interactivas. |
| **Pull-to-refresh secuestra el scroll** | Al arrastrar hacia abajo un modal o drawer, el navegador recarga toda la página. | Aplicar `overscroll-behavior-y: contain;` (o `none`) en el contenedor del drawer. |
| **Contenido tapado por el Notch / Dynamic Island** | El área segura de la pantalla del iPhone no está declarada en la cabecera. | `<meta name="viewport" content="..., viewport-fit=cover">` y `padding-top: env(safe-area-inset-top)`. |
| **Selección accidental de texto en botones** | Al pulsar prolongadamente un botón, el sistema operativo selecciona el texto azul. | Aplicar `user-select: none; -webkit-user-select: none;` en botones y enlaces. |
| **Carrusel bloquea el scroll vertical** | Los gestos horizontales capturan indebidamente los eventos táctiles verticales. | Declarar `touch-action: pan-y;` en la superficie del carrusel o slider. |

---

## 3. Implementación Canónica en Código CSS

Las siguientes reglas están integradas en la arquitectura base de WebAtelier:

```css
/* 1. Viewport Dinámico y Reseteo Táctil Global */
html {
  min-height: 100dvh;
  -webkit-tap-highlight-color: transparent;
}

body {
  min-height: 100dvh;
  /* Respeta el área segura del Notch y la barra inferior de gestos de iOS */
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

/* 2. Botones con Ergonomía Táctil y Respuesta Inmediata */
button,
a,
.btn,
.interactive-chip {
  touch-action: manipulation; /* Elimina retardo de 300ms */
  user-select: none;          /* Evita selección accidental al mantener presionado */
  -webkit-user-select: none;
}

/* 3. Eliminación de Sticky Hover en Teléfonos */
@media (hover: hover) and (pointer: fine) {
  /* Solo dispositivos con cursor preciso (ratón o trackpad) activan el hover */
  .btn-primary:hover {
    background-color: var(--accent-hover);
    transform: translateY(-1px);
  }
}

/* 4. Prevención de Zoom Indeseado en Formularios de iOS */
input,
select,
textarea {
  font-size: 16px !important; /* Nunca menor a 16px en móvil */
}

/* 5. Aislamiento de Scroll en Drawers y Modales */
.mobile-drawer,
.modal-overlay {
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}
```

---

## 4. Reglas No Negociables
1. **Prohibición de Bloquear el Zoom (`user-scalable=no`):** Desactivar el escalado con `maximum-scale=1` o `user-scalable=no` es una falla grave de accesibilidad (WCAG 2.2). El zoom se evita fijando los inputs a 16px, jamás bloqueando al usuario.
2. **Capacidad sobre Dispositivo:** Utiliza siempre `@media (hover: hover)` en lugar de adivinar el dispositivo mediante JavaScript o User-Agent. Un iPad con teclado y trackpad tiene hover; un teléfono no.
3. **Zonas de Contacto Táctil Mínimas:** Todo control interactivo debe tener un área táctil mínima de **44×44 px**.
