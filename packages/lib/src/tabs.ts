import m, { Vnode, FactoryComponent, Attributes } from 'mithril';

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

export interface ITabsOptions {
  /** Duration of tab change animation in ms */
  duration?: number;
  /** Called when a tab is shown */
  onShow?: (tab: HTMLElement) => void;
  /** The maximum width at which tabs switch to swipeable mode */
  responsiveThreshold?: number;
  /** Enable swiping between tabs on mobile */
  swipeable?: boolean;
}

export interface ITabs extends ITabsOptions, Attributes {
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

/** CSS-only Tabs component - no MaterializeCSS dependencies */
export const Tabs: FactoryComponent<ITabs> = () => {
  const state = {
    activeTabId: '',
    isDragging: false,
    startX: 0,
    translateX: 0,
  };

  const createId = (title: string, id?: string) => (id ? id : title.replace(/ /g, '').toLowerCase());

  const handleTabClick = (tabId: string, tabElement: HTMLElement, attrs: ITabs) => {
    if (state.activeTabId === tabId) return;
    
    state.activeTabId = tabId;
    
    // Call onShow callback if provided
    if (attrs.onShow) {
      attrs.onShow(tabElement);
    }
    
    m.redraw();
  };

  // Touch/swipe support for mobile
  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    state.isDragging = true;
    state.startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent, attrs: ITabs) => {
    if (!state.isDragging || !e.changedTouches || e.changedTouches.length === 0) return;
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - state.startX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(deltaX) > threshold) {
      const currentIndex = attrs.tabs.findIndex(tab => 
        createId(tab.title, tab.id) === state.activeTabId
      );
      
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        const prevTab = attrs.tabs[currentIndex - 1];
        if (!prevTab.disabled && !prevTab.href) {
          state.activeTabId = createId(prevTab.title, prevTab.id);
        }
      } else if (deltaX < 0 && currentIndex < attrs.tabs.length - 1) {
        // Swipe left - go to next tab
        const nextTab = attrs.tabs[currentIndex + 1];
        if (!nextTab.disabled && !nextTab.href) {
          state.activeTabId = createId(nextTab.title, nextTab.id);
        }
      }
    }
    
    state.isDragging = false;
    state.translateX = 0;
    m.redraw();
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize active tab - active property on tab item takes precedence
      const activeTab = attrs.tabs.find(t => t.active);
      const selectedId = attrs.selectedTabId;
      
      if (activeTab) {
        // Active tab property takes precedence over selectedTabId
        state.activeTabId = createId(activeTab.title, activeTab.id);
      } else if (selectedId) {
        state.activeTabId = selectedId;
      } else {
        // Default to first non-disabled tab
        const firstAvailableTab = attrs.tabs.find(t => !t.disabled && !t.href);
        if (firstAvailableTab) {
          state.activeTabId = createId(firstAvailableTab.title, firstAvailableTab.id);
        }
      }
    },


    view: ({ attrs }) => {
      const { tabWidth, tabs, className, style, swipeable = false } = attrs;
      const cn = [tabWidth === 'fill' ? 'tabs-fixed-width' : '', className].filter(Boolean).join(' ').trim();
      
      // Check for active tab property first, then selectedTabId - do this in view for immediate response
      const activeTab = attrs.tabs.find(t => t.active);
      if (activeTab) {
        const activeTabId = createId(activeTab.title, activeTab.id);
        if (activeTabId !== state.activeTabId) {
          state.activeTabId = activeTabId;
        }
      } else if (attrs.selectedTabId && attrs.selectedTabId !== state.activeTabId) {
        state.activeTabId = attrs.selectedTabId;
      }

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
            tabs.map((tab) => {
              const { className: tabClassName, title, id, disabled, target, href } = tab;
              const cn = [tabWidth === 'fixed' ? `col s${Math.floor(12 / tabs.length)}` : '', tabClassName]
                .filter(Boolean)
                .join(' ')
                .trim();
              const anchorId = createId(title, id);
              const tabId = `tab_${anchorId}`;
              const isActive = state.activeTabId === anchorId;
              const cnA = isActive ? 'active' : '';

              return m(
                'li.tab',
                {
                  key: anchorId,
                  className: cn,
                },
                m('a', {
                  id: tabId,
                  className: cnA,
                  target,
                  href: href || `#${anchorId}`,
                  onclick: disabled || href ? undefined : (e: Event) => {
                    e.preventDefault();
                    handleTabClick(anchorId, e.target as HTMLElement, attrs);
                  },
                  style: disabled ? { opacity: '0.6', cursor: 'not-allowed' } : undefined,
                }, title)
              );
            })
          )
        ),
        
        // Tab content
        m(
          '.col.s12',
          {
            ontouchstart: swipeable ? handleTouchStart : undefined,
            ontouchend: swipeable ? (e: TouchEvent) => handleTouchEnd(e, attrs) : undefined,
            style: swipeable ? { touchAction: 'pan-y' } : undefined,
          },
          tabs
            .filter(({ href }) => typeof href === 'undefined')
            .map(({ id, title, vnode, contentClass }) => {
              const contentId = createId(title, id);
              const isActive = state.activeTabId === contentId;
              
              return m('.tab-content', {
                key: contentId,
                id: contentId,
                className: contentClass,
                style: {
                  display: isActive ? 'block' : 'none',
                  transition: attrs.duration ? `opacity ${attrs.duration}ms ease` : 'opacity 300ms ease',
                  opacity: isActive ? '1' : '0',
                },
              }, isActive ? vnode : null);
            })
        ),
      ]);
    },
  };
};
