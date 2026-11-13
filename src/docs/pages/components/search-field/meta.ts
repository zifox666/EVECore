import type { PageMeta } from '../../../registry';

export default {
  slug: 'search-field',
  category: 'forms',
  order: 2,
  title: { zh: "搜索框 SearchField", en: 'SearchField' },
  description: {
    zh: "带放大镜的输入框；有内容时右侧出现清除按钮，Esc 同样清除。",
    en: "Input with a magnifier; a clear button shows while non-empty, Escape clears too.",
  },
} satisfies PageMeta;
