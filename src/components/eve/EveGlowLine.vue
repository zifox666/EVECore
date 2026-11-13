<!-- SPDX-License-Identifier: MIT -->
<!--
  EveGlowLine — vertical glow line: 1px solid + 5px translucent band of the same colour.
  Band is 10% by default, 50% when `active` or when the parent is hovered (absolute mode / inside .eve-glow-host).
  Use inline, or `absolute` to hug the left edge of a `position: relative` parent.
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Any CSS colour. Defaults to the primary token. */
    color?: string;
    active?: boolean;
    /** Position absolutely at the left edge of the parent (parent must be positioned). */
    absolute?: boolean;
  }>(),
  { color: 'var(--eve-primary)', active: false, absolute: false },
);
</script>

<template>
  <span
    class="eve-glow-line"
    :class="{ 'is-active': active, 'eve-glow-line--absolute': absolute }"
    :style="{ '--eve-glow-color': color }"
    aria-hidden="true"
  />
</template>

<style>
.eve-glow-line {
  display: block;
  flex: none;
  align-self: stretch;
  width: 6px;
  min-height: 8px;
  box-sizing: border-box;
  border-left: 1px solid var(--eve-glow-color, var(--eve-primary));
  background: color-mix(in srgb, var(--eve-glow-color, var(--eve-primary)) 10%, transparent);
  background-clip: padding-box;
  pointer-events: none;
  transition: background-color var(--eve-dur-row) ease-out;
}
.eve-glow-line--absolute { position: absolute; left: 0; top: 0; bottom: 0; align-self: auto; }
.eve-glow-line.is-active,
:hover > .eve-glow-line--absolute,
.eve-glow-host:hover .eve-glow-line {
  background-color: color-mix(in srgb, var(--eve-glow-color, var(--eve-primary)) 50%, transparent);
}
</style>
