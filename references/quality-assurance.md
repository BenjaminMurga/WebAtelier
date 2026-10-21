# Sistema de Evaluación de Calidad (18 Dimensiones) y Rechazo Automático

## 1. Metodología de Validación Real vs. Virtual
Inspirado en el protocolo de control de calidad donde se contrasta el registro virtual contra la evidencia física real para detectar discrepancias:
* **Prohibición de Inventar Métricas:** Queda prohibido inventar puntuaciones de Lighthouse, tiempos de milisegundos o porcentajes de aprobación no medidos.
* **Separación de Estados:** La Skill debe clasificar sus resultados en dos columnas:
  1. *Validaciones Estáticas Comprobadas:* Sintaxis, reglas CSS, ausencia de degradados, DOM semántico, enlaces válidos y esquemas JSON-LD.
  2. *Mediciones Pendientes en Servidor Real:* LCP en red real, métricas con CDN activa y auditoría de rastreo en Google Search Console.

---

## 2. Rúbrica Detallada de las 18 Dimensiones

| Dimensión | Criterio de Aprobación | Nivel de Riesgo si Falla |
| :--- | :--- | :---: |
| **1. Calidad Estética** | Espacio negativo calibrado, ausencia de ruidos y proporciones armónicas. | MEDIO |
| **2. Originalidad de Marca** | Identidad visual única; no parece clon de otra empresa o plantilla comercial. | ALTO |
| **3. Cumplimiento Anti-AI** | Cero degradados en H1–H6, cero neón/glow, cero blobs y cero emojis como iconos. | **CRITICAL_REJECT** |
| **4. Tipografía y Jerarquía** | Escala fluida con `clamp()`, colores sólidos y legibilidad editorial impecable. | ALTO |
| **5. Usabilidad (UX)** | Interacciones naturales (cero "doble clic") y 100% de textos localizados en español. | ALTO |
| **6. Diseño Responsive** | Cero scroll horizontal no deseado y menú único sin duplicar listas en el DOM. | ALTO |
| **7. Calidad de Animaciones** | Movimiento fluido a 60fps y respeto irrenunciable a `prefers-reduced-motion`. | ALTO |
| **8. Integración 3D** | Liberación de memoria VRAM implementada (`dispose`), pausa fuera de pantalla y fallback estático. | ALTO |
| **9. Rendimiento** | Cero iframes de vídeo rotos, uso de fachadas (*facade pattern*) y compresión WebP/AVIF. | ALTO |
| **10. Accesibilidad** | Cumplimiento WCAG 2.2 AA, enlace de salto `skip-link` y cero enlaces `javascript:void(0)`. | **CRITICAL_REJECT** |
| **11. SEO Semántico** | Jerarquía secuencial H1–H6 sin saltos, URLs canónicas y metadatos completos. | ALTO |
| **12. AEO** | Encabezados en formato de pregunta, resumen ejecutivo verificado y tablas comparativas. | MEDIO |
| **13. GEO** | Entidades enlazadas con Wikidata (`sameAs`), bibliografía con enlaces oficiales y autoría clara. | MEDIO |
| **14. Conversiones (CRO)** | Formularios claros, botones de acción visibles y ausencia de popups agresivos con cuenta atrás. | MEDIO |
| **15. Seguridad** | Rutas `/wp-login.php` ocultas en enlaces públicos y sanitización de salidas. | ALTO |
| **16. Mantenibilidad** | Código limpio, cero tokens PHP sin procesar (`%d`) y cero líneas de `ads.txt` en el DOM. | ALTO |
| **17. Compatibilidad WordPress** | Bloques compatibles con FSE, `theme.json` v3 y componentes desacoplados. | ALTO |
| **18. Coherencia con Requisitos** | Cumplimiento estricto de todas las directivas dadas por el usuario. | **CRITICAL_REJECT** |

---

## 3. Criterios Bloqueantes de Rechazo Automático (CRITICAL_REJECT)

Cualquier entrega que incurra en uno de los siguientes fallos **no será aprobada ni entregada** hasta su corrección total:
1. **Presencia de Degradados en Titulares:** Uso de `background-clip: text` o gradientes cromáticos en `H1`, `H2`, `H3`, `H4`, `H5` o `H6`.
2. **Uso de Emojis como Iconografía:** Reemplazar iconos vectoriales por emojis (`📊`, `🚀`, `✨`) en titulares o tarjetas principales.
3. **Bloqueo de Accesibilidad:** Carencia de navegación por teclado, ausencia de foco visible o uso de enlaces vacíos `javascript:void(0)`.
4. **Residuos Críticos de Plantilla:** Menús duplicados en el DOM, cadenas de idioma mezcladas o tokens de formateo PHP impresos en pantalla.
