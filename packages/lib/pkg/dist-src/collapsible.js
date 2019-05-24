import m from 'mithril';
export const CollapsibleItem = () => {
    return {
        view: ({ attrs: { header, body, active, iconName } }) => {
            return m(active ? 'li.active' : 'li', [
                header || iconName
                    ? m('.collapsible-header', [
                        iconName ? m('i.material-icons', iconName) : undefined,
                        header ? (typeof header === 'string' ? m('span', header) : header) : undefined,
                    ])
                    : undefined,
                body ? m('.collapsible-body', typeof body === 'string' ? body : body) : undefined,
            ]);
        },
    };
};
/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/collapsible.html
 */
export const Collapsible = () => {
    return {
        oncreate: ({ dom, attrs }) => {
            M.Collapsible.init(dom, attrs);
        },
        view: ({ attrs }) => {
            const { items } = attrs;
            return items && items.length > 0 ? m('ul.collapsible', items.map(item => m(CollapsibleItem, item))) : undefined;
        },
    };
};
//# sourceMappingURL=collapsible.js.map