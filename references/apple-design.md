# Filosofía Visual: Principios de Apple Design Aplicados a la Web

## 1. Fundamentos de Dirección de Arte
Apple Design en la web no consiste en emular la interfaz de iOS o macOS, sino en aplicar los principios de ingeniería visual, rigor compositivo y deferencia absoluta hacia el contenido que caracterizan a los productos de Cupertino.

1. **Claridad Visual y Jerarquía Tipográfica:** La tipografía conduce la lectura mediante contrastes nítidos de tamaño, peso y espaciado, utilizando colores sólidos de alto contraste y prescindiendo de decoraciones superfluas.
2. **Deferencia hacia el Contenido:** La interfaz actúa como un marco silencioso y preciso que realza el producto, los datos o la narrativa editorial sin competir mediante efectos estridentes.
3. **Profundidad Espacial y Capas:** Uso sutil de elevación, cambios tonales de superficie (`#FBFBFD` vs `#F5F5F7` en modo claro; `#000000` vs `#1D1D1F` en modo oscuro) y bordes finos de `1px` para organizar información compleja con orden geométrico.

---

## 2. Especificación Matemática: Curvatura Continua y Radios Concéntricos

### 2.1 Curvatura Continua (Superelipse / Squircle)
Las esquinas redondeadas estándar de CSS (`border-radius`) producen discontinuidades de curvatura tangencial en el punto de transición de la recta a la curva. Apple emplea curvas de Lamé con exponente $n \approx 4$ (curvatura continua G2).

En CSS moderno, esto se aproxima combinando `corner-shape: squircle` (donde haya soporte) o mediante la fórmula de radio concéntrico anidado para contenedores con elementos hijos:

$$R_{\text{interno}} = \max(0, \, R_{\text{externo}} - \text{Padding})$$

```css
/* Implementación de Radios Concéntricos Coherentes */
.bento-card {
  --card-padding: 24px;
  --card-radius-outer: 28px;
  
  padding: var(--card-padding);
  border-radius: var(--card-radius-outer);
  background: var(--surface-card);
  border: 1px solid var(--border-hairline);
}

.bento-card__media {
  /* Radio concéntrico exacto: 28px - 24px = 4px (o mínimo proporcional) */
  border-radius: calc(var(--card-radius-outer) - var(--card-padding));
  overflow: hidden;
}
```

---

## 3. Física de Microinteracciones y Transiciones Naturales

El movimiento en interfaces Apple no utiliza curvas predeterminadas mecánicas (`ease-in-out` estándar). Se rige por sistemas de masa, rigidez y amortiguación (*spring physics*):

| Perfil de Movimiento | Rigidez (*Stiffness*) | Amortiguación (*Damping*) | Masa (*Mass*) | Equivalente CSS / Curva Cúbica |
| :--- | :--- | :--- | :--- | :--- |
| **Microinteracción / Pulsación** | 500 | 35 | 0.8 | `cubic-bezier(0.2, 0, 0, 1)` |
| **Aparición de Módulos / Bento** | 300 | 30 | 1.0 | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Transición de Lámina / Modal** | 220 | 28 | 1.2 | `cubic-bezier(0.25, 1, 0.5, 1)` |

```css
:root {
  --ease-apple-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-apple-press: cubic-bezier(0.2, 0, 0, 1);
  --duration-interaction: 240ms;
}

.apple-interactive-button {
  transform: scale(1);
  transition: transform var(--duration-interaction) var(--ease-apple-press),
              background-color 180ms ease;
  will-change: transform;
}

.apple-interactive-button:active {
  transform: scale(0.975);
}
```

---

## 4. Arquitectura de Bento Grids Editoriales

La grilla Bento organiza propositions de valor y contenidos multidimensionales en módulos rectangulares asimétricos con jerarquía evidente:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Módulo Destacado Principal (Hero Feature) */
.bento-item--hero {
  grid-column: span 8;
  min-height: 480px;
}

/* Módulo Lateral de Datos / Métrica */
.bento-item--stat {
  grid-column: span 4;
  min-height: 480px;
}

/* Módulos Secundarios de Soporte */
.bento-item--third {
  grid-column: span 4;
  min-height: 320px;
}

.bento-item--half {
  grid-column: span 6;
  min-height: 380px;
}

@media (max-width: 960px) {
  .bento-item--hero,
  .bento-item--stat,
  .bento-item--third,
  .bento-item--half {
    grid-column: span 12;
    min-height: auto;
  }
}
```

---

## 5. Profundidad, Materiales y Bordes Hairline

Apple utiliza materiales translúcidos (*vibrancy*) combinados con bordes ultra-finos para separar planos en el eje Z sin saturar la vista con sombras pesadas:

```css
.apple-glass-surface {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.04),
              0 1px 2px 0 rgba(0, 0, 0, 0.02);
}

@media (prefers-color-scheme: dark) {
  .apple-glass-surface {
    background: rgba(29, 29, 31, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
  }
}
```

---

## 6. Prohibición de Imitación Parasitaria de Marca
- Queda prohibido el uso de la tipografía comercial propietaria *SF Pro* en sitios de terceros no autorizados por Apple; en su lugar, se utilizan fuentes abiertas de alto rigor tipográfico como **Inter**, **Geist** o **Plus Jakarta Sans**, configuradas con *tracking* y *kerning* milimétricos.
- Queda prohibido copiar logotipos, marcas comerciales o nombres de producto de Apple. Se extrae la disciplina de diseño, no su identidad comercial.
