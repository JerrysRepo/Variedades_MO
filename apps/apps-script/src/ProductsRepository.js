const PRODUCT_HEADERS = Object.freeze([
  'id',
  'slug',
  'nombre',
  'categoria',
  'descripcion',
  'precio',
  'moneda',
  'imagen_url',
  'activo',
  'destacado',
  'orden',
]);

/**
 * @typedef {Object} PublicProduct
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {number} price
 * @property {string} currency
 * @property {string|null} imageUrl
 * @property {boolean} featured
 * @property {number} order
 */

/**
 * @param {AppConfig} config
 * @returns {PublicProduct[]}
 */
function readPublicProducts(config) {
  const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
  const sheet = spreadsheet.getSheetByName(config.productsSheetName);

  if (!sheet) {
    throw new Error(`Products sheet not found: ${config.productsSheetName}`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const indexes = createHeaderIndex(headers, PRODUCT_HEADERS, 'product');
  const products = [];
  const ids = new Set();
  const slugs = new Set();

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    try {
      const product = mapProductRow(row, indexes);
      if (!product) continue;

      if (ids.has(product.id) || slugs.has(product.slug)) {
        throw new Error('Duplicate product id or slug');
      }

      ids.add(product.id);
      slugs.add(product.slug);
      products.push(product);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown validation error';
      Logger.log(`Skipped product row ${rowIndex + 1}: ${reason}`);
    }
  }

  return products
    .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
    .slice(0, config.maxProducts);
}

/**
 * @param {string[]} headers
 * @param {readonly string[]} requiredHeaders
 * @param {string} resourceName
 * @returns {Record<string, number>}
 */
function createHeaderIndex(headers, requiredHeaders, resourceName) {
  /** @type {Record<string, number>} */
  const indexes = {};
  headers.forEach((header, index) => {
    indexes[header] = index;
  });

  requiredHeaders.forEach((header) => {
    if (indexes[header] === undefined) {
      throw new Error(`Missing required ${resourceName} header: ${header}`);
    }
  });

  return indexes;
}

/**
 * @param {unknown[]} row
 * @param {Record<string, number>} indexes
 * @returns {PublicProduct|null}
 */
function mapProductRow(row, indexes) {
  if (!normalizeBoolean(readCell(row, indexes, 'activo'))) return null;

  const id = sanitizeIdentifier(readCell(row, indexes, 'id'));
  const slug = sanitizeSlug(readCell(row, indexes, 'slug'));
  const name = sanitizeText(readCell(row, indexes, 'nombre'), 160);
  const category = sanitizeSlug(readCell(row, indexes, 'categoria'));
  const description = sanitizeText(readCell(row, indexes, 'descripcion'), 1000);
  const price = normalizeNumber(readCell(row, indexes, 'precio'), 0);
  const order = normalizeInteger(readCell(row, indexes, 'orden'), 0);

  if (!id || !slug || !name || !category || price < 0 || order < 0) {
    throw new Error('Invalid required product field');
  }

  return {
    id,
    slug,
    name,
    category,
    description,
    price,
    currency: normalizeCurrency(readCell(row, indexes, 'moneda')),
    imageUrl: sanitizeHttpsUrl(readCell(row, indexes, 'imagen_url')),
    featured: normalizeBoolean(readCell(row, indexes, 'destacado')),
    order,
  };
}

/**
 * @param {unknown[]} row
 * @param {Record<string, number>} indexes
 * @param {string} header
 * @returns {unknown}
 */
function readCell(row, indexes, header) {
  return row[indexes[header]];
}

/** @param {unknown} value @returns {boolean} */
function normalizeBoolean(value) {
  if (typeof value === 'boolean') return value;
  const normalized = String(value).trim().toLowerCase();
  return ['1', 'true', 'si', 'sí', 'yes'].includes(normalized);
}

/** @param {unknown} value @param {number} fallback @returns {number} */
function normalizeNumber(value, fallback) {
  if (value === '' || value === null || value === undefined) return fallback;
  const normalized = typeof value === 'string' ? value.replace(',', '.').trim() : value;
  const number = Number(normalized);
  if (!Number.isFinite(number)) throw new Error('Invalid numeric value');
  return number;
}

/** @param {unknown} value @param {number} fallback @returns {number} */
function normalizeInteger(value, fallback) {
  const number = normalizeNumber(value, fallback);
  if (!Number.isInteger(number)) throw new Error('Expected integer value');
  return number;
}

/** @param {unknown} value @param {number} maximumLength @returns {string} */
function sanitizeText(value, maximumLength) {
  return String(value ?? '')
    .replace(/\p{Cc}/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maximumLength);
}

/** @param {unknown} value @returns {string} */
function sanitizeIdentifier(value) {
  const result = sanitizeText(value, 80);
  return /^[A-Za-z0-9._-]+$/.test(result) ? result : '';
}

/** @param {unknown} value @returns {string} */
function sanitizeSlug(value) {
  const result = sanitizeText(value, 120).toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result) ? result : '';
}

/** @param {unknown} value @returns {string} */
function normalizeCurrency(value) {
  const result = sanitizeText(value, 3).toUpperCase() || 'GTQ';
  if (!/^[A-Z]{3}$/.test(result)) throw new Error('Invalid currency');
  return result;
}

/** @param {unknown} value @returns {string|null} */
function sanitizeHttpsUrl(value) {
  const result = sanitizeText(value, 2048);
  if (!result) return null;
  if (!/^https:\/\/[^\s]+$/i.test(result)) throw new Error('Invalid image URL');
  return result;
}
