import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId, toAttrs } from './utils';
import { Label, HelperText } from './label';

/** Component to pick a date */
export const DatePicker: FactoryComponent<IInputOptions<Date> & Partial<M.DatepickerOptions>> = () => {
  const state = { id: uniqueId() } as { id: string; dp: M.Datepicker };
  return {
    view: ({
      attrs: {
        label,
        helperText,
        initialValue,
        newRow,
        className = 'col s12',
        iconName,
        isMandatory,
        onchange,
        disabled,
        ...props
      },
    }) => {
      const id = state.id;
      const attributes = toAttrs(props);
      // const {} = attrs;
      const clear = newRow ? '.clear' : '';
      const onClose = onchange ? () => state.dp && onchange(state.dp.date) : undefined;
      return m(`.input-field${clear}`, { className }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input.datepicker[type=text][tabindex=0][id=${id}]${attributes}${disabled ? '[disabled]' : ''}`, {
          oncreate: ({ dom }) => {
            state.dp = M.Datepicker.init(dom, {
              format: 'yyyy/mm/dd',
              showClearBtn: true,
              setDefaultDate: true,
              defaultDate: initialValue ? new Date(initialValue) : new Date(),
              // onSelect: onchange,
              ...props,
              onClose,
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
export const TimePicker: FactoryComponent<IInputOptions & Partial<M.TimepickerOptions>> = () => {
  const state = { id: uniqueId() } as { id: string; tp: M.Timepicker };
  return {
    view: ({
      attrs: {
        label,
        helperText,
        initialValue,
        newRow,
        className = 'col s12',
        iconName,
        isMandatory,
        onchange,
        disabled,
        ...props
      },
    }) => {
      const id = state.id;
      const attributes = toAttrs(props);
      const clear = newRow ? '.clear' : '';
      const onCloseEnd = onchange ? () => state.tp && onchange(state.tp.time) : undefined;
      return m(`.input-field.timepicker${clear}`, { className }, [
        iconName ? m('i.material-icons.prefix', iconName) : '',
        m(`input[type=text][tabindex=0][id=${id}]${attributes}${disabled ? '[disabled]' : ''}`, {
          value: initialValue,
          oncreate: ({ dom }) => {
            state.tp = M.Timepicker.init(dom, {
              twelveHour: false,
              showClearBtn: true,
              defaultTime: initialValue,
              // onSelect: onchange ? (hours: number, minutes: number) => onchange(`${hours}:${minutes}`) : undefined,
              ...props,
              onCloseEnd,
            } as Partial<M.TimepickerOptions>);
          },
        }),
        m(Label, { label, id, isMandatory, isActive: initialValue }),
        m(HelperText, { helperText }),
      ]);
    },
  };
};
