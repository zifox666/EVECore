<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import unoSnippet from './demos/uno-snippet.ts.txt?raw';

const usageStatic = `<span class="i-eve-wallet" />                       <!-- 1em, currentColor -->
<span class="i-eve-wallet text-24px" />             <!-- 24px -->`;

const usageDynamic = `<script setup lang="ts">
import EveIcon from '@/components/eve/EveIcon.vue';
<\/script>

<template>
  <EveIcon name="wallet" :size="24" title="Wallet" />
  <EveIcon :name="route.meta.icon" />   <!-- name from data -->
</template>`;

const props: PropRow[] = [
  { name: 'name', type: 'EveIconName', notes: { zh: '必填；名称见 src/lib/eve-icons.ts', en: 'Required; names live in src/lib/eve-icons.ts' } },
  { name: 'size', type: 'number', default: '16', notes: { zh: '像素；折叠导航 24，完整面板标题栏 32', en: 'Pixels; 24 in collapsed nav, 32 in full panel title bars' } },
  { name: 'title', type: 'string', notes: { zh: '设置后成为 role="img" 并带名称；不设则为装饰性', en: 'Makes it role="img" with that name; omit for a decorative icon' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveIcon.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="unoSnippet" lang="ts" />
      <CodeBlock :code="usageStatic" lang="html" />
      <CodeBlock :code="usageDynamic" lang="html" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '颜色跟随文字：静止 secondary，悬停 highlighted，激活 primary。', en: 'Colour follows text: secondary at rest, highlighted on hover, primary when active.' },
          { zh: '单独出现的图标设置 title。', en: 'Give a standalone icon a title.' },
          { zh: '名称固定时优先用 i-eve-* 类名。', en: 'Prefer the i-eve-* class when the name is fixed.' },
        ]"
        :dont="[
          { zh: '不要把图标放进 chip、tag 或表格单元格。', en: 'No icons in chips, tags or table cells.' },
          { zh: '不要只靠颜色表达状态。', en: 'Never express a state by colour alone.' },
          { zh: '不要拼接类名，如 `i-eve-${name}`。', en: 'Don’t build class names by concatenation, e.g. `i-eve-${name}`.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
