import m from 'mithril';
/** Chips and tags */
export const Chips = () => {
    return {
        oncreate: ({ attrs, dom }) => {
            const { onchange, onChipAdd, onChipDelete } = attrs;
            if (!onchange) {
                return;
            }
            const chips = M.Chips.getInstance(dom);
            const onChipAddBound = onChipAdd ? onChipAdd.bind(chips) : undefined;
            attrs.onChipAdd = function (el, chip) {
                onchange(this.chipsData);
                if (onChipAddBound) {
                    onChipAddBound(el, chip);
                }
            };
            const onChipDeleteBound = onChipDelete
                ? onChipDelete.bind(chips)
                : undefined;
            attrs.onChipDelete = function (el, chip) {
                onchange(this.chipsData);
                if (onChipDeleteBound) {
                    onChipDeleteBound(el, chip);
                }
            };
            M.Chips.init(dom, attrs);
        },
        onupdate: vnode => {
            const { data } = vnode.attrs;
            if (!data || data.length === 0) {
                return;
            }
            const chips = M.Chips.getInstance(vnode.dom);
            data.forEach(d => chips.addChip(d));
        },
        view: ({ attrs }) => {
            const { placeholder, data } = attrs;
            return m(`.chips.input-field.chips-autocomplete${placeholder ? '.placeholder' : ''}${data ? '.chips-initial' : ''}`);
        },
    };
};
//# sourceMappingURL=chip.js.map