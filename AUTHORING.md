# Authoring EveCore components and docs pages

Read `design.md` first — it is the source of truth for every colour, size and state.
Reference implementations to copy the pattern from:

- `src/components/eve/EveButton.vue`, `src/components/eve/EveFrame.vue`
- `src/docs/pages/components/button/` (meta.ts, index.vue, demos/)

## Component files — `src/components/eve/Eve<Name>.vue`

- Vue 3 `<script setup lang="ts">`, `defineProps` with `withDefaults`, `defineEmits` typed, `defineModel` for v-model.
- File starts with `<!-- SPDX-License-Identifier: MIT -->` and a comment block: one-line purpose, the key visual rules,
  and `Requires:` listing every other file it imports (so a user knows what to copy).
- Styles: a **non-scoped** `<style>` block with BEM-ish classes prefixed `eve-<name>` (e.g. `.eve-select__option`).
  Read only `var(--eve-*)` tokens from `src/styles/tokens.css`. Never inline a new hex value — if a token is
  truly missing, add the hex as a local custom property at the top of the component with a comment, and mention it in your report.
- Icons: prefer EVE client icons — UnoCSS class `i-eve-<name>` (names in `src/lib/eve-icons.ts`, files in
  `src/assets/icons/eve/`), e.g. `i-eve-wallet`, `i-eve-warning`, `i-eve-settings`, `i-eve-info`. Use Tabler
  (`i-tabler-*`) only for generic controls with no EVE equivalent (chevrons, close ×, check, plus, copy, external link).
  For an icon name that comes from data, use `<EveIcon :name="…" />`. Class names must appear literally in source
  (UnoCSS scans files) — no string concatenation.
- Shared helpers available: `@/lib/utils` (`cutPolygon`, `formatIsk`, `usePressFlash` — use `v-on="handlers"`),
  `@/lib/security` (`securityColor`, `formatSecurity`, `roundSecurity`, `withAlpha`). Vue's own `useId()` for ids.
- Forced states for docs: every interactive component also honours `data-eve-state="hover|press|focus"` on its root
  (write selectors as `:is(:hover, [data-eve-state='hover'])`, `:is(.is-pressed, [data-eve-state='press'])`,
  `:is(:focus-visible, [data-eve-state='focus'])`), so pages can show a static state matrix. Mention it in the header comment.
- Every interactive part defines Normal / Hover / Press. Press = instant `--eve-bg-press` (#EAEAEA) flash with
  `--eve-text-on-press` text, released after 150ms (`usePressFlash`). Disabled = normal face + `--eve-text-disabled`, no hover.
- Geometry: square corners. Cut corners only on buttons and select triggers (use `EveFrame` or its `data-cut` CSS).
  No `box-shadow` drop shadows; glow (`0 0 6px`) only on active/hover/selected.
- Density: control height `var(--eve-control-height)` (32px; 40px on mobile automatically), body 14px.
- Motion: use `--eve-dur-hover` (150ms), `--eve-dur-row` (250ms), `--eve-dur-window` (200ms), `--eve-dur-progress` (600ms) with `ease-out`.
- Accessibility: correct roles/aria (`role="tab"`, `aria-checked`, `aria-expanded`, …), keyboard support for
  anything focusable (arrows/Enter/Escape where the WAI-ARIA pattern says so), `:focus-visible` styling.
- Overlays (popover/menu/tooltip/dialog): `<Teleport to="body">`, background `var(--eve-overlay-bg)`, 1px `var(--eve-overlay-border)`,
  position with `getBoundingClientRect()` + flip when off-screen; close on Escape and outside click.
- No helper text in UI (design.md "Don't"): no explanatory placeholders, no "(optional)" hints.

## Docs pages — `src/docs/pages/components/<slug>/`

Pages are auto-discovered; **never edit** `src/docs/registry.ts`, `App.vue`, `src/docs/kit/*`, `src/styles/*` or `src/lib/*`.

- `meta.ts` — `export default { slug, category, order, title: {zh, en}, description: {zh, en} } satisfies PageMeta`.
  Category is one of `actions | forms | navigation | layout | content | feedback`. Title format: zh `"中文名 EnglishName"`, en `"EnglishName"`.
- `demos/<Name>.vue` — small, self-contained, imports the component via `@/components/eve/…`. Use EVE vocabulary for
  sample data (Jita, Amarr, Perimeter, Rifter, Tritanium, ISK amounts) so one demo works for both languages.
- `demos/Showcase.vue` — ONE showcase that is the page's hero preview, mcore style: a stack of
  `<DemoGroup :label="{zh,en}" :hint="{zh,en}">` rows (import `{ DemoGroup } from '@/docs/kit'`). Typical rows:
  variants / sizes; interactive behaviour ("try …"); for interactive components a **"<variant> states (static)"** row per
  variant showing normal · hover · press · focus (via `data-eve-state`) · disabled (· loading/invalid where they exist);
  edge cases (long labels, empty, full width, overflow). Hints are ≤ 8 words. Pass `:row="false"` for block content.
  Extra demo files only when a case really needs its own code view (e.g. a dialog flow).
- `index.vue` — import from `'../../../kit'`: `DocPage, DocSection, Demo, CodeBlock, PropsTable, Install, Rules, L, t, type PropRow`.
  Structure, in order:
  1. `<Demo :code="showcaseCode"><Showcase /></Demo>` (import + `?raw`) — no separate "Examples" section
  2. `<DocSection id="installation" zh="安装" en="Installation">` with `<Install :files="['EveX.vue']" />` — entry file(s)
     only; dependencies (other components, src/lib files, asset folders, npm packages) are resolved from imports automatically
  3. `<DocSection id="usage" …>` with a short usage `CodeBlock`, then `PropsTable` (props), plus `kind="events"` / `kind="slots"`
     tables when relevant, then 1–3 short `<p>` notes on behaviour (keyboard, a11y, quirks)
  4. `<DocSection id="rules" …>` with `<Rules :do="[…]" :dont="[…]" />`, all `{zh, en}`
- All prose is bilingual with `<L zh="…" en="…" />` or `t({zh, en})`.
- A `</script>` inside a JS template string must be written `<\/script>`.

## Checking your work

`npx vue-tsc --noEmit` must show no errors in your files. The dev server runs at http://localhost:4173
(pages at `/components/<slug>`, `/design/<slug>`); `curl -s localhost:4173/src/components/eve/EveX.vue >/dev/null` compiles a file.
