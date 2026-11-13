<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

const steps = [
  { n: 'xxs', px: 2, zh: '表格行垂直 padding、chip 垂直 padding', en: 'Table row vertical padding, chip vertical padding' },
  { n: 'xs', px: 4, zh: '图标与文字间距、Pill 垂直 padding', en: 'Icon-to-text gap, pill vertical padding' },
  { n: 'sm', px: 8, zh: '单元格水平 padding、Tab 内边距、面板间距', en: 'Cell horizontal padding, tab padding, panel gap' },
  { n: 'md', px: 12, zh: '宽 Tab、标题栏左右边距', en: 'Wide tab, title bar side margin' },
  { n: 'lg', px: 16, zh: '窗口内容区 padding、Tooltip padding', en: 'Window content padding, tooltip padding' },
  { n: 'xl', px: 24, zh: '大区块间距', en: 'Large block gap' },
];
const density = [
  { k: 'control', d: '32px', m: '40px', var: '--eve-control-height', zh: '输入框、下拉框、按钮', en: 'Inputs, selects, buttons' },
  { k: 'menu item', d: '21px', m: '40px', var: '--eve-menu-item-height', zh: '菜单项', en: 'Menu item' },
  { k: 'option', d: '31px', m: '40px', var: '--eve-option-height', zh: '下拉选项', en: 'Select option' },
  { k: 'table row', d: '≈ 22px', m: '—', var: '', zh: '14px 字 + 2×2px padding', en: '14px text + 2×2px padding' },
];
const bps = [
  { n: 'Mobile', w: '< 640px', zh: '侧栏为抽屉；单列堆叠；表格改卡片列表；标题栏用 Small（32px）', en: 'Sidebar becomes a drawer; single column; tables become card lists; Small title bar (32px)' },
  { n: 'Tablet', w: '640–1024px', zh: '侧栏折叠为 64px 图标列；面板 2 列', en: 'Sidebar collapsed to a 64px icon rail; 2 panel columns' },
  { n: 'Desktop', w: '1024–1600px', zh: '侧栏 220px；面板自由网格', en: '220px sidebar; free panel grid' },
  { n: 'Wide', w: '> 1600px', zh: '不限宽，继续铺满；星图面板可浮动', en: 'No max width, keep filling; star-map panels may float' },
];
const grid = `.workspace {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--eve-space-sm); /* panels sit tight, like ship displays */
}`;
</script>

<template>
  <DocPage>
    <DocSection id="scale" zh="间距阶梯" en="Spacing scale">
      <div class="bars">
        <div v-for="s in steps" :key="s.n" class="bar-row">
          <code>--eve-space-{{ s.n }}</code>
          <span class="eve-mono eve-text-secondary px">{{ s.px }}px</span>
          <span class="bar" :style="{ width: `${s.px * 4}px` }" />
          <span class="eve-detail eve-text-secondary"><L :zh="s.zh" :en="s.en" /></span>
        </div>
      </div>
      <p><L zh="没有 48/96px 的大留白。最大常规间距 24px，页面级区块之间用 16–24px。" en="No 48/96px whitespace. The largest routine gap is 24px; use 16–24px between page-level blocks." /></p>
    </DocSection>

    <DocSection id="density" zh="密度" en="Density">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th><L zh="元素" en="Element" /></th><th><L zh="桌面" en="Desktop" /></th><th><L zh="移动端" en="Mobile" /></th><th>Token</th><th><L zh="用途" en="Use" /></th></tr></thead>
          <tbody>
            <tr v-for="d in density" :key="d.k">
              <td class="eve-text-highlighted">{{ d.k }}</td><td class="eve-mono">{{ d.d }}</td><td class="eve-mono">{{ d.m }}</td>
              <td><code>{{ d.var || '—' }}</code></td><td class="eve-text-secondary"><L :zh="d.zh" :en="d.en" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="dens">
        <div class="ctl eve-mono">32px</div>
        <div class="mi eve-mono">21px</div>
        <div class="rowx eve-mono">22px</div>
      </div>
      <p><L zh="比通用组件库默认的 34px 更紧凑。移动端触控目标升到 40px，桌面保持高密度。" en="Tighter than the 34px default of generic libraries. Touch targets rise to 40px on mobile; desktop stays dense." /></p>
    </DocSection>

    <DocSection id="grid" zh="网格与容器" en="Grid and container">
      <Rules
        :do="[
          { zh: '应用内页面铺满可用宽度，不设 max-width；内容以窗口面板拼接。', en: 'In-app pages fill the available width with no max-width; content is assembled from window panels.' },
          { zh: '开始页可居中，最大宽 1200px。', en: 'A start page may be centred, 1200px at most.' },
          { zh: '多面板用 CSS Grid，面板间距 8px。', en: 'Multi-panel layouts use CSS Grid with an 8px gap.' },
        ]"
      />
      <CodeBlock :code="grid" lang="css" />
    </DocSection>

    <DocSection id="breakpoints" zh="响应式断点" en="Responsive breakpoints">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th><L zh="断点" en="Breakpoint" /></th><th><L zh="宽度" en="Width" /></th><th><L zh="变化" en="Changes" /></th></tr></thead>
          <tbody>
            <tr v-for="b in bps" :key="b.n"><td class="eve-text-highlighted">{{ b.n }}</td><td class="eve-mono">{{ b.w }}</td><td class="eve-text-secondary"><L :zh="b.zh" :en="b.en" /></td></tr>
          </tbody>
        </table>
      </div>
    </DocSection>
  </DocPage>
</template>

<style scoped>
.bars { display: flex; flex-direction: column; gap: 6px; }
.bar-row { display: grid; grid-template-columns: 150px 40px 100px 1fr; align-items: center; gap: 8px; }
.bar { height: 8px; background: var(--eve-primary); }
.px { text-align: right; }
code { font: 12.5px var(--eve-font-mono); color: var(--eve-text-special); }
.tbl-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.tbl { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 4px 8px; font: var(--eve-text-body); color: var(--eve-text-secondary); border-bottom: 1px solid var(--eve-border-grey-light); white-space: nowrap; }
td { padding: 4px 8px; vertical-align: top; }
.dens { display: flex; align-items: flex-start; gap: 16px; }
.dens > div { display: flex; align-items: center; padding: 0 8px; font-size: 12px; color: var(--eve-text-secondary); }
.ctl { width: 120px; height: 32px; background: var(--eve-bg-primary); border: 1px solid var(--eve-border-primary); }
.mi { width: 120px; height: 21px; background: var(--eve-bg-hovered); }
.rowx { width: 120px; height: 22px; background: var(--eve-bg-hovered); }
@media (max-width: 640px) { .bar-row { grid-template-columns: 1fr 40px 60px; } .bar-row > :last-child { grid-column: 1 / -1; } }
</style>
