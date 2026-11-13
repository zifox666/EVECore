// SPDX-License-Identifier: MIT
// @newdoublex/evecore/unocss — UnoCSS preset: eve-* colours, eve-panel / eve-section-title / eve-num shortcuts,
// and the EVE icon collection as i-eve-<name>.
//
//   import { presetEvecore } from '@newdoublex/evecore/unocss';
//   export default defineConfig({ presets: [presetWind3(), presetIcons(), presetEvecore()] });
import { fileURLToPath } from 'node:url';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import { presetIcons, type Preset } from 'unocss';

export const eveTheme = {
  colors: {
    eve: {
      'window-bg': 'var(--eve-window-bg)',
      'window-bg-secondary': 'var(--eve-window-bg-secondary)',
      'window-bg-active': 'var(--eve-window-bg-active)',
      'window-border': 'var(--eve-window-border)',
      primary: 'var(--eve-primary)',
      'primary-dark': 'var(--eve-primary-dark)',
      'bg-primary': 'var(--eve-bg-primary)',
      'bg-primary-light': 'var(--eve-bg-primary-light)',
      'bg-selected': 'var(--eve-bg-selected)',
      'bg-hovered': 'var(--eve-bg-hovered)',
      'border-primary': 'var(--eve-border-primary)',
      'border-grey': 'var(--eve-border-grey)',
      'border-grey-light': 'var(--eve-border-grey-light)',
      divider: 'var(--eve-divider)',
      special: 'var(--eve-text-special)',
      highlighted: 'var(--eve-text-highlighted)',
      text: 'var(--eve-text-primary)',
      secondary: 'var(--eve-text-secondary)',
      disabled: 'var(--eve-text-disabled)',
      success: 'var(--eve-success)',
      warning: 'var(--eve-warning)',
      danger: 'var(--eve-danger)',
      away: 'var(--eve-away)',
      link: 'var(--eve-text-link)',
    },
  },
};

export const eveShortcuts: Record<string, string> = {
  'eve-panel': 'border border-solid border-eve-window-border bg-eve-window-bg eve-dots',
  'eve-section-title': 'bg-eve-bg-primary text-eve-text px-2 py-1 text-16px font-400',
  'eve-num': 'font-mono tabular-nums text-right',
  'card-wrapper': 'border border-solid border-eve-window-border bg-eve-window-bg',
};

export interface EvecorePresetOptions {
  /** Folder holding the EVE icon SVGs. Defaults to the copy shipped in the package (dist/icons/eve). */
  iconsDir?: string;
  /** Class prefix for icons. Default 'i-'. */
  iconPrefix?: string;
}

/** Default icons folder: next to this module once built (dist/icons/eve). */
function defaultIconsDir(): string {
  return fileURLToPath(new URL(/* @vite-ignore */ './icons/eve/', import.meta.url));
}

export function presetEvecore(options: EvecorePresetOptions = {}): Preset {
  const icons = presetIcons({
    prefix: options.iconPrefix ?? 'i-',
    scale: 1,
    extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
    collections: { eve: FileSystemIconLoader(options.iconsDir ?? defaultIconsDir()) },
  }) as Preset;
  return {
    ...icons,
    name: 'evecore',
    theme: eveTheme,
    shortcuts: eveShortcuts,
  };
}

export default presetEvecore;
