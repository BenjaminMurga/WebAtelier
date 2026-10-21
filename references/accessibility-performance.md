# Accesibilidad, Rendimiento y Diseño Adaptable Universal (Móvil, PC y Smart TV)

## 1. Diseño Adaptable Universal: Las Tres Dimensiones de Pantalla

La Skill impone al agente considerar no solo móviles y computadores, sino también la experiencia en televisores inteligentes (**Smart TV / 10-foot UI**):

### 1.1 Móviles y Tabletas (0px – 767px)
* **Estrategia Mobile-First Obligatoria:** Los estilos base se escriben para pantallas compactas y se enriquecen progresivamente mediante `@media (min-width: ...)`.
* **Ergonomía Táctil:** Controles interactivos con un área de contacto mínima garantizada de **44×44 px**.
* **Cero Dependencia de Hover:** Los estados `:hover` son inexistentes en pantallas táctiles; toda información crítica debe ser visible sin requerir el paso del puntero.
* **Navegación:** Barras inferiores (*bottom navigation*) o menús desplegables accesibles.

### 1.2 PC, Laptops y Monitores Panorámicos (1024px – 1440px+)
* **Composición Bidimensional:** Estructura basada en **CSS Grid** dinámico combinado con **Flexbox**:
  ```css
  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-6);
  }
  ```
* **Interacción por Cursor:** Estados `:hover` claros con transiciones naturales y compatibilidad total con teclado físico.

### 1.3 Smart TV / Apple TV / Android TV (1080p y 4K a 3 metros / 10-Foot UI)
* **Navegación Exclusiva por D-Pad (Cruceta de Control Remoto):** En el televisor no existe ratón ni pantalla táctil. Todo elemento interactivo debe contar con un estado de foco explícito y de alto impacto:
  ```css
  /* Estado de foco optimizado para Smart TV y navegación por D-Pad */
  :focus-visible {
    outline: 4px solid var(--accent) !important;
    outline-offset: 4px !important;
    transform: scale(1.05);
    transition: transform 140ms ease;
  }
  ```
* **Escala Visual para 3 Metros de Distancia:**
  ```css
  @media (min-width: 1920px) {
    :root {
      font-size: 120%; /* Aumenta la escala tipográfica global para legibilidad desde el sofá */
    }
  }
  ```
* **Cero Desbordamiento Horizontal:** Prohibido utilizar `overflow-x: hidden` en la etiqueta `<body>` para disimular contenedores mal maquetados que desbordan la pantalla.

---

## 2. Reglas Técnicas No Negociables de Código

1. **Meta Viewport Obligatorio:** Incluir siempre en el `<head>`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. **Unidades Relativas y Fluidas:** Prohibido el uso de anchos fijos en píxeles (`width: 1200px`) en contenedores principales. Emplear `%`, `rem`, `vw`, `fr` o `clamp()`.
3. **Erradicación de la "Sopa de Divs" (*Div Soup*):** Es obligatorio estructurar el documento con etiquetas semánticas HTML5:
   * `<header>` para cabeceras y marcas.
   * `<nav aria-label="...">` para navegación principal única.
   * `<main id="main-content">` para el núcleo del contenido.
   * `<section>` y `<article>` para bloques temáticos con su respectivo encabezado (`H2`/`H3`).
   * `<footer>` para información institucional y legal.
4. **Enlace de Salto Directo (*Skip Link*):**
   ```html
   <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
   ```

---

## 3. Presupuesto de Rendimiento y Core Web Vitals

| Métrica | Umbral Óptimo | Estrategia Técnica Implementada |
| :--- | :--- | :--- |
| **LCP** (*Largest Contentful Paint*) | $\le 2.5\text{ s}$ | Hero con `fetchpriority="high"`, compresión AVIF/WebP y precarga de fuente principal. |
| **INP** (*Interaction to Next Paint*) | $\le 200\text{ ms}$ | Delegación de eventos, ejecución en el compositor (`transform`/`opacity`) y scripts diferidos (`defer`). |
| **CLS** (*Cumulative Layout Shift*) | $\le 0.1$ | Declaración obligatoria de `width`, `height` o `aspect-ratio` en todas las imágenes y vídeos. |

### 3.1 Patrón Fachada (*Facade Pattern*) para Reproductores Multimedia
Nunca incrustar iframes pesados de YouTube o Vimeo de forma directa. Cargar un poster estático y solo instanciar el reproductor cuando el usuario haga clic voluntariamente.
