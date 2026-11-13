# AGENTS.md — EveCore design rules

Rules for building UI with EveCore, written to be followed by people and coding agents. Keep this file beside
the components you copy. `design.md` holds the full rationale and every token value; this file is the checklist.

## 0. What it should feel like

A ship terminal, not a website: near-black windows, translucent white text, one accent (Cryo Blue `#58A7BF`).
Hierarchy comes from 1px borders, small brightness steps and glow — never from drop shadows or big radii.
It is a dense tool: 14px body, 32px controls, 24px maximum regular gap.

## 1. Content

- Show labels, data and short states only ("No orders"). No feature intros, usage hints, data-definition notes,
  explanatory tooltips on headers, example text in placeholders, or "(optional)/(multi-select)" asides.
- Buttons: 1–3 words starting with a verb ("Undock", "Set destination").
- Uppercase only for short status labels (`HIGHSEC`, `ONLINE`) in detail type with 0.5px tracking. Never uppercase Chinese, never track Chinese.
- Numbers: JetBrains Mono, `tabular-nums`, right-aligned, thousands separators. ISK change = text colour `--eve-isk-up` / `--eve-isk-down` with ▲▼, never a coloured background.
- Every solar system is shown with `EveSystemChip` (security colour). Every group heading is an `EveSectionTitle`.

## 2. Colour

- Read colours only from `var(--eve-*)` (src/styles/tokens.css). Never inline a new hex value.
- `--eve-primary` (Cryo Blue) is scarce: active borders, selection, focus, the one primary action per screen, slider/checkbox marks.
- Text is white + alpha, not grey: highlighted 90% · primary 75% · secondary 50% · disabled 30%. `--eve-text-special` (#C3E9FF) for one special highlight such as the current system.
- Amber (game links), yellow (external links, destination), security colours and semantic colours are meanings, not decoration. No second brand colour.
- Dark only. There is no light theme; don't design one.

## 3. Type

- Sans: `var(--eve-font-sans)` (Barlow → HarmonyOS Sans SC / PingFang SC). Mono: `var(--eve-font-mono)` (JetBrains Mono). Never ship EVE Sans Neue.
- Scale: display 24 · headline 19 · header 16 · body 14 · detail 12. Use the `font: var(--eve-text-*)` shorthands or `.eve-*` classes.
- Headings are weight 400. Bold is only for game links and `detail-bold`.
- All text has the 1px hard shadow (`--eve-text-shadow`, set on body). Button labels use the soft `--eve-text-glow` instead.

## 4. Edges and shape

- Default is square: panels, inputs, tables, menus, tabs, tooltips, dialogs.
- Bottom-right 9px cut on buttons and collapsed select triggers (`EveFrame` / `.eve-cut-*`). Button groups: first `bl`, middle `none`, last `br`.
- Radii: 2px security/system chips and tags · 4px tab count badges · 6px pills (the maximum) · 50% avatars only.
- Panels: 1px `--eve-window-border` + dots background. Active panel: border-active + 1px `--eve-border-primary` top line + 2px/6px glow.
- Floating layers (tooltip, menu, popup): `--eve-overlay-bg` (95%) + 1px `--eve-overlay-border`. No box-shadow.
- A bordered cut needs two layers (clip-path removes borders). Use `EveFrame`; don't hand-roll it.

## 5. Spacing and layout

- Scale: 2 · 4 · 8 · 12 · 16 · 24. No 48/96px whitespace.
- Panel content padding 16px; title bar 48px (full) / 32px (small); panels in a grid with 8px gaps, filling the width — no max-width inside the app.
- Heights: controls 32px, menu items 21px, select options 31px, table rows ≈22px (2px vertical cell padding). Mobile (<640px): 40px for controls and menu items (tokens switch automatically).
- Breakpoints: <640 single column, sidebar as drawer, tables become panel cards · 640–1024 sidebar collapsed (64px) · 1024–1600 sidebar 220px · >1600 keep filling.

## 6. States

Every interactive element defines Normal, Hover, Press, Disabled and Focus.

- Hover lights up: brighter fill, brighter border (`--eve-border-primary-light`), optional inset glow.
- Press flashes white: fill and border `--eve-bg-press` (#EAEAEA), text `--eve-text-on-press`, instantly; release after 150ms (`usePressFlash`). Never remove it.
- Selected: `--eve-bg-selected` rows, primary indicators, vertical glow line on navigation.
- Disabled: keep the normal face, text `--eve-text-disabled`, no hover, `cursor: not-allowed`.
- Focus: `:focus-visible` only — a 1px `--eve-border-primary-light` line, no ring halo.
- Glow means "active or interactive". Never put glow on static elements.

## 7. Motion

- Hover colour 150ms · row hover 250ms · window activation 200ms · progress 600ms · page change: fade only, 150ms. All `ease-out`.
- No slide/scale page transitions. Count-up animation is allowed for ISK balances and stats.
- Respect `prefers-reduced-motion` (the duration tokens drop to 0ms).

## 8. Icons

- 16px, monochrome, `currentColor`. Prefer the eve-icons set (CCP third-party licence) in `src/assets/icons/eve/` (UnoCSS `i-eve-<name>` for static use, `EveIcon` for dynamic names);
  Tabler via UnoCSS (`i-tabler-*`) for generic controls (search, close, refresh). Class names must be literal strings.
- Icon colour follows text: secondary at rest, highlighted on hover, primary when active.

## 9. Accessibility

- Real elements first (`button`, `a`, `input`). Custom widgets follow the WAI-ARIA pattern: roles, `aria-checked/expanded/selected`, roving tabindex, arrow keys, Escape closes overlays and returns focus.
- Icon-only buttons need a label. Never rely on colour alone for hostile/danger — pair with an icon or text.

## 10. Building a new component

1. Start from the defaults: square, 32px tall, 1px border, body type, primary text colour.
2. Tokens first, then component styles, then pages. One component at a time.
3. Buttons get the bottom-right cut; new overlays get the overlay background and border.
4. Define all five states. Check it at 375px wide.
5. Write the file header: purpose, rules, `Requires:` list. See AUTHORING.md for the docs page.
