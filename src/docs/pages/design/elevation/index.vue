<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L, Rules } from '../../../kit';

const levels = [
  { n: 0, zh: '画布', en: 'Canvas', how: 'window-bg + dots', use: { zh: '页面底', en: 'Page base' } },
  { n: 1, zh: '面板', en: 'Panel', how: '1px window-border', use: { zh: '所有卡片 / 窗口', en: 'All cards / windows' } },
  { n: 2, zh: '次级块', en: 'Secondary', how: 'window-bg-secondary', use: { zh: '面板内的分组', en: 'Groups inside a panel' } },
  { n: 3, zh: '激活', en: 'Active', how: '1px border-primary top + 2px/6px glow', use: { zh: '聚焦的面板', en: 'Focused panel' } },
  { n: 4, zh: '浮层', en: 'Overlay', how: 'window-bg @95% + 1px border-grey', use: { zh: 'Tooltip、下拉、右键菜单', en: 'Tooltip, dropdown, context menu' } },
];
const dots = `background-image: var(--eve-dots); /* radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px) */
background-size: var(--eve-dots-size); /* 4px 4px */`;
const glowLine = `.item { position: relative; }
.item::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1px; background: var(--eve-primary); }
.item::after  { content: ''; position: absolute; inset: 0 auto 0 0; width: 5px;
                background: color-mix(in srgb, var(--eve-primary) 10%, transparent); } /* 50% on hover / selected */`;
const glass = `.floating {
  background: rgba(7, 7, 7, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}`;
</script>

<template>
  <DocPage>
    <p><L zh="EVE 不用投影表达层级。手段按优先级：边框、背景明度差、发光。" en="EVE never uses drop shadows for depth. In priority order: borders, tonal steps, glow." /></p>

    <DocSection id="levels" zh="五个层级" en="Five levels">
      <div class="stack">
        <div class="l0 eve-dots">
          <span class="tag eve-detail">0 · <L zh="画布" en="Canvas" /></span>
          <div class="l1">
            <span class="tag eve-detail">1 · <L zh="面板" en="Panel" /></span>
            <div class="l2"><span class="tag eve-detail">2 · <L zh="次级块" en="Secondary" /></span></div>
            <div class="l3"><span class="tag eve-detail">3 · <L zh="激活" en="Active" /></span></div>
            <div class="l4"><span class="tag eve-detail">4 · <L zh="浮层" en="Overlay" /></span></div>
          </div>
        </div>
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th><L zh="层级" en="Level" /></th><th><L zh="手段" en="Means" /></th><th><L zh="用途" en="Use" /></th></tr></thead>
          <tbody>
            <tr v-for="l in levels" :key="l.n">
              <td class="eve-text-highlighted">{{ l.n }} · <L :zh="l.zh" :en="l.en" /></td>
              <td><code>{{ l.how }}</code></td>
              <td class="eve-text-secondary"><L :zh="l.use.zh" :en="l.use.en" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocSection>

    <DocSection id="dots" zh="点阵背景" en="Background dots">
      <div class="pair">
        <div class="dotbox eve-dots"><span class="eve-detail">dots</span></div>
        <div class="dotbox dotbox-active"><span class="eve-detail">dots-active</span></div>
      </div>
      <CodeBlock :code="dots" lang="css" />
    </DocSection>

    <DocSection id="glow" zh="发光" en="Glow">
      <p><L zh="只用于激活、悬停、选中，不作静态装饰。" en="Only for active, hover and selected states; never static decoration." /></p>
      <div class="pair">
        <div class="gbox">static</div>
        <div class="gbox glow">active · 0 0 6px</div>
      </div>
    </DocSection>

    <DocSection id="glow-line" zh="竖向发光线" en="Vertical glow line">
      <p><L zh="列表项左侧 1px 实线加 5px 同色半透明带（默认 10%，悬停/选中 50%）。用于导航选中项、告警条目、敌对标记。" en="A 1px solid line plus a 5px translucent band of the same colour on the left of a list item (10% by default, 50% on hover/selected). For selected nav items, alerts, hostile markers." /></p>
      <div class="pair">
        <div class="vl">Jita</div>
        <div class="vl vl-hover">Perimeter</div>
        <div class="vl vl-danger">Hostile</div>
      </div>
      <CodeBlock :code="glowLine" lang="css" />
    </DocSection>

    <DocSection id="transparent" zh="透明窗口模式" en="Transparent window mode">
      <p><L zh="星图页的浮动面板用 40% 不透明底，边框 rgba(255,255,255,.1)，backdrop-filter: blur(8px)。" en="Floating panels over the star map use a 40% opaque fill, a rgba(255,255,255,.1) border and backdrop-filter: blur(8px)." /></p>
      <div class="map">
        <div class="glass"><div class="eve-header">Jita</div><div class="eve-mono eve-text-secondary">0.9 · The Forge</div></div>
      </div>
      <CodeBlock :code="glass" lang="css" />
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[{ zh: '用边框、明度差与发光分层。', en: 'Layer with borders, tonal steps and glow.' }]"
        :dont="[{ zh: '不用 box-shadow 投影分层；不用浅色或白色卡片。', en: 'No drop-shadow layering; no light or white cards.' }, { zh: '静态元素不加辉光。', en: 'No glow on static elements.' }]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.stack { border: 1px solid var(--eve-window-border); }
