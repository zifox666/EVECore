<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveSearchField from '@/components/eve/EveSearchField.vue';
const query = ref('');
<\/script>

<template>
  <EveSearchField v-model="query" placeholder="Search systems" @clear="reload" />
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "string", default: "''" },
  { name: 'placeholder', type: "string" },
  { name: 'disabled', type: "boolean", default: "false" },
];

const events: PropRow[] = [
  { name: 'clear', type: '()', notes: { zh: "用户点击清除或按 Esc 之后触发", en: "Fired after the user clears via the button or Escape" } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSearchField.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable kind="events" :rows="events" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '搜索结果实时过滤，不要再放“搜索”按钮。', en: 'Filter live; don’t add a separate “Search” button.' },
        ]"
        :dont="[
          { zh: '不要自己再画一个清除按钮。', en: 'Don’t draw your own clear button.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
