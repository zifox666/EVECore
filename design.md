# EVE Neocom 风格

## Overview

EVE 的界面读起来像一艘飞船的舰载终端，而不是一个网站：**近黑的窗口底色、半透明的白字、一抹冷青色（Cryo Blue）作为唯一的品牌电压**。没有大圆角，没有柔和阴影，没有白色画布。层级靠**1px 细线边框 + 微弱的背景明度差 + 发光**来表达，而不是投影。

最有辨识度的三个元素：

1. **切角（Cut Corner）**：主按钮、下拉框只在右下（或左下）切掉 9px 的一个角，其余三个角是直角。这是 EVE UI 的标志性几何，代替了"圆角"。
2. **激活窗口的顶部发光线**：被聚焦的面板顶边有一条 1px 的 `{colors.border-primary}` 实线，叠加一条 2px、6px 模糊的同色光晕；未激活时消失。
3. **文字带 1px 投影**：所有文字带 `1px 1px 0 rgba(0,0,0,.5)` 的硬投影，让半透明白字在点阵背景上依然清晰。

**Key Characteristics：**

- 唯一强调色：`{colors.primary}`（#58A7BF Cryo Blue）。用于激活边框、选中态、滑块、复选框、焦点光晕。
- 文字是**白色 + 透明度**分级，不是灰色分级：高亮 90% / 主文本 75% / 次要 50% / 禁用 30%。
- 几何是直角 + 切角，圆角最大 6px（仅 Pill 标签）。
- 交互反馈是"**亮起来**"：hover 时背景变亮、边框变亮、出现辉光；press 时瞬间变成近白色（#EAEAEA）然后回落。
- 高密度：基础字号 14px、表格行距 2px、控件高 32px。这是一个工具，不是营销页。
- 深色唯一：EVE 没有浅色模式。以深色为默认且主推，浅色仅作为可选降级（见 Known Gaps）。

## Colors

### Window（窗口/面板底色）

| Token                                | 值        | 用途                           |
| ------------------------------------ | --------- | ------------------------------ |
| `{colors.window-bg}`                 | `#070707` | 页面/窗口主底色                |
| `{colors.window-bg-secondary}`       | `#141414` | 卡片、次级区块                 |
| `{colors.window-bg-secondary-hover}` | `#1F272B` | 次级区块 hover（带一点青）     |
| `{colors.window-bg-active}`          | `#05080A` | 激活窗口、展开的下拉、右键菜单 |
| `{colors.window-border}`             | `#1F1F1F` | 窗口 1px 外框                  |
| `{colors.window-border-active}`      | `#1E2022` | 激活窗口外框                   |
| `{colors.map-bg}`                    | `#0A0E15` | 星图画布底色                   |

### Brand & Accent（品牌）

| Token                           | 值        | 用途                              |
| ------------------------------- | --------- | --------------------------------- |
| `{colors.primary}`              | `#58A7BF` | Cryo Blue，唯一强调色             |
| `{colors.primary-dark}`         | `#41707D` | 强调色暗部                        |
| `{colors.bg-primary}`           | `#172327` | 主按钮底、Section 标题条、Pill 底 |
| `{colors.bg-primary-dark}`      | `#0A1215` | 更深的青底                        |
| `{colors.bg-primary-light}`     | `#36525E` | 主按钮 hover、Tab 计数徽标        |
| `{colors.bg-selected}`          | `#355866` | 列表/表格选中行                   |
| `{colors.bg-hovered}`           | `#131C1F` | 列表行 hover                      |
| `{colors.bg-press}`             | `#EAEAEA` | 按下瞬间的闪白                    |
| `{colors.border-primary}`       | `#41707F` | 主按钮边框、激活窗口顶线          |
| `{colors.border-primary-dark}`  | `#213841` | 次按钮边框                        |
| `{colors.border-primary-light}` | `#71BED3` | hover 边框、输入光标              |

### Text（白 + 透明度）

