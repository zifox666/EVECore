<script setup lang="ts">
import { CodeBlock, DocPage, DocSection, L } from '../../../kit';

const npmInstall = `pnpm add evecore`;
const npmMain = `// main.ts
import { createApp } from 'vue';
import EveCore from 'evecore';
import 'evecore/style.css'; // tokens + base + components (+ the icons they use)
import App from './App.vue';

createApp(App).use(EveCore).mount('#app'); // or import { EveButton } from 'evecore' per file`;
const npmUno = `// uno.config.ts — only if you want eve-* utilities and your own i-eve-* icons
import { presetEvecore } from 'evecore/unocss';

export default defineConfig({
  presets: [presetWind3(), presetEvecore()], // i-eve-wallet, text-eve-primary, eve-panel …
});`;
const deps = `pnpm add vue
pnpm add -D unocss @iconify-json/tabler @iconify/utils`;
const styles = `// main.ts
import '@/styles/eve.css'; // imports tokens.css`;
const fonts = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap">`;
const uno = `// uno.config.ts
import { eveTheme, eveShortcuts } from './evecore-uno';

export default defineConfig({
  presets: [presetWind3(), presetIcons()],
  theme: eveTheme,
  shortcuts: eveShortcuts, // eve-panel, eve-section-title, eve-num
});`;
</script>

<template>
  <DocPage>
    <p>
      <L
        zh="设计页给出颜色、字体、切角、间距、状态、动效与图标，全部来自 tokens；每个组件都有一页实时预览、源码、Props 与规则。设计规则全文写在 AGENTS.md。"
        en="The Design pages show colour, type, cuts, spacing, states, motion and icons, all drawn from the tokens; every component has a page with a live preview, its source, props and rules. The design rules are written out in full in AGENTS.md."
      />
    </p>

    <DocSection id="npm" zh="通过 npm 安装" en="Install from npm">
      <p>
        <L
          zh="evecore 包含全部组件、类型和一份编译好的样式（组件用到的图标已编进 CSS，不需要 UnoCSS）。"
          en="The evecore package has every component, its types and one prebuilt stylesheet (the icons the components use are compiled into it; UnoCSS is not required)."
        />
      </p>
      <CodeBlock :code="npmInstall" lang="bash" />
      <CodeBlock :code="npmMain" lang="ts" />
      <p>
        <L
          zh="想在自己的模板里用 i-eve-* 图标类和 eve-* 颜色工具类时，再加 UnoCSS 预设 evecore/unocss（依赖 unocss 与 @iconify/utils）。另有 evecore/tokens.css 只含变量。"
          en="To use i-eve-* icon classes and eve-* colour utilities in your own templates, add the UnoCSS preset evecore/unocss (needs unocss and @iconify/utils). evecore/tokens.css holds the variables alone."
        />
      </p>
      <CodeBlock :code="npmUno" lang="ts" />
    </DocSection>

    <DocSection id="using" zh="复制源码" en="Copy the source">
      <p>
        <L
          zh="组件是 Vue 3 单文件组件（<script setup> + TypeScript），样式只读取 --eve-* CSS 变量。想改组件本身时，复制源码比装包更合适。"
          en="Components are Vue 3 single-file components (<script setup> + TypeScript) whose styles only read --eve-* CSS variables. When you want to change the components themselves, copy the source instead of installing the package."
        />
      </p>
      <p><L zh="1. 安装依赖。图标走 UnoCSS preset-icons：EVE 客户端图标（i-eve-*，来自 src/assets/icons/eve/）为主，Tabler（i-tabler-*）只用于通用控件。" en="1. Add the dependencies. Icons go through UnoCSS preset-icons: EVE client icons (i-eve-*, from src/assets/icons/eve/) first, Tabler (i-tabler-*) only for generic controls." /></p>
      <CodeBlock :code="deps" lang="bash" />
      <p>
        <L
          zh="2. 复制 src/styles/（tokens.css、eve.css）和 src/lib/（utils.ts、security.ts），并把 @/ 别名指向你的源码目录。全局引入一次样式："
          en="2. Copy src/styles/ (tokens.css, eve.css) and src/lib/ (utils.ts, security.ts) and map the @/ alias to your source folder. Import the styles once:"
        />
      </p>
      <CodeBlock :code="styles" lang="ts" />
      <p><L zh="3. 加载字体（Barlow 替代 EVE Sans Neue，JetBrains Mono 用于数字）。" en="3. Load the fonts (Barlow stands in for EVE Sans Neue; JetBrains Mono for numbers)." /></p>
      <CodeBlock :code="fonts" lang="html" />
      <p><L zh="4. 从 src/components/eve/ 复制组件，一个组件一个文件。每个组件页的“安装”一节列出它连带需要的全部文件，可展开查看与复制源码。" en="4. Copy components from src/components/eve/, one file each. Each component page's Installation section lists every file it needs, with the source to expand and copy." /></p>
    </DocSection>

    <DocSection id="other" zh="其他接入方式" en="Other ways in">
      <ul class="intro-list">
        <li><L zh="不用 Vue 组件：只引入 eve.css，使用 eve-dots、eve-cut-br、eve-num、eve-detail 等工具类。" en="Without the components: import eve.css and use utilities such as eve-dots, eve-cut-br, eve-num, eve-detail." /></li>
        <li><L zh="不用 UnoCSS：tokens.css 单独即可提供全部变量（var(--eve-primary)、font: var(--eve-text-body)）。" en="Without UnoCSS: tokens.css alone gives every token as a CSS variable (var(--eve-primary), font: var(--eve-text-body))." /></li>
        <li><L zh="SoybeanAdmin / Naive UI：把 uno.config.ts 中的 eveTheme 与 eveShortcuts 合并到项目配置，组件放进 web/src/components/eve/。" en="SoybeanAdmin / Naive UI: merge eveTheme and eveShortcuts from uno.config.ts into the project config and drop components into web/src/components/eve/." /></li>
        <li><L zh="配合编程助手：把 AGENTS.md 放在复制来的组件旁边；文档站以 /llms.txt 提供同样的内容。" en="With a coding agent: keep AGENTS.md beside the components you copy. The docs site serves the same text as /llms.txt." /></li>
        <li><L zh="文档站：pnpm dev 启动于 http://localhost:4173；按 ⌘K 或 / 搜索页面。" en="These docs: pnpm dev serves them at http://localhost:4173; press ⌘K or / to search." /></li>
      </ul>
      <CodeBlock :code="uno" lang="ts" />
    </DocSection>

    <DocSection id="licence" zh="许可" en="Licence">
      <p>
        <L
          zh="代码以 MIT 许可发布。EVE Online 与 EVE Sans Neue 字体属于 CCP Games，本项目不分发该字体；EVE 图标来自 eve-icons（CCP 客户端图标的 SVG 描摹），按 CCP 第三方开发者许可使用。本项目与 CCP 无关。"
          en="Code is under the MIT License. EVE Online and the EVE Sans Neue typeface belong to CCP Games; the typeface is not distributed. The EVE icons come from eve-icons (SVG tracings of CCP client icons) and are used under the CCP third-party developer licence. This project is not affiliated with CCP."
        />
      </p>
    </DocSection>
  </DocPage>
</template>

<style scoped>
.intro-list { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; line-height: 1.6; }
.intro-list li::marker { color: var(--eve-primary); }
</style>
