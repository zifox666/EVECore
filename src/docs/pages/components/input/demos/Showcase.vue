<script setup lang="ts">
import { ref } from 'vue';
import EveInput from '@/components/eve/EveInput.vue';
import { DemoGroup } from '@/docs/kit';

const pilot = ref('');
const corp = ref('Hedion University');
const states = ['normal', 'hover', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '图标与占位符', en: 'Icon and placeholder' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveInput v-model="pilot" icon="i-eve-character-sheet" placeholder="Pilot name" />
      <EveInput v-model="corp" icon="i-eve-corporation" placeholder="Corporation" />
      <EveInput placeholder="System" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '类型', en: 'Types' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveInput type="number" model-value="1500000" icon="i-eve-wallet" placeholder="ISK" />
      <EveInput type="password" model-value="tritanium" icon="i-eve-restriction" placeholder="Passphrase" />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveInput
        v-for="s in states"
        :key="s"
        model-value="Jita IV - Moon 4"
        icon="i-eve-station"
        :data-eve-state="s === 'normal' ? undefined : s"
      />
      <EveInput model-value="Jita IV - Moon 4" icon="i-eve-station" disabled />
      <EveInput model-value="Jita IV - Moon 4" icon="i-eve-station" invalid />
      <EveInput model-value="" placeholder="Pilot name" disabled />
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '边界情况', en: 'Edge cases' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 320px">
      <EveInput model-value="Caldari Navy Hookbill Blueprint Copy — Researched ME 10 TE 20 — Jita 4-4" icon="i-eve-items" />
      <EveInput model-value="Perimeter" style="max-width: 120px" />
    </div>
  </DemoGroup>
</template>
