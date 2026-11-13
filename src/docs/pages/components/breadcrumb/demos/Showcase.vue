<script setup lang="ts">
import EveBreadcrumb from '@/components/eve/EveBreadcrumb.vue';
import { DemoGroup } from '@/docs/kit';

const here = [{ label: 'The Forge', href: '#' }, { label: 'Perimeter', href: '#' }, { label: 'Jita' }];
const states = ['hover', 'press', 'focus'] as const;
</script>

<template>
  <DemoGroup :label="{ zh: '基础', en: 'Basic' }" :hint="{ zh: '末项为当前页', en: 'Last item is current' }">
    <EveBreadcrumb :items="here" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '链接状态（静态）', en: 'Link states (static)' }" :hint="{ zh: 'normal · hover · press · focus', en: 'normal · hover · press · focus' }">
    <EveBreadcrumb :items="[{ label: 'normal', href: '#' }, { label: 'end' }]" />
    <EveBreadcrumb v-for="s in states" :key="s" :items="[{ label: s, href: '#', state: s }, { label: 'end' }]" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '无链接与单项', en: 'Plain text and single item' }">
    <EveBreadcrumb :items="[{ label: 'Station' }, { label: 'Hangar' }]" />
    <EveBreadcrumb :items="[{ label: 'Wallet' }]" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '很长的路径', en: 'Long path' }" :hint="{ zh: '放不下就换行', en: 'Wraps when tight' }" :row="false">
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
