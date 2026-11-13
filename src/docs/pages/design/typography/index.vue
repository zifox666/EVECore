<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

type Lvl = { key: string; px: string; w: string; ls: string; font: string; zh: string; en: string; cls?: string };
const levels: Lvl[] = [
  { key: 'display', px: '24', w: '400', ls: '0', font: 'var(--eve-text-display)', zh: '页面主标题、星系大名', en: 'Page title, system name' },
  { key: 'headline', px: '19', w: '400', ls: '0', font: 'var(--eve-text-headline)', zh: '窗口标题栏（Full）', en: 'Window title bar (Full)' },
  { key: 'header', px: '16', w: '400', ls: '0', font: 'var(--eve-text-header)', zh: 'Section 标题、小窗口标题', en: 'Section title, small window title' },
  { key: 'body', px: '14', w: '400', ls: '0', font: 'var(--eve-text-body)', zh: '默认正文、按钮、单元格', en: 'Default text, buttons, cells' },
  { key: 'body-link', px: '14', w: '700', ls: '0', font: 'var(--eve-text-body-link)', zh: '游戏内链接（琥珀色）', en: 'In-game link (amber)' },
  { key: 'detail', px: '12', w: '400', ls: '0.5px', font: 'var(--eve-text-detail)', zh: '说明、chip、元信息', en: 'Captions, chips, meta' },
  { key: 'detail-bold', px: '12', w: '700', ls: '0.5px', font: 'var(--eve-text-detail-bold)', zh: '小标签强调', en: 'Small label emphasis' },
  { key: 'number', px: '=', w: '400', ls: '0', font: 'var(--eve-text-body)', zh: '同所在级，等宽', en: 'Same level, mono', cls: 'mono' },
];
const colors = [
  { n: 'highlighted', v: 'var(--eve-text-highlighted)' },
  { n: 'primary', v: 'var(--eve-text-primary)' },
  { n: 'secondary', v: 'var(--eve-text-secondary)' },
  { n: 'disabled', v: 'var(--eve-text-disabled)' },
];
const stacks = `--eve-font-sans: 'Barlow', 'HarmonyOS Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
--eve-font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;`;
const load = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap">`;
const usage = `.title  { font: var(--eve-text-header); color: var(--eve-text-highlighted); }
.meta   { font: var(--eve-text-detail); letter-spacing: var(--eve-tracking-detail); }
.amount { font-family: var(--eve-font-mono); font-variant-numeric: tabular-nums; text-align: right; }`;
</script>

