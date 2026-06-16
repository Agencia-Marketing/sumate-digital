# Montar el sitio de un cliente (plantilla3)

Guía paso a paso para crear el sitio de un cliente a partir de esta plantilla.
La marca vive en **un solo archivo** (`src/config/theme.mjs`) y el contenido se
edita desde **`/admin`** (Decap CMS). No hay que tocar el markup.

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
| Logo | imagen `/public/____.svg`  ó  icono `____` |
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

- Si el logo es imagen: pon el archivo en `public/` y `logo.image: '/logo.svg'`.
- Los derivados del acento (rgb, glow, dim, borde glass) **se recalculan solos**.
- Los nombres de clase Tailwind no cambian entre clientes; solo los valores aquí.

---

## Paso 2 — Contenido: panel `/admin`

Todo el texto/imágenes son editables. Qué edita cada cosa:

| En `/admin` | Archivo |
|---|---|
| Ajustes (marca, menú, footer, contacto) | `src/content/settings/site.json` |
| Inicio / Nosotros / Contacto | `src/content/pages/{home,about,contact}.json` |
| Servicios (features + planes) — 6 | `src/content/services/*.json` |
| Servicios a medida — 3 | `src/content/services-custom/*.json` |

> Los 3 a medida tienen diseño propio: **agentes-ia** (tabla comparativa),
> **embudos-venta** (plan único), **creadores-ugc** (stats).

**Editar en local (sin servicios externos):**
```bash
npm run dev      # terminal 1 → http://localhost:4321
npm run cms      # terminal 2 → decap-server
```
Abre `http://localhost:4321/admin/index.html`. Los cambios se guardan en los
archivos JSON; luego haces `git push` tú.

---

## Paso 3 — Imágenes

Las imágenes que vienen son demo (Unsplash / pravatar). Para el cliente:
- Súbelas desde `/admin` (campos de imagen) → se guardan en `public/uploads/`, **o**
- Reemplaza las URLs en los JSON por las del cliente.

---

## Deploy de revisión rápida (pages.dev, sin worker) ⭐

El caso más habitual: el cliente solo va a **revisar**, no a editar todavía. El
dominio es el temporal que genera Cloudflare Pages (`cliente-x.pages.dev`), sin
DNS ni dominio propio. **No hace falta el worker OAuth.**

1. Crear repo desde el template y editar marca + contenido **en local**
   (`npm run dev` + `npm run cms` → `/admin`, con `local_backend: true`).
2. `git push` → conectar el repo a Cloudflare Pages (build `npm run build`,
   output `dist`). Se genera `cliente-x.pages.dev`.
3. Pasarle esa URL al cliente para que revise.
4. ¿Pide cambios? Editas en local → `git push` → la `pages.dev` se actualiza
   sola; el cliente solo refresca.

En este flujo **no toques `base_url`** en `config.yml` (el `/admin` en
producción no se usa aún). El worker, la OAuth App y el dominio propio se
configuran **solo cuando el cliente aprueba y quiere editar él mismo** (pasos 4
y 5 siguientes).

---

## Paso 4 — Conectar el CMS al repo del cliente (edición en producción)

En `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: Agencia-Marketing/cliente-x        # ← repo del cliente
  branch: main
  base_url: https://decap-oauth-cliente-x.<subdominio>.workers.dev   # ← worker
  auth_endpoint: auth
```

**Worker OAuth** (solo si el cliente edita desde producción; ver `oauth-worker/README.md`):
1. GitHub → *Developer settings → OAuth Apps → New OAuth App*
   - Homepage: `https://<dominio-cliente>`
   - Callback: `https://decap-oauth-cliente-x.<subdominio>.workers.dev/callback`
2. Desplegar:
   ```bash
   cd oauth-worker
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   npx wrangler deploy
   ```
3. Pega la URL del worker en `base_url`.

> Si solo editas tú en local, puedes saltarte el worker.

---

## Paso 5 — Desplegar en Cloudflare Pages

- Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → repo `cliente-x`.
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Production branch:** `main`
- Resultado: `cliente-x.pages.dev`. Luego **Custom domains** → dominio del cliente.

Cada push a `main` (incluidos los commits de Decap al editar) redesplega solo.

---

## Paso 6 — Dar acceso al cliente (si edita él)

- GitHub → repo `cliente-x` → **Settings → Collaborators** → invitar con rol **Write**.
- Solo quien tenga acceso de escritura puede guardar desde `/admin`. La página
  `/admin` es pública, pero sin permiso en el repo no se puede commitear nada.

---

## Checklist mínima (montaje rápido)

1. **Use this template** → repo `cliente-x` → clonar → `npm install`
2. Editar `src/config/theme.mjs` (colores, fuentes + `googleHref`, logo)
3. `npm run dev` + `npm run cms` → llenar contenido en `/admin`
4. `public/admin/config.yml` → `repo` + `base_url`
5. Cloudflare Pages (`npm run build`, output `dist`) + dominio

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
