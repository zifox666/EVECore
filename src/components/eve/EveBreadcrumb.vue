<!-- SPDX-License-Identifier: MIT -->
<!--
  EveBreadcrumb — detail type, secondary colour, chevron separators; last item highlighted.
  Items with `href` render as links (hover = highlighted, press = white flash); emits `navigate` on click so routers can intercept.
  Docs/tests can force a state on a link item with `state: 'hover' | 'press' | 'focus'` (renders data-eve-state="…").
  Requires: nothing (tokens.css only)
-->
<script setup lang="ts">
export interface BreadcrumbItem { label: string; href?: string; /** Force a visual state (docs / tests). */ state?: 'hover' | 'press' | 'focus' }
defineProps<{ items: BreadcrumbItem[] }>();
const emit = defineEmits<{ navigate: [item: BreadcrumbItem, event: MouseEvent] }>();
</script>

<template>
  <nav class="eve-breadcrumb" aria-label="Breadcrumb">
    <ol class="eve-breadcrumb__list">
      <li v-for="(item, i) in items" :key="i" class="eve-breadcrumb__item">
        <span v-if="i > 0" class="eve-breadcrumb__sep i-tabler-chevron-right" aria-hidden="true" />
        <span v-if="i === items.length - 1" class="eve-breadcrumb__current" aria-current="page">{{ item.label }}</span>
        <a v-else-if="item.href" class="eve-breadcrumb__link" :href="item.href" :data-eve-state="item.state" @click="emit('navigate', item, $event)">{{ item.label }}</a>
        <span v-else class="eve-breadcrumb__text">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style>
.eve-breadcrumb__list { display: flex; flex-wrap: wrap; align-items: center; margin: 0; padding: 0; list-style: none; font: var(--eve-text-detail); letter-spacing: var(--eve-tracking-detail); color: var(--eve-text-secondary); text-shadow: var(--eve-text-shadow); }
.eve-breadcrumb__item { display: inline-flex; align-items: center; }
.eve-breadcrumb__sep { width: 12px; height: 12px; margin: 0 4px; flex: none; }
.eve-breadcrumb__link, .eve-breadcrumb__text { color: var(--eve-text-secondary); text-decoration: none; transition: color var(--eve-dur-hover) ease-out; }
.eve-breadcrumb__link:is(:hover, [data-eve-state='hover']) { color: var(--eve-text-highlighted); }
.eve-breadcrumb__link:is(:active, [data-eve-state='press']) { color: var(--eve-text-on-press); background: var(--eve-bg-press); text-shadow: none; transition-duration: 0ms; }
.eve-breadcrumb__link:is(:focus-visible, [data-eve-state='focus']) { outline: 1px solid var(--eve-border-primary-light); outline-offset: 2px; }
.eve-breadcrumb__current { color: var(--eve-text-highlighted); }
</style>
