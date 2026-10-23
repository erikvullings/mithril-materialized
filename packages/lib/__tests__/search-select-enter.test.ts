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
    expect(input.getAttribute('aria-activedescendant')).toBeNull();

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
});
