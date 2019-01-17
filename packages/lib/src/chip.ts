import m, { FactoryComponent, Attributes } from 'mithril';

export interface IChipsOptions extends Partial<M.ChipsOptions>, Attributes {
  onchange?: (chips: M.ChipData[]) => void;
}

/** Chips and tags */
export const Chips: FactoryComponent<IChipsOptions> = () => {
  return {
    oncreate: ({ attrs, dom }) => {
      const { onchange, onChipAdd, onChipDelete } = attrs;
      if (!onchange) {
        return;
      }
      const chips = M.Chips.getInstance(dom) as M.Chips;
      const onChipAddBound = onChipAdd ? (onChipAdd.bind(chips) as (el: Element, chip: Element) => void) : undefined;
      attrs.onChipAdd = function(this: M.Chips, el: Element, chip: Element) {
        onchange(this.chipsData);
        if (onChipAddBound) {
          onChipAddBound(el, chip);
        }
      };
      const onChipDeleteBound = onChipDelete
        ? (onChipDelete.bind(chips) as (el: Element, chip: Element) => void)
        : undefined;
      attrs.onChipDelete = function(this: M.Chips, el: Element, chip: Element) {
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
      const chips = M.Chips.getInstance(vnode.dom) as M.Chips;
      data.forEach(d => chips.addChip(d));
    },
    view: ({ attrs }) => {
      const { placeholder, data } = attrs;
      return m(
        `.chips.input-field.chips-autocomplete${placeholder ? '.placeholder' : ''}${data ? '.chips-initial' : ''}`
      );
    },
  };
};
