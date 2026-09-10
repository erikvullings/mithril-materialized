import {
  createAsyncComboboxState,
  getComboboxViewState,
  rejectAsyncComboboxRequest,
  resolveAsyncComboboxRequest,
  startAsyncComboboxRequest,
} from '../src/combobox';
import { SearchSelect } from '../src/search-select';
import { render, fireEvent, cleanup } from './test-utils';
import { InputOption } from '../src/option';

describe('SearchSelect async mode', () => {
  afterEach(cleanup);

  it('tracks loading to ready transitions for async options', () => {
    const initial = createAsyncComboboxState<InputOption<number>>([]);
    const started = startAsyncComboboxRequest(initial);
    const ready = resolveAsyncComboboxRequest(started.nextState, started.requestId, [{ id: 1, label: 'One' }]);

    expect(getComboboxViewState({ isLoading: started.nextState.isLoading, error: null, optionCount: 0 })).toBe(
      'loading'
    );
    expect(
      getComboboxViewState({ isLoading: ready.isLoading, error: ready.error, optionCount: ready.options.length })
    ).toBe('ready');
  });

  it('returns empty state when async results contain no options', () => {
    const initial = createAsyncComboboxState<InputOption<number>>([]);
    const started = startAsyncComboboxRequest(initial);
    const resolved = resolveAsyncComboboxRequest(started.nextState, started.requestId, []);

    expect(getComboboxViewState({ isLoading: resolved.isLoading, error: resolved.error, optionCount: 0 })).toBe(
      'empty'
    );
  });

  it('returns error state when async loading fails', () => {
    const initial = createAsyncComboboxState<InputOption<number>>([]);
    const started = startAsyncComboboxRequest(initial);
    const failed = rejectAsyncComboboxRequest(started.nextState, started.requestId, 'Network unavailable');

    expect(failed.error).toBe('Network unavailable');
    expect(
      getComboboxViewState({ isLoading: failed.isLoading, error: failed.error, optionCount: failed.options.length })
    ).toBe('error');
  });

  it('keeps the latest request result when async responses complete out of order', () => {
    const initial = createAsyncComboboxState<InputOption<number>>([]);
    const first = startAsyncComboboxRequest(initial);
    const second = startAsyncComboboxRequest(first.nextState);

    const secondResolved = resolveAsyncComboboxRequest(second.nextState, second.requestId, [{ id: 2, label: 'Beta' }]);
    const staleFirstResolved = resolveAsyncComboboxRequest(secondResolved, first.requestId, [
      { id: 1, label: 'Alpha' },
    ]);

    expect(staleFirstResolved.options.map((o) => o.label)).toEqual(['Beta']);
  });

  it('renders combobox accessibility attributes in closed state', () => {
    const { container } = render(SearchSelect<number>(), {
      id: 'async-search-select-aria',
      label: 'Remote options',
      options: [{ id: 1, label: 'Alpha' }],
      loadOptions: async () => [{ id: 1, label: 'Alpha' }],
    });

    const trigger = container.querySelector('.chips-container') as HTMLElement;
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('renders the search field in the trigger line instead of as a dropdown row', () => {
    const component = SearchSelect<number>();
    const attrs = {
      id: 'inline-search-select',
      label: 'Options',
      options: [{ id: 1, label: 'Alpha' }],
      searchPlaceholder: 'Find an option',
    };
    const result = render(component, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    expect(container.querySelector('.chips-container > .search-select-input')).toBeInTheDocument();
    expect(container.querySelector('.dropdown-content .search-select-input')).toBeNull();
    expect(container.querySelector('.search-select-input')).toHaveAttribute('placeholder', 'Find an option');
    expect(container.querySelector('.search-select-input')).toHaveAttribute('role', 'combobox');
    expect(container.querySelector('.search-select-input')).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('.input-field > label')).toHaveClass('active');
  });

  it('positions the dropdown from the trigger content edge without forcing the field width', () => {
    const component = SearchSelect<number>();
    const attrs = {
      options: [{ id: 1, label: 'Alpha' }],
    };
    const result = render(component, attrs);
    const trigger = result.container.querySelector('.chips-container') as HTMLElement;
    Object.defineProperty(trigger, 'offsetLeft', { configurable: true, value: 11 });

    fireEvent.click(trigger);
    result.rerender(component, attrs);

    const dropdown = result.container.querySelector('.dropdown-content') as HTMLElement;
    expect(dropdown.style.left).toBe('11px');
    expect(dropdown.style.minWidth).toBe('0px');
  });

  it('allows Tab from the inline search field to reach modal focus management', () => {
    const component = SearchSelect<number>();
    const attrs = {
      label: 'Options',
      options: [{ id: 1, label: 'Alpha' }],
    };
    const result = render(component, attrs);
    const { container } = result;
    const onDocumentKeydown = jest.fn();
    document.addEventListener('keydown', onDocumentKeydown);

    fireEvent.click(container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);
    fireEvent.keyDown(container.querySelector('.search-select-input') as HTMLInputElement, 'Tab');

    expect(onDocumentKeydown).toHaveBeenCalledTimes(1);
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  it('keeps selected chips visible when a new async query replaces the result list', async () => {
    const options: InputOption<number>[] = [
      { id: 0, label: 'Watching movies' },
      { id: 1, label: 'Going out' },
      { id: 2, label: 'Reading' },
      { id: 3, label: 'Cycling' },
    ];
    const pendingLoads: Array<(options: InputOption<number>[]) => void> = [];
    const loadOptions = jest.fn((_query: string) => {
      return new Promise<InputOption<number>[]>((resolve) => {
        pendingLoads.push(resolve);
      });
    });
    const component = SearchSelect<number>();
    const attrs = {
      label: 'Remote hobbies',
      options: [],
      defaultCheckedId: [0, 1, 3],
      loadOptions,
    };
    const result = render(component, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('.chips-container') as HTMLElement);
    pendingLoads.shift()?.(options);
    await Promise.resolve();
    result.rerender(component, attrs);
    expect(container.querySelectorAll('.chip')).toHaveLength(3);

    const searchInput = container.querySelector('.search-select-input') as HTMLInputElement;
    searchInput.value = 're';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    result.rerender(component, attrs);
    expect(container.querySelector('.search-select-loading-indicator')).toHaveClass('is-active');
    expect(container.querySelector('.search-select-loading-info')).toBeNull();
    expect(container.querySelector('.dropdown-content')?.textContent).toContain('Reading');

    pendingLoads.shift()?.([options[2]]);
    await Promise.resolve();
    result.rerender(component, attrs);
    expect(loadOptions).toHaveBeenLastCalledWith('re');
    expect(container.querySelector('.search-select-loading-info')).toBeNull();

    expect(Array.from(container.querySelectorAll('.chip')).map((chip) => chip.textContent)).toEqual([
      'Watching movies',
      'Going out',
      'Cycling',
    ]);
    expect(container.querySelector('.dropdown-content')?.textContent).toContain('Reading');
  });
});
