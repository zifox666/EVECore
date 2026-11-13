<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveDivider from '@/components/eve/EveDivider.vue';
<\/script>

<template>
  <EveDivider label="Tritanium" />
  <EveDivider orientation="vertical" />
</template>`;

const props: PropRow[] = [
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", notes: { zh: '竖直时撑满父级高度', en: 'Vertical stretches to the parent height' } },
  { name: 'label', type: 'string', notes: { zh: '居中标签（仅水平），也可用默认插槽', en: 'Centred label (horizontal only); or the default slot' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveDivider.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '分割线只用 divider 色，1px。', en: 'Dividers use the divider colour, 1px only.' },
          { zh: '标签保持 1–2 个词。', en: 'Keep labels to one or two words.' },
        ]"
        :dont="[
          { zh: '不要用粗线或彩色线做静态装饰。', en: 'No thick or coloured lines as static decoration.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
