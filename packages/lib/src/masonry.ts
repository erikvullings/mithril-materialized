import m, { FactoryComponent, Attributes, Vnode } from 'mithril';

export interface MasonryBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface MasonryAttrs extends Attributes {
  columns?: number | MasonryBreakpoints;
  spacing?: number | string;
  className?: string;
  onItemClick?: (index: number, event: Event) => void;
  cssOnly?: boolean;
  animationDelay?: number;
}

export const Masonry: FactoryComponent<MasonryAttrs> = () => {
  let containerRef: HTMLElement | null = null;
  const itemHeights: number[] = []; // measured heights
  let resizeObserver: ResizeObserver | null = null;

  const defaultBreakpoints = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

  const getColumnsCount = (columns: number | MasonryBreakpoints = 3): number => {
    if (typeof columns === 'number') return columns;
    const breakpoints = { ...defaultBreakpoints, ...columns };
    const width = window.innerWidth;
    if (width >= 1200) return breakpoints.xl || 5;
    if (width >= 992) return breakpoints.lg || 4;
    if (width >= 768) return breakpoints.md || 3;
    if (width >= 576) return breakpoints.sm || 2;
    return breakpoints.xs || 1;
  };

  const setupResizeObserver = () => {
    if (resizeObserver) return;
    if (typeof ResizeObserver === 'undefined') return;
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const index = Number(el.dataset.index);
        if (!isNaN(index)) {
          const h = el.offsetHeight;
          if (itemHeights[index] !== h) {
            itemHeights[index] = h;
            m.redraw();
          }
        }
      }
    });
  };

  const cleanup = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  };

  return {
    onremove: cleanup,

    view: ({ attrs, children }: Vnode<MasonryAttrs>) => {
      const { columns = 3, spacing = 16, className = '', onItemClick, cssOnly = false, animationDelay } = attrs;

      const gap = typeof spacing === 'number' ? spacing : parseInt(spacing, 10) || 16;
      const columnsCount = typeof columns === 'number' ? columns : getColumnsCount(columns);

      const containerClasses = [
        'masonry',
        cssOnly ? 'masonry-css' : 'masonry-js',
        animationDelay ? 'masonry-animated' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const containerStyle: Record<string, any> = { position: 'relative' };

      // --- CSS-only fallback ---
      if (cssOnly) {
        containerStyle.display = 'grid';
        containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
        containerStyle.gap = `${gap}px`;
        return m('div', { className: containerClasses, style: containerStyle }, children);
      }

      // --- JS Masonry ---
      const containerWidth = containerRef?.offsetWidth || 800;
      const totalGapWidth = gap * (columnsCount - 1);
      const columnWidth = (containerWidth - totalGapWidth) / columnsCount;

      const columnHeights = new Array(columnsCount).fill(0);
      const positionedChildren: m.Vnode[] = [];

      (Array.isArray(children) ? children : [children]).forEach((child, index) => {
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];

        const itemHeight = itemHeights[index] ?? 200; // fallback until measured
        columnHeights[shortestColumnIndex] += itemHeight + gap;

        const itemStyle: Record<string, any> = {
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          width: `${columnWidth}px`,
          transition: 'all 0.3s ease',
          animationDelay: animationDelay ? `${index * animationDelay}ms` : undefined,
        };

        positionedChildren.push(
          m(
            'div',
            {
              key: `masonry-item-${index}`,
              className: 'masonry-item',
              style: itemStyle,
              'data-index': index,
              onclick: onItemClick ? (e: Event) => onItemClick(index, e) : undefined,
              oncreate: ({ dom }) => {
                const el = dom as HTMLElement;
                setupResizeObserver();
                resizeObserver?.observe(el);
                const h = el.offsetHeight;
                if (itemHeights[index] !== h) {
                  itemHeights[index] = h;
                  m.redraw();
                }
              },
              onremove: ({ dom }) => {
                resizeObserver?.unobserve(dom as HTMLElement);
              },
            },
            child
          )
        );
      });

      containerStyle.height = `${Math.max(...columnHeights) - gap}px`;

      return m(
        'div',
        {
          className: containerClasses,
          style: containerStyle,
          oncreate: ({ dom }) => {
            containerRef = dom as HTMLElement;
          },
        },
        positionedChildren
      );
    },
  };
};
