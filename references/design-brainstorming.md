# Brainstorming de Alta Dirección de Arte e Ingeniería Web (WebAtelier Creative Conception)

## 1. Filosofía: Superación del Brainstorming Convencional

El brainstorming tradicional de desarrollo de software se limita a preguntar qué funciones debe tener un programa. En el diseño y desarrollo web de alta gama, eso es insuficiente: un sitio web es simultáneamente **arquitectura de software, dirección de arte visual, experiencia ergonómica de entrada y comunicación de marca**.

El **Brainstorming de WebAtelier** transforma ideas difusas en especificaciones de diseño y arquitectura rigurosas antes de escribir una sola línea de código, garantizando que el proyecto nazca con identidad visual propia y libre de clichés automatizados.

<HARD-GATE>
Queda estrictamente prohibido iniciar la implementación de código, crear archivos de maquetación o instalar librerías hasta que el usuario haya aprobado explícitamente el diseño conceptual o la especificación técnica en el camino seleccionado.
</HARD-GATE>

---

## 2. Las Cuatro Dimensiones de Exploración (Una Pregunta a la Vez)

Para no abrumar al usuario, la Skill formula **una única pregunta enfocada por mensaje**, explorando cuatro dimensiones clave:

### Dimensión A: Propósito de Negocio y Audiencia Real
* ¿Qué problema concreto resuelve este sitio web o qué producto presenta?
* ¿Quién es el visitante principal y qué acción debe completar con máxima fluidez?

### Dimensión B: Calibración de la Identidad Visual (Brand & Visual Vibe Probing)
La Skill ayuda a definir el arquetipo estético del proyecto entre cuatro familias de diseño de alta gama:
1. **Minimalismo Apple (Cupertino Clean):** Superficies alabastro/obsidiana, materiales *Liquid Glass* (`backdrop-filter: blur()`), tipografía sólida con tracking calibrado y acento azul eléctrico o neutro.
2. **Editorial Suizo (Swiss Typography):** Alto contraste tipográfico en blanco y negro, grillas geométricas estrictas, asimetría audaz y acento sólido de alto impacto (rojo internacional o cobalto).
3. **Nordic Organic:** Paleta de tonos orgánicos hueso, pizarra y pino profundo, tipografías refinadas y atmósfera de serenidad funcional.
4. **Lujo Cálido Contemporáneo (Warm Luxury):** Tonos crema, espresso y terracota sutil, combinando tipografía sans-serif moderna con detalles editoriales de altísima credibilidad.

### Dimensión C: Nivel de Interactividad y 3D (Subordinación de Efectos)
* ¿El producto exige un **configurador interactivo 360° en tiempo real** (e-commerce / producto físico)?
* ¿Requiere **scroll storytelling cinemático** (Three.js / GSAP)?
* ¿O se beneficia más de una **experiencia editorial puramente tipográfica y ultraligera** (tiempo de carga récord $< 1\text{ s}$)?

### Dimensión D: Factores de Forma Críticos
* ¿El tráfico principal será móvil táctil (ergonomía 44px obligatoria)?
* ¿Requiere visualización en monitores panorámicos (centrado óptico simétrico)?
* ¿Debe contemplar la experiencia de 10 pies para Smart TV (cruceta D-Pad y foco `:focus-visible` ampliado)?

---

## 3. El Desafío Anti-Cliché (*Anti-AI Cliché Challenge*)

Uno de los mayores valores del Brainstorming de WebAtelier es **proteger al proyecto de ideas viciadas por plantillas genéricas de IA**.

Si el cliente o usuario pide una estructura repetitiva común (ej. *"quiero un hero centrado con un gran titular multicolor y 3 tarjetitas iguales"*), la Skill debe desafiar esa premisa con elegancia y criterio profesional:

> *"Antes de adoptar 3 tarjetas idénticas: ¿tu propuesta de valor realmente se divide en 3 partes de igual peso, o existe una funcionalidad protagonista que merezca el 75% del espacio visual en una grilla Bento asimétrica (8 columnas para el héroe y 4 para soporte)? En interfaces de alta gama, la jerarquía asimétrica comunica mucha mayor autoridad que una fila de cajas repetidas."*

Asimismo, aplica el **Desafío de Concisión y Pureza Visual**:
> *"Antes de añadir subtítulos explicativos o etiquetas secundarias bajo cada titular o tarjeta: evita las etiquetas secundarias y las descripciones innecesarias. Deja que el diseño y la distribución de los elementos hablen por sí solos. Cada elemento debe cumplir una función clara para el usuario, eliminando eslóganes, adornos superfluos, tarjetas anidadas e información repetida. Muestra explicaciones solo para situaciones anormales o acciones obligatorias mediante divulgación progresiva."*

