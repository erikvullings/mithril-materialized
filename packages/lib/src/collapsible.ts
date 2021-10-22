import m, { FactoryComponent, Attributes, Vnode } from 'mithril';

export interface ICollapsibleItem extends Attributes {
  /** Header of the collabsible item, may contain HTML or may be a Vnode */
  header?: string | Vnode<any, any>;
  /** Body of the collabsible item, may contain HTML or may be a Vnode */
  body?: string | Vnode<any, any>;
  /** If active, preselect the collabsible item. */
  active?: boolean;
  /** Add an material icon in front of the header. */
  iconName?: string;
}

export interface ICollapsible extends Partial<M.CollapsibleOptions>, Attributes {
  /** The list of accordeon/collabsible items */
  items: ICollapsibleItem[];
}

export const CollapsibleItem: FactoryComponent<ICollapsibleItem> = () => {
  return {
    view: ({ attrs: { header, body, active, iconName } }) => {
      return m(active ? 'li.active' : 'li', [
        header || iconName
          ? m('.collapsible-header', [
              iconName ? m('i.material-icons', iconName) : undefined,
              header ? (typeof header === 'string' ? m('span', header) : header) : undefined,
            ])
          : undefined,
        body ? m('.collapsible-body', typeof body === 'string' ? body : body) : undefined,
      ]);
    },
  };
};

/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/collapsible.html
 */
export const Collapsible: FactoryComponent<ICollapsible> = () => {
  return {
    oncreate: ({ dom, attrs }) => {
      M.Collapsible.init(dom, attrs);
    },
    view: ({ attrs }) => {
      const { items, class: c, className, style, id } = attrs;
      return items && items.length > 0
        ? m(
            'ul.collapsible',
            {
              class: c || className,
              style,
              id,
            },
            items.map((item) => m(CollapsibleItem, item))
          )
        : undefined;
    },
  };
};
