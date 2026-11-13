import { onBeforeUnmount, reactive } from 'vue';
import type { Text } from '../i18n';

/** Sections register here so the right-hand "On this page" list can show them. */
export const tocState = reactive<{ items: { id: string; title: Text }[] }>({ items: [] });

export function registerSection(id: string, title: Text) {
  tocState.items.push({ id, title });
  onBeforeUnmount(() => {
    const i = tocState.items.findIndex((x) => x.id === id);
    if (i >= 0) tocState.items.splice(i, 1);
  });
}
