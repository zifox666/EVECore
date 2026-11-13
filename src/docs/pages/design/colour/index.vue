<script setup lang="ts">
import { computed, ref } from 'vue';
import { CodeBlock, DocPage, DocSection, L, t } from '../../../kit';
import Swatch from '../_shared/Swatch.vue';
import { formatSecurity, securityColor } from '@/lib/security';

type Row = [name: string, hex: string];
const window_: Row[] = [
  ['window-bg', '#070707'], ['window-bg-secondary', '#141414'], ['window-bg-secondary-hover', '#1F272B'],
  ['window-bg-active', '#05080A'], ['window-border', '#1F1F1F'], ['window-border-active', '#1E2022'], ['map-bg', '#0A0E15'],
];
const brand: Row[] = [
  ['primary', '#58A7BF'], ['primary-dark', '#41707D'], ['bg-primary', '#172327'], ['bg-primary-dark', '#0A1215'],
  ['bg-primary-light', '#36525E'], ['bg-selected', '#355866'], ['bg-hovered', '#131C1F'], ['bg-press', '#B4BEC2'],
  ['border-primary', '#41707F'], ['border-primary-dark', '#213841'], ['border-primary-light', '#71BED3'],
];
const text: { name: string; value: string; zh: string; en: string }[] = [
  { name: 'text-special', value: '#C3E9FF', zh: '特别高亮', en: 'Special' },
  { name: 'text-highlighted', value: '90%', zh: '标题、选中', en: 'Headings, selected' },
  { name: 'text-primary', value: '75%', zh: '默认正文', en: 'Default body' },
  { name: 'text-secondary', value: '50%', zh: '说明、表头', en: 'Meta, headers' },
  { name: 'text-disabled', value: '30%', zh: '禁用', en: 'Disabled' },
  { name: 'text-link', value: '#D98D00', zh: '游戏内链接', en: 'In-game link' },
  { name: 'text-link-hover', value: '#FFB732', zh: '链接悬停', en: 'Link hover' },
  { name: 'text-external-link', value: '#FFE400', zh: '外部链接', en: 'External link' },
  { name: 'text-help-link', value: '#94CCFF', zh: '帮助链接', en: 'Help link' },
];
const borders: Row[] = [['border-grey-light', '#303030'], ['border-grey', '#1E1E1E'], ['border-grey-dropdown', '#1E2022'], ['divider', '#1E2022']];
const semantic: Row[] = [
  ['success', '#8DC169'], ['warning', '#F39058'], ['warning-bg', '#180F09'], ['danger', '#FF454B'], ['danger-bg', '#1A0809'],
  ['error-bg', '#7F2628'], ['error-bg-dark', '#60171A'], ['error-border', '#FE5B61'], ['away', '#FFB845'],
  ['isk-up', '#029C02'], ['isk-down', '#FB0101'], ['omega', '#FFC64A'], ['plex', '#FFCC00'],
];
const secBands: Row[] = [
  ['sec-10', '#2C75E1'], ['sec-09', '#399AEB'], ['sec-08', '#4ECEF8'], ['sec-07', '#60DBA3'], ['sec-06', '#71E754'],
  ['sec-05', '#F5FF83'], ['sec-04', '#DC6C06'], ['sec-03', '#CE440F'], ['sec-02', '#BB1116'], ['sec-01', '#731F1F'], ['sec-00', '#8D3163'],
];
const secLabel = ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '≤0.0'];
const palette: Row[] = [
  ['burnished-gold', '#996A1F'], ['cherry-red', '#991F24'], ['copper-oxide', '#415931'], ['primary-blue', '#407196'],
  ['smoke-blue', '#305665'], ['ice-white', '#C2E5F2'], ['leafy-green', '#8DC169'], ['lime', '#B2F84D'],
  ['aura-purple', '#956BEC'], ['air-turquoise', '#70F0E3'], ['ultramarine', '#2E4EBE'], ['paragon', '#97D3CB'],
  ['destination-yellow', '#F0FF45'],
];
const greys: Row[] = [
  ['coal', '#1A1A1A'], ['matte', '#303030'], ['gunmetal', '#4D4D4D'], ['led', '#8A8A8A'],
  ['silver', '#B0B0B0'], ['tungsten', '#D9D9D9'], ['platinum', '#F2F2F2'],
];

const input = ref('0.45');
const parsed = computed(() => Number(input.value));
const valid = computed(() => input.value.trim() !== '' && Number.isFinite(parsed.value));
const rounded = computed(() => (valid.value ? formatSecurity(parsed.value) : '—'));
const rcolor = computed(() => (valid.value ? securityColor(parsed.value) : 'var(--eve-border-grey-light)'));

