import m, { FactoryComponent, Attributes } from 'mithril';
import { Label, HelperText } from './label';

export interface IChipsOptions extends Partial<M.ChipsOptions>, Attributes {
  onchange?: (chips: M.ChipData[]) => void;
  /** Optional label above the input */
  label?: string;
  /** Optional help text below the input */
  helperText?: string;
}

/** Chips and tags */
export const Chips: FactoryComponent<IChipsOptions> = () => {
  return {
    view: ({
      attrs: {
        placeholder,
        required,
        isMandatory = required,
        // data = [],
        className = 'col s12',
        label,
        helperText,
        onchange,
        ...params
      },
    }) => {
      const cn = [
        'chips chips-autocomplete',
        placeholder ? 'chips-placeholder' : '',
        params.data ? 'chips-initial' : '',
      ]
        .filter(Boolean)
        .join(' ')
        .trim();
      return m('.input-field', { className }, [
        m('div', {
          className: cn,
          oncreate: ({ dom }) => {
            const { onChipAdd, onChipDelete } = params;
            const chips = M.Chips.getInstance(dom) as M.Chips;
            const onChipAddBound = onChipAdd
              ? (onChipAdd.bind(chips) as (el: Element, chip: Element) => void)
              : undefined;
            params.onChipAdd = function (this: M.Chips, el: Element, chip: Element) {
              if (onchange) {
                onchange(this.chipsData);
              }
              if (onChipAddBound) {
                onChipAddBound(el, chip);
              }
            };
            const onChipDeleteBound = onChipDelete
              ? (onChipDelete.bind(chips) as (el: Element, chip: Element) => void)
              : undefined;
            params.onChipDelete = function (this: M.Chips, el: Element, chip: Element) {
              if (onchange) {
                onchange(this.chipsData);
              }
              if (onChipDeleteBound) {
                onChipDeleteBound(el, chip);
              }
            };
            M.Chips.init(dom, params);
            // data.forEach((d) => chips.addChip(d));
          },
          onupdate: ({ dom }) => {
            if (!params.data || params.data.length === 0) {
              return;
            }
            const chips = M.Chips.getInstance(dom);
            params.data.forEach((d) => chips.addChip(d));
          },
        }),
        label ? m(Label, { label, isMandatory, className: 'active' }) : undefined,
        helperText ? m(HelperText, { helperText }) : undefined,
      ]);
    },
  };
};