| Token                         | 值                      | 用途                           |
| ----------------------------- | ----------------------- | ------------------------------ |
| `{colors.text-special}`       | `#C3E9FF`               | 特别高亮（冰蓝），如当前星系名 |
| `{colors.text-highlighted}`   | `rgba(255,255,255,.90)` | 标题、选中 Tab、hover 文字     |
| `{colors.text-primary}`       | `rgba(255,255,255,.75)` | 默认正文                       |
| `{colors.text-secondary}`     | `rgba(255,255,255,.50)` | 说明、表头、未选中 Tab         |
| `{colors.text-disabled}`      | `rgba(255,255,255,.30)` | 禁用                           |
| `{colors.text-link}` / hover  | `#D98D00` / `#FFB732`   | 游戏内链接（琥珀色，粗体）     |
| `{colors.text-external-link}` | `#FFE400`               | 外部链接                       |
| `{colors.text-help-link}`     | `#94CCFF`               | 帮助/文档链接                  |

### Borders & Dividers

| Token                        | 值        | 用途                              |
| ---------------------------- | --------- | --------------------------------- |
| `{colors.border-grey-light}` | `#303030` | Tab 栏底线、复选框、Pill 默认边框 |
| `{colors.border-grey}`       | `#1E1E1E` | 输入框、Tooltip 边框              |
| `{colors.divider}`           | `#1E2022` | 分割线、菜单边框                  |

### Semantic（语义色）

| Token                      | 值                    | 用途                       |
| -------------------------- | --------------------- | -------------------------- |
| `{colors.success}`         | `#8DC169`             | 成功、在线                 |
| `{colors.warning}`         | `#F39058`             | 警告文字/图标              |
| `{colors.warning-bg}`      | `#180F09`             | 警告横幅底                 |
| `{colors.danger}`          | `#FF454B`             | Hot Red，危险/敌对         |
| `{colors.error-bg}` / dark | `#7F2628` / `#60171A` | 危险按钮 hover / 默认边框  |
| `{colors.error-border}`    | `#FE5B61`             | 危险按钮 hover 边框        |
| `{colors.away}`            | `#FFB845`             | 离开（Sand Yellow）        |
| `{colors.isk-up}`          | `#029C02`             | 价格上涨、收入（仅文字色） |
| `{colors.isk-down}`        | `#FB0101`             | 价格下跌、支出（仅文字色） |
| `{colors.omega}`           | `#FFC64A`             | Omega/高级功能点缀         |
| `{colors.plex}`            | `#FFCC00`             | PLEX 相关                  |

### Security Status（星系安等 — 星图与所有星系 chip 必须使用）

| 安等 | 色值      | 安等 | 色值      |
| ---- | --------- | ---- | --------- |
| 1.0  | `#2C75E1` | 0.4  | `#DC6C06` |
| 0.9  | `#399AEB` | 0.3  | `#CE440F` |
| 0.8  | `#4ECEF8` | 0.2  | `#BB1116` |
| 0.7  | `#60DBA3` | 0.1  | `#731F1F` |
| 0.6  | `#71E754` | ≤0.0 | `#8D3163` |
| 0.5  | `#F5FF83` |      |           |

安等先四舍五入到 0.1（EVE 规则：0.05 向上进位到 0.1，0.0–0.05 之间按 0.1 显示）再取色。

### EVE 官方调色板（扩展用，非日常）

Burnished Gold `#996A1F` · Cherry Red `#991F24` · Copper Oxide `#415931` · Primary Blue `#407196` · Smoke Blue `#305665` · Ice White `#C2E5F2` · Leafy Green `#8DC169` · Lime `#B2F84D` · Aura Purple `#956BEC` · Air Turquoise `#70F0E3` · Ultramarine `#2E4EBE` · Paragon `#97D3CB` · Destination Yellow `#F0FF45`（航线目的地）。
灰阶：Coal `#1A1A1A` · Matte `#303030` · Gunmetal `#4D4D4D` · LED `#8A8A8A` · Silver `#B0B0B0` · Tungsten `#D9D9D9` · Platinum `#F2F2F2`。

