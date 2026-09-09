import m from 'mithril';
import {
  VirtualList,
  calculateVirtualRange,
  createVirtualListController,
} from '../src/virtual-list';

describe('calculateVirtualRange', () => {
  it('bounds a middle viewport with overscan', () => {
    expect(
      calculateVirtualRange({
        itemCount: 10_000,
        itemHeight: 40,
        viewportHeight: 400,
        scrollTop: 20_000,
        overscan: 2,
      })
    ).toEqual({
      startIndex: 498,
      endIndex: 511,
      offsetTop: 19_920,
      totalHeight: 400_000,
    });

  });

  it('clamps overscan at collection boundaries', () => {
    expect(
      calculateVirtualRange({
        itemCount: 100,
        itemHeight: 20,
        viewportHeight: 100,
        scrollTop: -50,
        overscan: 3,
      })
    ).toMatchObject({ startIndex: 0, endIndex: 7, offsetTop: 0 });

    expect(
      calculateVirtualRange({
        itemCount: 100,
        itemHeight: 20,
        viewportHeight: 100,
        scrollTop: 10_000,
        overscan: 3,
      })
    ).toMatchObject({
      startIndex: 92,
      endIndex: 99,
      totalHeight: 2_000,
    });
  });

  describe('VirtualList', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      m.mount(container, null);
      container.remove();
    });

    it('keeps rendered items bounded for ten thousand rows', () => {
      const items = Array.from({ length: 10_000 }, (_, index) => ({
        id: index,
        label: `Row ${index + 1}`,
      }));
      const List = VirtualList<(typeof items)[number]>();

      m.mount(container, {
        view: () =>
          m(List, {
            items,
            height: 200,
            itemHeight: 20,
            overscan: 2,
            getItemKey: (item) => item.id,
            renderItem: (item) => item.label,
            'aria-label': 'Results',
          }),
      });

      const renderedItems = container.querySelectorAll('[role="listitem"]');
      const spacer = container.querySelector<HTMLElement>('.mm-virtual-list-spacer');

      expect(renderedItems).toHaveLength(12);
      expect(renderedItems[0]).toHaveAttribute('aria-posinset', '1');
      expect(renderedItems[0]).toHaveAttribute('aria-setsize', '10000');
      expect(spacer).toHaveStyle({ height: '200000px' });
    });

    it('scrolls programmatically to the start, middle, and end', () => {
      const items = Array.from({ length: 10_000 }, (_, index) => index);
      const List = VirtualList<number>();
      const controller = createVirtualListController();

      m.mount(container, {
        view: () =>
          m(List, {
            items,
            height: 200,
            itemHeight: 20,
            controller,
            getItemKey: (item) => item,
            renderItem: (item) => `Row ${item}`,
          }),
      });
      const viewport = container.querySelector<HTMLElement>('.mm-virtual-list')!;

      controller.scrollToIndex(0, 'start');
      expect(viewport.scrollTop).toBe(0);

      controller.scrollToIndex(5_000, 'center');
      expect(viewport.scrollTop).toBe(99_910);

      controller.scrollToIndex(9_999, 'end');
      expect(viewport.scrollTop).toBe(199_800);
    });

    it('updates its bounded window after scrolling and viewport resize', () => {
      const items = Array.from({ length: 1_000 }, (_, index) => index);
      const List = VirtualList<number>();
      const attrs = {
        items,
        height: 200,
        itemHeight: 20,
        overscan: 2,
        getItemKey: (item: number) => item,
        renderItem: (item: number) => `Row ${item}`,
      };

      m.mount(container, { view: () => m(List, attrs) });
      const viewport = container.querySelector<HTMLElement>('.mm-virtual-list')!;
      viewport.scrollTop = 1_000;
      viewport.dispatchEvent(new Event('scroll'));
      m.redraw.sync();

      expect(
        Array.from(container.querySelectorAll('[data-virtual-index]')).map(
          (item) => Number((item as HTMLElement).dataset.virtualIndex)
        )
      ).toEqual(Array.from({ length: 14 }, (_, index) => index + 48));

      attrs.height = 100;
      m.redraw.sync();

      expect(container.querySelectorAll('[data-virtual-index]')).toHaveLength(9);
    });

    it('moves focus to the viewport before a focused item is removed', () => {
      const items = Array.from({ length: 100 }, (_, index) => index);
      const List = VirtualList<number>();

      m.mount(container, {
        view: () =>
          m(List, {
            items,
            height: 100,
            itemHeight: 20,
            getItemKey: (item) => item,
            renderItem: (item) => m('button', `Row ${item}`),
            'aria-label': 'Focusable results',
          }),
      });
      const viewport = container.querySelector<HTMLElement>('.mm-virtual-list')!;
      const firstButton = container.querySelector<HTMLButtonElement>('button')!;
      firstButton.focus();

      viewport.scrollTop = 1_000;
      viewport.dispatchEvent(new Event('scroll'));

      expect(document.activeElement).toBe(viewport);
    });

    it('preserves stable item identity as the window moves', () => {
      const items = Array.from({ length: 20 }, (_, index) => index);
      const List = VirtualList<number>();

      m.mount(container, {
        view: () =>
          m(List, {
            items,
            height: 60,
            itemHeight: 20,
            overscan: 1,
            getItemKey: (item) => item,
            renderItem: (item) => `Row ${item}`,
          }),
      });
      const viewport = container.querySelector<HTMLElement>('.mm-virtual-list')!;
      const originalItem = container.querySelector('[data-virtual-index="2"]');

      viewport.scrollTop = 60;
      viewport.dispatchEvent(new Event('scroll'));
      m.redraw.sync();

      expect(container.querySelector('[data-virtual-index="2"]')).toBe(originalItem);
    });
  });
});
