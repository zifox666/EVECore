<script setup lang="ts">
import { ref } from 'vue';
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

const rows = [
  { zh: '按钮 / Tab hover 色彩', en: 'Button / tab hover colour', d: '150ms', v: '--eve-dur-hover' },
  { zh: '列表行 hover 背景', en: 'List row hover background', d: '250ms', v: '--eve-dur-row' },
  { zh: '窗口激活边框 / 点阵', en: 'Window active border / dots', d: '200ms', v: '--eve-dur-window' },
  { zh: '进度条', en: 'Progress bar', d: '600ms', v: '--eve-dur-progress' },
  { zh: '页面切换（仅 fade）', en: 'Page change (fade only)', d: '150ms', v: '--eve-dur-page' },
  { zh: '按下闪白回落', en: 'Press flash release', d: '150ms', v: '--eve-dur-press-release' },
];
const hovers = [
  { l: 'hover 150ms', v: '--eve-dur-hover' },
  { l: 'row 250ms', v: '--eve-dur-row' },
  { l: 'window 200ms', v: '--eve-dur-window' },
];
const pct = ref(20);
const fadeOn = ref(true);
function bump() { pct.value = pct.value >= 90 ? 10 : pct.value + 35 > 100 ? 100 : pct.value + 35; }
function swap() { fadeOn.value = !fadeOn.value; }
const css = `.row { transition: background-color var(--eve-dur-row) ease-out; }
.bar { transition: width var(--eve-dur-progress) ease-out; }
.page-enter-active, .page-leave-active { transition: opacity var(--eve-dur-page) ease-out; }
.page-enter-from, .page-leave-to { opacity: 0; } /* no slide, no translate */`;
</script>

<template>
  <DocPage>
    <DocSection id="table" zh="时长表" en="Durations">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th><L zh="场景" en="Scene" /></th><th><L zh="时长" en="Duration" /></th><th>Token</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.v">
              <td class="eve-text-highlighted"><L :zh="r.zh" :en="r.en" /></td><td class="eve-mono">{{ r.d }} ease-out</td><td><code>{{ r.v }}</code></td>
            </tr>
            <tr><td class="eve-text-highlighted"><L zh="数字变化" en="Number change" /></td><td colspan="2" class="eve-text-secondary"><L zh="可做滚动计数（ISK 余额、统计）" en="May roll as a counter (ISK balance, stats)" /></td></tr>
          </tbody>
        </table>
      </div>
      <CodeBlock :code="css" lang="css" />
    </DocSection>

    <DocSection id="hover" zh="悬停演示" en="Hover demos">
      <div class="row">
        <div v-for="h in hovers" :key="h.v" class="hbox" :style="{ transitionDuration: `var(${h.v})` }">{{ h.l }}</div>
      </div>
    </DocSection>

    <DocSection id="progress" zh="进度条 600ms" en="Progress 600ms">
      <div class="bar-wrap"><div class="bar" :style="{ width: `${pct}%` }" /></div>
      <div class="row"><button class="btn" type="button" @click="bump"><L zh="推进" en="Advance" /></button><span class="eve-mono eve-text-secondary">{{ pct }}%</span></div>
    </DocSection>

    <DocSection id="page" zh="页面淡入淡出" en="Page fade">
      <div class="row"><button class="btn" type="button" @click="swap"><L zh="切换页面" en="Switch page" /></button></div>
      <div class="stage">
        <Transition name="pg" mode="out-in">
          <div v-if="fadeOn" key="a" class="pg">Market</div>
          <div v-else key="b" class="pg">Contracts</div>
        </Transition>
      </div>
    </DocSection>

    <DocSection id="reduced" zh="减弱动效" en="Reduced motion">
      <Rules
        :do="[{ zh: '所有时长尊重 prefers-reduced-motion: reduce，降为 0ms；tokens.css 已把 --eve-dur-* 置 0。', en: 'Every duration honours prefers-reduced-motion: reduce and drops to 0ms; tokens.css already zeroes --eve-dur-*.' }]"
        :dont="[{ zh: '页面切换不要位移（fade-slide）。', en: 'No displacement on page change (no fade-slide).' }]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.tbl-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.tbl { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 4px 8px; font: var(--eve-text-body); color: var(--eve-text-secondary); border-bottom: 1px solid var(--eve-border-grey-light); }
td { padding: 4px 8px; }
code { font: 12.5px var(--eve-font-mono); color: var(--eve-text-special); }
.row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.hbox { width: 150px; height: 56px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--eve-border-primary-dark); color: var(--eve-text-secondary); transition-property: background-color, border-color, color; transition-timing-function: ease-out; }
.hbox:hover { background: var(--eve-bg-primary-light); border-color: var(--eve-border-primary-light); color: var(--eve-text-highlighted); }
.bar-wrap { height: 8px; background: var(--eve-progress-track); width: 100%; }
.bar { height: 100%; background: var(--eve-progress-fill); transition: width var(--eve-dur-progress) ease-out; }
.btn { height: var(--eve-control-height); padding: 0 15px; font: var(--eve-text-body); color: var(--eve-text-primary); background: var(--eve-bg-primary); border: 1px solid var(--eve-border-primary); cursor: pointer; transition: background-color var(--eve-dur-hover) ease-out; }
.btn:hover { background: var(--eve-bg-primary-light); border-color: var(--eve-border-primary-light); }
.btn:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); }
.stage { height: 64px; border: 1px solid var(--eve-window-border); display: flex; align-items: center; padding: 0 16px; }
.pg { font: var(--eve-text-header); color: var(--eve-text-highlighted); }
.pg-enter-active, .pg-leave-active { transition: opacity var(--eve-dur-page) ease-out; }
.pg-enter-from, .pg-leave-to { opacity: 0; }
</style>
