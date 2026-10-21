const API_VERSION = 'v1';
const DEFAULT_PRODUCTS_SHEET = 'Productos';
const DEFAULT_CATEGORIES_SHEET = 'Categorias';
const DEFAULT_BENEFITS_SHEET = 'Beneficios';
const DEFAULT_SETTINGS_SHEET = 'Contenido';
const DEFAULT_CACHE_SECONDS = 300;
const DEFAULT_MAX_PRODUCTS = 1000;

/**
 * @typedef {Object} AppConfig
 * @property {string} spreadsheetId
 * @property {string} productsSheetName
 * @property {string} categoriesSheetName
 * @property {string} benefitsSheetName
 * @property {string} settingsSheetName
 * @property {number} cacheSeconds
 * @property {number} maxProducts
 */

/** @returns {AppConfig} */
function getConfig() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = properties.getProperty('SPREADSHEET_ID');

  if (!spreadsheetId) {
    throw new Error('Missing required script property: SPREADSHEET_ID');
  }

  return Object.freeze({
    spreadsheetId,
    productsSheetName: properties.getProperty('PRODUCTS_SHEET_NAME') || DEFAULT_PRODUCTS_SHEET,
    categoriesSheetName:
      properties.getProperty('CATEGORIES_SHEET_NAME') || DEFAULT_CATEGORIES_SHEET,
    benefitsSheetName: properties.getProperty('BENEFITS_SHEET_NAME') || DEFAULT_BENEFITS_SHEET,
    settingsSheetName: properties.getProperty('SETTINGS_SHEET_NAME') || DEFAULT_SETTINGS_SHEET,
    cacheSeconds: readIntegerProperty(
      properties,
      'CACHE_SECONDS',
      DEFAULT_CACHE_SECONDS,
      60,
      21_600,
    ),
    maxProducts: readIntegerProperty(properties, 'MAX_PRODUCTS', DEFAULT_MAX_PRODUCTS, 1, 5000),
  });
}

/**
 * @param {GoogleAppsScript.Properties.Properties} properties
 * @param {string} name
 * @param {number} fallback
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function readIntegerProperty(properties, name, fallback, minimum, maximum) {
  const raw = properties.getProperty(name);
  if (!raw) return fallback;

  const value = Number(raw);
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`Invalid script property: ${name}`);
  }

  return value;
}