## Typography

### Font Family

- **EVE Sans Neue**：EVE 客户端字体。**它是 CCP 的资产，不可在 Web 上分发**.
- **替代方案（推荐）**：拉丁 `"Barlow"`（Google Fonts，400/600/700）——同样是窄方的工业无衬线，最接近 EVE Sans Neue 的气质；中文 `"HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei"`。
- **数字/等宽**：`"JetBrains Mono"`，用于 ISK 金额、坐标、ID、安等、时间。所有数字列必须 `font-variant-numeric: tabular-nums`。
- **点缀**：Triglavian 字体仅可用于 EVECORE 的彩蛋装饰，不承载信息。

```css
--font-sans:
  "Barlow", "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", system-ui,
  sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

### Hierarchy

| Token                      | Size     | Weight | Letter Spacing | 用途                          |
| -------------------------- | -------- | ------ | -------------- | ----------------------------- |
| `{typography.display}`     | 24px     | 400    | 0              | 页面主标题、星系大名          |
| `{typography.headline}`    | 19px     | 400    | 0              | 窗口/面板标题栏（Full 样式）  |
| `{typography.header}`      | 16px     | 400    | 0              | Section 标题、小窗口标题      |
| `{typography.body}`        | 14px     | 400    | 0              | 默认正文、按钮、表格单元格    |
| `{typography.body-link}`   | 14px     | 700    | 0              | 游戏内链接（琥珀色）          |
| `{typography.detail}`      | 12px     | 400    | 0.5px          | 说明文字、chip、元信息        |
| `{typography.detail-bold}` | 12px     | 700    | 0.5px          | 小标签强调                    |
| `{typography.number}`      | 同所在级 | 400    | 0              | JetBrains Mono + tabular-nums |

每一级都有 highlighted / primary / secondary / disabled 四个颜色变体，对应文字透明度阶梯。

### Principles

- **标题不加粗。** EVE 的标题全部 400 字重，层级靠字号和亮度（highlighted vs primary），不靠粗细。粗体只给链接和 detail-bold。
- **全局 1px 硬投影：** `text-shadow: 1px 1px 0 rgba(0,0,0,.5)`。按钮文字改为 `0 0 3px` 的柔光（亮色发光感）。
- **大写仅用于短标签**（如 `HIGHSEC`、`ONLINE`），配 `{typography.detail}` 的 0.5px 字距。中文不做大写处理。

## Layout

### Spacing System

| Token           | 值   | 典型用途                              |
| --------------- | ---- | ------------------------------------- |
| `{spacing.xxs}` | 2px  | 表格行垂直 padding、chip 垂直 padding |
| `{spacing.xs}`  | 4px  | 图标与文字间距、Pill 垂直 padding     |
| `{spacing.sm}`  | 8px  | 单元格水平 padding、Tab 内边距        |
| `{spacing.md}`  | 12px | 宽 Tab、标题栏左右边距                |
| `{spacing.lg}`  | 16px | 窗口内容区 padding、Tooltip padding   |
| `{spacing.xl}`  | 24px | 大区块间距                            |

**没有 48/96px 的大留白**。最大常规间距 24px；页面级区块之间用 16–24px。

### Grid & Container

- 应用内页面**铺满可用宽度**，不设 max-width；内容以"窗口面板"拼接（参考 EVE 多窗口布局）。
- 开始页（`views/start`）可以居中，最大宽 1200px。
- 多面板布局用 CSS Grid，面板间距 `{spacing.sm}`（8px），让面板像贴在一起的舰载显示屏。

### Density

控件高度统一 32px（输入框、下拉框、按钮），菜单项 21px，表格行 ≈ 22px（14px 字 + 2×2px padding + 行高）。比 Naive UI 默认的 34px/medium 更紧凑。

## Elevation & Depth

EVE **不用投影表达层级**。层级手段按优先级：

| 层级       | 手段                                                           | 用途                    |
| ---------- | -------------------------------------------------------------- | ----------------------- |
| 0 · 画布   | `{colors.window-bg}` + 点阵纹理                                | 页面底                  |
| 1 · 面板   | 1px `{colors.window-border}` 外框                              | 所有卡片/窗口           |
| 2 · 次级块 | `{colors.window-bg-secondary}` 填充                            | 面板内的分组            |
| 3 · 激活   | 顶部 1px `{colors.border-primary}` + 2px/6px 模糊光晕          | 聚焦的面板              |
| 4 · 浮层   | `{colors.window-bg}` @ 95% 不透明 + 1px `{colors.border-grey}` | Tooltip、下拉、右键菜单 |

### Decorative Depth

- **点阵背景（Background Dots）**：窗口底层平铺一张细点纹理，激活时更亮。Web 实现：

  ```css
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.035) 1px,
    transparent 1px
  );
  background-size: 4px 4px;
  ```

- **发光（Glow）**：用 `box-shadow: 0 0 6px <color>` 或模糊伪元素实现，只用于激活/hover/选中，不作静态装饰。
- **竖向发光线（Vertical Glow Line）**：列表项左侧 1px 实线 + 5px 宽的同色半透明带（默认 10%，hover/选中 50%）。用于导航菜单选中项、告警条目、敌对标记。
- **透明窗口模式**（可选）：EVECORE 支持把窗口底调成 40% 不透明（`EvePanel` 的 `transparent`），边框改为 `rgba(255,255,255,.1)`。星图页上的浮动面板应使用此模式，配 `backdrop-filter: blur(8px)`，让星图透出来。

## Shapes

### Border Radius & Corner Cut

| Token            | 值                            | 用途                                    |
| ---------------- | ----------------------------- | --------------------------------------- |
| `{rounded.none}` | 0                             | **默认**：面板、输入框、表格、菜单、Tab |
| `{rounded.xs}`   | 2px                           | 安等 chip、星系 chip                    |
| `{rounded.sm}`   | 4px                           | Tab 计数徽标                            |
| `{rounded.md}`   | 6px                           | Pill（过滤标签），系统最大圆角          |
| `{rounded.full}` | 50%                           | 仅角色/军团头像                         |
| `{cut.button}`   | 右下 9px 切角                 | 主按钮、次按钮、危险按钮                |
| `{cut.dropdown}` | 右下 9px 切角（展开时变直角） | 下拉选择框                              |
| `{cut.checkbox}` | 四角 2px 切角                 | 复选框                                  |

### 切角的 Web 实现

```css
.eve-cut-br {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 9px),
    calc(100% - 9px) 100%,
    0 100%
  );
}
```

`clip-path` 会裁掉 border，所以带边框的切角元素用**双层**：外层是边框色 + clip-path，内层 `inset: 1px` 是背景色 + 同样的 clip-path（切角尺寸减 0.4px 对齐斜边）。或使用 SVG 背景。推荐封装为一个 `<EveFrame>` 组件统一处理。

## Components

### Window / Panel（`eve-panel`）

- 背景 `{colors.window-bg}` + 点阵；1px `{colors.window-border}`；直角。
- **标题栏**：Full 样式高 48px（`{typography.headline}`，左侧可放 32px 图标），Small 样式高 32px（`{typography.header}`）。左右 padding 12px（Full）/ 8px（Small）。标题用 highlighted 色。
- 右侧窗口按钮：16px 图标，`text-secondary`，hover 变 highlighted。
- 内容区 padding：左右下 16px。
- 激活态：外框变 `{colors.window-border-active}`，顶部出现 1px `{colors.border-primary}` 线 + 2px 模糊光晕。过渡用 spring 感的 `200ms ease-out`。

### Section Title（`section-title`）

整行背景 `{colors.bg-primary}`，文字 `{typography.header}` primary 色，padding 4px × 8px。用于面板内的分组标题，取代"粗体小标题"。

### Buttons

三种类型，统一高 32px，文字 `{typography.body}` + `0 0 3px` 柔光，水平 padding 15px（有图标时图标左 8px + 16px 图标）。默认右下 9px 切角。

| 类型          | Normal 底/边          | Hover 底/边           | Press 底/边                         |
| ------------- | --------------------- | --------------------- | ----------------------------------- |
| **Primary**   | `#172327` / `#41707F` | `#36525E` / `#71BED3` | `#EAEAEA` / `#EAEAEA`（文字变深色） |
| **Secondary** | 透明 / `#213841`      | `#36525E` / `#71BED3` | `#EAEAEA` / `#EAEAEA`               |
| **Negative**  | 透明 / `#60171A`      | `#7F2628` / `#FE5B61` | `#EAEAEA` / `#EAEAEA`               |

