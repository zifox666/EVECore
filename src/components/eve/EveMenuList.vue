<!-- SPDX-License-Identifier: MIT -->
<!--
  EveMenuList — the floating menu surface shared by EveContextMenu and EveDropdownMenu.
  Teleported to body, positioned from an `anchor` rect (a point for context menus) with flip/shift,
  closes on outside click / Escape / Tab. One level of nested submenu (hover or ArrowRight).
  Window-bg-active surface, 1px divider border + 1px inner padding, 7px vertical padding, 21px items,
  34px icon slot, hover bg-hovered, `highlighted` items in primary.
  Keyboard: ArrowUp/Down, Home/End, Enter/Space, ArrowRight/Left (submenu), Escape.
  Item `icon`: an Iconify class ("i-eve-info", "i-tabler-flag") or, without the `i-` prefix, an EVE icon name ("info", "fitting") rendered via EveIcon.
  Item `state` ("hover" | "press" | "focus") forces a look via data-eve-state for docs; `inline` renders the menu in place (no teleport,
  no outside-click handling) so a static open menu can be shown.
  Requires: EveIcon.vue (src/assets/icons/eve, lib/eve-icons.ts)
-->
<script lang="ts">
export interface MenuEntry {
  key: string;
  label: string;
  /** Iconify class ("i-eve-info") or an EVE icon name without the `i-` prefix ("info"); 16px, in the 34px left slot. */
  icon?: string;
  highlighted?: boolean;
  disabled?: boolean;
  /** Force a visual state (docs / tests). */
  state?: 'hover' | 'press' | 'focus';
  children?: MenuEntry[];
}
export interface MenuSeparator { type: 'separator' }
export interface MenuTitle { type: 'title'; label: string }
export type MenuItem = MenuEntry | MenuSeparator | MenuTitle;
export interface MenuAnchor { left: number; right: number; top: number; bottom: number }

export function isEntry(i: MenuItem): i is MenuEntry {
  return !('type' in i);
}
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue';
import EveIcon from './EveIcon.vue';
import type { EveIconName } from '@/lib/eve-icons';

const props = withDefaults(
  defineProps<{
    items: MenuItem[];
    anchor: MenuAnchor;
    /** Dropdown: align the menu's right edge to the anchor's right edge. */
    alignEnd?: boolean;
    /** Make the menu at least as wide as the anchor. */
    matchWidth?: boolean;
    nested?: boolean;
    /** Focus the menu (and its first item when `firstActive`) on mount. */
    focus?: boolean;
    firstActive?: boolean;
    /** Element whose pointerdown must not count as "outside" (the dropdown trigger). */
    ignore?: HTMLElement | null;
    /** Render in place as a static block (docs): no teleport, positioning, focus or outside-click handling. */
    inline?: boolean;
  }>(),
  { alignEnd: false, matchWidth: false, nested: false, focus: true, firstActive: false, ignore: null, inline: false },
);
const emit = defineEmits<{ select: [key: string]; close: []; back: [] }>();

const uid = useId();
const root = ref<HTMLElement>();
const pos = ref({ left: 0, top: 0 });
const ready = ref(false);
const active = ref(-1);
const sub = ref<{ key: string; anchor: MenuAnchor; kb: boolean } | null>(null);
const pressedKey = ref<string | null>(null);
let hoverTimer: ReturnType<typeof setTimeout> | undefined;
let pressTimer: ReturnType<typeof setTimeout> | undefined;

const navigable = computed(() =>
  props.items.map((it, i) => (isEntry(it) && !it.disabled ? i : -1)).filter((i) => i >= 0),
);
const itemId = (i: number) => `eve-menu-${uid}-${i}`;

function place() {
  const el = root.value;
  if (!el) return;
  if (props.inline) {
    ready.value = true;
    return;
  }
  const a = props.anchor;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let left: number;
  let top: number;
  if (props.nested) {
    left = a.right - 1;
    if (left + w > vw - 4) left = a.left - w + 1;
    top = a.top - 8;
  } else {
    left = props.alignEnd ? a.right - w : a.left;
    top = a.bottom;
    if (top + h > vh - 4 && a.top - h >= 4) top = a.top - h;
  }
  left = Math.max(4, Math.min(left, vw - w - 4));
  top = Math.max(4, Math.min(top, vh - h - 4));
  pos.value = { left, top };
  ready.value = true;
}

