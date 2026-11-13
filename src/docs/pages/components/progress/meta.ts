import type { PageMeta } from '../../../registry';

export default {
  slug: 'progress',
  category: 'feedback',
  order: 3,
  title: { zh: '进度条 Progress', en: 'Progress' },
  description: {
    zh: '直角进度条，宽度 600ms 缓动；支持双段、不确定态与 16px 带标签样式。',
    en: 'Square progress bar with a 600ms eased width; supports dual segments, indeterminate mode and a 16px labelled variant.',
  },
} satisfies PageMeta;
