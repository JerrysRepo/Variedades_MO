import type { SiteContent } from '@variedades-mo/contracts';

import { BrandLogo } from './BrandLogo';

type SiteFooterProps = {
  site: SiteContent;
};

export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__grid">
        <div className="site-footer__brand">
          <BrandLogo alt={site.brand.name} />
          <div>
            <strong>{site.brand.name}</strong>
            <p>{site.footer.description}</p>
          </div>
        </div>

        <nav aria-label="Navegación del pie de página">
          <a href="#colecciones">{site.navigation.collectionsLabel}</a>
          <a href="#catalogo">{site.navigation.catalogLabel}</a>
          <a href="#nosotros">{site.navigation.storyLabel}</a>
          <a href="#contacto">{site.navigation.contactLabel}</a>
        </nav>

        <div className="site-footer__meta">
          <p>{site.footer.location}</p>
          <p>
            © {new Date().getFullYear()} {site.brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
