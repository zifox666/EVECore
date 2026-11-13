import type { PageMeta } from '../../../registry';

export default {
  slug: 'dialog',
  category: 'feedback',
  order: 5,
  title: { zh: '对话框 Dialog', en: 'Dialog' },
  description: {
    zh: '模态窗口，外观同激活面板：点阵底、顶部发光线、48px 标题栏；带焦点陷阱。',
    en: 'Modal window styled like an active panel: dots background, top glow line, 48px title bar; traps focus.',
  },
} satisfies PageMeta;
