import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Ethan Newman'),
    relatedApp: z.enum(['sumstone', 'stellar-habits', 'choreganized', 'sprout-alarm']).optional(),
  }),
});

const apps = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.enum(['sumstone', 'stellar-habits', 'choreganized', 'sprout-alarm']),
    tagline: z.string(),
    description: z.string(),
    category: z.string(),
    platforms: z.array(z.enum(['iOS', 'Android'])),
    appStoreUrl: z.string().url().optional(),
    playStoreUrl: z.string().url().optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })),
    colors: z.object({
      background: z.string(),
      accent: z.string(),
    }),
    iconPath: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { blog, apps };
