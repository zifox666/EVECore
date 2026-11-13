<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { lang, t } from './i18n';
import { CATEGORIES, pages, type PageEntry } from './registry';
import Search from './layout/Search.vue';
import Toc from './layout/Toc.vue';

const route = useRoute();
const current = computed(() => route.meta.page as PageEntry | undefined);
const query = ref('');
const drawer = ref(false);

const groups = computed(() =>
  CATEGORIES.map((c) => ({
    ...c,
    items: pages.filter(
      (p) =>
        p.category === c.id &&
        (!query.value ||
          `${p.title.zh} ${p.title.en} ${p.slug}`.toLowerCase().includes(query.value.trim().toLowerCase())),
    ),
  })).filter((g) => g.items.length),
);

const flat = computed(() => pages);
const index = computed(() => flat.value.findIndex((p) => p.path === current.value?.path));
const prev = computed(() => (index.value > 0 ? flat.value[index.value - 1] : undefined));
const next = computed(() => (index.value >= 0 ? flat.value[index.value + 1] : undefined));

watch(
  () => [route.path, lang.value],
  () => {
    drawer.value = false;
    document.title = current.value ? `${t(current.value.title)} — EveCore` : 'EveCore';
  },
  { immediate: true },
);
</script>

<template>
  <div class="docs">
    <header class="docs-top">
      <button class="docs-burger i-tabler-menu-2" aria-label="Menu" @click="drawer = !drawer" />
      <RouterLink to="/" class="docs-logo">
        <span class="docs-logo-mark" />
        <span>EVE<span class="docs-logo-core">CORE</span></span>
      </RouterLink>
      <span class="docs-top-sep" />
      <span class="docs-crumb eve-detail">{{ current ? t(CATEGORIES.find((c) => c.id === current!.category)!.label) : '' }}</span>
      <div class="docs-top-right">
        <Search />
        <div class="docs-lang" role="group" aria-label="Language">
          <button :class="{ on: lang === 'zh' }" @click="lang = 'zh'">中</button>
          <button :class="{ on: lang === 'en' }" @click="lang = 'en'">EN</button>
        </div>
      </div>
    </header>

    <aside class="docs-side" :class="{ open: drawer }">
      <div class="docs-search">
        <span class="i-tabler-search" />
        <input v-model="query" :placeholder="lang === 'zh' ? '搜索' : 'Search'" />
      </div>
      <nav>
        <section v-for="g in groups" :key="g.id" class="docs-group">
          <div class="docs-group-label eve-label-caps">{{ t(g.label) }}</div>
          <RouterLink v-for="p in g.items" :key="p.path" :to="p.path" class="docs-link" active-class="" exact-active-class="active">
            {{ t(p.title) }}
          </RouterLink>
        </section>
      </nav>
    </aside>
    <div v-if="drawer" class="docs-scrim" @click="drawer = false" />

    <main class="docs-main">
      <RouterView v-slot="{ Component }">
        <Transition name="eve-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
      <footer v-if="current" class="docs-pager">
        <RouterLink v-if="prev" :to="prev.path" class="docs-pager-link">
          <span class="eve-detail eve-text-secondary">← {{ lang === 'zh' ? '上一页' : 'Previous' }}</span>
          <span>{{ t(prev.title) }}</span>
        </RouterLink>
        <span v-else />
        <RouterLink v-if="next" :to="next.path" class="docs-pager-link right">
          <span class="eve-detail eve-text-secondary">{{ lang === 'zh' ? '下一页' : 'Next' }} →</span>
          <span>{{ t(next.title) }}</span>
        </RouterLink>
      </footer>
    </main>

    <Toc class="docs-toc" />
  </div>
</template>