onMounted(async () => {
  await nextTick();
  place();
  if (props.inline) return;
  if (props.focus) {
    root.value?.focus({ preventScroll: true });
    if (props.firstActive) active.value = navigable.value[0] ?? -1;
  }
  if (!props.nested) {
    document.addEventListener('pointerdown', onOutside, true);
    window.addEventListener('resize', onResize);
    window.addEventListener('blur', onResize);
  }
});
onBeforeUnmount(() => {
  clearTimeout(hoverTimer);
  clearTimeout(pressTimer);
  document.removeEventListener('pointerdown', onOutside, true);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('blur', onResize);
});

function onOutside(e: PointerEvent) {
  const t = e.target as Node;
  if (root.value?.contains(t) || props.ignore?.contains(t)) return;
  emit('close');
}
function onResize() {
  emit('close');
}

function openSub(i: number, el: HTMLElement | null, kb: boolean) {
  const it = props.items[i];
  if (!isEntry(it) || !it.children?.length || it.disabled || !el) return;
  const r = el.getBoundingClientRect();
  sub.value = { key: it.key, anchor: { left: r.left, right: r.right, top: r.top, bottom: r.bottom }, kb };
}
function closeSub() {
  sub.value = null;
}

function onEnter(i: number, e: PointerEvent) {
  const it = props.items[i];
  if (!isEntry(it) || it.disabled) return;
  active.value = i;
  clearTimeout(hoverTimer);
  const el = e.currentTarget as HTMLElement;
  if (it.children?.length) hoverTimer = setTimeout(() => openSub(i, el, false), 120);
  else hoverTimer = setTimeout(closeSub, 120);
}

function activate(i: number, el: HTMLElement | null, kb = false) {
  const it = props.items[i];
  if (!isEntry(it) || it.disabled) return;
  if (it.children?.length) {
    openSub(i, el, kb);
    return;
  }
  pressedKey.value = it.key;
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => emit('select', it.key), 120);
}

function move(dir: 1 | -1) {
  const nav = navigable.value;
  if (!nav.length) return;
  const cur = nav.indexOf(active.value);
  const next = cur < 0 ? (dir === 1 ? 0 : nav.length - 1) : (cur + dir + nav.length) % nav.length;
  active.value = nav[next];
  closeSub();
}

function onKey(e: KeyboardEvent) {
  const nav = navigable.value;
  const itemEl = () => root.value?.querySelector<HTMLElement>(`#${CSS.escape(itemId(active.value))}`) ?? null;
  switch (e.key) {
    case 'ArrowDown': move(1); break;
    case 'ArrowUp': move(-1); break;
    case 'Home': active.value = nav[0] ?? -1; closeSub(); break;
    case 'End': active.value = nav[nav.length - 1] ?? -1; closeSub(); break;
    case 'Enter':
    case ' ':
      if (active.value >= 0) activate(active.value, itemEl(), true);
      break;
    case 'ArrowRight': {
      const it = props.items[active.value];
      if (it && isEntry(it) && it.children?.length) activate(active.value, itemEl(), true);
      break;
    }
    case 'ArrowLeft':
      if (props.nested) emit('back');
      break;
    case 'Escape':
      if (props.nested) emit('back');
      else emit('close');
      break;
    case 'Tab':
      emit('close');
      return;
    default:
      return;
  }
  e.preventDefault();
  e.stopPropagation();
}

function onBack() {
  closeSub();
  root.value?.focus({ preventScroll: true });
}

const subItems = computed(() => {
  if (!sub.value) return [];
  const it = props.items.find((i) => isEntry(i) && i.key === sub.value!.key);
  return it && isEntry(it) ? (it.children ?? []) : [];
});

const style = computed(() => props.inline ? { position: 'relative' as const, display: 'inline-block', minWidth: '220px' } : ({
  left: `${pos.value.left}px`,
  top: `${pos.value.top}px`,
  minWidth: props.matchWidth ? `${props.anchor.right - props.anchor.left}px` : undefined,
  visibility: ready.value ? ('visible' as const) : ('hidden' as const),
}));
</script>

