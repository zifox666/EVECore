<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveAvatar from '@/components/eve/EveAvatar.vue';
<\/script>

<template>
  <EveAvatar kind="corporation" :id="109299958" name="CCP Games" :size="64" />
</template>`;

const props: PropRow[] = [
  { name: 'kind', type: "'character' | 'corporation' | 'alliance'", default: "'character'", notes: { zh: '角色用 portrait，其余用 logo', en: 'portrait for characters, logo otherwise' } },
  { name: 'id', type: 'number', notes: { zh: 'EVE 实体 ID；缺省或加载失败显示首字母', en: 'EVE entity id; initials shown when missing or on error' } },
  { name: 'name', type: 'string', notes: { zh: '用于 alt 与首字母', en: 'Used for alt text and initials' } },
  { name: 'size', type: '24 | 32 | 64', default: '32' },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveAvatar.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '头像是系统中唯一允许 50% 圆角的元素。', en: 'The avatar is the only element allowed a 50% radius.' },
          { zh: '使用 images.evetech.net 时遵守 CCP 第三方开发者许可。', en: 'Follow CCP’s third-party developer license when using images.evetech.net.' },
        ]"
        :dont="[
          { zh: '不要给其他控件套圆形外观。', en: 'Don’t make other controls round to match.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
