import 'tslib';
import m, { Component } from 'mithril';
import { TextInput, TextArea, EmailInput, UrlInput, NumberInput } from './input';
import { TimePicker, DatePicker } from './pickers';
import { InputCheckbox, Options, IInputOption } from './option';
import { Select } from './select';
import { RadioButtons } from './radio';
import { uniqueId, uuid4 } from './utils';

/** List of components that can be used for generating a form */
export type ComponentType =
  | 'text'
  | 'number'
  | 'url'
  | 'email'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'select'
  | 'options'
  | 'radios';

/** Generic description of a form field, based on a union of the individual component options */
export interface IModelField {
  /** Name of the property in the generated object */
  id: string;
  /** Type of component to use for rendering the field. If empty, field will not be rendered. */
  component?: ComponentType;
  /** Label to display */
  label?: string;
  /** Optional class to append to the field */
  className?: string;
  /** Optional icon to display on the element, based on the materializecss.com/icons */
  iconName?: string;
  /** Optional class for the icon, e.g. to make it smaller or bigger */
  iconClass?: string;
  /** For text, may it have multiple lines */
  multiline?: boolean;
  /** If true, the item is required */
  required?: boolean;
  /** If true, the item is disabled */
  disabled?: boolean;
  /** Optional placeholder */
  placeholder?: string;
  /** Optional helper text */
  helperText?: string;
  /** Start a new row after this field */
  newRow?: boolean;
  /** Options for radios, options (checkboxes), and selections */
  options?: IInputOption[];
  /** If true, draw the radio buttons inline */
  inline?: boolean;
  /**
   * If specified, generate a value automatically, e.g. to set an ID, or to use a GUID.
   * Possible options are `guid` to generate a GUID, or 'id' to generate an `idXXXX`.
   */
  autogenerate?: 'guid' | 'id';
}

/** A data object that can be created */
export interface IConvertibleType {
  id: string | number;
  [key: string]: undefined | string | number | boolean | Date | Array<string | number>;
}

/**
 * Convert a model field to a component.
 *
 * @param model Model properties
 * @param value Initial value of the property item
 * @param options Component options
 */
export const fieldToComponent = (
  { component, required: isMandatory, options: selectOptions, autogenerate, ...props }: IModelField,
  value?: string | number | boolean | Date | Array<string | number>,
  options: {
    onchange?: (v: string | number | boolean | Date | Array<string | number>, overwrite?: boolean) => void;
    containerId?: string;
    autofocus?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    key?: number | string;
  } = {}
) => {
  const { containerId, autofocus, disabled = false, onchange, multiline, key } = options;
  if (autogenerate && onchange) {
    onchange(autogenerate === 'id' ? uniqueId() : uuid4(), false);
  }
  const validate = isMandatory
    ? (v: string | number | Array<string | number>) => (v instanceof Array ? v && v.length > 0 : typeof v !== undefined)
    : undefined;

  switch (component) {
    case 'text':
      return m(multiline ? TextArea : TextInput, {
        ...props,
        key,
        isMandatory,
        validate,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'number':
      return m(NumberInput, {
        ...props,
        key,
        isMandatory,
        validate,
        autofocus,
        disabled,
        onchange,
        initialValue: value as number,
      });
    case 'url':
      return m(UrlInput, {
        ...props,
        key,
        isMandatory,
        validate,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'email':
      return m(EmailInput, {
        ...props,
        key,
        isMandatory,
        validate,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'checkbox':
      return m(InputCheckbox, {
        ...props,
        validate,
        disabled,
        onchange,
        checked: value as boolean,
      });
    case 'select':
      const onChange = (v?: string | number | Array<string | number>) => v && onchange && onchange(v);
      return m(Select, {
        ...props,
        key,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory,
        validate,
        onchange: onChange,
        checkedId: value as string | number | Array<string | number>,
      });
    case 'options':
      const onChange2 = (checkedIds: Array<string | number>) => onchange && onchange(checkedIds);
      return m(Options, {
        ...props,
        key,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory,
        validate,
        onchange: onChange2,
        checkedId: value as string | number | Array<string | number>,
      });
    case 'radios':
      const onChange3 = (v?: string | number) => v && onchange && onchange(v);
      return m(RadioButtons, {
        ...props,
        key,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory,
        validate,
        onchange: onChange3,
        checkedId: value as string | number,
      });
    case 'date':
      const date = (value as Date) || new Date();
      if (!value && onchange) {
        onchange(date);
      }
      return m(DatePicker, {
        ...props,
        key,
        isMandatory,
        autofocus,
        disabled,
        onchange,
        initialValue: date,
        container: (containerId ? document.getElementById(containerId) : document.body) as HTMLElement,
      });
    case 'time':
      const time = (value as string) || '00:00';
      if (!value && onchange) {
        onchange(time);
      }
      return m(TimePicker, {
        ...props,
        key,
        isMandatory,
        autofocus,
        disabled,
        onchange,
        initialValue: time,
        container: containerId || document.body.id,
      });
    default:
      return undefined;
  }
};

/**
 * Generate a new group or form based on an object's model description, where a model consists of multiple fields.
 */
export const LayoutForm = <T extends IConvertibleType>(): Component<{
  el?: string;
  model: IModelField[];
  item: T;
  containerId?: string;
  disabled?: boolean;
  editableIds?: Array<keyof T>;
  onchange?: (valid: boolean) => void;
}> => {
  const state = {} as {
    model: IModelField[];
    item: IConvertibleType;
  };

  const isValid = () => {
    const { model, item } = state;
    return model
      .filter(f => f.required)
      .reduce(
        (acc, cur) =>
          acc &&
          !(
            typeof item[cur.id] === 'undefined' ||
            (item[cur.id] instanceof Array && (item[cur.id] as any[]).length === 0) ||
            (typeof item[cur.id] === 'string' && (item[cur.id] as string).length === 0)
          ),
        true
      );
  };

  return {
    view: ({ attrs: { el = '.row', model, item, containerId, disabled = false, editableIds = [], onchange } }) => {
      state.item = item;
      state.model = model;
      if (onchange) {
        onchange(false);
      }

      return m(
        el,
        { style: 'margin-bottom: -15px;', key: item.id },
        model.map((f, i) =>
          fieldToComponent(f, item[f.id], {
            containerId,
            autofocus: i === 0,
            disabled: disabled && editableIds.indexOf(f.id) < 0,
            onchange:
              disabled && editableIds.indexOf(f.id) < 0
                ? undefined
                : (v, overwrite = true) => {
                    if (overwrite || typeof state.item[f.id] === 'undefined') {
                      if (v instanceof Array) {
                        state.item[f.id] = v;
                      } else {
                        state.item[f.id] = v;
                      }
                      if (onchange) {
                        onchange(isValid());
                      }
                    }
                  },
          })
        )
      );
    },
  };
};
