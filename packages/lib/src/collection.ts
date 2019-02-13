import m, { FactoryComponent, Attributes, Vnode } from 'mithril';
import { Icon } from '.';

export enum CollectionMode {
  BASIC,
  LINKS,
  AVATAR,
}

export interface ICollectionItem extends Attributes {
  /** Title of the collection item */
  title: string | Vnode;
  /** For links, may contain a URL reference */
  href?: string;
  /** For Avatar mode, may contain a URL reference to an image or a material icons class name */
  avatar?: string;
  /** Add a class to the avatar image or icon, e.g. a color 'red'. */
  className?: string;
  /** For Avatar mode, may contain a two-line trusted HTML content */
  content?: string;
  /** If active, preselect the collection item. */
  active?: boolean;
  /** Add a material icon as secondary content. */
  iconName?: string;
  /** Onclick event handler */
  onclick?: (item: ICollectionItem) => void;
}

export interface ICollection extends Attributes {
  /** Optional header */
  header?: string;
  /** The list of items */
  items: ICollectionItem[];
  /** Mode of operation */
  mode?: CollectionMode;
}

export const SecondaryContent: FactoryComponent<ICollectionItem> = () => {
  return {
    view: ({ attrs }) => {
      const { href, iconName = 'send', onclick, style = { cursor: 'pointer' } } = attrs;
      return m(
        'a.secondary-content',
        {
          href,
          style,
          oncreate: href ? m.route.link : undefined,
          onclick: onclick ? () => onclick(attrs) : undefined,
        },
        m(Icon, { iconName })
      );
    },
  };
};

const avatarIsImage = (avatar = '') => /\./.test(avatar);

export const ListItem: FactoryComponent<{ item: ICollectionItem; mode: CollectionMode }> = () => {
  return {
    view: ({ attrs: { item, mode } }) => {
      const { title, content = '', active, iconName, avatar, className } = item;
      return mode === CollectionMode.AVATAR
        ? m(`li.collection-item.avatar${active ? '.active' : ''}`, [
            avatarIsImage(avatar)
              ? m('img.circle', { src: avatar })
              : m('i.material-icons.circle', { className }, avatar),
            m('span.title', title),
            m('p', m.trust(content)),
            m(SecondaryContent, item),
          ])
        : m(
            `li.collection-item${active ? '.active' : ''}`,
            iconName ? m('div', [title, m(SecondaryContent, item)]) : title
          );
    },
  };
};

const BasicCollection: FactoryComponent<ICollection> = () => {
  return {
    view: ({ attrs }) => {
      const { header, items, mode = CollectionMode.BASIC } = attrs;
      console.table(items);
      return items && items.length > 0
        ? header
          ? m('ul.collection.with-header', [
              m('li.collection-header', m('h4', header)),
              ...items.map(item => m(ListItem, { item, mode })),
            ])
          : m('ul.collection', items.map(item => m(ListItem, { item, mode })))
        : undefined;
    },
  };
};

export const AnchorItem: FactoryComponent<ICollectionItem> = () => {
  return {
    view: ({ attrs }) => {
      const { title, active, href } = attrs;
      return m(
        `a.collection-item${active ? '.active' : ''}`,
        { ...attrs, oncreate: href ? m.route.link : undefined },
        title
      );
    },
  };
};

const LinksCollection: FactoryComponent<ICollection> = () => {
  return {
    view: ({ attrs }) => {
      const { items } = attrs;
      return items && items.length > 0 ? m('.collection', items.map(item => m(AnchorItem, item))) : undefined;
    },
  };
};

/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/collapsible.html
 */
export const Collection: FactoryComponent<ICollection> = () => {
  return {
    view: ({ attrs }) => {
      const { items, header, mode = CollectionMode.BASIC } = attrs;
      return items && items.length > 0
        ? mode === CollectionMode.LINKS
          ? m(LinksCollection, { items })
          : m(BasicCollection, { header, items, mode })
        : undefined;
    },
  };
};
