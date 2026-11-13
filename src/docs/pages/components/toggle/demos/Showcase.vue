<script setup lang="ts">
import { ref } from 'vue';
import EveToggle from '@/components/eve/EveToggle.vue';
import { DemoGroup } from '@/docs/kit';

const overview = ref(true);
const brackets = ref(false);
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }">
    <EveToggle v-model="overview">Overview</EveToggle>
    <EveToggle v-model="brackets">Show brackets</EveToggle>
    <EveToggle :model-value="false" />
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '关闭状态', en: 'Off states' }">
    <EveToggle v-for="s in states" :key="s" :model-value="false" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveToggle>
    <EveToggle :model-value="false" disabled>disabled</EveToggle>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '开启状态', en: 'On states' }">
    <EveToggle v-for="s in states" :key="s" :model-value="true" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveToggle>
    <EveToggle :model-value="true" disabled>disabled</EveToggle>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '长标签', en: 'Long label' }" :row="false">
    <div style="max-width: 260px">
      <EveToggle :model-value="true">Automatically reprocess Tritanium, Pyerite and Mexallon when docked in Jita</EveToggle>
    </div>
  </DemoGroup>
</template>
