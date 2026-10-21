# Contribuir

## Flujo de trabajo

1. Crea una rama corta desde `main`: `feat/...`, `fix/...`, `security/...` o `docs/...`.
2. Instala dependencias con `npm ci`.
3. Ejecuta `npm run check` antes de abrir un Pull Request.
4. Mantén cada Pull Request enfocado en un solo cambio.
5. Usa commits convencionales, por ejemplo `feat: agregar filtro por categoría`.

`main` siempre debe permanecer desplegable. No edites Apps Script simultáneamente desde el editor
web y desde `clasp`; el repositorio es la fuente de verdad.
