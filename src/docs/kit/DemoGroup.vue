<script setup lang="ts">
import { t, type Text } from '../i18n';

/** A labelled row inside a showcase preview: OVERLINE label + short hint, then the examples. */
withDefaults(defineProps<{ label: Text | string; hint?: Text | string; row?: boolean }>(), { row: true });
</script>

<template>
  <div class="dg">
    <p class="dg-head">
      <span class="dg-label eve-label-caps">{{ t(label) }}</span>
      <span v-if="hint" class="dg-hint eve-detail">{{ t(hint) }}</span>
    </p>
    <div class="dg-body" :class="{ row }"><slot /></div>
  </div>
</template>

<style scoped>
.dg + .dg { margin-top: 24px; }
.dg-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; margin: 0 0 8px; }
.dg-label { color: var(--eve-text-highlighted); }
.dg-hint { color: var(--eve-text-secondary); }
.dg-body.row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
</style>
