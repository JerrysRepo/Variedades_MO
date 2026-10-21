import { z } from 'zod';

const identifierSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const httpsUrlSchema = z
  .url()
  .max(2048)
  .refine((value) => value.startsWith('https://'), 'La URL debe utilizar HTTPS');

const nullableHttpsUrlSchema = httpsUrlSchema.nullable();

export const productSchema = z.object({
  id: z.string().trim().min(1).max(80),
  slug: identifierSchema,
  name: z.string().trim().min(1).max(160),
  category: identifierSchema,
  description: z.string().trim().max(1000),
  price: z.number().finite().nonnegative(),
  currency: z
    .string()
    .trim()
    .regex(/^[A-Z]{3}$/),
  imageUrl: nullableHttpsUrlSchema,
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
});

export const categorySchema = z.object({
  id: identifierSchema,
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(280),
  imageUrl: nullableHttpsUrlSchema,
  order: z.number().int().nonnegative(),
});

export const benefitIconSchema = z.enum(['sparkles', 'gift', 'heart', 'truck']);

export const benefitSchema = z.object({
  id: identifierSchema,
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().max(220),
  icon: benefitIconSchema,
  order: z.number().int().nonnegative(),
});

export const siteContentSchema = z.object({
  brand: z.object({
    name: z.string().trim().min(1).max(80),
    tagline: z.string().trim().min(1).max(120),
  }),
  announcement: z.object({
    enabled: z.boolean(),
    text: z.string().trim().max(180),
  }),
  navigation: z.object({
    homeLabel: z.string().trim().min(1).max(40),
    collectionsLabel: z.string().trim().min(1).max(40),
    catalogLabel: z.string().trim().min(1).max(40),
    storyLabel: z.string().trim().min(1).max(40),
    contactLabel: z.string().trim().min(1).max(40),
  }),
  hero: z.object({
    eyebrow: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(120),
    highlight: z.string().trim().min(1).max(80),
    description: z.string().trim().min(1).max(420),
    primaryLabel: z.string().trim().min(1).max(60),
    secondaryLabel: z.string().trim().min(1).max(60),
    note: z.string().trim().min(1).max(60),
  }),
  collections: z.object({
    eyebrow: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(140),
    description: z.string().trim().min(1).max(360),
    itemLabel: z.string().trim().min(1).max(60),
    actionLabel: z.string().trim().min(1).max(60),
  }),
  catalog: z.object({
    eyebrow: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(140),
    description: z.string().trim().min(1).max(360),
    allLabel: z.string().trim().min(1).max(60),
    searchPlaceholder: z.string().trim().min(1).max(80),
    searchLabel: z.string().trim().min(1).max(80),
    filtersLabel: z.string().trim().min(1).max(100),
    featuredLabel: z.string().trim().min(1).max(40),
    pricePrefix: z.string().trim().min(1).max(40),
    placeholderLabel: z.string().trim().min(1).max(60),
    unknownCategoryLabel: z.string().trim().min(1).max(60),
    resultSingular: z.string().trim().min(1).max(60),
    resultPlural: z.string().trim().min(1).max(60),
    emptyTitle: z.string().trim().min(1).max(120),
    emptyDescription: z.string().trim().min(1).max(220),
  }),
  story: z.object({
    eyebrow: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(140),
    description: z.string().trim().min(1).max(700),
    mark: z.string().trim().min(1).max(40),
  }),
  contact: z.object({
    eyebrow: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(140),
    description: z.string().trim().min(1).max(420),
    whatsappLabel: z.string().trim().min(1).max(60),
    instagramLabel: z.string().trim().min(1).max(60),
    pendingMessage: z.string().trim().min(1).max(180),
    whatsappUrl: nullableHttpsUrlSchema,
    instagramUrl: nullableHttpsUrlSchema,
    email: z.email().max(254).nullable(),
  }),
  footer: z.object({
    description: z.string().trim().min(1).max(260),
    location: z.string().trim().min(1).max(100),
  }),
});

export const productListResponseSchema = z.object({
  ok: z.literal(true),
  apiVersion: z.literal('v1'),
  generatedAt: z.iso.datetime(),
  data: z.object({
    products: z.array(productSchema).max(5000),
  }),
});

export const catalogResponseSchema = z.object({
  ok: z.literal(true),
  apiVersion: z.literal('v1'),
  generatedAt: z.iso.datetime(),
  data: z.object({
    site: siteContentSchema,
    categories: z.array(categorySchema).max(100),
    benefits: z.array(benefitSchema).max(20),
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
export type Category = z.infer<typeof categorySchema>;
export type BenefitIcon = z.infer<typeof benefitIconSchema>;
export type Benefit = z.infer<typeof benefitSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
export type CatalogResponse = z.infer<typeof catalogResponseSchema>;
export type CatalogData = CatalogResponse['data'];
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
