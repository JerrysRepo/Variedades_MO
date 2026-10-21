const apiUrl = import.meta.env.VITE_API_URL?.trim();

export const appConfig = {
  apiUrl: apiUrl || null,
  appVersion: '0.1.0',
  // Los datos simulados nunca deben aparecer por una mala configuración de producción.
  usesMockData: !apiUrl && import.meta.env.DEV,
} as const;
