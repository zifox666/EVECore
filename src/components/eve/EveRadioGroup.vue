<!-- SPDX-License-Identifier: MIT -->
<!--
  EveRadioGroup — owns the v-model for its EveRadio children (provide/inject) and implements roving focus:
  ArrowDown/Right = next, ArrowUp/Left = previous (wraps, skips disabled), selecting as focus moves.
  Requires: EveRadio.vue (children), radioKey is exported from this file.
-->
<script lang="ts">
import type { InjectionKey, Ref } from 'vue';

export interface RadioContext {
  model: Ref<unknown>;
  disabled: Ref<boolean>;
  name: string;
  select: (v: unknown) => void;
}
export const radioKey: InjectionKey<RadioContext> = Symbol('eve-radio-group');
</script>

<script setup lang="ts">
import { provide, ref, toRef, useId } from 'vue';

const props = withDefaults(
  defineProps<{ disabled?: boolean; direction?: 'vertical' | 'horizontal'; name?: string; label?: string }>(),
  { disabled: false, direction: 'vertical' },
);
const model = defineModel<unknown>();
const el = ref<HTMLElement | null>(null);
const autoName = useId();

provide(radioKey, {
  model,
  disabled: toRef(props, 'disabled'),
  name: props.name ?? autoName,
  select: (v) => (model.value = v),
});

function onKey(e: KeyboardEvent) {
  const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
  const step = keys[e.key];
  if (!step || props.disabled) return;
  const items = Array.from(el.value?.querySelectorAll<HTMLElement>('[role="radio"]:not([aria-disabled="true"])') ?? []);
  if (!items.length) return;
  e.preventDefault();
  const cur = items.findIndex((i) => i === document.activeElement);
  const next = items[(cur + step + items.length) % items.length];
  next.focus();
  next.click();
}
</script>

<template>
  <div
    ref="el"
    class="eve-radio-group"
    :class="`eve-radio-group--${direction}`"
    role="radiogroup"
    :aria-label="label"
    :aria-disabled="disabled || undefined"
    @keydown="onKey"
  >
    <slot />
  </div>
</template>

<style>
.eve-radio-group { display: flex; gap: 8px; }
.eve-radio-group--vertical { flex-direction: column; align-items: flex-start; }
.eve-radio-group--horizontal { flex-direction: row; flex-wrap: wrap; gap: 8px 16px; }
</style>
