<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSystemChip — solar system chip: [region @25%] [security @50%] [name].
  2px radius, black 50% outer background, detail type, mono security number. Colour comes from the true security status.
  Requires: lib/security.ts
-->
<script setup lang="ts">
import { computed } from 'vue';
import { formatSecurity, securityColor, withAlpha } from '@/lib/security';

const props = defineProps<{
  name: string;
  /** True security status, e.g. 0.45 (displayed rounded the EVE way). */
  security: number;
  region?: string;
}>();

const color = computed(() => securityColor(props.security));
const secStyle = computed(() => ({ background: withAlpha(color.value, 0.5) }));
const regionStyle = computed(() => ({ background: withAlpha(color.value, 0.25) }));
</script>

<template>
  <span class="eve-system-chip">
    <span v-if="region" class="eve-system-chip__region" :style="regionStyle">{{ region }}</span>
    <span class="eve-system-chip__sec" :style="secStyle">{{ formatSecurity(security) }}</span>
    <span class="eve-system-chip__name">{{ name }}</span>
  </span>
</template>

<style>
.eve-system-chip {
  display: inline-flex;
  align-items: stretch;
  max-width: 100%;
  overflow: hidden;
  vertical-align: middle;
  font: var(--eve-text-detail);
  letter-spacing: var(--eve-tracking-detail);
  text-shadow: var(--eve-text-shadow);
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--eve-radius-xs);
  white-space: nowrap;
}
.eve-system-chip > span { display: inline-flex; align-items: center; padding: 2px 4px; }
.eve-system-chip__region { color: var(--eve-text-secondary); padding: 2px 8px; }
.eve-system-chip__sec {
  font-family: var(--eve-font-mono);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
  color: var(--eve-text-highlighted);
}
.eve-system-chip__name { color: var(--eve-text-secondary); padding: 2px 8px; overflow: hidden; text-overflow: ellipsis; }
</style>
