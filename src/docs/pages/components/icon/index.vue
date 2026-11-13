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
      <p><L zh="固定图标用 UnoCSS 类名，只会打包用到的图标。需要在 uno.config.ts 注册 eve 集合：" en="For fixed icons use the UnoCSS class — only the icons you use are shipped. Register the eve collection in uno.config.ts:" /></p>
      <CodeBlock :code="unoSnippet" lang="ts" />
      <CodeBlock :code="usageStatic" lang="html" />
      <p><L zh="名称来自数据（路由、配置）时用 EveIcon：" en="When the name comes from data (routes, config), use EveIcon:" /></p>
      <CodeBlock :code="usageDynamic" lang="html" />
      <PropsTable :rows="props" />
      <p><L zh="没有 title 时图标是装饰性的（aria-hidden）；图标单独出现、没有相邻文字时必须设置 title。" en="Without a title the icon is decorative (aria-hidden); when it stands alone with no adjacent text, always set a title." /></p>
      <p><L zh="每个实例会给内部的 clipPath / mask id 加唯一前缀，同页多个图标不会冲突。" en="Each instance prefixes its internal clipPath / mask ids, so many icons on one page never collide." /></p>
      <p><L zh="EveIcon 按图标懒加载，首次出现时才请求对应的 SVG。静态类名必须在源码中完整出现，不能拼接。" en="EveIcon lazy-loads each SVG on first use. Static class names must appear literally in source — never concatenated." /></p>
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
