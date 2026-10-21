/**
 * WebAtelier - Auditor de Calidad y Cumplimiento Anti-AI Design
 * Detecta huellas digitales de IA: degradados en titulares, emojis, sopa de divs,
 * insignias artificiales sobre titulares, generadores automáticos y residuos de plantilla.
 */
export function runAntiAiAndQualityAudit(root = document) {
  const issues = [];
  const emojiRegex = /[\p{Extended_Pictographic}\u2600-\u26FF\u2700-\u27BF]/u;

  // 1. Auditoría de Encabezados (H1-H6)
  const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;

  headings.forEach((el) => {
    let style = {};
    try {
      if (typeof window !== 'undefined' && window.getComputedStyle && (el instanceof window.Element)) {
        style = window.getComputedStyle(el) || {};
      }
    } catch (e) {
      style = {};
    }

    const bgImage = (style.backgroundImage || (el.style && el.style.backgroundImage) || (el.dataset && el.dataset.gradient ? 'gradient' : '') || '');
    const bgClip = (style.webkitBackgroundClip || style.backgroundClip || (el.style && el.style.webkitBackgroundClip) || (el.dataset && el.dataset.clip) || '');
    const textFill = (style.webkitTextFillColor || (el.style && el.style.webkitTextFillColor) || (el.dataset && el.dataset.transparent ? 'transparent' : '') || '');

    const level = parseInt(el.tagName.replace('H', ''), 10);
    const text = el.textContent ? el.textContent.trim() : '';

    if (
      bgImage.includes('gradient') ||
      bgClip === 'text' ||
      textFill === 'transparent' ||
      textFill.includes('rgba(0, 0, 0, 0)')
    ) {
      issues.push({
        severity: 'CRITICAL_REJECT',
        dimension: 'Anti-AI Design',
        element: el.tagName,
        snippet: text.slice(0, 60),
        reason: 'Prohibición violada: Titular con degradado o background-clip: text.'
      });
    }

    if (emojiRegex.test(text)) {
      issues.push({
        severity: 'CRITICAL_REJECT',
        dimension: 'Anti-AI Design',
        element: el.tagName,
        snippet: text.slice(0, 60),
        reason: 'Prohibición violada: Uso de emojis en titular como iconografía.'
      });
    }

    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({
        severity: 'HIGH',
        dimension: 'SEO Semántico',
        element: el.tagName,
        snippet: text.slice(0, 60),
        reason: `Salto de jerarquía de encabezados: de H${lastLevel} a H${level}.`
      });
    }
    lastLevel = level;
  });

  // 2. Detección de Insignias Artificiales de IA sobre H1 ("AI-Powered", "Powered by AI", etc.)
  root.querySelectorAll('.badge, .eyebrow, .kicker, .tag, [class*="badge"], [class*="eyebrow"]').forEach((badge) => {
    const text = badge.textContent ? badge.textContent.trim().toLowerCase() : '';
    if (text.length > 0 && text.length < 45) {
      const aiBadges = ['ai-powered', 'powered by ai', 'ai platform', 'generative ai'];
      if (aiBadges.some((b) => text.includes(b))) {
        issues.push({
          severity: 'CRITICAL_REJECT',
          dimension: 'Anti-AI Design',
          element: badge.tagName,
          snippet: text.slice(0, 50),
          reason: 'Huella de IA detectada: Píldora/Badge genérico tipo "AI-Powered" sobre titular.'
        });
      }
    }
  });

  // 3. Auditoría de Enlaces y Accesibilidad
  root.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('javascript:void')) {
      issues.push({
        severity: 'HIGH',
        dimension: 'Accesibilidad',
        element: 'A',
        snippet: link.outerHTML ? link.outerHTML.slice(0, 80) : href,
        reason: 'Enlace vacío con javascript:void(0) detectado. Usar <button> semántico.'
      });
    }
    if (href.includes('%20')) {
      issues.push({
        severity: 'MEDIUM',
        dimension: 'Calidad WordPress',
        element: 'A',
        snippet: href,
        reason: 'URL mal formada con espacios (%20) detectada.'
      });
    }
  });

  // 4. Detección de Metaetiquetas de Generadores Automáticos
  root.querySelectorAll('meta[name="generator"]').forEach((meta) => {
    const content = meta.getAttribute('content') || '';
    const aiGenerators = ['framer', 'wix adi', '10web', 'durable'];
    if (aiGenerators.some((g) => content.toLowerCase().includes(g))) {
      issues.push({
        severity: 'CRITICAL_REJECT',
        dimension: 'Anti-AI Design',
        element: 'META',
        snippet: content,
        reason: `Metaetiqueta de constructor automático detectada: "${content}".`
      });
    }
  });

  // 5. Detección de Residuos de Plantilla en Texto
  const bodyText = root.body ? (root.body.innerText || root.body.textContent || '') : (root.innerText || root.textContent || '');
  const templateResidues = [
    'type here...',
    'Welcome, Login to your account',
    'Forget password?',
    'No Result',
    'View All Result'
  ];

  templateResidues.forEach((residue) => {
    if (bodyText.includes(residue)) {
      issues.push({
        severity: 'HIGH',
        dimension: 'Localización WordPress',
        element: 'BODY',
        snippet: residue,
        reason: `Cadena de plantilla sin localizar detectada: "${residue}".`
      });
    }
  });

  return {
    passed: !issues.some((i) => i.severity === 'CRITICAL_REJECT'),
    totalIssues: issues.length,
    criticalCount: issues.filter((i) => i.severity === 'CRITICAL_REJECT').length,
    issues
  };
}
