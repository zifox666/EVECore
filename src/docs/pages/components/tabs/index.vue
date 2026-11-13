<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveTabs from '@/components/eve/EveTabs.vue';

const tab = ref('orders');
<\/script>

<template>
  <EveTabs v-model="tab" :tabs="[
    { value: 'orders', label: 'Orders', count: 12 },
    { value: 'assets', label: 'Assets' },
  ]" />
</template>`;

const props: PropRow[] = [
  { name: 'v-model', type: 'string', notes: { zh: '选中 tab 的 value', en: 'Value of the selected tab' } },
  { name: 'tabs', type: '{ value, label, icon?, count?, disabled?, state? }[]', notes: { zh: 'icon 为 EVE 图标名（如 wallet），带 i- 前缀则为 Iconify 类名；state 强制显示 hover | press | focus', en: 'icon is an EVE icon name (e.g. wallet), or an Iconify class with an i- prefix; state forces hover | press | focus' } },
  { name: 'wide', type: 'boolean', default: 'false', notes: { zh: '内边距 12px（默认 8px）', en: '12px padding (default 8px)' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveTabs.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '标签保持 1–2 个词；计数用徽标。', en: 'Keep labels to one or two words; show counts as badges.' },
          { zh: '左右方向键切换，Home/End 跳到首尾。', en: 'Arrow keys switch tabs; Home/End jump to the ends.' },
        ]"
        :dont="[
          { zh: '不要换行；放不下就让它溢出到下拉。', en: 'Do not wrap; let tabs overflow into the dropdown.' },
          { zh: '不要给 tab 加圆角或底色块。', en: 'No rounded or filled tab shapes.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
