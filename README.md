# C.M.C.H — Landing y catálogo

Sitio estático de C.M.C.H (accesorios para correaje policial, Jujuy).

| Pieza     | Tecnología                                                                                  |
| --------- | ------------------------------------------------------------------------------------------- |
| Framework | [Astro 7](https://docs.astro.build) + TypeScript (`strictest`)                              |
| Estilos   | [Tailwind CSS v4](https://tailwindcss.com) (vía `@tailwindcss/vite`)                        |
| CMS       | [Sveltia CMS](https://sveltiacms.app) (catálogo y datos de contacto)                        |
| Deploy    | Cloudflare Pages + Worker [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) |

El diseño original está en `project-claude-design/` (solo como referencia, no entra al build).

## Requisitos

- Node.js **≥ 22.23.4** (recomendado 24, ver `.nvmrc`)
- npm ≥ 9.6.5

## Comandos

| Comando                | Acción                                                   |
| ---------------------- | -------------------------------------------------------- |
| `npm install`          | Instala dependencias                                     |
| `npm run dev`          | Servidor local en `http://localhost:4321`                |
| `npm run check`        | Chequeo de tipos y schemas de contenido (`astro check`)  |
| `npm run build`        | `astro check` + build a `dist/`                          |
| `npm run preview`      | Sirve `dist/` localmente                                 |
| `npm run format`       | Formatea con Prettier (incluye orden de clases Tailwind) |
| `npm run format:check` | Verifica el formato                                      |

## Estructura

```
public/
  admin/              Sveltia CMS (index.html + config.yml)
  _headers            Headers de Cloudflare Pages (cache de /_astro, noindex de /admin)
  favicon.png
src/
  assets/             Imágenes optimizadas por Astro (logo, hero, OG, textura)
  components/
    catalog/          Tarjeta de producto, lightbox de fotos, placeholder
    layout/           Header, footer, botón flotante de WhatsApp
    sections/         Secciones de la landing (Hero, Catalog, Faq, ...)
    ui/               Primitivas: Button, ChamferBox, Icon, SectionHeading
  config/site.ts      Título, descripción, navegación
  content/
    productos/<slug>/index.json   Un producto por carpeta (+ sus fotos)
    ajustes/contacto.json         WhatsApp, teléfono visible, redes
  content.config.ts   Schemas (Zod) de las colecciones
  data/landing.ts     Textos fijos: FAQ, pasos, beneficios
  layouts/            BaseLayout (SEO, OG, fuentes)
  lib/                Helpers: WhatsApp, formato de precios, acceso a contenido
  pages/              index, 404, robots.txt
  scripts/reveal.ts   Animación de aparición al hacer scroll
  styles/global.css   Tokens de diseño (@theme) y utilidades
```

## Editar el catálogo

### Qué se puede editar

- **Catálogo**: nombre, artículo (el/la — se usa en el mensaje de WhatsApp), precio, descripción, fotos (la primera es la principal; el resto se ve en la galería) y orden.
- **Ajustes → Contacto y redes**: número de WhatsApp, teléfono visible, mensaje general y links de Facebook/Instagram (vacío = se oculta el ícono).

Los textos fijos (FAQ, pasos, beneficios) se editan en `src/data/landing.ts`.

### En local (sin login)

Requiere Chrome, Edge o Brave (usa la File System Access API).

1. `npm run dev`
2. Abrir `http://localhost:4321/admin/index.html`
3. **Trabajar con un repositorio local** → seleccionar la carpeta raíz del proyecto.
4. Los cambios se escriben directo en `src/content/`; el sitio en dev se recarga solo. Luego hacer commit con git.

### En producción

Entrar a `https://<dominio>/admin/` → **Iniciar sesión con GitHub**. Cada cambio guardado es un commit en `main`, y Cloudflare Pages recompila el sitio automáticamente (~1 min).

## Deploy (Cloudflare Pages + OAuth)

1. **Repositorio**: subir el proyecto a GitHub (rama `main`).
2. **Cloudflare Pages**: _Workers & Pages → Create → Pages → Connect to Git_.
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Output directory: `dist`
   - La versión de Node se toma de `.nvmrc`.
3. **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps → New):
   - Homepage URL: el dominio del sitio
   - Authorization callback URL: `https://<tu-worker>.workers.dev/callback`
4. **Worker `sveltia-cms-auth`**: desplegarlo con el botón _Deploy to Cloudflare_ de su [repositorio](https://github.com/sveltia/sveltia-cms-auth) y configurar las variables:
   - `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET` (de la OAuth App)
   - `ALLOWED_DOMAINS` = dominio del sitio (ej. `cmch-web.pages.dev`)
5. Completar los placeholders y hacer commit.

### Placeholders pendientes

| Dónde                                                          | Valor actual                                                                      |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `astro.config.mjs` → `SITE_URL`                                | `https://cmch-web.pages.dev`                                                      |
| `public/admin/config.yml` → `backend.repo`                     | `OWNER/cmch-web`                                                                  |
| `public/admin/config.yml` → `backend.base_url`                 | `https://sveltia-cms-auth.CUENTA.workers.dev`                                     |
| `public/admin/config.yml` → `site_url`                         | `https://cmch-web.pages.dev`                                                      |
| `src/content/ajustes/contacto.json` → `facebook` / `instagram` | `https://facebook.com/CMCH`, `https://instagram.com/CMCH` (editable desde el CMS) |

## Notas técnicas

- **Fotos de productos**: se guardan junto al `index.json` de cada producto y Astro las convierte a WebP en varios tamaños durante el build. Subí fotos en buena resolución (≥ 1200 px); no hace falta optimizarlas antes.
- **Fuentes**: Barlow, Barlow Condensed y Chakra Petch se descargan en el build y se sirven desde el propio sitio (Fonts API de Astro), sin llamadas a Google en runtime.
- **Sin framework de UI**: lo interactivo usa HTML nativo (`<details name>` para el FAQ, `<dialog>` para la galería) y scripts mínimos de Astro.
