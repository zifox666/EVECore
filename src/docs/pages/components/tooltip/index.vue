<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveTooltip from '@/components/eve/EveTooltip.vue';
<\/script>

<template>
  <EveTooltip content="Jita IV - Moon 4" placement="top" :delay="400">
    <EveButton>Jita</EveButton>
  </EveTooltip>
</template>`;

const props: PropRow[] = [
  { name: 'content', type: 'string', notes: { zh: '纯文本内容；复杂内容用 #content 插槽', en: 'Plain text; use the #content slot for rich content' } },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", notes: { zh: '空间不足时自动翻转', en: 'Flips when there is no room' } },
  { name: 'delay', type: 'number', default: '400', notes: { zh: '悬停多少毫秒后出现', en: 'Hover delay in ms' } },
  { name: 'disabled', type: 'boolean', default: 'false' },
];
const slots: PropRow[] = [
  { name: 'default', type: '—', notes: { zh: '触发元素', en: 'The trigger' } },
  { name: 'content', type: '—', notes: { zh: '提示内容（覆盖 content 属性）', en: 'Tooltip body (overrides the content prop)' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveTooltip.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '只放数据或名称：星系、物品、数值。', en: 'Show data or names only: systems, items, numbers.' },
          { zh: '提示内允许悬停，方便复制其中文字。', en: 'Keep it hoverable so its text can be selected.' },
        ]"
        :dont="[
          { zh: '不要用提示解释表头或写操作说明。', en: 'No tooltips that explain headers or give instructions.' },
          { zh: '不要放可点击的控件——那是弹出层。', en: 'No interactive controls inside — that is a popover.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
