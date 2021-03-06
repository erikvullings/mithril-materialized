import m, { FactoryComponent, Attributes } from 'mithril';
import './styles/map-editor.css';
import { ICollectionItem, Collection, CollectionMode } from './collection';
import { InputCheckbox } from './option';
import { uniqueId } from './utils';
import { Label } from './label';
import { TextArea, TextInput, NumberInput } from './input';
import { FlatButton } from './button';

export interface IMapEditor extends Attributes {
  /** Optional ID of the element */
  id?: string;
  /** If true, displays a header over the map */
  header?: string;
  /** Instead of a header, use a label */
  label?: string;
  /** Places a required * after the label */
  isMandatory?: boolean;
  /**
   * Optional value for the key label
   * @default: "Key"
   */
  labelKey?: string;
  /**
   * Optional value for the value label
   * @default: "Value"
   */
  labelValue?: string;
  /** If true, the item cannot be edited */
  disabled?: boolean;
  /** Icon for the properties' collection */
  iconName?: string;
  /** Icon for the key editor: if none provided, and the iconName is set, uses 'label' */
  iconNameKey?: string;
  /** If true, do not parse arrays like [1, 2, 3] into number[] or [a, b, c] into a string[] */
  disallowArrays?: boolean;
  /** The actual map of key-value pairs supports numbers, strings, booleans and arrays of strings and numbers. */
  properties: { [key: string]: number | string | boolean | Array<string | number> };
  /**
   * Called when the properties collection has changed. Not needed if you are performing a direct edit on the
   * properties object, but in case you have created a mapping, this allows you to convert the object back again.
   */
  onchange?: (properties: { [key: string]: number | string | boolean | Array<string | number> }) => void;
  /**
   * In order to create a boolean, you first have to enter a truthy or falsy value.
   * Default 'true' and 'false', but you can add more options.
   */
  truthy?: string[];
  /**
   * In order to create a boolean, you first have to enter a truthy or falsy value.
   * Default 'true' and 'false', but you can add more options.
   */
  falsy?: string[];
  /**
   * Optional function to replace the render function of a key-value pair.
   * The ICollectionItems's title may be a Vnode.
   */
  keyValueConverter?: (key: string, value: number | string | boolean | Array<string | number>) => ICollectionItem;
  /** Optional class to apply to the key column, @default .col.s4 */
  keyClass?: string;
  /** Optional class to apply to the value column, @default .col.s8 */
  valueClass?: string;
}

