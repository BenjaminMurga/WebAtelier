# Optimización para Motores de Respuesta (AEO) y Motores Generativos (GEO)

## 1. Principio Fundamental y Regla Ética
AEO y GEO no sustituyen al SEO técnico tradicional; lo complementan estructurando la información para que modelos LLM y motores de respuesta puedan extraer, comprender y citar datos de forma inequívoca.

**Prohibición de Promesas Engañosas:** Queda estrictamente prohibido prometer citas o apariciones garantizadas en ChatGPT, Perplexity, Gemini o Google AI Overviews. Toda optimización debe fundamentarse en la estructuración rigurosa de entidades, hechos verificables y metadatos estándar.

---

## 2. AEO (Answer Engine Optimization): Formatos de Respuesta Directa

Los motores de respuesta favorecen contenidos que resuelven una duda concreta de forma inmediata antes de profundizar en el desarrollo analítico:

### 2.1 Encabezados Formulados como Preguntas Reales
Diseñar subtítulos `<h2>` o `<h3>` con la formulación exacta que utilizan los usuarios en búsquedas conversacionales:
* *Ejemplo correcto:* `<h2>¿Cuáles son los requisitos legales para operar un sistema automatizado en salud?</h2>`
* *Ejemplo genérico incorrecto:* `<h2>Requisitos y normativas</h2>`

### 2.2 Cápsula de Respuesta Verificada (Resumen Ejecutivo)
Al inicio del contenido, insertar un bloque destacado de entre 45 y 65 palabras que responda directamente qué, cómo y por qué:

```html
<section class="aeo-summary-capsule" aria-labelledby="summary-title">
  <div class="capsule-header">
    <h3 id="summary-title">Resumen Verificado</h3>
    <span class="capsule-badge">Revisado por Autor</span>
  </div>
  <p class="capsule-text">
    Los sistemas automatizados de dispensación clínica reducen las discrepancias de inventario y optimizan el flujo de información hospitalaria. Su implementación exige interoperabilidad de software, validación diaria de stock físico versus virtual y capacitación continua del personal operador.
  </p>
</section>
```

### 2.3 Tablas Comparativas Semánticas Multiparámetro
Estructurar comparativas complejas mediante tablas accesibles que los rastreadores puedan convertir en tablas de datos limpias:

```html
<div class="table-responsive-wrapper">
  <table class="comparative-table">
    <caption class="sr-only">Comparativa de Parámetros de Operación</caption>
    <thead>
      <tr>
        <th scope="col">Parámetro Operativo</th>
        <th scope="col">Marco Vigente</th>
        <th scope="col">Estándar Propuesto</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Registro de Discrepancias</th>
        <td>Auditoría mensual manual</td>
        <td>Monitoreo diario automatizado con trazabilidad</td>
      </tr>
      <tr>
        <th scope="row">Interoperabilidad</th>
        <td>Sistemas aislados por departamento</td>
        <td>Integración bidireccional vía API clínica</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. GEO (Generative Engine Optimization): Entidades, Autoridad y E-E-A-T

Los motores generativos construyen sus respuestas a partir de grafos de conocimiento y relaciones de confianza entre entidades.

### 3.1 Identificación y Vinculación con Wikidata (`sameAs`)
Para evitar ambigüedad en los nombres de personas, organizaciones o conceptos técnicos, se vincula la entidad con bases de conocimiento globales en el JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Benjamin Murga",
  "url": "https://github.com/BenjaminMurga",
  "sameAs": [
    "https://github.com/BenjaminMurga",
    "https://www.linkedin.com/company/creawebchile"
  ],
  "knowsAbout": [
    "Web Architecture",
    "Apple Design Guidelines",
    "WordPress Full Site Editing",
    "Anti-AI Design Systems"
  ]
}
```

### 3.2 Sección Estructurada de Referencias Bibliográficas Numeradas
Respaldar todo dato técnico o afirmación cuantitativa con enlaces a fuentes primarias oficiales (organismos regulatorios, documentación académica o normas ISO):

```html
<section class="editorial-references" aria-label="Referencias y Fuentes Oficiales">
  <h2>Referencias Bibliográficas y Fuentes Primarias</h2>
  <ol class="references-list">
    <li id="ref-1">
      <cite>Ministerio de Salud de Chile (MINSAL).</cite> 
      Norma Técnica N° 147 sobre Buenas Prácticas de Dispensación. 
      <a href="https://www.minsal.cl" target="_blank" rel="noopener noreferrer">[Enlace Oficial]</a>
    </li>
    <li id="ref-2">
      <cite>Organización Mundial de la Salud (OMS/OPS).</cite> 
      Guía de Gestión Segura de Tecnologías Sanitarias.
      <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">[Fuente Primaria]</a>
    </li>
  </ol>
</section>
```

### 3.3 Transparencia E-E-A-T y Declaración sobre Uso de IA
Siguiendo las mejores prácticas de medios de prestigio (como el modelo documentado en BioBioChile):
* Si una herramienta de inteligencia artificial se utiliza para asistir en la redacción o el resumen de un contenido, **se declara expresamente al usuario**:
  > *"Resumen asistido por tecnología analítica y revisado y validado íntegramente por el equipo editorial humano."*
* Proporcionar enlaces visibles a la **Política Editorial**, **Página de Correcciones**, **Equipo Profesional** y **Avisos de Responsabilidad (Disclaimers)**.
