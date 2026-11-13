import type { PageMeta } from '../../../registry';

export default {
  slug: 'spinner',
  category: 'feedback',
  order: 4,
  title: { zh: '加载指示 Spinner', en: 'Spinner' },
  description: {
    zh: '由 12 个方形刻度组成的环，青色亮点依次掠过；16 / 24 / 32px。',
    en: 'A ring of 12 square ticks with a bright primary head chasing a fading tail; 16 / 24 / 32px.',
  },
} satisfies PageMeta;
