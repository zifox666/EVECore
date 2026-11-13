<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

const states = [
  { k: 'normal', zh: '默认面', en: 'Resting face' },
  { k: 'hover', zh: '背景变亮、边框变亮、出现辉光', en: 'Fill and border brighten, glow appears' },
  { k: 'press', zh: '瞬间闪白 #EAEAEA，文字变深', en: 'Instant #EAEAEA flash, dark text' },
  { k: 'selected', zh: '青色底 + 边框；列表用 bg-selected', en: 'Cyan fill and border; lists use bg-selected' },
  { k: 'disabled', zh: '保持 normal 面，文字 text-disabled，无 hover', en: 'Normal face, text-disabled, no hover' },
  { k: 'focus', zh: '1px primary-light 轮廓，无外发光圈', en: '1px primary-light outline, no halo' },
];
const css = `.btn            { background: var(--eve-bg-primary); border: 1px solid var(--eve-border-primary); }
.btn:hover      { background: var(--eve-bg-primary-light); border-color: var(--eve-border-primary-light); }
.btn:active,
.btn.is-pressed { background: var(--eve-bg-press); border-color: var(--eve-bg-press); color: var(--eve-text-on-press); }
.btn:disabled   { color: var(--eve-text-disabled); }
.btn:focus-visible { outline: 1px solid var(--eve-border-primary-light); outline-offset: 1px; }`;
const flash = `import { usePressFlash } from '@/lib/utils';

const { pressed, handlers } = usePressFlash(); // pressed stays true ~150ms after release
// <button v-on="handlers" :class="{ 'is-pressed': pressed }">`;
</script>

<template>
  <DocPage>
    <DocSection id="states" zh="六种状态" en="The six states">
      <p><L zh="每个交互组件都必须定义 Normal / Hover / Press；以下用类名模拟，不依赖具体组件。" en="Every interactive component defines Normal, Hover and Press. These swatches simulate states with classes, independent of any component." /></p>
      <div class="grid">
        <div v-for="s in states" :key="s.k" class="cell">
          <span class="sw" :class="`s-${s.k}`" :tabindex="s.k === 'disabled' ? -1 : 0">{{ s.k }}</span>
          <span class="eve-detail eve-text-secondary"><L :zh="s.zh" :en="s.en" /></span>
        </div>
      </div>
      <CodeBlock :code="css" lang="css" />
    </DocSection>

    <DocSection id="lights-up" zh="“亮起来”" en="Lights up">
      <p><L zh="反馈是变亮，不是变暗、位移或阴影：背景更亮、边框更亮、文字升到 highlighted，需要时加辉光。下面两行可实际悬停。" en="Feedback means getting brighter, never darker, moved or shadowed: brighter fill, brighter border, text up to highlighted, glow when needed. Hover the rows below." /></p>
      <div class="rows">
        <div class="r">Tritanium <span class="eve-mono">5.42</span></div>
        <div class="r r-sel">Pyerite <span class="eve-mono">11.80</span></div>
        <div class="r">Mexallon <span class="eve-mono">72.15</span></div>
      </div>
    </DocSection>

    <DocSection id="press" zh="按下闪白" en="Press flash">
      <p><L zh="按下即白（#EAEAEA），松开约 150ms 回落。这是 EVE 按钮手感的核心，不可省略。点击试一下。" en="White the instant it is pressed (#EAEAEA), released over ~150ms. It is the core of the EVE button feel and is never optional. Click to try." /></p>
      <button class="sw s-hover try" type="button">Undock</button>
      <CodeBlock :code="flash" lang="ts" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '禁用保持 normal 面，只降低文字透明度。', en: 'Disabled keeps the normal face and only lowers text alpha.' },
          { zh: '焦点用 1px 轮廓，不用外发光圈。', en: 'Focus is a 1px outline, not a glow ring.' },
        ]"
        :dont="[
          { zh: '不要在静态元素上加辉光；辉光只代表激活或可交互。', en: 'No glow on static elements; glow means active or interactive.' },
          { zh: '不要用变暗表示 hover。', en: 'Do not darken to show hover.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.cell { display: flex; flex-direction: column; gap: 6px; }
.sw {
  display: inline-flex; align-items: center; justify-content: center; width: 120px; height: var(--eve-control-height); font: var(--eve-text-body);
  color: var(--eve-text-primary); background: var(--eve-bg-primary); border: 1px solid var(--eve-border-primary); outline-offset: 1px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%); text-shadow: var(--eve-text-glow);
}
.s-hover { background: var(--eve-bg-primary-light); border-color: var(--eve-border-primary-light); color: var(--eve-text-highlighted); }
.s-press { background: var(--eve-bg-press); border-color: var(--eve-bg-press); color: var(--eve-text-on-press); text-shadow: none; }
.s-selected { background: var(--eve-bg-selected); border-color: var(--eve-primary); color: var(--eve-text-highlighted); }
.s-disabled { color: var(--eve-text-disabled); }
.s-focus { outline: 1px solid var(--eve-border-primary-light); clip-path: none; }
.try { cursor: pointer; font: inherit; transition: background-color var(--eve-dur-press-release) ease-out, color var(--eve-dur-press-release) ease-out, border-color var(--eve-dur-press-release) ease-out; }
.try:hover { background: var(--eve-bg-primary-light); }
.try:active { background: var(--eve-bg-press); border-color: var(--eve-bg-press); color: var(--eve-text-on-press); transition-duration: 0ms; }
.rows { width: 320px; border: 1px solid var(--eve-window-border); }
.r { display: flex; justify-content: space-between; padding: 2px 8px; color: var(--eve-text-primary); transition: background-color var(--eve-dur-row) ease-out, color var(--eve-dur-row) ease-out; }
.r:hover { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); }
.r-sel { background: var(--eve-bg-selected); color: var(--eve-text-highlighted); }
</style>
