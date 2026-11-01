import { getCollection, getEntry } from 'astro:content';
import { waLink } from './whatsapp';

/** Datos de contacto editables desde el CMS, con el link general de WhatsApp ya armado. */
export async function getContacto() {
  const entry = await getEntry('ajustes', 'contacto');
  if (!entry) throw new Error('Falta src/content/ajustes/contacto.json');
  const data = entry.data;
  return { ...data, waHref: waLink(data.whatsapp, data.mensajeConsulta) };
}

/** Productos ordenados por el campo `orden` (y por nombre si empatan). */
export async function getProductos() {
  const productos = await getCollection('productos');
  return productos.sort(
    (a, b) => a.data.orden - b.data.orden || a.data.nombre.localeCompare(b.data.nombre, 'es'),
  );
}
