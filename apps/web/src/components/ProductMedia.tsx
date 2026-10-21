type ProductMediaProps = {
  imageUrl: string | null;
  name: string;
  placeholderLabel: string;
};

export function ProductMedia({ imageUrl, name, placeholderLabel }: ProductMediaProps) {
  if (imageUrl) {
    return (
      <img alt={name} decoding="async" loading="lazy" referrerPolicy="no-referrer" src={imageUrl} />
    );
  }

  return (
    <div className="product-placeholder" aria-hidden="true">
      <span>MO</span>
      <small>{placeholderLabel}</small>
    </div>
  );
}
