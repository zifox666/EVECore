<script setup lang="ts">
import { L, t, type Text } from '../i18n';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  notes?: Text;
}
defineProps<{ rows: PropRow[]; kind?: 'props' | 'events' | 'slots' }>();
</script>

<template>
  <div class="pt-wrap">
    <table class="pt">
      <thead>
        <tr>
          <th>{{ kind === 'events' ? (t({ zh: '事件', en: 'Event' })) : kind === 'slots' ? t({ zh: '插槽', en: 'Slot' }) : t({ zh: '属性', en: 'Prop' }) }}</th>
          <th>{{ kind === 'events' ? t({ zh: '参数', en: 'Payload' }) : t({ zh: '取值', en: 'Values' }) }}</th>
          <th v-if="kind !== 'events' && kind !== 'slots'"><L zh="默认" en="Default" /></th>
          <th><L zh="说明" en="Notes" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r.name">
          <td><code class="pt-name">{{ r.name }}</code></td>
          <td><code class="pt-type">{{ r.type }}</code></td>
          <td v-if="kind !== 'events' && kind !== 'slots'"><code v-if="r.default" class="pt-type">{{ r.default }}</code><span v-else class="eve-text-disabled">—</span></td>
          <td class="pt-notes">{{ r.notes ? t(r.notes) : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pt-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.pt { width: 100%; border-collapse: collapse; }
th {
  text-align: left;
  padding: 4px 8px;
  font: var(--eve-text-body);
  color: var(--eve-text-secondary);
  border-bottom: 1px solid var(--eve-border-grey-light);
  white-space: nowrap;
}
td { padding: 4px 8px; vertical-align: top; transition: background-color var(--eve-dur-row) ease-out; }
tr:hover td { background: var(--eve-bg-hovered); }
code { font: 12.5px var(--eve-font-mono); background: none; border: 0; padding: 0; }
.pt-name { color: var(--eve-text-special); white-space: nowrap; }
.pt-type { color: var(--eve-text-primary); }
.pt-notes { color: var(--eve-text-secondary); }
</style>
