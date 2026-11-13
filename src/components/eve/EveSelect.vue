<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSelect — dropdown. Collapsed: 32px, window-bg, 1px border-grey, bottom-right 9px cut, chevron (alpha .5 → 1 on hover)
  and a bottom glow bar on hover. Open: cut becomes square, bg window-bg-active, border #1E2022; the popup is attached
  to the field (moves up 1px over its bottom edge, its top line inset 7px each side). Options 31px:
  hover #18262D, selected #16272E, keyboard highlight #273E47.
  Keyboard: ArrowUp/Down, Home/End, Enter/Space, Escape, Tab, type-ahead. Popup is teleported to body and flips upward when needed.
  Press flashes white (150ms). Docs/tests can force a state with data-eve-state="hover|press|focus" on the trigger.
  Requires: EveFrame.vue, lib/utils.ts
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import { usePressFlash } from '@/lib/utils';
import EveFrame from './EveFrame.vue';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{ options: SelectOption[]; placeholder?: string; disabled?: boolean; invalid?: boolean }>(),
  { disabled: false, invalid: false },
);
const model = defineModel<string | number | null | undefined>();

const uid = useId();
const { pressed, handlers } = usePressFlash();
const open = ref(false);
const active = ref(-1);
const trigger = ref<InstanceType<typeof EveFrame> | null>(null);
const popup = ref<HTMLElement | null>(null);
const pos = ref({ left: 0, top: 0, width: 0, flip: false });

const selected = computed(() => props.options.find((o) => o.value === model.value));
const optId = (i: number) => `${uid}-opt-${i}`;
const triggerEl = () => trigger.value?.$el as HTMLElement | undefined;

function enabledFrom(start: number, dir: 1 | -1): number {
  const n = props.options.length;
  for (let k = 0, i = start; k < n; k++, i += dir) {
    if (i < 0 || i >= n) break;
    if (!props.options[i].disabled) return i;
  }
  return -1;
}

function place() {
  const el = triggerEl();
  if (!el) return;
  const r = el.getBoundingClientRect();
  const h = popup.value?.offsetHeight ?? Math.min(props.options.length, 8) * 31 + 2;
  const flip = r.bottom - 1 + h > window.innerHeight && r.top > window.innerHeight - r.bottom;
  pos.value = { left: r.left, width: r.width, top: flip ? r.top + 1 - h : r.bottom - 1, flip };
}

async function openPopup() {
  if (props.disabled || open.value) return;
  active.value = Math.max(0, props.options.findIndex((o) => o.value === model.value));
  if (props.options[active.value]?.disabled) active.value = enabledFrom(0, 1);
  open.value = true;
  place();
  await nextTick();
  place();
  scrollActive();
}
function close() {
  open.value = false;
}
function choose(i: number) {
  const o = props.options[i];
  if (!o || o.disabled) return;
  model.value = o.value;
  close();
  triggerEl()?.focus();
}
function scrollActive() {
  (popup.value?.children[active.value] as HTMLElement | undefined)?.scrollIntoView({ block: 'nearest' });
}
function move(i: number) {
  if (i >= 0) {
    active.value = i;
    nextTick(scrollActive);
  }
}

let buffer = '';
let bufferTimer: ReturnType<typeof setTimeout> | undefined;
function typeAhead(ch: string) {
  clearTimeout(bufferTimer);
  buffer += ch.toLowerCase();
  bufferTimer = setTimeout(() => (buffer = ''), 700);
  const from = buffer.length === 1 ? active.value + 1 : active.value;
  const list = props.options.map((o, i) => ({ o, i }));
  const hit = [...list.slice(Math.max(from, 0)), ...list.slice(0, Math.max(from, 0))].find(
    ({ o }) => !o.disabled && o.label.toLowerCase().startsWith(buffer),
  );
  if (hit) {
    if (open.value) move(hit.i);
    else model.value = hit.o.value;
  }
}

function onKey(e: KeyboardEvent) {
  if (props.disabled) return;
  const n = props.options.length;
  if (!open.value) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openPopup();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) typeAhead(e.key);
    return;
  }
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); move(enabledFrom(Math.min(active.value + 1, n - 1), 1)); break;
    case 'ArrowUp': e.preventDefault(); move(enabledFrom(Math.max(active.value - 1, 0), -1)); break;
    case 'Home': e.preventDefault(); move(enabledFrom(0, 1)); break;
    case 'End': e.preventDefault(); move(enabledFrom(n - 1, -1)); break;
    case 'Enter':
    case ' ': e.preventDefault(); choose(active.value); break;
    case 'Escape': e.preventDefault(); close(); break;
    case 'Tab': close(); break;
    default: if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) typeAhead(e.key);
  }
}

function onOutside(e: Event) {
  const t = e.target as Node;
  if (triggerEl()?.contains(t) || popup.value?.contains(t)) return;
  close();
}
watch(open, (v) => {
  const fn = v ? 'addEventListener' : 'removeEventListener';
  document[fn]('pointerdown', onOutside, true);
  window[fn]('resize', place);
  window[fn]('scroll', place, true);
});
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onOutside, true);
  window.removeEventListener('resize', place);
  window.removeEventListener('scroll', place, true);
  clearTimeout(bufferTimer);
});
</script>

