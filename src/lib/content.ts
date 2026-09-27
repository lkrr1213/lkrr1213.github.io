import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './site';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'posts'>;

export async function projects(lang: Lang): Promise<Project[]> {
  return (await getCollection('projects'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order || a.data.slug.localeCompare(b.data.slug));
}

export async function posts(lang: Lang): Promise<Post[]> {
  return (await getCollection('posts'))
    .filter((entry) => !entry.data.draft && entry.data.lang === lang)
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.data.slug.localeCompare(b.data.slug));
}

export async function publishedEntries<T extends 'projects' | 'posts'>(collection: T) {
  return (await getCollection(collection)).filter((entry) => !entry.data.draft);
}

export async function translationExists(collection: 'projects' | 'posts', slug: string, lang: Lang) {
  const entries = await publishedEntries(collection);
  return entries.some((entry) => entry.data.slug === slug && entry.data.lang === lang);
}
