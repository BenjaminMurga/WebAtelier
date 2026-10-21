# Apple Design + WordPress + Anti-AI Design + SEO/AEO/GEO Skill

Skill modular y reutilizable para agentes de IA y equipos de ingeniería digital. Diseñada para crear, rediseñar, desarrollar y auditar sitios web de altísima calidad combinando la precisión visual de **Apple Design**, la arquitectura moderna de **WordPress (Block Themes / FSE / Headless)**, experiencias interactivas (**GSAP, Three.js, WebGL/WebGPU**), reglas estrictas **Anti-AI Design** y optimización integral **SEO, AEO y GEO**.

## Estructura del Repositorio

- `SKILL.md`: Instrucciones centrales, activadores, jerarquía de prioridades y flujo operativo de 10 fases.
- `references/source-inventory.md`: Inventario documental, trazabilidad y hallazgos empíricos extraídos de las fuentes.
- `references/apple-design.md`: Principios de claridad, deferencia, profundidad, grillas Bento y curvatura continua.
- `references/wordpress.md`: Desarrollo con Block Themes, `theme.json` v3, arquitectura Headless y saneamiento de deuda técnica.
- `references/anti-ai-design.md`: Prohibiciones visuales estrictas (cero degradados en titulares, cero blobs neón, cero emojis como iconografía) y protocolo de auditoría.
- `references/motion-3d.md`: Reglas para GSAP, ScrollTrigger, Three.js, WebGL/WebGPU, rendimiento y `prefers-reduced-motion`.
- `references/seo.md`: SEO técnico, arquitectura semántica H1–H6, Schema.org y Core Web Vitals.
- `references/aeo-geo.md`: Optimización para motores de respuesta (AEO) y motores generativos (GEO).
- `references/design-system.md`: Design tokens, escalas tipográficas fluidas, UX, CRO y copywriting editorial.
- `references/accessibility-performance.md`: Cumplimiento WCAG 2.2 AA/AAA, presupuestos de rendimiento y seguridad.
- `references/quality-assurance.md`: Matriz de evaluación en 18 dimensiones y criterios bloqueantes de rechazo automático.
- `configs/theme.json`: Configuración base para WordPress que bloquea técnicamente los degradados en Gutenberg.
- `styles/anti-ai-reset-and-tokens.css`: Tokens CSS y guardarraíles visuales Anti-AI.
- `scripts/anti-ai-dom-auditor.js`: Auditor ejecutable para validar el DOM contra patrones genéricos de IA y deuda técnica.

## Instalación y Uso

1. Clona este repositorio dentro del directorio de Skills de tu agente o espacio de trabajo.
2. Asegúrate de que el agente cargue `SKILL.md` como punto de entrada y consulte la carpeta `references/` mediante divulgación progresiva.
3. Ejecuta las validaciones locales con:
   ```bash
   npm run audit:syntax
   npm run validate:theme-json
   ```