<template>
  <EveFrame
    ref="trigger"
    as="button"
    type="button"
    :cut="open ? 'none' : 'br'"
    class="eve-select"
    :class="{ 'is-open': open, 'is-disabled': disabled, 'is-invalid': invalid, 'is-pressed': pressed && !disabled }"
    v-bind="$attrs"
    role="combobox"
    aria-haspopup="listbox"
    :aria-expanded="open"
    :aria-controls="`${uid}-list`"
    :aria-activedescendant="open && active >= 0 ? optId(active) : undefined"
    :aria-invalid="invalid || undefined"
    :disabled="disabled"
    @click="open ? close() : openPopup()"
    v-on="disabled ? {} : handlers"
    @keydown="onKey"
  >
    <span class="eve-select__value" :class="{ 'is-placeholder': !selected }">{{ selected ? selected.label : placeholder }}</span>
    <span class="eve-select__chevron i-tabler-chevron-down" aria-hidden="true" />
    <span class="eve-select__glow" aria-hidden="true" />
  </EveFrame>

  <Teleport to="body">
    <div
      v-if="open"
      :id="`${uid}-list`"
      ref="popup"
      class="eve-select__popup"
      :class="{ 'is-flipped': pos.flip }"
      role="listbox"
      :style="{ left: pos.left + 'px', top: pos.top + 'px', width: pos.width + 'px' }"
    >
      <div
        v-for="(o, i) in options"
        :id="optId(i)"
        :key="o.value"
        class="eve-select__option"
        :class="{ 'is-selected': o.value === model, 'is-active': i === active, 'is-disabled': o.disabled }"
        role="option"
        :aria-selected="o.value === model"
        :aria-disabled="o.disabled || undefined"
        @pointermove="!o.disabled && (active = i)"
        @click="choose(i)"
      >
        {{ o.label }}
      </div>
    </div>
  </Teleport>
</template>

<style>
.eve-select {
  --eve-frame-border: var(--eve-border-grey);
  --eve-frame-bg: var(--eve-window-bg);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: var(--eve-control-height);
  padding: 0 7px;
  border: 0;
  margin: 0;
  gap: 6px;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
  text-align: left;
  cursor: pointer;
  outline: none;
}
.eve-select:not(:disabled):is(:hover, [data-eve-state='hover']) { --eve-frame-border: var(--eve-border-grey-light); }
.eve-select.is-open { --eve-frame-bg: var(--eve-window-bg-active); --eve-frame-border: var(--eve-border-grey-dropdown); }
.eve-select.is-invalid { --eve-frame-border: var(--eve-danger); }
.eve-select:is(:focus-visible, [data-eve-state='focus']) { --eve-frame-border: var(--eve-border-primary); }
.eve-select.eve-select:not(:disabled):is(.is-pressed, [data-eve-state='press']) {
  --eve-frame-bg: var(--eve-bg-press);
  --eve-frame-border: var(--eve-bg-press);
  color: var(--eve-text-on-press);
  text-shadow: none;
}
.eve-select__value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.eve-select__value.is-placeholder { color: var(--eve-text-secondary); }
.eve-select__chevron { width: 16px; height: 16px; flex: none; opacity: 0.5; transition: opacity var(--eve-dur-hover) ease-out; }
.eve-select:not(:disabled):is(:hover, [data-eve-state='hover']) .eve-select__chevron,
.eve-select.is-open .eve-select__chevron { opacity: 1; }
.eve-select.is-open .eve-select__chevron { transform: rotate(180deg); }
.eve-select__glow {
  position: absolute;
  left: 1px;
  right: 10px;
  bottom: 1px;
  height: 1px;
  background: var(--eve-primary);
  box-shadow: 0 0 6px var(--eve-primary);
  opacity: 0;
  transition: opacity var(--eve-dur-hover) ease-out;
  pointer-events: none;
}
.eve-select:not(:disabled):not(.is-open):is(:hover, [data-eve-state='hover']) .eve-select__glow { opacity: 1; }
.eve-select:disabled { cursor: not-allowed; color: var(--eve-text-disabled); }
.eve-select:disabled .eve-select__chevron { opacity: 0.3; }

.eve-select__popup {
  --_line: var(--eve-border-grey-dropdown);
  position: fixed;
  z-index: 1000;
  box-sizing: border-box;
  max-height: calc(8 * var(--eve-option-height) + 2px);
  overflow-y: auto;
  padding: 0;
  background: var(--eve-window-bg-active);
  border: 1px solid var(--_line);
  border-top-color: transparent;
  background-clip: padding-box;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
/* top edge line, inset 7px each side so it reads as pulled out of the field */
.eve-select__popup::before {
  content: '';
  position: sticky;
  display: block;
  top: 0;
  height: 1px;
  margin: -1px 6px 0;
  background: var(--_line);
  z-index: 1;
}
.eve-select__popup.is-flipped { border-top-color: var(--_line); border-bottom-color: transparent; }
.eve-select__popup.is-flipped::before { display: none; }
.eve-select__option {
  display: flex;
  align-items: center;
  height: var(--eve-option-height);
  padding: 0 7px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color var(--eve-dur-hover) ease-out;
}
.eve-select__option.is-selected { background: var(--eve-option-selected); color: var(--eve-text-highlighted); }
.eve-select__option:hover:not(.is-disabled) { background: var(--eve-option-hover); }
.eve-select__option.is-active:not(.is-disabled) { background: var(--eve-option-focus); color: var(--eve-text-highlighted); }
.eve-select__option.is-disabled { color: var(--eve-text-disabled); cursor: not-allowed; }
</style>
