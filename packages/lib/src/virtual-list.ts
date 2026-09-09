import m, { type Attributes, type FactoryComponent } from 'mithril';

export interface VirtualRangeInput {
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
  scrollTop: number;
  overscan?: number;
}

export interface VirtualRange {
  startIndex: number;
  endIndex: number;
  offsetTop: number;
  totalHeight: number;
}

export type VirtualScrollAlignment = 'auto' | 'start' | 'center' | 'end';

export interface VirtualListController {
  scrollToIndex: (index: number, alignment?: VirtualScrollAlignment) => void;
}

type VirtualScrollRequest = (
  index: number,
  alignment: VirtualScrollAlignment
) => void;

const controllerListeners = new WeakMap<
  VirtualListController,
  Set<VirtualScrollRequest>
>();

export const createVirtualListController = (): VirtualListController => {
  const controller: VirtualListController = {
    scrollToIndex: (index, alignment = 'auto') => {
      controllerListeners
        .get(controller)
        ?.forEach((listener) => listener(index, alignment));
    },
  };
  controllerListeners.set(controller, new Set());
  return controller;
};

const subscribeToController = (
  controller: VirtualListController,
  listener: VirtualScrollRequest
) => {
  let listeners = controllerListeners.get(controller);
  if (!listeners) {
    listeners = new Set();
    controllerListeners.set(controller, listeners);
  }
  listeners.add(listener);
  return () => listeners?.delete(listener);
};

const getScrollTopForIndex = ({
  index,
  itemCount,
  itemHeight,
  viewportHeight,
  currentScrollTop,
  alignment,
}: {
  index: number;
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
  currentScrollTop: number;
  alignment: VirtualScrollAlignment;
}) => {
  if (itemCount <= 0) return 0;
  const boundedIndex = Math.min(
    Math.max(0, Math.floor(index)),
    itemCount - 1
  );
  const itemTop = boundedIndex * itemHeight;
  const itemBottom = itemTop + itemHeight;
  const maximumScrollTop = Math.max(
    0,
    itemCount * itemHeight - viewportHeight
  );
  let nextScrollTop = currentScrollTop;

  if (alignment === 'start') nextScrollTop = itemTop;
  else if (alignment === 'center') {
    nextScrollTop = itemTop + itemHeight / 2 - viewportHeight / 2;
  } else if (alignment === 'end') nextScrollTop = itemBottom - viewportHeight;
  else if (itemTop < currentScrollTop) nextScrollTop = itemTop;
  else if (itemBottom > currentScrollTop + viewportHeight) {
    nextScrollTop = itemBottom - viewportHeight;
  }

  return Math.min(Math.max(0, nextScrollTop), maximumScrollTop);
};

export const calculateVirtualRange = ({
  itemCount,
  itemHeight,
  viewportHeight,
  scrollTop,
  overscan = 1,
}: VirtualRangeInput): VirtualRange => {
  const count = Math.max(0, Math.floor(itemCount));
  const height = Math.max(1, itemHeight);
  const viewport = Math.max(0, viewportHeight);
  const extraItems = Math.max(0, Math.floor(overscan));
  const totalHeight = count * height;
  if (count === 0) {
    return { startIndex: 0, endIndex: -1, offsetTop: 0, totalHeight };
  }

  const maximumScrollTop = Math.max(0, totalHeight - viewport);
  const boundedScrollTop = Math.min(
    Math.max(0, scrollTop),
    maximumScrollTop
  );
  const firstVisible = Math.floor(boundedScrollTop / height);
  const lastVisible = Math.min(
    count - 1,
    Math.max(firstVisible, Math.ceil((boundedScrollTop + viewport) / height) - 1)
  );
  const startIndex = Math.max(0, firstVisible - extraItems);
  const endIndex = Math.min(count - 1, lastVisible + extraItems);

  return {
    startIndex,
    endIndex,
    offsetTop: startIndex * height,
    totalHeight,
  };
};

export interface VirtualListAttrs<T> extends Attributes {
  items: readonly T[];
  height: number;
  itemHeight: number;
  overscan?: number;
  getItemKey: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => m.Children;
  /** Accessible role for each rendered item. @default 'listitem' */
  itemRole?: string;
  controller?: VirtualListController;
}

