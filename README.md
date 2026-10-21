# WebAtelier · Digital Studio Skill for Premium Web Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WordPress: 6.5+](https://img.shields.io/badge/WordPress-6.5%2B%20(FSE)-21759B.svg)](https://wordpress.org)
[![Design: Apple Minimalist](https://img.shields.io/badge/Design-Apple%20Inspired-000000.svg)](#)
[![Guardrail: Anti-AI Design](https://img.shields.io/badge/Guardrail-Anti--AI%20Design-FF3B30.svg)](#)
[![Accessibility: WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-34C759.svg)](#)
[![Responsive: Universal (Mobile, PC, TV)](https://img.shields.io/badge/Responsive-Universal%20(TV%2010--foot%20UI)-FF9500.svg)](#)

> **Architect & Creator:** **Benjamin Murga** · [@BenjaminMurga](https://github.com/BenjaminMurga)  
> **Repository:** [https://github.com/BenjaminMurga/WebAtelier](https://github.com/BenjaminMurga/WebAtelier)  
> **Version:** 2.1.0  
> **Target:** Pi, Codex, Claude Code, Cursor, and Open Agent Ecosystems.

---

## English Overview 🇺🇸 / 🇬🇧

**WebAtelier** is an enterprise-grade agent skill designed to conceptualize, design, develop, and audit premium digital experiences. Inspired by high-end architectural studios, it combines the visual precision of **Apple Human Interface Guidelines**, the contemporary architecture of **WordPress (Block Themes / FSE / Headless)**, real-time 3D interactive experiences (**Three.js, WebGL/WebGPU, R3F, Spline**), universal responsive adaptation (**Mobile, PC, and Smart TV 10-foot UI**), strict **Anti-AI Design guardrails**, and cutting-edge **SEO, AEO, and GEO** optimization.

### Core Pillars
1. **Apple HIG Philosophy:** Clarity, Deference, Depth (*Liquid Glass*), spring physics (`cubic-bezier`), continuous curvature ($n=4$), and the 60-30-10 chromatic rule.
2. **Anti-AI Design Guardrails:** Automated eradication of AI fingerprints (purple-blue gradients, glow effects, single italicized words, emojis in headings, badges like "AI-Powered", div soup, and builder meta-tags).
3. **Universal Responsive Design:** True 3-dimension screen support: Mobile/Tablet (0–767px, touch targets 44×44px), PC/Laptop (1024–1440px+, dynamic CSS Grid), and Smart TV (1080p/4K at 3m / D-Pad navigation with enhanced `:focus-visible`).
4. **Interactive 3D & Motion:** Real-time WebGL/WebGPU, Three.js with mandatory VRAM disposal (`dispose()`), and GSAP ScrollTrigger respecting `prefers-reduced-motion`.
5. **Modern WordPress:** Full Site Editing (FSE), `theme.json` v3, Interactivity API, and strict PHP sanitization (`esc_html`, `wp_kses_post`).
6. **SEO, AEO & GEO:** Schema.org JSON-LD, question-driven headers, verified executive summaries, and Wikidata entity linking (`sameAs`).

---

## Resumen en Español 🇨🇱 / 🇪🇸

**WebAtelier** es una Skill profesional y modular diseñada para agentes de IA y equipos de ingeniería digital. Inspirada en la artesanía y rigor de un taller de alta dirección de arte, permite concebir, diseñar, desarrollar y auditar sitios web de altísima gama combinando los principios de **Apple Design**, la arquitectura moderna de **WordPress**, experiencias 3D en tiempo real (**Three.js, WebGL/WebGPU, Spline**), diseño adaptable universal (**Móvil, PC y Smart TV**), blindaje estricto **Anti-AI Design** y optimización integral **SEO, AEO y GEO**.

### Pilares Fundamentales
1. **Filosofía Apple HIG:** Claridad, Deferencia y Profundidad (*Liquid Glass* con `backdrop-filter: blur()`), física de resortes (*springs*), curvatura continua ($n=4$) y regla cromática 60-30-10.
2. **Blindaje Anti-AI Design:** Erradicación automatizada de huellas digitales de IA (degradados morado-azul, halos neón, palabras en cursiva solitaria, emojis en titulares, insignias "AI-Powered", sopa de divs y metaetiquetas de constructores).
3. **Diseño Adaptable Universal en 3 Dimensiones:**
   * **Móviles/Tabletas (0px–767px):** Mobile-first, botones de 44×44px, cero dependencia de *hover*.
   * **PC/Laptops (1024px–1440px+):** CSS Grid dinámico y navegación por cursor.
   * **Smart TV (10-foot UI a 3 metros):** Navegación exclusiva por D-Pad con foco `:focus-visible` aumentado y tipografía ampliada para lectura desde el sofá.
4. **Experiencias 3D e Interactivas:** WebGL/WebGPU, Three.js con protocolo estricto de liberación de VRAM (`dispose()`) y GSAP ScrollTrigger con `prefers-reduced-motion`.
5. **WordPress Contemporáneo:** Block Themes nativos, `theme.json` v3, Interactivity API y saneamiento riguroso.
6. **SEO, AEO y GEO:** Marcado Schema.org JSON-LD, encabezados en formato de pregunta, resúmenes verificados y vinculación de entidades en Wikidata (`sameAs`).

---

## Repository Structure / Estructura del Repositorio

```text
WebAtelier/
├── .github/
│   └── workflows/
│       └── anti-ai-quality-gate.yml      # CI Quality Gate (GitHub Actions)
├── configs/
│   └── theme.json                         # WordPress FSE v3 theme configuration
├── references/
│   ├── accessibility-performance.md      # Universal Responsive (Mobile, PC, Smart TV), WCAG 2.2 AA
│   ├── aeo-geo.md                         # Answer Engine & Generative Engine Optimization
│   ├── anti-ai-design.md                  # Comprehensive AI fingerprints catalog & prohibitions
│   ├── apple-design.md                    # Apple HIG, Liquid Glass, Squircle math, Spring Physics
│   ├── design-system.md                   # Semantic token pairs, 60-30-10 rule, clamp() scales
│   ├── motion-3d.md                       # Real-time 3D, WebGL/WebGPU, Three.js VRAM disposal
│   ├── quality-assurance.md               # 18-dimension rubric & CRITICAL_REJECT criteria
│   ├── seo.md                             # H1–H6 hierarchy, Schema.org JSON-LD templates
│   ├── source-inventory.md                # 54-source empirical audit & traceability matrix
│   └── wordpress.md                       # Block Themes, Interactivity API, PHP sanitization
├── scripts/
│   ├── anti-ai-dom-auditor.js             # Automated DOM auditor for AI fingerprints
│   └── test-auditor.js                    # Automated unit test suite (npm test)
├── styles/
│   └── anti-ai-reset-and-tokens.css       # CSS tokens & heading gradient lock
├── .gitignore
├── LICENSE                                # MIT License (Benjamin Murga)
├── package.json                           # Node.js project manifest & validation scripts
├── README.md                              # Bilingual Documentation & Credits
└── SKILL.md                               # Agent Entrypoint & 10-Phase Workflow
```

---

## Installation & Usage / Instalación y Uso

### 1. In your AI Agent Environment (Pi, Claude, Cursor)
Copy this repository into your local agent skills directory:

```bash
cp -r WebAtelier ~/.agents/skills/web-atelier
```

The agent will automatically discover **`web-atelier`** and consult the `references/` directory via progressive disclosure based on the user's task.

### 2. Local Validation / Pruebas Locales

```bash
# Ejecutar suite de pruebas de detección Anti-AI
npm test

# Validar esquema de theme.json para WordPress
npm run validate:theme-json

# Comprobar sintaxis de scripts
npm run audit:syntax
```

---

## 10-Phase Operating Workflow / Flujo Operativo de 10 Fases

1. **Fase 1: Comprensión (Understanding):** Scope, audience, brand identity, screen factors (Mobile, PC, TV).
2. **Fase 2: Investigación (Research):** Query `references/source-inventory.md` and related modules.
3. **Fase 3: Dirección de Arte (Art Direction):** Semantic tokens, 60-30-10 rule, original composition.
4. **Fase 4: Arquitectura (Architecture):** HTML5 semantic markup (no div soup), FSE templates.
5. **Fase 5: Diseño (Design System):** Bento grids, fluid typography with `clamp()`, concentric radii ($n=4$).
6. **Fase 6: Desarrollo (Development):** Native Block Themes, Interactivity API, strict PHP escaping.
7. **Fase 7: Motion & 3D:** GSAP timelines, Three.js scenes with VRAM disposal, `prefers-reduced-motion`.
8. **Fase 8: Optimización (Optimization):** Schema.org, Wikidata, Core Web Vitals, D-Pad/keyboard accessibility.
9. **Fase 9: Auditoría Anti-AI (Anti-AI Gate):** Automated DOM check with `anti-ai-dom-auditor.js`.
10. **Fase 10: Validación y Entrega (QA & Delivery):** Evaluation against the 18-dimension rubric.

---

## Credits & Authorship / Créditos y Autoría

* **Author:** **Benjamin Murga**
* **GitHub Profile:** [@BenjaminMurga](https://github.com/BenjaminMurga)
* **Contact:** `benjamin.a.murga@gmail.com`
* **License:** [MIT License](LICENSE)
