<script setup lang="ts">
import { ref } from 'vue';
import EvePanel from '@/components/eve/EvePanel.vue';
import { DemoGroup } from '@/docs/kit';

const forced = ref(true);
</script>

<template>
  <DemoGroup :label="{ zh: '尺寸', en: 'Sizes' }" :hint="{ zh: 'full 48px · small 32px', en: 'full 48px · small 32px' }" :row="false">
    <div class="grid">
      <EvePanel title="Wallet" icon="wallet">
        <template #actions><button aria-label="Close"><span class="i-tabler-x" /></button></template>
        Balance 1,284,550,000 ISK
      </EvePanel>
      <EvePanel title="Local" size="small" icon="people-and-places">
        <template #actions><button aria-label="Close"><span class="i-tabler-x" /></button></template>
        12 pilots in Jita
      </EvePanel>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '自动激活', en: 'Automatic active' }" :hint="{ zh: '点击内部或外部', en: 'Click inside or outside' }" :row="false">
    <div class="grid">
      <EvePanel title="Assets" icon="assets" size="small">Tritanium x 1,200,000</EvePanel>
      <EvePanel title="Market" icon="market" size="small">Jita 4-4 Caldari Navy Assembly Plant</EvePanel>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态（静态）', en: 'States (static)' }" :hint="{ zh: 'active=false · active=true', en: 'active=false · active=true' }" :row="false">
    <div class="grid">
      <EvePanel title="Inactive" icon="info" :active="false">Normal border, dim dots</EvePanel>
      <EvePanel title="Active" icon="info" :active="forced">Top line, glow, bright dots</EvePanel>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '透明', en: 'Transparent' }" :hint="{ zh: '用于星图浮层', en: 'Floating over the map' }" :row="false">
    <div class="map">
      <EvePanel title="Perimeter" icon="map" size="small" transparent :active="false" style="max-width: 260px">Jita · 0.9 · 14 jumps</EvePanel>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '无内边距与长标题', en: 'Flush and long title' }" :row="false">
    <div class="grid">
      <EvePanel title="Contracts" size="small" flush>
        <div class="row">Courier · Jita to Amarr</div>
        <div class="row">Item Exchange · 14 items</div>
      </EvePanel>
      <EvePanel title="Industry job: Rifter Blueprint manufacturing at Perimeter" size="small" icon="industry">
        <template #actions><button aria-label="Close"><span class="i-tabler-x" /></button></template>
        Title truncates with an ellipsis.
      </EvePanel>
    </div>
  </DemoGroup>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; }
.map { padding: 16px; background: radial-gradient(circle at 30% 40%, #1d3a46, #070707 70%); }
.row { padding: 6px 12px; border-bottom: 1px solid var(--eve-divider); }
</style>
