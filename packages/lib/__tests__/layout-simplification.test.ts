import { Dropdown } from '../src/dropdown';
import { SearchSelect } from '../src/search-select';
import { SidenavItem } from '../src/sidenav';
import { render, cleanup } from './test-utils';

describe('CSS layout simplification', () => {
  afterEach(() => {
    if (typeof document !== 'undefined') {
      cleanup();
    }
  });

  it('uses shared layout classes in SearchSelect trigger and helper elements', () => {
    const { container } = render(SearchSelect<string>(), {
      id: 'search-select-layout',
      options: [
        { id: 'a', label: 'Alpha' },
        { id: 'b', label: 'Beta' },
      ],
      placeholder: 'Pick items',
    });

    const chipsContainer = container.querySelector('.chips-container') as HTMLElement;
    expect(chipsContainer.classList.contains('mm-layout-row')).toBe(true);
    expect(chipsContainer.classList.contains('mm-layout-row--wrap')).toBe(true);
    expect(chipsContainer.classList.contains('mm-layout-row--align-end')).toBe(true);

    const placeholder = container.querySelector('span.placeholder') as HTMLElement;
    expect(placeholder.classList.contains('mm-layout-grow')).toBe(true);

    const spacer = container.querySelector('span.spacer') as HTMLElement;
    expect(spacer.classList.contains('mm-layout-grow')).toBe(true);
  });

  it('uses shared layout classes in Dropdown trigger row', () => {
    const { container } = render(Dropdown<string>(), {
      id: 'dropdown-layout',
      label: 'Select option',
      items: [
        { id: '1', label: 'One', iconName: 'check' },
        { id: '2', label: 'Two' },
      ],
    });

    const selectWrapper = container.querySelector('.select-wrapper') as HTMLElement;
    expect(selectWrapper.classList.contains('mm-layout-row')).toBe(true);
    expect(selectWrapper.classList.contains('mm-layout-row--center')).toBe(true);
  });

  it('uses shared layout classes in SidenavItem links and text slots', () => {
    const { container } = render(SidenavItem, {
      text: 'Dashboard',
      icon: 'menu',
      _isExpanded: true,
      _position: 'left',
    });

    const link = container.querySelector('a') as HTMLElement;
    expect(link.classList.contains('mm-layout-row')).toBe(true);
    expect(link.classList.contains('mm-layout-row--center')).toBe(true);

    const text = container.querySelector('.sidenav-item-text') as HTMLElement;
    expect(text.classList.contains('mm-layout-grow')).toBe(true);
  });
});
