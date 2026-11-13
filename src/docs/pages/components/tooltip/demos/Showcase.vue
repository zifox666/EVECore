<script setup lang="ts">
import EveButton from '@/components/eve/EveButton.vue';
import EveIconButton from '@/components/eve/EveIconButton.vue';
import EveTooltip from '@/components/eve/EveTooltip.vue';
import { DemoGroup } from '@/docs/kit';
</script>

<template>
  <DemoGroup :label="{ zh: '位置', en: 'Placements' }">
    <EveTooltip content="Jita IV - Moon 4 - Caldari Navy Assembly Plant" placement="top"><EveButton>top</EveButton></EveTooltip>
    <EveTooltip content="The Forge" placement="bottom"><EveButton>bottom</EveButton></EveTooltip>
    <EveTooltip content="Perimeter" placement="left"><EveButton>left</EveButton></EveTooltip>
    <EveTooltip content="Amarr" placement="right"><EveButton>right</EveButton></EveTooltip>
  </DemoGroup>

  <DemoGroup :label="{ zh: '富内容', en: 'Rich content' }">
    <EveTooltip placement="bottom">
      <EveButton variant="primary" icon="i-eve-ship-hangar">Rifter</EveButton>
      <template #content>
        <div class="eve-headline">Rifter</div>
        <div class="eve-detail eve-text-secondary">Minmatar Frigate</div>
        <div class="eve-num" style="margin-top: 8px">Value: 412,500 ISK</div>
      </template>
    </EveTooltip>
  </DemoGroup>

  <DemoGroup :label="{ zh: '图标按钮与延迟', en: 'Icon buttons and delay' }">
    <EveTooltip content="Show Info" :delay="0"><EveIconButton icon="i-eve-info" label="Show Info" /></EveTooltip>
    <EveTooltip content="Open Wallet" :delay="1000"><EveIconButton icon="i-eve-wallet" label="Open Wallet" /></EveTooltip>
    <EveTooltip content="Never shown" disabled><EveButton disabled>disabled</EveButton></EveTooltip>
  </DemoGroup>
</template>