- Press 的"闪白"是 EVE 按钮手感的核心，持续时间短（按下即白，松开 ~150ms 回落）。
- 可选切角：右下（默认）/ 左下 / 两边 / 无。按钮组最左按钮用左下切，最右用右下切。
- **Icon Button**：无边框，16px 图标，hover 时下方出现 22px 宽、4px 高的辉光条（`window_buttonglow`），alpha 0 → 0.3。
- 禁用：边框/底保持 normal，文字 `text-disabled`，无 hover。

### Text Field（`text-input`）

高 32px，背景 `{colors.window-bg}` @ 50%，1px `{colors.border-grey}`，直角，水平 padding 7px。光标色 `{colors.border-primary-light}`。左侧可带 16px 图标（secondary 色）。Placeholder 用 `{typography.body}` secondary。Focus：边框变 `{colors.border-primary}`，无外发光圈（不同于 Naive 默认的 focus ring）。

### Search Field

同 Text Field，左侧放大镜图标，右侧有内容时显示清除按钮。

### Dropdown / Select

- 收起：高 32px，背景 `{colors.window-bg}`，1px `{colors.border-grey}`，**右下 9px 切角**；右侧下拉 chevron（hover 时 alpha 0.5→1）+ 底部辉光条。
- 展开：切角变直角，背景 `{colors.window-bg-active}`，边框 `{colors.border-grey-dropdown}`（#1E2022）；弹层紧贴字段（上移 1px 盖住底边），弹层顶边线左右各缩进 7px，像从字段里"抽出来"。
- 选项高 31px；hover `#18262D`，选中 `#16272E`，键盘高亮 `#273E47`。

