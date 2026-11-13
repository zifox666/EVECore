<!-- SPDX-License-Identifier: MIT -->
<!--
  EveTable — dense data table. Secondary header that lights up on hover (16px sort arrow on sortable columns),
  cells 8px × 2px, no zebra, no row dividers, row hover bg-hovered (250ms), selected bg-selected.
  Draggable column resize handles (7px hit area, 1px line 10% → primary 75% + 4px blur on hover).
  Numeric columns are right-aligned, mono, tabular-nums and never truncate: the table keeps a min-width equal to the sum of its column
  widths and the wrapper scrolls horizontally. Per-column slot `#cell-<key>` receives { row, value }.
  Docs/tests can force a state with data-eve-state="hover|press|focus" on `.eve-table__row` and on sortable `.eve-table__th`.
  Requires: nothing (tokens.css only)
-->
<script lang="ts">
import type { VNode } from 'vue';

export interface EveTableColumn<T> {
  key: string;
  title: string;
  /** px number or any CSS width. */
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  /** Right-aligned mono tabular-nums. */
  numeric?: boolean;
  sortable?: boolean;
  render?: (row: T) => VNode | string;
}
export interface EveTableSort {
  key: string;
  order: 'asc' | 'desc';
}
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    columns: EveTableColumn<T>[];
    rows: T[];
    rowKey: keyof T | ((row: T) => string | number);
    /** Do not sort internally; only update the sort model. */
    manualSort?: boolean;
    multiple?: boolean;
  }>(),
  { manualSort: false, multiple: false },
);
const emit = defineEmits<{ 'row-click': [row: T, event: MouseEvent] }>();
const sort = defineModel<EveTableSort | null>('sort', { default: null });
const selected = defineModel<string | number | (string | number)[] | null>('selected', { default: null });

const Cell = (p: { content: unknown }) => p.content as VNode | string;

function keyOf(row: T): string | number {
  return typeof props.rowKey === 'function' ? props.rowKey(row) : (row[props.rowKey] as string | number);
}
function valueOf(col: EveTableColumn<T>, row: T) {
  return row[col.key];
}

const sorted = computed(() => {
  const s = sort.value;
  if (!s || props.manualSort) return props.rows;
  const dir = s.order === 'asc' ? 1 : -1;
  return [...props.rows].sort((a, b) => {
    const x = a[s.key];
    const y = b[s.key];
    if (x == null && y == null) return 0;
    if (x == null) return 1;
    if (y == null) return -1;
    if (typeof x === 'number' && typeof y === 'number') return (x - y) * dir;
    return String(x).localeCompare(String(y), undefined, { numeric: true }) * dir;
  });
});

function toggleSort(col: EveTableColumn<T>) {
  if (!col.sortable) return;
  const s = sort.value;
  if (!s || s.key !== col.key) sort.value = { key: col.key, order: 'asc' };
  else if (s.order === 'asc') sort.value = { key: col.key, order: 'desc' };
  else sort.value = null;
}
function ariaSort(col: EveTableColumn<T>) {
  if (!col.sortable) return undefined;
  const s = sort.value;
  return s && s.key === col.key ? (s.order === 'asc' ? 'ascending' : 'descending') : 'none';
}

function isSelected(row: T) {
  const k = keyOf(row);
  const v = selected.value;
  return Array.isArray(v) ? v.includes(k) : v === k;
}
function select(row: T, e: MouseEvent | KeyboardEvent) {
  const k = keyOf(row);
  if (props.multiple) {
    const cur = Array.isArray(selected.value) ? selected.value : selected.value == null ? [] : [selected.value];
    selected.value = cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k];
  } else {
    selected.value = selected.value === k ? null : k;
  }
  if (e instanceof MouseEvent) emit('row-click', row, e);
}

// Column resize
const widths = ref<Record<string, number>>({});
const MIN = 40;
const DEFAULT_W = 120;
function colWidth(col: EveTableColumn<T>) {
  const w = widths.value[col.key] ?? col.width;
  return typeof w === 'number' ? `${w}px` : w;
}
/** Sum of column widths: the table never shrinks below this, the wrapper scrolls instead. */
const minWidth = computed(() => {
  let sum = 0;
  for (const col of props.columns) {
    const w = widths.value[col.key] ?? col.width;
    sum += typeof w === 'number' ? w : typeof w === 'string' && /^\d+(\.\d+)?(px)?$/.test(w) ? parseFloat(w) : DEFAULT_W;
  }
  return `${sum}px`;
});
function startResize(col: EveTableColumn<T>, e: PointerEvent) {
  const handle = e.currentTarget as HTMLElement;
  const th = handle.closest('th') as HTMLElement;
  const startX = e.clientX;
  const startW = th.offsetWidth;
  handle.setPointerCapture(e.pointerId);
  const move = (ev: PointerEvent) => {
    widths.value = { ...widths.value, [col.key]: Math.max(MIN, startW + ev.clientX - startX) };
  };
  const up = () => {
    handle.removeEventListener('pointermove', move);
    handle.removeEventListener('pointerup', up);
    handle.removeEventListener('pointercancel', up);
  };
  handle.addEventListener('pointermove', move);
  handle.addEventListener('pointerup', up);
  handle.addEventListener('pointercancel', up);
}
function keyResize(col: EveTableColumn<T>, e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  e.preventDefault();
  const th = (e.currentTarget as HTMLElement).closest('th') as HTMLElement;
  const cur = widths.value[col.key] ?? th.offsetWidth;
  widths.value = { ...widths.value, [col.key]: Math.max(MIN, cur + (e.key === 'ArrowRight' ? 10 : -10)) };
}

