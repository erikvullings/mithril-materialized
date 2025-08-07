// Styles are imported via the main index or individual component imports
import m, { FactoryComponent, Attributes } from 'mithril';

export interface ICodeBlock extends Attributes {
  language?: string;
  code: string | string[];
  newRow?: boolean;
}

/** A simple code block without syntax high-lighting */
export const CodeBlock: FactoryComponent<ICodeBlock> = () => ({
  view: ({ attrs }) => {
    const { newRow, code, language, className, ...params } = attrs;
    const lang = language || 'lang-TypeScript';
    const label = lang.replace('lang-', '');
    const cb = code instanceof Array ? code.join('\n') : code;
    const cn = [newRow ? 'clear' : '', lang, className].filter(Boolean).join(' ').trim();
    return m(`pre.codeblock${newRow ? '.clear' : ''}`, attrs, [
      m('div', m('label', label)),
      m(
        'code',
        {
          ...params,
          className: cn,
        },
        cb
      ),
    ]);
  },
});
