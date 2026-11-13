<script setup lang="ts">
import { ref } from 'vue';
import { L } from '../i18n';
import CodeBlock from './CodeBlock.vue';

withDefaults(defineProps<{ code: string; title?: string; pad?: boolean; center?: boolean }>(), { pad: true, center: false });
const tab = ref<'preview' | 'code'>('preview');
</script>

<template>
  <div class="demo">
    <div class="demo-bar">
      <span class="eve-detail demo-title">{{ title }}</span>
      <div class="demo-tabs" role="tablist">
        <button role="tab" :aria-selected="tab === 'preview'" :class="{ on: tab === 'preview' }" @click="tab = 'preview'">
          <L zh="预览" en="Preview" />
        </button>
        <button role="tab" :aria-selected="tab === 'code'" :class="{ on: tab === 'code' }" @click="tab = 'code'">
          <L zh="代码" en="Code" />
        </button>
      </div>
    </div>
    <div v-show="tab === 'preview'" class="demo-stage eve-dots" :class="{ pad, center }">
      <slot />
    </div>
    <CodeBlock v-if="tab === 'code'" :code="code" lang="vue" />
  </div>
</template>

<style scoped>
.demo { display: flex; flex-direction: column; }
.demo-bar { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
.demo-title { color: var(--eve-text-secondary); padding-bottom: 4px; }
.demo-tabs { display: flex; }
.demo-tabs button {
  height: 26px;
  padding: 0 12px;
  border: 1px solid var(--eve-window-border);
  border-bottom: 0;
  background: transparent;
  color: var(--eve-text-secondary);
  font: var(--eve-text-detail);
  cursor: pointer;
  transition: color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out;
}
.demo-tabs button + button { border-left: 0; }
.demo-tabs button:hover { color: var(--eve-text-highlighted); }
.demo-tabs button.on { color: var(--eve-text-highlighted); background: var(--eve-bg-primary); box-shadow: inset 0 1px 0 var(--eve-border-primary); }
.demo-stage {
  border: 1px solid var(--eve-window-border);
  background-color: var(--eve-window-bg);
  min-height: 96px;
}
.demo-stage.pad { padding: 24px; }
.demo-stage.center { display: flex; align-items: center; justify-content: center; }
</style>
