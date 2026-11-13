import type { PageMeta } from '../../../registry';

export default {
  slug: 'tooltip',
  category: 'feedback',
  order: 1,
  title: { zh: '提示 Tooltip', en: 'Tooltip' },
  description: {
    zh: '延迟出现的浮层，带指向锚点的小三角；鼠标移入提示本身时不会消失。',
    en: 'Delayed overlay with a small arrow towards the anchor; stays open while the pointer is over it.',
  },
} satisfies PageMeta;
