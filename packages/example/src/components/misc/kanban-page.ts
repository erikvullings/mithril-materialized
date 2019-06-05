import { CodeBlock, Kanban, IModelField, IKanban, Switch } from 'mithril-materialized';
import m from 'mithril';

interface ITodoTask {
  id: string;
  todo?: string;
  task?: string;
  desc?: string;
  due?: Date;
  done?: boolean;
  category?: string;
  option?: string;
  prio?: string;
}

export const KanbanPage = () => {
  const state = {
    disabled: false,
    todos: [
      {
        id: 'id1',
        todo: 'Buy milk',
        due: new Date(2025, 11, 31),
      },
      {
        id: 'id2',
        todo: 'Clean the bathroom',
        due: new Date(2025, 10, 30),
        prio: 1,
      },
    ],
  } as {
    disabled: boolean;
    todos: ITodoTask[];
  };

  const onchange = (items: ITodoTask[]) => console.table(items);

  const taskModel = [
    {
      id: 'id',
      autogenerate: 'guid',
    },
    {
      id: 'task',
      label: 'Task',
      component: 'text',
      className: 'col s8',
      required: true,
    },
    {
      id: 'due',
      label: 'Due date',
      className: 'col s4',
      component: 'date',
    },
    {
      id: 'desc',
      label: 'Description',
      className: 'col s8',
      component: 'text',
      multiline: true,
    },
    {
      id: 'done',
      label: 'Done',
      className: 'col s4',
      component: 'checkbox',
    },
    {
      id: 'category',
      label: 'Category',
      className: 'col s6',
      component: 'select',
      placeholder: 'Pick one',
      required: true,
      options: [{ id: 'shopping', label: 'Shopping' }, { id: 'house', label: 'House keeping' }],
    },
    {
      id: 'option',
      label: 'Options',
      className: 'col s6',
      required: true,
      component: 'options',
      options: [
        { id: 'hire', label: 'Hire help' },
        { id: 'kids', label: 'Ask kids' },
        { id: 'partner', label: 'Partner' },
      ],
    },
  ] as IModelField[];

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Kanban'),
        m(
          'p',
          `An editable list of items. Each item can be specified by a model. The items can be sorted,
          unless canDrag is true, in which case you can drag the items in its proper location.`
        ),
        m(
          'p',
          `Each list item is based on a model description, from which the final input 'form' is generated. The only hard
          requirement is that the item contains a (string) 'id' property, which you can automatically generate for new
          items (using a full or abbreviated GUID).`
        ),
        m(
          '.row',
          m(Switch, {
            label: 'Disable kanban',
            left: 'enable',
            right: 'disable',
            onchange: v => (state.disabled = v),
          })
        ),

        m('h3.header', 'Kanban'),
        m('.row', [
          m(
            '.col.s6',
            m(Kanban, {
              disabled: state.disabled,
              label: 'task',
              onchange,
              fixedFooter: false,
              canEdit: true,
              canDrag: true,
              moveBetweenList: true,
              model: taskModel,
              items: [
                {
                  id: 'item1',
                  task: 'Buy milk',
                  due: new Date(2025, 11, 31),
                  desc: 'Do not forget this!',
                  category: 'shopping',
                },
                {
                  id: 'item2',
                  task: 'Clean the bathroom',
                  due: new Date(2025, 10, 30),
                  desc: `Why don't we have a maid?`,
                  option: 'kids',
                },
              ],
            } as IKanban<ITodoTask>)
          ),
          m(
            '.col.s6',
            m(Kanban, {
              disabled: state.disabled,
              label: 'task',
              onchange,
              fixedFooter: false,
              canEdit: true,
              canDrag: true,
              moveBetweenList: true,
              model: taskModel,
              items: [
                {
                  id: 'item3',
                  task: 'Feed the dog',
                  due: new Date(2025, 11, 17),
                },
              ],
            } as IKanban<ITodoTask>)
          ),
        ]),

        m('h3', 'Editable todo'),
        m(
          '.row',
          m(
            '.col s12',
            m(Kanban, {
              disabled: state.disabled,
              label: 'todo',
              onchange: todos => (state.todos = todos),
              fixedFooter: false,
              canEdit: true,
              items: state.todos,
              model: [
                {
                  id: 'id',
                  autogenerate: 'id',
                },
                {
                  id: 'todo',
                  label: 'Todo',
                  component: 'text',
                  className: 'col s8',
                  required: true,
                },
                {
                  id: 'done',
                  label: 'Done',
                  className: 'col s4',
                  component: 'checkbox',
                },
                {
                  id: 'prio',
                  label: 'Priority',
                  className: 'col s12',
                  component: 'radios',
                  inline: true,
                  options: [{ id: 1, label: 'Low' }, { id: 2, label: 'Medium' }, { id: 3, label: 'High' }],
                },
              ],
            } as IKanban<ITodoTask>)
          )
        ),
        m('h3', 'Non-editable todo, except for done'),
        m(Kanban, {
          disabled: state.disabled,
          label: 'todo',
          fixedFooter: false,
          canEdit: false,
          editableIds: ['done'],
          items: state.todos,
          model: [
            {
              id: 'id',
              autogenerate: 'id',
            },
            {
              id: 'todo',
              label: 'Todo',
              component: 'text',
              className: 'col s8',
              required: true,
            },
            {
              id: 'done',
              label: 'Done',
              className: 'col s4',
              component: 'checkbox',
            },
            {
              id: 'prio',
              label: 'Priority',
              className: 'col s12',
              component: 'radios',
              inline: true,
              options: [{ id: 1, label: 'Low' }, { id: 2, label: 'Medium' }, { id: 3, label: 'High' }],
            },
          ],
        } as IKanban<ITodoTask>),

        m(CodeBlock, {
          code: `          interface ITodoTask {
            id: string;
            todo?: string;
            task?: string;
            desc?: string;
            due?: Date;
            done?: boolean;
            category?: string;
            option?: string;
            prio?: string;
          }

          m(Kanban, {
            label: 'todo',
            onchange: (items: ITodoTask[]) => console.table(items),
            fixedFooter: false,
            canEdit: true,
            // canEdit: false,
            // editableIds: ['done'],
            items: [
              {
                id: 'item1',
                todo: 'Buy milk',
                due: new Date(2025, 11, 31),
              },
              {
                id: 'item2',
                todo: 'Clean the bathroom',
                due: new Date(2025, 10, 30),
                prio: 1,
              },
            ],
            model: [
              {
                id: 'id',
                autogenerate: 'id',
              },
              {
                id: 'todo',
                label: 'Todo',
                component: 'text',
                className: 'col s8',
                required: true,
              },
              {
                id: 'due',
                label: 'Due date',
                className: 'col s4',
                component: 'date',
              },
              {
                id: 'prio',
                label: 'Priority',
                className: 'col s8',
                component: 'radios',
                inline: true,
                options: [{ id: 1, label: 'Low' }, { id: 2, label: 'Medium' }, { id: 3, label: 'High' }],
              },
              {
                id: 'done',
                label: 'Done',
                className: 'col s4',
                component: 'checkbox',
              },
            ],
          } as IKanban<ITodoTask>)`,
        }),
      ]),
  };
};
