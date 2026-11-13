<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveProgress from '@/components/eve/EveProgress.vue';
<\/script>

<template>
  <EveProgress :value="0.4" :secondary="0.25" label="Cargo" />
  <EveProgress :value="0.62" show-value label="Shield" />
</template>`;

const props: PropRow[] = [
  { name: 'value', type: 'number', default: '0', notes: { zh: '0–1', en: '0–1' } },
  { name: 'secondary', type: 'number', default: '0', notes: { zh: '0–1，紧接主进度绘制第二段', en: '0–1, second segment drawn right after the primary' } },
  { name: 'color / secondaryColor', type: 'string', notes: { zh: '默认 #0D557E；可传 CSS 颜色或语义 token', en: 'Default #0D557E; any CSS colour or semantic token' } },
  { name: 'indeterminate', type: 'boolean', default: 'false' },
  { name: 'showValue', type: 'boolean', default: 'false', notes: { zh: '居中显示百分比（等宽），高度变为 16px', en: 'Centred mono percentage; bar becomes 16px' } },
  { name: 'large', type: 'boolean', default: 'false', notes: { zh: '16px 高', en: '16px tall' } },
  { name: 'height', type: 'number', default: '4', notes: { zh: '像素高度', en: 'Height in px' } },
  { name: 'label', type: 'string', notes: { zh: 'aria-label', en: 'aria-label' } },
];
const slots: PropRow[] = [{ name: 'default', type: '—', notes: { zh: '16px 条内的居中标签（等宽）', en: 'Centred label inside the 16px bar (mono)' } }];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveProgress.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '数字用等宽字体。', en: 'Numbers in the mono font.' },
          { zh: '状态用 color 传语义色（危险、成功）。', en: 'Pass a semantic colour via color (danger, success).' },
        ]"
        :dont="[
          { zh: '不要加圆角或渐变。', en: 'No rounding or gradients.' },
          { zh: '时长未知才用 indeterminate。', en: 'Use indeterminate only when duration is unknown.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
