# AYNIT — Portafolio de Landing Pages

Portafolio de landing pages creadas con **HTML, CSS y JavaScript** puro (sin frameworks).

- Vitrina: [`index.html`](./index.html)
- URL en GitHub Pages: `https://Samael1525.github.io/Portafolio/`

## Estructura

```
├── index.html              ← Vitrina (portafolio)
├── css/portfolio.css       ← Estilos de la vitrina
├── assets/ICONO.svg        ← Icono de marca
├── assets/LOGO_AYNI.svg    ← Icono cuadrado de marca (sin uso)
├── assets/AYNI_TEXT.svg    ← Wordmark (texto) de marca
├── assets/thumbs/          ← Capturas reales de cada landing
├── landing/
│   ├── turismoxyz/         ← Landing de agencia de viajes
│   │   ├── index.html
│   │   ├── css/styles.css
│   │   └── js/script.js
│   ├── crossfit/           ← Landing de gimnasio (IronBox CrossFit)
│   │   ├── index.html
│   │   └── css/style4.css
│   └── hotel/              ← Landing de hospedaje (Hotel Mirador)
│       ├── index.html
│       └── css/style3.css
```

## Cómo agregar un nuevo landing (3 pasos)

1. **Copia la estructura** de cualquier landing existente dentro de `landing/<nombre>/`:

   ```
   landing/<nombre>/
   ├── index.html
   ├── css/<nombre>.css
   └── js/ (si aplica)
   ```

2. **Añade la barra de retorno** al inicio del `<body>` del nuevo landing
   (apunta siempre a `../../index.html`):

   ```html
   <a href="../../index.html" class="back-bar" title="Volver al portafolio AYNIT">
       <i class="fa-solid fa-arrow-left"></i> <span>Volver al portafolio</span>
   </a>
   ```

3. **Registra la fila** en `index.html` copiando un `<article class="work-row">`
   existente y cambiando imagen, título, descripción, chips y links
   (`landing/<nombre>/`).

## Capturas reales (recomendado)

Las tarjetas de la vitrina usan imágenes de demostración. Para usar capturas reales:

1. Abre cada landing en el navegador.
2. Presiona `F12` → pestaña **Elements** → clic derecho en `<html>` → **Capture node screenshot**.
3. Guarda la imagen como `assets/thumbs/<nombre>.jpg` (ej. `turismoxyz.jpg`, `crossfit.jpg`).
4. En `index.html`, reemplaza el `src` de la imagen de esa tarjeta por `assets/thumbs/<nombre>.jpg`.

## Publicación (GitHub Pages)

1. Push a `main`.
2. Repo → **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
3. La URL quedará en `https://Samael1525.github.io/Portafolio/`.

> Nota: `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.
