<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveSystemChip from '@/components/eve/EveSystemChip.vue';
<\/script>

<template>
  <EveSystemChip name="Jita" :security="0.9459" region="The Forge" />
</template>`;

const props: PropRow[] = [
  { name: 'name', type: 'string' },
  { name: 'security', type: 'number', notes: { zh: '真实安等，内部按 EVE 规则取整并取色', en: 'True security status; rounded the EVE way for colour and label' } },
  { name: 'region', type: 'string', notes: { zh: '可选的星域前置段（安等色 25%）', en: 'Optional leading segment (security colour @25%)' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSystemChip.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '所有星系显示都用它，保证带安等色。', en: 'Use it for every solar system so the security colour is always present.' },
          { zh: '传入真实安等（如 0.4501），不要自己取整。', en: 'Pass the true security (e.g. 0.4501); don’t round it yourself.' },
        ]"
        :dont="[
          { zh: '不要手写安等色值。', en: 'Don’t hand-pick security colours.' },
          { zh: '不要加圆角超过 2px。', en: 'No radius above 2px.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
