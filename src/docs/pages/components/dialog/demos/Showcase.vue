<script setup lang="ts">
import { ref } from 'vue';
import EveButton from '@/components/eve/EveButton.vue';
import EveDialog from '@/components/eve/EveDialog.vue';
import { DemoGroup } from '@/docs/kit';

const confirm = ref(false);
const persistent = ref(false);
const wide = ref(false);
const result = ref('—');
</script>

<template>
  <DemoGroup :label="{ zh: '确认', en: 'Confirm' }">
    <EveButton icon="i-eve-ship-hangar" @click="confirm = true">Scrap Rifter</EveButton>
    <span class="eve-detail eve-text-secondary eve-num">result: {{ result }}</span>
    <EveDialog v-model:open="confirm" title="Scrap Rifter" :width="420">
      Rifter will be reprocessed into 1,250 Tritanium.
      <template #footer>
        <EveButton @click="((result = 'cancelled'), (confirm = false))">Cancel</EveButton>
        <EveButton variant="primary" @click="((result = 'scrapped'), (confirm = false))">Scrap</EveButton>
      </template>
    </EveDialog>
  </DemoGroup>

  <DemoGroup :label="{ zh: '持久', en: 'Persistent' }">
    <EveButton variant="negative" icon="i-eve-terminate" @click="persistent = true">Self Destruct</EveButton>
    <EveDialog v-model:open="persistent" title="Self Destruct" persistent :width="380">
      Your ship will be destroyed in 15 seconds. This cannot be undone.
      <template #footer>
        <EveButton @click="persistent = false">Abort</EveButton>
        <EveButton variant="negative" @click="persistent = false">Confirm</EveButton>
      </template>
    </EveDialog>
  </DemoGroup>

  <DemoGroup :label="{ zh: '宽窗口与长内容', en: 'Wide with scrolling body' }">
    <EveButton icon="i-eve-assets" @click="wide = true">View Assets</EveButton>
    <EveDialog v-model:open="wide" title="Assets in Jita IV - Moon 4 - Caldari Navy Assembly Plant" :width="640">
      <p v-for="n in 30" :key="n" style="margin: 0 0 8px">{{ (n * 1250).toLocaleString('en-US') }} units of Tritanium in container {{ n }}</p>
      <template #footer><EveButton variant="primary" @click="wide = false">Close</EveButton></template>
    </EveDialog>
  </DemoGroup>
</template>
