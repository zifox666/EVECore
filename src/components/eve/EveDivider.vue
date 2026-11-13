<!-- SPDX-License-Identifier: MIT -->
<!--
  EveDivider — 1px divider line, horizontal or vertical, optional centred label (detail type, secondary).
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical'; label?: string }>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <div
    class="eve-divider"
    :class="`eve-divider--${orientation}`"
    role="separator"
    :aria-orientation="orientation"
  >
    <template v-if="label || $slots.default && orientation === 'horizontal'">
      <span class="eve-divider__line" />
      <span class="eve-divider__label"><slot>{{ label }}</slot></span>
      <span class="eve-divider__line" />
    </template>
  </div>
</template>

<style>
.eve-divider { box-sizing: border-box; }
.eve-divider--horizontal { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 1px; }
.eve-divider--horizontal:not(:has(.eve-divider__line)) { border-top: 1px solid var(--eve-divider); }
.eve-divider--vertical { align-self: stretch; width: 1px; min-height: 1em; background: var(--eve-divider); }
.eve-divider__line { flex: 1; height: 1px; background: var(--eve-divider); }
.eve-divider__label { font: var(--eve-text-detail); letter-spacing: var(--eve-tracking-detail); color: var(--eve-text-secondary); text-shadow: var(--eve-text-shadow); }
</style>
