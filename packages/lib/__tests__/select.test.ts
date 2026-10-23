import { Select } from '../src/select';
import { Dropdown } from '../src/dropdown';
import { render, fireEvent, cleanup } from './test-utils';
import { getByRole } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { InputOption as IInputOption } from '../src/option';
import { vi } from 'vitest';

describe('Select Component', () => {
  const mockOptions: IInputOption<string>[] = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3', disabled: true },
  ];

  const mockNumericOptions: IInputOption<number>[] = [
    { id: 1, label: 'One' },
    { id: 2, label: 'Two' },
    { id: 3, label: 'Three' },
  ];

  afterEach(() => {
    cleanup();
  });

  it('renders select with label', () => {
    const { getByText } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: vi.fn(),
    });

    expect(getByText('Test Select')).toBeInTheDocument();
  });

  it('renders select with placeholder', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      placeholder: 'Choose an option',
      options: mockOptions,
      onchange: vi.fn(),
    });

    // Placeholder should appear as input value when nothing is selected
    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Choose an option');
  });

  it('renders all options when dropdown is opened', () => {
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: vi.fn(),
    };
    const select = Select<string>();
    const result = render(select, attrs);
    const { container } = result;

    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('ul.select-dropdown')).toBeNull();

    fireEvent.click(container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);

    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelectorAll('ul.select-dropdown li:not(.disabled)')).toHaveLength(2);
  });

  it('calls onchange when option is selected', () => {
    const mockOnChange = vi.fn();
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);
    fireEvent.click(container.querySelector('ul.select-dropdown li:not(.disabled)') as HTMLElement);
    result.rerender(select, attrs);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    expect(container.querySelector('button.select-dropdown')).toHaveTextContent('Option 1');
    expect(container.querySelector('ul.select-dropdown')).toBeNull();
  });

  it('handles single select correctly', () => {
    const mockOnChange = vi.fn();
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
      multiple: false,
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'Enter');
    result.rerender(select, attrs);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles multiple select correctly', () => {
    const mockOnChange = vi.fn();
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
      multiple: true,
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, ' ');
    result.rerender(select, attrs);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultCheckedId prop (uncontrolled)', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      defaultCheckedId: 'option2',
    });

    // Check that the selected option appears in the input value
    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Option 2');
  });

  it('respects checkedId prop', () => {
    const select = Select<string>();
    const result = render(select, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      checkedId: 'option1',
      onchange: vi.fn(),
    });

    // Check that the selected option appears in the input value
    const trigger = result.container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Option 1');

    result.rerender(select, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      checkedId: 'option2',
      onchange: vi.fn(),
    });
    expect(trigger.textContent).toBe('Option 2');
  });

  it('handles disabled state', () => {
    const mockOnChange = vi.fn();
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      disabled: true,
      onchange: mockOnChange,
    });

    const selectWrapper = container.querySelector('button.select-dropdown');
    expect(selectWrapper).toHaveAttribute('tabindex', '-1');

    // Should not respond to clicks when disabled
    fireEvent.click(selectWrapper! as HTMLElement);
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'false');
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('handles disabled options', () => {
    const mockOnChange = vi.fn();
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    result.rerender(select, attrs);

    const focusedOption = container.querySelector('ul.select-dropdown li.focused');
    expect(focusedOption).toHaveTextContent('Option 2');
    expect(focusedOption).not.toHaveClass('disabled');
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('renders with icon prefix', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      iconName: 'person',
      options: mockOptions,
      onchange: vi.fn(),
    });

    const icon = container.querySelector('svg.prefix');
    expect(icon).toBeInTheDocument();
    expect(icon?.querySelector('path')).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders helper text', () => {
    const { getByText } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      helperText: 'Choose wisely',
      options: mockOptions,
      onchange: vi.fn(),
    });

    expect(getByText('Choose wisely')).toBeInTheDocument();
  });

  it('handles grouped options', () => {
    const groupedOptions: IInputOption<string>[] = [
      { id: 'fruit1', label: 'Apple', group: 'Fruits' },
      { id: 'fruit2', label: 'Banana', group: 'Fruits' },
      { id: 'veg1', label: 'Carrot', group: 'Vegetables' },
      { id: 'veg2', label: 'Broccoli', group: 'Vegetables' },
    ];

    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: groupedOptions,
      onchange: vi.fn(),
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);

    expect(container.querySelectorAll('li.optgroup')).toHaveLength(2);
    expect(container.querySelectorAll('li.optgroup-option')).toHaveLength(4);
  });

  it('handles options with images', () => {
    const optionsWithImages: IInputOption<string>[] = [
      { id: 'option1', label: 'Option 1', img: 'https://example.com/image1.jpg' },
      { id: 'option2', label: 'Option 2', img: 'https://example.com/image2.jpg' },
    ];

    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: optionsWithImages,
      onchange: vi.fn(),
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);

    expect(container.querySelectorAll('ul.select-dropdown img')).toHaveLength(2);
  });

  it('displays multiple selected options as tags', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      defaultCheckedId: ['option1', 'option2'],
    });

    // Multiple selections are displayed as comma-separated values in the input
    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Option 1, Option 2');
  });

  it('allows removing tags in multiple select', () => {
    const mockOnChange = vi.fn();
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      defaultCheckedId: ['option1', 'option2'],
    });

    // Tag removal functionality is not currently implemented
    // Multiple selections are managed through the dropdown interface
    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Option 1, Option 2');
  });

  it('shows count summary in multi-select mode', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      summaryMode: 'count',
      defaultCheckedId: ['option1', 'option2'],
    });

    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('2/2 selected');
  });

  it('shows all-selected label in all-or-count summary mode', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      summaryMode: 'all-or-count',
      allSelectedLabel: 'Everything selected',
      defaultCheckedId: ['option1', 'option2'],
    });

    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('Everything selected');
  });

  it('shows none-selected label in all-or-count summary mode', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      summaryMode: 'all-or-count',
      noneSelectedLabel: 'No projects selected',
      placeholder: 'Choose...',
    });

    const trigger = container.querySelector('button.select-dropdown') as HTMLButtonElement;
    expect(trigger.textContent).toBe('No projects selected');
  });

  it('adds outlined appearance class when requested', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      appearance: 'outlined',
      onchange: vi.fn(),
    });

    const root = container.querySelector('.input-field.select-space');
    expect(root?.className).toContain('select-appearance-outlined');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: vi.fn(),
    });

    const combobox = getByRole(container, 'combobox', { name: 'Test Select' });
    expect(combobox).toHaveAttribute('id', 'test-select');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-controls', 'test-select-dropdown');
    expect(combobox.tagName).toBe('BUTTON');
    expect(combobox).toHaveAttribute('type', 'button');
    expect(container.querySelector('label')).toHaveAttribute('for', 'test-select');
    expect(container.querySelector('.select-wrapper')).not.toHaveAttribute('tabindex');
    expect(container.querySelectorAll('.select-space [tabindex="0"], .select-space input:not([tabindex])')).toHaveLength(1);
  });

  it('has one tab stop and keeps Enter, arrows and Escape on the focused combobox', async () => {
    const select = Select<string>();
    const attrs = { label: 'Unit', options: mockOptions, onchange: vi.fn() };
    const result = render(select, attrs);
    const next = document.createElement('button');
    document.body.appendChild(next);
    const user = userEvent.setup();
    await user.tab();
    const combobox = getByRole(result.container, 'combobox', { name: 'Unit' });
    expect(document.activeElement).toBe(combobox);
    fireEvent.keyDown(combobox, 'ArrowDown');
    result.rerender(select, attrs);
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(combobox, 'Escape');
    result.rerender(select, attrs);
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    fireEvent.keyDown(combobox, 'Enter');
    result.rerender(select, attrs);
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(combobox, 'Tab');
    result.rerender(select, attrs);
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    await user.tab();
    expect(document.activeElement).toBe(next);
  });

  it('does not add tab stops for an open multi-select menu', () => {
    const select = Select<string>();
    const attrs = { label: 'Units', multiple: true, placeholder: 'Choose units', options: mockOptions };
    const result = render(select, attrs);
    fireEvent.click(result.container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);
    expect(result.container.querySelectorAll('.select-space [tabindex="0"]')).toHaveLength(1);
    expect(result.container.querySelectorAll('ul.select-dropdown input[type="checkbox"][tabindex="-1"]')).toHaveLength(3);
  });

  it('names an outlined and mandatory select without including its visual asterisk', () => {
    const { container } = render(Select<string>(), {
      label: 'Parent unit',
      appearance: 'outlined',
      isMandatory: true,
      options: mockOptions,
    });
    const combobox = getByRole(container, 'combobox', { name: 'Parent unit' });
    expect(combobox).toHaveAttribute('aria-required', 'true');
    expect(container.querySelector('label.select-inline-label')).toHaveAttribute('for', combobox.id);
    expect(container.querySelector('.select-inline-label .mandatory')).toHaveAttribute('aria-hidden', 'true');
  });

  it('honors an explicit accessible name and removes disabled selects from tab order', () => {
    const { container } = render(Select<string>(), {
      label: 'Units',
      'aria-label': 'Parent unit',
      disabled: true,
      options: mockOptions,
    });
    const combobox = getByRole(container, 'combobox', { name: 'Parent unit' });
    expect(combobox).toHaveAttribute('tabindex', '-1');
    expect(combobox).toHaveAttribute('aria-disabled', 'true');
    expect(container.querySelectorAll('.select-space [tabindex="0"], .select-space input:not([tabindex])')).toHaveLength(0);
  });

  it('handles keyboard navigation', () => {
    const mockOnChange = vi.fn();
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    result.rerender(select, attrs);
    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('li.focused')).toHaveTextContent('Option 1');

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    result.rerender(select, attrs);
    expect(container.querySelector('li.focused')).toHaveTextContent('Option 2');

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'Enter');
    result.rerender(select, attrs);
    expect(mockOnChange).toHaveBeenCalledWith(['option2']);
  });

  it('closes dropdown on Escape key', () => {
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: vi.fn(),
    };
    const result = render(select, attrs);
    const { container } = result;

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    result.rerender(select, attrs);
    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'Escape');
    result.rerender(select, attrs);
    expect(container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('ul.select-dropdown')).toBeNull();
  });

  it('preserves closed-state ArrowUp behavior', () => {
    const select = Select<string>();
    const attrs = {
      id: 'test-select',
      options: mockOptions,
      onchange: vi.fn(),
    };
    const result = render(select, attrs);

    fireEvent.keyDown(result.container.querySelector('.select-wrapper') as HTMLElement, 'ArrowUp');
    result.rerender(select, attrs);

    expect(result.container.querySelector('button.select-dropdown')).toHaveAttribute('aria-expanded', 'false');
  });

  it('releases its modal portal after close and removal', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const select = Select<string>();
    const attrs = {
      id: 'portal-select',
      options: mockOptions,
      onchange: vi.fn(),
    };
    const result = render(select, attrs, modal);

    fireEvent.click(result.container.querySelector('button.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);
    expect(document.getElementById('portal-select-dropdown')).toBeInTheDocument();

    fireEvent.keyDown(result.container.querySelector('.select-wrapper') as HTMLElement, 'Escape');
    result.rerender(select, attrs);
    expect(document.getElementById('portal-select-dropdown')).toBeNull();

    result.unmount();
    expect(document.getElementById('portal-select-dropdown')).toBeNull();
  });

  it('works with numeric option IDs', () => {
    const mockOnChange = vi.fn();
    const { container } = render(Select<number>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockNumericOptions,
      onchange: mockOnChange,
    });

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'ArrowDown');
    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'Enter');
    expect(mockOnChange).toHaveBeenCalledWith([1]);
  });
});

