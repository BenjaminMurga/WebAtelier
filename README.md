# WebAtelier · Digital Studio Skill for Premium Web Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WordPress: 6.5+](https://img.shields.io/badge/WordPress-6.5%2B%20(FSE)-21759B.svg)](https://wordpress.org)
[![Design: Apple Minimalist](https://img.shields.io/badge/Design-Apple%20Inspired-000000.svg)](#)
[![Guardrail: Anti-AI Design](https://img.shields.io/badge/Guardrail-Anti--AI%20Design-FF3B30.svg)](#)
[![Accessibility: WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-34C759.svg)](#)

> **Architect & Creator:** **Benjamin Murga** · [@BenjaminMurga](https://github.com/BenjaminMurga)  
> **Repository:** [https://github.com/BenjaminMurga/WebAtelier](https://github.com/BenjaminMurga/WebAtelier)  
> **Version:** 2.0.0  
> **Target:** Pi, Codex, Claude Code, Cursor, and Open Agent Ecosystems.

---

## English Overview 🇺🇸 / 🇬🇧

**WebAtelier** is an enterprise-grade agent skill designed to conceptualize, design, develop, and audit premium digital experiences. Like an haute couture architectural atelier, it brings together the visual precision of **Apple Human Interface Guidelines**, the modern content architecture of **WordPress (Block Themes / FSE / Headless)**, interactive experiences (**GSAP, Three.js, WebGL/WebGPU**), strict **Anti-AI Design guardrails**, and cutting-edge **SEO, AEO, and GEO** optimization.

### Core Pillars
1. **Apple Visual Precision:** Asymmetric Bento Grids, continuous curvature ($n=4$ squircle math), spring physics for microinteractions, and solid typography.
2. **Modern WordPress Architecture:** Native Full Site Editing (FSE), `theme.json` v3, WordPress Interactivity API, and zero template debt.
3. **Anti-AI Design Enforcement:** Automated and CSS-level prevention of AI-slop: zero gradients in headings (H1–H6), zero neon glow, zero emojis as iconography, and zero cloned hero sections.
4. **Interactive & 3D Performance:** GSAP ScrollTrigger, Three.js with mandatory VRAM disposal patterns (`dispose()`), and full respect for `prefers-reduced-motion`.
5. **SEO, AEO & GEO Optimization:** Validated Schema.org JSON-LD, question-driven headers, verified executive summaries, Wikidata entity linking (`sameAs`), and strict E-E-A-T transparency.

---

## Resumen en Español 🇨🇱 / 🇪🇸

**WebAtelier** es una Skill profesional y modular diseñada para agentes de IA y equipos de ingeniería web. Inspirada en la precisión y artesanía de un taller de alta dirección de arte digital, permite concebir, diseñar, desarrollar y auditar sitios web de altísima gama combinando la precisión visual de **Apple Design**, la arquitectura moderna de **WordPress (Block Themes / FSE / Headless)**, experiencias interactivas (**GSAP, Three.js, WebGL/WebGPU**), blindaje estricto **Anti-AI Design** y optimización integral **SEO, AEO y GEO**.

### Pilares Fundamentales
1. **Precisión Visual Apple:** Grillas Bento asimétricas, curvatura continua (matemática de superelipses $n=4$), física de resortes (*springs*) para microinteracciones y tipografía sólida de alto contraste.
2. **Arquitectura WordPress Moderna:** Full Site Editing (FSE) nativo, `theme.json` versión 3, Interactivity API y erradicación total de deuda técnica de plantillas.
3. **Blindaje Anti-AI Design:** Bloqueo automatizado y por CSS de patrones genéricos de IA: cero degradados en titulares (H1–H6), cero brillos neón, cero emojis como iconos y cero héroes clónicos.
4. **Rendimiento Interactivo y 3D:** GSAP ScrollTrigger, Three.js con protocolo estricto de liberación de VRAM (`dispose()`) y respeto irrenunciable a `prefers-reduced-motion`.
5. **SEO, AEO y GEO:** Marcado Schema.org JSON-LD validado, encabezados orientados a preguntas reales, resúmenes ejecutivos verificados, vinculación de entidades con Wikidata (`sameAs`) y transparencia E-E-A-T.

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
│   ├── accessibility-performance.md      # WCAG 2.2 AA, Core Web Vitals, Video Facade Pattern
│   ├── aeo-geo.md                         # Answer Engine & Generative Engine Optimization
│   ├── anti-ai-design.md                  # Strict visual prohibitions & audit procedures
│   ├── apple-design.md                    # Bento Grids, Squircle math, Spring Physics
│   ├── design-system.md                   # Fluid clamp() tokens, Wikipedia-inspired reading controls
│   ├── motion-3d.md                       # GSAP ScrollTrigger, Three.js memory leak prevention
│   ├── quality-assurance.md               # 18-dimension rubric & CRITICAL_REJECT rules
│   ├── seo.md                             # H1–H6 hierarchy, Schema.org JSON-LD templates
│   ├── source-inventory.md                # 54-source empirical audit & traceability matrix
│   └── wordpress.md                       # Block Themes, Interactivity API, PHP sanitization
├── scripts/
│   └── anti-ai-dom-auditor.js             # Automated DOM auditor for AI-slop detection
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
Clone or copy this repository directly into your local agent skills directory:

```bash
# Para agentes basados en Pi / Agent Skills estándar:
cp -r WebAtelier ~/.agents/skills/web-atelier
```

The agent will automatically load `SKILL.md` as the entrypoint and query the `references/` directory via progressive disclosure based on the user's task.

### 2. Local Validation / Pruebas Locales
Verify syntax and theme configuration with the included scripts:

```bash
# Validar sintaxis del auditor JavaScript
npm run audit:syntax

# Validar esquema de theme.json para WordPress
npm run validate:theme-json
```

---

## 10-Phase Operating Workflow / Flujo Operativo de 10 Fases

1. **Fase 1: Comprensión (Understanding):** Scope, audience, brand identity, constraints.
2. **Fase 2: Investigación (Research):** Query `references/source-inventory.md` and related modules.
3. **Fase 3: Dirección de Arte (Art Direction):** Original visual identity, zero cloned templates.
4. **Fase 4: Arquitectura (Architecture):** Semantics, content structures, FSE templates.
5. **Fase 5: Diseño (Design System):** Bento grids, fluid typography, ergonomic reading toggles.
6. **Fase 6: Desarrollo (Development):** Clean, secure, and maintained WordPress/Frontend code.
7. **Fase 7: Motion & 3D:** GSAP timelines, Three.js scenes, and `prefers-reduced-motion`.
8. **Fase 8: Optimización (Optimization):** Core Web Vitals, Schema.org, Wikidata, WCAG 2.2 AA.
9. **Fase 9: Auditoría Anti-AI (Anti-AI Gate):** Automated DOM check with `anti-ai-dom-auditor.js`.
10. **Fase 10: Validación y Entrega (QA & Delivery):** Evaluation against the 18-dimension rubric.

---

## Credits & Authorship / Créditos y Autoría

* **Author:** **Benjamin Murga**
* **GitHub Profile:** [@BenjaminMurga](https://github.com/BenjaminMurga)
* **Contact:** `benjamin.a.murga@gmail.com`

---

## License / Licencia

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
