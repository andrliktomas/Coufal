import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { CATEGORY_IDS } from './i18n/routes';

const localized = z.record(z.string(), z.string().nullable()).nullable().default(null);

const pieces = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pieces' }),
  schema: ({ image }) =>
    z.object({
      no: z.number().int(),
      title: z.string(),
      originalTitle: z.string().nullable().optional(),
      category: z.enum(CATEGORY_IDS),
      client: z.string().nullable(),
      year: z.number().int().nullable(),
      metal: z.string().nullable(),
      /** Localized finish from the old site's extra fields, e.g. { cs: "patina staré stříbro", en: "patina old silver" }. */
      finish: z.union([z.string(), localized]),
      sizeMm: z.union([z.number(), z.string()]).nullable(),
      series: z.union([z.number(), z.string()]).nullable(),
      note: z.string().nullable().optional(),
      story: localized,
      images: z
        .array(
          z.object({
            src: image(),
            role: z.enum(['obverse', 'reverse', 'detail', 'in-use']),
            alt: z.record(z.string(), z.string().nullable()).default({}),
          }),
        )
        .default([]),
      clientNamePublishable: z.boolean().nullable(),
      oldUrls: z.record(z.string(), z.string()).default({}),
      migrated: z.any().optional(),
    }),
});

export const collections = { pieces };
