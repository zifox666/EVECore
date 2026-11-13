// Rewrites the '@/…' path alias in emitted declaration files to relative paths,
// so consumers' TypeScript can resolve them.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const root = 'dist-lib/types';
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.d.ts')) {
      const src = readFileSync(p, 'utf8');
      const out = src.replace(/(['"])@\/([^'"]+)\1/g, (_m, q, rest) => {
        let rel = relative(dirname(p), join(root, rest)).split('\\').join('/');
        if (!rel.startsWith('.')) rel = `./${rel}`;
        return `${q}${rel}${q}`;
      });
      if (out !== src) writeFileSync(p, out);
    }
  }
}
walk(root);
