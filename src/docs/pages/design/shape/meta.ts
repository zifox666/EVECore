import type { PageMeta } from '../../../registry';

export default {
  slug: 'shape',
  category: 'design',
  order: 3,
  title: { zh: '形状与切角 Shape', en: 'Shape and corners' },
  description: {
    zh: '直角为默认，圆角最大 6px，切角代替圆角。',
    en: 'Square by default, 6px maximum radius, cut corners instead of rounding.',
  },
} satisfies PageMeta;
