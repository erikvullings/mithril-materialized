import { CodeBlock, Kanban, IModelField, IConvertibleType } from 'mithril-materialized';
import m from 'mithril';

export const KanbanPage = () => {
  const onchange = (items: IConvertibleType[]) => console.table(items);

  const taskModel = [
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
      options: [{ id: 'shopping', label: 'Shopping' }, { id: 'house', label: 'House keeping' }],
    },
    {
      id: 'option',
      label: 'Options',
      className: 'col s6',
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
          unless canDrag is true, in which case you can drag the items in its proper location. Each list
          item is based on a model description, from which the final input 'form' is generated.`
        ),

        m('h3.header', 'Kanban'),
        m('.row', [
          m(
            '.col.s6',
            m(Kanban, {
              label: 'task',
              onchange,
              fixedFooter: false,
              canEdit: true,
              canDrag: true,
              model: taskModel,
              moveBetweenList: true,
              items: [
                {
                  task: 'Buy milk',
                  due: new Date(2025, 11, 31),
                  desc: 'Do not forget this!',
                  category: 'shopping',
                },
                {
                  task: 'Clean the bathroom',
                  due: new Date(2025, 10, 30),
                  desc: "Why don't we have a maid?",
                  option: 'kids',
                },
              ],
            })
          ),
          m(
            '.col.s6',
            m(Kanban, {
              label: 'task',
              onchange,
              fixedFooter: false,
              canEdit: true,
              canDrag: true,
              model: taskModel,
              moveBetweenList: true,
              items: [
                {
                  task: 'Feed the dog',
                  due: new Date(2025, 11, 17),
                },
              ],
            })
          ),
        ]),

        m(Kanban, {
          label: 'todo',
          onchange,
          fixedFooter: false,
          canEdit: true,
          items: [
            {
              todo: 'Buy milk',
              due: new Date(2025, 11, 31),
            },
            {
              todo: 'Clean the bathroom',
              due: new Date(2025, 10, 30),
              prio: 1,
            },
          ],
          model: [
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
              className: 'col s6',
              component: 'radios',
              inline: true,
              options: [{ id: 1, label: 'Low' }, { id: 2, label: 'Medium' }, { id: 3, label: 'High' }],
            },
          ],
        }),

        m(CodeBlock, {
          code: `          m(Kanban, {
            label: 'todo',
            fixedFooter: false,
            canEdit: true,
            model: [
              {
                id: 'todo',
                label: 'Todo',
                component: 'Text',
                className: 'col s8',
                required: true,
              },
              {
                id: 'due',
                label: 'Due date',
                className: 'col s4',
                component: 'Date',
              },
            ],
          })`,
        }),
      ]),
  };
};
