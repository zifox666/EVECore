<script setup lang="ts">
import EveGlowLine from '@/components/eve/EveGlowLine.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '用途', en: 'Uses' }" :row="false">
    <div class="grid">
      <div class="eve-glow-host item" style="background: color-mix(in srgb, var(--eve-bg-selected) 40%, transparent)">
        <EveGlowLine absolute active />
        <span class="eve-text-highlighted">Navigation · selected</span>
      </div>
      <div class="eve-glow-host item" style="background: var(--eve-danger-bg)">
        <EveGlowLine absolute color="var(--eve-danger)" />
        <span style="color: var(--eve-danger)">Alert · Rifter on grid</span>
      </div>
      <div class="eve-glow-host" style="display: flex; gap: 8px; padding-right: 8px">
        <EveGlowLine color="var(--eve-error-border)" active />
        <span style="padding: 6px 0">Hostile · Jita IV</span>
      </div>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }">
    <div class="eve-glow-host item w"><EveGlowLine absolute /><span>Normal</span></div>
    <div class="eve-glow-host item w"><EveGlowLine absolute active /><span class="eve-text-highlighted">Active</span></div>
    <div class="eve-glow-host item w"><EveGlowLine absolute color="var(--eve-success)" active /><span>Custom colour</span></div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '内联与多行', en: 'Inline and tall' }">
    <div class="eve-glow-host" style="display: flex; gap: 8px; max-width: 260px">
      <EveGlowLine active />
      <p style="margin: 0; padding: 4px 0">Station services: Market, Industry, Repair Shop and Clone Bay are available in Jita IV - Moon 4.</p>
    </div>
  </DemoGroup>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.item { position: relative; padding: 6px 12px; }
.w { width: 180px; }
</style>
