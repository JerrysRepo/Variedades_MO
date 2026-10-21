import type { Product } from '@variedades-mo/contracts';

type ProductCardProps = {
  categoryName: string;
  featuredLabel: string;
  placeholderLabel: string;
  pricePrefix: string;
  product: Product;
};

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}

export function ProductCard({
  categoryName,
  featuredLabel,
  placeholderLabel,
  pricePrefix,
  product,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.imageUrl ? (
          <img
            alt={product.name}
            decoding="async"
            loading="lazy"
            referrerPolicy="no-referrer"
            src={product.imageUrl}
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true">
            <span>MO</span>
            <small>{placeholderLabel}</small>
          </div>
        )}

        {product.featured ? <span className="product-card__badge">{featuredLabel}</span> : null}
      </div>

      <div className="product-card__content">
        <p className="product-card__category">{categoryName}</p>
        <h3>{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <p>
            <span>{pricePrefix}</span>
            <strong>{formatPrice(product.price, product.currency)}</strong>
          </p>
          <span className="product-card__id">#{product.id}</span>
        </div>
      </div>
    </article>
  );
}
