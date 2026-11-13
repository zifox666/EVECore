<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { lang, t } from '../i18n';
import { CATEGORIES, pages } from '../registry';

const router = useRouter();
const open = ref(false);
const q = ref('');
const active = ref(0);
const input = ref<HTMLInputElement>();
const list = ref<HTMLElement>();
let returnFocus: HTMLElement | null = null;

const results = computed(() => {
  const s = q.value.trim().toLowerCase();
  const hits = pages.filter(
    (p) => !s || `${p.title.zh} ${p.title.en} ${p.slug} ${p.description.zh} ${p.description.en}`.toLowerCase().includes(s),
  );
  // exact title/slug hits first
  return hits.sort((a, b) => Number(!`${a.slug} ${a.title.en}`.toLowerCase().startsWith(s)) - Number(!`${b.slug} ${b.title.en}`.toLowerCase().startsWith(s)));
});

watch(q, () => (active.value = 0));
watch(active, async () => {
  await nextTick();
  list.value?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
});

function show() {
  returnFocus = document.activeElement as HTMLElement | null;
  open.value = true;
  q.value = '';
  nextTick(() => input.value?.focus());
}
function hide() {
  open.value = false;
  returnFocus?.focus?.();
}
function go(i = active.value) {
  const p = results.value[i];
  if (!p) return;
  open.value = false;
  router.push(p.path);
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(active.value + 1, results.value.length - 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(active.value - 1, 0); }
  else if (e.key === 'Enter') { e.preventDefault(); go(); }
  else if (e.key === 'Escape') { e.preventDefault(); hide(); }
}
function onGlobal(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    open.value ? hide() : show();
  } else if (e.key === '/' && !open.value && !(e.target as HTMLElement)?.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    show();
  }
}
onMounted(() => window.addEventListener('keydown', onGlobal));
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobal));
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const cat = (id: string) => t(CATEGORIES.find((c) => c.id === id)!.label);
</script>

<template>
  <button class="srch-btn" @click="show">
    <span class="i-tabler-search" />
    <span class="srch-btn-label">{{ lang === 'zh' ? '搜索' : 'Search' }}</span>
    <kbd class="eve-num">{{ isMac ? '⌘' : 'Ctrl' }} K</kbd>
  </button>
  <Teleport to="body">
    <Transition name="eve-fade">
      <div v-if="open" class="srch-scrim" @pointerdown.self="hide">
        <div class="srch" role="dialog" aria-modal="true" :aria-label="lang === 'zh' ? '搜索文档' : 'Search docs'">
          <div class="srch-field">
            <span class="i-tabler-search" />
            <input
              ref="input"
              v-model="q"
              role="combobox"
              aria-controls="srch-list"
              :aria-activedescendant="results[active] ? `srch-${results[active].slug}` : undefined"
              :placeholder="lang === 'zh' ? '搜索' : 'Search'"
              @keydown="onKey"
            />
            <kbd>Esc</kbd>
          </div>
          <ul id="srch-list" ref="list" class="srch-list" role="listbox">
            <li
              v-for="(p, i) in results"
              :id="`srch-${p.slug}`"
              :key="p.path"
              role="option"
              :aria-selected="i === active"
              @pointermove="active = i"
              @click="go(i)"
            >
              <span class="srch-cat eve-label-caps">{{ cat(p.category) }}</span>
              <span class="srch-title">{{ t(p.title) }}</span>
            </li>
            <li v-if="!results.length" class="srch-empty">{{ lang === 'zh' ? '无结果' : 'No results' }}</li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.srch-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 4px 0 8px;
  border: 1px solid var(--eve-border-grey-light);
  background: rgba(7, 7, 7, 0.5);
  color: var(--eve-text-secondary);
  font: var(--eve-text-body);
  cursor: pointer;
  transition: border-color var(--eve-dur-hover) ease-out, color var(--eve-dur-hover) ease-out;
}
.srch-btn:hover { border-color: var(--eve-border-primary); color: var(--eve-text-highlighted); }
.srch-btn:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); transition-duration: 0ms; }
kbd {
  padding: 0 4px;
  border: 1px solid var(--eve-border-grey-light);
  background: var(--eve-window-bg-secondary);
  color: var(--eve-text-secondary);
  font: 11px/18px var(--eve-font-mono);
}
.srch-scrim { position: fixed; inset: 0; z-index: 100; background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; padding-top: 12vh; }
.srch {
  width: min(560px, calc(100vw - 32px));
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background: var(--eve-window-bg-active);
  background-image: var(--eve-dots-active);
  background-size: var(--eve-dots-size);
  border: 1px solid var(--eve-window-border-active);
  box-shadow: inset 0 1px 0 var(--eve-border-primary), 0 -1px 6px -2px var(--eve-border-primary);
}
.srch-field { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px; border-bottom: 1px solid var(--eve-divider); color: var(--eve-text-secondary); }
.srch-field input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--eve-text-highlighted); font: var(--eve-text-header); caret-color: var(--eve-border-primary-light); }
.srch-list { list-style: none; margin: 0; padding: 4px 0; overflow-y: auto; }
.srch-list li { display: flex; align-items: center; gap: 12px; height: 32px; padding: 0 12px; cursor: pointer; transition: background-color var(--eve-dur-row) ease-out; }
.srch-list li[aria-selected='true'] { background: var(--eve-option-focus); color: var(--eve-text-highlighted); box-shadow: inset 1px 0 0 var(--eve-primary); }
.srch-cat { width: 72px; flex: none; color: var(--eve-text-secondary); }
.srch-empty { color: var(--eve-text-secondary); cursor: default; }
@media (max-width: 767px) { .srch-btn-label, .srch-btn kbd { display: none; } }
</style>
