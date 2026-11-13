// Raw sources of everything a user may copy, loaded lazily, plus import-graph resolution so a page
// only names its component and the Installation section lists "what it needs".

const components = import.meta.glob<string>('../../components/eve/*.vue', { query: '?raw', import: 'default' });
const libs = import.meta.glob<string>('../../lib/*.ts', { query: '?raw', import: 'default' });

/** Copy path (as the user sees it) → loader */
const loaders: Record<string, () => Promise<string>> = {};
for (const [k, v] of Object.entries(components)) loaders[k.replace('../../', 'src/')] = v;
for (const [k, v] of Object.entries(libs)) loaders[k.replace('../../', 'src/')] = v;

export interface SourceFile {
  path: string;
  code: string;
  lines: number;
  /** Non-code assets the file needs (e.g. an icon folder). */
  assets: string[];
}

const IMPORT_RE = /(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const GLOB_RE = /import\.meta\.glob[^(]*\(\s*['"]([^'"]+)['"]/g;

function resolve(spec: string, from: string): string | undefined {
  let p: string;
  if (spec.startsWith('@/')) p = `src/${spec.slice(2)}`;
  else if (spec.startsWith('.')) {
    const parts = from.split('/').slice(0, -1);
    for (const seg of spec.split('/')) {
      if (seg === '..') parts.pop();
      else if (seg !== '.') parts.push(seg);
    }
    p = parts.join('/');
  } else return undefined; // package import
  if (loaders[p]) return p;
  if (loaders[`${p}.ts`]) return `${p}.ts`;
  return undefined;
}

function globAsset(spec: string, from: string): string {
  const parts = from.split('/').slice(0, -1);
  for (const seg of spec.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg !== '.') parts.push(seg);
  }
  return parts.join('/');
}

/** Load `entries` (component file names like "EveButton.vue" or src paths) and everything they import, depth-first. */
export async function collectSources(entries: string[]): Promise<SourceFile[]> {
  const seen = new Map<string, SourceFile>();
  async function visit(path: string) {
    if (seen.has(path) || !loaders[path]) return;
    const code = await loaders[path]();
    const file: SourceFile = { path, code, lines: code.trimEnd().split('\n').length, assets: [] };
    seen.set(path, file);
    for (const m of code.matchAll(GLOB_RE)) file.assets.push(globAsset(m[1], path));
    for (const m of code.matchAll(IMPORT_RE)) {
      const dep = resolve(m[1] ?? m[2], path);
      if (dep) await visit(dep);
    }
  }
  for (const e of entries) await visit(e.startsWith('src/') ? e : `src/components/eve/${e}`);
  return [...seen.values()];
}

/** npm packages a set of sources imports (excluding vue). */
export function packagesOf(files: SourceFile[]): string[] {
  const pkgs = new Set<string>();
  for (const f of files)
    for (const m of f.code.matchAll(IMPORT_RE)) {
      const spec = m[1] ?? m[2];
      if (!spec || spec.startsWith('.') || spec.startsWith('@/') || spec === 'vue') continue;
      pkgs.add(spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]);
    }
  return [...pkgs];
}
