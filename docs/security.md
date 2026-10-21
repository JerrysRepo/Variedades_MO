# Seguridad

## Modelo inicial

El catálogo y sus precios son información pública. La hoja, sus pestañas internas, sus fórmulas y
los datos administrativos no son públicos.

## Controles obligatorios

### Cuentas y propiedad

- La empresa conserva la propiedad de Google, GitHub, Cloudflare y el dominio.
- Todas las cuentas administrativas utilizan autenticación de dos factores.
- Los colaboradores reciben el mínimo permiso necesario.

### Google Sheets y Apps Script

- La hoja no se publica ni se comparte mediante enlace público.
- Apps Script se despliega ejecutándose como la cuenta propietaria.
- El manifiesto solicita únicamente acceso de lectura a hojas de cálculo.
- `SPREADSHEET_ID` se configura como propiedad del script, no dentro del código.
- La API usa una lista permitida de campos y descarta columnas desconocidas.
- No se implementan `doPost`, escritura, autenticación de clientes ni administración pública.
- Los errores públicos no incluyen trazas ni identificadores internos.

### Frontend

- No se renderiza HTML recibido desde Sheets.
- Las imágenes deben usar HTTPS.
- Cada respuesta se valida con el contrato antes de mostrarse.
- Ninguna variable `VITE_*` puede contener contraseñas, tokens o credenciales.

### Repositorio

- `.clasprc.json`, `.clasp.json` y archivos `.env` reales están ignorados.
- Los cambios entran mediante Pull Request y deben superar `npm run check`.
- Dependabot revisa dependencias npm y GitHub Actions semanalmente.

## Datos que nunca deben estar en la hoja pública

- Contraseñas o tokens.
- Datos bancarios.
- Información personal de clientes.
- Costos internos o márgenes que no deban publicarse.
- Notas administrativas privadas.

Si en el futuro se agregan formularios o pagos, se necesita un análisis de amenazas nuevo antes de
implementar escrituras.
