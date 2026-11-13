<script setup lang="ts">
import EveSystemChip from '@/components/eve/EveSystemChip.vue';
import { DemoGroup } from '@/docs/kit';

const bands = [
  { name: 'Amarr', security: 1.0 },
  { name: 'Jita', security: 0.95 },
  { name: 'Perimeter', security: 0.85 },
  { name: 'Rens', security: 0.75 },
  { name: 'Hek', security: 0.65 },
  { name: 'Dodixie', security: 0.5 },
  { name: 'Ahbazon', security: 0.45 },
  { name: 'Tama', security: 0.3 },
  { name: 'Rancer', security: 0.2 },
  { name: 'Aunsou', security: 0.1 },
  { name: 'Delve J-1', security: -0.4 },
];
const route = [
  { name: 'Jita', security: 0.9459 },
  { name: 'Perimeter', security: 0.9525 },
  { name: 'Urlen', security: 0.8 },
  { name: 'Sivala', security: 0.4501 },
  { name: 'Tama', security: 0.2987 },
];
</script>

<template>
  <DemoGroup :label="{ zh: '全部 11 档安等', en: 'All 11 security bands' }" :hint="{ zh: '1.0 到 0.0，负值显示为 0.0 色', en: '1.0 down to 0.0; negatives use the 0.0 colour' }">
    <EveSystemChip v-for="b in bands" :key="b.name" :name="b.name" :security="b.security" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '带星域', en: 'With region' }" :hint="{ zh: '星域段为安等色 25%', en: 'Region segment is the colour @25%' }">
    <EveSystemChip name="Jita" :security="0.9459" region="The Forge" />
    <EveSystemChip name="Amarr" :security="1.0" region="Domain" />
    <EveSystemChip name="Tama" :security="0.3" region="The Citadel" />
    <EveSystemChip name="Delve J-1" :security="-0.4" region="Delve" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '舍入', en: 'Rounding' }" :hint="{ zh: '传真实值，按 EVE 规则取整', en: 'Pass the true value; rounded the EVE way' }">
    <EveSystemChip name="Hek" :security="0.4501" />
    <EveSystemChip name="Edge" :security="0.0412" />
    <EveSystemChip name="Pochven" :security="-1" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '路线', en: 'Route' }" :hint="{ zh: '一行排开', en: 'Laid out in a row' }">
    <template v-for="(s, i) in route" :key="s.name">
      <span v-if="i" class="eve-text-secondary" aria-hidden="true">›</span>
      <EveSystemChip :name="s.name" :security="s.security" />
    </template>
  </DemoGroup>

  <DemoGroup :label="{ zh: '长名称', en: 'Long names' }" :hint="{ zh: '在窄容器内截断', en: 'Truncates in a narrow container' }" :row="false">
    <div style="max-width: 220px">
      <EveSystemChip name="Mmmmmmmmmmmmmmmmmmmmmmmmmm Gate Complex" :security="0.6" region="Great Wildlands Territory" />
    </div>
  </DemoGroup>
</template>
