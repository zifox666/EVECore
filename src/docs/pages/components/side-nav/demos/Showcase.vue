<script setup lang="ts">
import { ref } from 'vue';
import EveSideNav, { type SideNavItem } from '@/components/eve/EveSideNav.vue';
import { DemoGroup } from '@/docs/kit';

const items: SideNavItem[] = [
  { key: 'character', label: 'Character Sheet', icon: 'character-sheet' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet' },
  { key: 'assets', label: 'Assets', icon: 'assets' },
  {
    key: 'market',
    label: 'Market',
    icon: 'market',
    children: [
      { key: 'orders', label: 'My Orders' },
      { key: 'regional', label: 'Regional Market' },
    ],
  },
  { key: 'industry', label: 'Industry', icon: 'industry' },
  { key: 'skills', label: 'Skills', icon: 'skills' },
  { key: 'contracts', label: 'Contracts', icon: 'contracts' },
  { key: 'fleet', label: 'Fleet', icon: 'fleet' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];
const key = ref('wallet');
const collapsedKey = ref('market');
const collapsed = ref(true);

const stateItems: SideNavItem[] = [
  { key: 's-normal', label: 'normal', icon: 'wallet' },
  { key: 's-hover', label: 'hover', icon: 'assets', state: 'hover' },
  { key: 's-press', label: 'press', icon: 'market', state: 'press' },
  { key: 's-focus', label: 'focus', icon: 'industry', state: 'focus' },
  { key: 's-selected', label: 'selected', icon: 'skills' },
];
const stateKey = ref('s-selected');

const edge: SideNavItem[] = [
  { key: 'long', label: 'Corporation Hangar Division 3 Industry Jobs', icon: 'corp-hangar' },
  { key: 'cls', label: 'Tabler icon class', icon: 'i-tabler-star' },
  { key: 'none', label: 'No icon' },
  {
    key: 'g',
    label: 'Group',
    icon: 'folder',
    children: [
      { key: 'g1', label: 'Child with icon', icon: 'ships' },
      { key: 'g2', label: 'Child without icon' },
    ],
  },
];
const edgeKey = ref('g1');
</script>

<template>
  <DemoGroup :label="{ zh: '展开与折叠', en: 'Expanded and collapsed' }" :hint="{ zh: '折叠后悬停看名称', en: 'Collapsed shows names on hover' }" :row="false">
    <div class="side">
      <div class="box w220"><EveSideNav v-model="key" :items="items" /></div>
      <div class="box w64"><EveSideNav v-model="collapsedKey" :items="items" collapsed /></div>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '折叠切换', en: 'Toggle' }" :hint="{ zh: '宽度 200ms 过渡', en: 'Width animates in 200ms' }" :row="false">
    <button class="toggle eve-detail" @click="collapsed = !collapsed">{{ collapsed ? 'expand' : 'collapse' }}</button>
    <div class="box" style="height: 220px; margin-top: 8px; width: fit-content"><EveSideNav v-model="key" :items="items" :collapsed="collapsed" /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态（静态）', en: 'States (static)' }" :hint="{ zh: 'normal · hover · press · focus · selected', en: 'normal · hover · press · focus · selected' }" :row="false">
    <div class="box w220"><EveSideNav v-model="stateKey" :items="stateItems" /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界情况', en: 'Edge cases' }" :hint="{ zh: '长标签 · 图标类 · 无图标 · 嵌套', en: 'Long label · icon class · no icon · nested' }" :row="false">
    <div class="box w220"><EveSideNav v-model="edgeKey" :items="edge" /></div>
  </DemoGroup>
</template>

<style scoped>
.side { display: flex; align-items: stretch; flex-wrap: wrap; gap: 16px; }
.box { border: 1px solid var(--eve-window-border); }
.w220 { width: 222px; }
.w64 { width: 66px; }
.toggle { padding: 4px 12px; border: 1px solid var(--eve-border-primary-dark); background: var(--eve-window-bg); color: var(--eve-text-primary); cursor: pointer; }
</style>