### Checkbox / Radio

- 复选框 16px，四角 2px 切角，1px `{colors.border-grey-light}`；hover 时边框和外圈 2px 光晕变 `{colors.primary}`；press 时底变 `#EAEAEA`；勾选图标 `{colors.primary}`。
- Radio 同理，用圆形。

### Slider

轨道 `{colors.border-grey-light}`；滑块 `#58A7BF`，拖动中 `#99E5EE`，hover `#FFFFFF`。

### Tabs（`eve-tabs`）

- 底部 1px `{colors.border-grey-light}` 通栏线。
- Tab 文字 `{typography.body}`：未选中 secondary，hover/选中 highlighted。选中 Tab 底部有 `{colors.primary}` 指示线 + 辉光。
- Tab 内 padding 8px（宽 Tab 12px），最小宽 30px，可带 16px 图标。
- 计数徽标：底 `{colors.bg-primary-light}`，4px 圆角，水平 padding 6px。
- 溢出时右侧显示 30px 宽的下拉按钮。
- **SoybeanAdmin 顶部多页签**（`tab.mode`）也套用这一样式，替换 chrome 风格。

### Table（`eve-table`）

- 表头 `{typography.body}` secondary，hover 变 highlighted；可排序列右侧 16px 箭头图标。
- 单元格 `{typography.body}` primary，水平 padding 8px，行垂直 padding 2px，**无斑马纹、无行分隔线**。
- 行 hover `{colors.bg-hovered}`，选中 `{colors.bg-selected}`。
- 列分隔：表头列间 7px 宽的可拖拽区域，中间 1px 线默认 10% 不透明，hover 时变 `{colors.primary}` 75% + 4px 模糊。
- 数字列右对齐 + 等宽字体。ISK 涨跌只改文字色（`isk-up` / `isk-down`），**不加底色**。

