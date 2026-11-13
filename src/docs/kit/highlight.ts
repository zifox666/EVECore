import type { HighlighterCore } from 'shiki/core';

let loader: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  loader ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);
    return createHighlighterCore({
      themes: [import('shiki/themes/vitesse-dark.mjs')],
      langs: [
        import('shiki/langs/vue.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/bash.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  })();
  return loader;
}

export type CodeLang = 'vue' | 'ts' | 'css' | 'html' | 'bash';

export async function highlight(code: string, lang: CodeLang): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code.trimEnd(), {
    lang: lang === 'ts' ? 'typescript' : lang,
    theme: 'vitesse-dark',
    colorReplacements: { '#121212': 'transparent' },
  });
}
