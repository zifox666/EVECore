<!-- SPDX-License-Identifier: MIT -->
<!--
  EveRadio — 16px circular radio, same states as EveCheckbox (hover border + 2px primary glow, press flash #EAEAEA).
  Docs/tests can force a state with data-eve-state="hover|press|focus" on the root.
  Must live inside an EveRadioGroup. Only the checked radio is in the tab order (roving focus).
  Requires: EveRadioGroup.vue, lib/utils.ts
-->
<script setup lang="ts">
import { computed, inject } from 'vue';
import { usePressFlash } from '@/lib/utils';
import { radioKey } from './EveRadioGroup.vue';

const props = withDefaults(defineProps<{ value: unknown; disabled?: boolean }>(), { disabled: false });
const group = inject(radioKey, null);

const off = computed(() => props.disabled || !!group?.disabled.value);
const checked = computed(() => !!group && group.model.value === props.value);
const hasChecked = computed(() => group?.model.value !== undefined && group?.model.value !== null);
const { pressed, handlers } = usePressFlash();

function select() {
  if (!off.value) group?.select(props.value);
}
function onKey(e: KeyboardEvent) {
  if (e.key === ' ') {
    e.preventDefault();
    select();
  }
}
const tab = computed(() => (off.value ? -1 : checked.value || !hasChecked.value ? 0 : -1));
</script>

<template>
  <span
    class="eve-radio"
    :class="{ 'is-disabled': off, 'is-checked': checked, 'is-pressed': pressed && !off }"
    v-on="off ? {} : handlers"
    @click="select"
  >
    <span
      class="eve-radio__circle"
      role="radio"
      :aria-checked="checked"
      :aria-disabled="off || undefined"
      :tabindex="tab"
      @keydown="onKey"
    >
      <span v-if="checked" class="eve-radio__dot" />
    </span>
    <span v-if="$slots.default" class="eve-radio__label"><slot /></span>
  </span>
</template>

<style>
.eve-radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
.eve-radio__circle {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  flex: none;
  border: 1px solid var(--eve-border-grey-light);
  border-radius: 50%;
  background: var(--eve-window-bg);
  outline: none;
  transition: border-color var(--eve-dur-hover) ease-out, box-shadow var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.eve-radio__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--eve-primary); }
.eve-radio:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-radio__circle { border-color: var(--eve-primary); box-shadow: 0 0 2px var(--eve-primary); }
.eve-radio:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-radio__circle { transition-duration: 0ms; background: var(--eve-bg-press); border-color: var(--eve-bg-press); }
.eve-radio:is(.is-pressed, [data-eve-state='press']):not(.is-disabled) .eve-radio__dot { background: var(--eve-text-on-press); }
.eve-radio__circle:focus-visible,
.eve-radio[data-eve-state='focus'] .eve-radio__circle { border-color: var(--eve-border-primary-light); }
.eve-radio.is-disabled { cursor: not-allowed; color: var(--eve-text-disabled); }
.eve-radio.is-disabled .eve-radio__dot { background: var(--eve-text-disabled); }
</style>
