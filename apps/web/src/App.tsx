import { ErrorPanel } from './components/ErrorPanel';
import { LoadingGrid } from './components/LoadingGrid';
import { ProductGrid } from './components/ProductGrid';
import { appConfig } from './config';
import { useProducts } from './hooks/useProducts';

export function App() {
  const { status, products, message, retry } = useProducts();

  return (
    <div className="min-h-screen bg-[var(--page-background)] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a className="flex items-center gap-3" href="#inicio" aria-label="Ir al inicio">
            <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
              MO
            </span>
            <span>
              <strong className="block text-base leading-tight">Variedades MO</strong>
              <span className="text-xs text-slate-500">Catálogo de productos</span>
            </span>
          </a>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            v{appConfig.appVersion}
          </span>
        </div>
      </header>

      <main id="inicio">
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-orange-700">
              Encuentra lo que necesitas
            </p>
            <h1 className="text-balance text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              Productos claros, precios actualizados.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Esta primera versión establece una base rápida, accesible y preparada para crecer con
              el negocio.
            </p>
          </div>

          {appConfig.usesMockData ? (
            <aside className="mt-8 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
              Entorno local: mostrando datos simulados
            </aside>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8" aria-labelledby="catalog-title">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">Selección disponible</p>
              <h2
                id="catalog-title"
                className="mt-1 text-2xl font-black tracking-tight sm:text-3xl"
              >
                Nuestro catálogo
              </h2>
            </div>
            {status === 'success' ? (
              <p className="text-sm font-semibold text-slate-500">
                {products.length} {products.length === 1 ? 'producto' : 'productos'}
              </p>
            ) : null}
          </div>

          {status === 'loading' ? <LoadingGrid /> : null}
          {status === 'error' ? <ErrorPanel message={message} onRetry={retry} /> : null}
          {status === 'success' ? <ProductGrid products={products} /> : null}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Variedades MO.</p>
          <p>Catálogo informativo · Sin pagos en línea</p>
        </div>
      </footer>
    </div>
  );
}
