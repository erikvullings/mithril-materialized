import m from 'mithril';
import {
  createTabsIndicator,
  createTabsStateTransitions,
  type TabsIndicatorMeasurementAdapter,
} from '../src/tabs-state';
import type { TabItem } from '../src/tabs';

const tabs = (): TabItem[] => [
  { title: 'First Tab', vnode: m('div'), disabled: true },
  { title: 'External', id: 'external', href: '/external' },
  { title: 'Eligible', id: 'eligible', vnode: m('div') },
  { title: 'Last', id: 'last', vnode: m('div') },
];

describe('Tabs state transitions', () => {
  it('normalizes IDs and chooses the first eligible default', () => {
    const state = createTabsStateTransitions<TabItem>();
    const snapshot = state.sync(tabs());

    expect(snapshot.tabs[0]).toMatchObject({ tabId: 'firsttab', anchorId: 'anchor-firsttab' });
    expect(snapshot.activeTab?.tabId).toBe('eligible');
  });

  it('gives selectedTabId precedence and synchronizes rerenders', () => {
    const state = createTabsStateTransitions<TabItem>();

    expect(state.sync(tabs(), 'firsttab').activeTab?.tabId).toBe('firsttab');
    expect(state.sync(tabs(), 'external').activeTab?.tabId).toBe('external');
    expect(state.sync(tabs(), 'last').activeTab?.tabId).toBe('last');
  });

  it('rejects disabled, href, and same-tab clicks', () => {
    const state = createTabsStateTransitions<TabItem>();
    state.sync(tabs());

    expect(state.click('firsttab')).toEqual({ changed: false });
    expect(state.click('external')).toEqual({ changed: false });
    expect(state.click('eligible')).toEqual({ changed: false });
    expect(state.click('last')).toEqual({ changed: true, tabId: 'last' });
  });

  it('handles swipe thresholds, direction, edges, and immediate ineligible adjacency', () => {
    const state = createTabsStateTransitions<TabItem>();
    state.sync(tabs(), 'eligible');

    state.swipe({ type: 'start', x: 100 });
    expect(state.swipe({ type: 'end', x: 50 })).toEqual({ changed: false });

    state.swipe({ type: 'start', x: 100 });
    expect(state.swipe({ type: 'end', x: 20 })).toEqual({ changed: true, tabId: 'last' });

    state.swipe({ type: 'start', x: 100 });
    expect(state.swipe({ type: 'end', x: 20 })).toEqual({ changed: false });

    state.swipe({ type: 'start', x: 20 });
    expect(state.swipe({ type: 'end', x: 100 })).toEqual({ changed: true, tabId: 'eligible' });

    state.swipe({ type: 'start', x: 20 });
    expect(state.swipe({ type: 'end', x: 100 })).toEqual({ changed: false });
  });

  it('does not skip disabled adjacency but can move away from an href selection', () => {
    const state = createTabsStateTransitions<TabItem>();
    state.sync(tabs(), 'external');

    state.swipe({ type: 'start', x: 20 });
    expect(state.swipe({ type: 'end', x: 100 })).toEqual({ changed: false });

    state.swipe({ type: 'start', x: 100 });
    expect(state.swipe({ type: 'end', x: 20 })).toEqual({ changed: true, tabId: 'eligible' });
  });
});

describe('Tabs indicator Adapter', () => {
  it('places the indicator using a fake measurement Adapter', () => {
    const measurements: Record<string, { left: number; width: number }> = {
      first: { left: 12, width: 80 },
      second: { left: 92, width: 120 },
    };
    const adapter: TabsIndicatorMeasurementAdapter = {
      measure: (tabId) => measurements[tabId],
    };
    const indicator = createTabsIndicator(adapter);

    expect(indicator.sync('first')).toEqual({ left: '12px', width: '80px' });
    expect(indicator.sync('missing')).toEqual({ left: '12px', width: '80px' });
    expect(indicator.sync('second')).toEqual({ left: '92px', width: '120px' });
  });
});
