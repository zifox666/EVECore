<!-- SPDX-License-Identifier: MIT -->
<!--
  EveContextMenu — right-click menu. Wraps its default slot; opens at the pointer on `contextmenu`.
  Items: entries, separators, title rows, one level of submenu. Emits `select(key)`.
  Item `icon` takes an Iconify class ("i-eve-info") or an EVE icon name ("info"); items honour data-eve-state via `state` (see EveMenuList).
  Requires: EveMenuList.vue (and its EveIcon.vue)
-->
<script setup lang="ts">
import { ref } from 'vue';
import EveMenuList, { type MenuItem } from './EveMenuList.vue';

withDefaults(defineProps<{ items: MenuItem[]; disabled?: boolean }>(), { disabled: false });
const emit = defineEmits<{ select: [key: string]; open: []; close: [] }>();

const point = ref<{ x: number; y: number } | null>(null);

function onContext(e: MouseEvent) {
  e.preventDefault();
  point.value = { x: e.clientX, y: e.clientY };
  emit('open');
}
function close() {
  if (!point.value) return;
  point.value = null;
  emit('close');
}
function onSelect(key: string) {
  emit('select', key);
  close();
}
</script>

<template>
  <div class="eve-context-menu" @contextmenu="!disabled && onContext($event)">
    <slot />
    <EveMenuList
      v-if="point"
      :items="items"
      :anchor="{ left: point.x, right: point.x, top: point.y, bottom: point.y }"
      @select="onSelect"
      @close="close"
    />
  </div>
</template>
