<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { lang, t } from '../i18n';
import { tocState } from './toc';

const active = ref('');
let raf = 0;
function onScroll() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    let id = tocState.items[0]?.id ?? '';
    for (const item of tocState.items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top < 120) id = item.id;
    }
    active.value = id;
  });
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <nav v-if="tocState.items.length" class="toc">
    <div class="eve-label-caps toc-label">{{ lang === 'zh' ? '本页内容' : 'On this page' }}</div>
    <a v-for="item in tocState.items" :key="item.id" :href="`#${item.id}`" :class="{ active: active === item.id }">
      {{ t(item.title) }}
    </a>
  </nav>
</template>

<style scoped>
.toc { display: flex; flex-direction: column; }
.toc-label { color: var(--eve-text-secondary); padding: 0 0 8px 9px; }
a {
  padding: 3px 0 3px 8px;
  border-left: 1px solid var(--eve-border-grey-light);
  color: var(--eve-text-secondary);
  text-decoration: none;
  font: var(--eve-text-detail);
  transition: color var(--eve-dur-hover) ease-out, border-color var(--eve-dur-hover) ease-out;
}
a:hover { color: var(--eve-text-highlighted); }
a.active { color: var(--eve-text-highlighted); border-left-color: var(--eve-primary); }
</style>
