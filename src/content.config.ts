import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { categorySlugs, materialSlugs } from "./i18n/ui";

// One file per rug per locale: rugs/en/<slug>.md + rugs/fa/<slug>.md share the
// same base slug; FA entries may lag behind EN (draft: true) until translated.
const rugs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/rugs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      sku: z.string(),
      lengthCm: z.number(),
      widthCm: z.number(),
      category: z.enum(categorySlugs),
      // House/brand slug; resolved against src/data/brands.ts
      brand: z.string().default("arsalani"),
      material: z.enum(materialSlugs).optional(),
      origin: z.string().optional(),
      colors: z
        .object({
          field: z.string(),
          medallion: z.string(),
          mainBorder: z.string(),
          smallBorders: z.string(),
        })
        .partial()
        .optional(),
      // Dominant colors auto-extracted from the photos (scripts/extract-colors.mjs).
      palette: z.array(z.string()).optional(),
      images: z.array(image()).min(1),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { rugs };
