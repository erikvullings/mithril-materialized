import m, { Vnode, FactoryComponent, Attributes } from 'mithril';
import { TabsOptions } from 'materialize-css';

/**
 * Link or anchor target may take 4 values:
 * - _blank: Opens the linked document in a new window or tab
 * - _self: Opens the linked document in the same frame as it was clicked (this is default)
 * - _parent: Opens the linked document in the parent frame
 * - _top: Opens the linked document in the full body of the window
 */
export type AnchorTarget = '_blank' | '_self' | '_parent' | '_top';

export interface ITabItem {
  /** Title of the tab */
  title: string;
  /** Vnode to render: may be empty in case of a using the tab as a hyperlink. */
  vnode?: Vnode<any, any>;
  /** ID of the tab element. Default the title in lowercase */
  id?: string;
  /** If the tab should be active */
  active?: boolean;
  /** If the tab should be disabled */
  disabled?: boolean;
  /** CSS class for the tab (li), default `.tab.col.s3` */
  className?: string;
  /** CSS class for the content (li), default `.tab.col.s3` */
  contentClass?: string;
  /**
   * By default, Materialize tabs will ignore their default anchor behaviour.
   * To force a tab to behave as a regular hyperlink, just specify the target property of that link.
   */
  target?: AnchorTarget;
  /** Only used in combination with a set target to make the tab act as a regular hyperlink. */
  href?: string;
}

export interface ITabs extends Partial<TabsOptions>, Attributes {
  /** Selected tab id */
  selectedTabId?: string;
  /**
   * Tab width, can be `auto` to use the width of the title,
   * `fill` to use all availabe space, or `fixed` to use a column size.
   */
  tabWidth?: 'auto' | 'fixed' | 'fill';
  /** List of tab items */
  tabs: ITabItem[];
}

export const Tabs: FactoryComponent<ITabs> = () => {
  const state = {} as { instance: M.Tabs };

  const createId = (title: string, id?: string) => (id ? id : title.replace(/ /g, '').toLowerCase());
  return {
    view: ({
      attrs: { tabWidth, selectedTabId, tabs, className: cn, style, duration, onShow, swipeable, responsiveThreshold },
    }) => {
      const activeTab = tabs.filter(t => t.active).shift();
      const select = selectedTabId || (activeTab ? createId(activeTab.title, activeTab.id) : '');
      return m('.row', [
        m(
          '.col.s12',
          m(
            `ul.tabs${tabWidth === 'fill' ? '.tabs-fixed-width' : ''}`,
            {
              className: cn,
              style,
              oncreate: ({ dom }) => {
                state.instance = M.Tabs.init(dom, {
                  duration,
                  onShow,
                  responsiveThreshold,
                  swipeable,
                });
              },
              onupdate: () => {
                if (select) {
                  const el = document.getElementById(`tab_${select}`);
                  if (el) {
                    el.click();
                  }
                }
              },
              onremove: () => state.instance.destroy(),
            },
            tabs.map(({ className, title, id, active, disabled, target, href }) =>
              m(
                `li.tab${disabled ? '.disabled' : ''}${
                  tabWidth === 'fixed' ? `.col.s${Math.floor(12 / tabs.length)}` : ''
                }`,
                { className },
                m(
                  `a[id=tab_${createId(title, id)}]${active ? '.active' : ''}`,
                  { target, href: href || `#${createId(title, id)}` },
                  title
                )
              )
            )
          )
        ),
        tabs
          .filter(({ href }) => typeof href === 'undefined')
          .map(({ id, title, vnode, contentClass }) =>
            m(`.col.s12[id=${createId(title, id)}]`, { className: contentClass }, vnode)
          ),
      ]);
    },
  };
};
