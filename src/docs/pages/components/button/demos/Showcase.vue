<script setup lang="ts">
import { ref } from 'vue';
import EveButton from '@/components/eve/EveButton.vue';
import { DemoGroup } from '@/docs/kit';

const loading = ref(false);
const warps = ref(0);
function warp() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    warps.value += 1;
  }, 1500);
}
const states = ['normal', 'hover', 'press', 'focus'] as const;
const variants = ['primary', 'secondary', 'negative'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '类型', en: 'Variants' }" :hint="{ zh: '试试按下', en: 'Try pressing' }">
    <EveButton variant="primary" icon="i-eve-station">Undock</EveButton>
    <EveButton icon="i-eve-map">Set Destination</EveButton>
    <EveButton variant="negative" icon="i-eve-terminate">Self Destruct</EveButton>
  </DemoGroup>

  <DemoGroup :label="{ zh: '加载中', en: 'Loading' }" :hint="{ zh: '加载时忽略点击', en: 'Clicks while busy are ignored' }">
    <EveButton variant="primary" icon="i-tabler-rocket" :loading="loading" @click="warp">Warp to 0</EveButton>
    <span class="eve-detail eve-text-secondary eve-num">{{ warps }} warps</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '切角', en: 'Cuts' }" :hint="{ zh: '按钮组：左 bl · 中 none · 右 br', en: 'Groups: bl · none · br' }">
    <EveButton cut="br">br</EveButton>
    <EveButton cut="bl">bl</EveButton>
    <EveButton cut="both">both</EveButton>
    <EveButton cut="none">none</EveButton>
    <span style="width: 16px" />
    <span style="display: inline-flex; gap: 2px">
      <EveButton cut="bl">Buy</EveButton>
      <EveButton cut="none">Sell</EveButton>
      <EveButton cut="br">Contract</EveButton>
    </span>
  </DemoGroup>

  <DemoGroup v-for="v in variants" :key="v" :label="{ zh: `${v} 状态（静态）`, en: `${v} states (static)` }">
    <EveButton v-for="s in states" :key="s" :variant="v" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveButton>
    <EveButton :variant="v" loading>loading</EveButton>
    <EveButton :variant="v" disabled>disabled</EveButton>
  </DemoGroup>

  <DemoGroup :label="{ zh: '撑满与长标签', en: 'Full width and long labels' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveButton variant="primary" block>Accept Contract</EveButton>
      <EveButton block>Add Tritanium, Pyerite and Mexallon to Jita sell orders</EveButton>
    </div>
  </DemoGroup>
</template>