.l0 { padding: 16px; background-color: var(--eve-window-bg); position: relative; min-height: 200px; }
.l1 { position: relative; margin-top: 8px; padding: 32px 16px 16px; background: var(--eve-window-bg); border: 1px solid var(--eve-window-border); display: flex; flex-wrap: wrap; gap: 8px; }
.l1 > .tag { position: absolute; top: 6px; left: 8px; }
.l2 { background: var(--eve-window-bg-secondary); padding: 8px; width: 160px; height: 72px; }
.l3 { background: var(--eve-window-bg); padding: 8px; width: 160px; height: 72px; border: 1px solid var(--eve-window-border-active); border-top: 1px solid var(--eve-border-primary); box-shadow: 0 -2px 6px var(--eve-border-primary); }
.l4 { background: var(--eve-overlay-bg); border: 1px solid var(--eve-overlay-border); padding: 8px; width: 160px; height: 72px; }
.tag { color: var(--eve-text-secondary); }
.tbl-wrap { overflow-x: auto; border: 1px solid var(--eve-window-border); }
.tbl { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 4px 8px; font: var(--eve-text-body); color: var(--eve-text-secondary); border-bottom: 1px solid var(--eve-border-grey-light); white-space: nowrap; }
td { padding: 4px 8px; vertical-align: top; }
code { font: 12.5px var(--eve-font-mono); color: var(--eve-text-special); }
.pair { display: flex; flex-wrap: wrap; gap: 16px; }
.dotbox { width: 200px; height: 80px; padding: 8px; background-color: var(--eve-window-bg); border: 1px solid var(--eve-window-border); color: var(--eve-text-secondary); }
.dotbox-active { background-image: var(--eve-dots-active); background-size: var(--eve-dots-size); }
.gbox { width: 200px; height: 56px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--eve-border-primary-dark); color: var(--eve-text-secondary); transition: box-shadow var(--eve-dur-window) ease-out; }
.gbox.glow { border-color: var(--eve-border-primary); box-shadow: var(--eve-glow-active); color: var(--eve-text-highlighted); }
.vl { --c: var(--eve-primary); position: relative; width: 160px; padding: 4px 12px; background: var(--eve-window-bg); color: var(--eve-text-primary); }
.vl::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1px; background: var(--c); }
.vl::after { content: ''; position: absolute; inset: 0 auto 0 0; width: 5px; background: var(--c); opacity: 0.1; transition: opacity var(--eve-dur-row) ease-out; }
.vl:hover::after, .vl-hover::after { opacity: 0.5; }
.vl-danger { --c: var(--eve-danger); }
.map { height: 180px; padding: 16px; border: 1px solid var(--eve-window-border); background:
  radial-gradient(circle at 20% 30%, var(--eve-primary-blue) 0 2px, transparent 3px),
  radial-gradient(circle at 70% 60%, var(--eve-sec-08) 0 2px, transparent 3px),
  radial-gradient(circle at 45% 75%, var(--eve-sec-05) 0 2px, transparent 3px),
  radial-gradient(circle at 85% 20%, var(--eve-aura-purple) 0 2px, transparent 3px),
  radial-gradient(ellipse at 30% 40%, var(--eve-smoke-blue), transparent 55%),
  var(--eve-map-bg); }
.glass { width: 200px; padding: 12px; background: rgba(7, 7, 7, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); }
</style>
