import {
  apiErrorResponseSchema,
  productListResponseSchema,
  type Product,
} from '@variedades-mo/contracts';

import { appConfig } from '../config';

const REQUEST_TIMEOUT_MS = 10_000;

export class ProductsServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductsServiceError';
  }
}

function buildProductsUrl(): string {
  if (appConfig.usesMockData) {
    return '/mock/products.json';
  }

  if (!appConfig.apiUrl) {
    throw new ProductsServiceError('El catálogo todavía no está configurado.');
  }

  const url = new URL(appConfig.apiUrl);
  url.searchParams.set('resource', 'products');
  return url.toString();
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutController.signal])
    : timeoutController.signal;

  try {
    const response = await fetch(buildProductsUrl(), {
      headers: { Accept: 'application/json' },
      redirect: 'follow',
      signal: combinedSignal,
    });

    if (!response.ok) {
      throw new ProductsServiceError('El catálogo no está disponible temporalmente.');
    }

    const payload: unknown = await response.json();
    const success = productListResponseSchema.safeParse(payload);

    if (success.success) {
      return success.data.data.products;
    }

    const failure = apiErrorResponseSchema.safeParse(payload);
    if (failure.success) {
      throw new ProductsServiceError(failure.data.error.message);
    }

    throw new ProductsServiceError('La respuesta del catálogo no tiene el formato esperado.');
  } catch (error) {
    if (error instanceof ProductsServiceError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ProductsServiceError('La consulta tardó demasiado. Intenta nuevamente.');
    }

    throw new ProductsServiceError('No fue posible conectar con el catálogo.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}
