import m, { FactoryComponent } from 'mithril';
import { uniqueId, toAttrs } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

export interface IAutoCompleteOptions extends Partial<M.AutocompleteOptions>, IInputOptions<string> {}

/** Component to auto complete your text input */
export const Autocomplete: FactoryComponent<IAutoCompleteOptions> = () => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const attributes = toAttrs(attrs);
      const {
        label,
        helperText,
        initialValue,
        onchange,
        newRow,
        className = 'col s12',
        style,
        iconName,
        isMandatory,
      } = attrs;
      const cn = newRow ? className + ' clear' : className;
      return m(`.input-field${newRow ? '.clear' : ''}`, { className: cn, style }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.autocomplete[type=text][tabindex=0]${attributes}`, {
          id,
          oncreate: ({ dom }) => {
            M.Autocomplete.init(dom, attrs);
          },
          onchange: onchange
            ? (e: Event) => {
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
