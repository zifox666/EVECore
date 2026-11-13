<!-- SPDX-License-Identifier: MIT -->
<!--
  EvePill — 6px-radius filter chip. bg-primary, 1px grey-light border (primary when selected), padding 4×8.
  With `removable` it splits into "label | ×" with a 1px divider; each part lights up (bg-primary-light) and flashes on press.
  Docs/tests can force a state with data-eve-state="hover|press|focus" on the root (drives the label part) or on `.eve-pill__remove`.
  Requires: lib/utils.ts
-->
<script setup lang="ts">
import { computed } from 'vue';
import { usePressFlash } from '@/lib/utils';

const props = withDefaults(defineProps<{ removable?: boolean; disabled?: boolean }>(), { removable: false, disabled: false });
const emit = defineEmits<{ click: [event: MouseEvent]; remove: [event: MouseEvent] }>();
const selected = defineModel<boolean>('selected', { default: false });

const main = usePressFlash();
const rm = usePressFlash();
const mainOn = computed(() => main.pressed.value && !props.disabled);
const rmOn = computed(() => rm.pressed.value && !props.disabled);

function onClick(e: MouseEvent) {
  if (props.disabled) return;
  selected.value = !selected.value;
  emit('click', e);
}
function onRemove(e: MouseEvent) {
  if (!props.disabled) emit('remove', e);
}
</script>

<template>
  <span class="eve-pill" :class="{ 'is-selected': selected, 'is-disabled': disabled }">
    <button
      type="button"
      class="eve-pill__part eve-pill__label"
      :class="{ 'is-pressed': mainOn }"
      :aria-pressed="selected"
      :disabled="disabled"
      v-on="main.handlers"
      @click="onClick"
    >
      <slot />
    </button>
    <button
      v-if="removable"
      type="button"
      class="eve-pill__part eve-pill__remove"
      :class="{ 'is-pressed': rmOn }"
      aria-label="Remove"
      :disabled="disabled"
      v-on="rm.handlers"
      @click="onRemove"
    >
      <span class="i-tabler-x" aria-hidden="true" />
    </button>
  </span>
</template>

<style>
.eve-pill {
  display: inline-flex;
  align-items: stretch;
  overflow: hidden;
  vertical-align: middle;
  background: var(--eve-bg-primary);
  border: 1px solid var(--eve-border-grey-light);
  border-radius: var(--eve-radius-md);
  transition: border-color var(--eve-dur-hover) ease-out;
}
.eve-pill.is-selected { border-color: var(--eve-primary); }
.eve-pill__part {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 4px 8px;
  border: 0;
  background: transparent;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--eve-dur-hover) ease-out, color var(--eve-dur-hover) ease-out;
}
.eve-pill__remove { padding: 4px 6px; border-left: 1px solid var(--eve-border-grey-light); }
.eve-pill.is-selected .eve-pill__remove { border-left-color: var(--eve-primary); }
.eve-pill__remove > span { width: 14px; height: 14px; }
.eve-pill__part:not(:disabled):is(:hover, [data-eve-state='hover']),
.eve-pill[data-eve-state='hover'] > .eve-pill__label:not(:disabled) { background: var(--eve-bg-primary-light); color: var(--eve-text-highlighted); }
.eve-pill__part.is-pressed:not(:disabled),
.eve-pill__part[data-eve-state='press']:not(:disabled),
.eve-pill[data-eve-state='press'] > .eve-pill__label:not(:disabled) {
  background: var(--eve-bg-press);
  color: var(--eve-text-on-press);
  text-shadow: none;
  transition-duration: 0ms;
}
.eve-pill__part:focus-visible,
.eve-pill__part[data-eve-state='focus'],
.eve-pill[data-eve-state='focus'] > .eve-pill__label { outline: 1px solid var(--eve-border-primary-light); outline-offset: -1px; }
.eve-pill__part:disabled { color: var(--eve-text-disabled); cursor: not-allowed; }
</style>
