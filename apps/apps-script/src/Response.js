const PRODUCTS_CACHE_KEY = 'api:v1:products';
const CATALOG_CACHE_KEY = 'api:v1:catalog';
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
 * @param {AppConfig} config
 * @returns {{ok: true, apiVersion: string, generatedAt: string, data: {site: SiteContent, categories: PublicCategory[], benefits: PublicBenefit[], products: PublicProduct[]}}}
 */
function getCatalogPayload(config) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(CATALOG_CACHE_KEY);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (error) {
      Logger.log(`Ignored invalid cached catalog: ${String(error)}`);
    }
  }

  const categories = readPublicCategories(config);
  const categoryIds = new Set(categories.map((category) => category.id));
  const products = readPublicProducts(config).filter((product) => {
    const valid = categoryIds.has(product.category);
    if (!valid) Logger.log(`Skipped product ${product.id}: unknown category ${product.category}`);
    return valid;
  });

  const payload = {
    ok: /** @type {const} */ (true),
    apiVersion: API_VERSION,
    generatedAt: new Date().toISOString(),
    data: {
      site: readSiteContent(config),
      categories,
      benefits: readPublicBenefits(config),
      products,
    },
  };
  const serialized = JSON.stringify(payload);

  if (serialized.length <= CACHE_VALUE_LIMIT) {
    cache.put(CATALOG_CACHE_KEY, serialized, config.cacheSeconds);
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
