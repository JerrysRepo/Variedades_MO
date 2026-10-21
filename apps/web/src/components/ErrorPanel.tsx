type ErrorPanelProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorPanel({ message, onRetry }: ErrorPanelProps) {
  return (
    <div className="rounded-[1.75rem] border border-red-200 bg-red-50 p-8 text-center" role="alert">
      <h3 className="text-lg font-bold text-red-950">No pudimos cargar el catálogo</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-800">{message}</p>
      <button
        className="mt-5 rounded-full bg-red-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-950"
        type="button"
        onClick={onRetry}
      >
        Intentar nuevamente
      </button>
    </div>
  );
}
