# Accesibilidad (WCAG 2.2), Rendimiento, Seguridad y Mantenibilidad

## 1. Accesibilidad Web (WCAG 2.2 Nivel AA)

La accesibilidad no es un añadido estético final; se integra en el marcado HTML base desde la primera línea de código:

### 1.1 Enlace de Salto Directo al Contenido (Skip Link)
Todo documento HTML debe incorporar un enlace de navegación accesible como primer elemento del `<body>`:

```html
<a class="skip-link" href="#main-content">Saltar al contenido principal</a>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--ink-primary);
  color: var(--surface-primary);
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 99999;
  text-decoration: none;
  font-weight: 600;
  transition: top 180ms ease;
}

.skip-link:focus-visible {
  top: 16px;
  outline: 3px solid var(--brand-solid);
  outline-offset: 2px;
}
```

### 1.2 Erradicación de Enlaces Vacíos y Elementos No Semánticos
* **Prohibición de `javascript:void(0)`:** Los enlaces `<a>` deben contener una URL válida (`href="https://..."`). Si el elemento dispara una acción en el cliente (abrir modal, alternar menú, pausar vídeo), **debe utilizarse un `<button type="button">` semántico**.
* **Zonas Táctiles:** Controles táctiles con un área mínima garantizada de `44x44 px`.

---

## 2. Presupuesto de Rendimiento y Core Web Vitals

| Métrica | Umbral Óptimo | Estrategia Técnica Implementada |
| :--- | :--- | :--- |
| **LCP** (*Largest Contentful Paint*) | $\le 2.5\text{ s}$ | Hero con `fetchpriority="high"`, compresión AVIF/WebP y precarga de fuente tipográfica principal. |
| **INP** (*Interaction to Next Paint*) | $\le 200\text{ ms}$ | Delegación de eventos, ejecución en el compositor (`transform`/`opacity`) y descarte de scripts síncronos pesados. |
| **CLS** (*Cumulative Layout Shift*) | $\le 0.1$ | Declaración obligatoria de `width`, `height` o `aspect-ratio` en todas las imágenes, vídeos y contenedores multimedia. |

### 2.3 Patrón Fachada (*Facade Pattern*) para Reproductores de Vídeo
Inserta una imagen ligera de portada en lugar del iframe completo de YouTube/Vimeo, ahorrando más de 1.2 MB de JavaScript inicial:

```html
<div class="video-facade" data-video-id="dQw4w9WgXcQ" role="region" aria-label="Reproductor de vídeo">
  <button type="button" class="video-facade__play-btn" aria-label="Reproducir vídeo demostrativo">
    <svg class="play-icon" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor"/>
      <polygon points="10 8 16 12 10 16" fill="#fff"/>
    </svg>
  </button>
  <img 
    src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" 
    alt="Vista previa del vídeo" 
    loading="lazy" 
    width="480" 
    height="360"
  />
</div>
```

```javascript
document.querySelectorAll('.video-facade').forEach((facade) => {
  facade.querySelector('button').addEventListener('click', () => {
    const videoId = facade.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`);
    iframe.setAttribute('title', 'Vídeo reproducible');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');
    facade.innerHTML = '';
    facade.appendChild(iframe);
  });
});
```

---

## 3. Seguridad, Privacidad y Mantenibilidad

1. **Protección de Accesos Administrativos:** No exponer endpoints con parámetros visibles `/wp-login.php?action=...` en el HTML público.
2. **Privacidad y Ofuscación:** No publicar correos electrónicos en texto plano sin protección contra robots de recolección no autorizada.
3. **Mantenibilidad:** Cero código PHP residual impreso en el layout (`%d`, `%s`) ni líneas de archivos de anuncios (`ads.txt`) visibles en la interfaz.
