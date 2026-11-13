<!-- SPDX-License-Identifier: MIT -->
<!--
  EveTabs — tab bar with 1px grey-light bottom rule. Unselected = secondary, hover/selected = highlighted;
  selected has a primary indicator + glow. Count badge: bg-primary-light, 4px radius. Arrow keys / Home / End move between tabs.
  When tabs don't fit, the overflowing ones move into a 30px dropdown button (Teleport popup) at the right;
  the selected tab always stays in the bar (and at least one tab is always visible).
  `icon` = an EVE icon name ("wallet" → <EveIcon>) or, with an `i-` prefix, an icon class ("i-tabler-x").
  Docs/tests can force a state on a tab item with `state: 'hover' | 'press' | 'focus'` (renders data-eve-state="…").
  Requires: EveIcon.vue, lib/eve-icons.ts, assets/icons/eve
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EveIconName } from '@/lib/eve-icons';
import EveIcon from './EveIcon.vue';

export interface TabItem {
  value: string;
  label: string;
  /** EVE icon name ("wallet") or an Iconify class ("i-tabler-x"), 16px. */
  icon?: string;
  count?: number;
  disabled?: boolean;
  /** Force a visual state (docs / tests). */
  state?: 'hover' | 'press' | 'focus';
}

const isClass = (icon: string) => icon.startsWith('i-');

const props = withDefaults(defineProps<{ tabs: TabItem[]; wide?: boolean }>(), { wide: false });
const model = defineModel<string>();

const bar = ref<HTMLElement>();
const tabEls = ref<Record<string, HTMLElement>>({});
const widths = ref<number[]>([]);
const barWidth = ref(0);
const MORE = 30;

function measure() {
  if (!bar.value) return;
  barWidth.value = bar.value.clientWidth;
  widths.value = props.tabs.map((t) => tabEls.value[t.value]?.offsetWidth ?? 0);
}

/** Indices of the tabs kept in the bar. The selected tab is reserved first; at least one tab always stays. */
const visibleSet = computed(() => {
  const w = widths.value;
  const n = props.tabs.length;
  const all = new Set(props.tabs.map((_, i) => i));
  if (!w.length || w.length !== n) return all;
  if (w.reduce((x, y) => x + y, 0) <= barWidth.value) return all;
  const avail = barWidth.value - MORE;
  const sel = props.tabs.findIndex((t) => t.value === model.value);
  const keep = new Set<number>();
  let used = 0;
  if (sel >= 0) {
    keep.add(sel);
    used = w[sel];
  }
  for (let i = 0; i < n; i++) {
    if (i === sel) continue;
    if (used + w[i] > avail) break;
    keep.add(i);
    used += w[i];
  }
  if (!keep.size) keep.add(0);
  return keep;
});
const isOverflow = (i: number) => !visibleSet.value.has(i);
const hidden = computed(() => props.tabs.filter((_, i) => isOverflow(i)));

let ro: ResizeObserver | undefined;
onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (bar.value) ro.observe(bar.value);
  document.fonts?.ready.then(measure);
});
onBeforeUnmount(() => ro?.disconnect());
watch(() => props.tabs, () => nextTick(measure), { deep: true });
watch(() => props.wide, () => nextTick(measure));

function select(t: TabItem) {
  if (t.disabled) return;
  model.value = t.value;
}

function onKey(e: KeyboardEvent, index: number) {
  const vis = props.tabs.filter((t, i) => !t.disabled && !isOverflow(i));
  if (!vis.length) return;
  const cur = vis.findIndex((t) => t.value === props.tabs[index].value);
  let next = -1;
  if (e.key === 'ArrowRight') next = (cur + 1) % vis.length;
  else if (e.key === 'ArrowLeft') next = (cur - 1 + vis.length) % vis.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = vis.length - 1;
  else return;
  e.preventDefault();
  const t = vis[next];
  select(t);
  nextTick(() => tabEls.value[t.value]?.focus());
}

const tabIndexFor = (t: TabItem, i: number) => {
  const sel = props.tabs.some((x, j) => x.value === model.value && !isOverflow(j) && !x.disabled);
  if (!sel) return props.tabs.findIndex((x, j) => !x.disabled && !isOverflow(j)) === i ? 0 : -1;
  return model.value === t.value ? 0 : -1;
};

