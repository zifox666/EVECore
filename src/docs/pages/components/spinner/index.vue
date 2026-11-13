<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveSpinner from '@/components/eve/EveSpinner.vue';
<\/script>

<template>
  <EveSpinner :size="24" label="Loading" />
</template>`;

const props: PropRow[] = [
  { name: 'size', type: '16 | 24 | 32', default: '24' },
  { name: 'label', type: 'string', default: "'Loading'", notes: { zh: 'role="status" 的无障碍名称', en: 'Accessible name for role="status"' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSpinner.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '已知进度时用 Progress；未知时用 Spinner。', en: 'Known progress: Progress. Unknown: Spinner.' },
          { zh: '按钮内的加载用 EveButton 的 loading。', en: 'Inside buttons use EveButton’s loading prop.' },
        ]"
        :dont="[{ zh: '不要同时显示多个大号 Spinner。', en: 'Don’t show several large spinners at once.' }]"
      />
    </DocSection>
  </DocPage>
</template>
