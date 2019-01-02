import m, { Component } from 'mithril';
import { uniqueId, toDottedClassList, toAttrs } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

/** Component to auto complete your text input */
export const Autocomplete = (): Component<Partial<M.AutocompleteOptions> & IInputOptions<string>> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, onchange, newRow, contentClass, style, iconName, isMandatory } = attrs;
      return m(`.input-field${newRow ? '.clear' : ''}${toDottedClassList(contentClass)}`, { style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.autocomplete[type=text][tabindex=0][id=${id}]${attributes}`, {
          oncreate: ({ dom }) => {
            M.Autocomplete.init(dom, attrs);
          },
          onchange: onchange
            ? (e: Event ) => {
                if (e.target && (e.target as HTMLInputElement).value) {
                  onchange((e.target as HTMLInputElement).value);
                }
              }
            : undefined,
          value: initialValue,
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};
