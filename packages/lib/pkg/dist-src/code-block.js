import './styles/codeblock.css';
import m from 'mithril';
/** A simple code block without syntax high-lighting */
export const CodeBlock = () => ({
    view: ({ attrs }) => {
        const { newRow, code, language } = attrs;
        const lang = language || 'lang-TypeScript';
        const label = lang.replace('lang-', '');
        const cb = code instanceof Array ? code.join('\n') : code;
        return m(`pre.codeblock${newRow ? '.clear' : ''}`, attrs, [
            m('div', m('label', label)),
            m(`code.${lang}`, cb),
        ]);
    },
});
//# sourceMappingURL=code-block.js.map