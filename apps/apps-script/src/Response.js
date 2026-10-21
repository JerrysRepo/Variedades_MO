const PRODUCTS_CACHE_KEY = 'api:v1:products';
const CACHE_VALUE_LIMIT = 90_000;

/**
 * @param {AppConfig} config
 * @returns {{ok: true, apiVersion: string, generatedAt: string, data: {products: PublicProduct[]}}}
 */
function getProductsPayload(config) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(PRODUCTS_CACHE_KEY);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      Logger.log(`Ignored invalid cached payload: ${String(error)}`);
    }
  }

  const payload = {
    ok: /** @type {const} */ (true),
    apiVersion: API_VERSION,
    generatedAt: new Date().toISOString(),
    data: { products: readPublicProducts(config) },
  };
  const serialized = JSON.stringify(payload);

  if (serialized.length <= CACHE_VALUE_LIMIT) {
    cache.put(PRODUCTS_CACHE_KEY, serialized, config.cacheSeconds);
  }

  return payload;
}

/**
 * @param {unknown} payload
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function jsonOutput(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
