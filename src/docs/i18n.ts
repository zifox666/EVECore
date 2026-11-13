import { defineComponent, ref, watchEffect } from 'vue';

export type Lang = 'zh' | 'en';
export type Text = { zh: string; en: string };

function initial(): Lang {
  try {
    const saved = localStorage.getItem('evecore-lang');
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {}
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export const lang = ref<Lang>(initial());

watchEffect(() => {
  document.documentElement.lang = lang.value === 'zh' ? 'zh-CN' : 'en';
  try {
    localStorage.setItem('evecore-lang', lang.value);
  } catch {}
});

/** Pick the current language from a { zh, en } pair. */
export function t(text: Text | string): string {
  return typeof text === 'string' ? text : text[lang.value];
}

/** Inline bilingual text: <L zh="按钮" en="Button" /> */
export const L = defineComponent({
  name: 'L',
  props: { zh: { type: String, required: true }, en: { type: String, required: true } },
  setup(props) {
    return () => (lang.value === 'zh' ? props.zh : props.en);
  },
});