function alignOf(col: EveTableColumn<T>) {
  return col.align ?? (col.numeric ? 'right' : 'left');
}
</script>

<template>
  <div class="eve-table-wrap">
    <table class="eve-table" :style="{ minWidth }" :aria-multiselectable="multiple || undefined">
      <colgroup>
        <col v-for="col in columns" :key="col.key" :style="{ width: colWidth(col) }" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="eve-table__th"
            :class="{ 'is-sortable': col.sortable, 'is-sorted': sort?.key === col.key }"
            :style="{ textAlign: alignOf(col) }"
            :aria-sort="ariaSort(col)"
            scope="col"
          >
            <button v-if="col.sortable" type="button" class="eve-table__sort" @click="toggleSort(col)">
              <span class="eve-table__title">{{ col.title }}</span>
              <span
                v-if="sort?.key === col.key && sort.order === 'asc'"
                class="eve-table__arrow i-tabler-arrow-up"
                aria-hidden="true"
              />
              <span
                v-else-if="sort?.key === col.key"
                class="eve-table__arrow i-tabler-arrow-down"
                aria-hidden="true"
              />
              <span v-else class="eve-table__arrow is-idle i-tabler-arrows-sort" aria-hidden="true" />
            </button>
            <span v-else class="eve-table__title">{{ col.title }}</span>
            <span
              class="eve-table__resize"
              role="separator"
              aria-orientation="vertical"
              tabindex="0"
              @pointerdown.prevent="startResize(col, $event)"
              @keydown="keyResize(col, $event)"
              @click.stop
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in sorted"
          :key="keyOf(row)"
          class="eve-table__row"
          :class="{ 'is-selected': isSelected(row) }"
          :aria-selected="isSelected(row)"
          tabindex="0"
          @click="select(row, $event)"
          @keydown.enter.self.prevent="select(row, $event)"
          @keydown.space.self.prevent="select(row, $event)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="eve-table__td"
            :class="{ 'is-numeric': col.numeric }"
            :style="{ textAlign: alignOf(col) }"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="valueOf(col, row)">
              <Cell v-if="col.render" :content="col.render(row)" />
              <template v-else>{{ valueOf(col, row) }}</template>
            </slot>
          </td>
        </tr>
        <tr v-if="!rows.length" class="eve-table__empty">
          <td :colspan="columns.length">
            <slot name="empty">No data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.eve-table-wrap { width: 100%; overflow-x: auto; }
.eve-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font: var(--eve-text-body);
  color: var(--eve-text-primary);
  text-shadow: var(--eve-text-shadow);
}
.eve-table__th {
  position: relative;
  padding: 2px 8px;
  font-weight: 400;
  color: var(--eve-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  border-bottom: 1px solid var(--eve-divider);
  transition: color var(--eve-dur-hover) ease-out;
}
/* Hover / press / focus (also forceable via data-eve-state) */
.eve-table__th:is(:hover, [data-eve-state='hover']),
.eve-table__th.is-sorted { color: var(--eve-text-highlighted); }
.eve-table__th.is-sortable:is(:active, [data-eve-state='press']) { color: var(--eve-bg-press); transition-duration: 0ms; }
.eve-table__sort {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  max-width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  text-shadow: inherit;
  cursor: pointer;
}
.eve-table__title { overflow: hidden; text-overflow: ellipsis; }
.eve-table__arrow { width: 16px; height: 16px; flex: none; }
.eve-table__arrow.is-idle { opacity: 0; transition: opacity var(--eve-dur-hover) ease-out; }
.eve-table__th:is(:hover, [data-eve-state='hover'], [data-eve-state='press']) .eve-table__arrow.is-idle { opacity: 0.5; }
.eve-table__sort:focus-visible,
.eve-table__th[data-eve-state='focus'] .eve-table__sort { outline: 1px solid var(--eve-border-primary-light); outline-offset: 2px; }

/* Resize handle: 7px hit area, 1px line */
.eve-table__resize {
  position: absolute;
  top: 0;
  right: -3px;
  z-index: 1;
  width: 7px;
  height: 100%;
  cursor: col-resize;
  touch-action: none;
  outline: none;
}
.eve-table__resize::after {
  content: '';
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  transition: background-color var(--eve-dur-hover) ease-out, box-shadow var(--eve-dur-hover) ease-out;
}
.eve-table__resize:hover::after,
.eve-table__resize:focus-visible::after,
.eve-table__resize:active::after {
  background: color-mix(in srgb, var(--eve-primary) 75%, transparent);
  box-shadow: 0 0 4px var(--eve-primary);
}

.eve-table__row { outline: none; cursor: pointer; }
.eve-table__td {
  padding: 2px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color var(--eve-dur-row) ease-out;
}
.eve-table__td.is-numeric { font-family: var(--eve-font-mono); font-variant-numeric: tabular-nums; text-overflow: clip; }
.eve-table__row:is(:hover, [data-eve-state='hover']) .eve-table__td { background: var(--eve-bg-hovered); }
.eve-table__row.is-selected .eve-table__td { background: var(--eve-bg-selected); color: var(--eve-text-highlighted); }
.eve-table__row:is(:active, [data-eve-state='press']) .eve-table__td { background: var(--eve-bg-press); color: var(--eve-text-on-press); text-shadow: none; transition-duration: 0ms; }
.eve-table__row:is(:focus-visible, [data-eve-state='focus']) .eve-table__td { box-shadow: inset 0 1px 0 var(--eve-border-primary-light), inset 0 -1px 0 var(--eve-border-primary-light); }
.eve-table__empty td { padding: 8px; color: var(--eve-text-secondary); text-align: center; }
</style>
