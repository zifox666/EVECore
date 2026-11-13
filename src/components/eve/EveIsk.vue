<!-- SPDX-License-Identifier: MIT -->
<!--
  EveIsk — formatted ISK amount: mono, tabular-nums, thousand separators.
  `delta` colours the text isk-up / isk-down with a ▲▼ prefix (text colour only, never a background).
  `animated` rolls the number over 600ms ease-out with requestAnimationFrame (skipped for prefers-reduced-motion).
  Requires: lib/utils.ts
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { formatIsk } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    value: number;
    decimals?: number;
    delta?: boolean;
    animated?: boolean;
    /** Show the secondary "ISK" suffix. */
    suffix?: boolean;
  }>(),
  { decimals: 2, delta: false, animated: false, suffix: true },
);

const shown = ref(props.value);
let raf = 0;

function reduced() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

watch(
  () => props.value,
  (to) => {
    cancelAnimationFrame(raf);
    if (!props.animated || reduced()) {
      shown.value = to;
      return;
    }
    const from = shown.value;
    const start = performance.now();
    const duration = 600;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      shown.value = from + (to - from) * eased;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  },
);
onBeforeUnmount(() => cancelAnimationFrame(raf));

const sign = computed(() => (props.value > 0 ? 'up' : props.value < 0 ? 'down' : 'flat'));
const text = computed(() => formatIsk(props.delta ? Math.abs(shown.value) : shown.value, props.decimals));
const label = computed(() => formatIsk(props.value, props.decimals) + ' ISK');
</script>

<template>
  <span class="eve-isk" :class="delta ? `eve-isk--${sign}` : ''" :aria-label="label">
    <span v-if="delta && sign !== 'flat'" class="eve-isk__arrow" aria-hidden="true">{{ sign === 'up' ? '▲' : '▼' }}</span>
    <span aria-hidden="true">{{ text }}</span>
    <span v-if="suffix" class="eve-isk__suffix" aria-hidden="true">ISK</span>
  </span>
</template>

<style>
.eve-isk {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--eve-font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--eve-text-primary);
  white-space: nowrap;
}
.eve-isk--up { color: var(--eve-isk-up); }
.eve-isk--down { color: var(--eve-isk-down); }
.eve-isk__arrow { font-size: 0.75em; }
.eve-isk__suffix { color: var(--eve-text-secondary); font-family: var(--eve-font-sans); }
</style>
