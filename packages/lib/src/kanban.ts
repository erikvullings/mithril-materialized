import m, { Component, Attributes } from 'mithril';
import { FlatButton } from './button';
import { Dropdown, IDropdownOption } from './dropdown';
import { uniqueId } from '.';
import { ModalPanel } from './modal';
import { IModelField, IConvertibleType, NewGroup } from './form-generator';
import { move } from './utils';
import './styles/kanban.css';

// TODO
// - onchange notification
// - add support for options (not working - checkedId is implemented incorrectly)
// - Save button is not behaving correctly: sometimes it is enabled while it should not, or otherwise.

export interface IKanban extends Attributes {
  /** The model representing the item's fields */
  model: IModelField[];
  /** The items that we want to show */
  items: IConvertibleType[];
  /** Notify of changes */
  onchange?: (items: IConvertibleType[]) => void;
  /** Label for creating a new item */
  label: string;
  /** If true, use a modal for editing with a fixed footer */
  fixedFooter?: boolean;
  /** Can we create and edit new items: default true */
  canEdit: boolean;
  /** Can we sort items: default true */
  canSort: boolean;
  /** Can we drag items - in this case, sorting is disabled: default false */
  canDrag: boolean;
  /**
   * Can we move items between lists (based on the same model): default false.
   * Must be enabled on both lists in order to work.
   */
  moveBetweenList: boolean;
  /** Sort direction */
  sortDirection: 'asc' | 'desc';
  /** Properties to sort */
  sortProperties: string[];
  /** Drop down options */
  dropdownItems: Array<IDropdownOption<string | number>>;
}

interface IKanbanState extends IKanban {
  /** Container ID for DatePicker and TimePicker */
  containerId?: string;
  curSortId?: string;
  curItem?: IConvertibleType;
  updatedItem?: IConvertibleType;
  canSave?: boolean;
  id: string;
  editId: string;
  deleteId: string;
  dragIndex: number;
}

