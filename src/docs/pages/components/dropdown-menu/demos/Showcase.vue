<script setup lang="ts">
import { ref } from 'vue';
import EveButton from '@/components/eve/EveButton.vue';
import EveDropdownMenu from '@/components/eve/EveDropdownMenu.vue';
import EveIconButton from '@/components/eve/EveIconButton.vue';
import type { MenuItem } from '@/components/eve/EveMenuList.vue';
import { DemoGroup } from '@/docs/kit';

const last = ref('—');
const open = ref(false);
const items: MenuItem[] = [
  { key: 'info', label: 'Show Info', icon: 'info', highlighted: true },
  { key: 'fit', label: 'Fitting', icon: 'fitting' },
  { key: 'hangar', label: 'Make Active', icon: 'ship-hangar' },
  { type: 'separator' },
  { key: 'repair', label: 'Repair', icon: 'repair-shop', disabled: true },
  {
    key: 'more',
    label: 'Ship Actions',
    icon: 'cargo',
    children: [
      { key: 'eject', label: 'Eject Cargo' },
      { key: 'rename', label: 'Rename' },
    ],
  },
  { type: 'separator' },
  { key: 'scrap', label: 'Self-Destruct', icon: 'terminate' },
];
const longItems: MenuItem[] = [
  { key: 'a', label: 'Add Tritanium, Pyerite and Mexallon to Jita sell orders in bulk', icon: 'market' },
  { key: 'b', label: 'Close', icon: 'info' },
];
</script>

<template>
  <DemoGroup :label="{ zh: '触发按钮', en: 'Trigger button' }">
    <EveDropdownMenu :items="items" @select="last = $event">
      <template #default="{ attrs }">
        <EveButton v-bind="attrs" icon="i-eve-ship-hangar">Rifter</EveButton>
      </template>
    </EveDropdownMenu>
    <span class="eve-detail eve-text-secondary eve-num">selected: {{ last }}</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '图标触发 · 右对齐', en: 'Icon trigger · align end' }">
    <EveDropdownMenu v-model:open="open" :items="items" align="end" @select="last = $event">
      <template #default="{ attrs, open: isOpen }">
        <EveIconButton v-bind="attrs" icon="i-eve-settings" label="Ship menu" :active="isOpen" />
      </template>
    </EveDropdownMenu>
    <span class="eve-detail eve-text-secondary">{{ open ? 'open' : 'closed' }}</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '长标签', en: 'Long labels' }">
    <EveDropdownMenu :items="longItems">
      <template #default="{ attrs }"><EveButton v-bind="attrs" icon="i-tabler-chevron-down">Orders</EveButton></template>
    </EveDropdownMenu>
  </DemoGroup>

  <DemoGroup :label="{ zh: '已禁用', en: 'Disabled' }">
    <EveDropdownMenu :items="items" disabled>
      <template #default="{ attrs }"><EveButton v-bind="attrs" disabled>Ship</EveButton></template>
    </EveDropdownMenu>
  </DemoGroup>
</template>
