import {
  createAsyncComboboxState,
  getComboboxViewState,
  rejectAsyncComboboxRequest,
  resolveAsyncComboboxRequest,
  startAsyncComboboxRequest,
} from '../src/combobox';
import { SearchSelect } from '../src/search-select';
import { render, cleanup } from './test-utils';
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
});
