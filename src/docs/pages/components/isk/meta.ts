import type { PageMeta } from '../../../registry';

export default {
  slug: 'isk',
  category: 'content',
  order: 5,
  title: { zh: 'ISK 金额 Isk', en: 'Isk' },
  description: {
    zh: '等宽千分位的 ISK 金额，支持涨跌着色与滚动计数。',
    en: 'Mono, thousand-separated ISK amount with up/down colouring and rolling count.',
  },
} satisfies PageMeta;
