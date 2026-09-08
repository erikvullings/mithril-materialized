export interface TabsStateItem {
  title: string;
  id?: string;
  disabled?: boolean;
  href?: string;
}

export type NormalizedTab<T extends TabsStateItem> = T & {
  anchorId: string;
  tabId: string;
};

export interface TabsSnapshot<T extends TabsStateItem> {
  tabs: NormalizedTab<T>[];
  activeTab?: NormalizedTab<T>;
}

export interface TabsTransition {
  changed: boolean;
  tabId?: string;
}

export type TabsSwipe =
  | { type: 'start'; x: number }
  | { type: 'end'; x: number };

export interface TabsStateTransitions<T extends TabsStateItem> {
  sync: (tabs: T[], selectedTabId?: string) => TabsSnapshot<T>;
  click: (tabId: string) => TabsTransition;
  swipe: (gesture: TabsSwipe) => TabsTransition;
}

export interface TabsIndicatorMeasurement {
  left: number;
  width: number;
}

export interface TabsIndicatorMeasurementAdapter {
  measure: (activeTabId: string) => TabsIndicatorMeasurement | undefined;
}

export interface TabsIndicator {
  sync: (activeTabId: string) => { left: string; width: string };
}

const createTabId = (title: string, id?: string): string => id || title.replace(/ /g, '').toLowerCase();

const isEligible = (tab: TabsStateItem): boolean => !tab.disabled && !tab.href;

export const createTabsStateTransitions = <T extends TabsStateItem>(): TabsStateTransitions<T> => {
  let activeTabId = '';
  let tabs: NormalizedTab<T>[] = [];
  let isDragging = false;
  let startX = 0;

  const transitionTo = (tab?: NormalizedTab<T>): TabsTransition => {
    if (!tab || !isEligible(tab) || tab.tabId === activeTabId) {
      return { changed: false };
    }
    activeTabId = tab.tabId;
    return { changed: true, tabId: tab.tabId };
  };

  const sync = (nextTabs: T[], selectedTabId?: string): TabsSnapshot<T> => {
    tabs = nextTabs.map((tab) => {
      const tabId = createTabId(tab.title, tab.id);
      return { ...tab, tabId, anchorId: `anchor-${tabId}` };
    });

    const selectedTab = selectedTabId ? tabs.find((tab) => tab.tabId === selectedTabId) : undefined;
    if (selectedTab) {
      activeTabId = selectedTab.tabId;
    } else if (!tabs.some((tab) => tab.tabId === activeTabId)) {
      activeTabId = tabs.find(isEligible)?.tabId || '';
    }

    return {
      tabs,
      activeTab: tabs.find((tab) => tab.tabId === activeTabId),
    };
  };

  const click = (tabId: string): TabsTransition => transitionTo(tabs.find((tab) => tab.tabId === tabId));

  const swipe = (gesture: TabsSwipe): TabsTransition => {
    if (gesture.type === 'start') {
      isDragging = true;
      startX = gesture.x;
      return { changed: false };
    }
    if (!isDragging) {
      return { changed: false };
    }

    const deltaX = gesture.x - startX;
    isDragging = false;
    if (Math.abs(deltaX) <= 50) {
      return { changed: false };
    }

    const currentIndex = tabs.findIndex((tab) => tab.tabId === activeTabId);
    const adjacentIndex = deltaX > 0 ? currentIndex - 1 : currentIndex + 1;
    return transitionTo(tabs[adjacentIndex]);
  };

  return { sync, click, swipe };
};

export const createDomTabsIndicatorMeasurementAdapter = (): TabsIndicatorMeasurementAdapter => ({
  measure: (activeTabId) => {
    const tabElement = document.getElementById(activeTabId);
    const tabsContainer = tabElement?.closest('.tabs');
    if (!tabElement || !tabsContainer) return undefined;

    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();
    return {
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    };
  },
});

export const createTabsIndicator = (adapter: TabsIndicatorMeasurementAdapter): TabsIndicator => {
  let style = { left: '0px', width: '0px' };

  return {
    sync: (activeTabId) => {
      const measurement = adapter.measure(activeTabId);
      if (measurement) {
        style = {
          left: `${measurement.left}px`,
          width: `${measurement.width}px`,
        };
      }
      return style;
    },
  };
};
