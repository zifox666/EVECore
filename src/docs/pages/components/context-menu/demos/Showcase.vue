<script setup lang="ts">
import { ref } from 'vue';
import EveContextMenu from '@/components/eve/EveContextMenu.vue';
import EveMenuList, { type MenuItem } from '@/components/eve/EveMenuList.vue';
import { DemoGroup } from '@/docs/kit';

const last = ref('—');
const items: MenuItem[] = [
  { type: 'title', label: 'Rifter' },
  { key: 'info', label: 'Show Info', icon: 'info', highlighted: true },
  { key: 'fit', label: 'Fitting', icon: 'fitting' },
  { key: 'hangar', label: 'Make Active', icon: 'ship-hangar' },
  { key: 'cargo', label: 'Open Cargo', icon: 'cargo' },
  { type: 'separator' },
  { key: 'repair', label: 'Repair', icon: 'repair-shop', disabled: true },
  {
    key: 'more',
    label: 'Copy',
    icon: 'i-tabler-copy',
    children: [
      { key: 'copy-name', label: 'Ship name' },
      { key: 'copy-id', label: 'Item ID' },
    ],
  },
  { type: 'separator' },
  { key: 'scrap', label: 'Self-Destruct', icon: 'terminate' },
];
const staticItems: MenuItem[] = [
  { type: 'title', label: 'Jita' },
  { key: 'a', label: 'Set Destination', icon: 'map', highlighted: true },
  { key: 'b', label: 'Show Info', icon: 'info', state: 'hover' },
  { key: 'c', label: 'Open Market', icon: 'market', state: 'press' },
  { key: 'd', label: 'Dock', icon: 'station', state: 'focus' },
  { key: 'e', label: 'Open Assets', icon: 'assets', disabled: true },
  { type: 'separator' },
  { key: 'f', label: 'Bookmarks', icon: 'browser-bookmarks', children: [{ key: 'g', label: 'Add' }] },
];
const longItems: MenuItem[] = [
  { key: 'a', label: 'Add Tritanium, Pyerite and Mexallon to Jita sell orders in bulk', icon: 'market' },
  { key: 'b', label: 'Short', icon: 'info' },
  { key: 'c', label: 'No icon' },
];
const anchor = { left: 0, right: 0, top: 0, bottom: 0 };
</script>

<template>
  <DemoGroup :label="{ zh: '右键面板', en: 'Right-click the panel' }" :hint="{ zh: '悬停子菜单；键盘 ↑↓ → Esc', en: 'Hover the submenu; keys ↑↓ → Esc' }" :row="false">
    <EveContextMenu :items="items" @select="last = $event">
      <div class="panel">Right-click this ship<br /><span class="eve-detail eve-text-secondary eve-num">selected: {{ last }}</span></div>
    </EveContextMenu>
  </DemoGroup>

  <DemoGroup :label="{ zh: '菜单（静态）', en: 'Menu (static)' }" :hint="{ zh: 'normal · hover · press · focus · disabled · 子菜单', en: 'normal · hover · press · focus · disabled · submenu' }">
    <EveMenuList :items="staticItems" :anchor="anchor" inline />
  </DemoGroup>

  <DemoGroup :label="{ zh: '长标签与无图标', en: 'Long labels, missing icons' }">
    <div style="max-width: 280px"><EveMenuList :items="longItems" :anchor="anchor" inline /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '已禁用', en: 'Disabled' }" :hint="{ zh: '显示浏览器菜单', en: 'Shows the browser menu' }" :row="false">
    <EveContextMenu :items="items" disabled><div class="panel">Right-click: native menu</div></EveContextMenu>
  </DemoGroup>
</template>

<style scoped>
.panel { padding: 24px; border: 1px dashed var(--eve-divider); color: var(--eve-text-secondary); max-width: 320px; }
</style>
