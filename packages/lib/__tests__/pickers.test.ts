import { DatePicker, TimePicker, IDatePickerOptions, ITimePickerOptions } from '../src/pickers';
import { IInputOptions } from '../src/input-options';
import { render, fireEvent, cleanup } from '../src/test-utils';

describe('DatePicker Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultDatePickerAttrs: IInputOptions<Date> & IDatePickerOptions = {
    label: 'Select Date',
  };

  test('renders date picker with correct structure', () => {
    const { container } = render(DatePicker, defaultDatePickerAttrs);

    const inputField = container.querySelector('.input-field');
    const input = container.querySelector('input.datepicker');
    const label = container.querySelector('label');

    expect(inputField).toBeTruthy();
    expect(input).toBeTruthy();
    expect(label?.textContent).toBe('Select Date');
  });

  test('renders with initial date value', () => {
    const initialDate = new Date('2023-06-15');
    const { container } = render(DatePicker, { 
      ...defaultDatePickerAttrs, 
      initialValue: initialDate 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2023/06/15');
  });

  test('opens picker when input is clicked', () => {
    const { container } = render(DatePicker, defaultDatePickerAttrs);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    const popup = container.querySelector('.datepicker-popup');
    expect(popup).toBeTruthy();
  });

  test('calls onOpen callback when picker opens', () => {
    const onOpen = jest.fn();
    const { container } = render(DatePicker, { 
      ...defaultDatePickerAttrs, 
      onOpen 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    expect(onOpen).toHaveBeenCalled();
  });

  test('handles date selection', () => {
    const onchange = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(DatePicker, { 
      ...defaultDatePickerAttrs, 
      onchange, 
      onSelect 
    });

    // Open picker
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    // Select a date
    const dateInput = container.querySelector('.datepicker-popup input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, '2023-06-15');

    expect(onSelect).toHaveBeenCalledWith(expect.any(Date));
    expect(onchange).toHaveBeenCalledWith(expect.any(Date));
  });

  test('applies disabled state', () => {
    const { container } = render(DatePicker, { 
      ...defaultDatePickerAttrs, 
      disabled: true 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.style.cursor).toBe('not-allowed');
  });

  test('renders with icon prefix', () => {
    const { container } = render(DatePicker, { 
      ...defaultDatePickerAttrs, 
      iconName: 'date_range' 
    });

    const icon = container.querySelector('i.material-icons.prefix');
    expect(icon?.textContent).toBe('date_range');
  });
});

describe('TimePicker Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultTimePickerAttrs: IInputOptions & ITimePickerOptions = {
    label: 'Select Time',
  };

  test('renders time picker with correct structure', () => {
    const { container } = render(TimePicker, defaultTimePickerAttrs);

    const inputField = container.querySelector('.input-field.timepicker');
    const input = container.querySelector('input');
    const label = container.querySelector('label');

    expect(inputField).toBeTruthy();
    expect(input).toBeTruthy();
    expect(label?.textContent).toBe('Select Time');
  });

  test('renders with initial time value', () => {
    const { container } = render(TimePicker, { 
      ...defaultTimePickerAttrs, 
      initialValue: '14:30' 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('14:30');
  });

  test('formats time in 12-hour format when specified', () => {
    const { container } = render(TimePicker, { 
      ...defaultTimePickerAttrs,
      initialValue: '14:30',
      twelveHour: true 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2:30 PM');
  });

  test('opens picker when input is clicked', () => {
    const { container } = render(TimePicker, defaultTimePickerAttrs);

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    const popup = container.querySelector('.timepicker-popup');
    expect(popup).toBeTruthy();
  });

  test('calls onOpen callback when picker opens', () => {
    const onOpen = jest.fn();
    const { container } = render(TimePicker, { 
      ...defaultTimePickerAttrs, 
      onOpen 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    expect(onOpen).toHaveBeenCalled();
  });

  test('handles time selection', () => {
    const onchange = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(TimePicker, { 
      ...defaultTimePickerAttrs, 
      onchange, 
      onSelect 
    });

    // Open picker
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    // Select a time
    const timeInput = container.querySelector('.timepicker-popup input[type="time"]') as HTMLInputElement;
    fireEvent.change(timeInput, '14:30');

    expect(onSelect).toHaveBeenCalledWith(14, 30);
    expect(onchange).toHaveBeenCalledWith('14:30');
  });

  test('applies disabled state', () => {
    const { container } = render(TimePicker, { 
      ...defaultTimePickerAttrs, 
      disabled: true 
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.style.cursor).toBe('not-allowed');
  });
});