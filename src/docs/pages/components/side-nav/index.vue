<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveSideNav from '@/components/eve/EveSideNav.vue';

const key = ref('overview');
<\/script>

<template>
  <EveSideNav v-model="key" :items="items" @select="router.push" />
</template>`;

const props: PropRow[] = [
  { name: 'items', type: '{ key, label, icon?, state?, children? }[]', notes: { zh: 'icon 为 EVE 图标名（如 wallet），带 i- 前缀则为 Iconify 类名；只支持一层 children；state 强制显示 hover | press | focus', en: 'icon is an EVE icon name (e.g. wallet), or an Iconify class with an i- prefix; one level of children only; state forces hover | press | focus' } },
  { name: 'v-model', type: 'string', notes: { zh: '选中项的 key', en: 'Selected key' } },
  { name: 'collapsed', type: 'boolean', default: 'false', notes: { zh: '64px 图标列，用 title 属性显示名称', en: '64px icon column; names via the title attribute' } },
];
const events: PropRow[] = [{ name: 'select', type: '(key: string)', notes: { zh: '点击叶子项时触发，用于路由跳转', en: 'Fired when a leaf item is chosen, e.g. to navigate' } }];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveSideNav.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '每个顶层项配一个图标，折叠后才可辨认。', en: 'Give every top-level item an icon so it reads when collapsed.' },
          { zh: '桌面 220px，平板默认折叠为 64px。', en: '220px on desktop; collapsed 64px on tablet.' },
        ]"
        :dont="[
          { zh: '不要使用深蓝 inverted 侧栏。', en: 'No inverted dark-blue sidebar.' },
          { zh: '不要嵌套两层以上分组。', en: 'Do not nest groups more than one level.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
