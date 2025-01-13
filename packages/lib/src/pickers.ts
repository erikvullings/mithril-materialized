import m, { FactoryComponent } from 'mithril';
import { IInputOptions } from './input-options';
import { uniqueId } from './utils';
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
      // const attributes = toAttrs(props);
      const onClose = onchange ? () => state.dp && onchange(state.dp.date) : undefined;
      const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      return m(
        '.input-field',
        {
          className: cn,
          onremove: () => {
            return state.dp && state.dp.destroy();
          },
        },
        [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('input', {
            ...props,
            type: 'text',
            tabindex: 0,
            className: 'datepicker',
            id,
            // attributes,
            disabled,
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
        ]
      );
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
      // const attributes = toAttrs(props);
      const now = new Date();
      const onCloseEnd = onchange
        ? () => state.tp && onchange(state.tp.time || initialValue || `${now.getHours()}:${now.getMinutes()}`)
        : undefined;
      const cn = ['input-field', 'timepicker', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
      return m(
        'div',
        {
          className: cn,
          onremove: () => state.tp && state.tp.destroy(),
        },
        [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('input', {
            ...props,
            type: 'text',
            tabindex: 0,
            id,
            disabled,
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
        ]
      );
    },
  };
};
