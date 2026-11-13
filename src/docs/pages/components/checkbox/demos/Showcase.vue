<script setup lang="ts">
import { ref } from 'vue';
import EveCheckbox from '@/components/eve/EveCheckbox.vue';
import { DemoGroup } from '@/docs/kit';

const autopilot = ref(true);
const hangars = ['Jita', 'Amarr', 'Dodixie'];
const picked = ref<string[]>(['Jita']);
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }">
    <EveCheckbox v-model="autopilot">Use autopilot</EveCheckbox>
    <EveCheckbox :model-value="false">Warp to 0</EveCheckbox>
    <EveCheckbox :model-value="false" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '多选组', en: 'Group' }" :row="false">
    <div style="display: grid; gap: 8px">
      <EveCheckbox
        :model-value="picked.length === hangars.length"
        :indeterminate="picked.length > 0 && picked.length < hangars.length"
        @update:model-value="picked = $event ? [...hangars] : []"
      >
        All hangars
      </EveCheckbox>
      <div style="display: grid; gap: 8px; padding-left: 24px">
        <EveCheckbox v-for="h in hangars" :key="h" v-model="picked" :value="h">{{ h }}</EveCheckbox>
      </div>
      <span class="eve-detail eve-text-secondary">{{ picked.join(', ') || '—' }}</span>
    </div>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '未选中状态', en: 'Unchecked states' }">
    <EveCheckbox v-for="s in states" :key="s" :model-value="false" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveCheckbox>
    <EveCheckbox :model-value="false" disabled>disabled</EveCheckbox>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '选中状态', en: 'Checked states' }">
    <EveCheckbox v-for="s in states" :key="s" :model-value="true" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveCheckbox>
    <EveCheckbox :model-value="true" disabled>disabled</EveCheckbox>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '半选状态', en: 'Indeterminate states' }">
    <EveCheckbox v-for="s in states" :key="s" :model-value="false" indeterminate :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveCheckbox>
    <EveCheckbox :model-value="false" indeterminate disabled>disabled</EveCheckbox>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '长标签', en: 'Long label' }" :row="false">
    <div style="max-width: 260px">
      <EveCheckbox :model-value="true">Automatically reprocess Tritanium, Pyerite and Mexallon when docked in Jita</EveCheckbox>
    </div>
  </DemoGroup>
</template>
