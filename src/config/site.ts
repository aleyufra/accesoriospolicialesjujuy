export const SITE = {
  name: 'C.M.C.H',
  title: 'C.M.C.H | Accesorios para correaje policial en Jujuy',
  description:
    'Funda, cinto, porta cargador, porta esposa y más. Entrega en mano en Jujuy y pagás al recibir. Pedidos por WhatsApp.',
  tagline: 'Accesorios para correaje policial · Jujuy',
  lang: 'es-AR',
  ogLocale: 'es_AR',
  themeColor: '#0B0C0A',
} as const;

/** Anclas de la landing (id de sección). */
export const NAV = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#como-comprar', label: 'Cómo comprar' },
  { href: '#preguntas', label: 'Preguntas' },
] as const;