### Pill / Filter Chip（`eve-pill`）

6px 圆角，背景 `{colors.bg-primary}`，1px `{colors.border-grey-light}`（选中时 `{colors.primary}`）。padding 4px × 8px。可分为"标签 | ×"两段，中间 1px 竖线，各自 hover 为 `{colors.bg-primary-light}`。

### Solar System Chip（`system-chip`）

- 外层：黑 50% 底、2px 圆角。
- 左段：安等数字，背景 = 安等色 @ 50%，`{typography.detail}` + 等宽。
- 右段：星系名 `{typography.detail}` secondary，padding 4px × 8px。
- 可选再前置星域名段，背景 = 安等色 @ 25%。
- 在星图、路线规划、合同列表、市场订单的"位置"列中统一使用。

### Tooltip

背景 `{colors.window-bg}` @ 95%，1px `{colors.border-grey}` @ 95%，padding 16px，直角，带一个指向锚点的小三角。延迟出现，鼠标移入 tooltip 本身时不消失。

### Context Menu / Dropdown Menu

背景 `{colors.window-bg-active}`，1px `{colors.divider}` + 1px 内 padding；上下 padding 7px。菜单项高 21px，水平 padding 7px，左侧 34px 图标位；hover `{colors.bg-hovered}`（spring 过渡）。高亮项文字 `{colors.primary}`。可带 `{typography.headline}` 标题行和 `{colors.divider}` 分隔线。

### Warning Banner

背景 `{colors.warning-bg}`，文字和图标 `{colors.warning}`，左侧 20px 警告图标，padding 8px。危险版本用 `#1A0809` 底 + `{colors.danger}`。

### Progress Bar

背景 `#1A1E1F`，进度 `#0D557E`（或按语义传色），直角，宽度变化用慢 spring（`~600ms ease-out`）。支持双段（主进度 + 次进度并排）。

### Navigation（SoybeanAdmin 侧栏 → Neocom）

- 侧栏背景 `{colors.window-bg}`，右侧 1px `{colors.window-border}`；**不使用 inverted 深蓝侧栏**。
- 菜单项 `{typography.body}` primary，高 32px，选中项：背景 `{colors.bg-selected}` @ 40% + 左侧竖向发光线（`{colors.primary}`）+ 文字 highlighted。
- 折叠模式（64px）下只显示 24px 图标，接近 EVE Neocom 的图标列。
- 顶栏高 48px，背景同窗口色，底部 1px `{colors.window-border}`，无阴影。面包屑用 `{typography.detail}` secondary。

### Star Map（`views/map`）

- 清屏色 `{colors.map-bg}`（#0A0E15），而不是当前的 `#05070d`。
- 星系节点颜色 = 安等色。星门连线 `rgba(169,179,196,.25)`，星域间连线可用 `{colors.aura-purple}` 低透明度。
- 路线高亮：星门路线 `{colors.primary}`，跳跃路线 `{colors.away}`（#FFB845），目的地 `{colors.destination-yellow}`（#F0FF45）。
- 浮动信息面板使用"透明窗口模式"。

### Market（`views/market`）

- 价格、数量、ISK 一律等宽字体 + 千分位，右对齐。
- 买单/卖单分区用 Section Title 区分，不用彩色底块。
- 涨跌：仅文字色 `isk-up` / `isk-down`，前置 ▲▼。

