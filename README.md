# Plantilla 3 — Cyber-Luxe Glassmorphism Agency

Landing page Cyber-Luxe Glassmorphism para agencia de marketing digital. Rediseño visual radical de Plantilla 1 — mismo contenido, estética de cristal esmerilado y void cósmico.

## Stack

- **[Astro](https://astro.build)** v5 — Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** v3 — Utility-first CSS
- **[PostCSS](https://postcss.org)** + Autoprefixer
- **[Cloudflare Pages](https://pages.cloudflare.com)** — Hosting
- **Sora + Mulish** — Tipografías premium (Google Fonts)
- **Material Symbols** — Iconografía

## Estética

- Fondo void negro (`#03030F`) con mesh gradients indigo-violeta-rosa
- Tarjetas de cristal: `backdrop-filter: blur(20px) saturate(180%)`
- Bordes luminosos 1px: `rgba(255,255,255,0.075)` → `rgba(0,240,255,0.28)` en hover
- Sombras glass: `0 8px 32px rgba(0,0,0,0.50)` + `inset 0 1px 0 rgba(255,255,255,0.05)`
- Acento eléctrico cyan (`#00F0FF`) + violeta suave (`#A78BFA`)
- Micro-interacciones: magnetic buttons, reveal/stagger-fade en scroll, float animations

## Empezar

```bash
npm install
npm run dev       # → localhost:4321
npm run build     # → dist/
npm run preview
```

## Personalizar la marca — un solo archivo

Toda la marca (colores, tipografías y logo) vive en **`src/config/theme.mjs`**. Es lo único que se edita para rebrandear; de ahí se alimentan Tailwind, el CSS de los componentes (glass, glow, gradientes), el `<link>` de Google Fonts y el logo. **No toques el markup ni `global.css`.**

```js
// src/config/theme.mjs
export const colors = {
  accent: '#00F0FF', 'accent-2': '#A78BFA',
  'bg-void': '#03030F', 'bg-depth': '#08082A',
  'grad-indigo': '#4F46E5', 'grad-violet': '#7C3AED', 'grad-pink': '#DB2777',
  'text-primary': '#EEF2FF', 'text-secondary': '#8892B0', 'text-dim': '#4A5578',
};
export const fonts = {
  display: 'Sora, sans-serif',
  body: 'Mulish, sans-serif',
  googleHref: 'https://fonts.googleapis.com/css2?family=…',
};
export const logo = { image: '', icon: 'bolt', alt: 'Logo' };
```

> Los derivados del acento (rgb, glow, dim, borde glass) se calculan solos a partir de `accent`.

## Gestión de contenido (edición manual)

Todo el contenido vive como JSON en `src/content/` y Astro lo lee en build. Se edita **directamente en los archivos** (no hay CMS); tras guardar, `npm run dev` recarga y `git push` publica.

- `src/content/settings/site.json` — marca, nav, footer, contacto
- `src/content/pages/{home,about,contact}.json` — páginas comunes
- `src/content/services/*.json` — 6 servicios uniformes (features + planes), vía ruta dinámica `[slug]`
- `src/content/services-custom/*.json` — 3 servicios con diseño propio (agentes-ia: comparativa · embudos-venta: plan único · creadores-ugc: stats)

> El resaltado en gradiente de los titulares se controla con el campo **"highlight"** correspondiente (debe coincidir con una subcadena exacta del titular).

## Crear un sitio nuevo

> 📋 Guía detallada paso a paso para montar el sitio de un cliente: **[`MONTAR-CLIENTE.md`](MONTAR-CLIENTE.md)**

1. Duplica el repo.
2. Marca → edita `src/config/theme.mjs` (colores, fuentes + `googleHref`, logo).
3. Contenido → edita los JSON de `src/content/`.
4. Deploy en Cloudflare Pages (`npm run build`, output `dist`).

## Servicios (9 páginas)

| Ruta | Servicio |
|---|---|
| `/servicios/desarrollo-web` | Desarrollo Web |
| `/servicios/agentes-ia` | Agentes de IA |
| `/servicios/diseno-grafico` | Diseño Gráfico |
| `/servicios/redes-sociales` | Gestión de Redes |
| `/servicios/campanas-publicitarias` | Campañas de Ads |
| `/servicios/videomarketing` | Videomarketing |
| `/servicios/embudos-venta` | Embudos de Venta |
| `/servicios/creadores-ugc` | Creadores UGC |
| `/servicios/creacion-contenido` | Creación de Contenido |

## Deploy

```bash
git push  # → Cloudflare Pages build automático
```