<template>
  <DocPage>
    <DocSection id="families" zh="字体" en="Font families">
      <div class="fam">
        <div class="fam-cell">
          <span class="eve-detail eve-text-secondary">Barlow · <L zh="正文" en="Text" /></span>
          <span class="big" style="font-family: var(--eve-font-sans)">Rifter Jita 4-4 舰船 星系</span>
          <span style="font-family: var(--eve-font-sans)">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</span>
        </div>
        <div class="fam-cell">
          <span class="eve-detail eve-text-secondary">JetBrains Mono · <L zh="数字" en="Numbers" /></span>
          <span class="big eve-mono">1,284,500.00 ISK</span>
          <span class="eve-mono">0123456789 -0.3 ▲ 12:04:31</span>
        </div>
        <div class="fam-cell">
          <span class="eve-detail eve-text-secondary">Triglavian · <L zh="彩蛋装饰" en="Easter egg" /></span>
          <span class="big" style="font-family: 'Triglavian', var(--eve-font-sans)">Rifter Jita 4-4</span>
          <span style="font-family: 'Triglavian', var(--eve-font-sans)">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</span>
          <a class="fam-link eve-detail" href="https://www.dropbox.com/s/kg0k1m804kbczmm/triglavian-completed.otf?dl=1" target="_blank" rel="noopener noreferrer"><L zh="下载 Triglavian.otf" en="Download Triglavian.otf" /></a>
        </div>
      </div>
      <CodeBlock :code="stacks" lang="css" />
      <CodeBlock :code="load" lang="html" />
    </DocSection>

    <DocSection id="hierarchy" zh="字阶" en="Hierarchy">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Token</th><th><L zh="字号/字重/字距" en="Size / weight / tracking" /></th>
              <th v-for="c in colors" :key="c.n">{{ c.n }}</th>
              <th><L zh="用途" en="Use" /></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in levels" :key="l.key">
              <td><code>{{ l.key }}</code></td>
              <td class="eve-mono meta">{{ l.px }}px · {{ l.w }} · {{ l.ls }}</td>
              <td v-for="c in colors" :key="c.n" :style="{ font: l.font, color: c.v, letterSpacing: l.ls === '0' ? 0 : l.ls }" :class="{ num: l.cls }">
                <template v-if="l.cls">1,284.50</template>
                <template v-else>Rifter 战列</template>
              </td>
              <td class="meta"><L :zh="l.zh" :en="l.en" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <CodeBlock :code="usage" lang="css" />
    </DocSection>

    <DocSection id="principles" zh="原则" en="Principles">
      <Rules
        :do="[
          { zh: '标题全部 400 字重；层级靠字号与亮度（highlighted 对 primary）。粗体只给链接与 detail-bold。', en: 'Headings are all weight 400; hierarchy comes from size and brightness (highlighted vs primary). Bold is for links and detail-bold only.' },
          { zh: '全局 text-shadow: 1px 1px 0 rgba(0,0,0,.5)；按钮文字改为 0 0 3px 的柔光。', en: 'Global text-shadow: 1px 1px 0 rgba(0,0,0,.5); button text uses a 0 0 3px soft glow instead.' },
          { zh: '大写只用于短标签（HIGHSEC、ONLINE），配 detail 的 0.5px 字距。', en: 'Caps only on short labels (HIGHSEC, ONLINE), with the 0.5px tracking of detail.' },
          { zh: '所有数字列等宽、右对齐。', en: 'Every number column is mono and right-aligned.' },
        ]"
        :dont="[
          { zh: '标题不加粗，不用 600/700 做层级。', en: 'No bold headings; never use 600/700 for hierarchy.' },
          { zh: '中文不做大写处理，也不加字距。', en: 'No case transform and no tracking on Chinese.' },
          { zh: '不在 Web 上打包 EVE Sans Neue；Triglavian 字体只做彩蛋装饰，不承载信息。', en: 'Do not bundle EVE Sans Neue; the Triglavian face is easter-egg decoration only, never information.' },
        ]"
      />
      <div class="demo-pair">
        <div class="pcell"><span class="eve-detail eve-text-secondary">detail</span><span class="eve-label-caps">Highsec · Online</span></div>
        <div class="pcell"><span class="eve-detail eve-text-secondary">zh</span><span class="eve-detail">高安 · 在线</span></div>
      </div>
    </DocSection>
  </DocPage>
</template>

<style scoped>
.fam { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px; }
.fam-link { color: var(--eve-text-external-link); text-decoration: none; align-self: flex-start; }
.fam-link:hover { text-decoration: underline; }
.fam-cell { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid var(--eve-window-border); background: var(--eve-window-bg); }
.big { font-size: 24px; color: var(--eve-text-highlighted); }
.tbl-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.tbl { width: 100%; border-collapse: collapse; white-space: nowrap; }
th { text-align: left; padding: 4px 8px; font: var(--eve-text-body); color: var(--eve-text-secondary); border-bottom: 1px solid var(--eve-border-grey-light); }
td { padding: 4px 8px; vertical-align: baseline; }
td.num { font-family: var(--eve-font-mono); font-variant-numeric: tabular-nums; }
.meta { color: var(--eve-text-secondary); font-size: 12px; }
code { font: 12.5px var(--eve-font-mono); color: var(--eve-text-special); }
.demo-pair { display: flex; gap: 8px; }
.pcell { display: flex; flex-direction: column; gap: 2px; padding: 8px 12px; border: 1px solid var(--eve-window-border); min-width: 140px; }
</style>