/* press flash (white, released after 150ms) */
const pressedKey = ref<string>();
let pressTimer: ReturnType<typeof setTimeout> | undefined;
const pressDown = (v: string) => { clearTimeout(pressTimer); pressedKey.value = v; };
const pressUp = () => { clearTimeout(pressTimer); pressTimer = setTimeout(() => (pressedKey.value = undefined), 150); };
onBeforeUnmount(() => clearTimeout(pressTimer));

/* overflow popup */
const open = ref(false);
const moreBtn = ref<HTMLButtonElement>();
const pop = ref<HTMLElement>();
const pos = ref({ top: 0, left: 0, minWidth: 0 });
const popId = `eve-tabs-pop-${Math.random().toString(36).slice(2, 8)}`;

function place() {
  const r = moreBtn.value?.getBoundingClientRect();
  if (!r) return;
  const h = pop.value?.offsetHeight ?? 0;
  const w = pop.value?.offsetWidth ?? 160;
  let top = r.bottom;
  if (top + h > window.innerHeight && r.top - h > 0) top = r.top - h;
  const left = Math.max(4, Math.min(r.right - w, window.innerWidth - w - 4));
  pos.value = { top, left, minWidth: 160 };
}
async function toggle() {
  open.value = !open.value;
  if (open.value) {
    await nextTick();
    place();
    (pop.value?.querySelector('[role="menuitem"]:not([disabled])') as HTMLElement | null)?.focus();
  }
}
function close(refocus = false) {
  open.value = false;
  if (refocus) moreBtn.value?.focus();
}
function pick(t: TabItem) {
  select(t);
  close(true);
}
function onDocDown(e: PointerEvent) {
  const n = e.target as Node;
  if (open.value && !pop.value?.contains(n) && !moreBtn.value?.contains(n)) close();
}
function onPopKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
  const items = Array.from(pop.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []);
  const i = items.indexOf(document.activeElement as HTMLElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length]?.focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus(); }
}
onMounted(() => {
  document.addEventListener('pointerdown', onDocDown, true);
  window.addEventListener('resize', place);
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocDown, true);
  window.removeEventListener('resize', place);
});
watch(hidden, (h) => { if (!h.length) open.value = false; });
</script>

<template>
  <div class="eve-tabs" :class="{ 'is-wide': wide }">
    <div ref="bar" class="eve-tabs__list" role="tablist">
      <button
        v-for="(t, i) in tabs"
        :key="t.value"
        :ref="(el) => { if (el) tabEls[t.value] = el as HTMLElement; }"
        type="button"
        role="tab"
        class="eve-tabs__tab"
        :class="{ 'is-selected': model === t.value, 'is-overflow': isOverflow(i), 'is-pressed': pressedKey === t.value && !t.disabled }"
        :data-eve-state="t.state"
        :aria-selected="model === t.value"
        :aria-disabled="t.disabled || undefined"
        :disabled="t.disabled"
        :tabindex="isOverflow(i) ? -1 : tabIndexFor(t, i)"
        @pointerdown="pressDown(t.value)"
        @pointerup="pressUp"
        @pointerleave="pressUp"
        @pointercancel="pressUp"
        @click="select(t)"
        @keydown="onKey($event, i)"
      >
        <span v-if="t.icon && isClass(t.icon)" class="eve-tabs__icon" :class="t.icon" aria-hidden="true" />
        <EveIcon v-else-if="t.icon" class="eve-tabs__icon" :name="t.icon as EveIconName" />
        <span class="eve-tabs__label">{{ t.label }}</span>
        <span v-if="t.count !== undefined" class="eve-tabs__count">{{ t.count }}</span>
      </button>
    </div>
    <button
      v-if="hidden.length"
      ref="moreBtn"
      type="button"
      class="eve-tabs__more"
      :class="{ 'is-open': open }"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="popId"
      @click="toggle"
    >
      <span class="eve-tabs__more-icon i-tabler-chevron-down" aria-hidden="true" />
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        :id="popId"
        ref="pop"
        class="eve-tabs__pop"
        role="menu"
        :style="{ top: pos.top + 'px', left: pos.left + 'px', minWidth: pos.minWidth + 'px' }"
        @keydown="onPopKey"
      >
        <button
          v-for="t in hidden"
          :key="t.value"
          type="button"
          role="menuitem"
          class="eve-tabs__item"
          :class="{ 'is-selected': model === t.value }"
          :disabled="t.disabled"
          @click="pick(t)"
        >
          <span v-if="t.icon && isClass(t.icon)" class="eve-tabs__icon" :class="t.icon" aria-hidden="true" />
        <EveIcon v-else-if="t.icon" class="eve-tabs__icon" :name="t.icon as EveIconName" />
          <span class="eve-tabs__label">{{ t.label }}</span>
          <span v-if="t.count !== undefined" class="eve-tabs__count">{{ t.count }}</span>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style>
