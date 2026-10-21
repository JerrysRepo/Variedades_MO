import { useMemo, useState } from 'react';

import type { Category, Product, SiteContent } from '@variedades-mo/contracts';

import { Icon } from './Icon';
import { ProductGrid } from './ProductGrid';
import { SectionHeading } from './SectionHeading';

type CatalogSectionProps = {
  categories: Category[];
  content: SiteContent['catalog'];
  onCategoryChange: (categoryId: string) => void;
  products: Product[];
  selectedCategory: string;
};

export function CatalogSection({
  categories,
  content,
  onCategoryChange,
  products,
  selectedCategory,
}: CatalogSectionProps) {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');

    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const searchableText = `${product.name} ${product.description}`.toLocaleLowerCase('es');
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, selectedCategory]);

  return (
    <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
      <div className="page-container">
        <div className="catalog-section__heading">
          <SectionHeading
            description={content.description}
            eyebrow={content.eyebrow}
            id="catalog-title"
            title={content.title}
          />

          <label className="catalog-search" htmlFor="catalog-search">
            <span className="sr-only">{content.searchLabel}</span>
            <Icon name="search" />
            <input
              id="catalog-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={content.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="catalog-filters" aria-label={content.filtersLabel}>
          <button
            aria-pressed={!selectedCategory}
            onClick={() => onCategoryChange('')}
            type="button"
          >
            {content.allLabel}
          </button>
          {categories.map((category) => (
            <button
              aria-pressed={selectedCategory === category.id}
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>

        <p className="catalog-results" role="status" aria-live="polite" aria-atomic="true">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? content.resultSingular : content.resultPlural}
        </p>

        <ProductGrid categories={categories} content={content} products={filteredProducts} />
      </div>
    </section>
  );
}
