/**
 * Auditor de Calidad y Cumplimiento Anti-AI Design
 * Detecta titulares con degradados, emojis como iconos, saltos H1-H6 y residuos de plantilla.
 */
export function runAntiAiAndQualityAudit(root = document) {
  const issues = [];
  const emojiRegex = /[\p{Extended_Pictographic}\u2600-\u26FF\u2700-\u27BF]/u;

  const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;

  headings.forEach((el) => {
    const style = window.getComputedStyle(el);
    const level = parseInt(el.tagName.replace('H', ''), 10);
    const text = el.textContent.trim();

    if (
      style.backgroundImage.includes('gradient') ||
      style.webkitBackgroundClip === 'text' ||
      style.backgroundClip === 'text' ||
      style.webkitTextFillColor === 'transparent'
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
        reason: 'Prohibición violada: Uso de emojis o caracteres Unicode como iconografía en titular.'
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

  root.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('javascript:void')) {
      issues.push({
        severity: 'HIGH',
        dimension: 'Accesibilidad',
        element: 'A',
        snippet: link.outerHTML.slice(0, 80),
        reason: 'Enlace vacío con javascript:void(0) detectado.'
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

  const bodyText = root.body ? root.body.innerText : '';
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
    issues
  };
}
