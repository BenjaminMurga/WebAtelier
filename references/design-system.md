# Sistema Profesional de Diseño, UX, CRO y Copywriting

## 1. Tokens y Estructura del Sistema de Diseño
Cada proyecto debe contar con un sistema de diseño a medida documentado en variables CSS y `configs/theme.json`:
- **Paleta Cromática Sólida:** Colores de superficie, texto primario/secundario, bordes sutiles y acentos de marca sólidos (cero degradados en tipografía).
- **Escala Tipográfica Fluida:** Definida con `clamp()` para transicionar suavemente entre móvil y escritorio, manteniendo una anchura de lectura óptima (`60ch–72ch`).
- **Controles de Apariencia Centrados en la Persona:** En portales de lectura intensiva o documentación, ofrece controles de preferencia visual: ajuste de tamaño de texto (`Pequeño`, `Estándar`, `Grande`), anchura de columna (`Estándar`, `Ancho`) y esquema de color (`Automático`, `Claro`, `Oscuro`).

## 2. Integración de Disciplinas Complementarias
- **UX/UI:** Diseña flujos e interacciones intuitivas para pantallas táctiles y escritorio, eliminando instrucciones anacrónicas como pedir "doble clic" para abrir un documento o cabeceras de tabla repetidas.
- **CRO (Optimización de Conversiones):** Construye formularios claros, con aviso transparente de privacidad y moderación, evitando popups intrusivos de terceros con cuentas regresivas automáticas.
- **Copywriting y Revisión Editorial:** Redacta mensajes concretos, respaldados por datos reales y revisa la ortografía de toda la interfaz para evitar erratas que dañen la credibilidad de la marca.
