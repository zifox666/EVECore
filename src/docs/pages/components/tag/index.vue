<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveTag from '@/components/eve/EveTag.vue';
<\/script>

<template>
  <EveTag tone="success" dot>Online</EveTag>
</template>`;

const props: PropRow[] = [
  { name: 'tone', type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'away' | 'omega'", default: "'neutral'", notes: { zh: '决定文字色与 50% 透明的 1px 边框', en: 'Sets text colour and the 1px border at 50% alpha' } },
  { name: 'dot', type: 'boolean', default: 'false', notes: { zh: '前置 6px 状态点', en: 'Leading 6px status dot' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveTag.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '只放 1–2 个词的短标签；英文自动大写。', en: 'Keep to one or two words; Latin text is uppercased automatically.' },
          { zh: '背景保持透明，颜色是语义而非装饰。', en: 'Keep the background transparent; colour is semantic, not decorative.' },
        ]"
        :dont="[
          { zh: '不要用填充底色表达状态。', en: 'No filled backgrounds to express status.' },
          { zh: '不要把它做成可点击——需要点击用 Pill。', en: 'Don’t make it clickable — use Pill for that.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
