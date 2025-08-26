import m, { FactoryComponent, Attributes } from 'mithril';

export interface TimelineItemAttrs {
  /** Unique identifier for the timeline item */
  id?: string;
  /** Main label/title for the timeline item */
  label?: string;
  /** Optional description text */
  description?: string;
  /** Timestamp for the item (string or Date object) */
  timestamp?: string | Date;
  /** Custom content to render instead of label/description */
  content?: m.Children;
  /** Material icon name for the timeline dot */
  icon?: string;
  /** Color theme for the timeline item */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Click handler for the timeline item */
  onclick?: (item: TimelineItemAttrs, event: Event) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom CSS class for the item */
  className?: string;
}

export interface TimelineAttrs extends Attributes {
  /** Array of timeline items to display */
  items: TimelineItemAttrs[];
  /** Position of content relative to the timeline line (vertical only) */
  position?: 'left' | 'right' | 'alternate';
  /** Whether to show the connecting line between items */
  showConnector?: boolean;
  /** Custom CSS class for the timeline container */
  className?: string;
  /** Whether to show timestamps */
  showTimestamps?: boolean;
  /** Compact mode with reduced spacing */
  compact?: boolean;
}

/**
 * Timeline Component
 * Displays a sequence of events in chronological order with connecting lines
 * Supports both vertical and horizontal orientations with Material Design styling
 */
export const Timeline: FactoryComponent<TimelineAttrs> = () => {
  const formatTimestamp = (timestamp?: string | Date): string => {
    if (!timestamp) return '';
    if (typeof timestamp === 'string') return timestamp;
    return timestamp.toLocaleDateString();
  };

  const getColorClass = (color?: string): string => {
    switch (color) {
      case 'primary':
        return 'timeline-primary';
      case 'secondary':
        return 'timeline-secondary';
      case 'success':
        return 'timeline-success';
      case 'warning':
        return 'timeline-warning';
      case 'error':
        return 'timeline-error';
      case 'info':
        return 'timeline-info';
      default:
        return 'timeline-default';
    }
  };

  return {
    view: ({ attrs }) => {
      const {
        items = [],
        orientation = 'vertical',
        position = 'right',
        showConnector = true,
        className = '',
        showTimestamps = true,
        compact = false,
      } = attrs;

      const timelineClasses =
        [
          'timeline',
          `timeline-${orientation}`,
          `timeline-${position}`,
          showConnector ? 'timeline-connector' : '',
          compact ? 'timeline-compact' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ') || undefined;

      return m('div', { className: timelineClasses }, [
        items.map((item, index) => {
          const isAlternate = position === 'alternate';
          const itemPosition = isAlternate ? (index % 2 === 0 ? 'right' : 'left') : position;

          const itemClasses =
            [
              'timeline-item',
              `timeline-item-${itemPosition}`,
              getColorClass(item.color),
              item.disabled ? 'timeline-item-disabled' : '',
              item.className || '',
            ]
              .filter(Boolean)
              .join(' ') || undefined;

          const handleItemClick = (e: Event) => {
            if (item.disabled) return;
            if (item.onclick) {
              e.preventDefault();
              item.onclick(item, e);
            }
          };

          const isVertical = orientation === 'vertical';

          return m(
            'div',
            {
              key: item.id || index,
              className: itemClasses,
              onclick: item.onclick ? handleItemClick : undefined,
              role: item.onclick ? 'button' : undefined,
              tabindex: item.onclick && !item.disabled ? 0 : undefined,
              'aria-disabled': item.disabled ? 'true' : undefined,
            },
            [
              // Timestamp (on opposite side of content from bullet)
              isVertical &&
                showTimestamps &&
                item.timestamp &&
                m(
                  `.timeline-timestamp-separate${!item.icon ? '.timeline-dot-small' : ''}`,
                  formatTimestamp(item.timestamp)
                ),

              // Timeline separator containing dot and connector
              m('.timeline-separator', [
                // Timeline dot/icon
                m(`.timeline-dot${!item.icon ? '.timeline-dot-small' : ''}`, [
                  item.icon ? m('i.material-icons.timeline-icon', item.icon) : m('.timeline-marker'),
                ]),

                // Timeline connector (only show if not the last item and connectors are enabled)
                showConnector && index < items.length - 1 && m('.timeline-connector'),
              ]),

              // Content container
              m('.timeline-content', [
                // Timestamp for horizontal layout or when not shown separately
                !isVertical &&
                  showTimestamps &&
                  item.timestamp &&
                  m('.timeline-timestamp', formatTimestamp(item.timestamp)),

                // Main content
                item.content
                  ? item.content
                  : m('.timeline-text', [
                      item.label && m('.timeline-label', item.label),
                      item.description && m('.timeline-description', item.description),
                    ]),
              ]),
            ]
          );
        }),
      ]);
    },
  };
};
