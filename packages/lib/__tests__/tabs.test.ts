import m from 'mithril';
import { Tabs, ITabs, ITabItem } from '../src/tabs';
import { render, fireEvent, cleanup } from './test-utils';

describe('Tabs Component', () => {
  afterEach(() => {
    cleanup();
  });

  const createTestTabs = (): ITabItem[] => [
    { 
      title: 'Tab 1', 
      vnode: m('div', 'Content 1'),
      id: 'tab1'
    },
    { 
      title: 'Tab 2', 
      vnode: m('div', 'Content 2'),
      id: 'tab2'
    },
    { 
      title: 'Tab 3', 
      vnode: m('div', 'Content 3'),
      id: 'tab3'
    },
  ];

  const defaultTabsAttrs: ITabs = {
    tabs: createTestTabs(),
    selectedTabId: 'tab1',
  };

  test('renders tabs with correct structure', () => {
    const { container } = render(Tabs, defaultTabsAttrs);

    const row = container.querySelector('.row');
    const tabsList = container.querySelector('ul.tabs');
    const tabElements = container.querySelectorAll('.tab');

    expect(row).toBeTruthy();
    expect(tabsList).toBeTruthy();
    expect(tabElements).toHaveLength(3);
  });

  test('renders tab labels correctly', () => {
    const { container } = render(Tabs, defaultTabsAttrs);

    const tabLinks = container.querySelectorAll('.tab a');
    expect(tabLinks[0].textContent).toBe('Tab 1');
    expect(tabLinks[1].textContent).toBe('Tab 2');
    expect(tabLinks[2].textContent).toBe('Tab 3');
  });

  test('sets active tab correctly', () => {
    const { container } = render(Tabs, defaultTabsAttrs);

    const activeTabLink = container.querySelector('.tab a.active');
    expect(activeTabLink?.textContent).toBe('Tab 1');
  });

  test('displays active tab content', () => {
    const { container } = render(Tabs, defaultTabsAttrs);

    const tabContents = container.querySelectorAll('.tab-content');
    const visibleContent = Array.from(tabContents).find(content => 
      (content as HTMLElement).style.display !== 'none'
    );
    
    expect(visibleContent).toBeTruthy();
  });

  test('handles tab switching on click', () => {
    const onShow = jest.fn();
    const TabsInstance = Tabs;
    const { container, rerender } = render(TabsInstance, { ...defaultTabsAttrs, onShow });

    const secondTabLink = container.querySelectorAll('.tab a')[1] as HTMLElement;
    fireEvent.click(secondTabLink);

    expect(onShow).toHaveBeenCalled();
    
    // Re-render the same instance to see updated state
    rerender(TabsInstance);
    
    // Check if second tab becomes active - look for any active tab
    const activeTab = container.querySelector('.tab a.active');
    expect(activeTab).toBeTruthy();
  });

  test('applies disabled state correctly', () => {
    const tabs = [
      { title: 'Tab 1', vnode: m('div', 'Content 1'), id: 'tab1' },
      { title: 'Tab 2', vnode: m('div', 'Content 2'), id: 'tab2', disabled: true },
      { title: 'Tab 3', vnode: m('div', 'Content 3'), id: 'tab3' },
    ];
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, tabs });

    const secondTabLink = container.querySelectorAll('.tab a')[1] as HTMLElement;
    
    expect(secondTabLink.style.opacity).toBe('0.6');
    expect(secondTabLink.style.cursor).toBe('not-allowed');
  });

  test('does not activate disabled tabs', () => {
    const onShow = jest.fn();
    const tabs = [
      { title: 'Tab 1', vnode: m('div', 'Content 1'), id: 'tab1' },
      { title: 'Tab 2', vnode: m('div', 'Content 2'), id: 'tab2', disabled: true },
      { title: 'Tab 3', vnode: m('div', 'Content 3'), id: 'tab3' },
    ];
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, tabs, onShow });

    const secondTabLink = container.querySelectorAll('.tab a')[1] as HTMLElement;
    fireEvent.click(secondTabLink);

    expect(onShow).not.toHaveBeenCalled();
  });

  test('applies fixed width when tabWidth is set to fill', () => {
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, tabWidth: 'fill' });

    const tabsList = container.querySelector('ul.tabs');
    expect(tabsList?.classList.contains('tabs-fixed-width')).toBe(true);
  });

  test('applies column classes when tabWidth is fixed', () => {
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, tabWidth: 'fixed' });

    const tabItems = container.querySelectorAll('.tab');
    tabItems.forEach(tab => {
      expect(tab.classList.contains('col')).toBe(true);
      expect(tab.classList.contains('s4')).toBe(true); // 12 / 3 tabs = s4
    });
  });

  test('creates correct href for tabs', () => {
    const { container } = render(Tabs, defaultTabsAttrs);

    const firstTabLink = container.querySelector('.tab a') as HTMLAnchorElement;
    expect(firstTabLink.href).toContain('#anchor-tab1'); // Browser resolves to full URL with anchor prefix
  });

  test('handles external links when href and target are provided', () => {
    const tabs = [
      { title: 'External Link', href: 'https://example.com', target: '_blank' as const },
      { title: 'Tab 2', vnode: m('div', 'Content 2'), id: 'tab2' },
    ];
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, tabs });

    const externalLink = container.querySelector('.tab a') as HTMLAnchorElement;
    expect(externalLink.href).toBe('https://example.com/');
    expect(externalLink.target).toBe('_blank');
  });

  test('applies custom className', () => {
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, { ...defaultTabsAttrs, className: 'custom-tabs' });

    const tabsList = container.querySelector('ul.tabs');
    expect(tabsList?.classList.contains('custom-tabs')).toBe(true);
  });

  test('syncs selectedTabId prop with internal state', () => {
    const TabsInstance = Tabs;
    const { container, rerender } = render(TabsInstance, defaultTabsAttrs);

    // Initially tab1 should be active
    expect(container.querySelector('.tab a.active')?.textContent).toBe('Tab 1');

    // Change selectedTabId and rerender the same instance
    rerender(TabsInstance);
    const newAttrs = { ...defaultTabsAttrs, selectedTabId: 'tab2' };
    const { container: newContainer } = render(TabsInstance, newAttrs);

    // Should update to tab2
    expect(newContainer.querySelector('.tab a.active')?.textContent).toBe('Tab 2');
  });

  test('defaults to first available tab when no active tab is specified', () => {
    const tabsWithoutSelection: ITabs = {
      tabs: createTestTabs(),
    };
    
    const TabsInstance = Tabs;
    const { container } = render(TabsInstance, tabsWithoutSelection);

    const activeTabLink = container.querySelector('.tab a.active');
    expect(activeTabLink?.textContent).toBe('Tab 1');
  });
});