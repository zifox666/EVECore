<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import EveProgress from '@/components/eve/EveProgress.vue';
import { DemoGroup } from '@/docs/kit';

const warp = ref(0.15);
let timer: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  timer = setInterval(() => (warp.value = warp.value >= 1 ? 0.05 : Math.min(1, warp.value + 0.2)), 1400);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <DemoGroup :label="{ zh: '细条', en: 'Thin (4px)' }" :hint="{ zh: '宽度 600ms 缓动', en: 'Width eases over 600ms' }" :row="false">
    <div style="display: grid; gap: 12px; max-width: 420px">
      <EveProgress :value="warp" label="Warp" />
      <EveProgress :value="0.62" label="Shield" />
      <EveProgress :value="0.28" color="var(--eve-danger)" label="Armor" />
      <EveProgress :value="0.9" color="var(--eve-success)" label="Capacitor" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '双段', en: 'Dual segment' }" :hint="{ zh: 'value + secondary', en: 'value + secondary' }" :row="false">
    <div style="display: grid; gap: 12px; max-width: 420px">
      <EveProgress :value="0.4" :secondary="0.25" label="Cargo" />
      <EveProgress :value="0.55" :secondary="0.7" :height="8" label="Ore Hold (clamped)" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '大号 + 数值', en: 'Large with value' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 420px">
      <EveProgress :value="0.62" show-value label="Shield" />
      <EveProgress :value="0.34" :secondary="0.2" label="Skill Training">12d 4h remaining</EveProgress>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '不确定', en: 'Indeterminate' }" :hint="{ zh: '时长未知', en: 'Unknown duration' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 420px">
      <EveProgress indeterminate label="Jumping" />
      <EveProgress indeterminate large label="Syncing assets" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界', en: 'Edge cases' }" :hint="{ zh: '0% · 100% · 越界被限制', en: '0% · 100% · out-of-range clamped' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 420px">
      <EveProgress :value="0" show-value label="Empty" />
      <EveProgress :value="1" show-value label="Full" />
      <EveProgress :value="1.7" show-value label="Over" />
    </div>
  </DemoGroup>
</template>
