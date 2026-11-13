<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveToggle from '@/components/eve/EveToggle.vue';
const overview = ref(true);
<\/script>

<template>
  <EveToggle v-model="overview">Overview</EveToggle>
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "boolean", default: "false" },
  { name: 'disabled', type: "boolean", default: "false" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveToggle.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <p><L zh="空格或回车切换，点击标签同样切换。" en="Space or Enter toggles; clicking the label toggles too." /></p>
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
          { zh: '开关立即生效，不需要“保存”。', en: 'A toggle applies immediately; no “Save” needed.' },
        ]"
        :dont="[
          { zh: '需要提交的选项用 Checkbox。', en: 'Use Checkbox for options that are submitted.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
