import m from 'mithril';
import { Tabs, type TabItem, type TabsAttrs } from '../src/tabs';
import { cleanup, fireEvent, render } from './test-utils';

const createTabs = (): TabItem[] => [
  { title: 'Tab 1', vnode: m('div', 'Content 1'), id: 'tab1' },
  { title: 'Tab 2', vnode: m('div', 'Content 2'), id: 'tab2' },
  { title: 'Tab 3', vnode: m('div', 'Content 3'), id: 'tab3' },
];

describe('Tabs', () => {
  afterEach(cleanup);

  it('renders labels, active content, and tab IDs', () => {
    const { container } = render(Tabs, { tabs: createTabs(), selectedTabId: 'tab1' });

    expect(Array.from(container.querySelectorAll('.tab a')).map((link) => link.textContent)).toEqual([
      'Tab 1',
      'Tab 2',
      'Tab 3',
    ]);
    expect(container.querySelector('.tab a.active')).toHaveTextContent('Tab 1');
    expect(container.querySelector('.tab-content')).toHaveTextContent('Content 1');
    expect(container.querySelector('.tab a')).toHaveAttribute('href', '#anchor-tab1');
  });

  it('synchronizes selectedTabId on the same mounted instance', () => {
    const attrs = { tabs: createTabs(), selectedTabId: 'tab1' };
    const result = render(Tabs, attrs);

    result.rerender(Tabs, { ...attrs, selectedTabId: 'tab2' });

    expect(result.container.querySelector('.tab a.active')).toHaveTextContent('Tab 2');
    expect(result.container.querySelector('.tab-content')).toHaveTextContent('Content 2');
  });

  it('calls onShow before onTabChange and ignores a same-tab click', () => {
    const calls: string[] = [];
    const attrs: TabsAttrs = {
      tabs: createTabs(),
      onShow: (tab) => calls.push(`show:${tab.textContent}`),
      onTabChange: (tabId) => calls.push(`change:${tabId}`),
    };
    const result = render(Tabs, attrs);

    fireEvent.click(result.container.querySelectorAll('.tab a')[0] as HTMLElement);
    expect(calls).toEqual([]);

    fireEvent.click(result.container.querySelectorAll('.tab a')[1] as HTMLElement);
    expect(calls).toEqual(['show:Tab 2', 'change:tab2']);

    result.rerender(Tabs, attrs);
    expect(result.container.querySelector('.tab a.active')).toHaveTextContent('Tab 2');
    expect(result.container.querySelector('.tab-content')).toHaveTextContent('Content 2');
  });

  it('does not transition disabled or href tabs on click', () => {
    const onTabChange = jest.fn();
    const tabs: TabItem[] = [
      { title: 'Disabled', id: 'disabled', disabled: true },
      { title: 'External', id: 'external', href: 'https://example.com', target: '_blank' },
      { title: 'Eligible', id: 'eligible', vnode: m('div', 'Eligible content') },
    ];
    const result = render(Tabs, { tabs, onTabChange });

    expect(result.container.querySelector('.tab a.active')).toHaveTextContent('Eligible');
    fireEvent.click(result.container.querySelectorAll('.tab a')[0] as HTMLElement);
    fireEvent.click(result.container.querySelectorAll('.tab a')[1] as HTMLElement);
    expect(onTabChange).not.toHaveBeenCalled();
    expect(result.container.querySelectorAll('.tab a')[0]).toHaveStyle({
      opacity: '0.6',
      cursor: 'not-allowed',
    });
    expect(result.container.querySelectorAll('.tab a')[1]).toHaveAttribute('href', 'https://example.com');
    expect(result.container.querySelectorAll('.tab a')[1]).toHaveAttribute('target', '_blank');
  });

  it('preserves tab width and custom class rendering', () => {
    const fill = render(Tabs, { tabs: createTabs(), tabWidth: 'fill', className: 'custom-tabs' });
    expect(fill.container.querySelector('ul.tabs')).toHaveClass('tabs-fixed-width', 'custom-tabs');
    fill.unmount();

    const fixed = render(Tabs, { tabs: createTabs(), tabWidth: 'fixed' });
    fixed.container.querySelectorAll('.tab').forEach((tab) => expect(tab).toHaveClass('col', 's4'));
  });

  it('changes tabs on left and right swipes but not below threshold or at edges', () => {
    const onTabChange = jest.fn();
    const attrs = { tabs: createTabs(), swipeable: true, onTabChange };
    const result = render(Tabs, attrs);
    const content = () => result.container.querySelector('.tab-content') as HTMLElement;
    const swipe = (startX: number, endX: number) => {
      content().dispatchEvent(
        new TouchEvent('touchstart', { bubbles: true, touches: [{ clientX: startX } as Touch] })
      );
      content().dispatchEvent(
        new TouchEvent('touchend', { bubbles: true, changedTouches: [{ clientX: endX } as Touch] })
      );
      result.rerender(Tabs, attrs);
    };

    swipe(100, 60);
    expect(onTabChange).not.toHaveBeenCalled();
    expect(result.container.querySelector('.tab a.active')).toHaveTextContent('Tab 1');

    swipe(100, 20);
    expect(onTabChange).toHaveBeenLastCalledWith('tab2');
    expect(result.container.querySelector('.tab a.active')).toHaveTextContent('Tab 2');

    swipe(20, 100);
    expect(onTabChange).toHaveBeenLastCalledWith('tab1');

    swipe(20, 100);
    expect(onTabChange).toHaveBeenCalledTimes(2);
  });
});
