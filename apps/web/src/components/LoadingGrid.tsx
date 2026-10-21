export function LoadingGrid() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-live="polite"
      aria-label="Cargando productos"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <div
          aria-hidden="true"
          className="animate-pulse overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white motion-reduce:animate-none"
          key={index}
        >
          <div className="aspect-[4/3] bg-slate-100" />
          <div className="space-y-4 p-6">
            <div className="h-3 w-24 rounded bg-slate-100" />
            <div className="h-6 w-3/4 rounded bg-slate-100" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-8 w-32 rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
