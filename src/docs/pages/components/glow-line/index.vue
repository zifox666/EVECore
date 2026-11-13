<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveGlowLine from '@/components/eve/EveGlowLine.vue';
<\/script>

<template>
  <div class="eve-glow-host" style="position: relative; padding: 6px 12px">
    <EveGlowLine absolute color="var(--eve-danger)" />
    Rifter on grid
  </div>
</template>`;

const props: PropRow[] = [
  { name: 'color', type: 'string', default: "'var(--eve-primary)'", notes: { zh: '任意 CSS 颜色', en: 'Any CSS colour' } },
  { name: 'active', type: 'boolean', default: 'false', notes: { zh: '带半透明从 10% 升到 50%', en: 'Band goes from 10% to 50%' } },
  { name: 'absolute', type: 'boolean', default: 'false', notes: { zh: '贴在定位父级左侧；父级 hover 时自动 50%', en: 'Hugs the left of a positioned parent; 50% on parent hover' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveGlowLine.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '用于导航选中项、告警条目与敌对标记。', en: 'Use for nav selection, alert entries and hostile markers.' },
          { zh: '颜色用语义色：primary、danger。', en: 'Colour with semantic tokens: primary, danger.' },
        ]"
        :dont="[
          { zh: '不要在静态元素上加辉光。', en: 'Do not add glow to static elements.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
