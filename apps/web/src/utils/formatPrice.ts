export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}
