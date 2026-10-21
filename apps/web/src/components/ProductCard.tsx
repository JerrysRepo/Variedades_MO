import type { Product } from '@variedades-mo/contracts';

import { formatPrice } from '../utils/formatPrice';
import { ProductMedia } from './ProductMedia';

type ProductCardProps = {
  categoryName: string;
  featuredLabel: string;
  onOpen: (product: Product) => void;
  openProductLabel: string;
  placeholderLabel: string;
  pricePrefix: string;
  product: Product;
};

export function ProductCard({
  categoryName,
  featuredLabel,
  onOpen,
  openProductLabel,
  placeholderLabel,
  pricePrefix,
  product,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <header className="product-card__header">
        <p className="product-card__category">{categoryName}</p>
        <h3>{product.name}</h3>
      </header>

      <div className="product-card__media">
        <ProductMedia
          imageUrl={product.imageUrl}
          name={product.name}
          placeholderLabel={placeholderLabel}
        />

        {product.featured ? <span className="product-card__badge">{featuredLabel}</span> : null}
      </div>

      <div className="product-card__content">
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <p>
            <span>{pricePrefix}</span>
            <strong>{formatPrice(product.price, product.currency)}</strong>
          </p>
          <span className="product-card__action">
            {openProductLabel} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>

      <button
        aria-label={`${openProductLabel}: ${product.name}`}
        className="product-card__open"
        onClick={() => onOpen(product)}
        type="button"
      />
    </article>
  );
}
