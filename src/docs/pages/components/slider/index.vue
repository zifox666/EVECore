<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveSlider from '@/components/eve/EveSlider.vue';
const speed = ref(40);
<\/script>

<template>
  <EveSlider v-model="speed" :min="0" :max="100" :step="5" label="Speed" />
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "number", default: "0" },
  { name: 'min', type: "number", default: "0" },
  { name: 'max', type: "number", default: "100" },
  { name: 'step', type: "number", default: "1" },
  { name: 'disabled', type: "boolean", default: "false" },
  { name: 'label', type: "string", notes: { zh: "aria-label", en: "aria-label" } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSlider.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '旁边显示当前数值。', en: 'Show the current value next to it.' },
        ]"
        :dont="[
          { zh: '精确输入请用 Input，不要只靠滑块。', en: 'For exact values add an Input; don’t rely on the slider alone.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
