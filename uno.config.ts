// SPDX-License-Identifier: MIT
// Docs-site UnoCSS config. Consumers of the npm package use `presetEvecore` from '@newdoublex/evecore/unocss'.
import { defineConfig, presetIcons, presetWind3 } from 'unocss';
import { presetEvecore } from './src/unocss';

export { eveShortcuts, eveTheme } from './src/unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({ scale: 1, extraProperties: { display: 'inline-block', 'vertical-align': 'middle' } }),
    presetEvecore({ iconsDir: './src/assets/icons/eve' }),
  ],
  content: {
    pipeline: {
      include: [/\.(vue|[jt]sx?|html)($|\?)/],
    },
  },
});
