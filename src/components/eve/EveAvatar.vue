<!-- SPDX-License-Identifier: MIT -->
<!--
  EveAvatar — the only round element. Character portrait / corporation or alliance logo from images.evetech.net.
  Sizes 24 / 32 / 64. Falls back to initials when the image fails to load or no id is given.
  Requires: nothing (tokens.css only). Follow CCP's third-party developer license when using the image server.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    kind?: 'character' | 'corporation' | 'alliance';
    id?: number;
    name?: string;
    size?: 24 | 32 | 64;
  }>(),
  { kind: 'character', size: 32 },
);

const failed = ref(false);
watch(() => [props.kind, props.id], () => (failed.value = false));

const src = computed(() => {
  if (props.id == null) return '';
  const path = props.kind === 'character' ? 'characters' : props.kind === 'corporation' ? 'corporations' : 'alliances';
  const file = props.kind === 'character' ? 'portrait' : 'logo';
  // request 2x for crisp rendering on high-DPI screens (image server sizes are powers of two ≥ 32)
  const n = props.size <= 16 ? 32 : props.size <= 32 ? 64 : 128;
  return `https://images.evetech.net/${path}/${props.id}/${file}?size=${n}`;
});

const initials = computed(() => {
  const words = (props.name ?? '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  return (words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0]).toUpperCase();
});
</script>

<template>
  <span class="eve-avatar" :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.4)}px` }" :title="name">
    <img v-if="src && !failed" class="eve-avatar__img" :src="src" :alt="name ?? ''" :width="size" :height="size" loading="lazy" @error="failed = true" />
    <span v-else class="eve-avatar__fallback" :role="name ? 'img' : undefined" :aria-label="name">{{ initials }}</span>
  </span>
</template>

<style>
.eve-avatar {
  display: inline-flex;
  flex: none;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 50%;
  background: var(--eve-window-bg-secondary);
  border: 1px solid var(--eve-border-grey-light);
  box-sizing: border-box;
}
.eve-avatar__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.eve-avatar__fallback {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-family: var(--eve-font-sans);
  color: var(--eve-text-secondary);
  user-select: none;
}
</style>
