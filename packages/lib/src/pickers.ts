import m, { Component } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId, toDottedClassList, toAttrs } from './utils';
import { Label, HelperText } from './label';

/** Component to pick a date */
export const DatePicker = (): Component<IInputOptions<Date> & Partial<M.DatepickerOptions>> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newRow, contentClass, iconName, isMandatory, onchange } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.datepicker[type=text][tabindex=0][id=${id}]${attributes}`, {
          oncreate: ({ dom }) => {
            M.Datepicker.init(dom, {
              format: 'yyyy/mm/dd',
              showClearBtn: true,
              setDefaultDate: true,
              defaultDate: initialValue ? new Date(initialValue) : new Date(),
              onSelect: onchange,
              ...attrs,
            } as Partial<M.DatepickerOptions>);
          },
        }),
        m(Label, { label, id, isMandatory, isActive: !!initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};

/** Component to pick a time */
export const TimePicker = (): Component<IInputOptions & Partial<M.TimepickerOptions>> => {
  const state = { id: uniqueId() };
  return {
    view: ({ attrs }) => {
      const id = state.id;
      const attributes = toAttrs(attrs);
      const { label, helperText, initialValue, newRow, contentClass, iconName, isMandatory, onchange } = attrs;
      const clear = newRow ? '.clear' : '';
      return m(`.input-field.timepicker${clear}${toDottedClassList(contentClass)}`, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}`, {
          value: initialValue,
          oncreate: ({ dom }) => {
            M.Timepicker.init(dom, {
              twelveHour: false,
              showClearBtn: true,
              defaultTime: initialValue,
              onSelect: onchange ? (hours, minutes) => onchange(`${hours}:${minutes}`) : undefined,
              ...attrs,
            } as Partial<M.TimepickerOptions>);
          },
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};
