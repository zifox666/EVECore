<script setup lang="ts">
import { computed, ref } from 'vue';
import EveIcon from '@/components/eve/EveIcon.vue';
import { DemoGroup } from '@/docs/kit';
import { t } from '@/docs/kit';
import { EVE_ICONS } from '@/lib/eve-icons';

const query = ref('');
const copied = ref('');
const shown = computed(() => {
  const q = query.value.trim().toLowerCase();
  return q ? EVE_ICONS.filter((n) => n.includes(q)) : EVE_ICONS;
});
let timer: ReturnType<typeof setTimeout> | undefined;
async function copy(name: string) {
  try { await navigator.clipboard.writeText(`i-eve-${name}`); } catch {}
  copied.value = name;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = ''), 1000);
}
</script>

<template>
  <DemoGroup :label="{ zh: '命名与尺寸', en: 'Named and sized' }">
    <EveIcon name="wallet" title="Wallet" />
    <EveIcon name="wallet" :size="24" title="Wallet" />
    <EveIcon name="wallet" :size="32" title="Wallet" />
    <EveIcon name="map" />
    <EveIcon name="station" :size="24" />
    <EveIcon name="warning" :size="32" />
  </DemoGroup>

  <DemoGroup :label="{ zh: '图标库', en: 'Gallery' }" :row="false">
    <input
      v-model="query"
      class="ig-filter"
      type="text"
      autocomplete="off"
      spellcheck="false"
      :aria-label="t({ zh: '筛选图标', en: 'Filter icons' })"
    />
    <p class="ig-count eve-detail eve-num">{{ shown.length }} / {{ EVE_ICONS.length }}</p>
    <div class="ig-grid">
      <button v-for="n in shown" :key="n" class="ig-tile" type="button" @click="copy(n)">
        <EveIcon :name="n" :size="24" />
        <span class="ig-name eve-mono">{{ copied === n ? t({ zh: '已复制', en: 'Copied' }) : n }}</span>
      </button>
    </div>
  </DemoGroup>
</template>

<style scoped>
.ig-filter {
  box-sizing: border-box; width: 100%; max-width: 320px; height: var(--eve-control-height);
  padding: 0 8px; border-radius: 0; outline: none; font: inherit; font-size: 14px;
  color: var(--eve-text-primary); background: var(--eve-bg-primary); border: 1px solid var(--eve-border-grey);
  transition: border-color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.ig-filter:hover { background: var(--eve-bg-hovered); }
.ig-filter:focus-visible { border-color: var(--eve-border-primary); }
.ig-count { margin: 8px 0; color: var(--eve-text-secondary); }
.ig-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(108px, 1fr)); gap: 4px; }
.ig-tile {
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 4px 8px; cursor: pointer;
  font: inherit; text-shadow: inherit; color: var(--eve-text-secondary);
  background: var(--eve-window-bg); border: 1px solid var(--eve-window-border); border-radius: 0;
  transition: color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out, border-color var(--eve-dur-hover) ease-out;
}
.ig-tile:hover { color: var(--eve-text-highlighted); background: var(--eve-bg-hovered); border-color: var(--eve-border-primary-light); }
.ig-tile:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); }
.ig-tile:focus-visible { outline: 1px solid var(--eve-border-primary); outline-offset: -1px; }
.ig-name { font-size: 11px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