.eve-tabs {
  display: flex;
  align-items: stretch;
  min-width: 0;
  border-bottom: 1px solid var(--eve-border-grey-light);
  font: var(--eve-text-body);
}
.eve-tabs__list { position: relative; display: flex; flex: 1; min-width: 0; overflow: hidden; }
.eve-tabs__tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: none;
  min-width: 30px;
  height: 32px;
  box-sizing: border-box;
  padding: 0 8px;
  margin: 0;
  border: 0;
  background: none;
  font: var(--eve-text-body);
  color: var(--eve-text-secondary);
  text-shadow: var(--eve-text-shadow);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color var(--eve-dur-hover) ease-out;
}
.eve-tabs.is-wide .eve-tabs__tab { padding: 0 12px; }
.eve-tabs__tab.is-overflow { position: absolute; visibility: hidden; pointer-events: none; }
.eve-tabs__tab:not(:disabled):is(:hover, [data-eve-state='hover']),
.eve-tabs__tab.is-selected { color: var(--eve-text-highlighted); }
.eve-tabs__tab:not(:disabled):is(.is-pressed, [data-eve-state='press']) { color: var(--eve-text-on-press); background: var(--eve-bg-press); text-shadow: none; transition-duration: 0ms; }
.eve-tabs__tab:disabled { color: var(--eve-text-disabled); cursor: not-allowed; }
.eve-tabs__tab:is(:focus-visible, [data-eve-state='focus']) { outline: none; box-shadow: inset 0 0 0 1px var(--eve-border-primary-light); }
/* indicator + glow, sitting on the bottom rule */
.eve-tabs__tab::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 1px;
  background: var(--eve-primary);
  box-shadow: 0 0 6px var(--eve-border-primary);
  opacity: 0;
  transition: opacity var(--eve-dur-hover) ease-out;
}
.eve-tabs__tab.is-selected::after { opacity: 1; }
.eve-tabs__icon { width: 16px; height: 16px; flex: none; }
.eve-tabs__tab:is(.is-pressed, [data-eve-state='press']) .eve-tabs__count { background: var(--eve-bg-press); color: var(--eve-text-on-press); }
.eve-tabs__count {
  display: inline-block;
  padding: 0 6px;
  border-radius: var(--eve-radius-sm);
  background: var(--eve-bg-primary-light);
  font: var(--eve-text-detail);
  letter-spacing: var(--eve-tracking-detail);
  color: var(--eve-text-highlighted);
}

.eve-tabs__more {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 32px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--eve-text-secondary);
  cursor: pointer;
  transition: color var(--eve-dur-hover) ease-out;
}
.eve-tabs__more:is(:hover, [data-eve-state='hover']), .eve-tabs__more.is-open { color: var(--eve-text-highlighted); }
.eve-tabs__more:focus-visible { outline: none; box-shadow: inset 0 0 0 1px var(--eve-border-primary-light); }
.eve-tabs__more.is-selected::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
  background: var(--eve-primary);
  box-shadow: 0 0 6px var(--eve-border-primary);
}
.eve-tabs__more-icon { width: 16px; height: 16px; }

.eve-tabs__pop {
  position: fixed;
  z-index: 1000;
  box-sizing: border-box;
  padding: 1px;
  background: var(--eve-overlay-bg);
  border: 1px solid var(--eve-overlay-border);
  font: var(--eve-text-body);
}
.eve-tabs__item {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: var(--eve-menu-item-height);
  padding: 0 8px;
  border: 0;
  background: none;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--eve-dur-row) ease-out, color var(--eve-dur-hover) ease-out;
}
.eve-tabs__item .eve-tabs__label { flex: 1; }
.eve-tabs__item:hover:not(:disabled), .eve-tabs__item:focus-visible { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); outline: none; }
.eve-tabs__item.is-selected { color: var(--eve-primary); }
.eve-tabs__item:disabled { color: var(--eve-text-disabled); cursor: not-allowed; }
</style>