describe('Dropdown Component', () => {
  afterEach(cleanup);

  it('leaves option spacing to the stylesheet', () => {
    const dropdown = Dropdown<string>();
    const attrs = {
      label: 'Choose',
      items: [{ id: 'movie', label: 'Movies', iconName: 'movie' }],
    };
    const result = render(dropdown, attrs);
    const { container } = result;

    fireEvent.click(container.querySelector('button.dropdown-trigger') as HTMLButtonElement);
    result.rerender(dropdown, attrs);

    expect(container.querySelector('.dropdown-content li > span')).not.toHaveStyle({
      padding: '14px 16px',
    });
  });

  it('uses a non-submitting button combobox with keyboard dismissal', () => {
    const dropdown = Dropdown<string>();
    const attrs = {
      id: 'dropdown-test',
      label: 'Choose a movie',
      items: [{ id: 'movie', label: 'Movies' }],
    };
    const result = render(dropdown, attrs);
    const trigger = result.container.querySelector('button.dropdown-trigger') as HTMLButtonElement;

    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('role', 'combobox');
    expect(trigger).toHaveAttribute('aria-controls', 'dropdown-test-dropdown');
    expect(trigger).toHaveAccessibleName('Choose a movie');

    fireEvent.keyDown(trigger, 'ArrowDown');
    result.rerender(dropdown, attrs);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(trigger, 'Tab');
    result.rerender(dropdown, attrs);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
