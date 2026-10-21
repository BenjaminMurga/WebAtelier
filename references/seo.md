# Optimización Integral para Motores de Búsqueda (SEO)

## 1. Arquitectura Semántica y Jerarquía de Encabezados (H1–H6)

La arquitectura de contenidos debe estructurarse como un documento lógico continuo:
1. **Un Único H1 por Página:** Exclusivo para el título central del contenido o propuesta de valor.
2. **Secuencia Estricta sin Saltos:** Prohibido saltar de `H2` a `H4` o degradar titulares a `H5`/`H6` solo por consideraciones estéticas o de tamaño de fuente (error estructural observado en medios digitales analizados).
3. **Uso de Clases CSS para el Tamaño:** El nivel semántico (`H1–H6`) define la jerarquía para los motores de búsqueda; la clase CSS (`.text-headline`, `.text-caption`) define el tamaño visual.

---

## 2. Plantillas JSON-LD de Datos Estructurados (Schema.org)

Todo contenido debe incluir marcado JSON-LD nativo en la cabecera `<head>` para facilitar la indexación y la comprensión de entidades:

### 2.1 Artículo Editorial / Noticia (`NewsArticle` / `Article`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ejemplo.com/analisis-arquitectura-web-premium"
  },
  "headline": "Arquitectura y Dirección de Arte Digital para la Web Moderna",
  "description": "Análisis exhaustivo de principios de diseño premium, integración técnica y erradicación de patrones genéricos de IA.",
  "image": [
    "https://ejemplo.com/wp-content/uploads/2026/portada-16x9.webp",
    "https://ejemplo.com/wp-content/uploads/2026/portada-4x3.webp"
  ],
  "datePublished": "2026-10-21T09:00:00-03:00",
  "dateModified": "2026-10-21T10:30:00-03:00",
  "author": {
    "@type": "Person",
    "name": "Benjamín A. Murga",
    "jobTitle": "Lead Digital Architect",
    "url": "https://ejemplo.com/autor/benjamin-murga"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Benjamin Murga",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ejemplo.com/assets/logo.png"
    }
  }
}
</script>
```

### 2.2 Migas de Pan Semánticas (`BreadcrumbList`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://ejemplo.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ingeniería Web",
      "item": "https://ejemplo.com/ingenieria"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Arquitectura Premium",
      "item": "https://ejemplo.com/ingenieria/arquitectura-premium"
    }
  ]
}
</script>
```

---

## 3. SEO Técnico, Rastreo e Higiene de URLs

1. **URLs Canónicas Absolutas y Autorreferenciales:**
   ```html
   <link rel="canonical" href="https://ejemplo.com/seccion/articulo-original" />
   ```
2. **Prohibición de Enlaces Vacíos y Acortadores Opacos:**
   * Sustituir cualquier `<a href="javascript:void(0);">` por `<button type="button">`.
   * En enlaces internos y botones de compartir, emplear la URL completa del dominio en lugar de acortadores como `tinyurl.com` o redirecciones intermedias.
3. **Higiene de Taxonomías en WordPress:**
   * Prohibir la creación de etiquetas duplicadas provocadas por mayúsculas o plurales (`farmacéuticos`, `Farmacéuticos`, `farmacéutico`). Las taxonomías deben normalizarse automáticamente en minúsculas y singular en la base de datos.
4. **Archivo `robots.txt` Canónico:**
   ```text
   User-agent: *
   Disallow: /wp-admin/
   Allow: /wp-admin/admin-ajax.php
   
   Sitemap: https://ejemplo.com/sitemap_index.xml
   ```
