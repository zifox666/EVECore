<script setup lang="ts">
import { computed, ref } from 'vue';
import EveSearchField from '@/components/eve/EveSearchField.vue';
import { DemoGroup } from '@/docs/kit';

const q = ref('');
const systems = ['Jita', 'Perimeter', 'Amarr', 'Dodixie', 'Rens', 'Hek', 'Tama', 'Pochven'];
const hits = computed(() => systems.filter((s) => s.toLowerCase().includes(q.value.toLowerCase())));
const cleared = ref(0);
const states = ['normal', 'hover', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '实时过滤', en: 'Live filter' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveSearchField v-model="q" placeholder="Search systems" @clear="cleared++" />
      <span class="eve-detail eve-text-secondary eve-num">
        {{ hits.length ? hits.join(' · ') : '—' }} ({{ cleared }} clears)
      </span>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveSearchField
        v-for="s in states"
        :key="s"
        model-value="Rifter"
        :data-eve-state="s === 'normal' ? undefined : s"
      />
      <EveSearchField model-value="" placeholder="Search systems" />
      <EveSearchField model-value="Rifter" disabled />
      <EveSearchField model-value="" placeholder="Search systems" disabled />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界情况', en: 'Edge cases' }" :row="false">
    <div style="max-width: 240px">
      <EveSearchField model-value="Tritanium Pyerite Mexallon Isogen Nocxium Zydrine Megacyte" />
    </div>
  </DemoGroup>
</template>
