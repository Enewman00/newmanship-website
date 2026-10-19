import type { CollectionEntry } from 'astro:content';

// A post is live once it's not a draft and its pubDate has arrived. Future-dated
// posts stay hidden until a build runs on or after that date - the daily
// scheduled deploy in .github/workflows/deploy.yml takes care of that.
export function isPublished({ data }: CollectionEntry<'blog'>): boolean {
  return !data.draft && data.pubDate.getTime() <= Date.now();
}
