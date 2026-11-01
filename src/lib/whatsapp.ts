import type { CollectionEntry } from 'astro:content';
import { formatPrice, lowerFirst } from './format';

type Producto = CollectionEntry<'productos'>['data'];

export function waLink(numero: string, texto: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

/** Mensaje precargado al pedir un producto puntual. */
export function productMessage({ articulo, nombre, precio }: Producto): string {
  return `Hola C.M.C.H, me interesa ${articulo} ${lowerFirst(nombre)} (${formatPrice(precio)}). Uso [mi arma] y estoy en [mi fuerza].`;
}
