import { useCallback, useEffect, useState } from 'react';

import type { CatalogData } from '@variedades-mo/contracts';

import { getCatalog } from '../services/catalog';

type CatalogState =
  | { status: 'loading'; catalog: null; message: null }
  | { status: 'success'; catalog: CatalogData; message: null }
  | { status: 'error'; catalog: null; message: string };

const initialState: CatalogState = {
  status: 'loading',
  catalog: null,
  message: null,
};

export function useCatalog() {
  const [state, setState] = useState<CatalogState>(initialState);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => {
    setState(initialState);
    setRequestKey((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getCatalog(controller.signal)
      .then((catalog) => {
        setState({ status: 'success', catalog, message: null });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            catalog: null,
            message: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
          });
        }
      });

    return () => controller.abort();
  }, [requestKey]);

  return { ...state, retry };
}
