<!-- SPDX-License-Identifier: MIT -->
<!--
  EveDialog — modal window drawn like an active panel: dots background, 1px window-border-active frame,
  top 1px border-primary line + glow, 48px headline title bar with a close icon button.
  v-model:open; footer slot for EveButtons (right-aligned, primary rightmost). Scrim rgba(0,0,0,.6),
  focus trap, Escape / scrim click close (unless `persistent`), focus restored on close, 150ms fade.
  The close × is an EveIconButton (data-eve-state is supported there).
  Requires: EveIconButton.vue, lib/utils.ts (via EveIconButton)
-->
<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import EveIconButton from './EveIconButton.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    /** Dialog width in px. */
    width?: number;
    /** Ignore Escape and scrim clicks; only explicit buttons close it. */
    persistent?: boolean;
    closeLabel?: string;
  }>(),
  { width: 480, persistent: false, closeLabel: 'Close' },
);
const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ close: [] }>();

const titleId = `eve-dialog-title-${useId()}`;
const win = ref<HTMLElement>();
let returnFocus: HTMLElement | null = null;
let prevOverflow = '';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function close() {
  open.value = false;
  emit('close');
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation();
    if (!props.persistent) close();
    return;
  }
  if (e.key !== 'Tab' || !win.value) return;
  const els = [...win.value.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
  if (!els.length) {
    e.preventDefault();
    win.value.focus();
    return;
  }
  const first = els[0];
  const last = els[els.length - 1];
  const a = document.activeElement;
  if (e.shiftKey && (a === first || a === win.value)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && a === last) {
    e.preventDefault();
    first.focus();
  }
}
function onScrim(e: MouseEvent) {
  if (e.target === e.currentTarget && !props.persistent) close();
}

watch(
  open,
  async (v) => {
    if (v) {
      returnFocus = document.activeElement as HTMLElement | null;
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      await nextTick();
      const body = win.value?.querySelector<HTMLElement>('.eve-dialog__body');
      (body?.querySelector<HTMLElement>(FOCUSABLE) ?? win.value?.querySelector<HTMLElement>('.eve-dialog__footer ' + 'button') ?? win.value)?.focus();
    } else {
      document.body.style.overflow = prevOverflow;
      returnFocus?.focus?.();
      returnFocus = null;
    }
  },
  { immediate: true, flush: 'post' },
);
onBeforeUnmount(() => {
  if (open.value) document.body.style.overflow = prevOverflow;
});
</script>

<template>
  <Teleport to="body">
    <Transition name="eve-dialog">
      <div v-if="open" class="eve-dialog-scrim" @mousedown="onScrim">
        <div
          ref="win"
          class="eve-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title || $slots.title ? titleId : undefined"
          tabindex="-1"
          :style="{ width: `${width}px` }"
          @keydown="onKey"
        >
          <header class="eve-dialog__head">
            <h2 :id="titleId" class="eve-dialog__title"><slot name="title">{{ title }}</slot></h2>
            <EveIconButton icon="i-tabler-x" :label="closeLabel" @click="close" />
          </header>
          <div class="eve-dialog__body"><slot /></div>
          <footer v-if="$slots.footer" class="eve-dialog__footer"><slot name="footer" /></footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.eve-dialog-scrim {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.6);
}
.eve-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--eve-window-bg);
  background-image: var(--eve-dots-active);
  background-size: var(--eve-dots-size);
  border: 1px solid var(--eve-window-border-active);
  color: var(--eve-text-primary);
  font: var(--eve-text-body);
  text-shadow: var(--eve-text-shadow);
  outline: none;
}
.eve-dialog::before {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  height: 1px;
  background: var(--eve-border-primary);
  box-shadow: 0 0 6px 1px var(--eve-border-primary);
  pointer-events: none;
}
.eve-dialog__head {
  display: flex;
  align-items: center;
  flex: none;
  height: 48px;
  padding: 0 12px;
}
.eve-dialog__title {
  flex: 1;
  min-width: 0;
  margin: 0;
  font: var(--eve-text-headline);
  color: var(--eve-text-highlighted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.eve-dialog__body { padding: 0 16px 16px; overflow: auto; min-height: 0; }
.eve-dialog__footer { display: flex; justify-content: flex-end; gap: 8px; padding: 0 16px 16px; flex: none; }
.eve-dialog-enter-active, .eve-dialog-leave-active { transition: opacity var(--eve-dur-page) ease-out; }
.eve-dialog-enter-from, .eve-dialog-leave-to { opacity: 0; }
</style>
