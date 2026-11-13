<!-- SPDX-License-Identifier: MIT -->
<!--
  EveSearchField — EveInput with a magnifier on the left and a clear button on the right while non-empty.
  Clear empties the model, refocuses the field and emits `clear`. Escape also clears.
  data-eve-state="hover|focus" is forwarded to the field.
  Requires: EveInput.vue
-->
<script setup lang="ts">
import { ref } from 'vue';
import EveInput from './EveInput.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{ placeholder?: string; disabled?: boolean }>(),
  { disabled: false },
);
const emit = defineEmits<{ clear: [] }>();
const model = defineModel<string>({ default: '' });
const root = ref<{ $el: HTMLElement } | null>(null);

function clear() {
  model.value = '';
  emit('clear');
  root.value?.$el.querySelector('input')?.focus();
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && model.value && !props.disabled) {
    e.preventDefault();
    clear();
  }
}
</script>

<template>
  <EveInput
    ref="root"
    v-model="model"
    v-bind="$attrs"
    class="eve-search"
    type="search"
    icon="i-tabler-search"
    :placeholder="placeholder"
    :disabled="disabled"
    @keydown="onKey"
  >
    <template #suffix>
      <button
        v-if="model && !disabled"
        type="button"
        class="eve-search__clear"
        aria-label="Clear"
        @mousedown.prevent
        @click="clear"
      >
        <span class="i-tabler-x" aria-hidden="true" />
      </button>
    </template>
  </EveInput>
</template>

<style>
.eve-search__clear {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--eve-text-secondary);
  cursor: pointer;
  transition: color var(--eve-dur-hover) ease-out, background-color 0ms;
}
.eve-search__clear > span { width: 16px; height: 16px; }
.eve-search__clear:hover { color: var(--eve-text-highlighted); }
.eve-search__clear:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); }
.eve-search__clear:focus-visible { outline: 1px solid var(--eve-border-primary-light); }
.eve-search input[type='search']::-webkit-search-cancel-button { display: none; }
.eve-search input[type='search'] { appearance: none; }
</style>
