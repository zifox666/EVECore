// Builds the npm package into dist-lib/:
//   index.js (components, ES module) · evecore.css (tokens + base + components + their icons)
//   unocss.js (UnoCSS preset, Node) · icons/eve/*.svg · tokens.css · types/
import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { presetIcons } from 'unocss';
import UnoCSS from 'unocss/vite';
import { defineConfig, type Plugin } from 'vite';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

const copyAssets = (): Plugin => ({
  name: 'evecore-copy-assets',
  apply: 'build',
  closeBundle() {
    mkdirSync('dist-lib/icons', { recursive: true });
    cpSync('src/assets/icons/eve', 'dist-lib/icons/eve', { recursive: true });
    cpSync('src/styles/tokens.css', 'dist-lib/tokens.css');
  },
});

export default defineConfig({
  plugins: [
    vue(),
    // Only icons: no preflight/reset leaks into consumer apps. Scans component sources only.
    UnoCSS({
      configFile: false,
      presets: [
        presetIcons({
          scale: 1,
          extraProperties: { display: 'inline-block', 'vertical-align': 'middle' },
          collections: { eve: FileSystemIconLoader('./src/assets/icons/eve') },
        }),
      ],
      content: { filesystem: ['src/components/eve/*.vue'], pipeline: { include: [/src\/components\/eve\/.*\.vue($|\?)/] } },
    }),
    copyAssets(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: { index: 'src/package.ts', unocss: 'src/unocss.ts' },
      formats: ['es'],
      cssFileName: 'evecore',
    },
    rollupOptions: {
      external: [/^vue($|\/)/, /^unocss($|\/)/, /^@iconify\//, /^node:/],
      output: { chunkFileNames: 'chunks/[name]-[hash].js', assetFileNames: '[name][extname]' },
    },
  },
});
