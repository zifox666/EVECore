<!-- SPDX-License-Identifier: MIT -->
<!--
  EveCheckbox — 16px box with four 2px corner cuts, 1px border-grey-light.
  Hover: border + 2px glow turn primary. Press: fill flashes #EAEAEA. Check icon is primary. Supports indeterminate.
  Docs/tests can force a state with data-eve-state="hover|press|focus" on the root.
  Requires: lib/utils.ts
-->
<script setup lang="ts">
import { computed } from 'vue';
import { usePressFlash } from '@/lib/utils';

const props = withDefaults(
  defineProps<{ disabled?: boolean; indeterminate?: boolean; value?: unknown }>(),
  { disabled: false, indeterminate: false },
);
/** boolean, or an array when used with `value` (multi-select group). */
const model = defineModel<boolean | unknown[]>({ default: false });

const { pressed, handlers } = usePressFlash();
const checked = computed(() =>
  Array.isArray(model.value) ? model.value.includes(props.value) : !!model.value,
);
const state = computed(() => (props.indeterminate ? 'mixed' : checked.value ? 'true' : 'false'));

function toggle() {
  if (props.disabled) return;
  if (Array.isArray(model.value)) {
    model.value = checked.value ? model.value.filter((v) => v !== props.value) : [...model.value, props.value];
  } else {
    model.value = props.indeterminate ? true : !model.value;
  }
}
function onKey(e: KeyboardEvent) {
  if (e.key === ' ') {
    e.preventDefault();
    toggle();
  }
}
</script>

<template>
  <span
    class="eve-checkbox"
    :class="{ 'is-disabled': disabled, 'is-pressed': pressed && !disabled, 'is-checked': checked || indeterminate }"
    v-on="disabled ? {} : handlers"
    @click="toggle"
  >
    <span class="eve-checkbox__glow">
      <span
        class="eve-checkbox__box"
        role="checkbox"
        :aria-checked="state"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : 0"
        @keydown="onKey"
      >
        <span v-if="indeterminate" class="eve-checkbox__mark i-tabler-minus" aria-hidden="true" />
        <span v-else-if="checked" class="eve-checkbox__mark i-tabler-check" aria-hidden="true" />
      </span>
    </span>
    <span v-if="$slots.default" class="eve-checkbox__label"><slot /></span>
  </span>
</template>

<style>
.eve-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
.eve-checkbox__box {
  --_cut: 2px;
  --eve-box-border: var(--eve-border-grey-light);
  --eve-box-bg: var(--eve-window-bg);
  box-sizing: border-box;
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  flex: none;
  outline: none;
  background: var(--eve-box-border);
  clip-path: polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px);
  transition: background-color var(--eve-dur-hover) ease-out;
}
.eve-checkbox__box::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: var(--eve-box-bg);
  clip-path: polygon(1.6px 0, calc(100% - 1.6px) 0, 100% 1.6px, 100% calc(100% - 1.6px), calc(100% - 1.6px) 100%, 1.6px 100%, 0 calc(100% - 1.6px), 0 1.6px);
  transition: background-color var(--eve-dur-hover) ease-out;
}
/* clip-path would clip a box-shadow, so the 2px glow is a drop-shadow filter on the wrapper */
.eve-checkbox__glow { display: inline-flex; flex: none; transition: filter var(--eve-dur-hover) ease-out; }
.eve-checkbox:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-checkbox__box { --eve-box-border: var(--eve-primary); }
.eve-checkbox:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-checkbox__glow { filter: drop-shadow(0 0 2px var(--eve-primary)); }
.eve-checkbox__mark { width: 14px; height: 14px; color: var(--eve-primary); }
.eve-checkbox:is(.is-pressed, [data-eve-state='press']) .eve-checkbox__box,
.eve-checkbox:is(.is-pressed, [data-eve-state='press']) .eve-checkbox__box::before { transition-duration: 0ms; }
.eve-checkbox:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-checkbox__box { --eve-box-bg: var(--eve-bg-press); --eve-box-border: var(--eve-bg-press); }
.eve-checkbox:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-checkbox__mark { color: var(--eve-text-on-press); }
.eve-checkbox__box:focus-visible,
.eve-checkbox[data-eve-state='focus'] .eve-checkbox__box { --eve-box-border: var(--eve-border-primary-light); }
.eve-checkbox.is-disabled { cursor: not-allowed; color: var(--eve-text-disabled); }
.eve-checkbox.is-disabled .eve-checkbox__mark { color: var(--eve-text-disabled); }
</style>
