import m, { Vnode, FactoryComponent, Attributes } from 'mithril';

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
  type AnchoredTabItem = TabItem & {
    anchorId: string;
    tabId: string;
  };

  const toAnchored = () => {
    return (tab: TabItem) => {
      const tabId = createId(tab.title, tab.id);
      return { ...tab, tabId, anchorId: `anchor-${tabId}` } as AnchoredTabItem;
    };
  };

  const state = {
    activeTabId: '',
    isDragging: false,
    startX: 0,
    translateX: 0,
    indicatorStyle: {
      left: '0px',
      width: '0px',
    },
    lastIndicatorUpdate: '',
  };

  const createId = (title: string, id?: string) => (id ? id : title.replace(/ /g, '').toLowerCase());

  const updateIndicator = () => {
    const tabElement = document.getElementById(state.activeTabId);
    if (tabElement) {
      const tabsContainer = tabElement.closest('.tabs');
      if (tabsContainer) {
        const containerRect = tabsContainer.getBoundingClientRect();
        const tabRect = tabElement.getBoundingClientRect();

        const newLeft = `${tabRect.left - containerRect.left}px`;
        const newWidth = `${tabRect.width}px`;

        // Only update if values actually changed - NO m.redraw()!
        if (state.indicatorStyle.left !== newLeft || state.indicatorStyle.width !== newWidth) {
          state.indicatorStyle = {
            left: newLeft,
            width: newWidth,
          };
        }
      }
    }
  };

  const handleTabClick = (tabId: string, tabElement: HTMLElement, attrs: TabsAttrs) => {
    console.log({ state, tabId });
    if (state.activeTabId === tabId) return;

    state.activeTabId = tabId;

    // Call onShow callback if provided
    if (attrs.onShow) {
      attrs.onShow(tabElement);
    }

    // Call onTabChange callback if provided
    if (attrs.onTabChange) {
      attrs.onTabChange(tabId);
    }
  };

  // Touch/swipe support for mobile
  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    state.isDragging = true;
    state.startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent, attrs: TabsAttrs) => {
    if (!state.isDragging || !e.changedTouches || e.changedTouches.length === 0) return;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - state.startX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(deltaX) > threshold) {
      const currentIndex = attrs.tabs.findIndex((tab) => createId(tab.title, tab.id) === state.activeTabId);

      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        const prevTab = attrs.tabs[currentIndex - 1];
        if (!prevTab.disabled && !prevTab.href) {
          const newTabId = createId(prevTab.title, prevTab.id);
          state.activeTabId = newTabId;
          if (attrs.onTabChange) {
            attrs.onTabChange(newTabId);
          }
        }
      } else if (deltaX < 0 && currentIndex < attrs.tabs.length - 1) {
        // Swipe left - go to next tab
        const nextTab = attrs.tabs[currentIndex + 1];
        if (!nextTab.disabled && !nextTab.href) {
          const newTabId = createId(nextTab.title, nextTab.id);
          state.activeTabId = newTabId;
          if (attrs.onTabChange) {
            attrs.onTabChange(newTabId);
          }
        }
      }
    }

    state.isDragging = false;
    state.translateX = 0;
    // m.redraw();
  };

  /** Initialize active tab - selectedTabId takes precedence, next active property or first available tab */
  const setActiveTabId = (anchoredTabs: AnchoredTabItem[], selectedTabId?: string): AnchoredTabItem | undefined => {
    const selectedTab = selectedTabId ? anchoredTabs.find((a) => a.tabId === selectedTabId) : undefined;
    if (selectedTab) {
      state.activeTabId = selectedTab.tabId;
      return selectedTab;
    }

    const curTab = state.activeTabId && anchoredTabs.find((a) => a.tabId === state.activeTabId);
    if (curTab) return curTab;

    // Default to first non-disabled tab
    const firstAvailableTab = anchoredTabs.find((a) => !a.disabled && !a.href);
    if (firstAvailableTab) {
      state.activeTabId = firstAvailableTab.tabId;
      return firstAvailableTab;
    }
    return undefined;
  };

  return {
    oninit: ({ attrs }) => {
      const anchoredTabs = attrs.tabs.map(toAnchored());
      setActiveTabId(anchoredTabs, attrs.selectedTabId);
    },

    oncreate: () => {
      updateIndicator();
      m.redraw();
    },

    view: ({ attrs }) => {
      const { tabWidth, tabs, className, style, swipeable = false } = attrs;
      const cn =
        [tabWidth === 'fill' ? 'tabs-fixed-width' : '', className].filter(Boolean).join(' ').trim() || undefined;

      const anchoredTabs = tabs.map(toAnchored());
      const activeTab = setActiveTabId(anchoredTabs, attrs.selectedTabId);
      updateIndicator();

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
                      className: tab.tabId === state.activeTabId ? 'active' : undefined,
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
                  display: state.activeTabId ? 'block' : 'none',
                  left: state.indicatorStyle.left,
                  width: state.indicatorStyle.width,
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
