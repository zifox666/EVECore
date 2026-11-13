<script setup lang="ts">
import EveAvatar from '@/components/eve/EveAvatar.vue';
import { DemoGroup } from '@/docs/kit';
const sizes = [24, 32, 64] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '尺寸', en: 'Sizes' }">
    <EveAvatar v-for="s in sizes" :key="s" kind="character" :id="2112625428" name="CCP Zoetrope" :size="s" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '类型', en: 'Kinds' }">
    <EveAvatar kind="character" :id="2112625428" name="CCP Zoetrope" :size="64" />
    <EveAvatar kind="corporation" :id="109299958" name="CCP Games" :size="64" />
    <EveAvatar kind="alliance" :id="434243723" name="CCP Alliance" :size="64" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '首字母回退', en: 'Initials fallback' }">
    <EveAvatar v-for="s in sizes" :key="s" name="Kirk Calloway" :size="s" />
    <EveAvatar name="Tritanium" :size="32" />
    <EveAvatar :size="32" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '图片加载失败', en: 'Image failed' }">
    <EveAvatar v-for="s in sizes" :key="s" kind="character" :id="1" name="Broken Image" :size="s" />
    <EveAvatar kind="corporation" :id="1" name="Lost Logo Corp" :size="64" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '与文字并排', en: 'Beside text' }" :row="false">
    <div style="display: flex; align-items: center; gap: 8px">
      <EveAvatar kind="character" :id="2112625428" name="CCP Zoetrope" />
      <span>CCP Zoetrope</span>
      <span class="eve-text-secondary eve-detail">CCP Games</span>
    </div>
  </DemoGroup>
</template>
