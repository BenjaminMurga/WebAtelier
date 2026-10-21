# Animaciones Avanzadas, Microinteracciones y Experiencias 3D

## 1. Capacidades y Tecnologías Soportadas
La Skill integra experiencias interactivas avanzadas como recurso narrativo y funcional, subordinadas siempre a la accesibilidad y el rendimiento del usuario:

- **GSAP (GreenSock) y ScrollTrigger:** Para animaciones de desplazamiento cinemático, fijación de elementos (*pinning*), revelación progresiva y secuencias sincronizadas.
- **Three.js / React Three Fiber:** Para visualización tridimensional de productos, escenas interactivas e infografías espaciales.
- **WebGPU / WebGL2:** Con detección automática de capacidades de hardware y alternativa estática garantizada.
- **CSS Scroll-Driven Animations y View Transitions API:** Para transiciones fluidas nativas entre páginas con mínimo consumo de CPU.

---

## 2. Patrón de Producción GSAP con ScrollTrigger y Accesibilidad

Toda implementación de GSAP debe gestionar de forma obligatoria la preferencia de movimiento reducido y la adaptación a dispositivos móviles utilizando `gsap.matchMedia()`:

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initEditorialScrollExperience(containerSelector = '.bento-grid') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const mm = gsap.matchMedia();

  // 1. Condición: Usuario prefiere movimiento reducido
  mm.add('(prefers-reduced-motion: reduce)', () => {
    // Solo desvanecimientos sutiles sin desplazamientos espaciales bruscos
    gsap.set('.bento-item', { opacity: 1, y: 0 });
  });

  // 2. Condición: Escritorio con movimiento habilitado
  mm.add('(min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      }
    });

    tl.from('.bento-item--hero', {
      duration: 0.9,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
    })
    .from('.bento-item:not(.bento-item--hero)', {
      duration: 0.7,
      y: 30,
      opacity: 0,
      stagger: 0.12,
      ease: 'power2.out',
    }, '-=0.5');

    return () => {
      // Limpieza automática al cambiar de breakpoint
      tl.kill();
    };
  });
}
```

---

## 3. Arquitectura Three.js: Detección, Fallback y Prevención de Fugas de Memoria

### 3.1 Detección Progresiva de Capacidades (WebGPU → WebGL → Fallback Estático)
```javascript
export async function detectGraphicsCapabilities() {
  if (navigator.gpu) {
    try {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) return 'webgpu';
    } catch (e) {
      // Fallback a WebGL
    }
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (gl) return 'webgl';

  return 'static-fallback';
}
```

### 3.2 Protocolo Obligatorio de Liberación de Recursos (Dispose Pattern)
En WordPress o aplicaciones web con navegación AJAX/FSE, las escenas 3D no destruidas saturan la memoria VRAM del navegador en pocos minutos. Es obligatorio implementar una función de limpieza exhaustiva:

```javascript
import * as THREE from 'three';

export function disposeThreeScene(scene, renderer) {
  if (!scene) return;

  scene.traverse((object) => {
    if (!object.isMesh) return;

    // 1. Liberar geometrías
    if (object.geometry) {
      object.geometry.dispose();
    }

    // 2. Liberar materiales y texturas asociadas
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => disposeMaterial(mat));
      } else {
        disposeMaterial(object.material);
      }
    }
  });

  // 3. Liberar el renderizador WebGL
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }
}

function disposeMaterial(mat) {
  Object.keys(mat).forEach((prop) => {
    if (mat[prop] && typeof mat[prop].dispose === 'function') {
      mat[prop].dispose();
    }
  });
  mat.dispose();
}
```

### 3.3 Pausa Automática del Renderizado Fuera de Pantalla
```javascript
export function observeCanvasVisibility(canvasElement, renderLoop) {
  let isVisible = false;

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });

  observer.observe(canvasElement);

  function tick() {
    if (isVisible) {
      renderLoop();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return () => observer.disconnect();
}
```

---

## 4. Gestión de Recursos Multimedia y Vídeo
- **Prohibición de Múltiples Iframes de Vídeo Bloqueantes:** Nunca insertar reproductores de YouTube o Vimeo pesados que compitan por el hilo principal o muestren errores de reproducción como se detectó en portales analizados.
- **Uso Obligatorio de Fachadas (*Facade Pattern*):** Cargar una imagen estática ligera WebP con botón de reproducción simulado. El iframe de terceros se inyecta exclusivamente tras la interacción voluntaria del usuario.
