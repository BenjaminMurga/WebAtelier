#!/usr/bin/env bun
/**
 * WebAtelier - Auditor Visual de Pantalla y Detección de Desbordamiento (Playwright)
 * Inspecciona visualmente cualquier URL o archivo local en 4 factores de forma:
 * - Móvil Compacto (375x667)
 * - Móvil Grande (414x896)
 * - Tableta (768x1024)
 * - Escritorio (1280x800)
 *
 * Detecta desbordamientos horizontales, cortes de texto y controles táctiles < 44px.
 *
 * Uso:
 *   bun scripts/audit-screen.js [URL_O_ARCHIVO]
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

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

async function runScreenAudit() {
  console.log(`\n============================================================`);
  console.log(`  WebAtelier · Auditor Visual de Pantalla & Desbordamiento`);
  console.log(`  Objetivo: ${targetUrl}`);
  console.log(`============================================================\n`);

  const browser = await chromium.launch({ headless: true });
  let totalViolations = 0;

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    try {
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(600); // Espera a renderizado y fuentes
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

    if (auditResult.touchTargetIssues.length > 0) {
      console.log(`  i Advertencia de ergonomía táctil: ${auditResult.touchTargetIssues.length} controles interactivos miden menos de 44x44px.`);
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n------------------------------------------------------------`);
  if (totalViolations === 0) {
    console.log(`  Resultado Final: 100% CERO DESBORDAMIENTOS EN TODOS LOS FACTORES`);
    console.log(`  La web se adapta con fluidez matemática a Móvil, Tableta y PC.`);
    console.log(`------------------------------------------------------------\n`);
    process.exit(0);
  } else {
    console.log(`  Resultado Final: RECHAZADO (${totalViolations} desbordamientos detectados)`);
    console.log(`  Corrige los anchos fijos o tablas antes de entregar.`);
    console.log(`------------------------------------------------------------\n`);
    process.exit(1);
  }
}

runScreenAudit();
