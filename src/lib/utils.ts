// SPDX-License-Identifier: MIT
import { onBeforeUnmount, ref } from 'vue';

export type Cut = 'br' | 'bl' | 'both' | 'none';

/** clip-path polygon for a corner cut of `size` px, inset by `inset` px (for the inner layer of a bordered cut). */
export function cutPolygon(cut: Cut, size = 9, inset = 0): string {
  const s = Math.max(0, size - inset * 0.4);
  if (cut === 'none') return 'none';
  if (cut === 'br') return `polygon(0 0, 100% 0, 100% calc(100% - ${s}px), calc(100% - ${s}px) 100%, 0 100%)`;
  if (cut === 'bl') return `polygon(0 0, 100% 0, 100% 100%, ${s}px 100%, 0 calc(100% - ${s}px))`;
  return `polygon(0 0, 100% 0, 100% calc(100% - ${s}px), calc(100% - ${s}px) 100%, ${s}px 100%, 0 calc(100% - ${s}px))`;
}

/** Group digits with thin commas: 1234567.8 → "1,234,567.80" */
export function formatIsk(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/**
 * EVE press flash: `pressed` turns true on pointerdown and stays true for at least
 * `release` ms after pointerup, so a quick tap still shows the white flash.
 */
export function usePressFlash(release = 150) {
  const pressed = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const down = () => {
    clearTimeout(timer);
    pressed.value = true;
  };
  const up = () => {
    clearTimeout(timer);
    timer = setTimeout(() => (pressed.value = false), release);
  };
  onBeforeUnmount(() => clearTimeout(timer));
  return {
    pressed,
    // use with v-on="handlers" (event names, not onX props)
    handlers: { pointerdown: down, pointerup: up, pointerleave: up, pointercancel: up },
  };
}
