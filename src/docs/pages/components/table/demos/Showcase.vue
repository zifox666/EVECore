<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EveTable, { type EveTableColumn, type EveTableSort } from '@/components/eve/EveTable.vue';
import EveSystemChip from '@/components/eve/EveSystemChip.vue';
import EveIsk from '@/components/eve/EveIsk.vue';
import { DemoGroup } from '@/docs/kit';

interface Order {
  id: number;
  type: string;
  system: string;
  security: number;
  quantity: number;
  price: number;
  change: number;
}

const rows: Order[] = [
  { id: 1, type: 'Tritanium', system: 'Jita', security: 0.95, quantity: 12_400_000, price: 5.12, change: 0.14 },
  { id: 2, type: 'Rifter', system: 'Amarr', security: 1.0, quantity: 86, price: 385_900, change: -12_400 },
  { id: 3, type: 'Pyerite', system: 'Perimeter', security: 0.95, quantity: 3_250_000, price: 9.87, change: 0 },
  { id: 4, type: 'Mexallon', system: 'Rens', security: 0.9, quantity: 410_000, price: 72.5, change: 1.8 },
  { id: 5, type: 'PLEX', system: 'Hek', security: 0.5, quantity: 24, price: 4_812_000, change: -53_000 },
  { id: 6, type: 'Isogen', system: 'Tama', security: 0.3, quantity: 98_000, price: 61.3, change: -0.7 },
];
const longRows: Order[] = [
  { id: 1, type: 'Imperial Navy Large Armor Repairer Blueprint (Copy)', system: 'Delve J-1', security: -0.4, quantity: 1, price: 1_250_000_000, change: 0 },
  { id: 2, type: 'Caldari Navy Hookbill', system: 'Jita', security: 0.95, quantity: 5, price: 123_456_789_012.34, change: -8_765_432.1 },
];

const columns: EveTableColumn<Order>[] = [
  { key: 'type', title: 'Type', width: 160, sortable: true },
  { key: 'system', title: 'Location', width: 190, sortable: true },
  { key: 'quantity', title: 'Quantity', width: 120, numeric: true, sortable: true },
  { key: 'price', title: 'Price', width: 150, numeric: true, sortable: true },
  { key: 'change', title: 'Change', width: 140, numeric: true, sortable: true },
];
const small: EveTableColumn<Order>[] = [
  { key: 'type', title: 'Type', width: 160, sortable: true },
  { key: 'quantity', title: 'Quantity', width: 120, numeric: true, sortable: true },
  { key: 'price', title: 'Price', width: 150, numeric: true, sortable: true },
];

const sort = ref<EveTableSort | null>({ key: 'price', order: 'desc' });
const selected = ref<number | null>(null);
const multiSort = ref<EveTableSort | null>(null);
const multiSelected = ref<number[]>([1, 4]);

// Static state matrix: force states on rows / sortable headers of the second table.
const matrix = ref<HTMLElement | null>(null);
onMounted(() => {
  const root = matrix.value;
  if (!root) return;
  const states = ['hover', 'press', 'focus'];
  root.querySelectorAll('tbody .eve-table__row').forEach((el, i) => {
    if (i > 0 && i <= 3) el.setAttribute('data-eve-state', states[i - 1]);
  });
  root.querySelectorAll('thead .eve-table__th.is-sortable').forEach((el, i) => {
    if (i < 3) el.setAttribute('data-eve-state', states[i]);
  });
});
</script>

<template>
  <DemoGroup :label="{ zh: '市场订单', en: 'Market orders' }" :row="false">
    <EveTable v-model:sort="sort" v-model:selected="selected" :columns="columns" :rows="rows" row-key="id">
      <template #cell-system="{ row }"><EveSystemChip :name="row.system" :security="row.security" /></template>
      <template #cell-quantity="{ value }">{{ value.toLocaleString('en-US') }}</template>
      <template #cell-price="{ value }"><EveIsk :value="value" :suffix="false" /></template>
      <template #cell-change="{ value }"><EveIsk :value="value" delta :suffix="false" /></template>
    </EveTable>
  </DemoGroup>

  <DemoGroup :label="{ zh: '多选', en: 'Multiple selection' }" :row="false">
    <EveTable v-model:sort="multiSort" v-model:selected="multiSelected" multiple :columns="small" :rows="rows" row-key="id">
      <template #cell-quantity="{ value }">{{ value.toLocaleString('en-US') }}</template>
      <template #cell-price="{ value }"><EveIsk :value="value" :suffix="false" /></template>
    </EveTable>
  </DemoGroup>

  <DemoGroup :label="{ zh: '状态', en: 'States' }" :row="false">
    <div ref="matrix">
      <EveTable :columns="small" :rows="rows.slice(0, 4)" row-key="id">
        <template #cell-quantity="{ value }">{{ value.toLocaleString('en-US') }}</template>
        <template #cell-price="{ value }"><EveIsk :value="value" :suffix="false" /></template>
      </EveTable>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '长名称与大数值', en: 'Long names and big numbers' }" :row="false">
    <div style="max-width: 420px">
      <EveTable :columns="columns" :rows="longRows" row-key="id">
        <template #cell-system="{ row }"><EveSystemChip :name="row.system" :security="row.security" /></template>
        <template #cell-quantity="{ value }">{{ value.toLocaleString('en-US') }}</template>
        <template #cell-price="{ value }"><EveIsk :value="value" :suffix="false" /></template>
        <template #cell-change="{ value }"><EveIsk :value="value" delta :suffix="false" /></template>
      </EveTable>
    </div>
  </DemoGroup>

  <DemoGroup :label="{ zh: '空表', en: 'Empty' }" :row="false">
    <EveTable :columns="small" :rows="[]" row-key="id">
      <template #empty>No orders in range</template>
    </EveTable>
  </DemoGroup>
</template>
