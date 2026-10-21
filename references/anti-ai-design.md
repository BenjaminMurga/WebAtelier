# Módulo Crítico Anti-AI Design: Huellas Digitales, Prohibiciones y Auditoría

## 1. Regla Central de WebAtelier
La inteligencia artificial puede ser utilizada como herramienta de apoyo, pero **el diseño, código y redacción resultantes jamás deben exhibir las huellas digitales que delatan una creación automatizada**.

El aspecto "hecho con IA" no se debe a un único elemento, sino a la acumulación de decisiones predecibles provocadas por la agregación estadística de los modelos: composiciones centradas monótonas, sobredecoración con gradientes y halos, vocabulario inflado y carencia de contexto real.

---

## 2. Catálogo Exhaustivo de Huellas Digitales de IA

### A. Paleta de Colores y Elementos Visuales
1. **Degradados de Morado a Azul:** La combinación clónica por defecto más extendida en héroes y fondos de proyectos de IA. Queda terminantemente prohibida.
2. **Titulares con Texto en Degradado (`background-clip: text`):** Encabezados cuyo texto usa gradientes cromáticos con `color: transparent`. El texto de titulares debe ser siempre sólido (`var(--ink-primary)`).
3. **Efectos de Brillo (*Glow* Neón):** Resplandores y halos luminosos artificiales (`box-shadow: 0 0 25px rgba(...)`) alrededor de botones y contenedores sin justificación óptica.

### B. Patrones Tipográficos Engañosos
4. **Una Sola Palabra en Cursiva o Serif dentro de un H1:** Truco recurrente de generadores para fingir artesanía (*"Diseño <span class="italic-serif">revolucionario</span> para empresas"*). En su lugar, el contraste se construye mediante escala, peso, kerning y ritmo editorial genuino.
5. **Emojis en Encabezados:** Inserción de emojis (🚀, ✨, 🔒, 💡, 📊) en titulares o tarjetas principales. En interfaces premium se utiliza iconografía vectorial SVG diseñada a medida con trazo uniforme (1.5px / 2px).
6. **Uso Excesivo de Guiones Largos (*Em Dashes* `—`):** Saturación del texto con rayas y guiones largos en cada párrafo, vicio característico de los modelos generativos de lenguaje.
7. **Tipografía Única y Plana:** Páginas enteras configuradas en una sola fuente (como Inter por defecto) con variaciones de peso casi imperceptibles, destruyendo la jerarquía visual de lectura.

### C. Componentes y Maquetación Clónica (*SaaS-Card Kit*)
8. **Filas Mecánicas de Tres Tarjetas Idénticas (*Three Icon Boxes*):** Filas de exactamente tres cajas cuadradas idénticas con un icono, un titular y dos líneas de texto. La información real rara vez tiene la misma jerarquía; se deben usar Bento Grids asimétricos con proporciones 8/4 o 6/6.
9. **Insignias o Píldoras Artificiales sobre el H1 (*Eyebrows/Badges*):** Pequeñas píldoras con textos como *"AI-Powered"*, *"New Feature"* o etiquetas en mayúsculas forzadas directamente encima del titular principal.
10. **Cristal Esmerilado Indiscriminado (*Frosted Glass*):** Contenedores con bordes hiper-redondeados, transparencias y sombras grises genéricas aplicadas a todas las secciones sin criterio espacial.
11. **Muestras de Dashboards Falsos:** Paneles de control simulados con barras y bloques de colores primarios simples sin datos reales ni utilidad demostrable.

### D. Copywriting y Contenido Cliché (*AI Slop*)
12. **Vocabulario Relleno de IA:** Prohibición estricta de palabras y frases gastadas:
    * *Inglés:* *"seamless"*, *"robust"*, *"elevate"*, *"empower"*, *"cutting-edge"*, *"game-changer"*, *"delve"*, *"testament"*.
    * *Español:* *"solución integral"*, *"revoluciona tu flujo"*, *"lleva tu negocio al siguiente nivel"*, *"diseño de vanguardia"*.
13. **Textos Abstractos sin Contexto:** Mensajes que no explican con precisión técnica qué hace el producto, cómo funciona, ni aportan datos cuantitativos o contexto específico de la empresa.

### E. Interacciones y Animaciones Artificiales
14. **Efectos que Persiguen al Cursor:** Luces, destellos o partículas que siguen el puntero del ratón por la pantalla, distrayendo la atención del contenido y penalizando la CPU.
15. **Animaciones de Scroll y *Fade-ins* Injustificados:** Elementos que se desvanecen o botones que flotan constantemente sin aportar valor funcional ni narrativo.

### F. Estructura Técnica y Código
16. **Espaciados Inconsistentes y Desiguales:** Márgenes arbitrarios (ej. 24px, 28px, 32px en la misma página). Toda separación debe derivar de un ritmo modular fijo (base 4px/8px: `--space-1` a `--space-16`).
17. **Sopa de Divs (*Div Soup*):** Ausencia de etiquetas semánticas HTML5 reales, anidando docenas de `<div>` sin `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` ni `<footer>`.
18. **Metaetiquetas de Constructores Automáticos:** Huellas en el `<head>` que delatan plataformas automáticas (`<meta name="generator" content="Framer / Wix / 10Web / Durable">`).
19. **Cabeceras Móviles Saturadas y Desbordamiento:** Forzar barras de navegación de escritorio, múltiples botones de texto o selectores horizontales en pantallas móviles (< 880px) provocando que se corten los botones hacia la derecha. Toda cabecera móvil debe usar obligatoriamente un menú de hamburguesa limpio con panel drawer accesible.

---

## 3. Guardarraíles de Código en CSS (`styles/anti-ai-reset-and-tokens.css`)

```css
/* 1. Prohibición estricta de degradados en titulares */
h1, h2, h3, h4, h5, h6,
.wp-block-heading,
.editorial-heading {
  color: var(--text-primary) !important;
  background-image: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: currentColor !important;
  text-shadow: none !important;
  text-wrap: balance;
  letter-spacing: -0.025em;
}

/* 2. Supresión de efectos glow artificiales */
.btn, .card, .bento-item, input, button {
  box-shadow: none; /* Toda sombra debe provenir de un token intencional sutil */
}

/* 3. Prohibición de efectos decorativos que sigan al cursor */
.cursor-follower,
.pointer-glow,
.cursor-trail {
  display: none !important;
}
```

---

## 4. Protocolo de Auditoría Anti-AI (Fase 9 del Flujo Operativo)

Antes de entregar cualquier proyecto, la Skill debe ejecutar la siguiente comprobación:
1. **Inspección de Metadatos:** Confirmar la ausencia de generadores automáticos en `<meta name="generator">`.
2. **Validación Semántica del DOM:** Comprobar que no exista "sopa de divs"; la estructura debe contener `<header>`, `<nav>`, `<main>`, `<section>` y `<footer>`.
3. **Escaneo de Vocabulario y Copy:** Filtrar el texto para erradicar palabras cliché (*AI Slop*).
4. **Verificación de Iconos:** Comprobar que ningún titular contenga emojis como sustitutos de iconos vectoriales.
5. **Auditoría Automatizada:** Ejecutar `node scripts/test-auditor.js` y `scripts/anti-ai-dom-auditor.js` para asegurar cero incidencias bloqueantes (`CRITICAL_REJECT`).
