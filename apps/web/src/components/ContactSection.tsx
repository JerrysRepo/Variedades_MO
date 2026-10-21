import type { SiteContent } from '@variedades-mo/contracts';

import { ButtonLink } from './ButtonLink';
import { Icon } from './Icon';

type ContactSectionProps = {
  content: SiteContent['contact'];
};

export function ContactSection({ content }: ContactSectionProps) {
  const hasChannels = Boolean(content.whatsappUrl || content.instagramUrl || content.email);

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="page-container">
        <div className="contact-panel">
          <div>
            <p className="eyebrow eyebrow--light">{content.eyebrow}</p>
            <h2 id="contact-title">{content.title}</h2>
            <p>{content.description}</p>
          </div>

          <div className="contact-panel__actions">
            {content.whatsappUrl ? (
              <ButtonLink href={content.whatsappUrl} variant="light">
                {content.whatsappLabel}
                <Icon className="button-link__icon" name="arrow" />
              </ButtonLink>
            ) : null}
            {content.instagramUrl ? (
              <ButtonLink href={content.instagramUrl} variant="light">
                {content.instagramLabel}
              </ButtonLink>
            ) : null}
            {content.email ? (
              <a className="contact-panel__email" href={`mailto:${content.email}`}>
                {content.email}
              </a>
            ) : null}
            {!hasChannels ? (
              <p className="contact-panel__pending">{content.pendingMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
