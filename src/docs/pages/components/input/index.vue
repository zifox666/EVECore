<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import { ref } from 'vue';
import EveInput from '@/components/eve/EveInput.vue';
const pilot = ref('');
<\/script>

<template>
  <EveInput v-model="pilot" icon="i-eve-character-sheet" placeholder="Pilot name" />
</template>`;

const props: PropRow[] = [
  { name: 'modelValue', type: "string", default: "''", notes: { zh: "v-model", en: "v-model" } },
  { name: 'icon', type: "string", notes: { zh: "Iconify 类名，16px 前置图标，如 i-eve-wallet", en: "Iconify class, 16px leading icon, e.g. i-eve-wallet" } },
  { name: 'type', type: "string", default: "'text'" },
  { name: 'placeholder', type: "string" },
  { name: 'disabled', type: "boolean", default: "false" },
  { name: 'invalid', type: "boolean", default: "false", notes: { zh: "危险色边框，同时设置 aria-invalid", en: "Danger border and aria-invalid" } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveInput.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <p><L zh="class、style 与 data-eve-state 作用于根元素，其余 attribute（name、autocomplete、事件…）透传到原生 <input>。" en="class, style and data-eve-state apply to the root; other attributes (name, autocomplete, events…) fall through to the native <input>." /></p>
      <p>
        <L
          zh="文档与测试可用 data-eve-state=&quot;hover|focus&quot; 强制显示某个状态。"
          en="Docs and tests can force a state with data-eve-state=&quot;hover|focus&quot;."
        />
      </p>
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '占位符只写名词（“Pilot name”），不要写说明文字。', en: 'Placeholders are nouns (“Pilot name”), never instructions.' },
          { zh: '校验失败时用 invalid，并在旁边用文字说明原因。', en: 'Use invalid on failed validation and state the reason in text beside it.' },
        ]"
        :dont="[
          { zh: '不要给输入框加外发光圈或圆角。', en: 'No glow ring, no rounded corners.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
