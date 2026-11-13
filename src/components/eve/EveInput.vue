<!-- SPDX-License-Identifier: MIT -->
<!--
  EveInput — 32px text field. window-bg @ 50%, 1px border-grey, square corners, 7px padding.
  Focus: border becomes border-primary (no focus ring). Invalid: danger border. Optional 16px leading icon.
  The #suffix slot lets EveSearchField put a clear button on the right.
  Docs/tests can force a state with data-eve-state="hover|focus" (there is no press state on a text field).
  class, style and data-eve-state land on the root; every other attribute goes to the <input>.
  Requires: nothing else.
-->
<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** Iconify class for a 16px leading icon, e.g. "i-tabler-user". */
    icon?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
  }>(),
  { type: 'text', disabled: false, invalid: false },
);

const model = defineModel<string>({ default: '' });
const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _c, style: _s, 'data-eve-state': _d, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    class="eve-input"
    :class="[$attrs.class, { 'is-disabled': disabled, 'is-invalid': invalid, 'has-icon': icon }]"
    :style="($attrs.style as any)"
    :data-eve-state="($attrs['data-eve-state'] as string | undefined)"
  >
    <span v-if="icon" class="eve-input__icon" :class="icon" aria-hidden="true" />
    <input
      v-bind="inputAttrs"
      v-model="model"
      class="eve-input__field"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
    />
    <slot name="suffix" />
  </div>
</template>

<style>
.eve-input {
  display: flex;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  width: 100%;
  height: var(--eve-control-height);
  padding: 0 7px;
  background: color-mix(in srgb, var(--eve-window-bg) 50%, transparent);
  border: 1px solid var(--eve-border-grey);
  transition: border-color var(--eve-dur-hover) ease-out;
}
.eve-input:is(:hover, [data-eve-state='hover']):not(.is-disabled) { border-color: var(--eve-border-grey-light); }
.eve-input:is(:focus-within, [data-eve-state='focus']):not(.is-disabled) { border-color: var(--eve-border-primary); }
.eve-input.is-invalid,
.eve-input.is-invalid:is(:hover, [data-eve-state='hover']):not(.is-disabled),
.eve-input.is-invalid:is(:focus-within, [data-eve-state='focus']):not(.is-disabled) { border-color: var(--eve-danger); }
.eve-input__icon { width: 16px; height: 16px; flex: none; color: var(--eve-text-secondary); }
.eve-input__field {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  background: transparent;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  caret-color: var(--eve-border-primary-light);
}
.eve-input__field::placeholder { color: var(--eve-text-secondary); }
.eve-input.is-disabled { cursor: not-allowed; }
.eve-input.is-disabled .eve-input__field { color: var(--eve-text-disabled); cursor: not-allowed; }
.eve-input.is-disabled .eve-input__field::placeholder { color: var(--eve-text-disabled); }
</style>
