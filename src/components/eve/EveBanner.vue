<!-- SPDX-License-Identifier: MIT -->
<!--
  EveBanner — inline status banner (EVE icons: warning / criticalstate / info). warning: #180F09 + warning colour; danger: #1A0809 + danger; info: bg-primary-dark + help-link blue.
  20px leading icon, 8px padding, optional close button, #actions slot on the right.
  Requires: EveIconButton.vue
-->
<script setup lang="ts">
import { computed } from 'vue';
import EveIconButton from './EveIconButton.vue';

const props = withDefaults(
  defineProps<{
    tone?: 'warning' | 'danger' | 'info';
    closable?: boolean;
    /** Override the tone's default icon (Iconify class). */
    icon?: string;
    closeLabel?: string;
  }>(),
  { tone: 'warning', closable: false, closeLabel: 'Close' },
);
const emit = defineEmits<{ close: [] }>();
const role = computed(() => (props.tone === 'info' ? 'status' : 'alert'));
</script>

<template>
  <div class="eve-banner" :class="`eve-banner--${tone}`" :role="role">
    <span v-if="icon" class="eve-banner__icon" :class="icon" aria-hidden="true" />
    <span v-else-if="tone === 'info'" class="eve-banner__icon i-eve-info" aria-hidden="true" />
    <span v-else-if="tone === 'danger'" class="eve-banner__icon i-eve-criticalstate" aria-hidden="true" />
    <span v-else class="eve-banner__icon i-eve-warning" aria-hidden="true" />
    <div class="eve-banner__body"><slot /></div>
    <div v-if="$slots.actions" class="eve-banner__actions"><slot name="actions" /></div>
    <EveIconButton v-if="closable" class="eve-banner__close" icon="i-tabler-x" :label="closeLabel" @click="emit('close')" />
  </div>
</template>

<style>
.eve-banner {
  --_fg: var(--eve-warning);
  --_bg: var(--eve-warning-bg);
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 8px;
  background: var(--_bg);
  color: var(--_fg);
  font: var(--eve-text-body);
  text-shadow: var(--eve-text-shadow);
}
.eve-banner--danger { --_fg: var(--eve-danger); --_bg: var(--eve-danger-bg); }
.eve-banner--info { --_fg: var(--eve-text-help-link); --_bg: var(--eve-bg-primary-dark); }
.eve-banner__icon { width: 20px; height: 20px; flex: none; }
.eve-banner__body { flex: 1; min-width: 0; }
.eve-banner__actions { display: flex; align-items: center; gap: 8px; flex: none; }
.eve-banner__close { margin: -4px -4px -4px 0; color: var(--_fg); opacity: 0.7; }
.eve-banner__close:not(:disabled):hover { color: var(--_fg); opacity: 1; }
</style>
