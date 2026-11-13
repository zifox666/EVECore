import type { Component } from 'vue';
import type { Text } from './i18n';

export type Category =
  | 'start'
  | 'design'
  | 'actions'
  | 'forms'
  | 'navigation'
  | 'layout'
  | 'content'
  | 'feedback';

export interface PageMeta {
  slug: string;
  category: Category;
  order: number;
  title: Text;
  description: Text;
}

export const CATEGORIES: { id: Category; label: Text }[] = [
  { id: 'start', label: { zh: '开始', en: 'Get started' } },
  { id: 'design', label: { zh: '设计', en: 'Design' } },
  { id: 'actions', label: { zh: '操作', en: 'Actions' } },
  { id: 'forms', label: { zh: '表单', en: 'Forms' } },
  { id: 'navigation', label: { zh: '导航', en: 'Navigation' } },
  { id: 'layout', label: { zh: '布局', en: 'Layout' } },
  { id: 'content', label: { zh: '内容', en: 'Content' } },
  { id: 'feedback', label: { zh: '反馈', en: 'Feedback' } },
];

/**
 * Pages are discovered from the file system:
 *   src/docs/pages/<group>/<slug>/meta.ts   — default export PageMeta
 *   src/docs/pages/<group>/<slug>/index.vue — the page
 */
const metas = import.meta.glob<{ default: PageMeta }>('./pages/*/*/meta.ts', { eager: true });
const views = import.meta.glob<{ default: Component }>('./pages/*/*/index.vue');

export interface PageEntry extends PageMeta {
  path: string;
  load: () => Promise<{ default: Component }>;
}

export const pages: PageEntry[] = Object.entries(metas)
  .map(([file, mod]) => {
    const dir = file.replace(/\/meta\.ts$/, '');
    const group = dir.split('/')[2];
    const meta = mod.default;
    const path = meta.category === 'start' ? '/' : `/${group}/${meta.slug}`;
    return { ...meta, path, load: views[`${dir}/index.vue`] };
  })
  .filter((p) => p.load)
  .sort(
    (a, b) =>
      CATEGORIES.findIndex((c) => c.id === a.category) - CATEGORIES.findIndex((c) => c.id === b.category) ||
      a.order - b.order ||
      a.title.en.localeCompare(b.title.en),
  );
