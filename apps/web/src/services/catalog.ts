import {
  apiErrorResponseSchema,
  catalogResponseSchema,
  type CatalogData,
} from '@variedades-mo/contracts';

import { appConfig } from '../config';

const REQUEST_TIMEOUT_MS = 10_000;

export class CatalogServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CatalogServiceError';
  }
}

function buildCatalogUrl(): string {
  if (appConfig.usesMockData) {
    return '/mock/catalog.json';
  }

  if (!appConfig.apiUrl) {
    throw new CatalogServiceError('El catálogo todavía no está configurado.');
  }

  const url = new URL(appConfig.apiUrl);
  url.searchParams.set('resource', 'catalog');
  return url.toString();
}

export async function getCatalog(signal?: AbortSignal): Promise<CatalogData> {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutController.signal])
    : timeoutController.signal;

  try {
    const response = await fetch(buildCatalogUrl(), {
      headers: { Accept: 'application/json' },
      redirect: 'follow',
      signal: combinedSignal,
    });

    if (!response.ok) {
      throw new CatalogServiceError('El catálogo no está disponible temporalmente.');
    }

    const payload: unknown = await response.json();
    const success = catalogResponseSchema.safeParse(payload);

    if (success.success) {
      return success.data.data;
    }

    const failure = apiErrorResponseSchema.safeParse(payload);
    if (failure.success) {
      throw new CatalogServiceError(failure.data.error.message);
    }

    throw new CatalogServiceError('La respuesta del catálogo no tiene el formato esperado.');
  } catch (error) {
    if (error instanceof CatalogServiceError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new CatalogServiceError('La consulta tardó demasiado. Intenta nuevamente.');
    }

    if (!navigator.onLine) {
      throw new CatalogServiceError('Parece que no tienes conexión a internet.');
    }

    throw new CatalogServiceError('No fue posible conectar con el catálogo.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}