/** A simple viewer and/or editor for a map of key - value pairs */
export const MapEditor: FactoryComponent<IMapEditor> = () => {
  const parseArray = (v?: string, disallowArrays = false) => {
    if (disallowArrays) {
      return v;
    }
    const extractArrayData = /\s*\[(.*)\]\s*/gi;
    if (!v) {
      return undefined;
    }
    const match = extractArrayData.exec(v);
    if (!match || match.length !== 2) {
      return undefined;
    }
    return match[1]
      .split(',')
      .map(i => i.trim())
      .map(i => (/^\d+$/g.test(i) ? +i : i));
  };

  const kvc = (
    key: string,
    value: number | string | boolean | Array<string | number>,
    options: { keyClass?: string; valueClass?: string }
  ) => {
    const { keyClass = '.col.s4', valueClass = '.col.s8' } = options;
    const displayValue =
      value instanceof Array
        ? value.join(', ')
        : typeof value === 'boolean'
        ? m(InputCheckbox, { label: ' ', checked: value, disabled: true, className: 'checkbox-in-collection' })
        : value.toString();
    const title = m('.row', { style: 'margin-bottom: 0' }, [m(keyClass, m('b', key)), m(valueClass, displayValue)]);
    return {
      title,
    } as ICollectionItem;
  };

  const onclick = (key: string) => (state.curKey = state.id = key);

  const kvcWrapper = (key: string, item: ICollectionItem) => {
    const clickHandler = item.onclick;
    item.id = item.id || key;
    item.active = key === state.curKey;
    item.onclick = clickHandler ? () => onclick(key) && clickHandler(item) : () => onclick(key);
    return item;
  };

  const toCollectionArray = (
    properties: { [key: string]: number | string | boolean | Array<string | number> },
    options: { keyClass?: string; valueClass?: string }
  ) =>
    Object.keys(properties)
      .map(key => ({ key, value: properties[key] }))
      .map(item =>
        kvcWrapper(
          item.key,
          state.kvc(item.key, item.value, { keyClass: options.keyClass, valueClass: options.valueClass })
        )
      );

  const isTruthy = (i: string, truthy: string[], falsy: string[]) =>
    truthy.indexOf(i) >= 0 ? true : falsy.indexOf(i) >= 0 ? false : undefined;

  const state = {
    elementId: uniqueId(),
    id: '',
    curKey: '',
    kvc,
  };

  const resetInputs = () => {
    state.id = '';
    state.curKey = '';
  };

  return {
    oninit: ({ attrs: { keyValueConverter, id } }) => {
      if (keyValueConverter) {
        state.kvc = keyValueConverter;
      }
      if (id) {
        state.elementId = id;
      }
    },
    view: ({
      attrs: {
        className = 'col s12',
        disabled,
        disallowArrays,
        header,
        iconName,
        iconNameKey = iconName ? 'label' : undefined,
        isMandatory,
        label,
        labelKey = 'Key',
        labelValue = 'Value',
        properties,
        keyClass,
        valueClass,
        onchange,
        falsy = ['false'],
        truthy = ['true'],
      },
    }) => {
      const notify = () => (onchange ? onchange(properties) : undefined);
      const items = toCollectionArray(properties, { keyClass, valueClass });
      const key = state.curKey;
      const prop = properties[key];
      const value =
        typeof prop === 'boolean' || typeof prop === 'number'
          ? prop
          : prop
          ? prop instanceof Array
            ? `[${prop.join(', ')}]`
            : prop
          : '';
      const id = state.elementId;
      return [
        m(
          '.map-editor',
          m('.input-field', { className, style: 'min-height: 1.5em;' }, [
            iconName ? m('i.material-icons.prefix', iconName) : '',
            m(Label, { label, isMandatory, isActive: items.length > 0 }),
            m(Collection, { id, items, mode: CollectionMode.LINKS, header }),
          ])
        ),
        disabled
          ? undefined
          : [
              m(TextInput, {
                label: labelKey,
                iconName: iconNameKey,
                className: 'col s5',
                initialValue: key,
                onchange: (v: string) => {
                  state.curKey = v;
                  if (state.id) {
                    delete properties[state.id];
                    properties[v] = prop;
                    state.id = v;
                  }
                  notify();
                },
              }),
              typeof value === 'string'
                ? m(TextArea, {
                    label: labelValue,
                    initialValue: value,
                    className: 'col s7',
                    onchange: (v: string) => {
                      const b = isTruthy(v, truthy, falsy);
                      const n = typeof b === 'undefined' ? (/^\s*\d+\s*$/i.test(v) ? +v : undefined) : undefined;
                      properties[key] =
                        typeof b === 'boolean' ? b : typeof n === 'number' ? n : parseArray(v, disallowArrays) || v;
                      notify();
                    },
                  })
                : typeof value === 'number'
                ? m(NumberInput, {
                    label: labelValue,
                    initialValue: value,
                    className: 'col s7',
                    onchange: (v: number) => {
                      properties[key] = v;
                      notify();
                    },
                  })
                : m(InputCheckbox, {
                    label: labelValue,
                    checked: value,
                    className: 'input-field col s7',
                    onchange: (v: boolean) => {
                      properties[key] = v;
                      notify();
                    },
                  }),
              m('.col.s12.right-align', [
                m(FlatButton, {
                  iconName: 'add',
                  onclick: resetInputs,
                }),
                m(FlatButton, {
                  iconName: 'delete',
                  disabled: !key,
                  onclick: () => {
                    delete properties[key];
                    resetInputs();
                    notify();
                  },
                }),
              ]),
            ],
      ];
    },
  };
};
