<script setup lang="ts">
import EveSectionTitle from '@/components/eve/EveSectionTitle.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }" :row="false">
    <div class="col">
      <EveSectionTitle>Sell orders</EveSectionTitle>
      <EveSectionTitle>Buy orders<template #right>42 orders</template></EveSectionTitle>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '右侧内容', en: 'Trailing content' }" :row="false">
    <div class="col">
      <EveSectionTitle>
        Skill queue
        <template #right><span class="i-eve-training-queue" style="width: 16px; height: 16px" />3 skills · 4d 12h</template>
      </EveSectionTitle>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '语义标签与长标题', en: 'Heading tag and long title' }" :row="false">
    <div class="col">
      <EveSectionTitle as="h3">Heading element</EveSectionTitle>
      <EveSectionTitle style="max-width: 260px">
        Tritanium, Pyerite and Mexallon sell orders in Jita
        <template #right>99</template>
      </EveSectionTitle>
    </div>
  </DemoGroup>
</template>

<style scoped>
.col { display: flex; flex-direction: column; gap: 8px; max-width: 480px; }
</style>
