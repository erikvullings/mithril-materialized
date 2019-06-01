import m, { Component } from 'mithril';
import { TextInput, TextArea, EmailInput, UrlInput, NumberInput } from './input';
import { TimePicker } from '.';
import { DatePicker } from './pickers';
import { InputCheckbox, Options, IInputOption } from './option';
import { Select } from './select';
import { RadioButtons } from './radio';

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
  id: string;
  component: ComponentType;
  label?: string;
  className?: string;
  iconName?: string;
  iconClass?: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  multiple?: boolean;
  newRow?: boolean;
  options?: IInputOption[];
}

/** A data object that can be created */
export interface IConvertibleType {
  [key: string]: string | number | boolean | Date | Array<string | number>;
}

/**
 * Convert a model field to a component.
 *
 * @param model Model properties
 * @param value Initial value of the property item
 * @param options Component options
 */
export const fieldToComponent = (
  { component, required, options: selectOptions, ...props }: IModelField,
  value: string | number | boolean | Date | Array<string | number>,
  options: {
    onchange?: (v: string | number | boolean | Date | Array<string | number>) => void;
    containerId?: string;
    autofocus?: boolean;
    disabled?: boolean;
    multiline?: boolean;
  } = {}
) => {
  const { containerId, autofocus, disabled = false, onchange, multiline } = options;
  switch (component) {
    case 'number':
      return m(NumberInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as number,
      });
    case 'url':
      return m(UrlInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'email':
      return m(EmailInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'checkbox':
      return m(InputCheckbox, {
        ...props,
        disabled,
        onchange,
        checked: value as boolean,
      });
    case 'select':
      const onChange = (v?: string | number | Array<string | number>) => v && onchange && onchange(v);
      return m(Select, {
        ...props,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory: required,
        onchange: onChange,
        checkedId: value as string | number | Array<string | number>,
      });
    case 'options':
      const onChange2 = (v?: boolean) => v && onchange && onchange(v);
      return m(Options, {
        ...props,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory: required,
        onchange: onChange2,
        checkedId: value as string | number | Array<string | number>,
      });
    case 'radios':
      const onChange3 = (v?: string | number) => v && onchange && onchange(v);
      return m(RadioButtons, {
        ...props,
        options: selectOptions || [{ id: 'none', label: 'Unspecified' }],
        disabled,
        isMandatory: required,
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
        isMandatory: required,
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
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: time,
        container: containerId || document.body.id,
      });
    default:
      return m(multiline ? TextArea : TextInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
  }
};

/**
 * Generate a new group or form based on an object's model description, where a model consists of multiple fields.
 */
export const NewGroup = (): Component<{
  el?: string;
  model: IModelField[];
  item: IConvertibleType;
  containerId?: string;
  disabled?: boolean;
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
            (typeof item[cur.id] === 'string' && (item[cur.id] as string).length === 0)
          ),
        true
      );
  };

  return {
    view: ({ attrs: { el = '.row', model, item, containerId, disabled = false, onchange } }) => {
      state.item = item;
      state.model = model;
      if (onchange) {
        onchange(isValid());
      }

      const formFields = model.map((f, i) =>
        fieldToComponent(f, item[f.id], {
          containerId,
          autofocus: i === 0,
          disabled,
          onchange: disabled
            ? undefined
            : v => {
                if (v instanceof Array) {
                  state.item[f.id] = v;
                } else {
                  state.item[f.id] = v;
                }
                if (onchange) {
                  onchange(isValid());
                }
              },
        })
      );
      return m(el, { style: 'margin-bottom: -20px;' }, formFields);
    },
  };
};
