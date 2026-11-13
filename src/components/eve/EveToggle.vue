<!-- SPDX-License-Identifier: MIT -->
<!--
  EveToggle — square on/off switch (no pill): 32x16 track with a 1px border and a sliding square knob.
  Off = grey border + grey knob; on = primary border, bg-primary fill, primary knob. Hover glows, press flashes white.
  Docs/tests can force a state with data-eve-state="hover|press|focus" on the root.
  Requires: lib/utils.ts
-->
<script setup lang="ts">
import { usePressFlash } from '@/lib/utils';

const props = withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });
const model = defineModel<boolean>({ default: false });
const { pressed, handlers } = usePressFlash();

function toggle() {
  if (!props.disabled) model.value = !model.value;
}
function onKey(e: KeyboardEvent) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggle();
  }
}
</script>

<template>
  <span
    class="eve-toggle"
    :class="{ 'is-on': model, 'is-disabled': disabled, 'is-pressed': pressed && !disabled }"
    v-on="disabled ? {} : handlers"
    @click="toggle"
  >
    <span
      class="eve-toggle__track"
      role="switch"
      :aria-checked="model"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      @keydown="onKey"
    >
      <span class="eve-toggle__knob" />
    </span>
    <span v-if="$slots.default" class="eve-toggle__label"><slot /></span>
  </span>
</template>

<style>
.eve-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
.eve-toggle__track {
  box-sizing: border-box;
  position: relative;
  width: 32px;
  height: 16px;
  flex: none;
  border: 1px solid var(--eve-border-grey-light);
  background: var(--eve-window-bg);
  outline: none;
  transition: border-color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out, box-shadow var(--eve-dur-hover) ease-out;
}
.eve-toggle__knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
  background: var(--eve-text-secondary);
  transition: transform var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.eve-toggle.is-on .eve-toggle__track { border-color: var(--eve-border-primary); background: var(--eve-bg-primary); }
.eve-toggle.is-on .eve-toggle__knob { transform: translateX(16px); background: var(--eve-primary); }
.eve-toggle:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-toggle__track { border-color: var(--eve-primary); box-shadow: 0 0 2px var(--eve-primary); }
.eve-toggle:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-toggle__knob { background: var(--eve-text-highlighted); }
.eve-toggle:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-toggle__track { transition-duration: 0ms; background: var(--eve-bg-press); border-color: var(--eve-bg-press); }
.eve-toggle:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-toggle__knob { background: var(--eve-text-on-press); }
.eve-toggle__track:focus-visible,
.eve-toggle[data-eve-state='focus'] .eve-toggle__track { border-color: var(--eve-border-primary-light); }
.eve-toggle.is-disabled { cursor: not-allowed; color: var(--eve-text-disabled); }
.eve-toggle.is-disabled .eve-toggle__knob { background: var(--eve-text-disabled); }
</style>
