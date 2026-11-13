<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveSectionTitle from '@/components/eve/EveSectionTitle.vue';
<\/script>

<template>
  <EveSectionTitle>Buy orders<template #right>42 orders</template></EveSectionTitle>
</template>`;

const props: PropRow[] = [{ name: 'as', type: 'string', default: "'div'", notes: { zh: '渲染的标签，如 h2', en: 'Rendered tag, e.g. h2' } }];
const slots: PropRow[] = [
  { name: 'default', type: '—', notes: { zh: '标题', en: 'Title' } },
  { name: 'right', type: '—', notes: { zh: '右侧内容', en: 'Trailing content' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSectionTitle.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '用它取代粗体小标题来分组。', en: 'Use it instead of bold subheadings to group content.' },
          { zh: '买单/卖单分区用它区分，不用彩色底块。', en: 'Separate buy/sell orders with it, not coloured blocks.' },
        ]"
        :dont="[
          { zh: '不要加粗标题文字。', en: 'Do not bold the title.' },
          { zh: '不要在条内放主按钮。', en: 'Do not put primary buttons in the bar.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
