<script setup lang="ts">
import EveBreadcrumb from '@/components/eve/EveBreadcrumb.vue';
import { DemoGroup } from '@/docs/kit';

const here = [{ label: 'The Forge', href: '#' }, { label: 'Perimeter', href: '#' }, { label: 'Jita' }];
const states = ['hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }">
    <EveBreadcrumb :items="here" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '链接状态', en: 'Link states' }">
    <EveBreadcrumb :items="[{ label: 'normal', href: '#' }, { label: 'end' }]" />
    <EveBreadcrumb v-for="s in states" :key="s" :items="[{ label: s, href: '#', state: s }, { label: 'end' }]" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '无链接与单项', en: 'Plain text and single item' }">
    <EveBreadcrumb :items="[{ label: 'Station' }, { label: 'Hangar' }]" />
    <EveBreadcrumb :items="[{ label: 'Wallet' }]" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '很长的路径', en: 'Long path' }" :row="false">
    <div style="max-width: 300px">
      <EveBreadcrumb
        :items="[
          { label: 'New Eden', href: '#' },
          { label: 'The Forge', href: '#' },
          { label: 'Perimeter', href: '#' },
          { label: 'Jita IV - Moon 4 - Caldari Navy Assembly Plant', href: '#' },
          { label: 'Corporation Hangar Division 3' },
        ]"
      />
    </div>
  </DemoGroup>
</template>
