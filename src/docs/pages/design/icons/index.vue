<script setup lang="ts">
import { DocPage, DocSection, L, Rules } from '../../../kit';
</script>

<template>
  <DocPage>
    <DocSection id="source" zh="来源与许可" en="Source and licence">
      <p><L zh="EVE 图标集共 144 个，来自 eve-icons（对 CCP 客户端图标的 SVG 描摹），已转为单色 currentColor。图标属于 CCP Games，按 CCP 第三方开发者许可使用；上游仓库没有自己的许可证。" en="The EVE set has 144 icons from eve-icons, SVG traces of the CCP client icons, converted to monochrome currentColor. The icons belong to CCP Games and are used under the CCP third-party developer licence; the upstream repo has no licence of its own." /></p>
      <p><L zh="Tabler 线性图标只用于没有 EVE 对应物的通用控件。完整图标库与复制类名见组件页 Icon。" en="Tabler line icons are used only for generic controls with no EVE equivalent. The full gallery with copy-to-clipboard is on the Icon component page." /></p>
    </DocSection>

    <DocSection id="sizes" zh="尺寸" en="Sizes">
      <div class="sizes">
        <figure><span class="i-eve-wallet" style="font-size: 16px" /><figcaption class="eve-mono">16px</figcaption><span class="eve-detail"><L zh="默认" en="Default" /></span></figure>
        <figure><span class="i-eve-wallet" style="font-size: 24px" /><figcaption class="eve-mono">24px</figcaption><span class="eve-detail"><L zh="折叠导航" en="Collapsed nav" /></span></figure>
        <figure><span class="i-eve-wallet" style="font-size: 32px" /><figcaption class="eve-mono">32px</figcaption><span class="eve-detail"><L zh="完整面板标题栏" en="Full panel title bar" /></span></figure>
      </div>
    </DocSection>

    <DocSection id="colour" zh="颜色" en="Colour">
      <p><L zh="图标永远跟随文字颜色：静止 secondary，悬停 highlighted，激活 primary。" en="An icon always follows its text colour: secondary at rest, highlighted on hover, primary when active." /></p>
      <div class="states">
        <span class="s rest"><span class="i-eve-market" /> Market <small class="eve-detail">rest</small></span>
        <span class="s hover"><span class="i-eve-market" /> Market <small class="eve-detail">hover</small></span>
        <span class="s active"><span class="i-eve-market" /> Market <small class="eve-detail">active</small></span>
      </div>
      <p><L zh="在文字里与按钮里：" en="Inline in text and in a button:" /></p>
      <div class="states">
        <span class="s rest"><span class="i-eve-info" /> <L zh="跳跃距离 4.2 光年" en="Jump range 4.2 ly" /></span>
        <button class="btn" type="button"><span class="i-eve-station" /> Undock</button>
        <button class="btn" type="button"><span class="i-eve-map" /> Set Destination</button>
      </div>
    </DocSection>

    <DocSection id="choosing" zh="EVE 还是 Tabler" en="EVE or Tabler">
      <p><L zh="先找 EVE 图标；只有没有对应物的通用控件才用 Tabler：" en="Look for an EVE icon first; use Tabler only for generic controls that have no equivalent:" /></p>
      <table class="tbl">
        <thead><tr><th><L zh="用途" en="Purpose" /></th><th><L zh="图标" en="Icon" /></th><th><L zh="类名" en="Class" /></th></tr></thead>
        <tbody>
          <tr><td><L zh="展开 / 折叠" en="Expand / collapse" /></td><td><span class="i-tabler-chevron-down" /> <span class="i-tabler-chevron-right" /></td><td class="eve-mono">i-tabler-chevron-down, -right</td></tr>
          <tr><td><L zh="关闭" en="Close" /></td><td><span class="i-tabler-x" /></td><td class="eve-mono">i-tabler-x</td></tr>
          <tr><td><L zh="确认" en="Check" /></td><td><span class="i-tabler-check" /></td><td class="eve-mono">i-tabler-check</td></tr>
          <tr><td><L zh="添加 / 移除" en="Add / remove" /></td><td><span class="i-tabler-plus" /> <span class="i-tabler-minus" /></td><td class="eve-mono">i-tabler-plus, -minus</td></tr>
          <tr><td><L zh="复制" en="Copy" /></td><td><span class="i-tabler-copy" /></td><td class="eve-mono">i-tabler-copy</td></tr>
          <tr><td><L zh="外部链接" en="External link" /></td><td><span class="i-tabler-external-link" /></td><td class="eve-mono">i-tabler-external-link</td></tr>
          <tr><td><L zh="搜索放大镜" en="Search magnifier" /></td><td><span class="i-tabler-search" /></td><td class="eve-mono">i-tabler-search</td></tr>
          <tr><td><L zh="菜单 / 更多" en="Menu / more" /></td><td><span class="i-tabler-menu-2" /> <span class="i-tabler-dots" /></td><td class="eve-mono">i-tabler-menu-2, -dots</td></tr>
        </tbody>
      </table>
    </DocSection>

    <DocSection id="rules" zh="规则" en="Rules">
      <Rules
        :do="[
          { zh: '16px 默认；折叠导航 24px；完整面板标题栏 32px。', en: '16px by default; 24px in collapsed nav; 32px in full panel title bars.' },
          { zh: '图标与文字之间留 8px，图标按钮至少 32px 点击区域。', en: 'Leave 8px between icon and label; keep a 32px hit area for icon buttons.' },
          { zh: '状态同时用图标或文字表达，不只靠颜色。', en: 'Pair a state’s colour with an icon or text.' },
        ]"
        :dont="[
          { zh: '不要在 chip、tag、表格单元格里放图标。', en: 'No icons in chips, tags or table cells.' },
          { zh: '不要让颜色成为状态的唯一信号。', en: 'A state is never colour-only.' },
          { zh: '不要多色图标，不要给图标加辉光，除非它处于激活态。', en: 'No multicolour icons, and no glow unless active.' },
        ]"
      />
    </DocSection>
  </DocPage>
</template>

<style scoped>
.sizes { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-end; }
.sizes figure { margin: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; color: var(--eve-text-secondary); }
.states { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; margin: 8px 0 16px; }
.s { display: inline-flex; align-items: center; gap: 8px; }
.s.rest { color: var(--eve-text-secondary); }
.s.hover { color: var(--eve-text-highlighted); }
.s.active { color: var(--eve-primary); }
.btn { display: inline-flex; align-items: center; gap: 8px; height: var(--eve-control-height); padding: 0 12px; font: inherit; text-shadow: inherit; cursor: pointer; border-radius: 0; color: var(--eve-text-secondary); background: var(--eve-bg-primary); border: 1px solid var(--eve-border-grey); transition: color var(--eve-dur-hover) ease-out, background-color var(--eve-dur-hover) ease-out; }
.btn:hover { color: var(--eve-text-highlighted); background: var(--eve-bg-hovered); }
.tbl { border-collapse: collapse; width: 100%; max-width: 640px; }
.tbl th, .tbl td { text-align: left; padding: 6px 12px 6px 0; border-bottom: 1px solid var(--eve-divider); }
.tbl th { color: var(--eve-text-secondary); font-weight: 400; }
</style>
