<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveIconButton from '@/components/eve/EveIconButton.vue';
<\/script>

<template>
  <EveIconButton icon="i-tabler-refresh" label="Refresh" @click="reload" />
  <EveIconButton icon="i-tabler-pin" label="Pin" :active="pinned" @click="pinned = !pinned" />
</template>`;

const props: PropRow[] = [
  { name: 'icon', type: 'string', notes: { zh: '必填。Iconify 类名，16px', en: 'Required. Iconify class, 16px' } },
  { name: 'label', type: 'string', notes: { zh: '必填。aria-label 与 title', en: 'Required. aria-label and title' } },
  { name: 'active', type: 'boolean', default: 'false', notes: { zh: '切换态，primary 色，aria-pressed', en: 'Toggled state in primary, aria-pressed' } },
  { name: 'disabled', type: 'boolean', default: 'false' },
  { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveIconButton.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '始终提供 label，图标本身不是名称。', en: 'Always provide a label; the icon is not a name.' },
          { zh: '窗口按钮、工具栏用它；有文字的操作用 EveButton。', en: 'Use it for window buttons and toolbars; labelled actions use EveButton.' },
        ]"
        :dont="[
          { zh: '不要加边框或背景。', en: 'No border or background.' },
          { zh: '不要在静态状态显示辉光条。', en: 'Never show the glow bar in the resting state.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
