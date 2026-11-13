import type { PageMeta } from '../../../registry';

export default {
  slug: 'select',
  category: 'forms',
  order: 3,
  title: { zh: "下拉框 Select", en: 'Select' },
  description: {
    zh: "单选下拉。收起时右下 9px 切角；展开后变直角，弹层紧贴字段。完整键盘支持。",
    en: "Single-choice dropdown. Cut 9px at bottom-right when closed; square when open with the popup attached to the field. Full keyboard support.",
  },
} satisfies PageMeta;
