<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveCheckbox from '@/components/eve/EveCheckbox.vue';
const autopilot = ref(true);
<\/script>

<template>
  <EveCheckbox v-model="autopilot">Use autopilot</EveCheckbox>
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "boolean | unknown[]", default: "false", notes: { zh: "传数组并设置 value 时作为多选组", en: "Pass an array plus value for multi-select" } },
  { name: 'value', type: "unknown", notes: { zh: "数组模式下此项的值", en: "This item\u2019s value in array mode" } },
  { name: 'indeterminate', type: "boolean", default: "false" },
  { name: 'disabled', type: "boolean", default: "false" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveCheckbox.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <p><L zh="空格切换；半选状态点击后变为选中。" en="Space toggles; clicking an indeterminate box makes it checked." /></p>
      <p>
        <L
          zh="文档与测试可用 data-eve-state=&quot;hover|press|focus&quot; 强制显示某个状态。"
          en="Docs and tests can force a state with data-eve-state=&quot;hover|press|focus&quot;."
        />
      </p>
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '标签点击也会切换。', en: 'Clicking the label toggles too.' },
        ]"
        :dont="[
          { zh: '互斥选项用 Radio，不要用复选框。', en: 'Use Radio for exclusive choices.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
