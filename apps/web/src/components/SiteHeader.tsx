import type { SiteContent } from '@variedades-mo/contracts';

import { BrandLogo } from './BrandLogo';
import { ButtonLink } from './ButtonLink';

type SiteHeaderProps = {
  brand: SiteContent['brand'];
  navigation: SiteContent['navigation'];
  whatsappLabel: string;
  whatsappUrl: string | null;
};

export function SiteHeader({ brand, navigation, whatsappLabel, whatsappUrl }: SiteHeaderProps) {
  const navigationItems = [
    { href: '#colecciones', label: navigation.collectionsLabel },
    { href: '#catalogo', label: navigation.catalogLabel },
    { href: '#nosotros', label: navigation.storyLabel },
    { href: '#contacto', label: navigation.contactLabel },
  ];

  return (
    <header className="site-header">
      <div className="page-container site-header__inner">
        <a className="brand-lockup" href="#contenido-principal" aria-label="Ir al inicio">
          <BrandLogo alt={brand.name} className="brand-lockup__logo" />
          <span className="brand-lockup__text">
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </span>
        </a>

        <nav className="desktop-navigation" aria-label="Navegación principal">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {whatsappUrl ? (
          <ButtonLink className="site-header__action" href={whatsappUrl} variant="secondary">
            {whatsappLabel}
          </ButtonLink>
        ) : null}
      </div>
    </header>
  );
}
