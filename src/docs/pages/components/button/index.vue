<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveButton from '@/components/eve/EveButton.vue';
<\/script>

<template>
  <EveButton variant="primary" icon="i-tabler-rocket" :loading="warping" @click="warp">
    Warp to 0
  </EveButton>
</template>`;

const props: PropRow[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'negative'", default: "'secondary'", notes: { zh: 'negative 仅用于不可撤销的操作', en: 'negative only for irreversible actions' } },
  { name: 'cut', type: "'br' | 'bl' | 'both' | 'none'", default: "'br'", notes: { zh: '按钮组：最左 bl、中间 none、最右 br', en: 'In a group: bl first, none between, br last' } },
  { name: 'icon', type: 'string', notes: { zh: 'Iconify 类名，16px，左侧 8px', en: 'Iconify class, 16px, 8px left padding' } },
  { name: 'loading', type: 'boolean', default: 'false', notes: { zh: '显示旋转方块，忽略点击，aria-busy', en: 'Spinner, clicks ignored, aria-busy' } },
  { name: 'disabled', type: 'boolean', default: 'false', notes: { zh: '保持 normal 面，文字 text-disabled', en: 'Keeps the normal face, text-disabled' } },
  { name: 'block', type: 'boolean', default: 'false', notes: { zh: '撑满容器宽度', en: 'Fill container width' } },
  { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'" },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveButton.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>


    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '一屏只有一个 primary；Cryo Blue 要稀缺。', en: 'One primary per screen; keep Cryo Blue scarce.' },
          { zh: '标签用动词开头的 1–3 个词：“Undock”“设置目的地”。', en: 'Label with 1–3 words starting with a verb: “Undock”, “Set destination”.' },
          { zh: '按下闪白是必需的反馈，不要用 CSS 覆盖掉。', en: 'The press flash is required feedback — never style it away.' },
        ]"
        :dont="[
          { zh: '不要加圆角或投影。', en: 'No rounded corners, no drop shadows.' },
          { zh: '不要把 negative 用于“取消”——取消用 secondary。', en: 'Don’t use negative for “Cancel” — use secondary.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
