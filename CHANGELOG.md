# Changelog

Los cambios importantes se documentan en este archivo. El proyecto sigue
[Versionamiento Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added

- Identidad visual responsive de Variedades MOMO basada en su logo y paleta oficial.
- Catálogo, categorías, beneficios y contenido editorial administrables desde Google Sheets.
- Componentes reutilizables, filtros por categoría, búsqueda y navegación móvil.
- Ficha emergente accesible con detalle completo de cada producto y fondo difuminado.

### Changed

- El endpoint principal de Apps Script ahora entrega el catálogo completo y conserva compatibilidad
  con la respuesta anterior de productos.
- El encabezado permanece visible durante el desplazamiento de la página.

## [0.1.0] - 2026-10-21

### Added

- Monorepo con frontend, contrato compartido y API de Google Apps Script.
- Catálogo React ejecutable con datos simulados.
- Endpoint público de solo lectura con validación, lista permitida de campos y caché.
- Documentación de arquitectura, seguridad, versionamiento y configuración de Google.
- Validaciones automáticas de formato, lint, tipos, pruebas y compilación.
