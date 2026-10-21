# Sistema Profesional de Diseño: Tokens Semánticos, Regla 60-30-10 y Contraste WCAG

## 1. Contrato de Tokens Semánticos y Parejas Inseparables

Para evitar que los agentes improvisen colores hexadecimales o generen combinaciones ilegibles (como texto gris sobre fondo negro), el sistema establece **pares de tokens semánticos** donde el color del texto está matemáticamente ligado al fondo de su contenedor:

```css
:root {
  /* ==========================================================================
     1.1 Fondos y Superficies (Neutros Estables)
     ========================================================================== */
  --bg-main: #fbfbfd;           /* 60% Dominante: Fondo de página claro */
  --bg-surface: #f5f5f7;        /* 30% Secundario: Tarjetas y contenedores */
  --bg-surface-elevated: #ffffff; /* Superficie en primer plano */
  --bg-overlay: rgba(255, 255, 255, 0.75);

  /* ==========================================================================
     1.2 Parejas Semánticas de Texto (Vinculadas a sus fondos)
     ========================================================================== */
  --text-primary: #1d1d1f;      /* Contraste > 12:1 sobre --bg-main */
  --text-secondary: #515154;    /* Contraste > 5.5:1 (WCAG AA superado) */
  --text-tertiary: #86868b;     /* Solo metadatos y etiquetas secundarias */

  /* ==========================================================================
     1.3 Color de Acento Único (10% de la Composición)
     ========================================================================== */
  --accent: #0066cc;            /* Botones primarios, enlaces e interacción */
  --accent-hover: #0077ed;
  --accent-text: #ffffff;       /* Texto obligatorio sobre --accent */

  /* ==========================================================================
     1.4 Bordes y Separaciones Hairline
     ========================================================================== */
  --border-hairline: rgba(29, 29, 31, 0.08);

  /* ==========================================================================
     1.5 Ritmo Modular de Espaciado (Base 4px / 8px)
     ========================================================================== */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* ==========================================================================
     1.6 Escala Tipográfica Fluida Matemática con clamp()
     ========================================================================== */
  --font-display: clamp(2.5rem, 5vw + 1rem, 4.25rem);    /* H1 */
  --font-h2:      clamp(1.875rem, 3vw + 0.75rem, 2.75rem); /* H2 */
  --font-h3:      clamp(1.375rem, 1.5vw + 0.75rem, 1.75rem); /* H3 */
  --font-lead:    clamp(1.1875rem, 0.8vw + 0.9rem, 1.375rem);
  --font-body:    clamp(1rem, 0.4vw + 0.9rem, 1.0625rem);
  --font-caption: 0.8125rem;

  /* Geometría de Radios */
  --radius-outer: 24px;
  --radius-inner: calc(var(--radius-outer) - var(--space-4));
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-main: #000000;           /* Fondo negro absoluto Apple */
    --bg-surface: #111113;        /* Superficie oscura profunda */
    --bg-surface-elevated: #1d1d1f;
    --bg-overlay: rgba(29, 29, 31, 0.78);

    --text-primary: #f5f5f7;      /* Blanco roto de alto contraste */
    --text-secondary: #a1a1a6;
    --text-tertiary: #6e6e73;

    --accent: #2997ff;            /* Azul vibrante accesible en modo oscuro */
    --accent-hover: #47a6ff;
    --accent-text: #ffffff;

    --border-hairline: rgba(245, 245, 247, 0.12);
  }
}
```

---

## 2. Regla Cromática Global 60-30-10

Para garantizar que el sitio mantenga una personalidad consistente de principio a fin, el agente debe aplicar la regla 60-30-10 en cada página:

1. **60% Dominante:** Fondos unificados con `--bg-main` que proporcionan la atmósfera limpia y aireada.
2. **30% Secundario:** Tarjetas, grillas Bento, barras de navegación y estructuras con `--bg-surface`.
3. **10% Acento:** Reservado **exclusivamente** para botones de llamada a la acción primarios, enlaces activos e indicadores de estado interactivos con `--accent`. Prohibido usar `--accent` como fondo de secciones enteras.

---

## 3. Ley de Contraste y Prohibición de Colores Hardcodeados

1. **Prohibición de Valores Hardcodeados:**
   Queda terminantemente prohibido usar códigos hexadecimales directos (`color: #fff`, `background: #000`) dentro de las reglas de los componentes. Todo elemento debe consumir los tokens semánticos del sistema.
2. **Cumplimiento WCAG 2.2 Nivel AA:**
   * Texto normal: Relación de contraste mínima de **4.5:1** respecto a su superficie contenedora.
   * Texto grande ($\ge 24\text{px}$ o $\ge 18.5\text{px}$ negrita): Contraste mínimo de **3:1**.
   * Controles interactivos y bordes de formulario: Contraste mínimo de **3:1** contra el fondo adyacente.

---

## 4. Controles de Preferencia de Lectura (Inspirados en Wikipedia)

Para portales de contenido extenso o documentación técnica, la interfaz debe ofrecer selectores accesibles de apariencia:
* Selector de tamaño de texto (`small`, `standard`, `large`).
* Selector de ancho de contenido (`standard` [68ch] vs `wide` [90ch]).
* Selector de esquema cromático (`auto`, `light`, `dark`).
