<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSlider — 4px track (border-grey-light) with a primary filled part and a square thumb.
  Thumb: #58A7BF normal, #FFFFFF hover, #99E5EE while dragging (--eve-slider-thumb*).
  Pointer drag (captured), Arrow keys (step), PageUp/PageDown (10 steps), Home/End.
  Docs/tests can force a state with data-eve-state="hover|press|focus" (press = dragging) on the root.
  Requires: nothing else.
-->
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{ min?: number; max?: number; step?: number; disabled?: boolean; label?: string }>(),
  { min: 0, max: 100, step: 1, disabled: false },
);
const model = defineModel<number>({ default: 0 });
const track = ref<HTMLElement | null>(null);
const dragging = ref(false);

const clamp = (v: number) => {
  const snapped = Math.round((v - props.min) / props.step) * props.step + props.min;
  const decimals = (String(props.step).split('.')[1] ?? '').length;
  return Math.min(props.max, Math.max(props.min, Number(snapped.toFixed(decimals))));
};
const pct = computed(() => (props.max === props.min ? 0 : ((model.value - props.min) / (props.max - props.min)) * 100));

function setFromPointer(e: PointerEvent) {
  const r = track.value!.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  model.value = clamp(props.min + ratio * (props.max - props.min));
}
function down(e: PointerEvent) {
  if (props.disabled) return;
  dragging.value = true;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  setFromPointer(e);
  (e.currentTarget as HTMLElement).focus();
}
function move(e: PointerEvent) {
  if (dragging.value) setFromPointer(e);
}
function up() {
  dragging.value = false;
}
function onKey(e: KeyboardEvent) {
  if (props.disabled) return;
  const s = props.step;
  const map: Record<string, number> = {
    ArrowRight: model.value + s, ArrowUp: model.value + s,
    ArrowLeft: model.value - s, ArrowDown: model.value - s,
    PageUp: model.value + s * 10, PageDown: model.value - s * 10,
    Home: props.min, End: props.max,
  };
  if (e.key in map) {
    e.preventDefault();
    model.value = clamp(map[e.key]);
  }
}
</script>

<template>
  <div
    class="eve-slider"
    :class="{ 'is-dragging': dragging, 'is-disabled': disabled }"
    role="slider"
    :tabindex="disabled ? -1 : 0"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="model"
    :aria-label="label"
    :aria-disabled="disabled || undefined"
    @pointerdown="down"
    @pointermove="move"
    @pointerup="up"
    @pointercancel="up"
    @keydown="onKey"
  >
    <div ref="track" class="eve-slider__track">
      <div class="eve-slider__fill" :style="{ width: pct + '%' }" />
      <div class="eve-slider__thumb" :style="{ left: pct + '%' }" />
    </div>
  </div>
</template>

<style>
.eve-slider {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding: 0 5px;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  touch-action: none;
  user-select: none;
}
.eve-slider__track { position: relative; width: 100%; height: 4px; background: var(--eve-border-grey-light); }
.eve-slider__fill { position: absolute; inset: 0 auto 0 0; background: var(--eve-primary); }
.eve-slider__thumb {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 16px;
  margin: -8px 0 0 -5px;
  background: var(--eve-slider-thumb);
  transition: background-color var(--eve-dur-hover) ease-out, box-shadow var(--eve-dur-hover) ease-out;
}
.eve-slider:is(:hover, [data-eve-state='hover']):not(.is-disabled) .eve-slider__thumb { background: var(--eve-slider-thumb-hover); box-shadow: 0 0 6px var(--eve-primary); }
.eve-slider:is(.is-dragging, [data-eve-state='press']):not(.is-disabled) .eve-slider__thumb { background: var(--eve-slider-thumb-drag); box-shadow: 0 0 6px var(--eve-slider-thumb-drag); transition-duration: 0ms; }
.eve-slider:is(:focus-visible, [data-eve-state='focus']) .eve-slider__thumb { box-shadow: 0 0 0 1px var(--eve-border-primary-light); }
.eve-slider.is-disabled { cursor: not-allowed; }
.eve-slider.is-disabled .eve-slider__fill { background: var(--eve-primary-dark); }
.eve-slider.is-disabled .eve-slider__thumb { background: var(--eve-text-disabled); }
</style>
