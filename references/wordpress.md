# Arquitectura, Desarrollo y Gobernanza en WordPress

## 1. Selección de Arquitectura según el Proyecto

La Skill evalúa y selecciona la arquitectura adecuada sin imponer soluciones innecesariamente complejas:

```text
¿El proyecto requiere transiciones WebGL/3D continuas entre rutas?
├── SÍ ──► WordPress Headless (WPGraphQL + Next.js / Astro)
└── NO ──► ¿Requiere edición visual total por clientes no técnicos?
           ├── SÍ ──► Block Themes Nativos (Full Site Editing + theme.json v3)
           └── NO ──► Tema Híbrido (Plantillas PHP + Bloques Gutenberg a Medida)
```

---

## 2. Block Themes Nativos (Gutenberg + FSE)

Los temas de bloques representan la forma moderna, modular y libre de deuda técnica de construir sobre WordPress:

### 2.1 Estructura Estándar de Archivos del Tema
```text
mi-tema-premium/
├── configs/
│   └── theme.json             # Tokens, paleta sólida y guardarraíles
├── parts/
│   ├── header.html            # Cabecera única semántica
│   └── footer.html            # Pie de página limpio de créditos genéricos
├── patterns/
│   ├── bento-grid.php         # Patrón editorial de tarjetas Bento
│   └── hero-editorial.php     # Hero con tipografía sólida
├── templates/
│   ├── index.html             # Bucle principal de entradas
│   ├── single.html            # Vista de artículo con microdata AEO
│   └── page.html              # Plantilla base de páginas
├── functions.php              # Registro de patrones y soporte
└── style.css                  # Metadatos del tema y reseteo
```

### 2.2 Registro de Patrones de Bloques (Block Patterns) en PHP
```php
<?php
/**
 * Registra patrones editoriales personalizados para Gutenberg.
 */
add_action('init', function () {
    register_block_pattern(
        'apple-wp/bento-editorial',
        [
            'title'       => __('Grilla Bento Editorial', 'apple-wp'),
            'description' => __('Estructura asimétrica de 12 columnas inspirada en Apple Design', 'apple-wp'),
            'categories'  => ['featured', 'columns'],
            'content'     => '<!-- wp:group {"className":"bento-grid","layout":{"type":"default"}} -->
                <div class="wp-block-group bento-grid">
                    <!-- wp:group {"className":"bento-item bento-item--hero"} -->
                    <div class="wp-block-group bento-item bento-item--hero">
                        <!-- wp:heading {"level":2,"className":"editorial-heading"} -->
                        <h2 class="wp-block-heading editorial-heading">Precisión técnica sin concesiones</h2>
                        <!-- /wp:heading -->
                        <!-- wp:paragraph -->
                        <p>Diseño concebido para destacar el valor real del producto con máxima claridad visual.</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
            <!-- /wp:group -->',
        ]
    );
});
```

---

## 3. Desarrollo de Bloques Personalizados e Interactivity API

Para interfaces que demandan interacción reactiva sin recargar la página (selectores de vista, filtros instantáneos o calculadoras), se utiliza la **WordPress Interactivity API** nativa (disponible desde WP 6.5+):

### 3.1 Definición de `block.json` (Schema v3)
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "apple-wp/view-controller",
  "version": "1.0.0",
  "title": "Controlador de Apariencia de Lectura",
  "category": "widgets",
  "supports": {
    "interactivity": true
  },
  "editorScript": "file:./index.js",
  "render": "file:./render.php",
  "style": "file:./style.css"
}
```

### 3.2 Renderizado PHP con Directivas Reactivas
```php
<?php
/**
 * render.php - Renderizado del bloque con soporte Interactivity API
 */
?>
<div 
  data-wp-interactive="appleWpReader" 
  data-wp-context='{ "fontSize": "standard", "theme": "auto" }'
  class="apple-reader-controls"
>
  <button 
    type="button"
    class="reader-btn"
    data-wp-on--click="actions.toggleFontSize"
    data-wp-bind--aria-pressed="state.isLargeFont"
  >
    <?php esc_html_e('Cambiar Tamaño de Texto', 'apple-wp'); ?>
  </button>
</div>
```

---

## 4. Reglas de Higiene Técnica y Eliminación de Deuda Técnica de Plantillas

A partir de los errores reales documentados en los portales WordPress analizados, todo desarrollo debe cumplir obligatoriamente:

1. **Cero Duplicación de Menús en el DOM:** Prohibido renderizar dos listas idénticas de navegación en el HTML (una para escritorio y otra para móvil). Se debe usar un único `<nav id="site-navigation" aria-label="Navegación principal">` con CSS media queries para la adaptación visual responsive.
2. **Localización 100% Coherente (i18n):**
   * Toda cadena visible en plantillas debe estar envuelta en funciones de internacionalización (`__('Texto', 'dominio')`, `_e('Texto', 'dominio')`).
   * Prohibido dejar textos residuales en inglés como `"Welcome, Login to your account"`, `"type here... Buscar"`, `"No Result"` o `"View All Result"`.
3. **Limpieza de Tokens y Filtraciones Técnicas:**
   * Garantizar que archivos de configuración como `ads.txt` jamás se inyecten accidentalmente dentro del `<body>` visible.
   * Evitar marcadores de formato de PHP sin procesar (`%d`, `%s`) renderizados en el pie de página.
4. **Saneamiento y Escape Estricto:**
   ```php
   // Regla obligatoria: nunca imprimir variables sin escape
   echo esc_html($titulo);
   echo esc_attr($id_elemento);
   echo esc_url($enlace_canonico);
   echo wp_kses_post($contenido_editorial);
   ```
5. **Iconografía SVG Inline en lugar de Icon Fonts Frágiles:**
   * Reemplazar librerías de fuentes de iconos (FontAwesome, Dashicons en el frontend público) por SVGs inline para evitar caracteres rotos (``) ante fallos de red.
6. **Eliminación de Créditos Genéricos:**
   * Remover leyendas automáticas como `"Tema por: Theme Horse"` o `"Funciona gracias a WordPress"`.
