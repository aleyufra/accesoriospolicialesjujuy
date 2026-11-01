import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Catálogo: una carpeta por producto con `index.json` y sus fotos al lado.
 * Lo edita Sveltia CMS (ver public/admin/config.yml).
 */
const productos = defineCollection({
  loader: glob({ pattern: '*/index.json', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(1),
      /** Artículo para el mensaje de WhatsApp: "me interesa el cinto táctico". */
      articulo: z.enum(['el', 'la', 'los', 'las']),
      precio: z.number().int().nonnegative(),
      descripcion: z.string().min(1),
      /** La primera foto es la principal de la tarjeta. */
      fotos: z.array(image()).default([]),
      orden: z.number().int().default(0),
    }),
});

/** Datos de contacto y redes (un único archivo JSON). */
const ajustes = defineCollection({
  loader: file('src/content/ajustes/contacto.json', {
    parser: (text) => [{ id: 'contacto', ...JSON.parse(text) }],
  }),
  schema: z.object({
    /** Formato internacional sin "+" ni espacios: 549 + área + número. */
    whatsapp: z.string().regex(/^549\d{10}$/),
    telefonoVisible: z.string().min(1),
    mensajeConsulta: z.string().min(1),
    facebook: z.url().optional().or(z.literal('')),
    instagram: z.url().optional().or(z.literal('')),
  }),
});

export const collections = { productos, ajustes };
