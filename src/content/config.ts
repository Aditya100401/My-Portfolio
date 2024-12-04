import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array
	const lowercaseItems = array.map((str) => str.toLowerCase())
	const distinctItems = new Set(lowercaseItems)
	return Array.from(distinctItems)
}

// Post collection definition
const post = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(50).max(160),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string()
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional()
		})
})

// Project collection definition
const project = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60), // Project title
			description: z.string().min(50).max(160), // Short description
			imageUrl: z.string(), // URL for the project image
			githubRepo: z.string().url().optional(), // Optional GitHub repository link
			publishDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((val) => (val ? new Date(val) : undefined)),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			draft: z.boolean().default(false), // Draft flag
			featured: z.boolean().default(false) // Optional: If you want to highlight featured projects
		})
})

// Export both collections
export const collections = { post, project }