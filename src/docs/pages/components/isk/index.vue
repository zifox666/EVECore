<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveIsk from '@/components/eve/EveIsk.vue';
<\/script>

<template>
  <EveIsk :value="wallet" animated :decimals="0" />
  <EveIsk :value="-12400" delta :suffix="false" />
</template>`;

const props: PropRow[] = [
  { name: 'value', type: 'number' },
  { name: 'decimals', type: 'number', default: '2' },
  { name: 'delta', type: 'boolean', default: 'false', notes: { zh: '涨绿跌红（仅文字色），前置 ▲▼，显示绝对值', en: 'Green up / red down (text only), ▲▼ prefix, shows the absolute value' } },
  { name: 'animated', type: 'boolean', default: 'false', notes: { zh: '值变化时 600ms ease-out 滚动；尊重 reduced-motion', en: 'Rolls over 600ms ease-out; honours reduced-motion' } },
  { name: 'suffix', type: 'boolean', default: 'true', notes: { zh: '显示次要色 “ISK”', en: 'Show the secondary “ISK”' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveIsk.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '所有金额都用等宽 + 千分位，表格中右对齐。', en: 'All amounts are mono with separators; right-align them in tables.' },
          { zh: '滚动计数只用于余额与统计。', en: 'Use the rolling count only for balances and stats.' },
        ]"
        :dont="[
          { zh: '涨跌不要加底色，只改文字色。', en: 'Never put a background behind up/down — text colour only.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
