<!-- SPDX-License-Identifier: MIT -->
<!--
  EveTag — short uppercase status label (HIGHSEC, ONLINE…).
  Detail type, 0.5px tracking, transparent background, 1px border at 50% alpha, 2px radius. Static (not interactive).
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'away' | 'omega';
    /** Show a 6px status dot before the label. */
    dot?: boolean;
  }>(),
  { tone: 'neutral', dot: false },
);
</script>

<template>
  <span class="eve-tag" :class="`eve-tag--${tone}`">
    <span v-if="dot" class="eve-tag__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style>
.eve-tag {
  --eve-tag-color: var(--eve-text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  font: var(--eve-text-detail);
  letter-spacing: var(--eve-tracking-detail);
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--eve-tag-color);
  text-shadow: var(--eve-text-shadow);
  border: 1px solid color-mix(in srgb, var(--eve-tag-color) 50%, transparent);
  border-radius: var(--eve-radius-xs);
  background: transparent;
}
.eve-tag--primary { --eve-tag-color: var(--eve-primary); }
.eve-tag--success { --eve-tag-color: var(--eve-success); }
.eve-tag--warning { --eve-tag-color: var(--eve-warning); }
.eve-tag--danger { --eve-tag-color: var(--eve-danger); }
.eve-tag--away { --eve-tag-color: var(--eve-away); }
.eve-tag--omega { --eve-tag-color: var(--eve-omega); }
.eve-tag__dot {
  width: 6px;
  height: 6px;
  flex: none;
  background: currentColor;
  border-radius: var(--eve-radius-none);
}
</style>