## Motion

| 场景                | 规格                                                           |
| ------------------- | -------------------------------------------------------------- |
| 按钮/Tab hover 色彩 | `150ms ease-out`（EVECORE：`--eve-dur-hover`）               |
| 列表行 hover 背景   | `250ms ease-out`（spring StiffnessLow，更"软"）                |
| 窗口激活边框/点阵   | `200ms ease-out`                                               |
| 进度条              | `600ms ease-out`（spring StiffnessVeryLow）                    |
| 页面切换            | 仅 `fade`，150ms。去掉 SoybeanAdmin 的 `fade-slide` 位移       |
| 数字变化            | 可做滚动计数动画（EVECORE `EveIsk` 的 `animated`），用于 ISK 余额、统计 |

全部尊重 `prefers-reduced-motion: reduce`（降为 0ms）。

## Do's and Don'ts

### Do

- 把 `{colors.primary}` Cryo Blue 留给激活、选中、焦点、主操作——一屏内青色应当"稀缺"。
- 用文字透明度阶梯表达主次，用 `{typography.header}` + Section Title 条表达分组。
- 按钮和下拉框用右下切角；面板、输入、表格用直角。
- 交互用"变亮 + 发光"反馈，按下用闪白。
- 所有数字等宽、右对齐；所有星系显示都带安等色。
- 保持高密度：32px 控件、14px 正文。

### Don't

- 不要写辅助阅读的提示性文本：功能介绍、操作说明、使用引导、数据口径备注、表头解释 tooltip、placeholder 里的举例、"（可多选）"之类的括号补充。界面只留标签、数据和简短状态（如"暂无挂单"）；设计稿和实现都适用。
- 不要大圆角（>6px）、胶囊按钮、卡片圆角——这会立刻变成"普通 SaaS 后台"。
- 不要 `box-shadow` 投影来分层；不要浅色/白色卡片。
- 不要粗体标题。
- 不要彩色底块表达涨跌或状态（警告横幅除外，且它用极暗的底）。
- 不要引入第二个品牌色。琥珀（链接）、黄（外链/目的地）、安等色都是**语义色**，不是装饰色。
- 不要在 Web 上打包 EVE Sans Neue 字体（版权，见 Known Gaps）；界面图标优先用 `web/src/assets/svg-icon/eve/` 里的 EVE 图标集。
- 不要在静态元素上加辉光；辉光只代表"激活/可交互"。

## Responsive Behavior

| 断点    | 宽度        | 变化                                                                                                                 |
| ------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Mobile  | < 640px     | 侧栏收为抽屉；多面板改单列堆叠；表格改为卡片列表（每行一块 `eve-panel`，关键数字放右上）；标题栏统一用 Small（32px） |
| Tablet  | 640–1024px  | 侧栏默认折叠（64px 图标列）；面板 2 列                                                                               |
| Desktop | 1024–1600px | 侧栏展开 220px；面板自由网格                                                                                         |
| Wide    | > 1600px    | 不限宽，继续铺满；星图页面板可浮动                                                                                   |

- 触控目标：移动端控件高度从 32px 提到 40px，菜单项从 21px 提到 40px；桌面保持高密度。
- 星图页在移动端隐藏浮动面板，改为底部抽屉。

## Implementation Mapping

1. **`web/src/theme/settings.ts`**
   - `themeScheme: 'dark'`，`themeColor: '#58A7BF'`，`themeRadius: 0`。
   - `otherColor`: `info #94CCFF` · `success #8DC169` · `warning #F39058` · `error #FF454B`；`isInfoFollowPrimary: false`。
   - `tokens.dark.colors`: `container: rgb(7,7,7)` · `layout: rgb(7,7,7)` · `inverted: rgb(5,8,10)` · `base-text: rgb(255 255 255 / .75)`；`boxShadow` 全部改为 `none` 或 1px 边框。
   - `header.height: 48`，`tab.height: 36`，`sider.inverted: false`，`page.animateMode: 'fade'`，`footer.visible: false`（工具型应用不需要页脚）。
