<!-- SPDX-License-Identifier: MIT -->
<!--
  EveProgress — square progress bar. Track #1A1E1F, fill #0D557E (or `color`), width eases over 600ms.
  `secondary` draws a second segment right after the primary one. `large` = 16px bar with the label
  centred in mono; `indeterminate` slides a segment across the track.
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 0–1 */
    value?: number;
    /** 0–1, drawn after `value` (cumulative end = value + secondary, clamped). */
    secondary?: number;
    color?: string;
    secondaryColor?: string;
    indeterminate?: boolean;
    /** Show the percentage in mono, centred (implies the 16px bar). */
    showValue?: boolean;
    large?: boolean;
    /** Bar height in px (default 4, or 16 when large / showValue / label slot). */
    height?: number;
    label?: string;
  }>(),
  { value: 0, secondary: 0, indeterminate: false, showValue: false, large: false },
);

const slots = defineSlots<{ default?: () => unknown }>();
const clamp = (n: number) => Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0));
const primary = computed(() => clamp(props.value));
const second = computed(() => Math.min(clamp(props.secondary), 1 - primary.value));
const isLarge = computed(() => props.large || props.showValue || !!slots.default);
const h = computed(() => props.height ?? (isLarge.value ? 16 : 4));
const style = computed(() => ({
  height: `${h.value}px`,
  ...(props.color ? { '--eve-progress-fill-c': props.color } : {}),
  ...(props.secondaryColor ? { '--eve-progress-secondary-c': props.secondaryColor } : {}),
}));
</script>

<template>
  <div
    class="eve-progress"
    :class="{ 'is-indeterminate': indeterminate, 'is-large': isLarge }"
    :style="style"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : Math.round(primary * 100)"
  >
    <template v-if="!indeterminate">
      <span class="eve-progress__fill" :style="{ width: `${primary * 100}%` }" />
      <span v-if="second > 0" class="eve-progress__fill eve-progress__fill--secondary" :style="{ left: `${primary * 100}%`, width: `${second * 100}%` }" />
    </template>
    <span v-else class="eve-progress__fill eve-progress__sweep" />
    <span v-if="isLarge" class="eve-progress__label"><slot>{{ showValue ? `${Math.round(primary * 100)}%` : '' }}</slot></span>
  </div>
</template>

<style>
.eve-progress {
  --eve-progress-fill-c: var(--eve-progress-fill);
  --eve-progress-secondary-c: var(--eve-primary-blue);
  position: relative;
  overflow: hidden;
  width: 100%;
  background: var(--eve-progress-track);
}
.eve-progress__fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: var(--eve-progress-fill-c);
  transition: width var(--eve-dur-progress) ease-out, left var(--eve-dur-progress) ease-out;
}
.eve-progress__fill--secondary { background: var(--eve-progress-secondary-c); }
.eve-progress__sweep { width: 35%; transition: none; animation: eve-progress-sweep 1.4s ease-in-out infinite; }
@keyframes eve-progress-sweep { from { transform: translateX(-100%); } to { transform: translateX(290%); } }
.eve-progress__label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font: 400 12px / 1 var(--eve-font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--eve-text-highlighted);
  text-shadow: var(--eve-text-shadow);
}
@media (prefers-reduced-motion: reduce) { .eve-progress__sweep { animation-duration: 3s; } }
</style>
