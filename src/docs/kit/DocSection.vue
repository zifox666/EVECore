<script setup lang="ts">
import { t } from '../i18n';
import { registerSection } from '../layout/toc';

const props = defineProps<{ id: string; zh: string; en: string }>();
registerSection(props.id, { zh: props.zh, en: props.en });
</script>

<template>
  <section :id="id" class="sec">
    <h2 class="sec-title">
      <span class="sec-mark" />
      <span>{{ t({ zh, en }) }}</span>
      <span class="sec-line" />
    </h2>
    <div class="sec-body"><slot /></div>
  </section>
</template>

<style scoped>
.sec { margin-top: 32px; scroll-margin-top: 64px; }
.sec-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font: var(--eve-text-headline);
  color: var(--eve-text-highlighted);
}
.sec-mark { width: 8px; height: 8px; background: var(--eve-primary); box-shadow: 0 0 6px var(--eve-primary); }
.sec-line { flex: 1; height: 1px; background: var(--eve-divider); }
.sec-body { display: flex; flex-direction: column; gap: 12px; }
.sec-body :deep(p) { margin: 0; line-height: 1.6; }
.sec-body :deep(:not(pre, li) > code) {
  padding: 0 4px;
  font: 12.5px var(--eve-font-mono);
  color: var(--eve-text-special);
  background: var(--eve-bg-primary-dark);
  border: 1px solid var(--eve-window-border);
}
</style>
