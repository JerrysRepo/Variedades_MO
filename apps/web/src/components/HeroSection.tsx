import type { SiteContent } from '@variedades-mo/contracts';

import { BrandLogo } from './BrandLogo';
import { ButtonLink } from './ButtonLink';
import { Icon } from './Icon';

type HeroSectionProps = {
  content: SiteContent['hero'];
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="page-container hero-section__grid">
        <div className="hero-section__copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="hero-title">
            {content.title} <em>{content.highlight}</em>
          </h1>
          <p className="hero-section__description">{content.description}</p>
          <div className="hero-section__actions">
            <ButtonLink href="#catalogo">
              {content.primaryLabel}
              <Icon className="button-link__icon" name="arrow" />
            </ButtonLink>
            <a className="text-link" href="#colecciones">
              {content.secondaryLabel}
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__wash" />
          <span className="hero-art__spark hero-art__spark--one">✦</span>
          <span className="hero-art__spark hero-art__spark--two">✦</span>
          <BrandLogo className="hero-art__logo" decorative />
          <p className="hero-art__note">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
