# Variedades MOMO

Catálogo web público administrado desde Google Sheets. El frontend es una aplicación estática de
React y Google Apps Script expone únicamente el contenido público del sitio.

## Estado

Versión inicial: `v0.1.0`. Incluye la arquitectura base, seguridad mínima, documentación y una
interfaz funcional con datos simulados. Todavía no contiene credenciales ni despliegues reales.

## Requisitos

- Node.js 24 o superior.
- npm 11 o superior.
- `@google/clasp` instalado globalmente solamente en equipos autorizados para desplegar.
- Una cuenta de Google con acceso a la hoja y al proyecto de Apps Script.

## Inicio rápido

```bash
npm install
npm run dev
```

La aplicación local usa `apps/web/public/mock/catalog.json` mientras `VITE_API_URL` no esté
configurada.

Para comprobar el proyecto completo:

```bash
npm run check
```

## Estructura

```text
apps/web            Frontend React, Vite y Tailwind CSS
apps/apps-script    API pública de solo lectura para Google Sheets
packages/contracts  Contrato y validación compartida del catálogo
docs                Arquitectura, seguridad y procedimientos
```

## Configuración del frontend

Copia `apps/web/.env.example` a `apps/web/.env.local`:

```dotenv
VITE_API_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Las variables `VITE_*` son públicas dentro del navegador. Nunca guardes secretos en ellas.

## Documentación

- [Arquitectura](docs/architecture.md)
- [Configuración de Google](docs/google-setup.md)
- [Seguridad](docs/security.md)
- [Versionamiento](docs/versioning.md)
