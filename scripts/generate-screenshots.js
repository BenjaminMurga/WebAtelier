import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const URL = 'https://benjaminmurga.github.io/WebAtelier/';

async function run() {
  console.log('🚀 Iniciando captura automatizada con Chromium...');
  const browser = await chromium.launch();

  // 1. Escritorio (1440x900) con calidad Retina HD
  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await contextDesktop.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 01. Hero Desktop
  console.log('📸 Capturando: 01-hero-desktop.png');
  await page.screenshot({ path: path.join(OUT_DIR, '01-hero-desktop.png') });

  // 02. Comparativa Técnica
  const comparativaSection = page.locator('#comparativa');
  if (await comparativaSection.count() > 0) {
    console.log('📸 Capturando: 02-comparativa-tecnica.png');
    await comparativaSection.screenshot({ path: path.join(OUT_DIR, '02-comparativa-tecnica.png') });
  }

  // 03. Bento Grids
  const bentoSection = page.locator('#bento');
  if (await bentoSection.count() > 0) {
    console.log('📸 Capturando: 03-bento-grid-arquitectura.png');
    await bentoSection.screenshot({ path: path.join(OUT_DIR, '03-bento-grid-arquitectura.png') });
  }

  // 04 & 05: Playground Interactivo (Antes y Después)
  const playgroundSection = page.locator('#tab-anti-ai');
  const btnToggleBad = page.locator('#toggle-state-bad');
  const btnToggleGood = page.locator('#toggle-state-good');

  if (await btnToggleBad.count() > 0 && await playgroundSection.count() > 0) {
    console.log('📸 Capturando: 04-playground-cliche-ia.png (Estado con vicios de IA)');
    await btnToggleBad.click();
    await page.waitForTimeout(300);
    await playgroundSection.screenshot({ path: path.join(OUT_DIR, '04-playground-cliche-ia.png') });

    console.log('📸 Capturando: 05-playground-webatelier-puro.png (Estado curado por WebAtelier)');
    await btnToggleGood.click();
    await page.waitForTimeout(300);
    await playgroundSection.screenshot({ path: path.join(OUT_DIR, '05-playground-webatelier-puro.png') });
  }

  // 06. Página Completa Desktop
  console.log('📸 Capturando: 06-pagina-completa-desktop.png');
  await page.screenshot({ path: path.join(OUT_DIR, '06-pagina-completa-desktop.png'), fullPage: true });

  await contextDesktop.close();

  // 07. Vista Móvil (iPhone 375x812)
  console.log('📸 Capturando: 07-vista-movil-iphone.png');
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto(URL, { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: path.join(OUT_DIR, '07-vista-movil-iphone.png') });

  // 08. Menú Drawer Móvil Abierto
  console.log('📸 Capturando: 08-menu-drawer-movil.png');
  const menuBtn = pageMobile.locator('#menu-toggle');
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await pageMobile.waitForTimeout(400);
    await pageMobile.screenshot({ path: path.join(OUT_DIR, '08-menu-drawer-movil.png') });
  }

  await contextMobile.close();
  await browser.close();

  console.log(`\n✨ ¡Todas las capturas han sido generadas con éxito en: ${OUT_DIR}!`);
}

run().catch((err) => {
  console.error('Error generando capturas:', err);
  process.exit(1);
});
