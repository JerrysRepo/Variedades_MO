const CATEGORY_HEADERS = Object.freeze([
  'id',
  'nombre',
  'descripcion',
  'imagen_url',
  'activo',
  'orden',
]);

const BENEFIT_HEADERS = Object.freeze(['id', 'titulo', 'descripcion', 'icono', 'activo', 'orden']);

const SETTING_HEADERS = Object.freeze(['clave', 'valor']);
const BENEFIT_ICONS = Object.freeze(['sparkles', 'gift', 'heart', 'truck']);

/**
 * @typedef {Object} PublicCategory
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string|null} imageUrl
 * @property {number} order
 */

/**
 * @typedef {Object} PublicBenefit
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'sparkles'|'gift'|'heart'|'truck'} icon
 * @property {number} order
 */

/**
 * @typedef {Object} SiteContent
 * @property {{name: string, tagline: string}} brand
 * @property {{enabled: boolean, text: string}} announcement
 * @property {{homeLabel: string, collectionsLabel: string, catalogLabel: string, storyLabel: string, contactLabel: string}} navigation
 * @property {{eyebrow: string, title: string, highlight: string, description: string, primaryLabel: string, secondaryLabel: string, note: string}} hero
 * @property {{eyebrow: string, title: string, description: string, itemLabel: string, actionLabel: string}} collections
 * @property {{eyebrow: string, title: string, description: string, allLabel: string, searchPlaceholder: string, searchLabel: string, filtersLabel: string, featuredLabel: string, openProductLabel: string, closeProductLabel: string, productDescriptionLabel: string, productCodeLabel: string, pricePrefix: string, placeholderLabel: string, unknownCategoryLabel: string, resultSingular: string, resultPlural: string, emptyTitle: string, emptyDescription: string}} catalog
 * @property {{eyebrow: string, title: string, description: string, mark: string}} story
 * @property {{eyebrow: string, title: string, description: string, whatsappLabel: string, instagramLabel: string, pendingMessage: string, whatsappUrl: string|null, instagramUrl: string|null, email: string|null}} contact
 * @property {{description: string, location: string}} footer
 */

/**
 * @param {AppConfig} config
 * @returns {PublicCategory[]}
 */
