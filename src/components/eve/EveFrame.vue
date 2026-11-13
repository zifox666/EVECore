<!-- SPDX-License-Identifier: MIT -->
<!--
  EveFrame — the cut-corner bordered container every cut element is built from.
  clip-path would clip a CSS border, so the frame is two layers:
    root      = border colour, clipped to the cut polygon
    ::before  = fill colour, inset 1px, clipped to the same polygon (cut − 0.4px so the diagonal stays 1px)
  Colours come from CSS variables, so callers can transition them:
    --eve-frame-border, --eve-frame-bg
-->
<script setup lang="ts">
import type { Cut } from '@/lib/utils';

withDefaults(
  defineProps<{
    /** Which corner(s) to cut. */
    cut?: Cut;
    /** Cut size in px. */
    size?: number;
    /** Render as another element. */
    as?: string;
  }>(),
  { cut: 'br', size: 9, as: 'div' },
);
</script>

<template>
  <component :is="as" class="eve-frame" :data-cut="cut" :style="{ '--eve-frame-cut': `${size}px` }">
    <slot />
  </component>
</template>

<style>
.eve-frame {
  --eve-frame-border: var(--eve-window-border);
  --eve-frame-bg: var(--eve-window-bg);
  --eve-frame-cut: var(--eve-cut);
  --_c: var(--eve-frame-cut);
  --_ci: calc(var(--eve-frame-cut) - 0.4px);
  position: relative;
  isolation: isolate;
  background-color: var(--eve-frame-border);
  transition: background-color var(--eve-dur-hover) ease-out;
}
.eve-frame::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background-color: var(--eve-frame-bg);
  transition: background-color var(--eve-dur-hover) ease-out;
}
.eve-frame[data-cut='br'] { clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--_c)), calc(100% - var(--_c)) 100%, 0 100%); }
.eve-frame[data-cut='br']::before { clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--_ci)), calc(100% - var(--_ci)) 100%, 0 100%); }
.eve-frame[data-cut='bl'] { clip-path: polygon(0 0, 100% 0, 100% 100%, var(--_c) 100%, 0 calc(100% - var(--_c))); }
.eve-frame[data-cut='bl']::before { clip-path: polygon(0 0, 100% 0, 100% 100%, var(--_ci) 100%, 0 calc(100% - var(--_ci))); }
.eve-frame[data-cut='both'] {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--_c)), calc(100% - var(--_c)) 100%, var(--_c) 100%, 0 calc(100% - var(--_c)));
}
.eve-frame[data-cut='both']::before {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--_ci)), calc(100% - var(--_ci)) 100%, var(--_ci) 100%, 0 calc(100% - var(--_ci)));
}
</style>
