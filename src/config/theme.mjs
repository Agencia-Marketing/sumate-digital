/* ============================================================
   TEMA DEL SITIO — única fuente de marca (plantilla3 · Cyber-Luxe)
   ------------------------------------------------------------
   Esto es LO ÚNICO que cambias al crear un sitio nuevo:
   colores, tipografías y logo. No toques el markup ni global.css.
   ============================================================ */

// --- Colores (hex). Las claves son los nombres de clase Tailwind:
//     bg-bg-void, text-accent, text-text-secondary, from-accent, etc.
export const colors = {
  'bg-void':        '#0B1026',
  'bg-depth':       '#141C3F',
  accent:           '#FCA311',
  'accent-2':       '#123D89',
  'text-primary':   '#EEF1FA',
  'text-secondary': '#97A1C0',
  'text-dim':       '#586089',
  'grad-indigo':    '#123D89',
  'grad-violet':    '#164F9D',
  'grad-pink':      '#164F9D',
};

// --- Tipografías. Cambia las familias y el enlace de Google Fonts juntos.
export const fonts = {
  display:    'Manrope, sans-serif',  // titulares
  body:       'Manrope, sans-serif',  // cuerpo
  googleHref: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
};

// --- Logo. Si `image` tiene una ruta (archivo en /public), se usa la imagen.
//     Si está vacío, se usa el icono de Material Symbols `icon`.
export const logo = {
  image: '/logo-sumate-digital.png',  // p.ej. '/logo.svg'
  icon:  'bolt',                       // nombre de Material Symbols
  alt:   'Súmate Digital',
};
