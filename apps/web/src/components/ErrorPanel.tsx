import { BrandLogo } from './BrandLogo';

type ErrorPanelProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorPanel({ message, onRetry }: ErrorPanelProps) {
  return (
    <main className="error-page" id="contenido-principal">
      <div className="error-panel" role="alert">
        <BrandLogo className="error-panel__logo" decorative />
        <p className="eyebrow">Algo no salió como esperábamos</p>
        <h1>No pudimos cargar el catálogo</h1>
        <p>{message}</p>
        <button className="button-link button-link--primary" type="button" onClick={onRetry}>
          Intentar nuevamente
        </button>
      </div>
    </main>
  );
}
