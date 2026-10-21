import { useCallback, useEffect, useState } from 'react';

import type { Product } from '@variedades-mo/contracts';

import { getProducts } from '../services/products';

type ProductsState =
  | { status: 'loading'; products: Product[]; message: null }
  | { status: 'success'; products: Product[]; message: null }
  | { status: 'error'; products: Product[]; message: string };

const initialState: ProductsState = {
  status: 'loading',
  products: [],
  message: null,
};

export function useProducts() {
  const [state, setState] = useState<ProductsState>(initialState);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setState(initialState);
    setRequestKey((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((products) => {
        setState({ status: 'success', products, message: null });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            products: [],
            message: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
          });
        }
      });

    return () => controller.abort();
  }, [requestKey]);

  return { ...state, retry };
}
