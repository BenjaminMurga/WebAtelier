# UI Polish, Microinteracciones Invisibles y Transiciones Nativas

## 1. Filosofía de Emil Kowalski: La Ingeniería de Diseño de Alta Gama

En el software y la web contemporánea, donde la mayoría de los productos son "suficientemente buenos", el **pulido artesanal (*craft*)** es el verdadero diferenciador.

1. **El Gusto se Entrena, no es Innato:** No es preferencia subjetiva; es el instinto cultivado de estudiar por qué una interfaz se siente extraordinaria, invertir tiempo en desarmar animaciones y cuidar cada micro-decisión.
2. **Los Detalles Invisibles se Acumulan:** La mayoría de los usuarios no notan conscientemente los detalles individuales. Cuando un menú se expande con inercia elástica o un botón responde instantáneamente a la pulsación, el usuario no piensa en el código; simplemente percibe que la aplicación tiene alma y calidad indiscutible.
3. **La Belleza es una Ventaja Competitiva:** Los clientes eligen herramientas por la experiencia integral. Una interacción hermosa y fluida no es cosmética superflua; es una ventaja competitiva directa.

---

## 2. Rúbrica de Revisión de Código Antes / Después (Formato Obligatorio)

Al auditar o refactorizar cualquier componente interactivo, la Skill debe evaluar las decisiones bajo esta tabla comparativa:

| Antipatrón Débil (Antes) | Estándar WebAtelier (Después) | Razón Técnica de Ingeniería |
| :--- | :--- | :--- |
| `transition: all 300ms ease;` | `transition: transform 200ms ease-out, opacity 180ms ease;` | Especificar propiedades exactas para evitar animar involuntariamente el layout (*reflows*). |
| Elemento aparece de `scale(0)` | Aparece de `scale(0.96); opacity: 0;` | En el mundo físico nada surge de la nada; una escala desde 0.96 transmite profundidad natural. |
| `ease-in` en menús desplegables | `ease-out` o física de resortes (`cubic-bezier`) | `ease-in` se siente perezoso al iniciar; `ease-out` ofrece retroalimentación táctil inmediata. |
| Sin estado `:active` en botones | `:active { transform: scale(0.97); }` | Los botones físicos se hunden al presionarse; los digitales deben simular la misma elasticidad. |
| Popover escala desde el centro | `transform-origin: var(--origin-trigger);` | Los paneles desplegables deben nacer visualmente desde el botón que los invocó. |
| Animación de salida lenta | Salida un 30% más rápida que la entrada | Cuando el usuario cierra un modal, su tarea terminó; la salida debe ser ágil y desvanecerse sin demoras. |

---

## 3. Arquitectura de Componentes de Agencia de Lujo (Awwwards-Tier)

### 3.1 Doble Bisel y Radios Concéntricos (Double-Bezel Architecture)
Ninguna tarjeta o contenedor premium debe colocarse plana contra el fondo; se construye como hardware maquinado de precisión (como una placa de vidrio asentada en una bandeja de aluminio):

```css
.card-outer-shell {
  background: var(--bg-surface);
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-outer); /* ej. 24px */
  padding: var(--space-2);             /* 8px */
}

.card-inner-core {
  background: var(--bg-surface-elevated);
  /* Radio concéntrico matemático exacto: 24px - 8px = 16px */
  border-radius: calc(var(--radius-outer) - var(--space-2));
  padding: var(--space-6);
  border: 1px solid var(--border-hairline-strong);
}
```

### 3.2 Sombras Ambientales por Capas Multi-Stop (*Layered Ambient Shadows*)
Prohibido el uso de sombras negras duras (`box-shadow: 0 4px 20px rgba(0,0,0,0.3)`). Se construyen sombras suaves compuestas por tres capas sutiles:

```css
:root {
  --shadow-layered: 
    0 1px 2px rgba(0, 0, 0, 0.04),         /* Capa 1: Sombra de contacto inmediata */
    0 4px 12px -2px rgba(0, 0, 0, 0.06),   /* Capa 2: Dispersión suave media */
    0 16px 32px -4px rgba(0, 0, 0, 0.08);  /* Capa 3: Atmósfera ambiental profunda */
}
```

### 3.3 Arquitectura de Botón Anidado (*Button-in-Button Island*)
En botones de llamada a la acción primarios con icono de flecha (`→` o `↗`), el icono no va suelto al lado del texto; se aloja en su propia cápsula circular con micro-desplazamiento cinemático:

```html
<a href="#contacto" class="btn-island">
  <span class="btn-text">Iniciar Proyecto</span>
  <span class="btn-icon-bubble" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  </span>
</a>
```

```css
.btn-island {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--accent);
  color: var(--accent-text);
  padding: 8px 10px 8px 24px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  font-weight: 600;
  transition: transform var(--duration-normal) var(--ease-apple-press);
}

.btn-icon-bubble {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--duration-normal) ease;
}

.btn-island:hover .btn-icon-bubble {
  transform: translate(2px, -2px);
}

.btn-island:active {
  transform: scale(0.97);
}
```

---

## 4. Transiciones Nativas entre Páginas (View Transitions API)

WebAtelier implementa transiciones de navegación fluidas utilizando la **View Transitions API** nativa de los navegadores, eliminando librerías pesadas como Barba.js:

```javascript
export function navigateWithViewTransition(url) {
  if (!document.startViewTransition) {
    window.location.href = url;
    return;
  }

  document.startViewTransition(async () => {
    const response = await fetch(url);
    const text = await response.text();
    const newDoc = new DOMParser().parseFromString(text, 'text/html');

    document.title = newDoc.title;
    document.querySelector('main').innerHTML = newDoc.querySelector('main').innerHTML;
  });
}
```

```css
/* Transición nativa suave a nivel de navegador */
::view-transition-old(root) {
  animation: 200ms cubic-bezier(0.2, 0, 0, 1) both fade-out;
}

::view-transition-new(root) {
  animation: 260ms cubic-bezier(0.16, 1, 0.3, 1) both fade-in;
}

@keyframes fade-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.98); }
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
}
```
