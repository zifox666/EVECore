<script setup lang="ts">
import { CodeBlock, Demo, DocPage, DocSection, Install, L, PropsTable, Rules, type PropRow } from '../../../kit';
import Showcase from './demos/Showcase.vue';
import showcaseCode from './demos/Showcase.vue?raw';

const usage = `<script setup lang="ts">
import EveTable, { type EveTableColumn } from '@/components/eve/EveTable.vue';

const columns: EveTableColumn<Order>[] = [
  { key: 'type', title: 'Type', sortable: true },
  { key: 'price', title: 'Price', numeric: true, sortable: true },
];
const sort = ref(null);
const selected = ref(null);
<\/script>

<template>
  <EveTable v-model:sort="sort" v-model:selected="selected" :columns="columns" :rows="orders" row-key="id">
    <template #cell-price="{ value }"><EveIsk :value="value" :suffix="false" /></template>
  </EveTable>
</template>`;

const props: PropRow[] = [
  { name: 'columns', type: 'EveTableColumn<T>[]', notes: { zh: '{ key, title, width?, align?, numeric?, sortable?, render? }', en: '{ key, title, width?, align?, numeric?, sortable?, render? }' } },
  { name: 'rows', type: 'T[]' },
  { name: 'rowKey', type: 'keyof T | (row) => string | number', notes: { zh: '行的唯一键', en: 'Unique key of a row' } },
  { name: 'v-model:sort', type: '{ key, order: \'asc\' | \'desc\' } | null', default: 'null', notes: { zh: '点击表头：升序 → 降序 → 无', en: 'Header click cycles asc → desc → none' } },
  { name: 'v-model:selected', type: 'string | number | (string | number)[] | null', default: 'null', notes: { zh: '选中行的键', en: 'Key(s) of the selected row(s)' } },
  { name: 'multiple', type: 'boolean', default: 'false', notes: { zh: '多选，selected 为数组', en: 'Multi-select; selected is an array' } },
  { name: 'manualSort', type: 'boolean', default: 'false', notes: { zh: '不在内部排序，只更新 sort（服务端排序）', en: 'Skip internal sorting, only update sort (server-side)' } },
];
const events: PropRow[] = [{ name: 'row-click', type: '(row, MouseEvent)' }];
const slots: PropRow[] = [
  { name: 'cell-<key>', type: '{ row, value }', notes: { zh: '自定义某一列的单元格', en: 'Custom cell for one column' } },
  { name: 'empty', type: '—', notes: { zh: '无数据时显示，默认 “No data”', en: 'Shown with no rows; defaults to “No data”' } },
];
</script>

<template>
  <DocPage>
    <Demo :code="showcaseCode"><Showcase /></Demo>

    <DocSection id="installation" zh="安装" en="Installation">
      <Install :files="['EveTable.vue']" />
    </DocSection>

    <DocSection id="usage" zh="用法" en="Usage">
      <CodeBlock :code="usage" />
      <PropsTable :rows="props" />
      <PropsTable :rows="events" kind="events" />
      <PropsTable :rows="slots" kind="slots" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '价格、数量、ISK 一律用 numeric 列。', en: 'Prices, quantities and ISK always go in numeric columns.' },
          { zh: '涨跌只改文字色（EveIsk delta），位置列用 EveSystemChip。', en: 'Colour changes by text only (EveIsk delta); use EveSystemChip for locations.' },
        ]"
        :dont="[
          { zh: '不要加斑马纹、行分隔线或涨跌底色。', en: 'No zebra stripes, row dividers or up/down background fills.' },
          { zh: '不要给表头加解释性 tooltip。', en: 'No explanatory tooltips on headers.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>
