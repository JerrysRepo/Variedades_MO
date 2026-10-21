import type { Benefit } from '@variedades-mo/contracts';

import { Icon } from './Icon';

type BenefitsBarProps = {
  benefits: Benefit[];
};

export function BenefitsBar({ benefits }: BenefitsBarProps) {
  if (benefits.length === 0) return null;

  return (
    <section className="benefits-section" aria-label="Beneficios">
      <div className="page-container benefits-grid">
        {benefits.map((benefit) => (
          <article className="benefit-item" key={benefit.id}>
            <span className="benefit-item__icon">
              <Icon name={benefit.icon} />
            </span>
            <div>
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
