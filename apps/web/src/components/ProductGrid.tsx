import type { Category, Product, SiteContent } from '@variedades-mo/contracts';

import { ProductCard } from './ProductCard';

type ProductGridProps = {
  categories: Category[];
  content: SiteContent['catalog'];
  products: Product[];
};

export function ProductGrid({ categories, content, products }: ProductGridProps) {
  const categoryNames = new Map(categories.map((category) => [category.id, category.name]));

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">♡</span>
        <h3>{content.emptyTitle}</h3>
        <p>{content.emptyDescription}</p>
      </div>
    );
  }

  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            categoryName={categoryNames.get(product.category) ?? content.unknownCategoryLabel}
            featuredLabel={content.featuredLabel}
            placeholderLabel={content.placeholderLabel}
            pricePrefix={content.pricePrefix}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
}
