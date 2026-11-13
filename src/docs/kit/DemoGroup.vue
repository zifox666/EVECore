<script setup lang="ts">
import { t, type Text } from '../i18n';

/** A labelled row inside a showcase preview: OVERLINE label + short hint, then the examples. */
withDefaults(defineProps<{ label: Text | string; row?: boolean; wide?: boolean }>(), { row: true, wide: false });
</script>

<template>
  <div class="dg">
    <p class="dg-head">
      <span class="dg-label eve-label-caps">{{ t(label) }}</span>
    </p>
    <div class="dg-body" :class="{ row, wide }"><slot /></div>
  </div>
</template>

<style scoped>
.dg + .dg { margin-top: 24px; }
.dg-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; margin: 0 0 8px; }
.dg-label { color: var(--eve-text-highlighted); }
.dg-body.row.wide { column-gap: 24px; }
.dg-body.row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
</style>
