<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { lang as uiLang } from '../i18n';
import { highlight, type CodeLang } from './highlight';

const props = withDefaults(defineProps<{ code: string; lang?: CodeLang; title?: string }>(), { lang: 'vue' });
const html = ref('');
const copied = ref(false);

watchEffect(async () => {
  const code = props.code;
  html.value = await highlight(code, props.lang);
});

async function copy() {
  await navigator.clipboard.writeText(props.code.trimEnd());
  copied.value = true;
  setTimeout(() => (copied.value = false), 1200);
}
</script>

<template>
  <div class="code">
    <div class="code-bar">
      <span class="eve-detail">{{ title ?? lang }}</span>
      <button class="code-copy" @click="copy">
        <span :class="copied ? 'i-tabler-check' : 'i-tabler-copy'" />
        {{ copied ? (uiLang === 'zh' ? '已复制' : 'Copied') : uiLang === 'zh' ? '复制' : 'Copy' }}
      </button>
    </div>
    <div v-if="html" class="code-body" v-html="html" />
    <pre v-else class="code-body"><code>{{ code.trimEnd() }}</code></pre>
  </div>
</template>

<style scoped>
.code { border: 1px solid var(--eve-window-border); background: var(--eve-bg-primary-dark); }
.code-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  padding: 0 4px 0 12px;
  border-bottom: 1px solid var(--eve-window-border);
  color: var(--eve-text-secondary);
}
.code-copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  color: var(--eve-text-secondary);
  font: var(--eve-text-detail);
  cursor: pointer;
  transition: color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.code-copy:hover { color: var(--eve-text-highlighted); background: var(--eve-bg-hovered); }
.code-copy:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); }
.code-body { overflow-x: auto; margin: 0; padding: 12px 16px; font: 13px/1.6 var(--eve-font-mono); text-shadow: none; }
.code-body :deep(pre) { margin: 0; background: transparent !important; }
.code-body :deep(code) { font-family: var(--eve-font-mono); }
</style>
