import m, { type Attributes, type Component, type VnodeDOM } from 'mithril';
import { createDismissibleLayer } from './dismissible-layer';
import { createPortalHandle, type PortalHandle } from './portal';
import { uniqueId } from './utils';

export interface MenuItem<T extends string | number> {
  /** Value passed to `onSelect`. */
  id: T;
  /** Visible and typeahead-searchable item label. */
  label: string;
  /** Optional Material icon name. */
  iconName?: string;
  /** Prevent selection and keyboard focus. */
  disabled?: boolean;
  /** Additional class applied to the menu item button. */
  className?: string;
}

export interface MenuSeparator {
  /** Render a non-interactive separator. */
  separator: true;
}

export type MenuEntry<T extends string | number> = MenuItem<T> | MenuSeparator;
export type MenuCloseReason = 'escape' | 'outside' | 'selection' | 'trigger' | 'programmatic';

export interface MenuTriggerAttrs extends Attributes {
  id: string;
  'aria-controls': string;
  'aria-expanded': 'true' | 'false';
  'aria-haspopup': 'menu';
  onclick?: (event: MouseEvent) => void;
  oncontextmenu?: (event: MouseEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
  oncreate: (vnode: VnodeDOM<Attributes>) => void;
  onupdate: (vnode: VnodeDOM<Attributes>) => void;
}

export interface MenuBaseAttrs<T extends string | number> extends Attributes {
  /** Stable menu id used by the trigger's `aria-controls`. */
  id?: string;
  /** Ordered action items and separators. */
  items: MenuEntry<T>[];
  /** Accessible name for the menu. */
  ariaLabel?: string;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called when an interaction requests an open-state change. */
  onToggle?: (isOpen: boolean) => void;
  /** Called after the menu closes. */
  onClose?: (reason: MenuCloseReason) => void;
  /** Called when an enabled item is activated. */
  onSelect?: (id: T, item: MenuItem<T>) => void;
  /** Keep the menu open after an item is selected. */
  closeOnSelect?: boolean;
  /** Fixed menu width in pixels, clamped to the viewport. */
  width?: number;
  /** Minimum menu width in pixels. */
  minWidth?: number;
  /** Maximum menu height in pixels. */
  maxHeight?: number;
  /** Additional class applied to the portaled menu surface. */
  menuClassName?: string;
}

export interface MenuAttrs<T extends string | number> extends MenuBaseAttrs<T> {
  /** Render the element that opens and anchors the menu. */
  trigger: (attrs: MenuTriggerAttrs) => m.Children;
}

export interface ContextMenuAttrs<T extends string | number> extends MenuBaseAttrs<T> {
  /** Render the element that receives right-click and keyboard context-menu gestures. */
  trigger: (attrs: MenuTriggerAttrs) => m.Children;
}

interface Point {
  x: number;
  y: number;
}

interface MenuState {
  isOpen: boolean;
  activeIndex: number;
  triggerElement: HTMLElement | null;
  menuElement: HTMLElement | null;
  invoker: HTMLElement | null;
  point: Point | null;
}

interface MenuPositionInput {
  anchorRect: Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width'>;
  menuWidth: number;
  menuHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  direction: 'ltr' | 'rtl';
  margin?: number;
}

interface MenuPosition {
  top: number;
  left: number;
  maxHeight: number;
}

interface ActiveMenu {
  owner: symbol;
  close: () => void;
}

let activeMenu: ActiveMenu | undefined;

const getMenuPosition = ({
  anchorRect,
  menuWidth,
  menuHeight,
  viewportWidth,
  viewportHeight,
  direction,
  margin = 8,
}: MenuPositionInput): MenuPosition => {
  const availableBelow = Math.max(0, viewportHeight - anchorRect.bottom - margin);
  const availableAbove = Math.max(0, anchorRect.top - margin);
  const openAbove = menuHeight > availableBelow && availableAbove > availableBelow;
  const maxHeight = Math.max(0, openAbove ? availableAbove : availableBelow);
  const renderedHeight = Math.min(menuHeight, maxHeight);
  const preferredLeft = direction === 'rtl' ? anchorRect.right - menuWidth : anchorRect.left;
  const maxLeft = Math.max(margin, viewportWidth - menuWidth - margin);

  return {
    top: openAbove ? Math.max(margin, anchorRect.top - renderedHeight) : Math.max(margin, anchorRect.bottom),
    left: Math.min(Math.max(margin, preferredLeft), maxLeft),
    maxHeight,
  };
};

const isMenuItem = <T extends string | number>(entry: MenuEntry<T>): entry is MenuItem<T> =>
  !('separator' in entry);

const createMenu = <T extends string | number>(
  contextMenu: boolean
): Component<MenuAttrs<T> | ContextMenuAttrs<T>> => {
  const state: MenuState = {
    isOpen: false,
    activeIndex: -1,
    triggerElement: null,
    menuElement: null,
    invoker: null,
    point: null,
  };
  const owner = Symbol('menu-owner');
  let menuId = `menu-${uniqueId()}`;
  let portal: PortalHandle;
  let currentAttrs: MenuAttrs<T> | ContextMenuAttrs<T>;
  let typeahead = '';
  let typeaheadTimer: number | undefined;

  const enabledIndices = (items: MenuEntry<T>[]) =>
    items.reduce<number[]>((indices, entry, index) => {
      if (isMenuItem(entry) && !entry.disabled) indices.push(index);
      return indices;
    }, []);

  const direction = () =>
    (state.triggerElement ? getComputedStyle(state.triggerElement).direction : document.documentElement.dir) === 'rtl'
      ? 'rtl'
      : 'ltr';

  const anchorRect = () => {
    if (state.point) {
      const x = state.point.x - window.scrollX;
      const y = state.point.y - window.scrollY;
      return { top: y, right: x, bottom: y, left: x, width: 0 };
    }
    return state.triggerElement?.getBoundingClientRect() ?? { top: 8, right: 8, bottom: 8, left: 8, width: 0 };
  };

  const calculatePosition = (attrs: MenuBaseAttrs<T>, menuElement?: HTMLElement | null) => {
    const rect = anchorRect();
    const measuredRect = menuElement?.getBoundingClientRect();
    const viewportWidth = Math.max(0, window.innerWidth - 16);
    const menuWidth = Math.min(
      attrs.width !== undefined
        ? Math.max(0, attrs.width)
        : measuredRect?.width || Math.max(attrs.minWidth ?? 200, rect.width),
      viewportWidth
    );
    const estimatedHeight = Math.min(
      attrs.maxHeight ?? 320,
      attrs.items.reduce((height, entry) => height + (isMenuItem(entry) ? 48 : 9), 16)
    );
    const menuHeight = measuredRect?.height || estimatedHeight;
    return getMenuPosition({
      anchorRect: rect,
      menuWidth,
      menuHeight,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      direction: direction(),
    });
  };

  const applyPosition = (attrs: MenuBaseAttrs<T>) => {
    if (!state.menuElement) return;
    const position = calculatePosition(attrs, state.menuElement);
    Object.assign(state.menuElement.style, {
      top: `${position.top}px`,
      left: `${position.left}px`,
      maxHeight: `${Math.min(attrs.maxHeight ?? position.maxHeight, position.maxHeight)}px`,
    });
  };

  const focusActiveItem = () => {
    if (state.activeIndex < 0) {
      state.menuElement?.focus();
    } else {
      state.menuElement?.querySelector<HTMLElement>(`[data-menu-index="${state.activeIndex}"]`)?.focus();
    }
  };

  const resetTypeahead = () => {
    window.clearTimeout(typeaheadTimer);
    typeahead = '';
  };

  const restoreFocus = () => {
    const invoker = state.invoker;
    state.invoker = null;
    if (invoker?.isConnected) {
      invoker.focus();
    }
  };

  const close = (attrs: MenuBaseAttrs<T>, reason: MenuCloseReason) => {
    if (!state.isOpen) return;
    state.isOpen = false;
    escapeLayer.sync(false);
    state.activeIndex = -1;
    state.point = null;
    resetTypeahead();
    portal.sync(null);
    if (activeMenu?.owner === owner) activeMenu = undefined;
    attrs.onToggle?.(false);
    attrs.onClose?.(reason);
    if (reason === 'outside') state.invoker = null;
    else restoreFocus();
    m.redraw();
  };

  const escapeLayer = createDismissibleLayer(() => {
    if (!state.isOpen || !state.menuElement?.isConnected) return false;
    close(currentAttrs, 'escape');
    return 'dismissed';
  });

  const open = (
    attrs: MenuBaseAttrs<T>,
    invoker: HTMLElement,
    point: Point | null,
    focusLast = false
  ) => {
    if (activeMenu?.owner !== owner) activeMenu?.close();
    const indices = enabledIndices(attrs.items);
    const wasOpen = state.isOpen;
    state.isOpen = true;
    escapeLayer.sync(true);
    state.activeIndex = indices.length === 0 ? -1 : focusLast ? indices[indices.length - 1] : indices[0];
    state.invoker = invoker;
    state.point = point;
    resetTypeahead();
    activeMenu = { owner, close: () => close(currentAttrs, 'outside') };
    if (!wasOpen) attrs.onToggle?.(true);
    syncPortal(attrs);
    m.redraw();
  };

  const moveFocus = (attrs: MenuBaseAttrs<T>, movement: 'next' | 'previous' | 'first' | 'last') => {
    const indices = enabledIndices(attrs.items);
    if (indices.length === 0) return;
    const currentPosition = indices.indexOf(state.activeIndex);
    if (movement === 'first') state.activeIndex = indices[0];
    else if (movement === 'last') state.activeIndex = indices[indices.length - 1];
    else if (movement === 'next') state.activeIndex = indices[(currentPosition + 1 + indices.length) % indices.length];
    else state.activeIndex = indices[(currentPosition - 1 + indices.length) % indices.length];
  };

  const selectItem = (attrs: MenuBaseAttrs<T>, item: MenuItem<T>) => {
    if (item.disabled) return;
    attrs.onSelect?.(item.id, item);
    if (attrs.closeOnSelect !== false) {
      close(attrs, 'selection');
    }
  };

  const findTypeaheadMatch = (attrs: MenuBaseAttrs<T>, key: string) => {
    window.clearTimeout(typeaheadTimer);
    typeahead += key.toLocaleLowerCase();
    typeaheadTimer = window.setTimeout(() => {
      typeahead = '';
    }, 500);

    const query = typeahead.split('').every((character) => character === typeahead[0]) ? typeahead[0] : typeahead;
    const indices = enabledIndices(attrs.items);
    const currentPosition = Math.max(indices.indexOf(state.activeIndex), -1);
    const orderedIndices = [...indices.slice(currentPosition + 1), ...indices.slice(0, currentPosition + 1)];
    const match = orderedIndices.find((index) => {
      const entry = attrs.items[index];
      return isMenuItem(entry) && entry.label.toLocaleLowerCase().startsWith(query);
    });
    if (match !== undefined) state.activeIndex = match;
  };

  const handleMenuKeyDown = (event: KeyboardEvent, attrs: MenuBaseAttrs<T>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(attrs, 'next');
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(attrs, 'previous');
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(attrs, 'first');
        break;
      case 'End':
        event.preventDefault();
        moveFocus(attrs, 'last');
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (state.activeIndex >= 0) {
          const entry = attrs.items[state.activeIndex];
          if (isMenuItem(entry)) selectItem(attrs, entry);
        }
        break;
      default:
        if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          findTypeaheadMatch(attrs, event.key);
        } else {
          return;
        }
    }
    syncPortal(attrs);
    m.redraw();
  };

  const renderMenu = (attrs: MenuBaseAttrs<T>) => {
    const position = calculatePosition(attrs);
    const viewportWidth = Math.max(0, window.innerWidth - 16);
    const fixedWidth =
      attrs.width === undefined ? undefined : Math.min(Math.max(0, attrs.width), viewportWidth);
    return m(
      'ul.mm-menu',
      {
        id: menuId,
        role: 'menu',
        tabindex: -1,
        'aria-label': attrs.ariaLabel ?? 'Actions',
        dir: direction(),
        className: attrs.menuClassName,
        style: {
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: fixedWidth === undefined ? undefined : `${fixedWidth}px`,
          minWidth:
            fixedWidth === undefined
              ? `${Math.min(Math.max(attrs.minWidth ?? 200, anchorRect().width), viewportWidth)}px`
              : undefined,
          maxHeight: `${Math.min(attrs.maxHeight ?? position.maxHeight, position.maxHeight)}px`,
        },
        onkeydown: (event: KeyboardEvent) => handleMenuKeyDown(event, attrs),
        oncreate: ({ dom }) => {
          state.menuElement = dom as HTMLElement;
          applyPosition(attrs);
          focusActiveItem();
        },
        onupdate: ({ dom }) => {
          state.menuElement = dom as HTMLElement;
          applyPosition(attrs);
          focusActiveItem();
        },
        onremove: () => {
          state.menuElement = null;
        },
      },
      attrs.items.map((entry, index) =>
        isMenuItem(entry)
          ? m(
              'li',
              { role: 'none' },
              m(
                'button.mm-menu-item',
                {
                  type: 'button',
                  role: 'menuitem',
                  className: entry.className,
                  disabled: entry.disabled,
                  'aria-disabled': entry.disabled ? 'true' : undefined,
                  tabindex: index === state.activeIndex ? 0 : -1,
                  'data-menu-index': index,
                  onclick: entry.disabled ? undefined : () => selectItem(attrs, entry),
                  onmouseenter: entry.disabled
                    ? undefined
                    : (event: MouseEvent) => {
                        state.activeIndex = index;
                        (event.currentTarget as HTMLElement).focus();
                      },
                },
                [
                  entry.iconName
                    ? m('i.material-icons.mm-menu-item-icon', { 'aria-hidden': 'true' }, entry.iconName)
                    : undefined,
                  m('span', entry.label),
                ]
              )
            )
          : m('li.mm-menu-separator', { role: 'separator' })
      )
    );
  };

  function syncPortal(attrs: MenuBaseAttrs<T>) {
    portal.sync(state.isOpen ? renderMenu(attrs) : null);
  }

  const captureTrigger = (vnode: VnodeDOM<Attributes>) => {
    state.triggerElement = vnode.dom as HTMLElement;
    if (state.isOpen) {
      state.invoker ??= state.triggerElement;
      applyPosition(currentAttrs);
    }
  };

  const triggerAttrs = (attrs: MenuBaseAttrs<T>): MenuTriggerAttrs => {
    const shared = {
      id: `${menuId}-trigger`,
      'aria-controls': menuId,
      'aria-expanded': state.isOpen ? ('true' as const) : ('false' as const),
      'aria-haspopup': 'menu' as const,
      oncreate: captureTrigger,
      onupdate: captureTrigger,
    };

    if (contextMenu) {
      return {
        ...shared,
        oncontextmenu: (event: MouseEvent) => {
          event.preventDefault();
          open(attrs, event.currentTarget as HTMLElement, { x: event.pageX, y: event.pageY });
        },
        onkeydown: (event: KeyboardEvent) => {
          if (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10')) return;
          event.preventDefault();
          open(attrs, event.currentTarget as HTMLElement, null);
        },
      };
    }

    return {
      ...shared,
      onclick: (event: MouseEvent) => {
        event.preventDefault();
        if (state.isOpen) close(attrs, 'trigger');
        else open(attrs, event.currentTarget as HTMLElement, null);
      },
      onkeydown: (event: KeyboardEvent) => {
        if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
        if (
          (event.key === 'Enter' || event.key === ' ') &&
          event.currentTarget instanceof HTMLButtonElement
        ) {
          return;
        }
        event.preventDefault();
        if (!state.isOpen) {
          open(attrs, event.currentTarget as HTMLElement, null, event.key === 'ArrowUp');
        }
      },
    };
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target;
    if (
      !state.isOpen ||
      !(target instanceof Node) ||
      state.triggerElement?.contains(target) ||
      state.menuElement?.contains(target)
    ) {
      return;
    }
    close(currentAttrs, 'outside');
  };

  const handleViewportChange = () => {
    if (state.isOpen) applyPosition(currentAttrs);
  };

  return {
    oninit: ({ attrs }) => {
      currentAttrs = attrs;
      menuId = attrs.id ?? menuId;
      state.isOpen = attrs.isOpen ?? attrs.defaultOpen ?? false;
      state.activeIndex = state.isOpen ? enabledIndices(attrs.items)[0] ?? -1 : -1;
      portal = createPortalHandle({ id: `${menuId}-portal`, zIndex: 10010 });
      escapeLayer.sync(state.isOpen);
      if (state.isOpen) {
        if (activeMenu?.owner !== owner) activeMenu?.close();
        activeMenu = { owner, close: () => close(currentAttrs, 'outside') };
      }
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('contextmenu', handleDocumentClick);
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange, true);
    },
    onremove: () => {
      window.clearTimeout(typeaheadTimer);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('contextmenu', handleDocumentClick);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
      portal.dispose();
      escapeLayer.dispose();
      if (activeMenu?.owner === owner) activeMenu = undefined;
      if (state.isOpen) restoreFocus();
      state.menuElement = null;
      state.triggerElement = null;
      state.invoker = null;
    },
    view: ({ attrs }) => {
      currentAttrs = attrs;
      if (attrs.isOpen !== undefined && attrs.isOpen !== state.isOpen) {
        if (attrs.isOpen) {
          if (activeMenu?.owner !== owner) activeMenu?.close();
          const indices = enabledIndices(attrs.items);
          state.isOpen = true;
          escapeLayer.sync(true);
          state.activeIndex = indices[0] ?? -1;
          state.invoker = document.activeElement instanceof HTMLElement ? document.activeElement : state.triggerElement;
          resetTypeahead();
          activeMenu = { owner, close: () => close(currentAttrs, 'outside') };
        } else {
          close(attrs, 'programmatic');
        }
      }
      if (state.isOpen) {
        const indices = enabledIndices(attrs.items);
        if (!indices.includes(state.activeIndex)) state.activeIndex = indices[0] ?? -1;
      }
      syncPortal(attrs);
      return attrs.trigger(triggerAttrs(attrs));
    },
  };
};

/**
 * Anchored action menu with menu/menuitem semantics.
 */
export const Menu = <T extends string | number = string>(): Component<MenuAttrs<T>> =>
  createMenu<T>(false) as Component<MenuAttrs<T>>;

/**
 * Action menu opened by right-click, ContextMenu, or Shift+F10.
 */
export const ContextMenu = <T extends string | number = string>(): Component<ContextMenuAttrs<T>> =>
  createMenu<T>(true) as Component<ContextMenuAttrs<T>>;
