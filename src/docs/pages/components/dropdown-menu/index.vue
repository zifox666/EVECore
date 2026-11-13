<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveDropdownMenu from '@/components/eve/EveDropdownMenu.vue';
import EveButton from '@/components/eve/EveButton.vue';
<\/script>

<template>
  <EveDropdownMenu :items="items" align="end" @select="onSelect">
    <template #default="{ open, attrs }">
      <EveButton v-bind="attrs" icon="i-tabler-chevron-down">Ship</EveButton>
    </template>
  </EveDropdownMenu>
</template>`;

const props: PropRow[] = [
  { name: 'items', type: 'MenuItem[]', notes: { zh: '同右键菜单', en: 'Same as the context menu' } },
  { name: 'align', type: "'start' | 'end'", default: "'start'", notes: { zh: '菜单与触发元素的左/右边对齐', en: 'Align the menu to the trigger’s left / right edge' } },
  { name: 'v-model:open', type: 'boolean', default: 'false' },
  { name: 'disabled', type: 'boolean', default: 'false' },
];
const events: PropRow[] = [{ name: 'select', type: '(key: string)' }];
const slots: PropRow[] = [
  { name: 'default', type: '{ open, attrs }', notes: { zh: '触发元素；把 attrs 绑定到按钮上', en: 'The trigger; bind attrs on the button' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveDropdownMenu.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
      <PropsTable :rows="slots" kind="slots" />
      <p>
        <L
          zh="点击、Enter、Space 或 ↓ 打开；关闭后焦点回到触发元素。菜单项键盘操作同右键菜单。"
          en="Click, Enter, Space or ↓ opens it; focus returns to the trigger on close. Item keyboard handling matches the context menu."
        />
      </p>
      <p><L zh="item 的 icon 可以是 Iconify 类（i-eve-info）或不带 i- 前缀的 EVE 图标名（info）。" en="An item's icon is an Iconify class (i-eve-info) or an EVE icon name without the i- prefix (info)." /></p>
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '菜单至少与触发元素等宽。', en: 'The menu is at least as wide as its trigger.' },
          { zh: '选一个值请用 Select；这里只放命令。', en: 'To pick a value use Select; this is for commands.' },
        ]"
        :dont="[
          { zh: '不要在菜单里放表单控件。', en: 'No form controls inside the menu.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
