import type { ComponentType } from 'react';
import type { BlogPostMeta } from '../types';

interface BlogModule {
  default: ComponentType;
  meta: BlogPostMeta;
}

const modules = import.meta.glob<BlogModule>('../content/blog/*.mdx', { eager: true });

export interface BlogPost {
  meta: BlogPostMeta;
  Content: ComponentType;
}

export const blogPosts: BlogPost[] = Object.values(modules)
  .map((mod) => ({ meta: mod.meta, Content: mod.default }))
  .sort((a, b) => b.meta.title.localeCompare(a.meta.title));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.meta.slug === slug);
}