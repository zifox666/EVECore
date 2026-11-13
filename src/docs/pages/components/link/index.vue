<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveLink from '@/components/eve/EveLink.vue';
<\/script>

<template>
  <EveLink @click="showInfo(id)">Jita IV - Moon 4</EveLink>
  <EveLink kind="external" href="https://zkillboard.com">zKillboard</EveLink>
</template>`;

const props: PropRow[] = [
  { name: 'kind', type: "'game' | 'external' | 'help'", default: "'game'", notes: { zh: 'game 琥珀粗体；external 黄色并带外链图标；help 浅蓝', en: 'game amber bold; external yellow with icon; help light blue' } },
  { name: 'href', type: 'string', notes: { zh: '有 href 渲染 <a>，否则渲染 <button>', en: '<a> when set, otherwise <button>' } },
  { name: 'disabled', type: 'boolean', default: 'false' },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveLink.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '游戏内实体（角色、空间站、星系）用 game 链接。', en: 'Use game links for in-universe entities: characters, stations, systems.' },
          { zh: '站外地址用 external，自动 noopener。', en: 'Use external for off-site URLs; noopener is applied.' },
        ]"
        :dont="[
          { zh: '不要用琥珀色装饰非链接文字。', en: 'Don’t use amber to decorate non-links.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
