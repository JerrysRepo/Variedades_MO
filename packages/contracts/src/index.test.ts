import { describe, expect, it } from 'vitest';

import { catalogResponseSchema, productListResponseSchema, productSchema } from './index';

const validProduct = {
  id: 'PROD-001',
  slug: 'producto-demostracion',
  name: 'Producto demostración',
  category: 'personalizados',
  description: 'Producto utilizado durante el desarrollo.',
  price: 125,
  currency: 'GTQ',
  imageUrl: null,
  featured: true,
  order: 1,
};

const validSite = {
  brand: { name: 'Variedades MOMO', tagline: 'Personaliza, regala, sorprende' },
  announcement: { enabled: true, text: 'Detalles personalizados en Guatemala' },
  navigation: {
    homeLabel: 'Inicio',
    collectionsLabel: 'Colecciones',
    catalogLabel: 'Catálogo',
    storyLabel: 'Nuestra esencia',
    contactLabel: 'Contacto',
  },
  hero: {
    eyebrow: 'Detalles que hablan por ti',
    title: 'Ideas hechas para',
    highlight: 'sorprender.',
    description: 'Creamos regalos con intención.',
    primaryLabel: 'Ver catálogo',
    secondaryLabel: 'Elegir una colección',
    note: 'Hecho para ti',
  },
  collections: {
    eyebrow: 'Encuentra tu detalle',
    title: 'Empieza por la ocasión.',
    description: 'Explora colecciones creadas para elegir con facilidad.',
    itemLabel: 'Colección MOMO',
    actionLabel: 'Ver productos',
  },
  catalog: {
    eyebrow: 'Catálogo',
    title: 'Productos para hacerlos tuyos.',
    description: 'Consulta opciones y precios.',
    allLabel: 'Ver todo',
    searchPlaceholder: 'Buscar en el catálogo',
    searchLabel: 'Buscar productos',
    filtersLabel: 'Filtrar productos por categoría',
    featuredLabel: 'Favorito',
    pricePrefix: 'Desde',
    placeholderLabel: 'Tu diseño aquí',
    unknownCategoryLabel: 'Colección MOMO',
    resultSingular: 'producto disponible',
    resultPlural: 'productos disponibles',
    emptyTitle: 'No encontramos productos con esos filtros',
    emptyDescription: 'Prueba otra categoría o escribe una búsqueda diferente.',
  },
  story: {
    eyebrow: 'Nuestra esencia',
    title: 'Personalizamos momentos.',
    description: 'Cada detalle se prepara con cuidado.',
    mark: 'MOMO',
  },
  contact: {
    eyebrow: 'Hablemos',
    title: 'Cuéntanos tu idea.',
    description: 'Te ayudamos a convertirla en un detalle especial.',
    whatsappLabel: 'Escribir por WhatsApp',
    instagramLabel: 'Ver Instagram',
    pendingMessage: 'Canales de contacto pendientes de configurar.',
    whatsappUrl: null,
    instagramUrl: null,
    email: null,
  },
  footer: {
    description: 'Detalles personalizados para regalar y sorprender.',
    location: 'Guatemala',
  },
};

describe('productSchema', () => {
  it('acepta un producto público válido', () => {
    expect(productSchema.parse(validProduct)).toEqual(validProduct);
  });

  it('rechaza imágenes que no utilizan HTTPS', () => {
    expect(() =>
      productSchema.parse({ ...validProduct, imageUrl: 'http://example.com/image.jpg' }),
    ).toThrow();
  });

  it('rechaza precios negativos', () => {
    expect(() => productSchema.parse({ ...validProduct, price: -1 })).toThrow();
  });
});

describe('productListResponseSchema', () => {
  it('valida la versión pública de la API anterior', () => {
    const result = productListResponseSchema.parse({
      ok: true,
      apiVersion: 'v1',
      generatedAt: '2026-10-21T17:00:00.000Z',
      data: { products: [validProduct] },
    });

    expect(result.data.products).toHaveLength(1);
  });
});

describe('catalogResponseSchema', () => {
  it('valida el contenido dinámico completo del catálogo', () => {
    const result = catalogResponseSchema.parse({
      ok: true,
      apiVersion: 'v1',
      generatedAt: '2026-10-21T17:00:00.000Z',
      data: {
        site: validSite,
        categories: [
          {
            id: 'personalizados',
            name: 'Personalizados',
            description: 'Detalles creados a tu manera.',
            imageUrl: null,
            order: 1,
          },
        ],
        benefits: [
          {
            id: 'atencion-cercana',
            title: 'Atención cercana',
            description: 'Te acompañamos durante el proceso.',
            icon: 'heart',
            order: 1,
          },
        ],
        products: [validProduct],
      },
    });

    expect(result.data.site.brand.name).toBe('Variedades MOMO');
    expect(result.data.categories).toHaveLength(1);
  });
});
