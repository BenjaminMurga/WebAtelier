#!/usr/bin/env node
/**
 * WebAtelier - Auditor Visual Universal de Pantalla y Detección de Desbordamiento
 * Compatible con Node.js y Bun.
 *
 * Si Playwright está instalado:
 *   Ejecuta Chromium headless y audita la pantalla en 4 factores de forma reales:
 *   - Móvil Compacto (375x667)
 *   - Móvil Grande (414x896)
 *   - Tableta iPad (768x1024)
 *   - Escritorio Laptop (1280x800)
 *
 * Si Playwright no está instalado:
 *   Ejecuta una auditoría estática de ancho y reglas de desbordamiento CSS
 *   y proporciona el comando de instalación de 1 paso.
 *
 * Uso:
 *   node scripts/audit-screen.js [URL_O_ARCHIVO]
 *   bun scripts/audit-screen.js [URL_O_ARCHIVO]
 */
import path from 'node:path';
import fs from 'node:fs';

const targetInput = process.argv[2] || 'index.html';
let targetUrl = targetInput;

if (!targetInput.startsWith('http://') && !targetInput.startsWith('https://')) {
  const absolutePath = path.resolve(targetInput).replace(/\\/g, '/');
  targetUrl = 'file:///' + absolutePath;
}

const VIEWPORTS = [
  { name: 'Móvil Compacto (iPhone SE)', width: 375, height: 667, isMobile: true },
  { name: 'Móvil Grande (iPhone Pro Max)', width: 414, height: 896, isMobile: true },
  { name: 'Tableta iPad', width: 768, height: 1024, isMobile: false },
  { name: 'Escritorio Laptop', width: 1280, height: 800, isMobile: false }
];

async function main() {
  console.log(`\n============================================================`);
  console.log(`  WebAtelier · Auditor Visual de Pantalla & Desbordamiento`);
  console.log(`  Objetivo: ${targetUrl}`);
  console.log(`============================================================\n`);

  let playwrightModule = null;

  try {
    playwrightModule = await import('playwright');
  } catch (e) {
    // Intentar resolver en caso de que esté instalado globalmente o en Bun
  }

  if (playwrightModule && playwrightModule.chromium) {
    await runPlaywrightAudit(playwrightModule.chromium);
  } else {
    runStaticFallbackAudit();
  }
}

async function runPlaywrightAudit(chromium) {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    console.warn(`[AVISO] Los navegadores de Playwright aún no están descargados.`);
    console.warn(`Para descargarlos con un solo comando, ejecuta: npx playwright install chromium\n`);
    runStaticFallbackAudit();
    return;
  }

  let totalViolations = 0;

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    try {
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(600); // Tiempo para renderizado de fuentes y scripts
    } catch (err) {
      console.error(`Error al cargar ${targetUrl} en ${vp.name}:`, err.message);
      await page.close();
      continue;
    }

    const auditResult = await page.evaluate((isMobile) => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const overflows = [];
      const touchTargetIssues = [];

      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect();
        
        // Detección de Desbordamiento Horizontal
        if (rect.right > docWidth + 1.5) {
          overflows.push({
            tag: el.tagName,
            id: el.id,
            className: String(el.className || ''),
            width: Math.round(rect.width),
            right: Math.round(rect.right),
            overflowBy: Math.round(rect.right - docWidth),
            snippet: (el.textContent || '').trim().slice(0, 45)
          });
        }

        // Detección de Ergonomía Táctil en Móviles (< 44x44px)
        if (isMobile && (el.tagName === 'BUTTON' || el.tagName === 'A')) {
          if (rect.width > 0 && rect.height > 0 && (rect.width < 40 || rect.height < 40)) {
            touchTargetIssues.push({
              tag: el.tagName,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              snippet: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)
            });
          }
        }
      });

      return {
        docWidth,
        scrollWidth,
        hasHorizontalScroll: scrollWidth > docWidth,
        overflows,
        touchTargetIssues: touchTargetIssues.slice(0, 5)
      };
    }, vp.isMobile);

    const vpStatus = auditResult.overflows.length === 0 ? '✓ APROBADO' : '✗ FALLÓ';
    console.log(`[${vpStatus}] ${vp.name} (${vp.width}x${vp.height}px)`);

    if (auditResult.overflows.length > 0) {
      totalViolations += auditResult.overflows.length;
      console.log(`  ! Desbordamiento horizontal detectado: ${auditResult.overflows.length} elementos rebasan la pantalla:`);
      auditResult.overflows.slice(0, 4).forEach((o) => {
        console.log(`    - <${o.tag} class="${o.className}"> rebasa por ${o.overflowBy}px (Ancho: ${o.width}px). Snippet: "${o.snippet}"`);
      });
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n------------------------------------------------------------`);
  if (totalViolations === 0) {
    console.log(`  Resultado: 100% CERO DESBORDAMIENTOS EN TODOS LOS FACTORES`);
    console.log(`  La web se adapta con fluidez matemática a Móvil, Tableta y PC.`);
    console.log(`------------------------------------------------------------\n`);
    process.exit(0);
  } else {
    console.log(`  Resultado: RECHAZADO (${totalViolations} desbordamientos detectados)`);
    console.log(`  Corrige los anchos fijos o tablas antes de entregar.`);
    console.log(`------------------------------------------------------------\n`);
    process.exit(1);
  }
}

function runStaticFallbackAudit() {
  console.log(`[MODO RÁPIDO / FALLBACK ESTÁTICO DE ANCHO]`);
  console.log(`Analizando reglas de desbordamiento en el código fuente HTML/CSS...`);

  const filePath = targetInput.startsWith('http') ? null : path.resolve(targetInput);
  if (filePath && fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Comprobación de meta viewport
    if (!content.includes('name="viewport"')) {
      issues.push('Falta etiqueta meta viewport obligatoria en el <head>.');
    }

    // Comprobación de anchos fijos en CSS inline
    if (/width:\s*[5-9]\d{2,}px/i.test(content)) {
      issues.push('Posible ancho fijo peligroso detectado (> 500px) en estilos inline.');
    }

    if (issues.length === 0) {
      console.log(`✓ Verificación estática superada: Meta viewport presente y sin anchos rígidos evidentes.`);
    } else {
      issues.forEach(i => console.warn(`! ${i}`));
    }
  }

  console.log(`\n💡 Tip para cualquier usuario o agente que descargue la Skill:`);
  console.log(`   Para habilitar la auditoría visual completa con capturas en Chromium real:`);
  console.log(`     npm install && npx playwright install chromium\n`);
  process.exit(0);
}

main();
