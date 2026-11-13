<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSideNav — Neocom-style side navigation. Items 32px; selected = bg-selected @40% + left glow line + highlighted text.
  One level of collapsible groups. `collapsed` = 64px icon-only column (24px icons, native title attribute).
  Router-agnostic: v-model = selected key, also emits `select`.
  `icon` = an EVE icon name ("wallet" → <EveIcon>) or, with an `i-` prefix, an icon class ("i-tabler-x").
  Docs/tests can force a state on a nav item with `state: 'hover' | 'press' | 'focus'` (renders data-eve-state="…").
  Requires: EveGlowLine.vue, EveIcon.vue, lib/eve-icons.ts, assets/icons/eve
-->
<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import type { EveIconName } from '@/lib/eve-icons';
import EveGlowLine from './EveGlowLine.vue';
import EveIcon from './EveIcon.vue';

type NavState = 'hover' | 'press' | 'focus';
export interface SideNavItem {
  key: string;
  label: string;
  /** EVE icon name ("wallet") or an Iconify class ("i-tabler-x"). */
  icon?: string;
  /** Force a visual state (docs / tests). */
  state?: NavState;
  children?: { key: string; label: string; icon?: string; state?: NavState }[];
}

const isClass = (icon: string) => icon.startsWith('i-');
const pressedKey = ref<string>();
let pressTimer: ReturnType<typeof setTimeout> | undefined;
const pressDown = (k: string) => { clearTimeout(pressTimer); pressedKey.value = k; };
const pressUp = () => { clearTimeout(pressTimer); pressTimer = setTimeout(() => (pressedKey.value = undefined), 150); };
onBeforeUnmount(() => clearTimeout(pressTimer));
const pressHandlers = (k: string) => ({ pointerdown: () => pressDown(k), pointerup: pressUp, pointerleave: pressUp, pointercancel: pressUp });

const props = withDefaults(defineProps<{ items: SideNavItem[]; collapsed?: boolean }>(), { collapsed: false });
const model = defineModel<string>();
const emit = defineEmits<{ select: [key: string] }>();

const opened = ref<Set<string>>(new Set());
const hasSelected = (it: SideNavItem) => !!it.children?.some((c) => c.key === model.value);
watch(
  () => [props.items, model.value] as const,
  () => {
    for (const it of props.items) if (hasSelected(it)) opened.value.add(it.key);
  },
  { immediate: true },
);

function choose(key: string) {
  model.value = key;
  emit('select', key);
}
function click(it: SideNavItem) {
  if (it.children?.length) {
    if (props.collapsed) return choose(it.children[0].key);
    const s = new Set(opened.value);
    s.has(it.key) ? s.delete(it.key) : s.add(it.key);
    opened.value = s;
  } else choose(it.key);
}
</script>

<template>
  <nav class="eve-side-nav" :class="{ 'is-collapsed': collapsed }" aria-label="Navigation">
    <ul class="eve-side-nav__list">
      <li v-for="it in items" :key="it.key" class="eve-side-nav__group">
        <button
          type="button"
          class="eve-side-nav__item"
          :class="{ 'is-selected': model === it.key || (collapsed && hasSelected(it)), 'is-parent': !!it.children?.length, 'is-pressed': pressedKey === it.key }"
          :data-eve-state="it.state"
          :title="collapsed ? it.label : undefined"
          :aria-current="model === it.key ? 'page' : undefined"
          :aria-expanded="it.children?.length ? opened.has(it.key) : undefined"
          v-on="pressHandlers(it.key)"
          @click="click(it)"
        >
          <EveGlowLine absolute />
          <span v-if="it.icon && isClass(it.icon)" class="eve-side-nav__icon" :class="it.icon" aria-hidden="true" />
          <EveIcon v-else-if="it.icon" class="eve-side-nav__icon" :name="it.icon as EveIconName" :size="collapsed ? 24 : 16" />
          <span v-if="!collapsed" class="eve-side-nav__label">{{ it.label }}</span>
          <span
            v-if="!collapsed && it.children?.length"
            class="eve-side-nav__chev i-tabler-chevron-down"
            :class="{ 'is-open': opened.has(it.key) }"
            aria-hidden="true"
          />
        </button>
        <ul v-if="!collapsed && it.children?.length && opened.has(it.key)" class="eve-side-nav__children">
          <li v-for="c in it.children" :key="c.key">
            <button
              type="button"
              class="eve-side-nav__item eve-side-nav__item--child"
              :class="{ 'is-selected': model === c.key, 'is-pressed': pressedKey === c.key }"
              :data-eve-state="c.state"
              :aria-current="model === c.key ? 'page' : undefined"
              v-on="pressHandlers(c.key)"
              @click="choose(c.key)"
            >
              <EveGlowLine absolute />
              <span v-if="c.icon && isClass(c.icon)" class="eve-side-nav__icon" :class="c.icon" aria-hidden="true" />
              <EveIcon v-else-if="c.icon" class="eve-side-nav__icon" :name="c.icon as EveIconName" />
              <span class="eve-side-nav__label">{{ c.label }}</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style>
.eve-side-nav {
  box-sizing: border-box;
  width: 220px;
  height: 100%;
  padding: 8px 0;
  background: var(--eve-window-bg);
  border-right: 1px solid var(--eve-window-border);
  font: var(--eve-text-body);
  transition: width var(--eve-dur-window) ease-out;
}
.eve-side-nav.is-collapsed { width: 64px; }
.eve-side-nav__list, .eve-side-nav__children { margin: 0; padding: 0; list-style: none; }
.eve-side-nav__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  padding: 0 12px;
  margin: 0;
  border: 0;
  background: transparent;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--eve-dur-row) ease-out, color var(--eve-dur-hover) ease-out;
}
.eve-side-nav__item--child { padding-left: 36px; }
.eve-side-nav__item:is(:hover, [data-eve-state='hover']) { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); }
.eve-side-nav__item.is-selected { background: color-mix(in srgb, var(--eve-bg-selected) 40%, transparent); color: var(--eve-text-highlighted); }
.eve-side-nav__item:is(.is-pressed, [data-eve-state='press']) { background: var(--eve-bg-press); color: var(--eve-text-on-press); text-shadow: none; transition-duration: 0ms; }
.eve-side-nav__item:is(.is-pressed, [data-eve-state='press']) > .eve-glow-line { opacity: 0; }
.eve-side-nav__item:is(:focus-visible, [data-eve-state='focus']) { outline: none; box-shadow: inset 0 0 0 1px var(--eve-border-primary-light); }
/* glow line only on selected */
.eve-side-nav__item > .eve-glow-line { opacity: 0; transition: opacity var(--eve-dur-row) ease-out; }
.eve-side-nav__item.is-selected > .eve-glow-line { opacity: 1; }
.eve-side-nav__icon { width: 16px; height: 16px; flex: none; }
.eve-side-nav.is-collapsed .eve-side-nav__item { justify-content: center; padding: 0; }
.eve-side-nav.is-collapsed .eve-side-nav__icon { width: 24px; height: 24px; }
.eve-side-nav__label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.eve-side-nav__chev { width: 16px; height: 16px; flex: none; color: var(--eve-text-secondary); transition: transform var(--eve-dur-hover) ease-out; }
.eve-side-nav__chev.is-open { transform: rotate(180deg); }
</style>
