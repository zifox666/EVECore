import type { PageMeta } from '../../../registry';

export default {
  slug: 'tabs',
  category: 'navigation',
  order: 1,
  title: { zh: '标签页 Tabs', en: 'Tabs' },
  description: {
    zh: '底部 1px 通栏线的标签栏；选中项有青色指示线与辉光，放不下时溢出到下拉。',
    en: 'A tab bar over a 1px rule; the selected tab gets a primary indicator and glow, overflow moves into a dropdown.',
  },
} satisfies PageMeta;
