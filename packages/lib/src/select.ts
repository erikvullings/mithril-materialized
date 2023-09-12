import m, { Attributes, Component } from 'mithril';
import { isNumeric } from './utils';
import { Label, HelperText } from './label';
import { IInputOption } from './option';

export interface ISelectOptions<T extends string | number> extends Attributes, Partial<M.FormSelectOptions> {
  /** Options to select from */
  options: IInputOption<T>[];
  /** Called when the value is changed, either contains a single or all selected (checked) ids */
  onchange: (checkedIds: T[]) => void;
  /**
   * Selected id or ids (in case of multiple options). Processed in the oninit and onupdate lifecycle.
   * When the checkedId property changes (using a shallow compare), the selections are updated accordingly.
   */
  checkedId?: T | T[];
  /** Selected id or ids (in case of multiple options). Only processed in the oninit lifecycle. */
  initialValue?: T | T[];
  /** Select a single option or multiple options */
  multiple?: boolean;
  /** Optional label. */
  label?: string;
  /** Optional ID. */
  id?: string;
  /** Unique key for use of the element in an array. */
  key?: string | number;
  /** Add a a placeholder to the input field. */
  placeholder?: string;
  /** Add a description underneath the input field. */
  helperText?: string;
  /** Uses Materialize icons as a prefix or postfix. */
  iconName?: string;
  /** Sets the input field to disabled. */
  disabled?: boolean;
  /** Optional style information. */
  style?: string;
  /** If true, break to a new row */
  newRow?: boolean;
  /**
   * If true, add a mandatory * after the label (if any),
   * and add the required and aria-required attributes to the input element.
   */
  isMandatory?: boolean;
  /** Add the required and aria-required attributes to the input element */
  required?: boolean;
  /** Enable the clear icon */
  showClearButton?: boolean;
}

