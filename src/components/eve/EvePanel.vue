<!-- SPDX-License-Identifier: MIT -->
<!--
  EvePanel — EVE window: dots background, 1px border, title bar (full 48px headline / small 32px header), 16px content padding.
  Active = border-active + 1px border-primary top line + 2px/6px glow + brighter dots (200ms ease-out).
  `active` undefined → panel tracks focus-within / pointerdown inside (active) and pointerdown outside (inactive).
  `transparent` = 40% bg, rgba(255,255,255,.1) border, backdrop blur(8px).
  `icon` = an EVE icon name ("wallet" → <EveIcon>) or, with an `i-` prefix, an icon class ("i-tabler-x").
  Window buttons in #actions highlight on hover; data-eve-state="hover" forces that look.
  Requires: EveIcon.vue, lib/eve-icons.ts, assets/icons/eve
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
import type { EveIconName } from '@/lib/eve-icons';
import EveIcon from './EveIcon.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    size?: 'full' | 'small';
    /** EVE icon name ("wallet") or Iconify class ("i-tabler-users"); 32px in full, 16px in small. */
    icon?: string;
    /** Controlled active state; leave undefined for automatic focus tracking. */
    active?: boolean;
    transparent?: boolean;
    /** Remove the 16px content padding. */
    flush?: boolean;
  }>(),
  { size: 'full', active: undefined, transparent: false, flush: false },
);

const root = ref<HTMLElement>();
const auto = ref(false);
const isActive = computed(() => (props.active === undefined ? auto.value : props.active));

function onDocDown(e: PointerEvent) {
  if (props.active === undefined && root.value && !root.value.contains(e.target as Node)) auto.value = false;
}
function onFocusOut(e: FocusEvent) {
  if (props.active === undefined && !root.value?.contains(e.relatedTarget as Node | null)) auto.value = false;
}
onMounted(() => document.addEventListener('pointerdown', onDocDown, true));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocDown, true));
</script>

<template>
  <section
    ref="root"
    class="eve-panel"
    :class="[`eve-panel--${size}`, { 'is-active': isActive, 'is-transparent': transparent }]"
    @focusin="auto = true"
    @focusout="onFocusOut"
    @pointerdown="auto = true"
  >
    <header v-if="title || icon || $slots.title || $slots.actions" class="eve-panel__bar">
      <span v-if="icon && icon.startsWith('i-')" class="eve-panel__icon" :class="icon" aria-hidden="true" />
      <EveIcon v-else-if="icon" class="eve-panel__icon" :name="icon as EveIconName" :size="size === 'full' ? 32 : 16" />
      <div class="eve-panel__title"><slot name="title">{{ title }}</slot></div>
      <div v-if="$slots.actions" class="eve-panel__actions"><slot name="actions" /></div>
    </header>
    <div class="eve-panel__body" :class="{ 'is-flush': flush }"><slot /></div>
  </section>
</template>

<style>
.eve-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 0;
  background: var(--eve-window-bg);
  border: 1px solid var(--eve-window-border);
  color: var(--eve-text-primary);
  font: var(--eve-text-body);
  text-shadow: var(--eve-text-shadow);
  transition: border-color var(--eve-dur-window) ease-out, background-color var(--eve-dur-window) ease-out;
}
/* dots layer: base dots + brighter dots fading in when active */
.eve-panel::before,
.eve-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-size: var(--eve-dots-size);
}
.eve-panel::before { background-image: var(--eve-dots); }
.eve-panel::after { background-image: var(--eve-dots-active); opacity: 0; transition: opacity var(--eve-dur-window) ease-out; }
.eve-panel > * { position: relative; z-index: 1; }

/* top glow line (a real element so it sits above the dots) */
.eve-panel__bar::before {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  top: -1px;
  height: 1px;
  background: var(--eve-border-primary);
  box-shadow: 0 0 6px 1px var(--eve-border-primary), 0 1px 2px 0 var(--eve-border-primary);
  opacity: 0;
  transition: opacity var(--eve-dur-window) ease-out;
  pointer-events: none;
}
.eve-panel.is-active { border-color: var(--eve-window-border-active); background: var(--eve-window-bg-active); }
.eve-panel.is-active::after { opacity: 1; }
.eve-panel.is-active .eve-panel__bar::before { opacity: 1; }
/* without a title bar, draw the line on the body instead */
.eve-panel > .eve-panel__body:first-child::before {
  content: '';
  position: absolute;
  left: -1px; right: -1px; top: -1px; height: 1px;
  background: var(--eve-border-primary);
  box-shadow: 0 0 6px 1px var(--eve-border-primary);
  opacity: 0;
  transition: opacity var(--eve-dur-window) ease-out;
  pointer-events: none;
}
.eve-panel.is-active > .eve-panel__body:first-child::before { opacity: 1; }

.eve-panel.is-transparent {
  background: rgba(7, 7, 7, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.eve-panel.is-transparent.is-active { background: rgba(5, 8, 10, 0.4); border-color: rgba(255, 255, 255, 0.1); }

.eve-panel__bar { position: relative; display: flex; align-items: center; gap: 8px; flex: none; }
.eve-panel--full .eve-panel__bar { height: 48px; padding: 0 12px; font: var(--eve-text-headline); }
.eve-panel--small .eve-panel__bar { height: 32px; padding: 0 8px; font: var(--eve-text-header); }
.eve-panel__icon { flex: none; }
.eve-panel--full .eve-panel__icon { width: 32px; height: 32px; }
.eve-panel--small .eve-panel__icon { width: 16px; height: 16px; }
.eve-panel__title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--eve-text-highlighted); }
.eve-panel__actions { display: inline-flex; align-items: center; gap: 8px; flex: none; color: var(--eve-text-secondary); }
.eve-panel__actions > * { width: 16px; height: 16px; cursor: pointer; transition: color var(--eve-dur-hover) ease-out; }
.eve-panel__actions > button { display: inline-flex; align-items: center; justify-content: center; padding: 0; border: 0; background: none; color: inherit; font-size: 16px; }
.eve-panel__actions > :is(:hover, [data-eve-state='hover']) { color: var(--eve-text-highlighted); }

.eve-panel__body { flex: 1; min-height: 0; padding: 0 16px 16px; }
.eve-panel > .eve-panel__body:first-child { padding-top: 16px; }
.eve-panel__body.is-flush { padding: 0; }
</style>
