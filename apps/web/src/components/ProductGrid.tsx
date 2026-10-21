import type { Product } from '@variedades-mo/contracts';

import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center">
        <h2 className="text-lg font-bold text-slate-900">Todavía no hay productos publicados</h2>
        <p className="mt-2 text-sm text-slate-600">
          Activa al menos un producto en Google Sheets para mostrarlo aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
