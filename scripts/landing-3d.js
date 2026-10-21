/**
 * WebAtelier - Engine 3D Interactivo Estilo Apple (Three.js WebGL)
 * Incorpora renderizado físico de materiales Liquid Glass, iluminación de estudio,
 * interacción por puntero/táctil, pausa por visibilidad y efecto 3D Tilt en tarjetas Bento.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initApple3DExperience(containerId = 'hero-3d-stage') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Configuración de la Escena, Cámara y Renderizador WebGL
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 360;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.z = 4.8;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL no disponible en este dispositivo, aplicando fallback estático.');
    container.classList.add('fallback-static');
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 2. Iluminación de Estudio Cinemática (Apple Style Studio Lighting)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa5c9ff, 1.4);
  fillLight.position.set(-4, -2, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x2997ff, 3.5, 12);
  rimLight.position.set(0, 3, -3);
  scene.add(rimLight);

  // 3. Geometría y Material Físico Crystalline Liquid Glass
  const group = new THREE.Group();
  scene.add(group);

  // Núcleo Interior Metálico Apple Titanium
  const coreGeometry = new THREE.IcosahedronGeometry(0.85, 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x0066cc,
    metalness: 0.85,
    roughness: 0.22,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  // Capa Exterior Translúcida (Liquid Glass con Refracción Óptica)
  const outerGeometry = new THREE.TorusKnotGeometry(1.05, 0.32, 128, 32);
  const outerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.12,
    transmission: 0.92, // Translucidez real
    ior: 1.52,          // Índice de refracción del cristal óptico
    thickness: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.95
  });
  const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
  group.add(outerMesh);

  // Actualizar color del núcleo según tema
  function updateThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      coreMaterial.color.setHex(0x2997ff);
      outerMaterial.color.setHex(0xf5f5f7);
      rimLight.color.setHex(0x2997ff);
    } else {
      coreMaterial.color.setHex(0x0066cc);
      outerMaterial.color.setHex(0xffffff);
      rimLight.color.setHex(0x0077ed);
    }
  }
  updateThemeColors();

  // Observador de mutación de tema
  const themeObserver = new MutationObserver(() => updateThemeColors());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // 4. Interacción Táctil y Puntero con Inercia (Lerp)
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousTouchX = 0;
  let previousTouchY = 0;

  // Interacción por movimiento del ratón en escritorio
  window.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = normX * 0.9;
    targetRotationX = -normY * 0.7;
  }, { passive: true });

  // Interacción táctil en dispositivos móviles
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousTouchX = e.touches[0].clientX;
      previousTouchY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousTouchX;
    const deltaY = e.touches[0].clientY - previousTouchY;
    targetRotationY += deltaX * 0.012;
    targetRotationX += deltaY * 0.012;
    previousTouchX = e.touches[0].clientX;
    previousTouchY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  // 5. Adaptación Responsive con ResizeObserver
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const newWidth = entry.contentRect.width;
      const newHeight = entry.contentRect.height;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    }
  });
  resizeObserver.observe(container);

  // 6. Optimización y Control de Recursos (Pausa Fuera de Pantalla)
  let isVisible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  visibilityObserver.observe(container);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 7. Bucle Principal de Renderizado a 60/120 fps
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return; // Cero consumo de GPU/CPU cuando no es visible

    if (!prefersReducedMotion && !isDragging) {
      group.rotation.y += 0.005;
      group.rotation.x += 0.0025;
      coreMesh.rotation.y -= 0.008;
    }

    // Suavizado cinemático con inercia (Spring / Lerp)
    group.rotation.y += (targetRotationY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.06;

    renderer.render(scene, camera);
  }
  animate();

  // 8. Protocolo de Liberación de Memoria VRAM (Dispose Pattern)
  return function cleanup() {
    cancelAnimationFrame(animationFrameId);
    themeObserver.disconnect();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();

    coreGeometry.dispose();
    coreMaterial.dispose();
    outerGeometry.dispose();
    outerMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
}

/**
 * 3D Perspective Tilt para Tarjetas Bento en Pantallas Grandes
 */
export function initBento3DTilt() {
  if (window.matchMedia('(hover: none)').matches) return; // Solo en dispositivos con puntero real

  const cards = document.querySelectorAll('.bento-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Máximo 6 grados de inclinación sutil
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
