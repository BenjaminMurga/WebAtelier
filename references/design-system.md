# Sistema Profesional de Diseño, UX, CRO y Copywriting

## 1. Tokens de Diseño en CSS Custom Properties

El sistema de diseño centraliza todos los valores visuales en variables estandarizadas, garantizando coherencia matemática y facilidad de mantenimiento:

```css
:root {
  /* 1.1 Paleta Cromática Sólida (Cero Degradados en Texto) */
  --ink-primary: #1d1d1f;
  --ink-secondary: #515154;
  --ink-tertiary: #86868b;
  --ink-inverted: #f5f5f7;

  --surface-primary: #fbfbfd;
  --surface-secondary: #f5f5f7;
  --surface-card: #ffffff;
  --surface-overlay: rgba(255, 255, 255, 0.8);

  --brand-solid: #0066cc;
  --brand-hover: #0077ed;
  --border-hairline: rgba(29, 29, 31, 0.08);

  /* 1.2 Ritmo Modular de Espaciado (Base 4px/8px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* 1.3 Escala Tipográfica Fluida con clamp() */
  --font-display: clamp(2.5rem, 5vw + 1rem, 4.25rem);    /* H1 */
  --font-h2:      clamp(1.875rem, 3vw + 0.75rem, 2.75rem); /* H2 */
  --font-h3:      clamp(1.375rem, 1.5vw + 0.75rem, 1.75rem); /* H3 */
  --font-lead:    clamp(1.1875rem, 0.8vw + 0.9rem, 1.375rem);
  --font-body:    clamp(1rem, 0.4vw + 0.9rem, 1.0625rem);
  --font-caption: 0.8125rem;

  /* 1.4 Medida Óptima de Lectura Editorial */
  --content-measure: 68ch;
  --content-wide: 1280px;

  /* 1.5 Geometría y Radios Concéntricos */
  --radius-outer: 24px;
  --radius-inner: calc(var(--radius-outer) - var(--space-4));
}

@media (prefers-color-scheme: dark) {
  :root {
    --ink-primary: #f5f5f7;
    --ink-secondary: #a1a1a6;
    --ink-tertiary: #6e6e73;
    --ink-inverted: #1d1d1f;

    --surface-primary: #000000;
    --surface-secondary: #111113;
    --surface-card: #1d1d1f;
    --surface-overlay: rgba(29, 29, 31, 0.8);

    --brand-solid: #2997ff;
    --brand-hover: #47a6ff;
    --border-hairline: rgba(245, 245, 247, 0.12);
  }
}
```

---

## 2. Controles de Preferencia de Lectura (Inspirados en Wikipedia)

Para publicaciones extensas o portales de consulta, la interfaz ofrece al lector controles ergonómicos directos:

```html
<aside class="appearance-controls" aria-label="Ajustes de Lectura">
  <fieldset class="control-group">
    <legend class="sr-only">Tamaño de Texto</legend>
    <button type="button" class="btn-toggle" data-set-font="small">A-</button>
    <button type="button" class="btn-toggle active" data-set-font="standard">A</button>
    <button type="button" class="btn-toggle" data-set-font="large">A+</button>
  </fieldset>

  <fieldset class="control-group">
    <legend class="sr-only">Ancho de Contenido</legend>
    <button type="button" class="btn-toggle active" data-set-width="standard">Estándar</button>
    <button type="button" class="btn-toggle" data-set-width="wide">Ancho</button>
  </fieldset>
</aside>
```

```css
/* Adaptación dinámica según preferencia del lector */
body[data-font-size="small"] { font-size: 92%; }
body[data-font-size="standard"] { font-size: 100%; }
body[data-font-size="large"] { font-size: 112%; }

body[data-content-width="standard"] .editorial-content { max-width: 68ch; }
body[data-content-width="wide"] .editorial-content { max-width: 90ch; }
```

---

## 3. Principios de UX, CRO y Copywriting Editorial

1. **UX Táctil y de Escritorio Coherente:**
   * Garantizar zonas interactivas de al menos `44x44 px`.
   * Eliminar modales intrusivos de terceros con cuentas regresivas forzadas (como temporizadores de 10 segundos).
   * Eliminar instrucciones obsoletas como exigir "doble clic" para abrir elementos en entornos táctiles.
2. **CRO sin Fricción:**
   * Formulario de contacto con etiquetas visibles, validación nativa HTML5, indicador de privacidad y botón de envío claro (`<button type="submit">Enviar Solicitud</button>`).
3. **Copywriting de Alta Credibilidad:**
   * Sustituir generalidades vacías por propuestas de valor concretas.
   * Revisión ortográfica de toda la interfaz para prevenir erratas graves de digitalización que minan la confianza del usuario.
