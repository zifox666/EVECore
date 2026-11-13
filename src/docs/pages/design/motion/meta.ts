import type { PageMeta } from '../../../registry';

export default {
  slug: 'motion',
  category: 'design',
  order: 7,
  title: { zh: '动效 Motion', en: 'Motion' },
  description: {
    zh: '150 到 600ms 的 ease-out；页面只淡入淡出；尊重 prefers-reduced-motion。',
    en: '150 to 600ms ease-out; pages only fade; honours prefers-reduced-motion.',
  },
} satisfies PageMeta;
