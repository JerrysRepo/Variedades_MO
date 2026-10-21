# Arquitectura

## Objetivo

Publicar un catálogo rápido y económico, administrado desde Google Sheets, manteniendo una ruta de
migración hacia otra fuente de datos si el volumen o el tráfico superan los límites de Apps Script.

## Flujo de datos

```text
Editores autorizados
        │
        ▼
Google Sheets privado
        │ acceso de solo lectura
        ▼
Google Apps Script (API v1 + caché)
        │ JSON público validado
        ▼
React + Vite
        │ archivos estáticos
        ▼
Cloudflare Pages
```

## Límites de responsabilidad

- `apps/web` conoce únicamente el contrato HTTP; no conoce filas ni rangos de Sheets.
- `apps/apps-script` traduce filas de Sheets al contrato público y nunca acepta escrituras.
- `packages/contracts` valida la respuesta antes de que llegue a la interfaz.
- Los componentes visuales no acceden directamente a la red.

## Contrato v1

La API devuelve objetos con esta forma:

```json
{
  "ok": true,
  "apiVersion": "v1",
  "generatedAt": "2026-10-21T17:00:00.000Z",
  "data": {
    "site": {},
    "categories": [],
    "benefits": [],
    "products": []
  }
}
```

Los nombres y tipos del contrato v1 no deben cambiar de forma incompatible. Un cambio incompatible
se publica bajo `v2`.

## Ruta de crecimiento

El frontend usa un adaptador de catálogo que reúne el contenido público en una sola consulta. Para
migrar desde Apps Script hacia otra API solamente se reemplaza ese adaptador, manteniendo el
contrato público y los componentes.
