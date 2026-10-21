# Configuración de Google

## 1. Recursos

Desde la cuenta propiedad de la empresa:

1. Crea `Variedades MO - Pruebas` y `Variedades MO - Producción` en Google Sheets.
2. Crea un proyecto independiente de Apps Script para cada ambiente.
3. Comparte los recursos con los desarrolladores como editores.
4. No compartas contraseñas ni códigos de recuperación.

## 2. Hoja Productos

La primera fila debe contener exactamente:

```text
id | slug | nombre | categoria | descripcion | precio | moneda | imagen_url | activo | destacado | orden
```

Reglas:

- `id` y `slug` son únicos y no deben reutilizarse.
- `precio` es numérico y no incluye símbolos de moneda.
- `moneda` utiliza tres letras, por ejemplo `GTQ`.
- `imagen_url` está vacía o comienza con `https://`.
- `activo` y `destacado` son casillas de verificación.
- `orden` es numérico; los números menores aparecen primero.

## 3. Propiedades del script

En **Configuración del proyecto → Propiedades de la secuencia de comandos**, agrega:

| Propiedad             | Ejemplo                                  |
| --------------------- | ---------------------------------------- |
| `SPREADSHEET_ID`      | Identificador de la hoja correspondiente |
| `PRODUCTS_SHEET_NAME` | `Productos`                              |
| `CACHE_SECONDS`       | `300`                                    |
| `MAX_PRODUCTS`        | `1000`                                   |

## 4. Sincronización local

Instala las dependencias del proyecto, habilita la Apps Script API en la cuenta de Google e instala
la herramienta oficial de despliegue de forma global. Se mantiene fuera de las dependencias de la
aplicación para aislar las credenciales y su cadena de suministro:

```bash
npm install --global @google/clasp
clasp login
cd apps/apps-script
cp .clasp.json.example .clasp.json
```

Reemplaza `YOUR_SCRIPT_ID` dentro de `.clasp.json`. Ese archivo no debe entrar en Git.

Para validar y subir:

```bash
npm run check
npm run gas:push
```

## 5. Despliegue

Publica el proyecto como aplicación web:

- Ejecutar como: cuenta propietaria.
- Acceso: cualquier usuario, porque el catálogo es público.
- Tipo: despliegue versionado.

La URL `/exec` se configura como `VITE_API_URL` en Cloudflare Pages. Cualquier dato devuelto por esa
URL debe considerarse público.
