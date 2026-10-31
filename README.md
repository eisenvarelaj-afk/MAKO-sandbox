# MAKO Sandbox — Entrega 1

Entorno aislado para validar la reimplementación modular de MAKO. Este repositorio no modifica el proyecto original `eisenvarelaj-afk/MAKO`.

## Estado

- [x] Repositorio sandbox confirmado (público y vacío al iniciar).
- [x] Paquete revisado y validado localmente en el entorno de trabajo.
- [x] Incorporar HTML, CSS, JavaScript, datos, traducciones y archivos auxiliares a `sandbox/entrega1`.
- [ ] Comparar visual y funcionalmente con la versión original.
- [ ] Migrar y verificar los recursos multimedia externos.
- [ ] Activar GitHub Pages después de incorporar el sitio y revisar las rutas.

## Arquitectura prevista

```
MAKO/
├── index.html
├── README.md
├── .nojekyll
├── robots.txt
├── favicon.svg
├── assets/
│   ├── img/
│   └── video/
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── sections.css
├── data/
│   ├── prompts.json
│   └── species.json
├── i18n/
│   ├── en.json
│   └── es.json
└── js/
    ├── main.js
    ├── i18n.js
    ├── nav.js
    ├── hero.js
    ├── species.js
    ├── prompts.js
    └── ui.js
```

## Validaciones locales ya realizadas

- Sintaxis de los 7 módulos JavaScript: correcta con `node --check`.
- JSON de datos y traducciones: parseo correcto.
- Enlaces internos por fragmento: sin destinos inexistentes.
- Imports relativos de JavaScript: archivos presentes.
- Integridad del ZIP revisado: correcta.

## Hallazgos pendientes

- Las traducciones ES no incluyen todavía los cuerpos completos de los seis prompts.
- El vídeo del hero y algunas miniaturas siguen apuntando a un host externo.
- La equivalencia visual con la versión original (HTML original de aproximadamente 73 KB) aún requiere inspección en navegador.
- No se ha confirmado la redistribución/licencia de los recursos multimedia externos.

## Regla de seguridad

Este repositorio es experimental. No se sincroniza ni se fusiona automáticamente con el repositorio original. La promoción a MAKO se hará solo después de una revisión explícita.
