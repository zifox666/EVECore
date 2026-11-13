<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '../i18n';
import type { PageEntry } from '../registry';

const route = useRoute();
const page = computed(() => route.meta.page as PageEntry | undefined);
</script>

<template>
  <article class="doc">
    <header class="doc-head">
      <h1 class="eve-display">{{ page ? t(page.title) : '' }}</h1>
      <p v-if="page" class="doc-lead">{{ t(page.description) }}</p>
    </header>
    <slot />
  </article>
</template>

<style scoped>
.doc { max-width: 880px; }
.doc-head { margin-bottom: 24px; }
.doc-head h1 { margin: 0 0 8px; font-size: 32px; letter-spacing: 0.5px; }
.doc-lead { margin: 0; color: var(--eve-text-secondary); font-size: 15px; }
</style>
