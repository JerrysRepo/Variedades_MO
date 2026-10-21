import type { Category, SiteContent } from '@variedades-mo/contracts';

import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

type CategoryShowcaseProps = {
  categories: Category[];
  content: SiteContent['collections'];
  onSelect: (categoryId: string) => void;
};

const numberFormat = new Intl.NumberFormat('es-GT', {
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export function CategoryShowcase({ categories, content, onSelect }: CategoryShowcaseProps) {
  if (categories.length === 0) return null;

  const selectCategory = (categoryId: string) => {
    onSelect(categoryId);
    const target = document.getElementById('catalogo');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="collections-section" id="colecciones" aria-labelledby="collections-title">
      <div className="page-container">
        <SectionHeading
          description={content.description}
          eyebrow={content.eyebrow}
          id="collections-title"
          title={content.title}
        />

        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              className="category-card"
              key={category.id}
              onClick={() => selectCategory(category.id)}
              type="button"
            >
              <span className="category-card__media">
                {category.imageUrl ? (
                  <img alt="" loading="lazy" src={category.imageUrl} />
                ) : (
                  <span className="category-card__number" aria-hidden="true">
                    {numberFormat.format(index + 1)}
                  </span>
                )}
              </span>
              <span className="category-card__content">
                <small>{content.itemLabel}</small>
                <strong>{category.name}</strong>
                <span>{category.description}</span>
                <b>
                  {content.actionLabel} <Icon name="arrow" />
                </b>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
