# Módulo Crítico Anti-AI Design: Prohibiciones y Protocolo de Auditoría

## 1. Regla Central
La Skill puede emplear inteligencia artificial en el flujo de trabajo (asistencia de código, síntesis de datos, generación de borradores), pero **el diseño resultante jamás debe parecer generado por una herramienta automática ni repetir plantillas clónicas**.

El aspecto "diseñado por IA" surge de la agregación estadística hacia el promedio: composiciones centradas previsibles, ausencia de decisiones asimétricas audaces, miedo al contraste tipográfico sólido y saturación de efectos cosméticos (gradientes violeta/cian, halos neón y transparencias).

---

## 2. Catálogo de Prohibiciones Visuales y Alternativas Profesionales

| Antipatrón Típico de IA | Motivo del Rechazo Inmediato | Alternativa Profesional Obligatoria |
| :--- | :--- | :--- |
| **1. Titulares con degradados** (`linear-gradient`, `radial-gradient` en texto) | Es la señal número uno de diseño automatizado superficial. Destruye la legibilidad y la seriedad editorial. | Color sólido de alto contraste (`#1D1D1F` sobre claro, `#F5F5F7` sobre oscuro) con *tracking* negativo ajustado (`-0.03em`). |
| **2. Recorte de fondo en texto** (`background-clip: text` + `transparent`) | Falso intento de sofisticación que falla en modos de alto contraste y resta autoridad. | Construir impacto mediante tamaño, peso visual (*font-weight: 600–700*) y escala matemática fluida con `clamp()`. |
| **3. Palabras individuales coloreadas en neón** | Patrón publicitario gastado para forzar atención artificial en una sola palabra. | Uso de cursiva tipográfica de contraste, cambio de peso o encuadre conceptual en el texto. |
| **4. Hero centrado clónico** (Título central + subtítulo genérico + 2 botones brillantes) | Estructura repetida mecánicamente por generadores de landing pages sin considerar la marca. | Composición asimétrica inspirada en diseño editorial: texto alineado a la izquierda con masa visual, elementos interactivos tangibles y espacio negativo. |
| **5. Fondos con esferas o blobs difuminados** (`filter: blur(80px)`) | Efecto de relleno barato para disimular la falta de dirección de arte o contenido visual de calidad. | Fondos limpios estructurados con jerarquía tonal de superficies (`#FBFBFD` vs `#F5F5F7`) y bordes *hairline* de 1px. |
| **6. Repetición mecánica de 3 tarjetas idénticas** | Solución comodín que trata información de distinta jerarquía como si tuviera idéntica relevancia. | Bento Grids asimétricos donde la tarjeta principal ocupa 8 columnas y las secundarias 4 o 6 columnas según su valor. |
| **7. Emojis como iconografía** (`🚀`, `✨`, `💡`, `✅`) | Empobrece la interfaz y le da apariencia de mensaje informal o borrador no profesional. | Set coherente de iconos vectoriales SVG inline diseñados con grosor de trazo uniforme (1.5px / 2px). |
| **8. Glassmorphism indiscriminado** (`backdrop-filter` en todas partes sin motivo) | Sobrecarga de composición y rendimiento sin propósito espacial o jerárquico. | Reservar materiales translúcidos exclusivamente para capas flotantes de navegación o diálogos modales. |
| **9. Microcopy genérico de IA** (*"Revoluciona tu flujo con IA"* o *"Impulsa tu negocio"*) | Frases vacías de significado que no comunican la propuesta de valor real del cliente. | Redacción editorial precisa, concreta y respaldada por datos cuantitativos verificables. |

---

## 3. Especificación Técnica de Guardarraíles CSS

Para garantizar que ningún titular o bloque Gutenberg viole estas reglas de forma accidental o mediante plugins de terceros, se inyectan las siguientes reglas de blindaje en `styles/anti-ai-reset-and-tokens.css`:

```css
/* Blindaje estricto contra estéticas de IA en titulares */
h1, h2, h3, h4, h5, h6,
.wp-block-heading,
.editorial-heading {
  color: var(--ink-primary);
  background-image: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: currentColor !important;
  text-shadow: none !important;
  text-wrap: balance;
  letter-spacing: -0.025em;
}

/* Supresión de efectos glow y resplandores artificiales */
*, *::before, *::after {
  box-shadow: none; /* Las sombras deben ser declaradas intencionalmente con tokens específicos */
}
```

---

## 4. Protocolo de Auditoría Anti-AI (Fase 9 del Flujo Operativo)

Antes de entregar cualquier diseño, maquetación o desarrollo, la Skill debe ejecutar obligatoriamente esta lista de verificación:

1. **Revisión Automatizada del DOM:**
   Ejecutar `scripts/anti-ai-dom-auditor.js` sobre el documento renderizado para detectar cualquier infracción bloqueante (`CRITICAL_REJECT`).
2. **Prueba del Espejo de Plantilla:**
   Preguntarse de forma crítica: *¿Podría este diseño pertenecer a una plantilla predeterminada de Framer, Webflow o un generador automático de landing pages?* Si la respuesta es afirmativa, rediseñar inmediatamente la composición y la dirección de arte.
3. **Comprobación de Jerarquía Tipográfica Sólida:**
   Verificar que cada titular comunique autoridad mediante su escala y peso, sin depender de trucos cromáticos ni degradados.
4. **Verificación de Iconografía Profesional:**
   Confirmar que el 100% de los elementos visuales de apoyo sean iconos vectoriales SVG limpios y consistentes.
