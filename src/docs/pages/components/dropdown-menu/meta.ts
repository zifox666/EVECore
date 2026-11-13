import type { PageMeta } from '../../../registry';

export default {
  slug: 'dropdown-menu',
  category: 'navigation',
  order: 5,
  title: { zh: '下拉菜单 Dropdown Menu', en: 'Dropdown Menu' },
  description: {
    zh: '从触发元素下方展开的菜单，与右键菜单共用同一套菜单列表。',
    en: 'Menu that opens below a trigger; shares its list with the context menu.',
  },
} satisfies PageMeta;
