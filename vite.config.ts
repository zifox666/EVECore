import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { copyFileSync, readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

// GitHub Pages serves 404.html for unknown paths; make it the SPA shell so deep links work.
const spaFallback = (): Plugin => ({
  name: 'spa-fallback',
  apply: 'build',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html');
  },
});

// /llms.txt serves the design rules (AGENTS.md) to coding agents, in dev and in the built site.
const llmsTxt = (): Plugin => ({
  name: 'llms-txt',
  configureServer(server) {
    server.middlewares.use('/llms.txt', (_req, res) => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(readFileSync('AGENTS.md', 'utf8'));
    });
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'llms.txt', source: readFileSync('AGENTS.md', 'utf8') });
  },
});

export default defineConfig({
  base: process.env.BASE_URL ?? '/',
  plugins: [vue(), UnoCSS(), spaFallback(), llmsTxt()],
  // Docs pages quote `import … from 'unocss'` inside code samples; keep the dep scanner from bundling it.
  optimizeDeps: { exclude: ['unocss'], include: ['vue', 'vue-router'] },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
