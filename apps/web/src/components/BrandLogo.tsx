type BrandLogoProps = {
  alt?: string;
  className?: string;
  decorative?: boolean;
};

export function BrandLogo({ alt = 'Variedades MOMO', className, decorative }: BrandLogoProps) {
  return (
    <img
      alt={decorative ? '' : alt}
      className={className}
      decoding="async"
      height="1254"
      src="/brand/variedades-momo-logo.png"
      width="1254"
    />
  );
}
