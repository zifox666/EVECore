import type { PageMeta } from '../../../registry';

export default {
  slug: 'panel',
  category: 'layout',
  order: 1,
  title: { zh: '面板 Panel', en: 'Panel' },
  description: {
    zh: '带点阵背景、1px 边框和标题栏的窗口容器。激活时顶边发光。',
    en: 'A window container with dots background, 1px border and a title bar. The top edge glows when active.',
  },
} satisfies PageMeta;
