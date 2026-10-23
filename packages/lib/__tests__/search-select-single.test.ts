import { SearchSelect } from '../src/search-select';
import { InputOption } from '../src/option';
import { cleanup, fireEvent, render } from './test-utils';

describe('SearchSelect single mode', () => {
  afterEach(cleanup);

  it('replaces the selected option, keeps it in the list, and shows its label without chips', () => {
    const options: InputOption<string>[] = [
      { id: 'first', label: 'First' },
      { id: 'second', label: 'Second' },
    ];
    const onchange = jest.fn();
    const component = SearchSelect<string>();
    const attrs = {
      label: 'Scenario type',
      multiple: false,
      defaultCheckedId: 'first',
      options,
      onchange,
    };
    const result = render(component, attrs);
    const trigger = result.container.querySelector('.chips-container') as HTMLElement;

    expect(trigger).toHaveTextContent('First');
    expect(result.container.querySelector('.chip')).toBeNull();

    fireEvent.click(trigger);
    result.rerender(component, attrs);
    expect(result.container.querySelector('[role="option"][aria-selected="true"]')).toHaveTextContent('First');
    expect(result.container.querySelector('input[type="checkbox"]')).toBeNull();

    fireEvent.click(result.container.querySelectorAll('[role="option"]')[1] as HTMLElement);
    result.rerender(component, attrs);

    expect(onchange).toHaveBeenCalledWith(['second']);
    expect(trigger).toHaveTextContent('Second');
    expect(document.activeElement).toBe(trigger);
    expect(result.container.querySelector('.chip')).toBeNull();
    expect(result.container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('keeps matching group headings in source order and hides empty groups while filtering', () => {
    const component = SearchSelect<string>();
    const attrs = {
      label: 'Scenario type',
      multiple: false,
      options: [
        { id: 'mine-1', label: 'Alpha', group: 'My scenarios' },
        { id: 'mine-2', label: 'Beta', group: 'My scenarios' },
        { id: 'starter', label: 'Starter Alpha', group: 'Starter kit' },
        { id: 'other', label: 'Gamma' },
      ],
    };
    const result = render(component, attrs);

    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    const groups = result.container.querySelectorAll('[role="group"]');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveAccessibleName('My scenarios');
    expect(groups[1]).toHaveAccessibleName('Starter kit');

    const input = result.container.querySelector('.search-select-input') as HTMLInputElement;
    input.value = 'starter';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    result.rerender(component, attrs);

    expect(result.container.querySelectorAll('[role="group"]')).toHaveLength(1);
    expect(result.container.querySelector('[role="group"]')).toHaveAccessibleName('Starter kit');
    expect(result.container.querySelector('[role="group"]')).toHaveAttribute('aria-labelledby');

    fireEvent.keyDown(input, 'ArrowDown');
    result.rerender(component, attrs);
    const activeDescendantId = input.getAttribute('aria-activedescendant');
    expect(activeDescendantId).toBeTruthy();
    expect(document.getElementById(activeDescendantId!)).toHaveAttribute('role', 'option');
  });

  it('closes on Escape and Tab without changing the current value', () => {
    const onchange = jest.fn();
    const component = SearchSelect<string>();
    const attrs = {
      multiple: false,
      defaultCheckedId: 'first',
      options: [
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second' },
      ],
      onchange,
    };
    const result = render(component, attrs);
    const trigger = result.container.querySelector('.chips-container') as HTMLElement;

    fireEvent.click(trigger);
    result.rerender(component, attrs);
    const input = result.container.querySelector('.search-select-input') as HTMLInputElement;
    fireEvent.keyDown(input, 'Escape');
    result.rerender(component, attrs);
    expect(result.container.querySelector('[role="listbox"]')).toBeNull();
    expect(trigger).toHaveTextContent('First');
    expect(document.activeElement).toBe(trigger);
    expect(onchange).not.toHaveBeenCalled();

    fireEvent.click(trigger);
    result.rerender(component, attrs);
    const searchInput = result.container.querySelector('.search-select-input') as HTMLInputElement;
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    searchInput.dispatchEvent(tabEvent);
    result.rerender(component, attrs);

    expect(tabEvent.defaultPrevented).toBe(false);
    expect(result.container.querySelector('[role="listbox"]')).toBeNull();
    expect(trigger).toHaveTextContent('First');
  });

  it('selects the focused grouped option with Enter and closes the list', () => {
    const onchange = jest.fn();
    const component = SearchSelect<string>();
    const attrs = {
      label: 'Scenario type',
      multiple: false,
      options: [
        { id: 'first', label: 'First', group: 'My scenarios' },
        { id: 'second', label: 'Second', group: 'Starter kit' },
      ],
      onchange,
    };
    const result = render(component, attrs);
    const trigger = result.container.querySelector('.chips-container') as HTMLElement;

    fireEvent.keyDown(trigger, 'ArrowDown');
    result.rerender(component, attrs);
    const input = result.container.querySelector('.search-select-input') as HTMLInputElement;
    fireEvent.keyDown(input, 'ArrowDown');
    result.rerender(component, attrs);
    const activeDescendantId = input.getAttribute('aria-activedescendant');
    expect(document.getElementById(activeDescendantId!)).toHaveTextContent('Second');

    fireEvent.keyDown(input, 'Enter');
    result.rerender(component, attrs);

    expect(onchange).toHaveBeenCalledWith(['second']);
    expect(trigger).toHaveTextContent('Second');
    expect(document.activeElement).toBe(trigger);
    expect(result.container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('supports grouped options loaded asynchronously in single mode', async () => {
    const component = SearchSelect<string>();
    const options: InputOption<string>[] = [
      { id: 'scenario', label: 'Scenario', group: 'My scenarios' },
      { id: 'starter', label: 'Starter', group: 'Starter kit' },
    ];
    const attrs = {
      label: 'Scenario type',
      multiple: false,
      defaultCheckedId: 'scenario',
      options: [],
      loadOptions: async () => options,
    };
    const result = render(component, attrs);

    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    await new Promise((resolve) => setTimeout(resolve, 0));
    result.rerender(component, attrs);

    expect(result.container.querySelector('[role="group"]')).toHaveAccessibleName('My scenarios');
    expect(result.container.querySelector('[role="option"][aria-selected="true"]')).toHaveTextContent('Scenario');
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);
    expect(result.container.querySelector('.chips-container')).toHaveTextContent('Scenario');
  });

  it('does not reinterpret maxSelectedOptions=1 as explicit single mode', () => {
    const component = SearchSelect<string>();
    const attrs = {
      maxSelectedOptions: 1,
      defaultCheckedId: 'first',
      options: [
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second' },
      ],
    };
    const result = render(component, attrs);
    const trigger = result.container.querySelector('.chips-container') as HTMLElement;

    expect(result.container.querySelector('.chip')).toHaveTextContent('First');
    fireEvent.click(trigger);
    result.rerender(component, attrs);
    expect(result.container.querySelectorAll('[role="option"]')).toHaveLength(1);
    expect(result.container.querySelector('.search-select-max-info')).toBeInTheDocument();
  });
});
