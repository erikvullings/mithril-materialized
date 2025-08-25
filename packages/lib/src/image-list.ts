import m, { FactoryComponent, Attributes } from 'mithril';

export interface ImageListActionButton {
  /** Material icon name for the action button */
  icon: string;
  /** Click handler for the action button */
  onclick: (item: ImageListItemAttrs, event: Event) => void;
  /** Accessibility label for the button */
  ariaLabel?: string;
  /** Button position */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ImageListItemAttrs {
  /** Image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt?: string;
  /** Title text (appears in tooltip and overlay) */
  title?: string;
  /** Subtitle text for overlay */
  subtitle?: string;
  /** Number of columns this item should span */
  cols?: number;
  /** Number of rows this item should span */
  rows?: number;
  /** Whether this is a featured/highlighted item */
  featured?: boolean;
  /** Click handler for the image item */
  onclick?: (item: ImageListItemAttrs, event: Event) => void;
  /** Action button configuration */
  actionButton?: ImageListActionButton;
  /** Custom CSS class for the item */
  className?: string;
  /** Loading state for the image */
  loading?: 'lazy' | 'eager';
  /** Custom aspect ratio (width/height) */
  aspectRatio?: number;
}

export interface ImageListBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface ImageListAttrs extends Attributes {
  /** Array of image items to display */
  items: ImageListItemAttrs[];
  /** Layout variant */
  variant?: 'standard' | 'quilted' | 'masonry' | 'woven';
  /** Number of columns or responsive configuration */
  cols?: number | ImageListBreakpoints;
  /** Gap between items */
  gap?: number | string;
  /** Row height (auto for dynamic height) */
  rowHeight?: number | 'auto';
  /** Custom CSS class for the container */
  className?: string;
  /** Loading behavior for images */
  loading?: 'lazy' | 'eager';
  /** Whether to show image titles as overlay */
  showTitles?: boolean;
  /** Whether to show action buttons */
  showActions?: boolean;
}

/**
 * ImageList Component
 * Displays a collection of images in various grid layouts
 * Supports standard grid, quilted (varied sizes), masonry, and woven patterns
 */
export const ImageList: FactoryComponent<ImageListAttrs> = () => {
  const defaultBreakpoints = {
    xs: 1,
    sm: 2, 
    md: 3,
    lg: 4,
    xl: 5
  };

  const getColumnsCount = (cols: number | ImageListBreakpoints = 3): number => {
    if (typeof cols === 'number') return cols;
    
    const breakpoints = { ...defaultBreakpoints, ...cols };
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    
    if (width >= 1200) return breakpoints.xl || 5;
    if (width >= 992) return breakpoints.lg || 4;
    if (width >= 768) return breakpoints.md || 3;
    if (width >= 576) return breakpoints.sm || 2;
    return breakpoints.xs || 1;
  };

  const handleImageLoad = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.classList.add('loaded');
  };

