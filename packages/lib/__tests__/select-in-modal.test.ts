import m from 'mithril';
import { vi } from 'vitest';
import { ModalPanel } from '../src/modal';
import { Select } from '../src/select';

/**
 * Regression: portal content is rendered with m.render outside the m.mount tree. Interactions inside a
 * portal (e.g. a Select dropdown in a ModalPanel) must still trigger Mithril's automatic redraw.
 */
describe('Select inside ModalPanel (portal redraw)', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    m.mount(root, null);
    root.remove();
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  const mountApp = (options: Array<{ id: string; label: string; group?: string }>) => {
    let selected: string | undefined;
    const onchange = vi.fn((ids: string[]) => {
      selected = ids[0];
    });
    m.mount(root, {
      view: () =>
        m(ModalPanel, {
          id: 'portal-modal',
          title: 'Modal',
          isOpen: true,
          content: m('div', [
            m(Select<string>, {
              id: 'modal-select',
              placeholder: 'Pick one',
              options,
              checkedId: selected,
              onchange,
            }),
            m('button#derived', { disabled: !selected }, selected ? `Use ${selected}` : 'Nothing selected'),
          ]),
        }),
    });
    return { onchange };
  };

  // Wait for any already-scheduled (requestAnimationFrame) redraw so it cannot mask a missing one.
  const flushFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

  const openDropdown = async () => {
    const trigger = root.querySelector('button.dropdown-trigger') as HTMLElement;
    expect(trigger).toBeTruthy();
    trigger.click();
    await flushFrame();
    const dropdown = document.getElementById("modal-select-dropdown");
    expect(root.contains(dropdown)).toBe(false);
    expect(dropdown?.querySelector('ul.select-dropdown')).toBeTruthy();
    return dropdown as HTMLElement;
  };

  const clickOption = (dropdown: HTMLElement, label: string) => {
    const li = Array.from(dropdown.querySelectorAll('li')).find((el) => el.textContent?.trim() === label);
    expect(li).toBeTruthy();
    li!.click();
  };

  const expectUpdated = async (label: string, id: string) => {
    // No manual m.redraw(): the portal click alone must schedule a redraw.
    await vi.waitFor(() => {
      const trigger = root.querySelector('button.dropdown-trigger') as HTMLButtonElement;
      expect(trigger.textContent).toBe(label);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      const button = root.querySelector('#derived') as HTMLButtonElement;
      expect(button.textContent).toBe(`Use ${id}`);
      expect(button.disabled).toBe(false);
      expect(document.querySelector('#modal-select-dropdown ul.select-dropdown')).toBeNull();
    });
  };

  it('redraws the select and parent UI after picking an option', async () => {
    const { onchange } = mountApp([
      { id: 'a', label: 'Alpha' },
      { id: 'b', label: 'Beta' },
    ]);
    const dropdown = await openDropdown();
    clickOption(dropdown, 'Beta');
    expect(onchange).toHaveBeenCalledWith(['b']);
    await expectUpdated('Beta', 'b');
  });

  it('redraws after picking a grouped (optgroup) option', async () => {
    const { onchange } = mountApp([
      { id: 'a', label: 'Alpha', group: 'G1' },
      { id: 'b', label: 'Beta', group: 'G1' },
    ]);
    const dropdown = await openDropdown();
    clickOption(dropdown, 'Alpha');
    expect(onchange).toHaveBeenCalledWith(['a']);
    await expectUpdated('Alpha', 'a');
  });
});
