<script setup lang="ts">
import { ref } from 'vue';
import EveLink from '@/components/eve/EveLink.vue';
import { DemoGroup } from '@/docs/kit';

const opened = ref('');
const states = ['normal', 'hover', 'press', 'focus'] as const;
const kinds = ['game', 'external', 'help'] as const;
const label = { game: 'Jita IV - Moon 4', external: 'zKillboard', help: 'What is a bounty?' } as const;
</script>

<template>
  <DemoGroup :label="{ zh: '类型', en: 'Kinds' }" :hint="{ zh: '悬停与点击', en: 'Try hover and click' }">
    <EveLink @click="opened = 'Jita IV - Moon 4'">Jita IV - Moon 4</EveLink>
    <EveLink kind="external" href="https://zkillboard.com">zKillboard</EveLink>
    <EveLink kind="help" href="#">What is a bounty?</EveLink>
    <span class="eve-detail eve-text-secondary">{{ opened ? `Show Info: ${opened}` : '' }}</span>
  </DemoGroup>

  <DemoGroup :label="{ zh: '行内文字', en: 'Inline in text' }" :hint="{ zh: '与正文同行', en: 'Flows with body copy' }" :row="false">
    <p style="margin: 0; max-width: 520px">
      <EveLink>Kirk Calloway</EveLink> undocked from <EveLink>Jita IV - Moon 4</EveLink> in a Rifter bound for
      <EveLink>Perimeter</EveLink>. Read the <EveLink kind="help" href="#">Capsuleer guide</EveLink> or check the
      <EveLink kind="external" href="https://evemaps.dotlan.net">Dotlan map</EveLink>.
    </p>
  </DemoGroup>

  <DemoGroup v-for="k in kinds" :key="k" :label="{ zh: `${k} 状态（静态）`, en: `${k} states (static)` }">
    <EveLink v-for="s in states" :key="s" :kind="k" :href="k === 'game' ? undefined : '#'" :data-eve-state="s === 'normal' ? undefined : s">{{ s }}</EveLink>
    <EveLink :kind="k" :href="k === 'game' ? undefined : '#'" disabled>disabled</EveLink>
  </DemoGroup>

  <DemoGroup :label="{ zh: '长标签', en: 'Long label' }" :row="false">
    <p style="margin: 0; max-width: 260px">
      <EveLink kind="external" href="https://example.com">Caldari Navy Hookbill Blueprint (Copy) manufacturing job history</EveLink>
    </p>
  </DemoGroup>
</template>
