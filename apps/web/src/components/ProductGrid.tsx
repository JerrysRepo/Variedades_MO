import type { Product } from '@variedades-mo/contracts';

import { ProductCard } from './ProductCard';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center">
        <h3 className="text-lg font-bold text-slate-900">Todavía no hay productos publicados</h3>
        <p className="mt-2 text-sm text-slate-600">
          Activa al menos un producto en Google Sheets para mostrarlo aquí.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