  const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.classList.add('error');
    // Could set a placeholder image here
    img.alt = 'Failed to load image';
  };

  const renderImage = (item: ImageListItemAttrs, index: number, options: ImageListAttrs) => {
    const {
      src,
      alt = '',
      title,
      subtitle,
      onclick,
      actionButton,
      className = '',
      loading = options.loading || 'lazy',
      aspectRatio,
      cols = 1,
      rows = 1,
      featured = false
    } = item;

    const itemClasses = [
      'image-list-item',
      featured ? 'image-list-item-featured' : '',
      onclick ? 'image-list-item-clickable' : '',
      className
    ].filter(Boolean).join(' ');

    const itemStyle: Record<string, any> = {};
    
    // Quilted layout with fixed alternating pattern
    if (options.variant === 'quilted') {
      if (featured || index % 7 === 0) {
        itemStyle.gridColumnEnd = 'span 2';
        itemStyle.gridRowEnd = 'span 2';
      } else if (index % 3 === 0) {
        itemStyle.gridColumnEnd = 'span 2';
        itemStyle.gridRowEnd = 'span 1';
      } else {
        itemStyle.gridColumnEnd = 'span 1';
        itemStyle.gridRowEnd = 'span 1';
      }
    }
    
    // Woven layout with varied sizes based on item properties
    if (options.variant === 'woven') {
      itemStyle.gridColumnEnd = `span ${cols}`;
      itemStyle.gridRowEnd = `span ${rows}`;
    }

    // Masonry layout - prevent break inside items
    if (options.variant === 'masonry') {
      itemStyle.breakInside = 'avoid';
      itemStyle.marginBottom = typeof options.gap === 'number' ? `${options.gap}px` : options.gap || '4px';
      itemStyle.display = 'inline-block';
      itemStyle.width = '100%';
    }

    // Custom aspect ratio
    if (aspectRatio && options.variant !== 'masonry') {
      itemStyle.aspectRatio = aspectRatio.toString();
    }

    const handleItemClick = (e: Event) => {
      if (onclick) {
        e.preventDefault();
        onclick(item, e);
      }
    };

    const handleActionClick = (e: Event) => {
      e.stopPropagation();
      if (actionButton?.onclick) {
        actionButton.onclick(item, e);
      }
    };

    return m(`.${itemClasses}`, {
      key: `image-${index}`,
      style: itemStyle,
      onclick: onclick ? handleItemClick : undefined,
      role: onclick ? 'button' : undefined,
      tabindex: onclick ? 0 : undefined,
    }, [
      m('.image-list-item-img', [
        m('img', {
          src,
          alt,
          loading,
          onload: handleImageLoad,
          onerror: handleImageError,
          draggable: false,
        }),
        
        // Loading placeholder
        m('.image-list-item-placeholder'),
      ]),
      
      // Title overlay
      (options.showTitles && (title || subtitle)) && 
        m('.image-list-item-bar', [
          m('.image-list-item-title-wrap', [
            title && m('.image-list-item-title', title),
            subtitle && m('.image-list-item-subtitle', subtitle)
          ])
        ]),
      
      // Action button
      (options.showActions && actionButton) &&
        m('button.image-list-item-action', {
          class: `image-list-action-${actionButton.position || 'top-right'}`,
          onclick: handleActionClick,
          'aria-label': actionButton.ariaLabel || `Action for ${title || alt}`,
        }, [
          m('i.material-icons', actionButton.icon)
        ])
    ]);
  };

  return {
    view: ({ attrs }) => {
      const {
        items = [],
        variant = 'standard',
        cols = 3,
        gap = 4,
        rowHeight = 'auto',
        className = '',
        showTitles = false,
        showActions = false
      } = attrs;

      const columnsCount = getColumnsCount(cols);
      const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
      
      const containerClasses = [
        'image-list',
        `image-list-${variant}`,
        showTitles ? 'image-list-with-titles' : '',
        showActions ? 'image-list-with-actions' : '',
        className
      ].filter(Boolean).join(' ');

      const containerStyle: Record<string, any> = {
        gap: gapValue
      };

      // Set up grid based on variant
      switch (variant) {
        case 'standard':
          containerStyle.display = 'grid';
          containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
          if (rowHeight !== 'auto') {
            containerStyle.gridAutoRows = typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight;
          }
          break;
          
        case 'quilted':
          // Fixed pattern like woven
          containerStyle.display = 'grid';
          containerStyle.gridTemplateColumns = `repeat(${Math.max(columnsCount * 2, 4)}, 1fr)`;
          containerStyle.gridAutoRows = typeof rowHeight === 'number' ? `${rowHeight}px` : '150px';
          containerStyle.gridAutoFlow = 'dense';
          break;
          
        case 'masonry':
          // Use CSS columns for masonry effect  
          containerStyle.display = 'block';
          containerStyle.columnCount = columnsCount;
          containerStyle.columnGap = gapValue;
          containerStyle.columnFill = 'balance';
          containerStyle.orphans = 1;
          containerStyle.widows = 1;
          break;
          
        case 'woven':
          // Varied sizes based on item cols/rows
          containerStyle.display = 'grid';
          containerStyle.gridTemplateColumns = `repeat(${columnsCount}, 1fr)`;
          containerStyle.gridAutoRows = typeof rowHeight === 'number' ? `${rowHeight}px` : '200px';
          containerStyle.gridAutoFlow = 'dense';
          break;
      }

      return m(`.${containerClasses}`, {
        style: containerStyle
      }, [
        items.map((item, index) => renderImage(item, index, attrs))
      ]);
    }
  };
};