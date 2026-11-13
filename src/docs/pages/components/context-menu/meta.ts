import type { PageMeta } from '../../../registry';

export default {
  slug: 'context-menu',
  category: 'navigation',
  order: 4,
  title: { zh: '右键菜单 Context Menu', en: 'Context Menu' },
  description: {
    zh: '在指针处打开的菜单：图标位、高亮项、标题行、分隔线、一级子菜单。',
    en: 'Menu opened at the pointer: icon slot, highlighted items, title rows, separators, one level of submenu.',
  },
} satisfies PageMeta;
