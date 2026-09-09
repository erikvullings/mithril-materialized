import m from 'mithril';
import { ContextMenu, Menu, type MenuAttrs } from '../src/menu';
import { cleanup, fireEvent, render } from './test-utils';

describe('Menu', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: originalInnerHeight });
    document.documentElement.dir = '';
    jest.restoreAllMocks();
    cleanup();
  });

  it('renders action-menu semantics and selects enabled items', () => {
    const onSelect = jest.fn();
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [
        { id: 'edit', label: 'Edit', iconName: 'edit' },
        { separator: true },
        { id: 'archive', label: 'Archive', disabled: true },
      ],
      onSelect,
    });

    fireEvent.click(result.getByText('Actions'));

    const menu = document.querySelector('[role="menu"]');
    const items = Array.from(document.querySelectorAll<HTMLElement>('[role="menuitem"]'));

    expect(menu).toHaveAttribute('aria-label', 'Actions');
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument();
    expect(items[0]).toHaveFocus();
    expect(items[1]).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(items[1]);
    expect(onSelect).not.toHaveBeenCalled();

    fireEvent.click(items[0]);
    expect(onSelect).toHaveBeenCalledWith('edit', expect.objectContaining({ label: 'Edit' }));
    expect(document.querySelector('[role="menu"]')).toBeNull();

    result.unmount();
  });

  it('supports arrow, boundary, typeahead, and activation keys while skipping disabled items', () => {
    const onSelect = jest.fn();
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [
        { id: 'archive', label: 'Archive', disabled: true },
        { id: 'copy', label: 'Copy' },
        { id: 'download', label: 'Download' },
        { id: 'duplicate', label: 'Duplicate' },
      ],
      onSelect,
    });
    const trigger = result.getByText('Actions');

    fireEvent.keyDown(trigger, 'ArrowDown');
    expect(document.activeElement).toHaveTextContent('Copy');
    expect(document.activeElement).not.toHaveClass('active');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'End');
    expect(document.activeElement).toHaveTextContent('Duplicate');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Home');
    expect(document.activeElement).toHaveTextContent('Copy');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'd');
    expect(document.activeElement).toHaveTextContent('Download');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'ArrowDown');
    expect(document.activeElement).toHaveTextContent('Duplicate');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Enter');
    expect(onSelect).toHaveBeenCalledWith('duplicate', expect.objectContaining({ label: 'Duplicate' }));

    fireEvent.keyDown(trigger, 'ArrowUp');
    expect(document.activeElement).toHaveTextContent('Duplicate');
    fireEvent.keyDown(document.activeElement as HTMLElement, ' ');
    expect(onSelect).toHaveBeenCalledWith('duplicate', expect.objectContaining({ label: 'Duplicate' }));

    result.unmount();
  });

  it('lets a native button click open the menu after keyboard activation', () => {
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ id: 'edit', label: 'Edit' }],
    });
    const trigger = result.getByText('Actions');

    fireEvent.keyDown(trigger, 'Enter');
    expect(document.querySelector('[role="menu"]')).toBeNull();

    fireEvent.click(trigger);
    expect(document.querySelector('[role="menu"]')).toBeInTheDocument();

    result.unmount();
  });

  it('closes on escape and restores focus to the trigger', () => {
    const onClose = jest.fn();
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ id: 'edit', label: 'Edit' }],
      onClose,
    });
    const trigger = result.getByText('Actions');
    trigger.focus();

    fireEvent.click(trigger);
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Escape');

    expect(onClose).toHaveBeenCalledWith('escape');
    expect(trigger).toHaveFocus();
    expect(document.querySelector('[role="menu"]')).toBeNull();

    result.unmount();
  });

  it('supports controlled visibility and outside dismissal', () => {
    const onClose = jest.fn();
    const menu = Menu<string>();
    const attrs: MenuAttrs<string> = {
      trigger: (triggerAttrs) => m('button', triggerAttrs, 'Actions'),
      items: [{ id: 'edit', label: 'Edit' }],
      onClose,
    };
    const result = render(menu, { ...attrs, isOpen: true });

    expect(document.querySelector('[role="menu"]')).toBeInTheDocument();

    result.rerender(menu, { ...attrs, isOpen: false });
    expect(onClose).toHaveBeenCalledWith('programmatic');
    expect(document.querySelector('[role="menu"]')).toBeNull();

    result.rerender(menu, attrs);
    fireEvent.click(result.getByText('Actions'));
    fireEvent.click(document.body);
    expect(onClose).toHaveBeenLastCalledWith('outside');

    result.unmount();
  });

  it('keeps an anchored menu inside the viewport and repositions on scroll', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 300 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 200 });
    let triggerTop = 180;
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [
        { id: 'edit', label: 'Edit' },
        { id: 'copy', label: 'Copy' },
        { id: 'delete', label: 'Delete' },
      ],
    });
    const trigger = result.getByText('Actions');
    trigger.getBoundingClientRect = () =>
      ({
        top: triggerTop,
        right: 290,
        bottom: triggerTop + 20,
        left: 260,
        width: 30,
      }) as DOMRect;

    fireEvent.click(trigger);

    const menu = document.querySelector<HTMLElement>('[role="menu"]') as HTMLElement;
    expect(menu.style.left).toBe('92px');
    expect(menu.style.top).toBe('20px');

    triggerTop = 20;
    window.dispatchEvent(new Event('scroll'));

    expect(menu.style.top).toBe('40px');
    result.unmount();
  });

  it('aligns the menu to the logical start edge in right-to-left layouts', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 500 });
    document.documentElement.dir = 'rtl';
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'פעולות'),
      items: [{ id: 'rename', label: 'שינוי שם' }],
    });
    const trigger = result.getByText('פעולות');
    trigger.getBoundingClientRect = () =>
      ({
        top: 20,
        right: 400,
        bottom: 60,
        left: 300,
        width: 100,
      }) as DOMRect;

    fireEvent.click(trigger);

    expect(document.querySelector<HTMLElement>('[role="menu"]')?.style.left).toBe('200px');
    result.unmount();
  });

  it('opens a context menu for pointer and keyboard gestures without suppressing unrelated events', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 300 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 200 });
    const result = render(ContextMenu<string>(), {
      trigger: (attrs) => m('div', { ...attrs, tabindex: 0 }, 'Context target'),
      items: [{ id: 'inspect', label: 'Inspect' }],
    });
    const target = result.getByText('Context target');
    const contextEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 290,
      clientY: 190,
    });

    target.dispatchEvent(contextEvent);

    const menu = document.querySelector<HTMLElement>('[role="menu"]') as HTMLElement;
    expect(contextEvent.defaultPrevented).toBe(true);
    expect(menu.style.left).toBe('92px');
    expect(document.activeElement).toHaveTextContent('Inspect');

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Escape');
    fireEvent.keyDown(target, 'F10', { shiftKey: true });
    expect(document.querySelector('[role="menu"]')).toBeInTheDocument();

    const unrelatedEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(unrelatedEvent);
    expect(unrelatedEvent.defaultPrevented).toBe(false);

    result.unmount();
  });

  it('closes another open menu before keyboard-opening a new one', () => {
    const FirstMenu = Menu<string>();
    const SecondMenu = Menu<string>();
    const Host = {
      view: () =>
        m('div', [
          m(FirstMenu, {
            trigger: (attrs) => m('button', attrs, 'First actions'),
            items: [{ id: 'first', label: 'First item' }],
          }),
          m(SecondMenu, {
            trigger: (attrs) => m('button', attrs, 'Second actions'),
            items: [{ id: 'second', label: 'Second item' }],
          }),
        ]),
    };
    const result = render(Host);

    fireEvent.click(result.getByText('First actions'));
    fireEvent.keyDown(result.getByText('Second actions'), 'ArrowDown');

    expect(document.querySelectorAll('[role="menu"]')).toHaveLength(1);
    expect(document.activeElement).toHaveTextContent('Second item');
    result.unmount();
  });

  it('focuses the menu surface so escape works when no item is enabled', () => {
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ id: 'archive', label: 'Archive', disabled: true }],
    });

    fireEvent.click(result.getByText('Actions'));

    const menu = document.querySelector<HTMLElement>('[role="menu"]') as HTMLElement;
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, 'Escape');
    expect(document.querySelector('[role="menu"]')).toBeNull();
    result.unmount();
  });

  it('resets typeahead between menu sessions', () => {
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [
        { id: 'copy', label: 'Copy' },
        { id: 'download', label: 'Download' },
        { id: 'upload', label: 'Upload' },
      ],
    });
    const trigger = result.getByText('Actions');

    fireEvent.click(trigger);
    fireEvent.keyDown(document.activeElement as HTMLElement, 'd');
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Escape');
    fireEvent.click(trigger);
    fireEvent.keyDown(document.activeElement as HTMLElement, 'u');

    expect(document.activeElement).toHaveTextContent('Upload');
    result.unmount();
  });

  it('clamps a configured minimum width to the viewport', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 300 });
    const result = render(Menu<string>(), {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ id: 'edit', label: 'Edit' }],
      minWidth: 400,
    });

    fireEvent.click(result.getByText('Actions'));

    expect(document.querySelector<HTMLElement>('[role="menu"]')?.style.minWidth).toBe('284px');
    result.unmount();
  });

  it('moves focus when updated items invalidate the active item', () => {
    const menu = Menu<string>();
    const result = render(menu, {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [
        { id: 'a', label: 'Alpha' },
        { id: 'b', label: 'Beta' },
      ],
    });

    fireEvent.click(result.getByText('Actions'));
    result.rerender(menu, {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ separator: true }, { id: 'b', label: 'Beta' }],
    });

    expect(document.activeElement).toHaveTextContent('Beta');
    expect(document.activeElement).toHaveAttribute('tabindex', '0');
    result.unmount();
  });
});
