import { SelectV2 } from '../src/select-v2';
import { render, fireEvent, cleanup } from '../src/test-utils';
import { IInputOption } from '../src/option';

describe('SelectV2 Component', () => {
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
    const { getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: jest.fn()
    });
    
    expect(getByText('Test Select')).toBeInTheDocument();
  });

  it('renders select with placeholder', () => {
    const { getByText } = render(SelectV2, {
      id: 'test-select',
      placeholder: 'Choose an option',
      options: mockOptions,
      onchange: jest.fn()
    });
    
    expect(getByText('Choose an option')).toBeInTheDocument();
  });

  it('renders all options when dropdown is opened', () => {
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: jest.fn()
    });

    // Click to open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onchange when option is selected', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange
    });

    // Open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    // Select option
    fireEvent.click(getByText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
  });

  it('handles single select correctly', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
      multiple: false
    });

    // Open dropdown and select first option
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);
    fireEvent.click(getByText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
    
    // Dropdown should close after selection
    expect(container.querySelector('.select-dropdown.active')).toBeNull();
  });

  it('handles multiple select correctly', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange,
      multiple: true
    });

    // Open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    // Select multiple options
    fireEvent.click(getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['option1']);

    fireEvent.click(getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith(['option1', 'option2']);

    // Dropdown should remain open for multiple select - check if options are still visible
    expect(getByText('Option 3')).toBeInTheDocument();
  });

  it('respects initialValue prop', () => {
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      initialValue: ['option2'],
      onchange: jest.fn()
    });

    expect(container.querySelector('.select-wrapper.has-value')).toBeInTheDocument();
    expect(container.textContent).toContain('Option 2');
  });

  it('respects checkedId prop', () => {
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      checkedId: 'option1',
      onchange: jest.fn()
    });

    expect(container.querySelector('.select-wrapper.has-value')).toBeInTheDocument();
    expect(container.textContent).toContain('Option 1');
  });

  it('handles disabled state', () => {
    const mockOnChange = jest.fn();
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      disabled: true,
      onchange: mockOnChange
    });

    const selectWrapper = container.querySelector('.select-wrapper');
    expect(selectWrapper).toHaveClass('disabled');
    
    // Should not respond to clicks when disabled
    fireEvent.click(selectWrapper!);
    expect(container.querySelector('.select-dropdown.active')).toBeNull();
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('handles disabled options', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange
    });

    // Open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    // Try to click disabled option
    const disabledOption = getByText('Option 3').closest('.select-dropdown-option');
    expect(disabledOption).toHaveClass('disabled');
    
    fireEvent.click(getByText('Option 3'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('renders with icon prefix', () => {
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      iconName: 'person',
      options: mockOptions,
      onchange: jest.fn()
    });

    const icon = container.querySelector('.material-icons.prefix');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe('person');
  });

  it('renders helper text', () => {
    const { getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      helperText: 'Choose wisely',
      options: mockOptions,
      onchange: jest.fn()
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

    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: groupedOptions,
      onchange: jest.fn()
    });

    // Open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    expect(getByText('Fruits')).toBeInTheDocument();
    expect(getByText('Vegetables')).toBeInTheDocument();
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Carrot')).toBeInTheDocument();
  });

  it('handles options with images', () => {
    const optionsWithImages: IInputOption<string>[] = [
      { id: 'option1', label: 'Option 1', img: 'https://example.com/image1.jpg' },
      { id: 'option2', label: 'Option 2', img: 'https://example.com/image2.jpg' },
    ];

    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: optionsWithImages,
      onchange: jest.fn()
    });

    // Open dropdown
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);

    const images = container.querySelectorAll('.select-dropdown-option-img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('displays multiple selected options as tags', () => {
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      initialValue: ['option1', 'option2'],
      onchange: jest.fn()
    });

    const tags = container.querySelectorAll('.select-tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toContain('Option 1');
    expect(tags[1].textContent).toContain('Option 2');
  });

  it('allows removing tags in multiple select', () => {
    const mockOnChange = jest.fn();
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      multiple: true,
      initialValue: ['option1', 'option2'],
      onchange: mockOnChange
    });

    const closeButtons = container.querySelectorAll('.select-tag-close');
    expect(closeButtons).toHaveLength(2);

    // Remove first tag
    fireEvent.click(closeButtons[0]);
    expect(mockOnChange).toHaveBeenCalledWith(['option2']);
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: jest.fn()
    });

    const selectWrapper = container.querySelector('.select-wrapper');
    expect(selectWrapper).toHaveAttribute('role', 'combobox');
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'false');
    expect(selectWrapper).toHaveAttribute('aria-haspopup', 'listbox');
    expect(selectWrapper).toHaveAttribute('tabindex', '0');

    const dropdown = container.querySelector('.select-dropdown');
    expect(dropdown).toHaveAttribute('role', 'listbox');
  });

  it.skip('handles keyboard navigation', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: mockOnChange
    });

    const selectWrapper = container.querySelector('.select-wrapper');
    
    // Press ArrowDown to open dropdown
    fireEvent.keyDown(selectWrapper!, { key: 'ArrowDown' });
    
    // Check if dropdown opened (by checking aria-expanded)
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'true');
    expect(getByText('Option 1')).toBeInTheDocument();
    
    // Verify that keyboard navigation doesn't cause errors and dropdown stays open
    fireEvent.keyDown(selectWrapper!, { key: 'ArrowDown' });
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes dropdown on Escape key', () => {
    const { container, getByText, queryByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockOptions,
      onchange: jest.fn()
    });

    const selectWrapper = container.querySelector('.select-wrapper');
    
    // Open dropdown
    fireEvent.click(selectWrapper!);
    expect(getByText('Option 1')).toBeInTheDocument();

    // Press Escape to close
    fireEvent.keyDown(selectWrapper!, { key: 'Escape' });
    
    // Options should no longer be visible or should be hidden
    // We need to wait for state change, so let's check the aria-expanded attribute instead
    expect(selectWrapper).toHaveAttribute('aria-expanded', 'false');
  });

  it('works with numeric option IDs', () => {
    const mockOnChange = jest.fn();
    const { container, getByText } = render(SelectV2, {
      id: 'test-select',
      label: 'Test Select',
      options: mockNumericOptions,
      onchange: mockOnChange
    });

    // Open dropdown and select option
    const selectWrapper = container.querySelector('.select-wrapper');
    fireEvent.click(selectWrapper!);
    fireEvent.click(getByText('Two'));

    expect(mockOnChange).toHaveBeenCalledWith([2]);
  });
});