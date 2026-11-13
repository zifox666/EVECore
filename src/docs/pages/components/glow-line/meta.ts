import type { PageMeta } from '../../../registry';

export default {
  slug: 'glow-line',
  category: 'layout',
  order: 5,
  title: { zh: '发光线 Glow Line', en: 'Glow Line' },
  description: {
    zh: '竖向发光线：1px 实线加 5px 同色半透明带，用于选中、告警与敌对标记。',
    en: 'Vertical glow line: 1px solid plus a 5px translucent band, for selection, alerts and hostile markers.',
  },
} satisfies PageMeta;
