# EVE UI icons

144 single-colour SVG icons from https://github.com/Incomplete-Infinity/eve-icons
(`assets/icons/icons/*.svg`, commit `d9e92cc556f4ef5d253d646a750bef3ceb01e216`),
showcase: https://incomplete-infinity.github.io/eve-icons/

Eve Icons are property of CCP Games, used with permission / under the CCP third-party developer license.
The upstream repo has no licence of its own.

## Conversion

The originals are bare `<symbol>` fragments (traced from CCP client PNGs) whose look comes from a `.shape` CSS class
(gradient fill + stroke) in the showcase page. Per file we: wrapped them in `<svg viewBox="0 0 128 128">`; replaced
`class="shape"` with `fill="currentColor" stroke="none"` (`#fff` inside `<mask>` so masks still work, `#000` for
unfilled mask cut-outs); turned the few `gray` fills into `currentColor` at 50% opacity; dropped comments, classes,
styles, scripts, non-local references and any non-geometry attribute; lowercased names to kebab-case
(`jumpclones.svg` -> `jump-clones.svg`; some names remain unsplit, e.g. `charcustomization`). `clipPath`/`mask`/`defs`
are kept because they hold the actual geometry. The list of names is in `src/lib/eve-icons.ts`.

## Usage in EveCore

- Static: UnoCSS class `i-eve-<name>` (collection registered in `uno.config.ts` via `FileSystemIconLoader`),
  e.g. `<span class="i-eve-wallet" />`. Class names must be literal so UnoCSS can find them.
- Dynamic (name from data, route meta): `<EveIcon name="wallet" />` (`src/components/eve/EveIcon.vue`), names typed
  by `EveIconName` in `src/lib/eve-icons.ts`.

Colour follows `currentColor`.
