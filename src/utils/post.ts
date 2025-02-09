import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

/** Fetch all posts */
export async function getAllPosts(): Promise<CollectionEntry<'post'>[]> {
	return await getCollection('post', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true
	})
}

/** Fetch all projects */
export async function getAllProjects(): Promise<CollectionEntry<'project'>[]> {
	return await getCollection('project', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true
	})
}

/** Sort markdown entries by date */
export function sortMDByDate<T extends CollectionEntry<'post' | 'project'>>(entries: T[]): T[] {
	return entries.sort((a, b) => {
		const aDate = new Date((a.data as any).updatedDate ?? (a.data as any).publishDate).valueOf()
		const bDate = new Date((b.data as any).updatedDate ?? (b.data as any).publishDate).valueOf()
		return bDate - aDate
	})
}

/** Get all tags from entries */
export function getAllTags<T extends CollectionEntry<'post' | 'project'>>(entries: T[]): string[] {
	return entries.flatMap((entry) => [...(entry.data as any).tags])
}

/** Get unique tags from entries */
export function getUniqueTags<T extends CollectionEntry<'post' | 'project'>>(
	entries: T[]
): string[] {
	return [...new Set(getAllTags(entries))]
}

/** Get unique tags with counts */
export function getUniqueTagsWithCount<T extends CollectionEntry<'post' | 'project'>>(
	entries: T[]
): Array<[string, number]> {
	return [
		...getAllTags(entries).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>()
		)
	].sort((a, b) => b[1] - a[1])
}
