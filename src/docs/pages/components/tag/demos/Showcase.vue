<script setup lang="ts">
import EveTag from '@/components/eve/EveTag.vue';
import EveSystemChip from '@/components/eve/EveSystemChip.vue';
import { DemoGroup } from '@/docs/kit';

const tones = ['neutral', 'primary', 'success', 'warning', 'danger', 'away', 'omega'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '色调', en: 'Tones' }" :hint="{ zh: '颜色是语义', en: 'Colour is semantic' }">
    <EveTag v-for="t in tones" :key="t" :tone="t">{{ t }}</EveTag>
  </DemoGroup>

  <DemoGroup :label="{ zh: '带状态点', en: 'With dot' }" :hint="{ zh: '6px 方点', en: '6px square dot' }">
    <EveTag tone="success" dot>Online</EveTag>
    <EveTag tone="away" dot>Away</EveTag>
    <EveTag tone="danger" dot>Offline</EveTag>
    <EveTag tone="omega" dot>Omega</EveTag>
  </DemoGroup>

  <DemoGroup :label="{ zh: '搭配星系', en: 'With system chip' }" :hint="{ zh: '安等分区', en: 'Security class' }" :row="false">
    <div style="display: flex; flex-direction: column; gap: 4px">
      <div style="display: flex; align-items: center; gap: 8px"><EveSystemChip name="Jita" :security="0.95" /><EveTag tone="success">Highsec</EveTag></div>
      <div style="display: flex; align-items: center; gap: 8px"><EveSystemChip name="Tama" :security="0.3" /><EveTag tone="warning">Lowsec</EveTag></div>
      <div style="display: flex; align-items: center; gap: 8px"><EveSystemChip name="Delve J-1" :security="-0.4" /><EveTag tone="danger">Nullsec</EveTag></div>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '长标签', en: 'Long label' }">
    <EveTag tone="warning">Concord Response Delayed</EveTag>
    <EveTag>已上线</EveTag>
  </DemoGroup>
</template>
