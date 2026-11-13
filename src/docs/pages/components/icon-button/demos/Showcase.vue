<script setup lang="ts">
import { ref } from 'vue';
import EveIconButton from '@/components/eve/EveIconButton.vue';
import { DemoGroup } from '@/docs/kit';

const overview = ref(true);
const pinned = ref(false);
const states = ['normal', 'hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '图标', en: 'Icons' }">
    <EveIconButton icon="i-eve-settings" label="Settings" />
    <EveIconButton icon="i-eve-map" label="Map" />
    <EveIconButton icon="i-eve-wallet" label="Wallet" />
    <EveIconButton icon="i-eve-info" label="Show Info" />
    <EveIconButton icon="i-tabler-x" label="Close" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '切换', en: 'Toggle' }">
    <EveIconButton icon="i-eve-fleet" label="Fleet" :active="overview" @click="overview = !overview" />
    <EveIconButton icon="i-tabler-pin" label="Pin" :active="pinned" @click="pinned = !pinned" />
    <span class="eve-detail eve-text-secondary">{{ overview ? 'Fleet on' : 'Fleet off' }} · {{ pinned ? 'pinned' : 'unpinned' }}</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }">
    <EveIconButton v-for="s in states" :key="s" icon="i-eve-settings" :label="s" :data-eve-state="s === 'normal' ? undefined : s" />
    <EveIconButton icon="i-eve-settings" label="disabled" disabled />
  </DemoGroup>

  <DemoGroup :label="{ zh: '激活状态', en: 'Active states' }">
    <EveIconButton v-for="s in states" :key="s" icon="i-eve-fleet" label="active" active :data-eve-state="s === 'normal' ? undefined : s" />
    <EveIconButton icon="i-eve-fleet" label="disabled" active disabled />
  </DemoGroup>
</template>
