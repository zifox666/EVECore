<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EvePanel from '@/components/eve/EvePanel.vue';
<\/script>

<template>
  <EvePanel title="Local" size="small" icon="people-and-places">
    <template #actions>
      <button aria-label="Close"><span class="i-tabler-x" /></button>
    </template>
    12 pilots in system
  </EvePanel>
</template>`;

const props: PropRow[] = [
  { name: 'title', type: 'string', notes: { zh: '标题文字，也可用 #title 插槽', en: 'Title text; or use the #title slot' } },
  { name: 'size', type: "'full' | 'small'", default: "'full'", notes: { zh: 'full 48px（headline）；small 32px（header）', en: 'full 48px (headline); small 32px (header)' } },
  { name: 'icon', type: 'string', notes: { zh: 'EVE 图标名（如 wallet）；带 i- 前缀则当作 Iconify 类名。full 32px，small 16px', en: 'EVE icon name (e.g. wallet); an i- prefix is treated as an Iconify class. 32px in full, 16px in small' } },
  { name: 'active', type: 'boolean | undefined', default: 'undefined', notes: { zh: '未传时自动：内部聚焦/按下为激活，外部按下为非激活', en: 'When omitted, automatic: focus/press inside activates, press outside deactivates' } },
  { name: 'transparent', type: 'boolean', default: 'false', notes: { zh: '40% 底 + 模糊，用于星图上的浮动面板', en: '40% background + blur, for floating panels over the map' } },
  { name: 'flush', type: 'boolean', default: 'false', notes: { zh: '去掉内容区 16px 内边距', en: 'Removes the 16px content padding' } },
];
const slots: PropRow[] = [
  { name: 'default', type: '—', notes: { zh: '内容区', en: 'Content' } },
  { name: 'title', type: '—', notes: { zh: '自定义标题', en: 'Custom title' } },
  { name: 'actions', type: '—', notes: { zh: '右侧 16px 窗口按钮', en: 'Right-side 16px window buttons' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EvePanel.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '面板之间留 8px 间距，像贴在一起的舰载显示屏。', en: 'Leave 8px between panels, like adjacent ship displays.' },
          { zh: '透明模式只用于星图上的浮动面板。', en: 'Use transparent mode only for floating panels over the map.' },
          { zh: '小于 640px 的屏幕统一用 small。', en: 'Use small everywhere below 640px.' },
        ]"
        :dont="[
          { zh: '不要加圆角或投影，层级靠边框与发光。', en: 'No rounded corners or drop shadows; depth comes from borders and glow.' },
          { zh: '不要给静态面板常亮顶线，它只代表激活。', en: 'Do not keep the top line lit on a static panel; it means active.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
