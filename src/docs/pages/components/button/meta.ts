import type { PageMeta } from '../../../registry';

export default {
  slug: 'button',
  category: 'actions',
  order: 1,
  title: { zh: '按钮 Button', en: 'Button' },
  description: {
    zh: '触发一个操作。32px 高，默认右下 9px 切角；悬停变亮，按下闪白。',
    en: 'Triggers an action. 32px tall, bottom-right 9px cut by default; lights up on hover, flashes white on press.',
  },
} satisfies PageMeta;
