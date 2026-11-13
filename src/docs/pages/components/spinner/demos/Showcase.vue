<script setup lang="ts">
import EveSpinner from '@/components/eve/EveSpinner.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '尺寸', en: 'Sizes' }">
    <EveSpinner :size="16" />
    <EveSpinner :size="24" />
    <EveSpinner :size="32" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '行内', en: 'Inline' }">
    <EveSpinner :size="16" label="Loading market orders" />
    <span class="eve-text-secondary">Loading market orders in Jita…</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '居中占位', en: 'Centred placeholder' }" :row="false">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 32px; border: 1px solid var(--eve-divider)">
      <EveSpinner :size="32" label="Docking" />
      <span class="eve-detail eve-text-secondary">Requesting docking clearance at Amarr VIII</span>
    </div>
  </DemoGroup>
</template>
