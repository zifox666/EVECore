<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveBreadcrumb from '@/components/eve/EveBreadcrumb.vue';
<\/script>

<template>
  <EveBreadcrumb :items="[{ label: 'The Forge', href: '/forge' }, { label: 'Jita' }]" />
</template>`;

const props: PropRow[] = [{ name: 'items', type: '{ label, href?, state? }[]', notes: { zh: '末项为当前页，高亮且不可点击', en: 'The last item is the current page: highlighted, not a link' } }];
const events: PropRow[] = [{ name: 'navigate', type: '(item, event: MouseEvent)', notes: { zh: '点击链接时触发，可拦截给路由', en: 'Fired on link click; intercept for your router' } }];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveBreadcrumb.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '放在 48px 顶栏中，使用 detail 字号。', en: 'Place in the 48px top bar, in detail type.' },
          { zh: '层级保持在 4 级以内。', en: 'Keep it to four levels or fewer.' },
        ]"
        :dont="[
          { zh: '不要把末项做成链接。', en: 'Do not make the last item a link.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
