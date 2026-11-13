<script setup lang="ts">
import EveFrame from '@/components/eve/EveFrame.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '切角', en: 'Cuts' }" :hint="{ zh: 'br · bl · both · none', en: 'br · bl · both · none' }">
    <EveFrame v-for="cut in ['br', 'bl', 'both', 'none'] as const" :key="cut" :cut="cut" class="frame-demo">cut="{{ cut }}"</EveFrame>
  </DemoGroup>

  <DemoGroup :label="{ zh: '尺寸与颜色', en: 'Size and colours' }" :hint="{ zh: '用 CSS 变量着色', en: 'Colour via CSS variables' }">
    <EveFrame cut="br" :size="16" class="frame-demo frame-demo--accent">size=16</EveFrame>
    <EveFrame cut="both" :size="5" class="frame-demo frame-demo--accent">size=5</EveFrame>
    <EveFrame cut="br" class="frame-demo frame-demo--danger">danger</EveFrame>
  </DemoGroup>

  <DemoGroup :label="{ zh: '自适应内容', en: 'Fits content' }" :hint="{ zh: '长文字、渲染为 button', en: 'Long text, rendered as button' }">
    <EveFrame as="button" class="frame-demo frame-demo--accent" style="border: 0">Undock from Jita IV - Moon 4</EveFrame>
    <EveFrame cut="both" class="frame-demo" style="max-width: 220px">Tritanium, Pyerite and Mexallon in one long wrapping line of text.</EveFrame>
  </DemoGroup>
</template>

<style scoped>
.frame-demo { padding: 16px 20px; min-width: 120px; color: var(--eve-text-secondary); font: var(--eve-text-detail); }
.frame-demo--accent { --eve-frame-border: var(--eve-border-primary); --eve-frame-bg: var(--eve-bg-primary); color: var(--eve-text-highlighted); }
.frame-demo--danger { --eve-frame-border: var(--eve-error-border); --eve-frame-bg: var(--eve-error-bg-dark); color: var(--eve-text-highlighted); }
</style>
