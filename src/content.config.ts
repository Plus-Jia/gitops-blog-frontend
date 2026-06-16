import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().nullable().optional(),
		tags: z.array(z.string()).default([]),
		category: z.string(),
		cover: z.string().nullable().optional(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/authors' }),
	schema: z.object({
		name: z.string(),
		avatar: z.string().nullable().optional(),
		bio: z.string().nullable().optional(),
	}),
});

const settings = defineCollection({
	loader: glob({ pattern: '**/*.{json,yaml,yml}', base: './src/content/settings' }),
	schema: z.object({
		siteName: z.string(),
		description: z.string(),
		navigation: z
			.array(
				z.object({
					label: z.string(),
					href: z.string(),
				}),
			)
			.default([]),
		socialLinks: z
			.array(
				z.object({
					label: z.string(),
					url: z.string(),
				}),
			)
			.default([]),
	}),
});

export const collections = { posts, authors, settings };
