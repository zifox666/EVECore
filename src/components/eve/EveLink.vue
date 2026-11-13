<!-- SPDX-License-Identifier: MIT -->
<!--
  EveLink — inline link. game: amber bold (#D98D00 → #FFB732 hover); external: yellow with external icon; help: light blue.
  Renders <a> when `href` is set, otherwise <button> (for in-app actions such as opening a character window).
  Docs/tests can force a state with data-eve-state="hover|press|focus" on the root.
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    kind?: 'game' | 'external' | 'help';
    href?: string;
    disabled?: boolean;
  }>(),
  { kind: 'game', disabled: false },
);
</script>

<template>
  <a
    v-if="href"
    class="eve-link"
    :class="`eve-link--${kind}`"
    :href="disabled ? undefined : href"
    :aria-disabled="disabled || undefined"
    :target="kind === 'external' ? '_blank' : undefined"
    :rel="kind === 'external' ? 'noopener noreferrer' : undefined"
  >
    <slot /><span v-if="kind === 'external'" class="eve-link__icon i-tabler-external-link" aria-hidden="true" />
  </a>
  <button v-else type="button" class="eve-link" :class="`eve-link--${kind}`" :disabled="disabled">
    <slot /><span v-if="kind === 'external'" class="eve-link__icon i-tabler-external-link" aria-hidden="true" />
  </button>
</template>

<style>
.eve-link {
  --eve-link-color: var(--eve-text-link);
  --eve-link-hover: var(--eve-text-link-hover);
  display: inline;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font: var(--eve-text-body-link);
  color: var(--eve-link-color);
  text-shadow: var(--eve-text-shadow);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--eve-dur-hover) ease-out;
}
.eve-link--external { --eve-link-color: var(--eve-text-external-link); --eve-link-hover: var(--eve-text-external-link); }
.eve-link--help { --eve-link-color: var(--eve-text-help-link); --eve-link-hover: var(--eve-text-help-link); }
.eve-link:is(:hover, [data-eve-state='hover']):not(:disabled):not([aria-disabled]) { color: var(--eve-link-hover); }
.eve-link--external:is(:hover, [data-eve-state='hover']):not(:disabled):not([aria-disabled]),
.eve-link--help:is(:hover, [data-eve-state='hover']):not(:disabled):not([aria-disabled]) { text-decoration: underline; }
.eve-link:is(:active, [data-eve-state='press']):not(:disabled):not([aria-disabled]) { color: var(--eve-bg-press); }
.eve-link:is(:focus-visible, [data-eve-state='focus']) { outline: 1px solid var(--eve-border-primary-light); outline-offset: 1px; }
.eve-link:disabled,
.eve-link[aria-disabled] { color: var(--eve-text-disabled); cursor: not-allowed; }
.eve-link__icon { display: inline-block; width: 14px; height: 14px; margin-left: 2px; vertical-align: -2px; }
</style>
