import type { SiteContent } from '@variedades-mo/contracts';

import { BrandLogo } from './BrandLogo';

type StorySectionProps = {
  content: SiteContent['story'];
  tagline: string;
};

export function StorySection({ content, tagline }: StorySectionProps) {
  return (
    <section className="story-section" id="nosotros" aria-labelledby="story-title">
      <div className="page-container story-section__grid">
        <div className="story-art" aria-hidden="true">
          <span className="story-art__word">{content.mark}</span>
          <BrandLogo className="story-art__logo" decorative />
        </div>
        <div className="story-section__copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="story-title">{content.title}</h2>
          <p>{content.description}</p>
          <div className="story-signature">{tagline}</div>
        </div>
      </div>
    </section>
  );
}