/** Component to select from a list of values in a dropdowns */
export const Select = <T extends string | number>(): Component<ISelectOptions<T>> => {
  const state = {} as {
    checkedId?: T | T[];
    initialValue?: T[];
    instance?: M.FormSelect;
    /** Only initialized when multiple select */
    wrapper?: HTMLDivElement;
    /** Only initialized when multiple select */
    inputEl?: HTMLInputElement;
    /** Concatenation of all options IDs, to see if the options have changed and we need to re-init the select */
    ids?: string;
  };
  const optionsIds = (options: IInputOption<T>[]) => options.map((o) => o.id).join('');

  const isSelected = (id?: T, checkedId?: T[], selected = false) =>
    selected ||
    (checkedId instanceof Array && (id || typeof id === 'number') ? checkedId.indexOf(id) >= 0 : checkedId === id);

  return {
    oninit: ({ attrs: { checkedId, initialValue, options } }) => {
      state.ids = optionsIds(options);
      const iv = checkedId || initialValue;
      state.checkedId = checkedId instanceof Array ? [...checkedId] : checkedId;
      state.initialValue =
        iv !== null && typeof iv !== 'undefined'
          ? iv instanceof Array
            ? iv.filter((i) => i !== null && typeof i !== 'undefined')
            : [iv]
          : [];
    },
    view: ({
      attrs: {
        id,
        newRow,
        className = 'col s12',
        checkedId,
        key,
        options,
        multiple,
        label,
        helperText,
        placeholder = '',
        isMandatory,
        iconName,
        disabled,
        classes = '',
        dropdownOptions,
        // showClearButton,
        onchange: callback,
      },
    }) => {
      if (state.checkedId !== checkedId) {
        state.initialValue = checkedId ? (checkedId instanceof Array ? checkedId : [checkedId]) : undefined;
      }
      const { initialValue } = state;
      const onchange = callback
        ? multiple
          ? () => {
              const values = state.instance && state.instance.getSelectedValues();
              const v = values
                ? values.length > 0 && isNumeric(values[0])
                  ? values.map((n) => +n)
                  : values.filter((i) => i !== null || typeof i !== 'undefined')
                : undefined;
              state.initialValue = v ? (v as T[]) : [];
              callback(state.initialValue);
            }
          : (e: Event) => {
              if (e && e.currentTarget) {
                const b = e.currentTarget as HTMLButtonElement;
                const v = (isNumeric(b.value) ? +b.value : b.value) as T;
                state.initialValue = typeof v !== undefined ? [v] : [];
              }
              state.initialValue && callback(state.initialValue);
            }
        : undefined;
      if (newRow) className += ' clear';
      const noValidSelection = !options.some((o) => isSelected(o.id, initialValue));
      const groups = options.reduce((acc, cur) => {
        if (cur.group && acc.indexOf(cur.group) < 0) acc.push(cur.group);
        return acc;
      }, [] as string[]);

      return m(
        '.input-field.select-space',
        {
          className,
          key,
          oncreate: multiple ? ({ dom }) => (state.wrapper = dom as HTMLDivElement) : undefined,
        },
        [
          iconName && m('i.material-icons.prefix', iconName),
          m(
            'select',
            {
              id,
              title: label,
              disabled,
              multiple,
              oncreate: ({ dom }) => {
                state.instance = M.FormSelect.init(dom, { classes, dropdownOptions });
              },
              onupdate: ({ dom }) => {
                if (multiple) {
                  // Ugly hack to remove the placeholder when only one item is selected.
                  if (
                    !state.inputEl &&
                    state.wrapper &&
                    state.wrapper.childNodes &&
                    state.wrapper.childNodes.length > 0 &&
                    state.wrapper.childNodes[0].childNodes &&
                    state.wrapper.childNodes[0].childNodes[0]
                  ) {
                    state.inputEl = state.wrapper.childNodes[0].childNodes[0] as HTMLInputElement;
                  }
                  if (state.inputEl && state.inputEl.value.startsWith(`${placeholder}, `)) {
                    state.inputEl.value = state.inputEl.value.replace(`${placeholder}, `, '');
                  }
                }
                const ids = optionsIds(options);
                let reinit = checkedId && state.checkedId !== checkedId.toString();
                if (state.ids !== ids) {
                  state.ids = ids;
                  reinit = true;
                }
                if (
                  state.checkedId instanceof Array && checkedId instanceof Array
                    ? state.checkedId.join() !== checkedId.join()
                    : state.checkedId !== checkedId
                ) {
                  state.checkedId = checkedId;
                  reinit = true;
                }
                if (reinit) {
                  state.instance = M.FormSelect.init(dom, { classes, dropdownOptions });
                }
              },
              onchange,
            },
            // groups.length === 0 &&
            m('option', { value: '', disabled: true, selected: noValidSelection ? true : undefined }, placeholder),
            groups.length === 0
              ? options.map((o, i) =>
                  m(
                    'option',
                    {
                      value: o.id,
                      title: o.title || undefined,
                      disabled: o.disabled ? 'true' : undefined,
                      'data-icon': o.img || undefined,
                      selected: isSelected(o.id, initialValue, i === 0 && noValidSelection && !placeholder),
                    },
                    o.label?.replace('&amp;', '&')
                  )
                )
              : groups.map((g) =>
                  m(
                    'optgroup',
                    { label: g },
                    options
                      .filter((o) => o.group === g)
                      .map((o, i) =>
                        m(
                          'option',
                          {
                            value: o.id,
                            title: o.title || undefined,
                            disabled: o.disabled ? 'true' : undefined,
                            'data-icon': o.img || undefined,
                            selected: isSelected(o.id, initialValue, i === 0 && noValidSelection && !placeholder),
                          },
                          o.label?.replace('&amp;', '&')
                        )
                      )
                  )
                )
          ),
          m(Label, { label, isMandatory }),
          helperText && m(HelperText, { helperText }),
        ]
      );
    },
  };
};
