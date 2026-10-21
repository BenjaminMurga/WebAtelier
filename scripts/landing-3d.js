/**
 * WebAtelier - Engine 3D Interactivo Estilo Apple (Three.js WebGL)
 * Incorpora renderizado físico de materiales Liquid Glass, iluminación de estudio,
 * interacción por puntero/táctil, pausa por visibilidad y efecto 3D Tilt en tarjetas Bento.
 * Incluye configurador de materiales de producto en tiempo real.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

let currentSceneGroup = null;
let currentOuterMesh = null;
let currentCoreMesh = null;

// Presets de Materiales para el Configurador 3D de Producto
const MATERIAL_PRESETS = {
  glass: {
    name: 'Cristal Óptico (Liquid Glass)',
    outer: {
      color: 0xffffff,
      metalness: 0.08,
      roughness: 0.08,
      transmission: 0.94,
      ior: 1.52,
      thickness: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.95
    },
    core: {
      color: 0x0066cc,
      metalness: 0.9,
      roughness: 0.2
    }
  },
  titanium: {
    name: 'Titanio Aeroespacial Pulido',
    outer: {
      color: 0x8a929b,
      metalness: 0.96,
      roughness: 0.22,
      transmission: 0,
      ior: 1.0,
      thickness: 0,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      transparent: false,
      opacity: 1.0
    },
    core: {
      color: 0x1d1d1f,
      metalness: 0.95,
      roughness: 0.3
    }
  },
  ceramic: {
    name: 'Cerámica Blanca Pulida',
    outer: {
      color: 0xf5f5f7,
      metalness: 0.05,
      roughness: 0.06,
      transmission: 0,
      ior: 1.0,
      thickness: 0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: false,
      opacity: 1.0
    },
    core: {
      color: 0x0066cc,
      metalness: 0.8,
      roughness: 0.15
    }
  }
};

export function initApple3DExperience(containerId = 'hero-3d-stage') {
  const container = document.getElementById(containerId);
  if (!container) return;

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
    console.warn('WebGL no disponible, aplicando fallback estático.');
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

  // Iluminación de Estudio Cinemática
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

  // Geometría y Material Físico
  const group = new THREE.Group();
  scene.add(group);
  currentSceneGroup = group;

  // Núcleo Interior Metálico
  const coreGeometry = new THREE.IcosahedronGeometry(0.85, 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x0066cc,
    metalness: 0.85,
    roughness: 0.22
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);
  currentCoreMesh = coreMesh;

  // Capa Exterior Translúcida (Liquid Glass inicial)
  const outerGeometry = new THREE.TorusKnotGeometry(1.05, 0.32, 128, 32);
  const outerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.08,
    transmission: 0.94,
    ior: 1.52,
    thickness: 1.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 0.95
  });
  const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
  group.add(outerMesh);
  currentOuterMesh = outerMesh;

  // Método de Cambio de Material en Tiempo Real (Configurador de Producto)
  window.change3DProductMaterial = function (presetKey) {
    const preset = MATERIAL_PRESETS[presetKey];
    if (!preset || !currentOuterMesh || !currentCoreMesh) return;

    const { color: outerColor, ...outerProps } = preset.outer;
    Object.assign(currentOuterMesh.material, outerProps);
    if (currentOuterMesh.material.color && typeof currentOuterMesh.material.color.setHex === 'function') {
      currentOuterMesh.material.color.setHex(outerColor);
    } else {
      currentOuterMesh.material.color = new THREE.Color(outerColor);
    }
    currentOuterMesh.material.needsUpdate = true;

    const { color: coreColor, ...coreProps } = preset.core;
    Object.assign(currentCoreMesh.material, coreProps);
    if (currentCoreMesh.material.color && typeof currentCoreMesh.material.color.setHex === 'function') {
      currentCoreMesh.material.color.setHex(coreColor);
    } else {
      currentCoreMesh.material.color = new THREE.Color(coreColor);
    }
    currentCoreMesh.material.needsUpdate = true;

    // Actualizar botones activos en la UI
    document.querySelectorAll('[data-3d-material]').forEach(btn => {
      if (btn.getAttribute('data-3d-material') === presetKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const captionEl = document.getElementById('stage-material-name');
    if (captionEl) {
      captionEl.textContent = preset.name;
    }
  };

  // Interacción Táctil y Puntero
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousTouchX = 0;
  let previousTouchY = 0;

  window.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = normX * 0.9;
    targetRotationX = -normY * 0.7;
  }, { passive: true });

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

  // Adaptación Responsive
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

  // Pausa Automática Fuera de Pantalla
  let isVisible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  visibilityObserver.observe(container);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bucle de Renderizado
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    if (!prefersReducedMotion && !isDragging) {
      group.rotation.y += 0.005;
      group.rotation.x += 0.0025;
      coreMesh.rotation.y -= 0.008;
    }

    group.rotation.y += (targetRotationY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotationX - group.rotation.x) * 0.06;

    renderer.render(scene, camera);
  }
  animate();

  // Enlazar botones del configurador en el DOM
  document.querySelectorAll('[data-3d-material]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mat = btn.getAttribute('data-3d-material');
      window.change3DProductMaterial(mat);
    });
  });

  return function cleanup() {
    cancelAnimationFrame(animationFrameId);
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
 * 3D Perspective Tilt para Tarjetas Bento
 */
export function initBento3DTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.bento-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
