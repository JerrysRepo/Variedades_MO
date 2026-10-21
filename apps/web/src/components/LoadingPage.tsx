import { useEffect, useState } from 'react';

import { BrandLogo } from './BrandLogo';

const LOADING_FEEDBACK_DELAY_MS = 180;

export function LoadingPage() {
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowFeedback(true), LOADING_FEEDBACK_DELAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!showFeedback) {
    return <main className="loading-page loading-page--quiet" aria-busy="true" />;
  }

  return (
    <main className="loading-page" id="contenido-principal" aria-busy="true">
      <div className="loading-page__panel" role="status" aria-live="polite">
        <p className="eyebrow">Variedades MOMO</p>
        <BrandLogo className="loading-page__logo" decorative />
        <h1>Preparando detalles especiales…</h1>
        <p>Estamos organizando el catálogo para ti.</p>
        <span
          className="loading-page__indicator"
          role="progressbar"
          aria-label="Cargando catálogo"
        />
      </div>
    </main>
  );
}
