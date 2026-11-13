<script setup lang="ts">
import { ref } from 'vue';
import EveSlider from '@/components/eve/EveSlider.vue';
import { DemoGroup } from '@/docs/kit';

const speed = ref(40);
const sec = ref(0.5);
const volume = ref(70);
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }" :hint="{ zh: '拖动或用方向键', en: 'Drag or use arrow keys' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <div style="display: flex; align-items: center; gap: 12px">
        <EveSlider v-model="speed" :step="5" label="Speed" />
        <span class="eve-num" style="min-width: 48px; text-align: right">{{ speed }}%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px">
        <EveSlider v-model="sec" :min="-1" :max="1" :step="0.1" label="Security" />
        <span class="eve-num" style="min-width: 48px; text-align: right">{{ sec.toFixed(1) }}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px">
        <EveSlider v-model="volume" label="Volume" />
        <span class="eve-num" style="min-width: 48px; text-align: right">{{ volume }}</span>
      </div>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态（静态）', en: 'States (static)' }" :hint="{ zh: 'press = 拖动中', en: 'press = dragging' }" :row="false">
    <div style="display: grid; gap: 4px; max-width: 320px">
      <EveSlider v-for="s in states" :key="s" :model-value="60" :data-eve-state="s === 'normal' ? undefined : s" :label="s" />
      <EveSlider :model-value="60" disabled label="disabled" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界情况', en: 'Edge cases' }" :hint="{ zh: '最小 · 最大 · 窄宽度', en: 'Min · max · narrow' }" :row="false">
    <div style="display: grid; gap: 4px; max-width: 320px">
      <EveSlider :model-value="0" label="Min" />
      <EveSlider :model-value="100" label="Max" />
      <EveSlider :model-value="50" style="width: 80px" label="Narrow" />
    </div>
  </DemoGroup>
</template>
