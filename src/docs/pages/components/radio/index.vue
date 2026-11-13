<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveRadioGroup from '@/components/eve/EveRadioGroup.vue';
import EveRadio from '@/components/eve/EveRadio.vue';
const route = ref('safe');
<\/script>

<template>
  <EveRadioGroup v-model="route" label="Route">
    <EveRadio value="safe">Safer</EveRadio>
    <EveRadio value="short">Shorter</EveRadio>
  </EveRadioGroup>
</template>`;

const props: PropRow[] = [
  { name: 'EveRadioGroup  modelValue', type: "unknown", notes: { zh: "选中项的 value", en: "Selected value" } },
  { name: 'EveRadioGroup  direction', type: "'vertical' | 'horizontal'", default: "'vertical'" },
  { name: 'EveRadioGroup  disabled', type: "boolean", default: "false" },
  { name: 'EveRadioGroup  label', type: "string", notes: { zh: "aria-label", en: "aria-label" } },
  { name: 'EveRadio  value', type: "unknown", notes: { zh: "必填", en: "Required" } },
  { name: 'EveRadio  disabled', type: "boolean", default: "false" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveRadio.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <p><L zh="只有选中项在 Tab 顺序内（roving focus）；方向键循环并跳过禁用项。EveRadio 是 Group 的依赖，会被自动解析。" en="Only the checked radio is in the tab order (roving focus); arrows wrap and skip disabled items. EveRadio is a dependency of the group and is resolved automatically." /></p>
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
          { zh: '方向键在选项间移动并选中。', en: 'Arrow keys move and select.' },
        ]"
        :dont="[
          { zh: '不要在组外单独使用 EveRadio。', en: 'Don’t use EveRadio outside a group.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