/**
 * Fixed-height virtualized list for large synchronous item collections.
 * If scrolling removes the item containing focus, focus moves to the list
 * viewport so keyboard users retain a stable place in the interface.
 */
export const VirtualList = <T>(): FactoryComponent<VirtualListAttrs<T>> => () => {
  let scrollTop = 0;
  let viewport: HTMLElement | undefined;
  let currentAttrs: VirtualListAttrs<T>;
  let currentController: VirtualListController | undefined;
  let unsubscribeController: (() => void) | undefined;

  const syncController = (controller: VirtualListController | undefined) => {
    if (controller === currentController) return;
    unsubscribeController?.();
    currentController = controller;
    unsubscribeController = controller
      ? subscribeToController(controller, (index, alignment) => {
          const nextScrollTop = getScrollTopForIndex({
            index,
            itemCount: currentAttrs.items.length,
            itemHeight: currentAttrs.itemHeight,
            viewportHeight: currentAttrs.height,
            currentScrollTop: scrollTop,
            alignment,
          });
          scrollTop = nextScrollTop;
          if (viewport) viewport.scrollTop = nextScrollTop;
          m.redraw();
        })
      : undefined;
  };

  return {
    onremove: () => {
      unsubscribeController?.();
      unsubscribeController = undefined;
      currentController = undefined;
      viewport = undefined;
    },

    view: ({ attrs }) => {
      currentAttrs = attrs;
      const {
        items,
        height,
        itemHeight,
        overscan = 1,
        getItemKey,
        renderItem,
        itemRole = 'listitem',
        controller,
        className,
        style,
        role = 'list',
        ...htmlAttrs
      } = attrs;
      syncController(controller);
      const range = calculateVirtualRange({
        itemCount: items.length,
        itemHeight,
        viewportHeight: height,
        scrollTop,
        overscan,
      });
      const renderedItems =
        range.endIndex < range.startIndex
          ? []
          : items
              .slice(range.startIndex, range.endIndex + 1)
              .map((item, offset) => {
                const index = range.startIndex + offset;
                return m(
                  '.mm-virtual-list-item',
                  {
                    key: getItemKey(item, index),
                    role: itemRole,
                    'aria-posinset': index + 1,
                    'aria-setsize': items.length,
                    'data-virtual-index': index,
                    style: {
                      position: 'absolute',
                      insetInline: 0,
                      top: `${index * itemHeight}px`,
                      height: `${itemHeight}px`,
                    },
                  },
                  renderItem(item, index)
                );
              });
      const viewportStyle =
        typeof style === 'string'
          ? `${style};height:${height}px;overflow-y:auto;`
          : { ...style, height: `${height}px`, overflowY: 'auto' };

      return m(
        '.mm-virtual-list',
        {
          ...htmlAttrs,
          role,
          tabindex: attrs.tabindex ?? 0,
          className,
          style: viewportStyle,
          oncreate: ({ dom }) => {
            viewport = dom as HTMLElement;
          },
          onupdate: ({ dom }) => {
            viewport = dom as HTMLElement;
          },
          onscroll: (event: Event) => {
            const element = event.currentTarget as HTMLElement;
            scrollTop = element.scrollTop;
            const focusedItem = (
              document.activeElement as HTMLElement | null
            )?.closest<HTMLElement>('[data-virtual-index]');
            if (focusedItem && element.contains(focusedItem)) {
              const focusedIndex = Number(focusedItem.dataset.virtualIndex);
              const nextRange = calculateVirtualRange({
                itemCount: items.length,
                itemHeight,
                viewportHeight: height,
                scrollTop,
                overscan,
              });
              if (
                focusedIndex < nextRange.startIndex ||
                focusedIndex > nextRange.endIndex
              ) {
                element.focus();
              }
            }
          },
        },
        m(
          '.mm-virtual-list-spacer',
          {
            style: {
              position: 'relative',
              height: `${range.totalHeight}px`,
            },
          },
          renderedItems
        )
      );
    },
  };
};
