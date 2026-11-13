<script setup lang="ts">
import { ref } from 'vue';
import EveSelect, { type SelectOption } from '@/components/eve/EveSelect.vue';
import { DemoGroup } from '@/docs/kit';

const hubs: SelectOption[] = [
  { label: 'Jita', value: 'jita' },
  { label: 'Amarr', value: 'amarr' },
  { label: 'Dodixie', value: 'dodixie', disabled: true },
  { label: 'Rens', value: 'rens' },
  { label: 'Hek', value: 'hek' },
];
const systems: SelectOption[] = [
  'Jita', 'Perimeter', 'Amarr', 'Dodixie', 'Rens', 'Hek', 'Tama', 'Ahbazon', 'Aufay', 'Egghelende', 'Old Man Star', 'Sobaseki',
  'Ashab', 'Villore', 'Isanamo', 'Todaki',
].map((s) => ({ label: s, value: s.toLowerCase() }));
const long: SelectOption[] = [
  { label: 'Caldari Navy Hookbill Blueprint Copy — Researched ME 10 TE 20 in Jita 4-4', value: 'a' },
  { label: 'Rifter', value: 'b' },
];

const hub = ref<string | number | null>('jita');
const empty = ref<string | number | null>(null);
const many = ref<string | number | null>('perimeter');
const lng = ref<string | number | null>('a');
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }">
    <div style="width: 200px"><EveSelect v-model="hub" :options="hubs" placeholder="Trade hub" /></div>
    <div style="width: 200px"><EveSelect v-model="empty" :options="hubs" placeholder="Trade hub" /></div>
    <span class="eve-detail eve-text-secondary">{{ hub }} · {{ empty ?? 'null' }}</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }" :row="false">
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <div v-for="s in states" :key="s" style="width: 160px">
        <EveSelect model-value="jita" :options="hubs" :data-eve-state="s === 'normal' ? undefined : s" />
      </div>
      <div style="width: 160px"><EveSelect model-value="jita" :options="hubs" disabled /></div>
      <div style="width: 160px"><EveSelect model-value="jita" :options="hubs" invalid /></div>
      <div style="width: 160px"><EveSelect :model-value="null" :options="hubs" placeholder="Trade hub" /></div>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界情况', en: 'Edge cases' }">
    <div style="width: 200px"><EveSelect v-model="many" :options="systems" /></div>
    <div style="width: 200px"><EveSelect v-model="lng" :options="long" /></div>
    <div style="width: 200px"><EveSelect :model-value="null" :options="[]" placeholder="No stations" /></div>
  </DemoGroup>
</template>
