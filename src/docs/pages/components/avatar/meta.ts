import type { PageMeta } from '../../../registry';

export default {
  slug: 'avatar',
  category: 'content',
  order: 6,
  title: { zh: '头像 Avatar', en: 'Avatar' },
  description: {
    zh: '系统中唯一的圆形元素：角色、军团、联盟头像，加载失败显示首字母。',
    en: 'The only round element: character, corporation and alliance portraits with initials fallback.',
  },
} satisfies PageMeta;
