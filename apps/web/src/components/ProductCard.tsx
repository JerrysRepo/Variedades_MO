import type { Product } from '@variedades-mo/contracts';

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100">
        {product.imageUrl ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            src={product.imageUrl}
            alt={product.name}
            decoding="async"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm">
              Imagen pendiente
            </span>
          </div>
        )}

        {product.featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
            Destacado
          </span>
        ) : null}
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
            {product.category}
          </p>
          <h3 className="text-xl font-bold tracking-tight text-slate-950">{product.name}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-end justify-between border-t border-slate-100 pt-4">
          <p className="text-2xl font-black tracking-tight text-slate-950">
            {formatPrice(product.price, product.currency)}
          </p>
          <span className="text-xs font-medium text-slate-600">#{product.id}</span>
        </div>
      </div>
    </article>
  );
}