<template>
  <Teleport to="body" :disabled="nested || inline">
    <div
      ref="root"
      class="eve-menu"
      :class="{ 'is-nested': nested, 'is-inline': inline }"
      role="menu"
      tabindex="-1"
      :aria-activedescendant="active >= 0 ? itemId(active) : undefined"
      :style="style"
      @keydown="onKey"
      @contextmenu.prevent
    >
      <div class="eve-menu__inner">
        <template v-for="(it, i) in items" :key="isEntry(it) ? it.key : `${'type' in it ? it.type : ''}-${i}`">
          <div v-if="!isEntry(it) && it.type === 'separator'" class="eve-menu__sep" role="separator" />
          <div v-else-if="!isEntry(it) && it.type === 'title'" class="eve-menu__title" role="presentation">{{ it.label }}</div>
          <div
            v-else-if="isEntry(it)"
            :id="itemId(i)"
            class="eve-menu__item"
            :class="{
              'is-active': active === i,
              'is-highlighted': it.highlighted,
              'is-disabled': it.disabled,
              'is-pressed': pressedKey === it.key,
              'is-open': sub?.key === it.key,
            }"
            role="menuitem"
            :aria-disabled="it.disabled || undefined"
            :data-eve-state="it.state"
            :aria-haspopup="it.children?.length ? 'menu' : undefined"
            :aria-expanded="it.children?.length ? sub?.key === it.key : undefined"
            @pointerenter="onEnter(i, $event)"
            @click="activate(i, $event.currentTarget as HTMLElement)"
          >
            <span class="eve-menu__icon-slot" aria-hidden="true"><template v-if="it.icon"><EveIcon v-if="!it.icon.startsWith('i-')" :name="it.icon as EveIconName" /><span v-else class="eve-menu__icon" :class="it.icon" /></template></span>
            <span class="eve-menu__label">{{ it.label }}</span>
            <span v-if="it.children?.length" class="eve-menu__chevron i-tabler-chevron-right" aria-hidden="true" />
          </div>
        </template>
      </div>
      <EveMenuList
        v-if="sub"
        :key="sub.key + (sub.kb ? '-kb' : '')"
        :items="subItems"
        :anchor="sub.anchor"
        nested
        :focus="sub.kb"
        :first-active="sub.kb"
        @select="emit('select', $event)"
        @close="emit('close')"
        @back="onBack"
      />
    </div>
  </Teleport>
</template>

<style>
.eve-menu {
  position: fixed;
  z-index: 2000;
  box-sizing: border-box;
  min-width: 180px;
  padding: 1px;
  background: var(--eve-window-bg-active);
  border: 1px solid var(--eve-divider);
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  outline: none;
  animation: eve-menu-in var(--eve-dur-hover) ease-out;
}
.eve-menu.is-nested { z-index: 2001; }
.eve-menu.is-inline { position: relative; z-index: auto; animation: none; }
@keyframes eve-menu-in { from { opacity: 0; } to { opacity: 1; } }
.eve-menu__inner { padding: 7px 0; }
.eve-menu__sep { height: 1px; margin: 3px 0; background: var(--eve-divider); }
.eve-menu__title {
  padding: 4px 7px 6px;
  font: var(--eve-text-headline);
  color: var(--eve-text-highlighted);
  white-space: nowrap;
}
.eve-menu__item {
  display: flex;
  align-items: center;
  height: var(--eve-menu-item-height);
  padding: 0 7px 0 0;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--eve-dur-row) ease-out, color var(--eve-dur-hover) ease-out;
}
.eve-menu__icon-slot { display: flex; align-items: center; justify-content: center; width: 34px; flex: none; }
.eve-menu__icon { width: 16px; height: 16px; }
.eve-menu__label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.eve-menu__chevron { width: 16px; height: 16px; margin-left: 12px; flex: none; color: var(--eve-text-secondary); }
.eve-menu__item:is(.is-active, [data-eve-state='hover'], [data-eve-state='focus']),
.eve-menu__item.is-open { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); }
.eve-menu__item.is-highlighted { color: var(--eve-primary); }
.eve-menu__item.is-highlighted:is(.is-active, [data-eve-state='hover'], [data-eve-state='focus']) { color: var(--eve-border-primary-light); }
.eve-menu__item.is-pressed,
.eve-menu__item[data-eve-state='press'],
.eve-menu__item:active:not(.is-disabled) {
  background: var(--eve-bg-press);
  color: var(--eve-text-on-press);
  text-shadow: none;
  transition-duration: 0ms;
}
.eve-menu__item:is(.is-pressed, [data-eve-state='press']) .eve-menu__chevron { color: inherit; }
.eve-menu__item.is-disabled { color: var(--eve-text-disabled); cursor: not-allowed; background: none; }
</style>
