<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<EveFrame cut="br" class="my-card">…</EveFrame>

<style>
.my-card {
  --eve-frame-border: var(--eve-border-primary);
  --eve-frame-bg: var(--eve-bg-primary);
}
.my-card:hover { --eve-frame-border: var(--eve-border-primary-light); }
</style>`;

const props: PropRow[] = [
  { name: 'cut', type: "'br' | 'bl' | 'both' | 'none'", default: "'br'" },
  { name: 'size', type: 'number', default: '9', notes: { zh: '切角尺寸（px）', en: 'Cut size in px' } },
  { name: 'as', type: 'string', default: "'div'", notes: { zh: '渲染的元素', en: 'Element to render' } },
];
const vars: PropRow[] = [
  { name: '--eve-frame-border', type: 'color', default: 'var(--eve-window-border)', notes: { zh: '边框色（外层填充）', en: 'Border colour (outer layer fill)' } },
  { name: '--eve-frame-bg', type: 'color', default: 'var(--eve-window-bg)', notes: { zh: '底色（内层 ::before）', en: 'Fill colour (inner ::before)' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveFrame.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="vars" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[{ zh: '切角只给按钮、下拉框这类可交互控件。', en: 'Cut corners belong on interactive controls: buttons, selects.' }]"
        :dont="[
          { zh: '面板、输入框、表格保持直角，不要切角。', en: 'Panels, inputs and tables stay square — no cuts.' },
          { zh: '不要用 box-shadow 给切角元素加外发光：会被 clip-path 裁掉。用 ::before 的 inset 阴影。', en: 'Don’t add an outer box-shadow glow: clip-path cuts it off. Use an inset shadow on ::before.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
