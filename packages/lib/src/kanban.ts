import m, { Component, Attributes } from 'mithril';
import { FlatButton } from './button';
import { Dropdown } from './dropdown';
import { TextInput, TextArea, EmailInput, UrlInput, NumberInput } from './input';
import { TimePicker } from '.';
import { DatePicker } from './pickers';
import { ModalPanel } from './modal';

export type ComponentType = 'Text' | 'Number' | 'Url' | 'Email' | 'Date' | 'Time';

export interface IField {
  id: string;
  component: ComponentType;
  label?: string;
  className?: string;
  iconName?: string;
  iconClass?: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface IConvertibleType {
  [key: string]: string | number | boolean | Date;
}

export const fieldToComponent = (
  { component, required, ...props }: IField,
  value: string | number | boolean | Date,
  options: {
    onchange?: (v: string | number | boolean | Date) => void;
    containerId?: string;
    autofocus?: boolean;
    disabled?: boolean;
    multiline?: boolean;
  } = {}
) => {
  const { containerId, autofocus, disabled = false, onchange, multiline } = options;
  switch (component) {
    case 'Number':
      return m(NumberInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as number,
      });
    case 'Url':
      return m(UrlInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'Email':
      return m(EmailInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'Text':
      return m(multiline ? TextArea : TextInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
    case 'Date':
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
    case 'Time':
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
      return m(TextInput, {
        ...props,
        isMandatory: required,
        autofocus,
        disabled,
        onchange,
        initialValue: value as string,
      });
  }
};

export const NewGroup = (): Component<{
  el?: string;
  model: IField[];
  item: IConvertibleType;
  containerId?: string;
  disabled?: boolean;
  onchange?: (valid: boolean) => void;
}> => {
  const state = {} as {
    model: IField[];
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
                state.item[f.id] = v;
                if (onchange) {
                  onchange(isValid());
                }
              },
        })
      );
      return m(
        el,
        {
          style: 'margin-bottom: -20px;',
          // onbeforeremove: () => {
          //   if (isValid()) {
          //     const { item: updatedItem, originalItem } = state;
          //     state.model.forEach(f => (originalItem[f.id] = updatedItem[f.id]));
          //   }
          // },
        },
        formFields
      );
    },
  };
};

export interface IKanban extends Attributes {
  /** The model representing the item's fields */
  model: IField[];
  /** The items that we want to show */
  items: IConvertibleType[];
  /** Label for creating a new item */
  label: string;
  /** If true, use a modal for editing with a fixed footer */
  fixedFooter?: boolean;
  /** Can we create and edit new items: default true */
  canEdit: boolean;
  /** Can we sort items: default true */
  canSort: boolean;
  /** Can we drag items: default true */
  canDrag: boolean;
  /** Sort direction */
  sortDirection: 'asc' | 'desc';
  /** Properties to sort */
  sortProperties: string[];
}

interface IKanbanState extends IKanban {
  /** Container ID for DatePicker and TimePicker */
  containerId?: string;
  curSortId?: string;
  curItem?: IConvertibleType;
  updatedItem?: IConvertibleType;
  canSave?: boolean;
}

/** A flexible list of items, supporting drag-n-drop */
export const Kanban = (): Component<Partial<IKanban>> => {
  const state = {
    curSortId: undefined,
    curItem: undefined,
  } as IKanbanState;

  // const shallowCopy = <T extends { [key: string]: any }>(item: T) => ({ ...item });

  return {
    oninit: ({
      attrs: {
        canEdit = true,
        canSort = true,
        canDrag = false,
        sortDirection = 'asc',
        items = [],
        model = [],
        label = 'New item',
        containerId,
        fixedFooter = false,
      },
    }) => {
      state.items = items;
      state.model = model;
      state.label = label;
      state.canEdit = canEdit;
      state.canSort = canSort;
      state.canDrag = canDrag;
      state.sortDirection = sortDirection;
      state.containerId = containerId;
      state.fixedFooter = fixedFooter;
    },
    view: () => {
      const {
        items,
        model,
        canSort,
        sortDirection,
        curSortId,
        label,
        containerId,
        fixedFooter,
        canDrag,
        canEdit,
      } = state;
      if (!model) {
        return undefined;
      }
      const dropdownItems = [
        { label: 'None' },
        ...model.filter(i => i.label).map(i => ({ label: i.label!, id: i.id })),
      ];

      const dir = sortDirection === 'asc' ? 1 : -1;
      const sortedItems =
        canSort && curSortId
          ? items.sort((a, b) => (a[curSortId] > b[curSortId] ? dir : a[curSortId] < b[curSortId] ? -dir : 0))
          : items;

      return [
        m('.row.kanban__menu', [
          canEdit
            ? m(FlatButton, {
                label: `New ${label}`,
                modalId: 'editItem',
                iconName: 'add',
                onclick: () => {
                  state.curItem = undefined;
                  state.updatedItem = {} as IConvertibleType;
                },
              })
            : undefined,
          canSort && !canDrag && items.length > 1
            ? [
                m(FlatButton, {
                  iconName: 'sort',
                  iconClass: sortDirection === 'asc' ? 'left twist' : '',
                  className: 'right',
                  onclick: () => {
                    state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
                  },
                }),
                m(Dropdown, {
                  items: dropdownItems,
                  className: 'right',
                  style: 'margin: 0 auto;',
                  onchange: (id: string | number) => (state.curSortId = id as string),
                }),
              ]
            : undefined,
        ]),

        sortedItems.length > 0
          ? m(
              '.row.kanban__items',
              m(
                '.col.s12',
                sortedItems.map(item =>
                  m('.card-panel', { key: Date.now(), style: 'padding-bottom: 12px;' }, [
                    m('.card-content.kanban__item', m(NewGroup, { model, item, containerId, disabled: true })),
                    canEdit
                      ? m('.card-action', { style: 'text-align: right' }, [
                          m(FlatButton, {
                            iconName: 'edit',
                            modalId: 'editItem',
                            onclick: () => {
                              state.curItem = item;
                              state.updatedItem = { ...item };
                            },
                          }),
                          m(FlatButton, {
                            iconName: 'delete',
                            modalId: 'deleteItem',
                            onclick: () => (state.curItem = item),
                          }),
                        ])
                      : undefined,
                  ])
                )
              )
            )
          : undefined,

        m(ModalPanel, {
          id: 'editItem',
          title: `Create new ${label}`,
          fixedFooter,
          description: m(NewGroup, {
            model,
            item: state.updatedItem || {},
            containerId,
            onchange: (valid: boolean) => {
              state.canSave = valid;
            },
          }),
          buttons: [
            {
              iconName: 'cancel',
              label: 'Cancel',
              // onclick: () => state.curItem && state.items.push(state.curItem),
            },
            {
              iconName: 'save',
              label: 'Save',
              disabled: !state.canSave,
              onclick: () => {
                if (state.curItem) {
                  model.forEach(f => (state.curItem![f.id] = state.updatedItem![f.id]));
                } else if (state.updatedItem) {
                  state.items.push(state.updatedItem);
                }
              },
            },
          ],
        }),
        m(ModalPanel, {
          id: 'deleteItem',
          title: `Delete ${label}`,
          description: 'Are you sure?',
          buttons: [
            {
              label: 'No',
              // onclick: () => state.curItem && state.items.push(state.curItem),
            },
            {
              label: 'Yes',
              onclick: () => (state.items = state.items.filter(item => item !== state.curItem)),
            },
          ],
        }),
      ];
    },
  };
};
