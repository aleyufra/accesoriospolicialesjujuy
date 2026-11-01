const priceFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

/** 60000 → "$60.000" */
export function formatPrice(value: number): string {
  return `$${priceFormatter.format(value)}`;
}

/** "Cinto táctico" → "cinto táctico" */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
