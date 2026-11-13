<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSectionTitle — full-width bg-primary bar, header type (16px, primary text), padding 4px 8px.
  Default slot = title; #right = trailing content (counts, small actions).
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="as" class="eve-section-title">
    <span class="eve-section-title__text"><slot /></span>
    <span v-if="$slots.right" class="eve-section-title__right"><slot name="right" /></span>
  </component>
</template>

<style>
.eve-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 4px 8px;
  background: var(--eve-bg-primary);
  font: var(--eve-text-header);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
.eve-section-title__text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.eve-section-title__right { display: inline-flex; align-items: center; gap: 8px; flex: none; font: var(--eve-text-detail); letter-spacing: var(--eve-tracking-detail); color: var(--eve-text-secondary); }
</style>
