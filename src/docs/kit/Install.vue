<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { L, lang } from '../i18n';
import CodeBlock from './CodeBlock.vue';
import { collectSources, packagesOf, type SourceFile } from './sources';

/**
 * files: entry component files under src/components/eve/ (e.g. ['EveButton.vue']).
 * Everything they import from src/ is found and listed automatically.
 * lib: kept for older pages; extra src/lib files to list.
 */
const props = withDefaults(defineProps<{ files: string[]; lib?: string[] }>(), { lib: () => [] });

const sources = ref<SourceFile[]>([]);
const open = ref<Set<string>>(new Set());
const copied = ref('');

watchEffect(async () => {
  const entries = [...props.files, ...props.lib.map((f) => `src/lib/${f}`)];
  sources.value = await collectSources(entries);
});

const pkgs = computed(() => packagesOf(sources.value));
const assets = computed(() => [...new Set(sources.value.flatMap((s) => s.assets))]);

function toggle(path: string) {
  const next = new Set(open.value);
  if (next.has(path)) next.delete(path);
  else next.add(path);
  open.value = next;
}

async function copy(f: SourceFile) {
  await navigator.clipboard.writeText(f.code);
  copied.value = f.path;
  setTimeout(() => copied.value === f.path && (copied.value = ''), 1200);
}

function lang_(path: string): 'vue' | 'ts' {
  return path.endsWith('.vue') ? 'vue' : 'ts';
}
</script>

<template>
  <p>
    <L
      zh="把源码复制到你的项目（同样的路径），连同它依赖的文件。前提：已全局引入 src/styles/eve.css（含 tokens.css）。"
      en="Copy the source into your project (same paths), with what it needs. Assumes src/styles/eve.css (which imports tokens.css) is loaded once."
    />
  </p>
  <p v-if="pkgs.length" class="inst-note">
    <L zh="额外依赖：" en="Packages: " /><code v-for="p in pkgs" :key="p">{{ p }}</code>
  </p>
  <p v-if="assets.length" class="inst-note">
    <L zh="同时复制资源目录：" en="Also copy the folder: " /><code v-for="a in assets" :key="a">{{ a }}</code>
  </p>
  <div class="inst">
    <div v-for="f in sources" :key="f.path" class="inst-file" :class="{ open: open.has(f.path) }">
      <div class="inst-head">
        <button class="inst-toggle" :aria-expanded="open.has(f.path)" @click="toggle(f.path)">
          <span class="i-tabler-chevron-right inst-chev" />
          <span class="inst-path">{{ f.path }}</span>
          <span class="inst-lines eve-num">{{ f.lines }} {{ lang === 'zh' ? '行' : 'lines' }}</span>
        </button>
        <button class="inst-copy" :aria-label="lang === 'zh' ? '复制源码' : 'Copy source'" @click="copy(f)">
          <span :class="copied === f.path ? 'i-tabler-check' : 'i-tabler-copy'" />
        </button>
      </div>
      <CodeBlock v-if="open.has(f.path)" :code="f.code" :lang="lang_(f.path)" :title="f.path.split('/').pop()" class="inst-code" />
    </div>
  </div>
</template>

<style scoped>
.inst-note { color: var(--eve-text-secondary); }
.inst-note code + code { margin-left: 6px; }
.inst { border: 1px solid var(--eve-window-border); }
.inst-file + .inst-file { border-top: 1px solid var(--eve-window-border); }
.inst-head { display: flex; align-items: stretch; }
.inst-toggle {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  color: var(--eve-text-primary);
  font: var(--eve-text-body);
  text-shadow: var(--eve-text-shadow);
  text-align: left;
  cursor: pointer;
  transition: background-color var(--eve-dur-row) ease-out, color var(--eve-dur-hover) ease-out;
}
.inst-toggle:hover { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); }
.inst-toggle:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); transition-duration: 0ms; }
.inst-chev { color: var(--eve-text-secondary); transition: transform var(--eve-dur-hover) ease-out; }
.open .inst-chev { transform: rotate(90deg); color: var(--eve-primary); }
.inst-path { font: 12.5px var(--eve-font-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.inst-lines { margin-left: auto; color: var(--eve-text-secondary); font-size: 12px; }
.inst-copy {
  width: 32px;
  border: 0;
  border-left: 1px solid var(--eve-window-border);
  background: transparent;
  color: var(--eve-text-secondary);
  cursor: pointer;
  transition: background-color var(--eve-dur-hover) ease-out, color var(--eve-dur-hover) ease-out;
}
.inst-copy:hover { background: var(--eve-bg-hovered); color: var(--eve-text-highlighted); }
.inst-copy:active { background: var(--eve-bg-press); color: var(--eve-text-on-press); transition-duration: 0ms; }
.inst-code { border-width: 1px 0 0; }
.inst-code :deep(.code-body) { max-height: 480px; overflow: auto; }
</style>
