import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import m, { Attributes, FactoryComponent } from 'mithril';
import './highlighted-code-block.css';

hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

export interface HighlightedCodeBlockAttrs extends Attributes {
  code: string | string[];
  /** Defaults to TypeScript, which is the example app's most common snippet language. */
  language?: 'typescript' | 'css' | 'console';
}

/** Example-app-only code block with TypeScript and CSS syntax highlighting. */
export const HighlightedCodeBlock: FactoryComponent<HighlightedCodeBlockAttrs> = () => ({
  view: ({ attrs }) => {
    const { code, language = 'typescript', className, ...params } = attrs;
    const source = Array.isArray(code) ? code.join('\n') : code;
    const hlLanguage = language === 'console' ? 'bash' : language;
    const highlighted = hljs.highlight(source, { language: hlLanguage }).value;
    const label = language === 'typescript' ? 'TypeScript' : language === 'css' ? 'CSS' : 'Console';

    return m('pre.example-codeblock', { ...params, className }, [
      m('div.example-codeblock__label', label),
      m('code.hljs', m.trust(highlighted)),
    ]);
  },
});
