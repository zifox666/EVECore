<!-- SPDX-License-Identifier: MIT -->
<!--
  EveIcon — an EVE client icon by name, inlined as SVG so it takes currentColor.
  16px monochrome by default; 24px in collapsed navigation, 32px in full panel title bars.
  Use this when the name comes from data (route meta, config). For a fixed icon prefer the
  UnoCSS class `i-eve-<name>`: it ships only the icons you use as CSS.
  Without `title` the icon is decorative (aria-hidden); with `title` it is an image with that name.
  Requires: src/assets/icons/eve/*.svg, src/lib/eve-icons.ts
-->
<script setup lang="ts">
import { computed, ref, useId, watchEffect } from 'vue';
import type { EveIconName } from '@/lib/eve-icons';

const props = withDefaults(defineProps<{ name: EveIconName; size?: number; title?: string }>(), { size: 16 });

const loaders = import.meta.glob<string>('../../assets/icons/eve/*.svg', { query: '?raw', import: 'default' });
const cache = new Map<string, string>();
const uid = useId();
const raw = ref('');

watchEffect(async () => {
  const name = props.name;
  if (cache.has(name)) {
    raw.value = cache.get(name)!;
    return;
  }
  const load = loaders[`../../assets/icons/eve/${name}.svg`];
  if (!load) {
    raw.value = '';
    return;
  }
  const svg = await load();
  cache.set(name, svg);
  if (props.name === name) raw.value = svg;
});

// Several icons on one page share clipPath/mask ids: prefix them per instance.
const html = computed(() =>
  raw.value
    .replace(/id="([^"]+)"/g, `id="${uid}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${uid}-$1)`)
    .replace(/^<svg /, '<svg width="100%" height="100%" aria-hidden="true" focusable="false" '),
);
</script>

<template>
  <span
    class="eve-icon"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :role="title ? 'img' : undefined"
    :aria-label="title"
    :aria-hidden="title ? undefined : 'true'"
    :title="title"
    v-html="html"
  />
</template>

<style>
.eve-icon {
  display: inline-flex;
  flex: none;
  vertical-align: middle;
  color: inherit;
}
.eve-icon svg { display: block; }
</style>
