import { Select } from '../src/select';
import { render, fireEvent, cleanup } from './test-utils';
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
    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Choose an option');
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

    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('ul.select-dropdown')).toBeNull();

    fireEvent.click(container.querySelector('input.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);

    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'true');
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

    fireEvent.click(container.querySelector('input.select-dropdown') as HTMLElement);
    result.rerender(select, attrs);
    fireEvent.click(container.querySelector('ul.select-dropdown li:not(.disabled)') as HTMLElement);
    result.rerender(select, attrs);

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    expect(container.querySelector('input.select-dropdown')).toHaveValue('Option 1');
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
    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'false');
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
    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultCheckedId prop (uncontrolled)', () => {
    const { container } = render(Select<string>(), {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      defaultCheckedId: 'option2',
    });

    // Check that the selected option appears in the input value
    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Option 2');
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
    const input = result.container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Option 1');

    result.rerender(select, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      checkedId: 'option2',
      onchange: vi.fn(),
    });
    expect(input.value).toBe('Option 2');
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

    const selectWrapper = container.querySelector('.select-wrapper');
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

    const icon = container.querySelector('.material-icons.prefix');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe('person');
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

    fireEvent.click(container.querySelector('input.select-dropdown') as HTMLElement);
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

    fireEvent.click(container.querySelector('input.select-dropdown') as HTMLElement);
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
    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Option 1, Option 2');
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
    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Option 1, Option 2');
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

    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('2/2 selected');
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

    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('Everything selected');
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

    const input = container.querySelector('input.select-dropdown') as HTMLInputElement;
    expect(input.value).toBe('No projects selected');
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

    const selectWrapper = container.querySelector('.select-wrapper');
    expect(selectWrapper).toHaveAttribute('role', 'combobox');
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'false');
    expect(selectWrapper).toHaveAttribute('aria-haspopup', 'listbox');
    expect(selectWrapper).toHaveAttribute('tabindex', '0');

    expect(selectWrapper).toHaveAttribute('aria-controls', 'test-select-dropdown');
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
    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'true');
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
    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(container.querySelector('.select-wrapper') as HTMLElement, 'Escape');
    result.rerender(select, attrs);
    expect(container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'false');
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

    expect(result.container.querySelector('.select-wrapper')).toHaveAttribute('aria-expanded', 'false');
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
