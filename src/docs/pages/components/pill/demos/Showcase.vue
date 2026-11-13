<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EvePill from '@/components/eve/EvePill.vue';
import { DemoGroup } from '@/docs/kit';

const bands = ref({ Highsec: true, Lowsec: false, Nullsec: false });
const regions = ref(['The Forge', 'Domain', 'Sinq Laison', 'Heimatar']);
const states = ['normal', 'hover', 'press', 'focus'] as const;

// Static matrix: the root drives the label part; the remove part is forced separately.
const matrix = ref<HTMLElement | null>(null);
onMounted(() => {
  matrix.value?.querySelectorAll<HTMLElement>('[data-force-remove]').forEach((el) => {
    el.querySelector('.eve-pill__remove')?.setAttribute('data-eve-state', el.dataset.forceRemove!);
  });
});
</script>

<template>
  <DemoGroup :label="{ zh: '选中', en: 'Selected' }" :hint="{ zh: '点击标签切换', en: 'Click the label to toggle' }">
    <EvePill v-for="(on, name) in bands" :key="name" v-model:selected="bands[name]">{{ name }}</EvePill>
  </DemoGroup>

  <DemoGroup :label="{ zh: '可移除', en: 'Removable' }" :hint="{ zh: '× 触发 remove', en: '× emits remove' }">
    <EvePill v-for="r in regions" :key="r" removable @remove="regions = regions.filter((x) => x !== r)">{{ r }}</EvePill>
    <EvePill v-if="!regions.length">None</EvePill>
    <button v-if="regions.length < 4" class="eve-detail eve-text-secondary" style="background: none; border: 0; cursor: pointer; color: inherit" @click="regions = ['The Forge', 'Domain', 'Sinq Laison', 'Heimatar']">Reset</button>
  </DemoGroup>

  <div ref="matrix">
    <DemoGroup :label="{ zh: '状态（静态）', en: 'States (static)' }" :hint="{ zh: '普通 · 悬停 · 按下 · 聚焦 · 禁用', en: 'normal · hover · press · focus · disabled' }">
      <EvePill v-for="s in states" :key="s" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EvePill>
      <EvePill selected>selected</EvePill>
      <EvePill disabled>disabled</EvePill>
    </DemoGroup>

    <DemoGroup :label="{ zh: '可移除状态（静态）', en: 'Removable states (static)' }" :hint="{ zh: '标签 · × 部分各自独立', en: 'Label and × light up separately' }">
      <EvePill removable>normal</EvePill>
      <EvePill removable data-eve-state="hover">label hover</EvePill>
      <EvePill removable data-force-remove="hover">× hover</EvePill>
      <EvePill removable data-force-remove="press">× press</EvePill>
      <EvePill removable data-force-remove="focus">× focus</EvePill>
      <EvePill removable selected>selected</EvePill>
      <EvePill removable disabled>disabled</EvePill>
    </DemoGroup>
  </div>

  <DemoGroup :label="{ zh: '长标签', en: 'Long labels' }">
    <EvePill removable>Heimatar, Metropolis, Molden Heath and Derelik</EvePill>
  </DemoGroup>
</template>
