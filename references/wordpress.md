# Arquitectura, Desarrollo y Gobernanza en WordPress

## 1. Selección de Arquitectura
- **Block Themes Nativos (Gutenberg + Full Site Editing):** Arquitectura estándar para sitios corporativos, editoriales y de producto. Centraliza los Design Tokens en `configs/theme.json` (versión 3), utiliza plantillas HTML de bloques y registra patrones personalizados (*Block Patterns*) para garantizar velocidad y facilidad de edición.
- **Arquitectura Híbrida con Bloques Personalizados:** Uso de bloques dinámicos nativos (`block.json` + Render PHP) e *Interactivity API* cuando se requiere lógica editorial avanzada sin sacrificar el editor de bloques.
- **WordPress Headless (WPGraphQL / REST API + Next.js / Astro):** Indicado cuando el proyecto exige transiciones WebGL/Three.js persistentes entre rutas o integración con múltiples sistemas externos.

## 2. Reglas de Higiene Técnica y Eliminación de Huellas de Plantilla
A partir de los errores reales documentados en las capturas de sitios WordPress analizados, todo desarrollo debe cumplir estas reglas:
1. **Cero Duplicación de Menús en el DOM:** Prohibido renderizar dos listas idénticas de navegación en el HTML (una para escritorio y otra para móvil) como ocurre en temas mal optimizados. Implementa un único `<nav>` semántico y responsive.
2. **Localización 100% Coherente (i18n):** Prohibido dejar cadenas en inglés mezcladas en una interfaz en español como `"Welcome, Login to your account"`, `"Forget password?"`, `"[-] forever Remember me Log In"`, `"type here... Buscar"`, `"No Result"`, `"View All Result"` o botones `"Prev"` / `"Next"`.
3. **Limpieza de Tokens y Archivos Técnicos Filtrados:**
   - Verifica que cadenas de `ads.txt` (`google.com, pub-..., DIRECT, ...`) jamás se impriman en el pie de página visible.
   - Verifica que nunca queden marcadores `printf` de PHP sin procesar como `%d` o `%s` en el HTML renderizado.
4. **Saneamiento de URLs y Enlaces:** Valida que no existan espacios en blanco codificados como `%20` al final de URLs o enlaces `mailto:`, ni erratas en los dominios del menú principal (ej. evitar errores como enlazar a dominios mal escritos o rutas rotas).
5. **Iconografía SVG Inline en lugar de Icon Fonts Frágiles:** Sustituye las fuentes de iconos heredadas que producen caracteres rotos (``) cuando falla la carga del activo por iconos vectoriales SVG inline.
6. **Eliminación de Créditos Genéricos de Tema:** Remueve créditos predeterminados de plantillas masivas (`Tema por: ...`, `Funciona gracias a: WordPress`) para preservar una dirección de arte de primer nivel.
