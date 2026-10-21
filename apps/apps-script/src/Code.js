/**
 * Punto de entrada público. La API v1 es deliberadamente de solo lectura.
 *
 * @param {GoogleAppsScript.Events.DoGet} event
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doGet(event) {
  try {
    const resource = String(event?.parameter?.resource || 'catalog')
      .trim()
      .toLowerCase();

    if (resource === 'health') {
      return jsonOutput({
        ok: true,
        apiVersion: API_VERSION,
        generatedAt: new Date().toISOString(),
        data: { status: 'available' },
      });
    }

    const config = getConfig();

    if (resource === 'catalog') {
      return jsonOutput(getCatalogPayload(config));
    }

    if (resource === 'products') {
      return jsonOutput(getProductsPayload(config));
    }

    return jsonOutput({
      ok: false,
      apiVersion: API_VERSION,
      error: {
        code: 'RESOURCE_NOT_FOUND',
        message: 'El recurso solicitado no existe.',
      },
    });
  } catch (error) {
    const internalMessage = error instanceof Error ? error.stack || error.message : String(error);
    Logger.log(`Catalog API failure: ${internalMessage}`);

    return jsonOutput({
      ok: false,
      apiVersion: API_VERSION,
      error: {
        code: 'CATALOG_UNAVAILABLE',
        message: 'El catálogo no está disponible temporalmente.',
      },
    });
  }
}
