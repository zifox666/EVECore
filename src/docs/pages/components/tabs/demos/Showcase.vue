<script setup lang="ts">
import { computed, ref } from 'vue';
import EveTabs from '@/components/eve/EveTabs.vue';
import { DemoGroup } from '@/docs/kit';

const tab = ref('orders');
const tabs = [
  { value: 'orders', label: 'Orders', icon: 'market', count: 12 },
  { value: 'assets', label: 'Assets', icon: 'assets' },
  { value: 'wallet', label: 'Wallet', icon: 'wallet' },
  { value: 'contracts', label: 'Contracts', icon: 'contracts', count: 3 },
];

const wide = ref('assets');

const staticTab = ref('selected');
const stateTabs = computed(() => [
  { value: 'normal', label: 'normal' },
  { value: 'hover', label: 'hover', state: 'hover' as const },
  { value: 'press', label: 'press', state: 'press' as const },
  { value: 'focus', label: 'focus', state: 'focus' as const },
  { value: 'selected', label: 'selected' },
  { value: 'disabled', label: 'disabled', disabled: true },
]);

const many = [
  'Overview', 'Skills', 'Implants', 'Standings', 'Clones', 'Attributes', 'Employment', 'Medals', 'Titles', 'Bio',
].map((l) => ({ value: l.toLowerCase(), label: l }));
const manyTab = ref('bio');
const manyFirst = ref('overview');
const tight = ref('market');
const tightTabs = [
  { value: 'market', label: 'Market Orders in The Forge region', icon: 'market' },
  { value: 'industry', label: 'Industry', icon: 'industry' },
  { value: 'skills', label: 'Skills', icon: 'skills' },
];
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }" :hint="{ zh: '方向键 · Home/End', en: 'Arrows · Home/End' }" :row="false">
    <EveTabs v-model="tab" :tabs="tabs" />
    <p class="eve-detail eve-text-secondary" style="margin: 8px 0 0">{{ tab }}</p>
  </DemoGroup>

  <DemoGroup :label="{ zh: '宽内边距与图标类', en: 'Wide and icon classes' }" :hint="{ zh: 'i- 前缀走类名', en: 'i- prefix = class' }" :row="false">
    <EveTabs
      v-model="wide"
      wide
      :tabs="[
        { value: 'assets', label: 'Assets', icon: 'assets' },
        { value: 'search', label: 'Search', icon: 'i-tabler-search' },
        { value: 'log', label: 'Log', icon: 'i-tabler-list', count: 128 },
      ]"
    />
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态（静态）', en: 'States (static)' }" :hint="{ zh: 'normal · hover · press · focus · selected · disabled', en: 'normal · hover · press · focus · selected · disabled' }" :row="false">
    <EveTabs v-model="staticTab" :tabs="stateTabs" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '溢出：选中项始终可见', en: 'Overflow: selected stays visible' }" :hint="{ zh: '300px，选中最后一项', en: '300px, last tab selected' }" :row="false">
    <div style="width: 300px; max-width: 100%"><EveTabs v-model="manyTab" :tabs="many" /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '更窄', en: 'Narrower' }" :hint="{ zh: '至少保留一个标签 + 按钮', en: 'At least one tab + the button' }" :row="false">
    <div style="width: 160px; max-width: 100%"><EveTabs v-model="manyFirst" :tabs="many" /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '超长标签', en: 'Long label' }" :hint="{ zh: '第一项就放不下', en: 'First tab alone is too wide' }" :row="false">
    <div style="width: 240px; max-width: 100%"><EveTabs v-model="tight" :tabs="tightTabs" /></div>
  </DemoGroup>
</template>
