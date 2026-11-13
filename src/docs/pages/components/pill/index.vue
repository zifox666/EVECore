<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EvePill from '@/components/eve/EvePill.vue';
<\/script>

<template>
  <EvePill v-model:selected="active">Highsec</EvePill>
  <EvePill removable @remove="drop('Domain')">Domain</EvePill>
</template>`;

const props: PropRow[] = [
  { name: 'v-model:selected', type: 'boolean', default: 'false', notes: { zh: '选中时边框变 primary；点击标签部分切换', en: 'Border turns primary; clicking the label toggles' } },
  { name: 'removable', type: 'boolean', default: 'false', notes: { zh: '拆成 “标签 | ×” 两段', en: 'Splits into “label | ×”' } },
  { name: 'disabled', type: 'boolean', default: 'false' },
];
const events: PropRow[] = [
  { name: 'click', type: 'MouseEvent' },
  { name: 'remove', type: 'MouseEvent' },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EvePill.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '用于过滤条件与已选项。', en: 'Use for filters and chosen values.' },
          { zh: '6px 是系统最大圆角，仅 Pill 使用。', en: '6px is the largest radius in the system, used only here.' },
        ]"
        :dont="[
          { zh: '不要把 Pill 当按钮使用。', en: 'Don’t use a Pill as a button.' },
          { zh: '不要用它表示状态，状态用 Tag。', en: 'Don’t use it for status — use Tag.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
