import m, { Vnode, FactoryComponent, Attributes } from 'mithril';
import {
  createDomTabsIndicatorMeasurementAdapter,
  createTabsIndicator,
  createTabsStateTransitions,
  type TabsSnapshot,
} from './tabs-state';

/**
 * Link or anchor target may take 4 values:
 * - _blank: Opens the linked document in a new window or tab
 * - _self: Opens the linked document in the same frame as it was clicked (this is default)
 * - _parent: Opens the linked document in the parent frame
 * - _top: Opens the linked document in the full body of the window
 */
export type AnchorTarget = '_blank' | '_self' | '_parent' | '_top';

export interface TabItem {
  /** Title of the tab */
  title: string;
  /** Vnode to render: may be empty in case of a using the tab as a hyperlink. */
  vnode?: Vnode<any, any>;
  /** ID of the tab element. Default the title in lowercase */
  id?: string;
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

export interface TabsOptions {
  /** Duration of tab change animation in ms */
  duration?: number;
  /** Called when a tab is shown */
  onShow?: (tab: HTMLElement) => void;
  /** The maximum width at which tabs switch to swipeable mode */
  responsiveThreshold?: number;
  /** Enable swiping between tabs on mobile */
  swipeable?: boolean;
}

export interface TabsAttrs extends TabsOptions, Attributes {
  /** Selected tab id, takes precedence over tab.active property */
  selectedTabId?: string;
  /**
   * Tab width, can be `auto` to use the width of the title,
   * `fill` to use all availabe space, or `fixed` to use a column size.
   */
  tabWidth?: 'auto' | 'fixed' | 'fill';
  /** List of tab items */
  tabs: TabItem[];
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
}

/** CSS-only Tabs component - no MaterializeCSS dependencies */
export const Tabs: FactoryComponent<TabsAttrs> = () => {
  const transitions = createTabsStateTransitions<TabItem>();
  const indicator = createTabsIndicator(createDomTabsIndicatorMeasurementAdapter());
  let snapshot: TabsSnapshot<TabItem> = { tabs: [] };
  let indicatorStyle = { left: '0px', width: '0px' };

  const handleTabClick = (tabId: string, tabElement: HTMLElement, attrs: TabsAttrs) => {
    const transition = transitions.click(tabId);
    if (!transition.changed || !transition.tabId) return;
    if (attrs.onShow) {
      attrs.onShow(tabElement);
    }
    if (attrs.onTabChange) {
      attrs.onTabChange(transition.tabId);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    transitions.swipe({ type: 'start', x: e.touches[0].clientX });
  };

  const handleTouchEnd = (e: TouchEvent, attrs: TabsAttrs) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const transition = transitions.swipe({ type: 'end', x: e.changedTouches[0].clientX });
    if (transition.changed && transition.tabId && attrs.onTabChange) {
      attrs.onTabChange(transition.tabId);
    }
  };

  return {
    oninit: ({ attrs }) => {
      snapshot = transitions.sync(attrs.tabs, attrs.selectedTabId);
    },

    oncreate: () => {
      indicatorStyle = indicator.sync(snapshot.activeTab?.tabId || '');
    },

    view: ({ attrs }) => {
      const { tabWidth, tabs, className, style, swipeable = false } = attrs;
      const cn =
        [tabWidth === 'fill' ? 'tabs-fixed-width' : '', className].filter(Boolean).join(' ').trim() || undefined;

      snapshot = transitions.sync(tabs, attrs.selectedTabId);
      const { tabs: anchoredTabs, activeTab } = snapshot;
      indicatorStyle = indicator.sync(activeTab?.tabId || '');

      return m('.row', [
        // Tab headers
        m(
          '.col.s12',
          m(
            'ul.tabs',
            {
              className: cn,
              style,
            },
            [
              ...anchoredTabs.map((tab) => {
                const { className: tabClassName, title, anchorId, tabId, disabled, target, href } = tab;
                const cn = ['tab', tabWidth === 'fixed' ? `col s${Math.floor(12 / tabs.length)}` : '', tabClassName]
                  .filter(Boolean)
                  .join(' ')
                  .trim();

                return m(
                  'li',
                  {
                    key: tabId,
                    id: tabId,
                    className: cn,
                    disabled,
                  },
                  m(
                    'a',
                    {
                      id: anchorId,
                      className: tab.tabId === activeTab?.tabId ? 'active' : undefined,
                      target,
                      href: href || `#${anchorId}`,
                      onclick:
                        disabled || href
                          ? undefined
                          : (e: Event) => {
                              e.preventDefault();
                              handleTabClick(tabId, e.target as HTMLElement, attrs);
                            },
                      style: disabled ? { opacity: '0.6', cursor: 'not-allowed' } : undefined,
                    },
                    title
                  )
                );
              }),
              // Add the indicator element
              m('li.indicator', {
                key: 'indicator',
                style: {
                  display: activeTab ? 'block' : 'none',
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  transition: 'left 0.35s ease, width 0.35s ease',
                },
              }),
            ]
          ),
          activeTab &&
            m(
              '.col.s12',
              {
                ontouchstart: swipeable ? handleTouchStart : undefined,
                ontouchend: swipeable ? (e: TouchEvent) => handleTouchEnd(e, attrs) : undefined,
                style: swipeable ? { touchAction: 'pan-y' } : undefined,
              },

              m(
                '.tab-content',
                {
                  className: activeTab.contentClass,
                },
                activeTab.vnode
              )
            )
        ),
      ]);
    },
  };
};
