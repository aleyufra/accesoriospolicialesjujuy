/**
 * Textos fijos de la landing (no editables desde el CMS).
 * El catálogo y los datos de contacto viven en src/content/.
 */
import type { IconName } from '@/components/ui/icons';

interface IconText {
  icon: IconName;
  text: string;
}

interface Feature {
  icon: IconName;
  titulo: string;
  texto: string;
}

interface Faq {
  pregunta: string;
  respuesta: string;
}

export const trustItems: IconText[] = [
  { icon: 'map-pin', text: 'Entregas en San Salvador de Jujuy y alrededores' },
  { icon: 'wallet', text: 'Efectivo o transferencia' },
  { icon: 'camera', text: 'Fotos reales' },
];

export const pasos: string[] = [
  'Escribinos por WhatsApp y contame qué te gustaría llevar y qué es lo que te hace falta.',
  'Te mandamos fotos reales y precio cerrado en el primer mensaje.',
  'Te decimos con honestidad qué te sirve y qué no.',
  'Coordinamos la entrega en mano y pagás al recibir.',
];

export const beneficios: Feature[] = [
  {
    icon: 'eye',
    titulo: 'Transparencia total',
    texto: 'Precio claro desde el primer mensaje, sin letra chica.',
  },
  { icon: 'package', titulo: 'Solo lo que te falta', texto: 'Sin combos obligatorios.' },
  { icon: 'check-circle', titulo: 'Honestidad', texto: 'Te decimos qué te sirve y qué no.' },
  {
    icon: 'user',
    titulo: 'Vendedor local',
    texto: 'Alguien de Jujuy al que le podés ver la cara.',
  },
];

export const extras: Feature[] = [
  {
    icon: 'shield-check',
    titulo: 'Asesoramiento de compatibilidad',
    texto: 'Antes de comprar te confirmamos si la funda le va a tu arma.',
  },
  {
    icon: 'layers',
    titulo: 'Armado del correaje',
    texto:
      'Te mostramos cómo ubicar cada accesorio para repartir mejor el peso y cuidar la cintura.',
  },
];

export const faqs: Faq[] = [
  {
    pregunta: '¿Le va a mi arma reglamentaria?',
    respuesta: 'Escribinos qué arma usás y te confirmamos antes de comprar.',
  },
  {
    pregunta: '¿Tengo que pagar antes?',
    respuesta: 'No. Recibís el equipo en mano, lo revisás y recién ahí pagás.',
  },
  {
    pregunta: '¿Cómo puedo pagar?',
    respuesta: 'Efectivo o transferencia, al momento de la entrega.',
  },
  {
    pregunta: '¿Dónde entregan?',
    respuesta:
      'En San Salvador de Jujuy y alrededores. Coordinamos el lugar y horario por WhatsApp.',
  },
  {
    pregunta: '¿Tengo que comprar un combo?',
    respuesta: 'No. Comprás solo lo que te falta.',
  },
];
