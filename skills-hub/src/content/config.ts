import { defineCollection, z } from 'astro:content';

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    skillNumber: z.string(),
    phase: z.string(),
    combines: z.string(),
    accentColor: z.string(),
    priorSkills: z.array(z.string()),
    keyMindsets: z.array(z.string()),
    keyFrameworks: z.array(z.string()),
    prevSkill: z.object({ href: z.string(), title: z.string() }).optional(),
    nextSkill: z.object({ href: z.string(), title: z.string() }).optional(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { skills, pages };
