import m, { FactoryComponent, Attributes } from 'mithril';

export interface MasonryBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface MasonryAttrs extends Attributes {
  /** Array of vnodes to render in masonry layout */
  children: m.Children[];
  /** Number of columns or responsive breakpoint configuration */
  columns?: number | MasonryBreakpoints;
  /** Spacing between items in pixels */
  spacing?: number | string;
  /** Default height for items during SSR/initial load */
  defaultHeight?: number;
  /** Custom CSS class for the masonry container */
  className?: string;
  /** Click handler for masonry items */
  onItemClick?: (index: number, event: Event) => void;
  /** Whether to use CSS-only masonry (fallback) */
  cssOnly?: boolean;
  /** Sequential loading animation delay per item (ms) */
  animationDelay?: number;
}

/**
 * Masonry Component
 * Creates a Pinterest-style layout where items are arranged in columns
 * with optimal positioning to minimize gaps
 */
export const Masonry: FactoryComponent<MasonryAttrs> = () => {
  let containerRef: HTMLElement | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let itemElements: HTMLElement[] = [];
  let windowResizeHandler: ((event: Event) => void) | null = null;
  let isLayoutInProgress = false;

  const defaultBreakpoints = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  };

  const getColumnsCount = (columns: number | MasonryBreakpoints = 3): number => {
    if (typeof columns === 'number') {
      return columns;
    }

    const breakpoints = { ...defaultBreakpoints, ...columns };
    const width = window.innerWidth;

    if (width >= 1200) return breakpoints.xl || 5;
    if (width >= 992) return breakpoints.lg || 4;
    if (width >= 768) return breakpoints.md || 3;
    if (width >= 576) return breakpoints.sm || 2;
    return breakpoints.xs || 1;
  };

  // const calculateLayout = (options: MasonryAttrs) => {
  //   if (!containerRef || options.cssOnly || isLayoutInProgress) return;

  //   isLayoutInProgress = true;

  //   const { columns = 3, spacing = 16, defaultHeight = 200 } = options;

  //   const columnsCount = getColumnsCount(columns);
  //   console.log({ columnsCount });
  //   const gap = typeof spacing === 'number' ? spacing : parseInt(spacing, 10) || 16;

  //   // Get all item elements
  //   itemElements = Array.from(containerRef.children) as HTMLElement[];

  //   if (itemElements.length === 0) {
  //     isLayoutInProgress = false;
  //     return;
  //   }

  //   // Calculate column width
  //   const containerWidth = containerRef.offsetWidth;
  //   if (containerWidth === 0) {
  //     isLayoutInProgress = false;
  //     return;
  //   }

  //   const totalGapWidth = gap * (columnsCount - 1);
  //   const columnWidth = (containerWidth - totalGapWidth) / columnsCount;

  //   // Initialize column heights
  //   const columnHeights = new Array(columnsCount).fill(0);

  //   // Position each item
  //   itemElements.forEach((item, index) => {
  //     // Find the shortest column
  //     const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

  //     // Calculate position
  //     const x = shortestColumnIndex * (columnWidth + gap);
  //     const y = columnHeights[shortestColumnIndex];

  //     // Apply positioning
  //     item.style.position = 'absolute';
  //     item.style.left = `${x}px`;
  //     item.style.top = `${y}px`;
  //     item.style.width = `${columnWidth}px`;

  //     // Get item height (use default if not loaded/visible)
  //     const itemHeight = item.offsetHeight || defaultHeight;

  //     // Update column height
  //     columnHeights[shortestColumnIndex] += itemHeight + gap;

  //     // Add animation delay if specified
  //     if (options.animationDelay) {
  //       item.style.animationDelay = `${index * options.animationDelay}ms`;
  //     }
  //   });

  //   // Set container height
  //   const maxHeight = Math.max(...columnHeights) - gap;
  //   containerRef.style.height = `${maxHeight}px`;

  //   isLayoutInProgress = false;
  // };

  // const setupResizeObserver = (options: MasonryAttrs) => {
  //   if (typeof ResizeObserver === 'undefined' || options.cssOnly) return;

  //   let resizeTimer: number | null = null;

  //   resizeObserver = new ResizeObserver(() => {
  //     // Debounce the layout calculation to prevent ResizeObserver loop
  //     if (resizeTimer) {
  //       cancelAnimationFrame(resizeTimer);
  //     }

  //     resizeTimer = requestAnimationFrame(() => {
  //       calculateLayout(options);
  //       resizeTimer = null;
  //     });
  //   });

  //   if (containerRef) {
  //     resizeObserver.observe(containerRef);

  //     // Observe each item for height changes after initial layout
  //     requestAnimationFrame(() => {
  //       itemElements.forEach((item) => {
  //         if (resizeObserver) {
  //           resizeObserver.observe(item);
  //         }
  //       });
  //     });
  //   }
  // };

  const cleanup = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    if (windowResizeHandler) {
      window.removeEventListener('resize', windowResizeHandler);
      windowResizeHandler = null;
    }
  };

  let previousAttrs: MasonryAttrs | null = null;
  let currentAttrs: MasonryAttrs | null = null;

  return {
    oncreate: ({ dom, attrs: options }) => {
      containerRef = dom as HTMLElement;
      // previousAttrs = { ...options };
      // currentAttrs = { ...options };

      // // Create window resize handler that uses current attributes
      // windowResizeHandler = () => {
      //   if (currentAttrs) {
      //     calculateLayout(currentAttrs);
      //   }
      // };

      // // Wait for next frame to ensure DOM is ready
      // requestAnimationFrame(() => {
      //   calculateLayout(options);
      //   setupResizeObserver(options);
      // });

      // // Recalculate on window resize
      // window.addEventListener('resize', windowResizeHandler);
      m.redraw();
    },

    // onupdate: ({ attrs: options }) => {
    //   // Update current attributes for window resize handler
    //   currentAttrs = { ...options };

    //   // Only recalculate if relevant attributes changed
    //   if (
    //     previousAttrs &&
    //     (previousAttrs.columns !== options.columns ||
    //       previousAttrs.spacing !== options.spacing ||
    //       previousAttrs.cssOnly !== options.cssOnly ||
    //       previousAttrs.children?.length !== options.children?.length)
    //   ) {
    //     previousAttrs = { ...options };
    //     console.log({ columns: options.columns, spacing: options.spacing, ccsOnly: options.cssOnly });
    //     requestAnimationFrame(() => {
    //       calculateLayout(options);
    //     });
    //   }
    // },

    onremove: () => {
      cleanup();
    },

    view: ({ attrs }) => {
      const {
        children = [],
        columns = 3,
        spacing = 16,
        className = '',
        onItemClick,
        cssOnly = false,
        animationDelay,
        defaultHeight = 200,
      } = attrs;

      const gap = typeof spacing === 'number' ? parseInt(String(spacing), 10) || 16 : 16;
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

      if (cssOnly) {
        containerStyle.display = 'grid';
        containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
        containerStyle.gap = `${gap}px`;
        return m('div', { className: containerClasses, style: containerStyle }, children);
      }

      // --- JS Masonry ---
      const containerWidth = containerRef?.offsetWidth || 800; // fallback
      const totalGapWidth = gap * (columnsCount - 1);
      const columnWidth = (containerWidth - totalGapWidth) / columnsCount;

      const columnHeights = new Array(columnsCount).fill(0);
      const positionedChildren: m.Vnode[] = [];

      (Array.isArray(children) ? children : [children]).forEach((child, index) => {
        // find the shortest column so far
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];

        // we only know real heights after render, so use fallback for now
        const itemHeight = defaultHeight;
        columnHeights[shortestColumnIndex] += itemHeight + gap;

        const itemStyle: Record<string, any> = {
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          width: `${columnWidth}px`,
          transition: 'all 0.3s ease',
          marginBottom: `${gap}px`,
          animationDelay: animationDelay ? `${index * animationDelay}ms` : undefined,
        };

        positionedChildren.push(
          m(
            'div',
            {
              key: `masonry-item-${index}`,
              className: 'masonry-item',
              onclick: onItemClick ? (e: Event) => onItemClick(index, e) : undefined,
              style: itemStyle,
            },
            child
          )
        );
      });

      // set container height to tallest column
      containerStyle.height = `${Math.max(...columnHeights) - gap}px`;

      return m('div', { className: containerClasses, style: containerStyle }, positionedChildren);
    },

    // view: ({ attrs }) => {
    //   const {
    //     children = [],
    //     columns = 3,
    //     spacing = 16,
    //     className = '',
    //     onItemClick,
    //     cssOnly = false,
    //     animationDelay,
    //     defaultHeight = 200,
    //   } = attrs;

    //   const gap = typeof spacing === 'number' ? spacing : parseInt(spacing, 10) || 16;
    //   const columnsCount = typeof columns === 'number' ? columns : getColumnsCount(columns);

    //   const containerClasses = [
    //     'masonry',
    //     cssOnly ? 'masonry-css' : 'masonry-js',
    //     animationDelay ? 'masonry-animated' : '',
    //     className,
    //   ]
    //     .filter(Boolean)
    //     .join(' ');

    //   const containerStyle: Record<string, any> = { position: 'relative' };

    //   // CSS-only mode: just use CSS Grid
    //   if (cssOnly) {
    //     containerStyle.display = 'grid';
    //     containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
    //     containerStyle.gap = `${gap}px`;
    //   }

    //   // ---- JS-based layout calculation ----
    //   let columnHeights = new Array(columnsCount).fill(0);
    //   const positionedChildren: m.Vnode[] = [];

    //   if (!cssOnly && Array.isArray(children)) {
    //     const containerWidth = containerRef?.offsetWidth || 800; // fallback
    //     const totalGapWidth = gap * (columnsCount - 1);
    //     const columnWidth = (containerWidth - totalGapWidth) / columnsCount;
    //     console.log({ containerWidth, totalGapWidth, columnWidth });
    //     children.forEach((child, index) => {
    //       const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    //       const x = shortestColumnIndex * (columnWidth + gap);
    //       const y = columnHeights[shortestColumnIndex];

    //       const itemHeight = defaultHeight; // can be improved with measurement
    //       columnHeights[shortestColumnIndex] += itemHeight + gap;

    //       const itemStyle: Record<string, any> = {
    //         position: 'absolute',
    //         left: `${x}px`,
    //         top: `${y}px`,
    //         width: `${columnWidth}px`,
    //         transition: 'all 0.3s ease',
    //         animationDelay: animationDelay ? `${index * animationDelay}ms` : undefined,
    //       };

    //       positionedChildren.push(
    //         m(
    //           'div',
    //           {
    //             key: `masonry-item-${index}`,
    //             className: 'masonry-item',
    //             onclick: onItemClick ? (e: Event) => onItemClick(index, e) : undefined,
    //             style: itemStyle,
    //           },
    //           child
    //         )
    //       );
    //     });

    //     // set container height
    //     containerStyle.height = `${Math.max(...columnHeights) - gap}px`;
    //   }

    //   return m('div', { className: containerClasses, style: containerStyle }, cssOnly ? children : positionedChildren);
    // },

    // view: ({ attrs }) => {
    //   const {
    //     children = [],
    //     columns = 3,
    //     spacing = 16,
    //     className = '',
    //     onItemClick,
    //     cssOnly = false,
    //     animationDelay,
    //   } = attrs;

    //   const gap = typeof spacing === 'number' ? `${spacing}px` : spacing;
    //   const columnsCount = typeof columns === 'number' ? columns : getColumnsCount(columns);

    //   const containerClasses = [
    //     'masonry',
    //     cssOnly ? 'masonry-css' : 'masonry-js',
    //     animationDelay ? 'masonry-animated' : '',
    //     className,
    //   ]
    //     .filter(Boolean)
    //     .join(' ');

    //   const containerStyle: Record<string, any> = {
    //     position: 'relative',
    //   };

    //   // CSS-only fallback using CSS Grid
    //   if (cssOnly) {
    //     containerStyle.display = 'grid';
    //     containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
    //     containerStyle.gap = gap;
    //     containerStyle.gridAutoRows = 'masonry'; // Future CSS feature
    //   }

    //   console.log({ cssOnly, columnsCount });
    //   return m(
    //     'div',
    //     {
    //       className: containerClasses,
    //       style: containerStyle,
    //     },
    //     [
    //       Array.isArray(children)
    //         ? children.map((child, index) => {
    //             const itemClasses = ['masonry-item', animationDelay ? 'masonry-item-animated' : '']
    //               .filter(Boolean)
    //               .join(' ');

    //             return m(
    //               'div',
    //               {
    //                 key: `masonry-item-${index}`,
    //                 onclick: onItemClick ? (e: Event) => onItemClick(index, e) : undefined,
    //                 className: itemClasses,
    //                 style: cssOnly
    //                   ? undefined
    //                   : {
    //                       marginBottom: gap,
    //                       transition: 'all 0.3s ease',
    //                     },
    //               },
    //               child
    //             );
    //           })
    //         : [children],
    //     ]
    //   );
    // },
  };
};
