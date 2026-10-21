import { useEffect, useRef } from 'react';

import { BrandLogo } from './BrandLogo';
import { Icon } from './Icon';

type ErrorPanelProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorPanel({ message, onRetry }: ErrorPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <main className="error-page" id="contenido-principal">
      <div
        aria-describedby="catalog-error-description catalog-error-help"
        aria-labelledby="catalog-error-title"
        className="error-panel"
        role="alert"
      >
        <div className="error-panel__brand">
          <BrandLogo className="error-panel__logo" decorative />
          <span>Variedades MOMO</span>
        </div>

        <span className="error-panel__icon" aria-hidden="true">
          <Icon name="alert" />
        </span>
        <p className="eyebrow">Algo no salió como esperábamos</p>
        <h1 id="catalog-error-title" ref={titleRef} tabIndex={-1}>
          No pudimos cargar el catálogo
        </h1>
        <p id="catalog-error-description">{message}</p>
        <button
          className="button-link button-link--primary error-panel__retry"
          type="button"
          onClick={onRetry}
        >
          <Icon className="button-link__icon" name="refresh" />
          Intentar nuevamente
        </button>
        <p className="error-panel__help" id="catalog-error-help">
          Revisa tu conexión. Si el problema continúa, inténtalo de nuevo en unos minutos.
        </p>
      </div>
    </main>
  );
}
