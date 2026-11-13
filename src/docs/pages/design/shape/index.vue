<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, PropsTable, Rules, type PropRow } from '../../../kit';

const radii = [
  { n: 'none', v: '0', var: '--eve-radius-none', zh: '默认：面板、输入、表格、菜单、Tab', en: 'Default: panels, inputs, tables, menus, tabs' },
  { n: 'xs', v: '2px', var: '--eve-radius-xs', zh: '安等 chip、星系 chip', en: 'Security chip, system chip' },
  { n: 'sm', v: '4px', var: '--eve-radius-sm', zh: 'Tab 计数徽标', en: 'Tab count badge' },
  { n: 'md', v: '6px', var: '--eve-radius-md', zh: 'Pill；系统最大圆角', en: 'Pill; the largest radius in the system' },
  { n: 'full', v: '50%', var: '', zh: '仅角色 / 军团头像', en: 'Character / corporation avatars only' },
];
const cuts: PropRow[] = [
  { name: 'cut.button', type: 'br 9px', notes: { zh: '主、次、危险按钮', en: 'Primary, secondary, negative buttons' } },
  { name: 'cut.dropdown', type: 'br 9px', notes: { zh: '展开时变直角', en: 'Becomes square when open' } },
  { name: 'cut.checkbox', type: 'all four, 2px', notes: { zh: '复选框', en: 'Checkbox' } },
];
const css = `.eve-cut-br {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--eve-cut)),
                     calc(100% - var(--eve-cut)) 100%, 0 100%);
}`;
const frame = `<!-- clip-path also clips the border, so a bordered cut is two layers -->
<div class="outer">   <!-- border colour + clip-path -->
  <div class="inner"> <!-- inset: 1px; fill colour + same clip-path, cut − 0.4px -->
    Label
  </div>
</div>

.outer { position: relative; background: var(--eve-border-primary); clip-path: polygon(…9px…); }
.inner { position: absolute; inset: 1px; background: var(--eve-bg-primary); clip-path: polygon(…8.6px…); }`;
</script>

<template>
  <DocPage>
    <DocSection id="radius" zh="圆角" en="Radius">
      <div class="row">
        <div v-for="r in radii" :key="r.n" class="rcell">
          <span class="rbox" :style="{ borderRadius: r.n === 'full' ? '50%' : r.var ? `var(${r.var})` : '0' }" />
          <span class="eve-text-highlighted">{{ r.n }} <span class="eve-mono eve-text-secondary">{{ r.v }}</span></span>
          <span class="eve-detail eve-text-secondary"><L :zh="r.zh" :en="r.en" /></span>
        </div>
      </div>
    </DocSection>

    <DocSection id="cuts" zh="切角" en="Cut corners">
      <p><L zh="切角是 EVE 的标志几何，代替圆角：只切一个或两个角，尺寸固定为 --eve-cut（9px）。" en="The cut corner is the signature EVE geometry and replaces rounding: one or two corners only, fixed at --eve-cut (9px)." /></p>
      <div class="row">
        <div class="cell"><div class="cut eve-cut-br" /><span class="eve-mono">.eve-cut-br</span></div>
        <div class="cell"><div class="cut eve-cut-bl" /><span class="eve-mono">.eve-cut-bl</span></div>
        <div class="cell"><div class="cut eve-cut-both" /><span class="eve-mono">.eve-cut-both</span></div>
        <div class="cell"><div class="cut" /><span class="eve-mono">none</span></div>
      </div>
      <CodeBlock :code="css" lang="css" />
      <PropsTable :rows="cuts" />
    </DocSection>

    <DocSection id="double-layer" zh="双层技术" en="Double-layer technique">
      <p><L zh="clip-path 会把 border 一起裁掉，所以带边框的切角用两层：外层是边框色加 clip-path，内层 inset 1px，填充色加同样的 clip-path，切角尺寸减 0.4px 以对齐斜边。EveFrame 已封装此做法。"
            en="clip-path clips the border too, so a bordered cut uses two layers: an outer one in the border colour with clip-path, and an inner one inset 1px in the fill colour with the same clip-path, the cut reduced by 0.4px to align the diagonal. EveFrame wraps this." /></p>
      <div class="row">
        <div class="cell">
          <div class="outer"><div class="inner"><L zh="外层 + 内层" en="Outer + inner" /></div></div>
          <span class="eve-detail eve-text-secondary"><L zh="双层" en="Double layer" /></span>
        </div>
        <div class="cell">
          <div class="cut eve-cut-br bordered-bad"><L zh="单层：边框被裁" en="Single layer: border lost" /></div>
          <span class="eve-detail eve-text-secondary"><L zh="错误" en="Wrong" /></span>
        </div>
      </div>
      <CodeBlock :code="frame" lang="html" />
    </DocSection>

    <DocSection id="where" zh="何处可用" en="Where cuts apply">
      <Rules
        :do="[
          { zh: '按钮、下拉框触发器：右下 9px；按钮组最左用左下、最右用右下。', en: 'Buttons and select triggers: bottom-right 9px; in a group, bottom-left on the first and bottom-right on the last.' },
          { zh: '复选框：四角 2px。', en: 'Checkbox: 2px on all four corners.' },
          { zh: '面板、输入框、表格、菜单、Tab：直角。', en: 'Panels, inputs, tables, menus, tabs: square.' },
        ]"
        :dont="[
          { zh: '不要大于 6px 的圆角、胶囊按钮或卡片圆角。', en: 'No radius above 6px, no pill buttons, no rounded cards.' },
          { zh: '不要给面板或输入框加切角。', en: 'Do not cut panels or inputs.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.row { display: flex; flex-wrap: wrap; gap: 16px; }
.cell, .rcell { display: flex; flex-direction: column; gap: 6px; }
.rcell { width: 150px; }
.rbox { width: 56px; height: 56px; background: var(--eve-bg-primary); border: 1px solid var(--eve-border-primary); }
.cut { width: 120px; height: var(--eve-control-height); display: flex; align-items: center; justify-content: center; background: var(--eve-bg-primary-light); }
.outer { position: relative; width: 160px; height: var(--eve-control-height); background: var(--eve-border-primary); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%); }
.inner { position: absolute; inset: 1px; display: flex; align-items: center; justify-content: center; background: var(--eve-bg-primary); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8.6px), calc(100% - 8.6px) 100%, 0 100%); }
.bordered-bad { width: 160px; border: 1px solid var(--eve-border-primary); background: var(--eve-bg-primary); }
</style>
