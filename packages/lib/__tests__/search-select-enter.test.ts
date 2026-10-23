import { SearchSelect } from '../src/search-select';
import { InputOption } from '../src/option';
import { cleanup, fireEvent, render } from './test-utils';

const options: InputOption<string>[] = [
  { id: 'flood', label: 'Flood', group: 'My scenario types' },
  { id: 'storm-disabled', label: 'Storm (archived)', group: 'My scenario types', disabled: true },
  { id: 'storm', label: 'Storm', group: 'Starter kit' },
  { id: 'snowstorm', label: 'Snowstorm', group: 'Starter kit' },
];

const openAndType = (attrs: Record<string, unknown>, term: string) => {
  const component = SearchSelect<string>();
  const result = render(component, attrs);
  fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
  result.rerender(component, attrs);
  const input = result.container.querySelector('.search-select-input') as HTMLInputElement;
  fireEvent.change(input, term);
  result.rerender(component, attrs);
  return { component, result, input };
};

describe('SearchSelect Enter without a highlighted option', () => {
  afterEach(cleanup);

  it('selects the first enabled match in single mode, skipping disabled options', () => {
    const onchange = vi.fn();
    const attrs = { label: 'Scenario type', multiple: false, options, onchange };
    const { component, result, input } = openAndType(attrs, 'storm');
    fireEvent.keyDown(input, 'Enter');
    result.rerender(component, attrs);

    expect(onchange).toHaveBeenCalledWith(['storm']);
    expect(result.container.querySelector('.chips-container')).toHaveTextContent('Storm');
    expect(result.container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('selects the first enabled match in multi mode and keeps the list open', () => {
    const onchange = vi.fn();
    const attrs = { label: 'Scenario types', options, onchange };
    const { component, result, input } = openAndType(attrs, 'storm');

    fireEvent.keyDown(input, 'Enter');
    result.rerender(component, attrs);

    expect(onchange).toHaveBeenCalledWith(['storm']);
    expect(result.container.querySelector('.chip')).toHaveTextContent('Storm');
  });

  it('still selects the highlighted option when one is focused', () => {
    const onchange = vi.fn();
    const attrs = { label: 'Scenario type', multiple: false, options, onchange };
    const { input } = openAndType(attrs, 'storm');

    fireEvent.keyDown(input, 'ArrowDown');
    fireEvent.keyDown(input, 'ArrowDown');
    fireEvent.keyDown(input, 'Enter');

    expect(onchange).toHaveBeenCalledWith(['snowstorm']);
  });

  it('creates a new option when nothing matches and oncreateNewOption is set', async () => {
    const onchange = vi.fn();
    const oncreateNewOption = vi.fn((term: string) => ({ id: term.toLowerCase(), label: term }));
    const attrs = { label: 'Scenario type', multiple: false, options, onchange, oncreateNewOption };
    const { input } = openAndType(attrs, 'Drought');

    fireEvent.keyDown(input, 'Enter');
    await Promise.resolve();
    await Promise.resolve();

    expect(oncreateNewOption).toHaveBeenCalledWith('Drought');
    expect(onchange).toHaveBeenCalledWith(['drought']);
  });

  it('does nothing when nothing matches and creation is not enabled', () => {
    const onchange = vi.fn();
    const attrs = { label: 'Scenario type', multiple: false, options, onchange };
    const { component, result, input } = openAndType(attrs, 'Drought');

    fireEvent.keyDown(input, 'Enter');
    result.rerender(component, attrs);

    expect(onchange).not.toHaveBeenCalled();
    expect(result.container.querySelector('[role="listbox"]')).not.toBeNull();
  });

  it('highlights the first enabled match while typing and exposes it as aria-activedescendant', () => {
    const attrs = { label: 'Scenario type', multiple: false, options };
    const { component, result, input } = openAndType(attrs, 'storm');

    const activeId = input.getAttribute('aria-activedescendant');
    expect(activeId).not.toBeNull();
    const active = document.getElementById(activeId!) as HTMLElement;
    expect(active).toHaveTextContent('Storm');
    expect(active).not.toHaveTextContent('archived');
    expect(active.classList.contains('active')).toBe(true);
    expect(result.container.querySelectorAll('[role="option"].active')).toHaveLength(1);

    fireEvent.change(input, 'snow');
    result.rerender(component, attrs);
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('Snowstorm');
  });

  it('moves from the typed highlight with arrow keys', () => {
    const attrs = { label: 'Scenario type', multiple: false, options };
    const { component, result, input } = openAndType(attrs, 'storm');

    fireEvent.keyDown(input, 'ArrowDown');
    result.rerender(component, attrs);
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('Snowstorm');

    fireEvent.keyDown(input, 'ArrowUp');
    result.rerender(component, attrs);
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toHaveTextContent('Storm');
  });

  it('highlights nothing when no option matches and leaves the typed text untouched', () => {
    const attrs = { label: 'Scenario type', multiple: false, options };
    const { result, input } = openAndType(attrs, 'Drought');

    expect(input.getAttribute('aria-activedescendant')).toBeNull();
    expect(result.container.querySelector('[role="option"].active')).toBeNull();
    expect(input.value).toBe('Drought');
  });

  it('does not inline-autocomplete the search field', () => {
    const attrs = { label: 'Scenario type', multiple: false, options };
    const { input } = openAndType(attrs, 'sto');

    expect(input.value).toBe('sto');
    expect(input.selectionStart).toBe(input.selectionEnd);
  });

  it('keeps no highlight when the list opens without typing', () => {
    const component = SearchSelect<string>();
    const attrs = { label: 'Scenario type', multiple: false, options };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    const input = result.container.querySelector('.search-select-input') as HTMLInputElement;
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
    expect(result.container.querySelector('[role="option"].active')).toBeNull();
  });
});
