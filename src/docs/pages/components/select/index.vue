<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveSelect from '@/components/eve/EveSelect.vue';
const hub = ref('jita');
const hubs = [
  { label: 'Jita', value: 'jita' },
  { label: 'Amarr', value: 'amarr' },
  { label: 'Dodixie', value: 'dodixie', disabled: true },
];
<\/script>

<template>
  <EveSelect v-model="hub" :options="hubs" placeholder="Trade hub" />
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "string | number | null" },
  { name: 'options', type: "{ label: string; value: string | number; disabled?: boolean }[]", notes: { zh: "选项列表", en: "Option list" } },
  { name: 'placeholder', type: "string" },
  { name: 'disabled', type: "boolean", default: "false" },
  { name: 'invalid', type: "boolean", default: "false" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSelect.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '选项少于 4 个时优先用 Radio。', en: 'Prefer Radio for fewer than 4 options.' },
          { zh: '选项文字简短，单行。', en: 'Keep option labels short and single-line.' },
        ]"
        :dont="[
          { zh: '不要在展开态保留切角。', en: 'Don’t keep the cut corner while open.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
