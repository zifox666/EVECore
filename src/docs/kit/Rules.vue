<script setup lang="ts">
import { t, type Text } from '../i18n';
defineProps<{ do?: Text[]; dont?: Text[] }>();
</script>

<template>
  <div class="rules">
    <ul v-if="$props.do?.length" class="rule-list">
      <li v-for="(r, i) in $props.do" :key="i"><span class="i-tabler-check ok" />{{ t(r) }}</li>
    </ul>
    <ul v-if="dont?.length" class="rule-list">
      <li v-for="(r, i) in dont" :key="i"><span class="i-tabler-x no" />{{ t(r) }}</li>
    </ul>
  </div>
</template>

<style scoped>
.rules { display: flex; flex-direction: column; gap: 8px; }
.rule-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
.rule-list li { display: flex; gap: 8px; align-items: baseline; line-height: 1.55; }
.rule-list span { flex: none; transform: translateY(2px); }
.ok { color: var(--eve-success); }
.no { color: var(--eve-danger); }
</style>