/** A flexible list of items, supporting drag-n-drop */
export const Kanban = (): Component<Partial<IKanban>> => {
  const state = {
    id: uniqueId(),
    curSortId: undefined,
    curItem: undefined,
  } as IKanbanState;

  const notify = () => {
    if (state.onchange) {
      state.onchange(state.items);
    }
  };

  /** The drop location indicates the new position of the dropped element: above or below */
  const computeDropLocation = (target: HTMLElement, ev: DragEvent) => {
    const { top, height } = target.getBoundingClientRect();
    const y = ev.clientY - top;
    const deltaZone = height / 2;
    return y < deltaZone ? 'above' : 'below';
  };

  const getItemIndex = (target: Element): number => {
    const data = target.getAttribute('data-kanban-index');
    if (data) {
      return +data;
    } else if (target.parentElement) {
      return getItemIndex(target.parentElement);
    } else {
      return -1;
    }
  };

  const isKanbanItem = (target: Element): boolean => {
    if (/kanban__item/.test(target.className)) {
      return true;
    } else if (target.parentElement) {
      return isKanbanItem(target.parentElement);
    } else {
      return false;
    }
  };

  const getKanbanItem = (target: Element): HTMLDivElement | null => {
    if (/kanban__item/.test(target.className)) {
      return target as HTMLDivElement;
    } else if (target.parentElement) {
      return getKanbanItem(target.parentElement);
    } else {
      return null;
    }
  };

  const getNewIndex = (dropLocation: 'above' | 'below', targetIndex: number, sourceIndex: number) =>
    state.moveBetweenList
      ? dropLocation === 'above'
        ? targetIndex
        : targetIndex + 1
      : sourceIndex < targetIndex
      ? dropLocation === 'above'
        ? targetIndex - 1
        : targetIndex
      : dropLocation === 'above'
      ? targetIndex
      : targetIndex - 1;

  const isValidTarget = (target: HTMLElement, dropLocation: 'above' | 'below') => {
    const kanbanItem = isKanbanItem(target);
    if (!kanbanItem) {
      return false;
    }
    const { dragIndex, moveBetweenList } = state;
    if (moveBetweenList) {
      return true;
    }
    const targetIndex = getItemIndex(target);
    const newIndex = getNewIndex(dropLocation, targetIndex, dragIndex);
    return dragIndex !== targetIndex && newIndex !== dragIndex;
  };

  // const shallowCopy = <T extends { [key: string]: any }>(item: T) => ({ ...item });
  const ondrop = (ev: DragEvent) => {
    ev.preventDefault();
    const { dragIndex, moveBetweenList } = state;
    const target = ev.target as HTMLElement;
    const kanbanItem = getKanbanItem(target);
    if (kanbanItem) {
      kanbanItem.classList.remove('kanban__above', 'kanban__below');
      const dropLocation = computeDropLocation(target, ev);
      const targetIndex = getItemIndex(target);
      const newIndex = getNewIndex(dropLocation, targetIndex, dragIndex);
      if (moveBetweenList) {
        const item = JSON.parse(ev.dataTransfer!.getData('application/json'));
        state.items.splice(newIndex, 0, item);
      } else {
        move(state.items, dragIndex, newIndex);
      }
      notify();
    }
  };

  const ondragleave = (ev: DragEvent) => {
    (ev as any).redraw = false;
    const target = ev.target as HTMLElement;
    const kanbanItem = getKanbanItem(target);
    if (kanbanItem) {
      kanbanItem.classList.remove('kanban__above', 'kanban__below');
    }
  };

  const ondragover = (ev: DragEvent) => {
    // console.log('ondragover');
    (ev as any).redraw = false;
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const kanbanItem = getKanbanItem(target);
    if (kanbanItem && ev.dataTransfer) {
      const copying = ev.getModifierState('Control');
      kanbanItem.classList.remove('kanban__above', 'kanban__below');
      const dropLocation = computeDropLocation(kanbanItem, ev);
      if (isValidTarget(kanbanItem, dropLocation)) {
        kanbanItem.classList.add('kanban__' + dropLocation);
        ev.dataTransfer.dropEffect = copying ? 'copy' : 'move';
      } else {
        ev.dataTransfer.dropEffect = 'none';
      }
    }
  };

  const ondragend = (ev: DragEvent) => {
    // console.log('ondragend');
    if (ev.dataTransfer) {
      // console.log('Drop effect: ' + ev.dataTransfer.dropEffect);
      if (ev.dataTransfer.dropEffect === 'move') {
        state.items.splice(state.dragIndex, 1);
        notify();
      }
    }
  };

  const ondragstart = (ev: DragEvent) => {
    console.log('ondragstart');
    const target = ev.target as HTMLElement;
    if (ev.dataTransfer) {
      const { items } = state;
      ev.dataTransfer.effectAllowed = 'copyMove';
      state.dragIndex = getItemIndex(target);
      const item = items[state.dragIndex];
      ev.dataTransfer.setData('application/json', JSON.stringify(item, null, 2));
    }
  };

  const dragOptions = {
    draggable: true,
    ondrop,
    ondragstart,
    ondragover,
    ondragleave,
    ondragend,
  };

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
        moveBetweenList = false,
        onchange,
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
      state.editId = `edit_item_${state.id}`;
      state.deleteId = `delete_item_${state.id}`;
      state.moveBetweenList = moveBetweenList;
      state.onchange = onchange;
      state.dropdownItems = [
        { label: 'None' },
        ...model.filter(i => i.label).map(i => ({ label: i.label!, id: i.id })),
      ];
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
        moveBetweenList,
        dropdownItems,
      } = state;
      if (!model) {
        return undefined;
      }

      const dir = sortDirection === 'asc' ? 1 : -1;
      const sortedItems =
        canSort && curSortId
          ? items.sort((a, b) => (a[curSortId] > b[curSortId] ? dir : a[curSortId] < b[curSortId] ? -dir : 0))
          : items;

      return m('.kanban', [
        m('.row.kanban__menu', { style: 'margin-bottom: 0;' }, [
          canEdit
            ? m(FlatButton, {
                label: `New ${label}`,
                modalId: state.editId,
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

        m(
          '.row.kanban__items',
          m(
            '.col.s12',
            sortedItems.length > 0 || !moveBetweenList
              ? sortedItems.map((item, i) =>
                  m(
                    `.card-panel.kanban__item[data-kanban-index=${i}]`,
                    canDrag
                      ? {
                          key: Date.now(),
                          style: 'padding-bottom: 12px;',
                          ...dragOptions,
                        }
                      : { key: Date.now(), style: 'padding-bottom: 12px;' },
                    [
                      m('.card-content', m(NewGroup, { model, item, containerId, disabled: true })),
                      canEdit
                        ? m('.card-action', { style: 'text-align: right' }, [
                            m(FlatButton, {
                              iconName: 'edit',
                              modalId: state.editId,
                              onclick: () => {
                                state.curItem = item;
                                state.updatedItem = { ...item };
                              },
                            }),
                            m(FlatButton, {
                              iconName: 'delete',
                              modalId: state.deleteId,
                              onclick: () => (state.curItem = item),
                            }),
                          ])
                        : undefined,
                    ]
                  )
                )
              : m('.card-panel.kanban__item', { ...dragOptions })
          )
        ),
        m(ModalPanel, {
          id: state.editId,
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
                notify();
              },
            },
          ],
        }),
        m(ModalPanel, {
          id: state.deleteId,
          title: `Delete ${label}`,
          description: 'Are you sure?',
          buttons: [
            {
              label: 'No',
            },
            {
              label: 'Yes',
              onclick: () => {
                state.items = state.items.filter(item => item !== state.curItem);
                notify();
              },
            },
          ],
        }),
      ]);
    },
  };
};