<!-- SPDX-License-Identifier: MIT -->
<!--
  EveTooltip — wraps a trigger; shows `content` (or #content) after an open delay.
  overlay bg 95%, 1px border-grey 95%, 16px padding, square, with a small arrow towards the anchor.
  Stays open while the pointer is over the tooltip; opens on keyboard focus; Escape closes. Flips when off-screen.
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId } from 'vue';

type Placement = 'top' | 'bottom' | 'left' | 'right';

const props = withDefaults(
  defineProps<{
    content?: string;
    placement?: Placement;
    /** ms before the tooltip opens on hover. */
    delay?: number;
    disabled?: boolean;
  }>(),
  { placement: 'top', delay: 400, disabled: false },
);

const id = `eve-tooltip-${useId()}`;
const anchor = ref<HTMLElement>();
const tip = ref<HTMLElement>();
const open = ref(false);
const actual = ref<Placement>(props.placement);
const pos = ref({ left: 0, top: 0, arrow: 0 });
const GAP = 8;
const ARROW = 6;
let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

const opposite: Record<Placement, Placement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

function place() {
  const a = anchor.value?.getBoundingClientRect();
  const t = tip.value;
  if (!a || !t) return;
  const w = t.offsetWidth;
  const h = t.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const room = (p: Placement) =>
    p === 'top' ? a.top - GAP - ARROW - h : p === 'bottom' ? vh - a.bottom - GAP - ARROW - h : p === 'left' ? a.left - GAP - ARROW - w : vw - a.right - GAP - ARROW - w;
  let p = props.placement;
  if (room(p) < 0 && room(opposite[p]) > room(p)) p = opposite[p];
  actual.value = p;
  let left: number;
  let top: number;
  if (p === 'top' || p === 'bottom') {
    left = a.left + a.width / 2 - w / 2;
    left = Math.max(4, Math.min(vw - w - 4, left));
    top = p === 'top' ? a.top - GAP - ARROW - h : a.bottom + GAP + ARROW;
    pos.value = { left, top, arrow: Math.max(8, Math.min(w - 8, a.left + a.width / 2 - left)) };
  } else {
    top = a.top + a.height / 2 - h / 2;
    top = Math.max(4, Math.min(vh - h - 4, top));
    left = p === 'left' ? a.left - GAP - ARROW - w : a.right + GAP + ARROW;
    pos.value = { left, top, arrow: Math.max(8, Math.min(h - 8, a.top + a.height / 2 - top)) };
  }
}

async function show() {
  if (props.disabled) return;
  clearTimeout(closeTimer);
  open.value = true;
  await nextTick();
  place();
}
function scheduleOpen() {
  clearTimeout(closeTimer);
  if (open.value || props.disabled) return;
  clearTimeout(openTimer);
  openTimer = setTimeout(show, props.delay);
}
function scheduleClose() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => (open.value = false), 120);
}
function keepOpen() {
  clearTimeout(closeTimer);
}
function closeNow() {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  open.value = false;
}
function onFocusIn(e: FocusEvent) {
  // Only keyboard focus opens it; a mouse click focuses the trigger too but must not reopen the tip.
  const el = e.target as HTMLElement | null;
  if (el?.matches?.(':focus-visible')) show();
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) closeNow();
}
onBeforeUnmount(() => {
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
});

const style = computed(() => ({ left: `${pos.value.left}px`, top: `${pos.value.top}px`, '--eve-tip-arrow': `${pos.value.arrow}px` }));
</script>

<template>
  <span
    ref="anchor"
    class="eve-tooltip-anchor"
    :aria-describedby="open ? id : undefined"
    @pointerenter="scheduleOpen"
    @pointerleave="scheduleClose"
    @focusin="onFocusIn"
    @focusout="scheduleClose"
    @keydown="onKey"
    @pointerdown="closeNow"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition name="eve-tooltip">
      <div
        v-if="open"
        :id="id"
        ref="tip"
        role="tooltip"
        class="eve-tooltip"
        :class="`eve-tooltip--${actual}`"
        :style="style"
        @pointerenter="keepOpen"
        @pointerleave="scheduleClose"
      >
        <slot name="content">{{ content }}</slot>
        <span class="eve-tooltip__arrow" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.eve-tooltip-anchor { display: inline-flex; }
.eve-tooltip {
  position: fixed;
  z-index: 3000;
  max-width: 320px;
  padding: 16px;
  box-sizing: border-box;
  background: var(--eve-overlay-bg);
  border: 1px solid var(--eve-overlay-border);
  color: var(--eve-text-primary);
  font: var(--eve-text-body);
  text-shadow: var(--eve-text-shadow);
}
.eve-tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--eve-overlay-bg);
  border: 1px solid var(--eve-overlay-border);
  transform: rotate(45deg);
}
.eve-tooltip--top .eve-tooltip__arrow { bottom: -5px; left: calc(var(--eve-tip-arrow) - 4px); border-top: 0; border-left: 0; }
.eve-tooltip--bottom .eve-tooltip__arrow { top: -5px; left: calc(var(--eve-tip-arrow) - 4px); border-bottom: 0; border-right: 0; }
.eve-tooltip--left .eve-tooltip__arrow { right: -5px; top: calc(var(--eve-tip-arrow) - 4px); border-bottom: 0; border-left: 0; }
.eve-tooltip--right .eve-tooltip__arrow { left: -5px; top: calc(var(--eve-tip-arrow) - 4px); border-top: 0; border-right: 0; }
.eve-tooltip-enter-active, .eve-tooltip-leave-active { transition: opacity var(--eve-dur-hover) ease-out; }
.eve-tooltip-enter-from, .eve-tooltip-leave-to { opacity: 0; }
</style>
