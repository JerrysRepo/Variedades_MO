import { BrandLogo } from './BrandLogo';

export function LoadingPage() {
  return (
    <main className="loading-page" id="contenido-principal">
      <div role="status" aria-live="polite" aria-label="Cargando catálogo">
        <BrandLogo className="loading-page__logo" decorative />
        <span className="loading-page__indicator" aria-hidden="true" />
        <p>Preparando detalles especiales…</p>
      </div>
    </main>
  );
}
