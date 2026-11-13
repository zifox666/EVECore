import type { PageMeta } from '../../../registry';

export default {
  slug: 'radio',
  category: 'forms',
  order: 5,
  title: { zh: "单选 Radio", en: 'Radio' },
  description: {
    zh: "圆形单选，状态同复选框。RadioGroup 提供 v-model 与方向键漫游焦点。",
    en: "Circular radio with the checkbox states. RadioGroup provides v-model and arrow-key roving focus.",
  },
} satisfies PageMeta;
