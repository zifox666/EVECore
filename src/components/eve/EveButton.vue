<!-- SPDX-License-Identifier: MIT -->
<!--
  EveButton — 32px, cut bottom-right by default, three variants.
  Hover lights up (fill + border brighten), press flashes white (#EAEAEA) and falls back after 150ms.
  Docs/tests can force a state with data-eve-state="hover|press|focus".
  Requires: EveFrame.vue (for the .eve-frame cut styles), lib/utils.ts
-->
<script setup lang="ts">
import { computed } from 'vue';
import { usePressFlash, type Cut } from '@/lib/utils';
import EveFrame from './EveFrame.vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'negative';
    cut?: Cut;
    /** Iconify class for a 16px leading icon, e.g. "i-tabler-rocket". */
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  { variant: 'secondary', cut: 'br', loading: false, disabled: false, block: false, type: 'button' },
);

const inert = computed(() => props.disabled || props.loading);
const { pressed, handlers } = usePressFlash();
const flash = computed(() => pressed.value && !inert.value);
</script>

<template>
  <EveFrame
    as="button"
    :type="type"
    :cut="cut"
    class="eve-button"
    :class="[`eve-button--${variant}`, { 'is-block': block, 'is-pressed': flash, 'has-icon': icon || loading }]"
    :disabled="disabled"
    :aria-busy="loading || undefined"
    :aria-disabled="inert || undefined"
    v-on="inert ? {} : handlers"
  >
    <span v-if="loading" class="eve-button__spin" aria-hidden="true" />
    <span v-else-if="icon" class="eve-button__icon" :class="icon" aria-hidden="true" />
    <span class="eve-button__label"><slot /></span>
  </EveFrame>
</template>

<style>
.eve-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: var(--eve-control-height);
  padding: 0 15px;
  border: 0;
  margin: 0;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-glow);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--eve-dur-hover) ease-out, color var(--eve-dur-hover) ease-out;
}
.eve-button::before { transition: background-color var(--eve-dur-hover) ease-out, box-shadow var(--eve-dur-hover) ease-out; }
.eve-button.has-icon { padding-left: 8px; }
.eve-button.is-block { display: flex; width: 100%; }
.eve-button__icon { width: 16px; height: 16px; flex: none; }
.eve-button__label { display: inline-flex; align-items: center; }

/* Normal */
.eve-button--primary { --eve-frame-bg: var(--eve-bg-primary); --eve-frame-border: var(--eve-border-primary); color: var(--eve-text-highlighted); }
.eve-button--secondary { --eve-frame-bg: var(--eve-window-bg); --eve-frame-border: var(--eve-border-primary-dark); }
.eve-button--negative { --eve-frame-bg: var(--eve-window-bg); --eve-frame-border: var(--eve-error-bg-dark); }

/* Hover — lights up */
.eve-button:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover']) { color: var(--eve-text-highlighted); }
.eve-button--primary:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover']),
.eve-button--secondary:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover']) {
  --eve-frame-bg: var(--eve-bg-primary-light);
  --eve-frame-border: var(--eve-border-primary-light);
}
.eve-button--negative:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover']) {
  --eve-frame-bg: var(--eve-error-bg);
  --eve-frame-border: var(--eve-error-border);
}
.eve-button:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover'])::before { box-shadow: inset 0 0 6px rgba(113, 190, 211, 0.25); }
.eve-button--negative:not(:disabled):not([aria-busy]):is(:hover, [data-eve-state='hover'])::before { box-shadow: inset 0 0 6px rgba(254, 91, 97, 0.25); }

/* Press — white flash, instant in, 150ms out */
.eve-button:is(.is-pressed, [data-eve-state='press']),
.eve-button:is(.is-pressed, [data-eve-state='press'])::before { transition-duration: 0ms; }
.eve-button.eve-button:is(.is-pressed, [data-eve-state='press']):not(:disabled):not([aria-busy]) {
  --eve-frame-bg: var(--eve-bg-press);
  --eve-frame-border: var(--eve-bg-press);
  color: var(--eve-text-on-press);
  text-shadow: none;
}

/* Disabled — keep normal face, dim text */
.eve-button:disabled { color: var(--eve-text-disabled); cursor: not-allowed; text-shadow: var(--eve-text-shadow); }
.eve-button[aria-busy] { cursor: progress; }

.eve-button:focus-visible { outline: none; }
.eve-button:is(:focus-visible, [data-eve-state='focus'])::before { box-shadow: inset 0 0 0 1px var(--eve-border-primary-light); }

.eve-button__spin {
  width: 14px;
  height: 14px;
  margin: 1px;
  border: 1px solid var(--eve-text-secondary);
  border-top-color: var(--eve-primary);
  animation: eve-button-spin 0.8s linear infinite;
}
@keyframes eve-button-spin { to { transform: rotate(360deg); } }
</style>
