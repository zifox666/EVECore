# EveCore

EVE Online Neocom 风格的 Vue 3 组件库 —— 近黑窗口、半透明白字、一抹 Cryo Blue。可以装 npm 包，也可以复制源码。
A Vue 3 component library in the style of the EVE Online Neocom. Install it from npm or copy the source.

- 设计规范 / Design spec: [design.md](design.md)
- 设计规则清单 / Rules for agents: [AGENTS.md](AGENTS.md)
- 编写组件与文档 / Authoring guide: [AUTHORING.md](AUTHORING.md)

## npm

```bash
pnpm add @newdoublex/evecore
```

```ts
import EveCore from '@newdoublex/evecore';      // app.use(EveCore) 全局注册，或按需 import { EveButton } from '@newdoublex/evecore'
import '@newdoublex/evecore/style.css';         // tokens + 基础样式 + 组件样式（组件用到的图标已编译进去）
```

- `@newdoublex/evecore/unocss`：UnoCSS 预设 `presetEvecore()`，提供 `i-eve-<name>` 图标类、`eve-*` 颜色与 `eve-panel` 等快捷类（需 `unocss`、`@iconify/utils`）。
- `@newdoublex/evecore/tokens.css`：只含 `--eve-*` 变量。`@newdoublex/evecore/icons/eve/*.svg`：原始图标。
- 发布：改 `package.json` 版本后推送 `v<版本>` 标签，`.github/workflows/release.yml` 用仓库 secret `NPM_TOKEN` 发布到 npm。本地构建：`pnpm build:lib`（输出 `dist-lib/`）。

## 复制源码 / Copy the source

1. 复制 `src/styles/`（tokens.css、eve.css）与 `src/lib/`，`@/` 别名指向源码目录，在入口 `import '@/styles/eve.css'`。
2. 加载字体 Barlow 与 JetBrains Mono（见 `index.html`）。
3. 需要哪个组件就复制 `src/components/eve/` 下对应文件；文件头 `Requires:` 写明依赖。
4. 图标用 UnoCSS `presetIcons`：EVE 图标 `i-eve-<name>`（`src/assets/icons/eve/`，`FileSystemIconLoader` 注册，动态名称用 `EveIcon`），通用控件用 `@iconify-json/tabler`；`uno.config.ts` 导出 `eveTheme` 与 `eveShortcuts` 可直接合并。

## 文档站 / Docs

```bash
pnpm install
pnpm dev        # http://localhost:4173
pnpm build      # dist/，推送 main 后由 .github/workflows/docs.yml 发布到 GitHub Pages
```

文档站按 ⌘K 或 / 搜索；`/llms.txt` 提供 AGENTS.md 全文给编程助手。

页面按文件自动发现：`src/docs/pages/<design|components>/<slug>/{meta.ts,index.vue}`。

## 许可 / Licence

MIT。EVE Online 与 EVE Sans Neue 字体归 CCP Games 所有，本项目不分发该字体。`src/assets/icons/eve/` 的图标来自 [eve-icons](https://github.com/Incomplete-Infinity/eve-icons)，按 CCP 第三方开发者许可使用（见该目录 README）。本项目与 CCP 无关。
