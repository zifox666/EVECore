<!-- SPDX-License-Identifier: MIT -->
<!--
  EveIconButton — borderless 16px icon button.
  Secondary text → highlighted on hover; a 22×4px glow bar fades in under the icon (alpha 0 → 0.3);
  press flashes the icon to #B4BEC2 for 150ms. `active` = toggled state in primary.
  Docs/tests can force a state with data-eve-state="hover|press|focus".
  Requires: lib/utils.ts
-->
<script setup lang="ts">
import { computed } from 'vue';
import { usePressFlash } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    /** Iconify class, e.g. "i-eve-settings" (EVE icon) or "i-tabler-x". */
    icon: string;
    /** Accessible name; also used as the native title. */
    label: string;
    active?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  { active: false, disabled: false, type: 'button' },
);

const { pressed, handlers } = usePressFlash();
const flash = computed(() => pressed.value && !props.disabled);
</script>

<template>
  <button
    :type="type"
    class="eve-icon-button"
    :class="{ 'is-active': active, 'is-pressed': flash }"
    :disabled="disabled"
    :aria-label="label"
    :title="label"
    :aria-pressed="active || undefined"
    v-on="disabled ? {} : handlers"
  >
    <span class="eve-icon-button__icon" :class="icon" aria-hidden="true" />
    <span class="eve-icon-button__glow" aria-hidden="true" />
  </button>
</template>

<style>
.eve-icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  color: var(--eve-text-secondary);
  cursor: pointer;
  flex: none;
  transition: color var(--eve-dur-hover) ease-out;
}
.eve-icon-button__icon { width: 16px; height: 16px; display: block; }
.eve-icon-button__glow {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 4px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at 50% 100%, var(--eve-primary), transparent 70%);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--eve-dur-hover) ease-out;
}
.eve-icon-button:not(:disabled):is(:hover, [data-eve-state='hover']) { color: var(--eve-text-highlighted); }
.eve-icon-button:not(:disabled):is(:hover, [data-eve-state='hover']) .eve-icon-button__glow { opacity: 0.3; }
.eve-icon-button.is-active { color: var(--eve-primary); }
.eve-icon-button.is-active:not(:disabled):is(:hover, [data-eve-state='hover']) { color: var(--eve-border-primary-light); }
.eve-icon-button:is(.is-pressed, [data-eve-state='press']),
:is(.is-pressed, [data-eve-state='press']) > .eve-icon-button__glow { transition-duration: 0ms; }
.eve-icon-button.eve-icon-button:not(:disabled):is(.is-pressed, [data-eve-state='press']) { color: var(--eve-bg-press); }
.eve-icon-button:disabled { color: var(--eve-text-disabled); cursor: not-allowed; }
.eve-icon-button:is(:focus-visible, [data-eve-state='focus']) { outline: none; }
.eve-icon-button:is(:focus-visible, [data-eve-state='focus']) .eve-icon-button__glow { opacity: 0.3; }
.eve-icon-button:is(:focus-visible, [data-eve-state='focus'])::after {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1px solid var(--eve-border-primary-light);
  pointer-events: none;
}
</style>