const copied = ref('');
async function copyVar(name: string) {
  try { await navigator.clipboard.writeText(`var(--eve-${name})`); } catch {}
  copied.value = name;
  setTimeout(() => (copied.value = ''), 1000);
}

const usage = `.panel {
  background: var(--eve-window-bg);
  border: 1px solid var(--eve-window-border);
  color: var(--eve-text-primary);
}
.panel:hover { border-color: var(--eve-border-primary-light); }`;
const sampleSec = `import { formatSecurity, securityColor } from '@/lib/security';

formatSecurity(0.45); // "0.5"
formatSecurity(0.04); // "0.1"
securityColor(-0.3);  // "#8D3163"`;
</script>

<template>
  <DocPage>
    <CodeBlock :code="usage" lang="css" />

    <DocSection id="window" zh="窗口" en="Window">
      <div class="grid"><Swatch v-for="[n, h] in window_" :key="n" :name="n" :hex="h" /></div>
    </DocSection>

    <DocSection id="brand" zh="品牌与强调" en="Brand and accent">
      <div class="grid"><Swatch v-for="[n, h] in brand" :key="n" :name="n" :hex="h" /></div>
    </DocSection>

    <DocSection id="text" zh="文字" en="Text">
      <div class="tgrid">
        <button v-for="x in text" :key="x.name" class="tcell" type="button" @click="copyVar(x.name)">
          <span class="tsample" :style="{ color: `var(--eve-${x.name})`, font: 'var(--eve-text-header)' }">{{ t({ zh: x.zh, en: x.en }) }} Jita 4-4</span>
          <span class="tmeta eve-mono">--eve-{{ x.name }}</span>
          <span class="tmeta eve-mono">{{ copied === x.name ? t({ zh: '已复制', en: 'Copied' }) : x.value }}</span>
        </button>
      </div>
    </DocSection>

    <DocSection id="borders" zh="边框与分割线" en="Borders and dividers">
      <div class="grid"><Swatch v-for="[n, h] in borders" :key="n" :name="n" :hex="h" /></div>
    </DocSection>

    <DocSection id="semantic" zh="语义色" en="Semantic">
      <div class="grid"><Swatch v-for="[n, h] in semantic" :key="n" :name="n" :hex="h" /></div>
    </DocSection>

    <DocSection id="security" zh="安等色" en="Security status">
      <div class="grid"><Swatch v-for="([n, h], i) in secBands" :key="n" :name="secLabel[i]" :v="`--eve-${n}`" :hex="h" /></div>
      <div class="sec-try">
        <label class="eve-detail eve-text-secondary" for="sec-in"><L zh="真实安等" en="True security" /></label>
        <input id="sec-in" v-model="input" class="sec-in eve-mono" inputmode="decimal" />
        <span class="eve-text-secondary">→</span>
        <span class="sec-out eve-mono" :style="{ background: rcolor }">{{ rounded }}</span>
        <span class="eve-mono eve-text-secondary">{{ valid ? securityColor(parsed) : '' }}</span>
      </div>
      <CodeBlock :code="sampleSec" lang="ts" />
    </DocSection>

    <DocSection id="palette" zh="EVE 扩展调色板" en="EVE extended palette">
      <div class="grid"><Swatch v-for="[n, h] in palette" :key="n" :name="n" :hex="h" /></div>
      <div class="grid"><Swatch v-for="[n, h] in greys" :key="n" :name="n" :hex="h" /></div>
    </DocSection>
  </DocPage>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.tgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; }
.tcell {
  display: flex; flex-direction: column; gap: 2px; padding: 8px 12px; text-align: left; cursor: pointer;
  background: var(--eve-window-bg); border: 1px solid var(--eve-window-border); font: inherit; text-shadow: var(--eve-text-shadow);
  transition: border-color var(--eve-dur-hover) ease-out;
}
.tcell:hover { border-color: var(--eve-border-primary-light); }
.tmeta { font-size: 11px; color: var(--eve-text-secondary); }
.sec-try { display: flex; align-items: center; gap: 8px; }
.sec-in {
  width: 96px; height: var(--eve-control-height); padding: 0 7px; color: var(--eve-text-primary);
  background: rgba(7, 7, 7, 0.5); border: 1px solid var(--eve-border-grey); border-radius: 0; caret-color: var(--eve-border-primary-light); outline: 0;
}
.sec-in:focus { border-color: var(--eve-border-primary); }
.sec-out { min-width: 48px; padding: 4px 8px; text-align: center; color: var(--eve-window-bg); text-shadow: none; font-weight: 600; }
</style>
