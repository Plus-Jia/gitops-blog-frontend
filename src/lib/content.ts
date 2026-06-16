import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

export async function getPublishedPosts() {
	return (await getCollection('posts', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export async function getPrimaryAuthor() {
	const authors = await getCollection('authors');
	return authors[0];
}

export function getAllTags(posts: Post[]) {
	const tagCounts = new Map<string, number>();

	for (const post of posts) {
		for (const tag of post.data.tags) {
			tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
		}
	}

	return [...tagCounts.entries()]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function getAllCategories(posts: Post[]) {
	const categoryCounts = new Map<string, number>();

	for (const post of posts) {
		categoryCounts.set(
			post.data.category,
			(categoryCounts.get(post.data.category) ?? 0) + 1,
		);
	}

	return [...categoryCounts.entries()]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function postsByTag(posts: Post[], tag: string) {
	return posts.filter((post) => post.data.tags.includes(tag));
}

export function postsByCategory(posts: Post[], category: string) {
	return posts.filter((post) => post.data.category === category);
}

