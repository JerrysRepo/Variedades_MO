import { describe, expect, it } from 'vitest';

import { productListResponseSchema, productSchema } from './index';

const validProduct = {
  id: 'PROD-001',
  slug: 'producto-demostracion',
  name: 'Producto demostración',
  category: 'General',
  description: 'Producto utilizado durante el desarrollo.',
  price: 125,
  currency: 'GTQ',
  imageUrl: null,
  featured: true,
  order: 1,
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
  it('valida la versión pública de la API', () => {
    const result = productListResponseSchema.parse({
      ok: true,
      apiVersion: 'v1',
      generatedAt: '2026-10-21T17:00:00.000Z',
      data: { products: [validProduct] },
    });

    expect(result.data.products).toHaveLength(1);
  });
});
