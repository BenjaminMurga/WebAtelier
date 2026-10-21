# Sistema de Evaluación de Calidad (18 Dimensiones) y Rechazo Automático

## 1. Honestidad en la Validación (Comparación Virtual vs. Real)
Siguiendo el protocolo de auditoría donde se contrasta el registro del sistema virtual contra la revisión física real para detectar discrepancias, **nunca inventes puntuaciones de Lighthouse ni métricas de rendimiento no medidas**. Documenta qué validaciones se comprobaron estáticamente en el código y cuáles requieren medición en el servidor de destino.

## 2. Las 18 Dimensiones Verificables
1. **Calidad estética y dirección de arte:** Uso intencionado del espacio negativo y equilibrio visual.
2. **Identidad visual y originalidad:** Personalidad propia diferenciada de competidores homogéneos.
3. **Cumplimiento Anti-AI Design:** Cero degradados en titulares, cero efectos neón, cero blobs y cero emojis como iconografía.
4. **Tipografía y jerarquía:** Escala fluida, colores sólidos y legibilidad editorial.
5. **Usabilidad (UX):** Interacciones naturales sin pedir "doble clic" y 100% de textos en el idioma del sitio sin cadenas residuales en inglés.
6. **Diseño responsive:** Adaptación perfecta sin duplicar menús en el DOM.
7. **Calidad de animaciones e interacciones:** Fluidez a 60fps y respeto a `prefers-reduced-motion`.
8. **Integración de experiencias 3D:** Carga diferida, control de memoria VRAM y *fallback* estático.
9. **Rendimiento:** Activos optimizados y ausencia de iframes rotos o bloqueantes.
10. **Accesibilidad:** Cumplimiento WCAG 2.2 AA, enlace `Ir al contenido` y cero enlaces `javascript:void(0)` vacíos.
11. **SEO:** Jerarquía H1–H6 sin saltos y taxonomías sin etiquetas duplicadas.
12. **AEO:** Titulares en formato de pregunta, resúmenes ejecutivos y tablas comparativas claras.
13. **GEO:** Entidades enlazadas con Wikidata, referencias oficiales numeradas y sellos de transparencia editorial.
14. **Conversiones (CRO):** Llamados a la acción claros y formularios sin fricción.
15. **Seguridad:** Ocultación de rutas `/wp-login.php` expuestas y sanitización de salidas.
16. **Mantenibilidad:** Ausencia de tokens PHP sin procesar (`%d`) o líneas de `ads.txt` impresas en el layout.
17. **Compatibilidad con WordPress:** Uso correcto de `theme.json` y edición limpia por bloques.
18. **Coherencia con las fuentes y requisitos:** Resolución simultánea de todas las dimensiones del proyecto.

## 3. Criterios de Rechazo Automático
Rechazar y rediseñar inmediatamente cualquier entrega que:
- Utilice degradados o `background-clip: text` en titulares `H1–H6`.
- Aplique efectos neón, fondos de blobs difuminados o emojis como iconografía.
- Presente menús duplicados en el DOM, textos de plantilla en otro idioma (`Welcome, Login to your account`, `type here...`, `No Result`) o tokens residuales (`%d`, `ads.txt` en el body).
- Incumpla la jerarquía H1–H6, la accesibilidad por teclado o los requisitos explícitos del usuario.
