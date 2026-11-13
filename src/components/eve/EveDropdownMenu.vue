<!-- SPDX-License-Identifier: MIT -->
<!--
  EveDropdownMenu — a menu opened from a trigger (default slot) and shown below it.
  The slot receives `{ open, attrs }`; bind `attrs` (aria-haspopup / aria-expanded) on your button.
  Click, Enter, Space or ArrowDown on the trigger opens; focus returns to the trigger on close.
  Item `icon` takes an Iconify class ("i-eve-info") or an EVE icon name ("info"); items honour data-eve-state via `state` (see EveMenuList).
  Requires: EveMenuList.vue (and its EveIcon.vue)
-->
<script setup lang="ts">
import { nextTick, ref } from 'vue';
import EveMenuList, { type MenuAnchor, type MenuItem } from './EveMenuList.vue';

withDefaults(defineProps<{ items: MenuItem[]; align?: 'start' | 'end'; disabled?: boolean }>(), {
  align: 'start',
  disabled: false,
});
const emit = defineEmits<{ select: [key: string] }>();
const open = defineModel<boolean>('open', { default: false });

const trigger = ref<HTMLElement>();
const anchor = ref<MenuAnchor>({ left: 0, right: 0, top: 0, bottom: 0 });
const viaKeyboard = ref(false);

function show(kb: boolean) {
  const r = trigger.value?.getBoundingClientRect();
  if (!r) return;
  anchor.value = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  viaKeyboard.value = kb;
  open.value = true;
}
function close(restoreFocus = true) {
  open.value = false;
  if (restoreFocus)
    nextTick(() => {
      const a = document.activeElement;
      if (a && a !== document.body) return;
      (trigger.value?.querySelector<HTMLElement>('button, [tabindex], a, input') ?? trigger.value)?.focus();
    });
}
function onClick(e: MouseEvent) {
  if (open.value) close(false);
  else show(e.detail === 0);
}
function onKey(e: KeyboardEvent) {
  if (!open.value && e.key === 'ArrowDown') {
    e.preventDefault();
    show(true);
  }
}
function onSelect(key: string) {
  emit('select', key);
  close();
}
</script>

<template>
  <span ref="trigger" class="eve-dropdown-menu" @click="!disabled && onClick($event)" @keydown="!disabled && onKey($event)">
    <slot :open="open" :attrs="{ 'aria-haspopup': 'menu', 'aria-expanded': open }" />
  </span>
  <EveMenuList
    v-if="open"
    :items="items"
    :anchor="anchor"
    :align-end="align === 'end'"
    match-width
    :first-active="viaKeyboard"
    :ignore="trigger"
    @select="onSelect"
    @close="close()"
  />
</template>

<style>
.eve-dropdown-menu { display: inline-flex; }
</style>
