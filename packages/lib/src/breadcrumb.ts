import m, { FactoryComponent, Attributes } from 'mithril';

export interface BreadcrumbItemAttrs {
  /** Text content of the breadcrumb item */
  text?: string;
  /** URL for the breadcrumb item */
  href?: string;
  /** Whether this item is the current/active item */
  active?: boolean;
  /** Click handler for the breadcrumb item */
  onclick?: (e: Event) => void;
  /** Icon name (material icons) */
  icon?: string;
  /** Custom class for the item */
  className?: string;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface BreadcrumbAttrs extends Attributes {
  /** Array of breadcrumb items */
  items: BreadcrumbItemAttrs[];
  /** Custom separator between items */
  separator?: string;
  /** Custom class for the breadcrumb container */
  className?: string;
  /** Whether to show icons */
  showIcons?: boolean;
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
  /** Whether to show home icon for first item */
  showHome?: boolean;
}

/**
 * Breadcrumb Component
 * Displays a navigation path showing the user's location within a site hierarchy
 */
export const Breadcrumb: FactoryComponent<BreadcrumbAttrs> = () => {
  return {
    view: ({ attrs }) => {
      const {
        items = [],
        separator = 'chevron_right',
        className = '',
        showIcons = false,
        maxItems,
        showHome = false
      } = attrs;
      
      if (items.length === 0) {
        return null;
      }
      
      let displayItems = [...items];
      
      // Handle max items with ellipsis
      if (maxItems && items.length > maxItems) {
        const firstItem = items[0];
        const lastItems = items.slice(-(maxItems - 2));
        
        displayItems = [
          firstItem,
          { text: '...', disabled: true, className: 'breadcrumb-ellipsis' },
          ...lastItems
        ];
      }
      
      return m('nav.breadcrumb', { class: className }, [
        m('ol.breadcrumb-list', 
          displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;
            
            return [
              // Breadcrumb item
              m('li.breadcrumb-item', {
                class: [
                  item.active || isLast ? 'active' : '',
                  item.disabled ? 'disabled' : '',
                  item.className || ''
                ].filter(Boolean).join(' ')
              }, [
                item.href && !item.disabled && !isLast ? 
                  // Link item
                  m('a.breadcrumb-link', {
                    href: item.href,
                    onclick: item.onclick
                  }, [
                    (showIcons && item.icon) && m('i.material-icons.breadcrumb-icon', item.icon),
                    (showHome && isFirst && !item.icon) && m('i.material-icons.breadcrumb-icon', 'home'),
                    m('span.breadcrumb-text', item.text)
                  ]) :
                  // Text item (active or disabled)
                  m('span.breadcrumb-text', {
                    onclick: item.disabled ? undefined : item.onclick
                  }, [
                    (showIcons && item.icon) && m('i.material-icons.breadcrumb-icon', item.icon),
                    (showHome && isFirst && !item.icon) && m('i.material-icons.breadcrumb-icon', 'home'),
                    item.text
                  ])
              ]),
              
              // Separator (except for last item)
              !isLast && m('li.breadcrumb-separator', [
                m('i.material-icons', separator)
              ])
            ];
          }).reduce((acc, val) => acc.concat(val), [])
        )
      ]);
    }
  };
};

/**
 * Simple Breadcrumb utility for common use cases
 */
export const createBreadcrumb = (path: string, basePath = '/'): BreadcrumbItemAttrs[] => {
  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItemAttrs[] = [];
  
  // Add home item
  items.push({
    text: 'Home',
    href: basePath,
    icon: 'home'
  });
  
  // Add path segments
  let currentPath = basePath;
  segments.forEach((segment, index) => {
    currentPath += (currentPath.endsWith('/') ? '' : '/') + segment;
    const isLast = index === segments.length - 1;
    
    items.push({
      text: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: isLast ? undefined : currentPath,
      active: isLast
    });
  });
  
  return items;
};

/**
 * Breadcrumb utilities
 */
export class BreadcrumbManager {
  /**
   * Create breadcrumb items from a route path
   */
  static fromRoute(route: string, routeConfig: Record<string, string> = {}): BreadcrumbItemAttrs[] {
    const segments = route.split('/').filter(Boolean);
    const items: BreadcrumbItemAttrs[] = [];
    
    // Add home
    items.push({
      text: 'Home',
      href: '/',
      icon: 'home'
    });
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      const isLast = index === segments.length - 1;
      
      // Use custom text from config or format segment
      const text = routeConfig[currentPath] || 
                   segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      items.push({
        text,
        href: isLast ? undefined : currentPath,
        active: isLast
      });
    });
    
    return items;
  }
  
  /**
   * Create breadcrumb items from a hierarchical object
   */
  static fromHierarchy(hierarchy: any[], textKey = 'name', pathKey = 'path'): BreadcrumbItemAttrs[] {
    return hierarchy.map((item, index) => ({
      text: item[textKey],
      href: index === hierarchy.length - 1 ? undefined : item[pathKey],
      active: index === hierarchy.length - 1
    }));
  }
}