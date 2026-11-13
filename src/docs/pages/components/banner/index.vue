<script setup lang="ts">
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';

const usage = `<script setup lang="ts">
import EveBanner from '@/components/eve/EveBanner.vue';
<\/script>

<template>
  <EveBanner tone="danger" closable @close="dismiss">Rifter lost in Amarr</EveBanner>
</template>`;

const props: PropRow[] = [
  { name: 'tone', type: "'warning' | 'danger' | 'info'", default: "'warning'" },
  { name: 'closable', type: 'boolean', default: 'false', notes: { zh: '显示关闭按钮并触发 close', en: 'Shows a close button and emits close' } },
  { name: 'icon', type: 'string', notes: { zh: '覆盖默认图标', en: 'Override the default icon' } },
  { name: 'closeLabel', type: 'string', default: "'Close'" },
];
const events: PropRow[] = [{ name: 'close', type: '()' }];
const slots: PropRow[] = [
  { name: 'default', type: '—', notes: { zh: '横幅文字', en: 'Banner text' } },
  { name: 'actions', type: '—', notes: { zh: '右侧操作按钮', en: 'Action buttons on the right' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveBanner.vue']" />
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
          { zh: '一句话，说明发生了什么。', en: 'One short sentence stating what happened.' },
          { zh: '危险版本只用于已发生的损失或阻断。', en: 'Danger only for loss or blocking states that already happened.' },
        ]"
        :dont="[
          { zh: '不要用彩色底块表达普通状态——横幅是唯一例外，且底色极暗。', en: 'No coloured fills for ordinary status — the banner is the one exception, and its fill is very dark.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
