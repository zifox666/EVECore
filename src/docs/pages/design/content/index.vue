<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

const rows = [
  { n: 'Tritanium', p: 5.42, d: 0.12 },
  { n: 'Pyerite', p: 11.8, d: -0.31 },
  { n: 'Mexallon', p: 72.15, d: 1.04 },
];
const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const css = `.num { font-family: var(--eve-font-mono); font-variant-numeric: tabular-nums; text-align: right; }
.up   { color: var(--eve-isk-up); }   /* ▲ 0.12 */
.down { color: var(--eve-isk-down); } /* ▼ 0.31 */`;
</script>

<template>
  <DocPage>
    <DocSection id="rules" zh="Do 与 Don't" en="Do's and Don'ts">
      <Rules
        :do="[
          { zh: '把 Cryo Blue 留给激活、选中、焦点、主操作——一屏内青色应当“稀缺”。', en: 'Keep Cryo Blue for active, selected, focus and primary action; it should be scarce on a screen.' },
          { zh: '用文字透明度阶梯表达主次，用 header + Section Title 条表达分组。', en: 'Express hierarchy with the text-alpha ladder, and grouping with header + a Section Title bar.' },
          { zh: '按钮和下拉框用右下切角；面板、输入、表格用直角。', en: 'Buttons and selects use the bottom-right cut; panels, inputs and tables stay square.' },
          { zh: '交互用“变亮 + 发光”反馈，按下用闪白。', en: 'Interaction feedback is brighten + glow; press flashes white.' },
          { zh: '所有数字等宽、右对齐；所有星系显示都带安等色。', en: 'Every number is mono and right-aligned; every solar system shows its security colour.' },
          { zh: '保持高密度：32px 控件、14px 正文。', en: 'Stay dense: 32px controls, 14px body.' },
        ]"
        :dont="[
          { zh: '不要写辅助阅读的提示性文本。', en: 'No helper text.' },
          { zh: '不要大圆角（>6px）、胶囊按钮、卡片圆角。', en: 'No large radii (>6px), pill buttons or rounded cards.' },
          { zh: '不要用 box-shadow 投影分层；不要浅色或白色卡片。', en: 'No box-shadow layering; no light or white cards.' },
          { zh: '不要粗体标题。', en: 'No bold headings.' },
          { zh: '不要用彩色底块表达涨跌或状态（警告横幅除外，且底色极暗）。', en: 'No coloured fills for gain/loss or status (warning banners excepted, with a very dark fill).' },
          { zh: '不要引入第二个品牌色；琥珀、黄、安等色都是语义色。', en: 'No second brand colour; amber, yellow and security colours are semantic.' },
          { zh: '不要在 Web 上打包 EVE Sans Neue 字体。', en: 'Do not bundle EVE Sans Neue.' },
          { zh: '不要在静态元素上加辉光。', en: 'No glow on static elements.' },
        ]"
      />
    </DocSection>

    <DocSection id="no-helper" zh="不写辅助文本" en="No helper text">
      <p><L zh="界面只留标签、数据和简短状态（如“暂无挂单”）。功能介绍、操作说明、使用引导、数据口径备注、表头解释 tooltip、placeholder 举例、“（可多选）”之类的括号补充，一律不写。设计稿与实现都适用。"
            en="The UI keeps labels, data and short states (such as “No orders”). No feature intros, instructions, onboarding, data-definition notes, header-explaining tooltips, example placeholders or parenthetical hints like “(multi-select)”. Applies to mocks and implementation alike." /></p>
      <div class="pair">
        <div class="ex good">
          <span class="tag eve-detail"><span class="i-tabler-check ok" /> <L zh="好" en="Good" /></span>
          <div class="field"><span class="eve-text-secondary"><L zh="星系" en="System" /></span></div>
          <div class="field"><span class="eve-text-secondary"><L zh="搜索" en="Search" /></span></div>
          <div class="eve-text-secondary"><L zh="暂无挂单" en="No orders" /></div>
        </div>
        <div class="ex bad">
          <span class="tag eve-detail"><span class="i-tabler-x no" /> <L zh="坏" en="Bad" /></span>
          <div class="field"><span class="eve-text-disabled"><L zh="星系（可多选）" en="System (multi-select)" /></span></div>
          <div class="field"><span class="eve-text-disabled"><L zh="例如：Jita、Amarr" en="e.g. Jita, Amarr" /></span></div>
          <div class="eve-text-secondary"><L zh="这里显示你在该星系的所有挂单，点击行可查看详情。" en="Your orders in this system appear here. Click a row to see details." /></div>
        </div>
      </div>
    </DocSection>

    <DocSection id="numbers" zh="数字格式" en="Number formatting">
      <p><L zh="ISK、价格、数量一律等宽、千分位、右对齐。涨跌只改文字色并前置 ▲▼，不加底色。" en="ISK, prices and quantities are mono, thousands-separated and right-aligned. Gain and loss colour the text and prefix ▲▼; never a fill." /></p>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th><L zh="物品" en="Item" /></th><th class="r"><L zh="价格" en="Price" /></th><th class="r"><L zh="涨跌" en="Change" /></th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.n">
              <td>{{ r.n }}</td>
              <td class="r eve-num">{{ fmt(r.p) }}</td>
              <td class="r eve-num" :class="r.d >= 0 ? 'up' : 'down'">{{ r.d >= 0 ? '▲' : '▼' }} {{ fmt(Math.abs(r.d)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="eve-mono eve-text-highlighted">1,284,500,000.00 ISK</p>
      <CodeBlock :code="css" lang="css" />
    </DocSection>

    <DocSection id="labels" zh="大写短标签" en="Uppercase short labels">
      <div class="pair">
        <span class="eve-label-caps eve-text-primary">Highsec</span>
        <span class="eve-label-caps eve-text-success">Online</span>
        <span class="eve-label-caps eve-text-primary">Docked</span>
      </div>
      <p><L zh="大写只给 HIGHSEC、ONLINE 这样的短标签，配 0.5px 字距；句子与标题不大写。" en="Caps only for short labels such as HIGHSEC or ONLINE, with 0.5px tracking; never sentences or headings." /></p>
    </DocSection>

    <DocSection id="language" zh="中英文" en="Chinese and English">
      <Rules
        :do="[
          { zh: '中文字号与英文同级；中文不加 0.5px 字距，不做大写。', en: 'Chinese uses the same size as English; no 0.5px tracking and no case transform on Chinese.' },
          { zh: '游戏专有名词（星系、物品、舰船）保留 EVE 官方译名。', en: 'Keep official EVE names for systems, items and ships.' },
          { zh: '按钮标签用动词开头的 1–3 个词。', en: 'Button labels are 1–3 words starting with a verb.' },
        ]"
        :dont="[
          { zh: '不要中英混排同一个短标签。', en: 'Do not mix both languages in a single short label.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.pair { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
.ex { flex: 1 1 280px; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--eve-window-border); }
.tag { display: flex; gap: 4px; align-items: center; color: var(--eve-text-secondary); }
.field { height: var(--eve-control-height); display: flex; align-items: center; padding: 0 7px; background: rgba(7, 7, 7, 0.5); border: 1px solid var(--eve-border-grey); }
.ok { color: var(--eve-success); }
.no { color: var(--eve-danger); }
.tbl-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.tbl { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 4px 8px; font: var(--eve-text-body); color: var(--eve-text-secondary); border-bottom: 1px solid var(--eve-border-grey-light); }
td { padding: 2px 8px; }
.r { text-align: right; }
.up { color: var(--eve-isk-up); }
.down { color: var(--eve-isk-down); }
.eve-text-success { color: var(--eve-success); }
</style>
