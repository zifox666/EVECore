<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveDialog from '@/components/eve/EveDialog.vue';
<\/script>

<template>
  <EveDialog v-model:open="open" title="Scrap Rifter">
    Rifter will be reprocessed.
    <template #footer>
      <EveButton @click="open = false">Cancel</EveButton>
      <EveButton variant="primary" @click="confirm">Scrap</EveButton>
    </template>
  </EveDialog>
</template>`;

const props: PropRow[] = [
  { name: 'v-model:open', type: 'boolean', default: 'false' },
  { name: 'title', type: 'string', notes: { zh: '48px 标题栏，headline 字号', en: '48px title bar, headline size' } },
  { name: 'width', type: 'number', default: '480' },
  { name: 'persistent', type: 'boolean', default: 'false', notes: { zh: '忽略 Escape 与遮罩点击', en: 'Ignores Escape and scrim clicks' } },
  { name: 'closeLabel', type: 'string', default: "'Close'" },
];
const events: PropRow[] = [{ name: 'close', type: '()', notes: { zh: '由关闭按钮、Escape 或遮罩触发', en: 'From the close button, Escape or the scrim' } }];
const slots: PropRow[] = [
  { name: 'default', type: '—', notes: { zh: '内容区', en: 'Body' } },
  { name: 'title', type: '—', notes: { zh: '覆盖 title 属性', en: 'Overrides the title prop' } },
  { name: 'footer', type: '—', notes: { zh: '右对齐按钮区，主按钮放最右', en: 'Right-aligned buttons, primary rightmost' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveDialog.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '按钮右对齐，主操作在最右。', en: 'Right-align buttons, primary action rightmost.' },
          { zh: '涉及不可撤销操作时用 persistent。', en: 'Use persistent for irreversible actions.' },
        ]"
        :dont="[
          { zh: '不要在对话框里再开对话框。', en: 'No dialogs stacked on dialogs.' },
          { zh: '不要为表单以外的内容滥用模态。', en: 'Don’t use a modal where an inline panel would do.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
