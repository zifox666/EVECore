import type { PageMeta } from '../../../registry';

export default {
  slug: 'content',
  category: 'design',
  order: 9,
  title: { zh: '文案 Content', en: 'Content' },
  description: {
    zh: '界面只留标签、数据和简短状态；数字等宽右对齐；不写辅助说明。',
    en: 'Labels, data and short states only; numbers in mono, right-aligned; no helper text.',
  },
} satisfies PageMeta;
