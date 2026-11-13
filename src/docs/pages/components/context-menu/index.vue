<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveContextMenu from '@/components/eve/EveContextMenu.vue';
import type { MenuItem } from '@/components/eve/EveMenuList.vue';

const items: MenuItem[] = [
  { type: 'title', label: 'Jita' },
  { key: 'dest', label: 'Set destination', icon: 'map', highlighted: true },
  { type: 'separator' },
  { key: 'copy', label: 'Copy', children: [{ key: 'copy-name', label: 'System name' }] },
];
<\/script>

<template>
  <EveContextMenu :items="items" @select="onSelect">
    <SystemRow />
  </EveContextMenu>
</template>`;

const props: PropRow[] = [
  { name: 'items', type: 'MenuItem[]', notes: { zh: '{key,label,icon?,highlighted?,disabled?,children?} | {type:"separator"} | {type:"title",label}', en: '{key,label,icon?,highlighted?,disabled?,children?} | {type:"separator"} | {type:"title",label}' } },
  { name: 'disabled', type: 'boolean', default: 'false' },
];
const events: PropRow[] = [
  { name: 'select', type: '(key: string)', notes: { zh: '选中叶子项；菜单随后关闭', en: 'A leaf item was chosen; the menu then closes' } },
  { name: 'open / close', type: '()' },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveContextMenu.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
      <p>
        <L
          zh="键盘：↑↓ 移动，Home/End 跳转，Enter 选中，→ 打开子菜单，← / Escape 返回或关闭。菜单渲染到 body，点击外部关闭。"
          en="Keyboard: ↑↓ move, Home/End jump, Enter selects, → opens a submenu, ← / Escape go back or close. Rendered into body; outside click closes."
        />
      </p>
      <p><L zh="item 的 icon 可以是 Iconify 类（i-eve-info）或不带 i- 前缀的 EVE 图标名（info），后者通过 EveIcon 渲染。" en="An item's icon is an Iconify class (i-eve-info) or an EVE icon name without the i- prefix (info), rendered through EveIcon." /></p>
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '最常用、最安全的操作放最上面；高亮项只给主操作。', en: 'Most common, safest actions first; highlight only the main action.' },
          { zh: '用标题行说明菜单作用于谁（如星系名）。', en: 'Use a title row to name the subject (e.g. the system).' },
        ]"
        :dont="[
          { zh: '子菜单最多一层。', en: 'One level of submenu at most.' },
          { zh: '不要把右键菜单作为唯一入口。', en: 'Never make the context menu the only way to reach an action.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
