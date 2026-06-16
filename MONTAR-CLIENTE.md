# Montar el sitio de un cliente (plantilla3)

Guía paso a paso para crear el sitio de un cliente a partir de esta plantilla.
La marca vive en **un solo archivo** (`src/config/theme.mjs`) y el contenido se
edita **manualmente** en los JSON de `src/content/`. No hay CMS.

---

## Ficha del cliente (rellenar por proyecto)

| Campo | Valor |
|---|---|
| Nombre de marca | |
| Repo GitHub | `Agencia-Marketing/__________` |
| Dominio final | |
| Color acento (`accent`) | `#______` |
| Fondo (`bg-void` / `bg-depth`) | `#______` / `#______` |
| Gradientes (`grad-indigo/violet/pink`) | `#______` `#______` `#______` |
| Textos (`text-primary/secondary/dim`) | `#______` `#______` `#______` |
| Tipografía titulares (`display`) | |
| Tipografía cuerpo (`body`) | |
| `googleHref` (Google Fonts) | |
| Logo | imagen `/public/____.png`  ó  icono `____` |
| Email · Teléfono · Ubicación | |

---

## Paso 0 — Crear el repo del cliente

1. En GitHub, marca `Agencia-Marketing/plantilla3` como **Template repository**
   (Settings → "Template repository").
2. **Use this template → Create a new repository** → nombre `cliente-x`.
3. En local:
   ```bash
   git clone https://github.com/Agencia-Marketing/cliente-x.git
   cd cliente-x
   npm install
   ```

---

## Paso 1 — Marca: `src/config/theme.mjs`

Es **lo único de código** que cambias. Edita los 3 bloques:

```js
export const colors = {
  accent: '#00F0FF', 'accent-2': '#A78BFA',
  'bg-void': '#03030F', 'bg-depth': '#08082A',
  'grad-indigo': '#4F46E5', 'grad-violet': '#7C3AED', 'grad-pink': '#DB2777',
  'text-primary': '#EEF2FF', 'text-secondary': '#8892B0', 'text-dim': '#4A5578',
};
export const fonts = {
  display: 'Sora, sans-serif',
  body: 'Mulish, sans-serif',
  googleHref: 'https://fonts.googleapis.com/css2?family=...&display=swap', // ¡cámbialo junto a las familias!
};
export const logo = { image: '', icon: 'bolt', alt: 'Logo' };
```

- Si el logo es imagen: pon el archivo en `public/` y `logo.image: '/logo.png'`.
- Los derivados del acento (rgb, glow, dim, borde glass) **se recalculan solos**.
- Los nombres de clase Tailwind no cambian entre clientes; solo los valores aquí.

---

## Paso 2 — Contenido: editar los JSON a mano

Todo el texto/imágenes son editables directamente en los archivos JSON de
`src/content/`. Qué edita cada cosa:

| Sección | Archivo |
|---|---|
| Ajustes (marca, menú, footer, contacto) | `src/content/settings/site.json` |
| Inicio / Nosotros / Contacto | `src/content/pages/{home,about,contact}.json` |
| Servicios (features + planes) — 6 | `src/content/services/*.json` |
| Servicios a medida — 3 | `src/content/services-custom/*.json` |

> Los 3 a medida tienen diseño propio: **agentes-ia** (tabla comparativa),
> **embudos-venta** (plan único), **creadores-ugc** (stats).

> El resaltado en gradiente de los titulares se controla con el campo
> `*Highlight` correspondiente, que debe coincidir con una subcadena **exacta**
> del titular.

**Editar en local:**
```bash
npm run dev      # → http://localhost:4321 (recarga al guardar)
```
Edita los JSON, revisa en el navegador y luego haces `git push` tú.

---

## Paso 3 — Imágenes

Las imágenes que vienen son demo (Unsplash / pravatar). Para el cliente:
- Coloca los archivos en `public/` (o `public/uploads/`) y referencia la ruta
  (p. ej. `/uploads/foto.webp`) en el JSON correspondiente, **o**
- Reemplaza las URLs en los JSON por las del cliente.

---

## Paso 4 — Desplegar en Cloudflare Pages

- Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → repo `cliente-x`.
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Production branch:** `main`
- Resultado: `cliente-x.pages.dev`. Luego **Custom domains** → dominio del cliente.

Cada push a `main` redesplega solo.

### Flujo de revisión rápida (pages.dev)

El caso más habitual: el cliente solo va a **revisar**. El dominio es el temporal
de Cloudflare Pages (`cliente-x.pages.dev`), sin DNS ni dominio propio.

1. Crear repo desde el template y editar marca + contenido **en local**.
2. `git push` → conectar el repo a Cloudflare Pages (build `npm run build`,
   output `dist`). Se genera `cliente-x.pages.dev`.
3. Pasarle esa URL al cliente para que revise.
4. ¿Pide cambios? Editas en local → `git push` → la `pages.dev` se actualiza
   sola; el cliente solo refresca.

---

## Checklist mínima (montaje rápido)

1. **Use this template** → repo `cliente-x` → clonar → `npm install`
2. Editar `src/config/theme.mjs` (colores, fuentes + `googleHref`, logo)
3. `npm run dev` → editar los JSON de `src/content/`
4. Cloudflare Pages (`npm run build`, output `dist`) + dominio

---

## Verificación antes de entregar

```bash
npm run build      # sin errores → 12 rutas prerenderadas
npm run preview    # revisar visualmente
```
Comprobar: `/`, `/nosotros`, `/contacto`, un servicio uniforme
(`/servicios/desarrollo-web`) y uno a medida (`/servicios/agentes-ia`).
Confirmar que se aplicaron los colores/tipografías del cliente y que el
logo/nombre de marca son los correctos.
