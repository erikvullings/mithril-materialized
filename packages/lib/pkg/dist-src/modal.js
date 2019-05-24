import m from 'mithril';
/** Builds a modal panel, which can be triggered using its id */
export const ModalPanel = () => ({
    oncreate: ({ dom, attrs: { options } }) => {
        M.Modal.init(dom, options);
    },
    view: ({ attrs: { id, title, description, fixedFooter, bottomSheet, buttons, richContent } }) => {
        const ff = fixedFooter ? '.modal-fixed-footer' : '';
        const bs = bottomSheet ? '.bottom-sheet' : '';
        return m(`.modal${ff}${bs}[id=${id}]`, [
            m('.modal-content', [
                m('h4', title),
                richContent && typeof description === 'string'
                    ? m.trust(description || '')
                    : typeof description === 'string'
                        ? m('p', description)
                        : description,
            ]),
            buttons
                ? m('.modal-footer', buttons.map(b => m('a.modal-close.waves-effect.waves-green.btn-flat', { onclick: b.onclick }, b.label)))
                : undefined,
        ]);
    },
});
//# sourceMappingURL=modal.js.map