---

## 4. Los Tres Caminos de Ejecución del Atelier

Antes de profundizar, clasifica la solicitud en uno de los tres caminos y decláralo expresamente:

```text
Clasificación de la Tarea:
├── 1. Spike Visual / 3D ──► Probar viabilidad de un shader, Three.js o animación
├── 2. Bounded (Acotado) ──► Rediseñar o crear una sección existente (Hero, Bento, Footer)
└── 3. Architectural ─────► Proyecto web nuevo o sistema completo desde cero
```

### Camino 1: Spike Visual o 3D
* **Propósito:** Responder una duda técnica o de rendimiento antes de comprometerse con una arquitectura (ej. *"¿es viable un configurador de producto 3D en WebGL para móviles sin que baje de 60fps?"*).
* **Flujo:** Plantea la prueba en 2–3 oraciones $\rightarrow$ Obtén el visto bueno $\rightarrow$ Desarrolla una prueba de concepto ligera $\rightarrow$ Entrega una recomendación técnica concluyente (el código se etiqueta como exploratorio).

### Camino 2: Bounded (Sección o Rediseño Acotado)
* **Propósito:** Modificar o crear una sección específica dentro de una web existente.
* **Flujo:** Explora el contexto actual $\rightarrow$ Haz las preguntas indispensables de dirección de arte $\rightarrow$ Presenta una propuesta concisa en el chat (enfoque, tokens usados, adaptación móvil) $\rightarrow$ **DETENTE y espera el visto bueno explícito** $\rightarrow$ Implementa la solución con pruebas de pantalla.
* **Principio de Contención y Coherencia:** Mantén la coherencia estricta con las pantallas existentes. Prioriza eliminar o simplificar elementos antes que agregar otros nuevos. **No rediseñes toda la página para modificar una sola parte.**

### Camino 3: Architectural (Proyecto Web Completo)
* **Propósito:** Crear una web, landing page o tema de WordPress nuevo desde cero.
* **Flujo:**
  1. Explorar el contexto y objetivos.
  2. Preguntas de calibración una a una (Propósito, Vibe de Marca, 3D, Factores de forma).
  3. **Proponer 2 a 3 enfoques visuales y arquitectónicos** con sus pros, contras y tu recomendación profesional.
  4. Presentar el diseño conceptual por secciones (Hero, Bento, Contenido, Footer).
  5. **Redactar la Especificación de Diseño (`DESIGN-SPEC.md`):**
     * Paleta semántica con regla 60-30-10 (`--bg-main`, `--bg-surface`, `--accent`).
     * Escala fluida matemática con `clamp()`.
     * Arquitectura de componentes HTML5 semánticos (cero sopa de divs).
     * Estrategia de cabecera móvil (Menú de Hamburguesa con Liquid Glass Drawer).
     * Requisitos de rendimiento y SEO/AEO/GEO.
  6. Ejecutar la **Auto-Revisión de la Especificación** antes de pedir la aprobación final.
  7. **Gate de Aprobación Humana:** El usuario debe revisar y aprobar la especificación antes de iniciar el código.

---

## 5. Lista de Auto-Revisión de la Especificación de Diseño (*Spec Self-Review*)

Antes de pedir la aprobación del usuario en el Camino Architectural, verifica mentalmente:
1. **Filtro Anti-AI:** ¿Hay algún degradado en titulares, emojis en H1, halos neón o badges tipo *"AI-Powered"* en la propuesta? Si es así, elimínalos.
2. **Contrato de Color:** ¿Los pares de fondo y texto están matemáticamente vinculados con contraste WCAG $\ge 4.5:1$?
3. **Experiencia Móvil:** ¿La cabecera móvil está planificada con menú de hamburguesa y drawer, o se intentó meter la barra de escritorio en el teléfono?
4. **Control de Recursos 3D:** Si incluye Three.js, ¿está previsto el descarte de VRAM (`dispose()`) y la pausa fuera de pantalla?
5. **Ambigüedades:** ¿Hay textos tipo "TBD" o "Lorem Ipsum" en la especificación? Remplázalos por propuestas editoriales concretas.
6. **Pureza de Elementos y Cero Etiquetas Secundarias:** ¿Cada elemento cumple una función clara para el usuario? ¿Se han erradicado etiquetas secundarias, descripciones redundantes, eslóganes y tarjetas anidadas permitiendo que la distribución hable por sí sola? ¿Se reserva la explicación solo para casos obligatorios u operacionales mediante divulgación progresiva?
7. **Costo de Rendimiento y Principios Fundamentales:** ¿Se confirma el objetivo real y se considera el costo de rendimiento en producción dentro de los criterios de aceptación?
