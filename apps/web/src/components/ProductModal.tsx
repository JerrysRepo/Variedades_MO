import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import type { Product, SiteContent } from '@variedades-mo/contracts';

import { formatPrice } from '../utils/formatPrice';
import { ProductMedia } from './ProductMedia';

type ProductModalProps = {
  categoryName: string;
  content: SiteContent['catalog'];
  onClose: () => void;
  product: Product;
};

export function ProductModal({ categoryName, content, onClose, product }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const titleId = `product-modal-title-${product.slug}`;
  const descriptionId = `product-modal-description-${product.slug}`;

  return createPortal(
    <div
      className="product-modal-layer"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="presentation"
    >
      <section
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="product-modal"
        role="dialog"
      >
        <button
          aria-label={content.closeProductLabel}
          className="product-modal__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="product-modal__layout">
          <header className="product-modal__header">
            <p className="product-card__category">{categoryName}</p>
            <h2 id={titleId}>{product.name}</h2>
          </header>

          <div className="product-modal__media">
            <ProductMedia
              imageUrl={product.imageUrl}
              name={product.name}
              placeholderLabel={content.placeholderLabel}
            />
            {product.featured ? (
              <span className="product-card__badge">{content.featuredLabel}</span>
            ) : null}
          </div>

          <div className="product-modal__content">
            <p className="product-modal__price">
              <span>{content.pricePrefix}</span>
              <strong>{formatPrice(product.price, product.currency)}</strong>
            </p>

            <div className="product-modal__description">
              <h3>{content.productDescriptionLabel}</h3>
              <p id={descriptionId}>{product.description}</p>
            </div>

            <dl className="product-modal__meta">
              <div>
                <dt>{content.productCodeLabel}</dt>
                <dd>{product.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
