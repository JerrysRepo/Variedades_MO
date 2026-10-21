# Configuración de Google

## 1. Recursos

Desde la cuenta propiedad de la empresa:

1. Crea `Variedades MOMO - Pruebas` y `Variedades MOMO - Producción` en Google Sheets.
2. Crea un proyecto independiente de Apps Script para cada ambiente.
3. Comparte los recursos con los desarrolladores como editores.
4. No compartas contraseñas ni códigos de recuperación.

La aplicación web de Apps Script permanece en modo de solo lectura. Todo dato incluido en las
cuatro hojas descritas abajo debe considerarse público.

## 2. Hoja Productos

La primera fila debe contener exactamente:

```text
id | slug | nombre | categoria | descripcion | precio | moneda | imagen_url | activo | destacado | orden
```

Reglas:

- `id` y `slug` son únicos y no deben reutilizarse.
- `categoria` contiene el `id` de una fila activa de la hoja `Categorias`.
- `precio` es numérico y no incluye símbolos de moneda.
- `moneda` utiliza tres letras, por ejemplo `GTQ`.
- `imagen_url` está vacía o comienza con `https://`.
- `activo` y `destacado` son casillas de verificación.
- `orden` es numérico; los números menores aparecen primero.

## 3. Hoja Categorias

La primera fila debe contener exactamente:

```text
id | nombre | descripcion | imagen_url | activo | orden
```

`id` utiliza minúsculas y guiones, por ejemplo `vasos-y-tazas`. Solamente se publican las filas
activas. Los productos que apunten a una categoría inexistente o inactiva se descartan de la
respuesta pública.

## 4. Hoja Beneficios

La primera fila debe contener exactamente:

```text
id | titulo | descripcion | icono | activo | orden
```

Los valores permitidos para `icono` son:

```text
sparkles | gift | heart | truck
```

## 5. Hoja Contenido

La primera fila debe contener exactamente:

```text
clave | valor
```

Cada clave aparece una sola vez. Las claves obligatorias son:

```text
brand.name
brand.tagline
announcement.enabled
announcement.text
navigation.home_label
navigation.collections_label
navigation.catalog_label
navigation.story_label
navigation.contact_label
hero.eyebrow
hero.title
hero.highlight
hero.description
hero.primary_label
hero.secondary_label
hero.note
collections.eyebrow
collections.title
collections.description
collections.item_label
collections.action_label
catalog.eyebrow
catalog.title
catalog.description
catalog.all_label
catalog.search_placeholder
catalog.search_label
catalog.filters_label
catalog.featured_label
catalog.open_product_label
catalog.close_product_label
catalog.product_description_label
catalog.product_code_label
catalog.price_prefix
catalog.placeholder_label
catalog.unknown_category_label
catalog.result_singular
catalog.result_plural
catalog.empty_title
catalog.empty_description
story.eyebrow
story.title
story.description
story.mark
contact.eyebrow
contact.title
contact.description
contact.whatsapp_label
contact.instagram_label
contact.pending_message
contact.whatsapp_url
contact.instagram_url
contact.email
footer.description
footer.location
```

Los tres canales de contacto pueden quedar vacíos. Las URLs deben usar HTTPS; para WhatsApp usa
el formato `https://wa.me/502XXXXXXXX` sin espacios ni guiones.

## 6. Propiedades del script

En **Configuración del proyecto → Propiedades de la secuencia de comandos**, agrega:

| Propiedad               | Ejemplo                                  |
| ----------------------- | ---------------------------------------- |
| `SPREADSHEET_ID`        | Identificador de la hoja correspondiente |
| `PRODUCTS_SHEET_NAME`   | `Productos`                              |
| `CATEGORIES_SHEET_NAME` | `Categorias`                             |
| `BENEFITS_SHEET_NAME`   | `Beneficios`                             |
| `SETTINGS_SHEET_NAME`   | `Contenido`                              |
| `CACHE_SECONDS`         | `300`                                    |
| `MAX_PRODUCTS`          | `1000`                                   |

## 7. Sincronización local

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

## 8. Despliegue

Publica el proyecto como aplicación web:

- Ejecutar como: cuenta propietaria.
- Acceso: cualquier usuario, porque el catálogo es público.
- Tipo: despliegue versionado.

La URL `/exec` se configura como `VITE_API_URL` en Cloudflare Pages. El frontend solicita
`?resource=catalog`; `?resource=products` se conserva temporalmente por compatibilidad.
