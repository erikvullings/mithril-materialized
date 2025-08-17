import m, { FactoryComponent, Attributes, Vnode } from 'mithril';

export interface CollapsibleItem extends Attributes {
  /** Header of the collabsible item, may contain HTML or may be a Vnode */
  header?: string | Vnode<any, any>;
  /** Body of the collabsible item, may contain HTML or may be a Vnode */
  body?: string | Vnode<any, any>;
  /** If active, preselect the collabsible item. */
  active?: boolean;
  /** Add an material icon in front of the header. */
  iconName?: string;
}

export interface CollapsibleAttrs extends Attributes {
  /** The list of accordeon/collabsible items */
  items: CollapsibleItem[];
  /** If true, only one item can be expanded at a time (accordion mode) */
  accordion?: boolean;
}

export const CollapsibleItem: FactoryComponent<
  CollapsibleItem & {
    isActive: boolean;
    onToggle: () => void;
  }
> = () => {
  return {
    view: ({ attrs: { header, body, iconName, isActive, onToggle } }) => {
      return m('li', { className: isActive ? 'active' : '' }, [
        header || iconName
          ? m(
              '.collapsible-header',
              {
                onclick: onToggle,
              },
              [
                iconName ? m('i.material-icons', iconName) : undefined,
                header ? (typeof header === 'string' ? m('span', header) : header) : undefined,
              ]
            )
          : undefined,
        m(
          '.collapsible-body',
          {
            style: {
              display: isActive ? 'block' : 'none',
              transition: 'display 0.3s ease',
            },
          },
          [
            m(
              '.collapsible-body-content',
              {
                style: { padding: '2rem' },
              },
              body ? (typeof body === 'string' ? m('div', { innerHTML: body }) : body) : undefined
            ),
          ]
        ),
      ]);
    },
  };
};

/**
 * Creates a collabsible or accordion component with pure CSS/Mithril implementation.
 * No MaterializeCSS JavaScript dependencies.
 */
export const Collapsible: FactoryComponent<CollapsibleAttrs> = () => {
  const state = {
    activeItems: new Set<number>(),
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize active items from the items array
      attrs.items.forEach((item, index) => {
        if (item.active) {
          state.activeItems.add(index);
        }
      });
    },

    view: ({ attrs }) => {
      const { items, accordion = true, class: c, className, style, id } = attrs;

      const toggleItem = (index: number) => {
        if (accordion) {
          // Accordion mode: only one item can be active
          if (state.activeItems.has(index)) {
            state.activeItems.clear();
          } else {
            state.activeItems.clear();
            state.activeItems.add(index);
          }
        } else {
          // Expandable mode: multiple items can be active
          if (state.activeItems.has(index)) {
            state.activeItems.delete(index);
          } else {
            state.activeItems.add(index);
          }
        }
      };

      return items && items.length > 0
        ? m(
            'ul.collapsible',
            {
              class: c || className,
              style: {
                border: '1px solid #ddd',
                borderRadius: '2px',
                margin: '0.5rem 0 1rem 0',
                ...style,
              },
              id,
            },
            items.map((item, index) =>
              m(CollapsibleItem, {
                ...item,
                key: index,
                isActive: state.activeItems.has(index),
                onToggle: () => toggleItem(index),
              })
            )
          )
        : undefined;
    },
  };
};