2. **Naive UI `themeOverrides`**（在 `App.vue` 的 `n-config-provider` 上）：`common.borderRadius: '0px'`、`borderRadiusSmall: '2px'`、`heightMedium: '32px'`、`fontSizeMedium: '14px'`、`fontFamily` / `fontFamilyMono` 为上面的字体栈、`bodyColor #070707`、`cardColor #070707`、`modalColor #070707`、`popoverColor rgba(7,7,7,.95)`、`borderColor #1F1F1F`、`dividerColor #1E2022`、`hoverColor #131C1F`、`textColor1/2/3` 用白色透明度阶梯。组件级覆盖 `Button`、`Input`、`DataTable`（去斑马纹、行高、表头色）、`Tabs`、`Menu`。
3. **全局样式 `web/src/styles/`**：新增 `eve.scss` 定义 CSS 变量（本文所有 token，以 `--eve-` 前缀）、全局 `text-shadow`、点阵背景、`.eve-cut-br` 等工具类、滚动条（细 6px，轨道透明，滑块 `#303030`，hover `#41707F`）。
4. **UnoCSS `uno.config.ts`**：在 `theme.colors` 中注册 `eve-*` 色名；shortcuts：`eve-panel`、`eve-section-title`、`eve-num`（等宽 + tabular-nums + 右对齐）；把现有 `card-wrapper: 'rd-8px shadow-sm'` 改为 `'border border-[#1F1F1F] bg-[#070707]'`。
5. **新增组件 `web/src/components/eve/`**：`EveFrame`（切角边框容器）、`EvePanel`（标题栏 + 激活顶线）、`EveButton`（封装 NButton 的三种类型与闪白）、`SystemChip`（安等 chip）、`GlowLine`。安等色表放到 `web/src/constants/security.ts`，星图 `scene.ts` 和 chip 共用。
6. **字体**：在 `index.html` 通过 Google Fonts 引入 Barlow 400/600/700 与 JetBrains Mono 400/500。

## Iteration Guide

1. 一次只改一个组件；先改 token，再改组件覆盖，最后改页面。
2. 新组件默认：直角、32px 高、1px 边框、`{typography.body}`、primary 文字色。
3. 新按钮默认右下 9px 切角；新浮层默认 95% 不透明 `window-bg` + `border-grey`。
4. 任何地方要用颜色先查本文 token，不要内联新的十六进制色值。
5. 每个交互组件都要定义 Normal / Hover / Press 三态（EVE 的 Press 闪白是必需的，不可省略）。
6. 显示星系 → 用 `SystemChip`；显示数字 → 用 `eve-num`；显示分组 → 用 Section Title。

## Known Gaps

- **字体与图标版权**：EVE Sans Neue、Triglavian 字体以及 EVE 客户端图标（舰船 bracket、Neocom 图标等）属于 CCP Games。使用 Barlow 替代字体。界面图标优先用 [eve-icons](https://github.com/Incomplete-Infinity/eve-icons)（CCP 客户端图标的 SVG 描摹，按 CCP 第三方开发者许可使用），放在 `web/src/assets/svg-icon/eve/`，已转为 `currentColor`，统一 16px 单色；没有对应 EVE 图标的通用控件（搜索、刷新、关闭）才用 Iconify 线性图标（`tabler` / `carbon`）。若使用 EVE 图片服务器（`images.evetech.net`）的舰船/物品图标，遵守 CCP 的第三方开发者许可。
- **浅色模式**：EVE 没有浅色主题。SoybeanAdmin 现有的浅色切换建议保留但不作为设计目标；若保留，仅做"反相可读"保证，不追求 EVE 风格。可考虑直接隐藏主题切换按钮。
- **中文排版**：中文字号与英文同级，但中文不加 0.5px 字距。
