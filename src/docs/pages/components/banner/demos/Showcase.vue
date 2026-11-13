<script setup lang="ts">
import { ref } from 'vue';
import EveBanner from '@/components/eve/EveBanner.vue';
import EveButton from '@/components/eve/EveButton.vue';
import { DemoGroup } from '@/docs/kit';

const shown = ref(true);
</script>

<template>
  <DemoGroup :label="{ zh: '类型', en: 'Tones' }" :row="false">
    <div style="display: grid; gap: 8px">
      <EveBanner tone="warning">Your clone is out of date. Visit a station to update it.</EveBanner>
      <EveBanner tone="danger">Rifter lost in Amarr. Insurance payout pending.</EveBanner>
      <EveBanner tone="info">Downtime starts at 11:00 EVE time.</EveBanner>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '可关闭与操作', en: 'Closable and actions' }" :hint="{ zh: '点击 × 关闭', en: 'Click × to dismiss' }" :row="false">
    <div style="display: grid; gap: 8px">
      <EveBanner v-if="shown" tone="warning" closable @close="shown = false">Cargo hold almost full.</EveBanner>
      <div v-else><EveButton @click="shown = true">Restore banner</EveButton></div>
      <EveBanner tone="danger" closable>
        Wallet balance is below the contract collateral.
        <template #actions>
          <EveButton variant="negative" icon="i-eve-wallet">Open Wallet</EveButton>
        </template>
      </EveBanner>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '自定义图标与长文本', en: 'Custom icon and long text' }" :row="false">
    <div style="display: grid; gap: 8px; max-width: 520px">
      <EveBanner tone="info" icon="i-eve-station" closable>
        Docking at Jita IV - Moon 4 - Caldari Navy Assembly Plant has been granted; your ship will be repaired and your cargo moved to the item hangar on arrival.
        <template #actions><EveButton>Details</EveButton></template>
      </EveBanner>
    </div>
  </DemoGroup>
</template>
