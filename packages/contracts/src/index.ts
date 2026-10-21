import { z } from 'zod';

const httpsUrlSchema = z
  .url()
  .max(2048)
  .refine((value) => value.startsWith('https://'), 'La URL debe utilizar HTTPS');

export const productSchema = z.object({
  id: z.string().trim().min(1).max(80),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(80),
  description: z.string().trim().max(1000),
  price: z.number().finite().nonnegative(),
  currency: z
    .string()
    .trim()
    .regex(/^[A-Z]{3}$/),
  imageUrl: httpsUrlSchema.nullable(),
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
});

export const productListResponseSchema = z.object({
  ok: z.literal(true),
  apiVersion: z.literal('v1'),
  generatedAt: z.iso.datetime(),
  data: z.object({
    products: z.array(productSchema).max(5000),
  }),
});

export const apiErrorResponseSchema = z.object({
  ok: z.literal(false),
  apiVersion: z.literal('v1'),
  error: z.object({
    code: z.string().min(1).max(80),
    message: z.string().min(1).max(200),
  }),
});

export type Product = z.infer<typeof productSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