function readPublicCategories(config) {
  const sheet = SpreadsheetApp.openById(config.spreadsheetId).getSheetByName(
    config.categoriesSheetName,
  );

  if (!sheet) {
    throw new Error(`Categories sheet not found: ${config.categoriesSheetName}`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const indexes = createHeaderIndex(headers, CATEGORY_HEADERS, 'category');
  /** @type {PublicCategory[]} */
  const categories = [];
  const ids = new Set();

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    try {
      if (!normalizeBoolean(readCell(row, indexes, 'activo'))) continue;

      const category = {
        id: sanitizeSlug(readCell(row, indexes, 'id')),
        name: sanitizeText(readCell(row, indexes, 'nombre'), 100),
        description: sanitizeText(readCell(row, indexes, 'descripcion'), 280),
        imageUrl: sanitizeHttpsUrl(readCell(row, indexes, 'imagen_url')),
        order: normalizeInteger(readCell(row, indexes, 'orden'), 0),
      };

      if (!category.id || !category.name || category.order < 0) {
        throw new Error('Invalid required category field');
      }

      if (ids.has(category.id)) throw new Error('Duplicate category id');
      ids.add(category.id);
      categories.push(category);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown validation error';
      Logger.log(`Skipped category row ${rowIndex + 1}: ${reason}`);
    }
  }

  return categories
    .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
    .slice(0, 100);
}

/**
 * @param {AppConfig} config
 * @returns {PublicBenefit[]}
 */
function readPublicBenefits(config) {
  const sheet = SpreadsheetApp.openById(config.spreadsheetId).getSheetByName(
    config.benefitsSheetName,
  );

  if (!sheet) {
    throw new Error(`Benefits sheet not found: ${config.benefitsSheetName}`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const indexes = createHeaderIndex(headers, BENEFIT_HEADERS, 'benefit');
  /** @type {PublicBenefit[]} */
  const benefits = [];
  const ids = new Set();

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    try {
      if (!normalizeBoolean(readCell(row, indexes, 'activo'))) continue;

      const id = sanitizeSlug(readCell(row, indexes, 'id'));
      const title = sanitizeText(readCell(row, indexes, 'titulo'), 100);
      const description = sanitizeText(readCell(row, indexes, 'descripcion'), 220);
      const iconValue = sanitizeText(readCell(row, indexes, 'icono'), 20).toLowerCase();
      const order = normalizeInteger(readCell(row, indexes, 'orden'), 0);

      if (!id || !title || order < 0 || !BENEFIT_ICONS.includes(iconValue)) {
        throw new Error('Invalid required benefit field');
      }

      if (ids.has(id)) throw new Error('Duplicate benefit id');
      ids.add(id);
      benefits.push({
        id,
        title,
        description,
        icon: /** @type {'sparkles'|'gift'|'heart'|'truck'} */ (iconValue),
        order,
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown validation error';
      Logger.log(`Skipped benefit row ${rowIndex + 1}: ${reason}`);
    }
  }

  return benefits
    .sort((left, right) => left.order - right.order || left.title.localeCompare(right.title))
    .slice(0, 20);
}

/**
 * @param {AppConfig} config
 * @returns {SiteContent}
 */
function readSiteContent(config) {
  const sheet = SpreadsheetApp.openById(config.spreadsheetId).getSheetByName(
    config.settingsSheetName,
  );

  if (!sheet) {
    throw new Error(`Settings sheet not found: ${config.settingsSheetName}`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) throw new Error('Settings sheet is empty');

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const indexes = createHeaderIndex(headers, SETTING_HEADERS, 'setting');
  /** @type {Record<string, unknown>} */
  const settings = {};

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const key = sanitizeText(readCell(row, indexes, 'clave'), 80).toLowerCase();
    if (!key) continue;
    if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(key)) {
      Logger.log(`Skipped setting row ${rowIndex + 1}: invalid key`);
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(settings, key)) {
      throw new Error(`Duplicate setting key: ${key}`);
    }
    settings[key] = readCell(row, indexes, 'valor');
  }

  return {
    brand: {
      name: readRequiredSetting(settings, 'brand.name', 80),
      tagline: readRequiredSetting(settings, 'brand.tagline', 120),
    },
    announcement: {
      enabled: normalizeBoolean(settings['announcement.enabled']),
      text: readOptionalSetting(settings, 'announcement.text', 180),
    },
    navigation: {
      homeLabel: readRequiredSetting(settings, 'navigation.home_label', 40),
      collectionsLabel: readRequiredSetting(settings, 'navigation.collections_label', 40),
      catalogLabel: readRequiredSetting(settings, 'navigation.catalog_label', 40),
      storyLabel: readRequiredSetting(settings, 'navigation.story_label', 40),
      contactLabel: readRequiredSetting(settings, 'navigation.contact_label', 40),
    },
    hero: {
      eyebrow: readRequiredSetting(settings, 'hero.eyebrow', 100),
      title: readRequiredSetting(settings, 'hero.title', 120),
      highlight: readRequiredSetting(settings, 'hero.highlight', 80),
      description: readRequiredSetting(settings, 'hero.description', 420),
      primaryLabel: readRequiredSetting(settings, 'hero.primary_label', 60),
      secondaryLabel: readRequiredSetting(settings, 'hero.secondary_label', 60),
      note: readRequiredSetting(settings, 'hero.note', 60),
    },
    collections: {
      eyebrow: readRequiredSetting(settings, 'collections.eyebrow', 100),
      title: readRequiredSetting(settings, 'collections.title', 140),
      description: readRequiredSetting(settings, 'collections.description', 360),
      itemLabel: readRequiredSetting(settings, 'collections.item_label', 60),
      actionLabel: readRequiredSetting(settings, 'collections.action_label', 60),
    },
    catalog: {
      eyebrow: readRequiredSetting(settings, 'catalog.eyebrow', 100),
      title: readRequiredSetting(settings, 'catalog.title', 140),
      description: readRequiredSetting(settings, 'catalog.description', 360),
      allLabel: readRequiredSetting(settings, 'catalog.all_label', 60),
      searchPlaceholder: readRequiredSetting(settings, 'catalog.search_placeholder', 80),
      searchLabel: readRequiredSetting(settings, 'catalog.search_label', 80),
      filtersLabel: readRequiredSetting(settings, 'catalog.filters_label', 100),
      featuredLabel: readRequiredSetting(settings, 'catalog.featured_label', 40),
      openProductLabel: readRequiredSetting(settings, 'catalog.open_product_label', 60),
      closeProductLabel: readRequiredSetting(settings, 'catalog.close_product_label', 60),
      productDescriptionLabel: readRequiredSetting(
        settings,
        'catalog.product_description_label',
        80,
      ),
      productCodeLabel: readRequiredSetting(settings, 'catalog.product_code_label', 40),
      pricePrefix: readRequiredSetting(settings, 'catalog.price_prefix', 40),
      placeholderLabel: readRequiredSetting(settings, 'catalog.placeholder_label', 60),
      unknownCategoryLabel: readRequiredSetting(settings, 'catalog.unknown_category_label', 60),
      resultSingular: readRequiredSetting(settings, 'catalog.result_singular', 60),
      resultPlural: readRequiredSetting(settings, 'catalog.result_plural', 60),
      emptyTitle: readRequiredSetting(settings, 'catalog.empty_title', 120),
      emptyDescription: readRequiredSetting(settings, 'catalog.empty_description', 220),
    },
    story: {
      eyebrow: readRequiredSetting(settings, 'story.eyebrow', 100),
      title: readRequiredSetting(settings, 'story.title', 140),
      description: readRequiredSetting(settings, 'story.description', 700),
      mark: readRequiredSetting(settings, 'story.mark', 40),
    },
    contact: {
      eyebrow: readRequiredSetting(settings, 'contact.eyebrow', 100),
      title: readRequiredSetting(settings, 'contact.title', 140),
      description: readRequiredSetting(settings, 'contact.description', 420),
      whatsappLabel: readRequiredSetting(settings, 'contact.whatsapp_label', 60),
      instagramLabel: readRequiredSetting(settings, 'contact.instagram_label', 60),
      pendingMessage: readRequiredSetting(settings, 'contact.pending_message', 180),
      whatsappUrl: sanitizeHttpsUrl(settings['contact.whatsapp_url']),
      instagramUrl: sanitizeHttpsUrl(settings['contact.instagram_url']),
      email: sanitizeEmail(settings['contact.email']),
    },
    footer: {
      description: readRequiredSetting(settings, 'footer.description', 260),
      location: readRequiredSetting(settings, 'footer.location', 100),
    },
  };
}

/**
 * @param {Record<string, unknown>} settings
 * @param {string} key
 * @param {number} maximumLength
 * @returns {string}
 */
function readRequiredSetting(settings, key, maximumLength) {
  const value = sanitizeText(settings[key], maximumLength);
  if (!value) throw new Error(`Missing required setting: ${key}`);
  return value;
}

/**
 * @param {Record<string, unknown>} settings
 * @param {string} key
 * @param {number} maximumLength
 * @returns {string}
 */
function readOptionalSetting(settings, key, maximumLength) {
  return sanitizeText(settings[key], maximumLength);
}

/** @param {unknown} value @returns {string|null} */
function sanitizeEmail(value) {
  const result = sanitizeText(value, 254);
  if (!result) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new Error('Invalid contact email');
  return result;
}
