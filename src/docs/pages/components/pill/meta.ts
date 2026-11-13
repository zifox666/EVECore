import type { PageMeta } from '../../../registry';

export default {
  slug: 'pill',
  category: 'content',
  order: 2,
  title: { zh: '标签 Pill', en: 'Pill' },
  description: {
    zh: '6px 圆角的过滤标签，可分为“标签 | ×”两段。',
    en: 'A 6px-radius filter chip, optionally split into “label | ×”.',
  },
} satisfies PageMeta;
