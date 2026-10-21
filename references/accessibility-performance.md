# Accesibilidad (WCAG 2.2), Rendimiento, Seguridad y Mantenibilidad

## 1. Accesibilidad Web (WCAG 2.2 Nivel AA)
- **Navegación Directa y Teclado:** Incluye siempre un enlace de salto `<a class="skip-link" href="#main-content">Ir al contenido</a>` al inicio del DOM, foco visible `:focus-visible` de alto contraste y soporte completo de teclado.
- **Prohibición de Enlaces Vacíos:** Reemplaza cualquier `<a href="javascript:void(0);"></a>` sin texto ni etiqueta accesible por elementos `<button type="button" aria-label="...">` semánticos.
- **Ergonomía Táctil:** Garantiza áreas interactivas mínimas de `44x44 px` en controles táctiles, alineadas con los principios de operación segura en pantallas táctiles profesionales.

## 2. Rendimiento (Core Web Vitals)
- **Presupuesto de Carga:** Optimiza LCP ($\le 2.5\text{ s}$), INP ($\le 200\text{ ms}$) y CLS ($\le 0.1$) mediante imágenes AVIF/WebP con `width`/`height` explícitos, fuentes WOFF2 locales y carga diferida (*facade pattern*) para vídeos de terceros, evitando que múltiples iframes de vídeo fallen o bloqueen la página.

## 3. Seguridad y Privacidad
- **Protección de Endpoints y Datos:** No expongas rutas de autenticación `/wp-login.php` con largos parámetros de redirección en el HTML público ni publiques correos personales en texto plano sin protección contra *scraping*.
- **Cumplimiento Legal:** Enlaza de forma visible a la `Política de Privacidad`, `Términos de Uso` y `Declaración de Cookies`.
