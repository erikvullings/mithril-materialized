import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import m, { Attributes, FactoryComponent } from 'mithril';
import './highlighted-code-block.css';

hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);

export interface HighlightedCodeBlockAttrs extends Attributes {
  code: string | string[];
  language: 'typescript' | 'css';
}

/** Example-app-only code block with TypeScript and CSS syntax highlighting. */
export const HighlightedCodeBlock: FactoryComponent<HighlightedCodeBlockAttrs> = () => ({
  view: ({ attrs }) => {
    const { code, language, className, ...params } = attrs;
    const source = Array.isArray(code) ? code.join('\n') : code;
    const highlighted = hljs.highlight(source, { language }).value;
    const label = language === 'typescript' ? 'TypeScript' : 'CSS';

    return m('pre.example-codeblock', { ...params, className }, [
      m('div.example-codeblock__label', label),
      m('code.hljs', m.trust(highlighted)),
    ]);
  },
});
