<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSpinner — loading indicator: a ring of 12 square ticks in primary, a bright head chasing a fading tail.
  Sizes 16 / 24 / 32. role="status" with an accessible label.
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(defineProps<{ size?: 16 | 24 | 32; label?: string }>(), { size: 24, label: 'Loading' });
</script>

<template>
  <span class="eve-spinner" role="status" :aria-label="label" :style="{ width: `${size}px`, height: `${size}px` }">
    <span v-for="i in 12" :key="i" class="eve-spinner__tick" :style="{ transform: `rotate(${(i - 1) * 30}deg)`, animationDelay: `${(i - 12) * 100}ms` }" />
  </span>
</template>

<style>
.eve-spinner { position: relative; display: inline-block; flex: none; vertical-align: middle; }
.eve-spinner__tick {
  position: absolute;
  inset: 0;
}
.eve-spinner__tick::before {
  content: '';
  position: absolute;
  left: calc(50% - 7.5%);
  top: 0;
  width: 15%;
  height: 26%;
  background: var(--eve-primary);
  opacity: 0.12;
  animation: eve-spinner-tick 1.2s linear infinite;
  animation-delay: inherit;
}
@keyframes eve-spinner-tick {
  0% { opacity: 1; box-shadow: 0 0 4px var(--eve-primary); }
  60%, 100% { opacity: 0.12; box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) { .eve-spinner__tick::before { animation-duration: 3.6s; } }
</style>
