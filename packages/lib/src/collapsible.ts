import m, { Component, Vnode } from 'mithril';

export interface ICollablisbleItem {
  /** Header of the collabsible item, may contain HTML or may be a Vnode */
  header?: string | Vnode;
  /** Body of the collabsible item, may contain HTML or may be a Vnode */
  body?: string | Vnode;
  /** If active, preselect the collabsible item. */
  active?: boolean;
  /** Add an material icon in front of the header. */
  iconName?: string;
}

export interface ICollapsible extends Partial<M.CollapsibleOptions> {
  /** The list of accordeon/collabsible items */
  items: ICollablisbleItem[];
}

export const CollabsibleItem = (): Component<ICollablisbleItem> => {
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
export const Collabsible = (): Component<ICollapsible> => {
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll('.collapsible');
      if (elems) {
        M.Collapsible.init(elems, attrs);
      }
    },
    view: ({ attrs }) => {
      const { items } = attrs;
      return items && items.length > 0 ? m('ul.collapsible', items.map(item => m(CollabsibleItem, item))) : undefined;
    },
  };
};
