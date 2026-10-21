/**
 * Test Suite de Validación para el Auditor Anti-AI Design
 * Demuestra la detección de patrones de IA frente a interfaces limpias.
 */
import { runAntiAiAndQualityAudit } from './anti-ai-dom-auditor.js';

global.window = {
  getComputedStyle: (el) => ({
    backgroundImage: el.dataset.gradient ? 'linear-gradient(to right, #6366f1, #a855f7)' : 'none',
    webkitBackgroundClip: el.dataset.clip || 'initial',
    backgroundClip: el.dataset.clip || 'initial',
    webkitTextFillColor: el.dataset.transparent ? 'transparent' : 'currentColor'
  })
};

// Caso 1: Código con patrones típicos de IA y deuda técnica
const badDom = {
  querySelectorAll: (selector) => {
    if (selector.includes('h1')) {
      return [
        { tagName: 'H1', textContent: 'Revoluciona tu negocio con IA 🚀', dataset: { gradient: true, clip: 'text', transparent: true } },
        { tagName: 'H4', textContent: 'Subtítulo saltando jerarquía', dataset: {} }
      ];
    }
    if (selector === 'a') {
      return [{ getAttribute: () => 'javascript:void(0);', outerHTML: '<a href="javascript:void(0);"></a>' }];
    }
    return [];
  },
  body: { innerText: 'Welcome, Login to your account type here... Buscar' }
};

// Caso 2: Código limpio con principios Apple Design + Anti-AI
const goodDom = {
  querySelectorAll: (selector) => {
    if (selector.includes('h1')) {
      return [
        { tagName: 'H1', textContent: 'Arquitectura y Precisión Digital', dataset: {} },
        { tagName: 'H2', textContent: 'Diseño estructurado y sin artificios', dataset: {} }
      ];
    }
    if (selector === 'a') {
      return [{ getAttribute: () => 'https://ejemplo.com/servicios', outerHTML: '<a href="https://ejemplo.com/servicios">Servicios</a>' }];
    }
    return [];
  },
  body: { innerText: 'Contenido editorial en perfecto español y sin residuos.' }
};

const badResult = runAntiAiAndQualityAudit(badDom);
const goodResult = runAntiAiAndQualityAudit(goodDom);

if (badResult.passed !== false || badResult.totalIssues !== 6) {
  console.error('FAIL: El caso con patrones de IA debió fallar con 6 incidencias.');
  process.exit(1);
}

if (goodResult.passed !== true || goodResult.totalIssues !== 0) {
  console.error('FAIL: El caso limpio debió aprobar sin incidencias.');
  process.exit(1);
}

console.log('✓ Test Suite del Auditor superada: Detección estricta de patrones de IA y aprobación de interfaces limpias.');
