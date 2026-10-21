# Módulo Crítico Anti-AI Design: Prohibiciones y Protocolo de Auditoría

## 1. Regla Central
La Skill puede emplear inteligencia artificial en el flujo de trabajo, pero **el diseño resultante jamás debe parecer generado por una herramienta automática ni repetir plantillas clónicas**.

## 2. Prohibiciones Visuales Estrictas (Criterios de Rechazo Inmediato)
Queda terminantemente prohibido:
1. **Titulares con Degradados:** Crear encabezados `H1`, `H2`, `H3`, `H4`, `H5` o `H6` con degradados de color (`linear-gradient`, `radial-gradient`, `conic-gradient`).
2. **Paleta "IA" en Textos:** Aplicar gradientes azules, violetas, rosas, cian o multicolor a textos.
3. **Recorte de Fondo en Tipografía:** Utilizar `background-clip: text` o `-webkit-background-clip: text` con `color: transparent` para titulares.
4. **Palabras Sueltas Coloreadas Artificialmente:** Resaltar palabras individuales dentro de un `H1` con colores eléctricos o degradados para fingir sofisticación.
5. **Efectos Neón y Glow:** Añadir brillos neón, `text-shadow` luminosos o halos resplandecientes exagerados.
6. **Hero Genérico de IA:** Utilizar la composición clónica de titular multicolor centrado + subtítulo genérico + dos botones brillantes simétricos sobre fondo oscuro con esferas difuminadas.
7. **Fondos de Blobs Difuminados:** Generar esferas o manchas violetas/cian con `filter: blur()` sin justificación conceptual.
8. **Repetición Mecánica de Tarjetas:** Abusar de grillas de 3 tarjetas idénticas y excesivamente redondeadas como solución universal para toda sección.
9. **Glassmorphism o Neomorfismo por Defecto:** Añadir transparencias decorativas sin propósito espacial o jerárquico.
10. **Emojis como Iconografía Profesional:** Utilizar emojis (`📊`, `✅`, `🚀`, `✨`) o símbolos Unicode (`☺`, `＠`) en lugar de iconografía vectorial diseñada a medida.
11. **Efectos de Relleno y Animaciones sin Propósito:** Insertar partículas, brillos o movimientos perpetuos solo para llenar espacio vacío.

## 3. Tratamiento Obligatorio de Títulos (H1–H6)
Todo título debe construir su impacto visual mediante:
- **Colores sólidos** coherentes con la identidad cromática de la marca (`#1D1D1F`, `#F5F5F7`, etc.).
- **Tipografía con carácter**, escala matemática fluida, peso visual, contraste, espaciado (*kerning/tracking*), alineación, ritmo vertical y dirección de arte editorial.

## 4. Auditoría Anti-AI Obligatoria (Fase 9)
Antes de entregar cualquier propuesta:
1. Ejecuta `scripts/anti-ai-dom-auditor.js` y revisa las hojas de estilo contra `styles/anti-ai-reset-and-tokens.css`.
2. Evalúa las señales de diseño genérico (composiciones predecibles, microcopy vacío, falta de identidad de marca) como indicadores de baja calidad de dirección de arte que deben corregirse de inmediato.
3. Si cualquier sección recuerda a una plantilla automática de IA, rediséñala por completo antes de entregar.
