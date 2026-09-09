import m, { type FactoryComponent } from 'mithril';
import { Dropdown } from '../src/dropdown';
import { MaterialBox } from '../src/material-box';
import { Menu } from '../src/menu';
import { ModalPanel } from '../src/modal';
import { Sidenav } from '../src/sidenav';
import { cleanup, fireEvent, render } from './test-utils';

describe('dismissible layer Escape handling', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('dismisses menu, modal, and Sidenav one layer at a time', () => {
    const closeOrder: string[] = [];
    const Harness: FactoryComponent = () => {
      let sidenavOpen = true;
      let modalOpen = true;
      const ActionMenu = Menu<string>();

      return {
        view: () => [
          m(Sidenav, {
            id: 'test-sidenav',
            isOpen: sidenavOpen,
            animationDuration: 0,
            onToggle: (open) => {
              sidenavOpen = open;
              if (!open) closeOrder.push('sidenav');
            },
          }),
          m(ModalPanel, {
            id: 'test-modal',
            title: 'Foreground modal',
            isOpen: modalOpen,
            initialFocus: false,
            onToggle: (open) => {
              modalOpen = open;
            },
            onClose: () => closeOrder.push('modal'),
          }),
          m(ActionMenu, {
            trigger: (attrs) => m('button', attrs, 'Actions'),
            items: [{ id: 'edit', label: 'Edit' }],
            onClose: () => closeOrder.push('menu'),
          }),
        ],
      };
    };

    const result = render(Harness);
    const sidenav = () => result.container.querySelector<HTMLElement>('#test-sidenav');
    const modal = () => result.container.querySelector<HTMLElement>('#test-modal');
    const trigger = result.getByText('Actions');

    fireEvent.click(trigger);
    fireEvent.keyDown(document.body, 'Escape');

    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(modal()).toHaveAttribute('aria-hidden', 'false');
    expect(sidenav()).toHaveStyle({ transform: 'translateX(0)' });
    expect(closeOrder).toEqual(['menu']);

    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual(['menu', 'modal']);

    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual(['menu', 'modal', 'sidenav']);

    result.unmount();
  });

  it('does not dismiss an underlying Sidenav through a non-dismissible modal', () => {
    const closeOrder: string[] = [];
    const Harness: FactoryComponent = () => ({
      view: () => [
        m(Sidenav, {
          isOpen: true,
          onToggle: () => closeOrder.push('sidenav'),
        }),
        m(ModalPanel, {
          title: 'Required decision',
          isOpen: true,
          closeOnEsc: false,
          onClose: () => closeOrder.push('modal'),
        }),
      ],
    });

    const result = render(Harness);

    fireEvent.keyDown(document.body, 'Escape');
    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual([]);

    result.unmount();
  });

  it('dismisses a Dropdown before an underlying Sidenav', () => {
    const closeOrder: string[] = [];
    const Select = Dropdown<string>();
    const sidenavResult = render(Sidenav, {
      isOpen: true,
      onToggle: () => closeOrder.push('sidenav'),
    });
    const dropdownResult = render(Select, {
      label: 'Choose action',
      items: [{ id: 'edit', label: 'Edit' }],
    });
    const dropdownTrigger = dropdownResult.container.querySelector<HTMLElement>('.select-wrapper');

    fireEvent.keyDown(dropdownTrigger!, 'ArrowDown');
    dropdownResult.rerender(Select);
    expect(dropdownResult.container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document.body, 'Escape');
    dropdownResult.rerender(Select);

    expect(dropdownResult.container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'false');
    expect(closeOrder).toEqual([]);

    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual(['sidenav']);

    dropdownResult.unmount();
    sidenavResult.unmount();
  });

  it('dismisses a Menu before an underlying MaterialBox and Sidenav', () => {
    const closeOrder: string[] = [];
    const sidenavResult = render(Sidenav, {
      isOpen: true,
      onToggle: () => closeOrder.push('sidenav'),
    });
    const materialBoxResult = render(MaterialBox, {
      src: 'image.jpg',
      alt: 'Preview',
      onCloseStart: () => closeOrder.push('materialbox'),
    });
    const image = materialBoxResult.container.querySelector<HTMLImageElement>('img');
    image!.getBoundingClientRect = () =>
      ({ top: 10, left: 10, width: 200, height: 100, right: 210, bottom: 110 }) as DOMRect;
    Object.defineProperty(image, 'naturalWidth', { value: 800 });
    Object.defineProperty(image, 'naturalHeight', { value: 400 });
    fireEvent.click(image!);

    const ActionMenu = Menu<string>();
    const menuResult = render(ActionMenu, {
      trigger: (attrs) => m('button', attrs, 'Actions'),
      items: [{ id: 'edit', label: 'Edit' }],
      onClose: () => closeOrder.push('menu'),
    });
    fireEvent.click(menuResult.getByText('Actions'));

    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual(['menu']);
    expect(document.querySelector('.materialbox-overlay')).toBeInTheDocument();

    fireEvent.keyDown(document.body, 'Escape');

    expect(closeOrder).toEqual(['menu', 'materialbox']);

    menuResult.unmount();
    materialBoxResult.unmount();
    sidenavResult.unmount();
  });
});
