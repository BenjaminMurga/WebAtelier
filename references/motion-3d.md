# Animaciones Avanzadas, Microinteracciones y Experiencias 3D

## 1. Capacidades y Tecnologías Soportadas
- **Scroll Storytelling y Movimiento UI:** GSAP (`gsap.timeline`), `ScrollTrigger`, CSS Scroll-Driven Animations (`animation-timeline: view()`), Web Animations API y View Transitions API.
- **Experiencias 3D e Inmersivas:** Three.js, React Three Fiber (R3F), WebGL y WebGPU (con detección de soporte y *fallback* automático), SVG interactivo y Canvas 2D.

## 2. Principios de Ingeniería para Animación y 3D
1. **Respeto Obligatorio a `prefers-reduced-motion`:** Toda animación de desplazamiento, *parallax* o rotación 3D debe desactivarse o simplificarse a una transición suave de opacidad cuando el usuario tenga activa la preferencia de movimiento reducido en su sistema operativo.
2. **Ejecución en el Compositor:** Prioriza animar exclusivamente `transform` (`translate3d`, `scale`, `rotate`) y `opacity`. Evita animar propiedades que disparen *layout/reflow* (`top`, `left`, `width`, `height`).
3. **Gestión de Recursos y Lazy Loading Multimedia:**
   - Carga escenas 3D, modelos GLTF/GLB (con compresión Draco/Meshopt y texturas KTX2) y reproductores de vídeo de forma diferida (`IntersectionObserver`).
   - Evita insertar múltiples iframes pesados de vídeo de forma simultánea que fallen al cargar o bloqueen el hilo principal, corrigiendo el antipatrón de múltiples reproductores rotos observado en portales analizados.
4. **Alternativa Funcional Garantizada:** Si WebGL/WebGPU no está disponible o el dispositivo móvil tiene recursos limitados, muestra una imagen estática de alta precisión o secuencia ligera sin perder contenido ni bloquear la navegación.
