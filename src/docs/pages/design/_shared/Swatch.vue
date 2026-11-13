<script setup lang="ts">
import { ref } from 'vue';
import { lang } from '../../../i18n';

const props = defineProps<{ name: string; hex: string; v?: string; textOn?: boolean; sample?: string }>();
// v = css variable name without var(); defaults to --eve-<name>
const cssVar = () => props.v ?? `--eve-${props.name}`;
const copied = ref(false);
async function copy() {
  try {
    await navigator.clipboard.writeText(`var(${cssVar()})`);
  } catch {}
  copied.value = true;
  setTimeout(() => (copied.value = false), 1000);
}
</script>

<template>
  <button class="sw" type="button" @click="copy">
    <span class="sw-chip" :style="{ background: `var(${cssVar()})` }" />
    <span class="sw-meta">
      <span class="sw-name">{{ name }}</span>
      <span class="sw-var eve-mono">{{ copied ? (lang === 'zh' ? '已复制' : 'Copied') : cssVar() }}</span>
      <span class="sw-hex eve-mono">{{ hex }}</span>
    </span>
  </button>
</template>

<style scoped>
.sw {
  display: flex; flex-direction: column; padding: 0; text-align: left; cursor: pointer;
  background: var(--eve-window-bg); border: 1px solid var(--eve-window-border); color: inherit; font: inherit; text-shadow: inherit;
  transition: border-color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.sw:hover { border-color: var(--eve-border-primary-light); background: var(--eve-bg-hovered); }
.sw:active { background: var(--eve-bg-press); }
.sw-chip { display: block; height: 40px; border-bottom: 1px solid var(--eve-window-border); }
.sw-meta { display: flex; flex-direction: column; padding: 4px 8px; gap: 0; min-width: 0; }
.sw-name { color: var(--eve-text-highlighted); font: var(--eve-text-detail); letter-spacing: var(--eve-tracking-detail); }
.sw-var, .sw-hex { font-size: 11px; color: var(--eve-text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sw-hex { color: var(--eve-text-disabled); }
</style>
