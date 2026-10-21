# Animaciones Avanzadas, Microinteracciones y Experiencias 3D Interactivas

## 1. Experiencias 3D en la Web: Del Sitio Pasivo a la Experiencia Inmersiva

A diferencia de un vídeo pre-renderizado o una imagen estática, el 3D interactivo se dibuja **en tiempo real dentro del lienzo del navegador** aprovechando la aceleración por hardware de la GPU:

### Casos de Uso Estratégicos
1. **Configuradores de Producto y E-Commerce:** Examen de objetos en 360°, despiece tridimensional (*exploded view*), alternancia de texturas y materiales en tiempo real.
2. **Scroll Storytelling Inmersivo:** Desplazamiento cinemático donde la cámara espacial avanza, rota y transforma la escena conforme el usuario hace scroll.
3. **Portafolios y Sitios Creativos:** Fondos interactivos con shaders, deformaciones sutiles y microinteracciones físicas tridimensionales.

---

## 2. Pila Tecnológica 3D (Ecosistema y Librerías)

* **WebGL y WebGPU:**
  * **WebGL 2.0:** Estándar maduro de renderizado gráfico por GPU soportado universalmente en navegadores.
  * **WebGPU:** Estándar de nueva generación con menor sobrecarga de CPU y acceso directo a capacidades modernas de cómputo gráfico (con detección progresiva y fallback automático).
* **Librerías de Desarrollo (Three.js y Babylon.js):** Abstraen el complejo cálculo matricial de bajo nivel gestionando escenas, cámaras, iluminación, geometrías y materiales PBR (*Physically Based Rendering*).
* **Frameworks Declarativos (React Three Fiber - R3F):** Integración de Three.js mediante componentes modulares reactivos en ecosistemas React/Next.js/Astro.
* **Herramientas de Diseño Web-First (Spline y Vectary):** Plataformas visuales para modelar escenas 3D optimizadas e incrustarlas mediante web components ligeros (`<spline-viewer>`).

---

## 3. Protocolo Obligatorio de Rendimiento y Gestión de VRAM

El uso de gráficos 3D exige disciplina absoluta para no degradar la batería de dispositivos móviles ni congelar el hilo principal:

### 3.1 Prevención de Fugas de Memoria (Dispose Pattern)
En WordPress y aplicaciones web con navegación dinámica, es obligatorio destruir mallas, texturas y contextos WebGL al desmontar componentes o cambiar de página:

```javascript
import * as THREE from 'three';

export function disposeThreeScene(scene, renderer) {
  if (!scene) return;

  scene.traverse((object) => {
    if (!object.isMesh) return;

    if (object.geometry) {
      object.geometry.dispose();
    }

    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => disposeMaterial(mat));
      } else {
        disposeMaterial(object.material);
      }
    }
  });

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

### 3.2 Pausa Automática del Loop de Renderizado (Off-Screen Pause)
Pausar `requestAnimationFrame` cuando el lienzo tridimensional no esté visible en la ventana del navegador mediante `IntersectionObserver`:

```javascript
export function observeCanvasVisibility(canvasElement, renderCallback) {
  let isVisible = false;

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });

  observer.observe(canvasElement);

  function loop() {
    if (isVisible) {
      renderCallback();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  return () => observer.disconnect();
}
```

---

## 4. Scroll Storytelling con GSAP y ScrollTrigger

Para sincronizar la narrativa visual con el desplazamiento del usuario sin comprometer la accesibilidad:

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollNarrative(sectionSelector = '.story-section') {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const mm = gsap.matchMedia();

  // 1. Respeto obligatorio a prefers-reduced-motion
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.story-element', { opacity: 1, y: 0 });
  });

  // 2. Movimiento habilitado en pantallas medianas y grandes
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      }
    });

    tl.from('.story-card', {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => tl.kill();
  });
}

---

## 5. Patrón Canónico de Escenario 3D Apple Crystalline (Liquid Glass + Titanium)

Para incorporar objetos 3D de alta gama que transmitan la calidad de producto de Apple sin degradar el rendimiento:

```javascript
import * as THREE from 'three';

export function createApple3DStage(containerElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, containerElement.clientWidth / containerElement.clientHeight, 0.1, 100);
  camera.position.z = 4.8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  containerElement.appendChild(renderer.domElement);

  // Iluminación de estudio
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x2997ff, 3.5, 12);
  rimLight.position.set(0, 3, -3);
  scene.add(rimLight);

  // Geometría compuesta: Núcleo metálico + Capa exterior Liquid Glass
  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.85, 1),
    new THREE.MeshStandardMaterial({ color: 0x0066cc, metalness: 0.85, roughness: 0.22 })
  );
  group.add(core);

  const glass = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.05, 0.32, 128, 32),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      ior: 1.52,
      thickness: 1.5,
      roughness: 0.12,
      clearcoat: 1.0
    })
  );
  group.add(glass);

  return { scene, camera, renderer, group, core, glass };
}
```

---

## 6. Patrón de Microinteracción 3D Perspective Tilt en Tarjetas Bento

Añade tridimensionalidad física al pasar el cursor sobre las tarjetas en pantallas de escritorio con puntero:

```javascript
export function enableBentoCard3DTilt(selector = '.bento-card') {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll(selector).forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
```
```
