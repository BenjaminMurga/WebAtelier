/**
 * WebAtelier - Landing Page Interactive Engine
 * Handles appearance toggles, live auditor demo, and copy-to-clipboard interactions.
 */
import { runAntiAiAndQualityAudit } from './anti-ai-dom-auditor.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Selector de Esquema Cromático (Claro / Oscuro / Automático)
  const themeToggles = document.querySelectorAll('[data-set-theme]');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-set-theme');
      if (targetTheme === 'auto') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', targetTheme);
      }
      themeToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 2. Selector de Tamaño de Fuente Ergonómico
  const fontToggles = document.querySelectorAll('[data-set-font]');
  fontToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-set-font');
      if (size === 'small') {
        document.documentElement.style.fontSize = '92%';
      } else if (size === 'large') {
        document.documentElement.style.fontSize = '112%';
      } else {
        document.documentElement.style.fontSize = '';
      }
      fontToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 3. Demostración Interactiva del Auditor en Vivo
  const consoleOutput = document.getElementById('auditor-output');
  const btnRunBad = document.getElementById('btn-audit-bad');
  const btnRunGood = document.getElementById('btn-audit-good');

  if (consoleOutput && btnRunBad && btnRunGood) {
    btnRunBad.addEventListener('click', () => {
      consoleOutput.innerHTML = '<div style="color:var(--text-tertiary); padding: 8px 0;">Analizando DOM simulado con patrones de IA...</div>';
      setTimeout(() => {
        const badMockDom = {
          querySelectorAll: (selector) => {
            if (selector.includes('h1')) {
              return [
                { tagName: 'H1', textContent: 'Revoluciona tu negocio con IA 🚀', dataset: { gradient: true, clip: 'text', transparent: true } },
                { tagName: 'H4', textContent: 'Subtítulo saltando jerarquía a H4', dataset: {} }
              ];
            }
            if (selector.includes('.badge')) {
              return [{ tagName: 'SPAN', textContent: '✨ AI-Powered Platform' }];
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

        const result = runAntiAiAndQualityAudit(badMockDom);
        renderAuditOutput(result, 'Caso: Plantilla Típica Generada por IA');
      }, 150);
    });

    btnRunGood.addEventListener('click', () => {
      consoleOutput.innerHTML = '<div style="color:var(--text-tertiary); padding: 8px 0;">Analizando DOM bajo estándar WebAtelier...</div>';
      setTimeout(() => {
        // En este caso auditamos directamente el documento vivo de la propia landing page
        const result = runAntiAiAndQualityAudit(document);
        renderAuditOutput(result, 'Caso: Landing Page WebAtelier (En Vivo)');
      }, 150);
    });
  }

  function renderAuditOutput(result, caseName) {
    let html = `<div style="margin-bottom: 12px; font-weight: 700; color: var(--text-primary); border-bottom: 1px solid var(--border-hairline); padding-bottom: 8px;">
      ${caseName} · Estado: ${result.passed ? '<span style="color: var(--success-solid);">APROBADO (0 Incidencias)</span>' : '<span style="color: var(--danger-solid);">RECHAZADO (' + result.totalIssues + ' Incidencias)</span>'}
    </div>`;

    if (result.issues.length === 0) {
      html += `
        <div class="log-entry">
          <span class="badge-success">APROBADO</span>
          <div>
            <strong>100% Conforme con Anti-AI Design:</strong> Cero degradados en titulares, tipografía sólida, jerarquía H1-H6 respetada, accesibilidad WCAG 2.2 AA y sin residuos de plantilla.
          </div>
        </div>
      `;
    } else {
      result.issues.forEach(issue => {
        const badgeClass = issue.severity === 'CRITICAL_REJECT' ? 'badge-reject' : 'badge-high';
        html += `
          <div class="log-entry">
            <span class="${badgeClass}">${issue.severity}</span>
            <div>
              <strong>${escapeHtml(issue.dimension)}:</strong> ${escapeHtml(issue.reason)}
              <div style="color: var(--text-tertiary); font-size: 0.8rem; margin-top: 2px;">Snippet: "${escapeHtml(issue.snippet)}"</div>
            </div>
          </div>
        `;
      });
    }

    consoleOutput.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // 4. Copiar Comandos al Portapapeles
  document.querySelectorAll('.terminal-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '¡Copiado!';
          btn.style.borderColor = 'var(--success-solid)';
          btn.style.color = 'var(--success-solid)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
});
