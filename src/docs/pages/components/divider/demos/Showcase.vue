<script setup lang="ts">
import EveDivider from '@/components/eve/EveDivider.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '水平', en: 'Horizontal' }" :row="false">
    <div class="col"><EveDivider /></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '带标签', en: 'With label' }" :hint="{ zh: '居中，detail 字号', en: 'Centred, detail type' }" :row="false">
    <div class="col">
      <EveDivider label="Tritanium" />
      <EveDivider label="Minerals · Ice · Gas · Moon materials · Planetary commodities" style="max-width: 320px" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '竖直', en: 'Vertical' }" :hint="{ zh: '撑满父级高度', en: 'Stretches to parent height' }">
    <div class="inline">
      <span>Jita</span><EveDivider orientation="vertical" /><span>Amarr</span><EveDivider orientation="vertical" /><span>Dodixie</span>
    </div>
  </DemoGroup>
</template>

<style scoped>
.col { display: flex; flex-direction: column; gap: 16px; max-width: 480px; }
.inline { display: flex; align-items: center; gap: 12px; height: 24px; }
</style>
