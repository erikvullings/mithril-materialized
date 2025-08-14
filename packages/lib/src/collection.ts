import m, { FactoryComponent, Attributes, Vnode } from 'mithril';
import { Icon } from './icon';

export enum CollectionMode {
  BASIC,
  LINKS,
  AVATAR,
}

export interface CollectionItem {
  /** If available, will be used as the key, so all items need an id. */
  id?: string | number;
  /** Title of the collection item */
  title: string | Vnode<any, any>;
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
  onclick?: (item: CollectionItem) => void;
  /** Any other virtual element properties, including attributes and event handlers. */
  [property: string]: any;
}

export interface CollectionAttributes extends Attributes {
  /** Optional header */
  header?: string;
  /** The list of items */
  items: CollectionItem[];
  /** Mode of operation */
  mode?: CollectionMode;
}

const isNonLocalRoute = (url?: string) => url && /https?:\/\//.test(url);

export const SecondaryContent: FactoryComponent<CollectionItem> = () => {
  return {
    view: ({ attrs }) => {
      const { href, iconName = 'send', onclick, style = { cursor: 'pointer' } } = attrs;
      const props = {
        href,
        style,
        className: 'secondary-content',
        onclick: onclick ? () => onclick(attrs) : undefined,
      };
      return isNonLocalRoute(href) || !href
        ? m('a[target=_]', props, m(Icon, { iconName }))
        : m(m.route.Link, props as { href: string }, m(Icon, { iconName }));
    },
  };
};

const avatarIsImage = (avatar = '') => /\./.test(avatar);

export const ListItem: FactoryComponent<{ item: CollectionItem; mode: CollectionMode }> = () => {
  return {
    view: ({ attrs: { item, mode } }) => {
      const { title, content = '', active, iconName, avatar, className, onclick } = item;
      return mode === CollectionMode.AVATAR
        ? m(
            'li.collection-item.avatar',
            {
              className: active ? 'active' : '',
              onclick: onclick ? () => onclick(item) : undefined,
            },
            [
              avatarIsImage(avatar)
                ? m('img.circle', { src: avatar })
                : m('i.material-icons.circle', { className }, avatar),
              m('span.title', title),
              m('p', m.trust(content)),
              m(SecondaryContent, item),
            ]
          )
        : m(
            'li.collection-item',
            {
              className: active ? 'active' : '',
            },
            iconName ? m('div', [title, m(SecondaryContent, item)]) : title
          );
    },
  };
};

const BasicCollection: FactoryComponent<CollectionAttributes> = () => {
  return {
    view: ({ attrs: { header, items, mode = CollectionMode.BASIC, ...params } }) => {
      const collectionItems = items.map((item) => m(ListItem, { key: item.id, item, mode }));
      return header
        ? m('ul.collection.with-header', params, [m('li.collection-header', m('h4', header)), collectionItems])
        : m('ul.collection', params, collectionItems);
    },
  };
};

export const AnchorItem: FactoryComponent<{ item: CollectionItem }> = () => {
  return {
    view: ({ attrs: { item } }) => {
      const { title, active, href, ...params } = item;
      const props = {
        ...params,
        className: `collection-item ${active ? 'active' : ''}`,
        href,
      };
      return isNonLocalRoute(href) || !href
        ? m('a[target=_]', props, title)
        : m(m.route.Link, props as { href: string }, title);
    },
  };
};

const LinksCollection: FactoryComponent<CollectionAttributes> = () => {
  return {
    view: ({ attrs: { items, header, ...params } }) => {
      return header
        ? m('.collection.with-header', params, [
            m('.collection-header', m('h4', header)),
            items.map((item) => m(AnchorItem, { key: item.id, item })),
          ])
        : m(
            '.collection',
            params,
            items.map((item) => m(AnchorItem, { key: item.id, item }))
          );
    },
  };
};

/**
 * Creates a Collection of items, optionally containing links, headers, secondary content or avatars.
 * @see https://materializecss.com/collections.html
 */
export const Collection: FactoryComponent<CollectionAttributes> = () => {
  return {
    view: ({ attrs: { items, header, mode = CollectionMode.BASIC, ...params } }) => {
      return header || (items && items.length > 0)
        ? mode === CollectionMode.LINKS
          ? m(LinksCollection, { header, items, ...params })
          : m(BasicCollection, { header, items, mode, ...params })
        : undefined;
    },
  };
};
