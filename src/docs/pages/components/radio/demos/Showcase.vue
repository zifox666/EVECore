<script setup lang="ts">
import { ref } from 'vue';
import EveRadio from '@/components/eve/EveRadio.vue';
import EveRadioGroup from '@/components/eve/EveRadioGroup.vue';
import { DemoGroup } from '@/docs/kit';

const route = ref('safe');
const space = ref('low');
const none = ref<string>();
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '纵向', en: 'Vertical' }">
    <EveRadioGroup v-model="route" label="Route">
      <EveRadio value="safe">Safer</EveRadio>
      <EveRadio value="short">Shorter</EveRadio>
      <EveRadio value="unsafe">Less secure</EveRadio>
      <EveRadio value="pochven" disabled>Via Pochven</EveRadio>
    </EveRadioGroup>
    <span class="eve-detail eve-text-secondary" style="margin-left: 24px">{{ route }}</span>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '横向', en: 'Horizontal' }">
    <EveRadioGroup v-model="space" direction="horizontal" label="Space">
      <EveRadio value="high">High-sec</EveRadio>
      <EveRadio value="low">Low-sec</EveRadio>
      <EveRadio value="null">Null-sec</EveRadio>
    </EveRadioGroup>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '未选中状态', en: 'Unchecked states' }">
    <EveRadioGroup :model-value="undefined" direction="horizontal">
      <EveRadio v-for="s in states" :key="s" value="x" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveRadio>
      <EveRadio value="x" disabled>disabled</EveRadio>
    </EveRadioGroup>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '选中状态', en: 'Checked states' }">
    <EveRadioGroup model-value="x" direction="horizontal">
      <EveRadio v-for="s in states" :key="s" value="x" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveRadio>
      <EveRadio value="x" disabled>disabled</EveRadio>
    </EveRadioGroup>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '整组禁用与无选中', en: 'Disabled group and no selection' }">
    <EveRadioGroup model-value="high" disabled>
      <EveRadio value="high">Amarr</EveRadio>
      <EveRadio value="low">Caldari</EveRadio>
    </EveRadioGroup>
    <EveRadioGroup v-model="none" style="margin-left: 24px">
      <EveRadio value="a">Rifter</EveRadio>
      <EveRadio value="b">Merlin</EveRadio>
    </EveRadioGroup>
  </DemoGroup>

  <DemoGroup wide :label="{ zh: '长标签', en: 'Long label' }" :row="false">
    <div style="max-width: 260px">
      <EveRadioGroup model-value="a">
        <EveRadio value="a">Deliver Tritanium, Pyerite and Mexallon to the Perimeter trade hub</EveRadio>
        <EveRadio value="b">Hold</EveRadio>
      </EveRadioGroup>
    </div>
  </DemoGroup>
</template>
