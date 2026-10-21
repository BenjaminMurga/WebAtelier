/**
 * Test Suite de Validación para el Auditor Anti-AI Design de WebAtelier
 * Valida la detección rigurosa de huellas digitales de IA frente a código limpio.
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

// Caso 1: Código con múltiples huellas digitales de IA y deuda técnica
const badDom = {
  querySelectorAll: (selector) => {
    if (selector.includes('h1')) {
      return [
        { tagName: 'H1', textContent: 'Revoluciona tu negocio con IA 🚀', dataset: { gradient: true, clip: 'text', transparent: true } },
        { tagName: 'H4', textContent: 'Subtítulo saltando jerarquía', dataset: {} }
      ];
    }
    if (selector.includes('.badge')) {
      return [
        { tagName: 'SPAN', textContent: '✨ AI-Powered Platform' }
      ];
    }
    if (selector === 'a') {
      return [{ getAttribute: () => 'javascript:void(0);', outerHTML: '<a href="javascript:void(0);"></a>' }];
    }
    if (selector.includes('generator')) {
      return [{ getAttribute: (attr) => attr === 'content' ? 'Framer AI v12' : null }];
    }
    return [];
  },
  body: { innerText: 'Welcome, Login to your account type here... Buscar' }
};

// Caso 2: Código limpio con principios Apple Design, tokens semánticos y sin huellas
const goodDom = {
  querySelectorAll: (selector) => {
    if (selector.includes('h1')) {
      return [
        { tagName: 'H1', textContent: 'Arquitectura y Precisión Digital', dataset: {} },
        { tagName: 'H2', textContent: 'Diseño estructurado y sin artificios', dataset: {} }
      ];
    }
    if (selector.includes('.badge')) {
      return [
        { tagName: 'SPAN', textContent: 'Versión 2.1.0' }
      ];
    }
    if (selector === 'a') {
      return [{ getAttribute: () => 'https://ejemplo.com/servicios', outerHTML: '<a href="https://ejemplo.com/servicios">Servicios</a>' }];
    }
    if (selector.includes('generator')) {
      return [];
    }
    return [];
  },
  body: { innerText: 'Contenido editorial en perfecto español y sin residuos.' }
};

const badResult = runAntiAiAndQualityAudit(badDom);
const goodResult = runAntiAiAndQualityAudit(goodDom);

console.log('Test 1 (Caso IA) - Incidencias detectadas:', badResult.totalIssues);
badResult.issues.forEach(i => console.log(`  [${i.severity}] ${i.dimension}: ${i.reason}`));

if (badResult.passed !== false || badResult.criticalCount < 4) {
  console.error('FAIL: El caso con patrones de IA debió ser rechazado con severidad crítica.');
  process.exit(1);
}

if (goodResult.passed !== true || goodResult.totalIssues !== 0) {
  console.error('FAIL: El caso limpio debió aprobar sin incidencias.');
  process.exit(1);
}

console.log('\n✓ Test Suite de WebAtelier superada: Detección exhaustiva de huellas de IA y aprobación de interfaces limpias.');
