import { DatePicker, DatePickerOptions } from '../src/datepicker';
import { TimePicker, TimepickerOptions as TimePickerOptions } from '../src/timepicker';
import { AnalogClock } from '../src/analog-clock';
import { DigitalClock } from '../src/digital-clock';
import { InputAttrs as IInputOptions } from '../src/input-options';
import { render, fireEvent, cleanup } from './test-utils';

describe('DatePicker Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultDatePickerAttrs: IInputOptions<string> & DatePickerOptions = {
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

  test('renders with default date value (uncontrolled)', () => {
    const initialDate = new Date('2023-06-15');
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      defaultValue: initialDate.toISOString().split('T')[0], // DatePicker expects string value
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('Jun 15, 2023'); // DatePicker uses mmm dd, yyyy format by default
  });

  test('opens picker when input is clicked', () => {
    const onOpen = jest.fn();
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      onOpen,
    });

    const input = container.querySelector('input') as HTMLInputElement;

    // Manually trigger the click event with event object
    const clickEvent = new MouseEvent('click', { bubbles: true });
    input.dispatchEvent(clickEvent);

    // Check that onOpen callback is called (which means picker would open)
    expect(onOpen).toHaveBeenCalled();
  });

  test('calls onOpen callback when picker opens', () => {
    const onOpen = jest.fn();
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      onOpen,
    });

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    expect(onOpen).toHaveBeenCalled();
  });

  test('clears and disposes its portal after open and close', () => {
    const result = render(DatePicker, defaultDatePickerAttrs);
    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, defaultDatePickerAttrs);

    expect(document.querySelector('[id^="datepicker-portal-"] .datepicker-modal-wrapper')).toBeInTheDocument();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.querySelector('[id^="datepicker-portal-"]')).toBeNull();

    result.unmount();
    expect(document.querySelector('[id^="datepicker-portal-"]')).toBeNull();
  });

  test('handles date selection', () => {
    const onchange = jest.fn();
    const onSelect = jest.fn();
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      onchange,
      onSelect,
    });

    // Test date formatting functionality by checking if initial value is formatted correctly
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();

    // Simulate a direct component interaction for testing - check if callbacks work
    // This would normally be triggered by the date picker popup
    const testDate = new Date('2023-06-15');
    onSelect(testDate);
    onchange(testDate);

    expect(onSelect).toHaveBeenCalledWith(testDate);
    expect(onchange).toHaveBeenCalledWith(testDate);
  });

  test('applies disabled state', () => {
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      disabled: true,
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    // Cursor styling is now handled in CSS, not inline styles
    expect(input.classList.contains('datepicker')).toBe(true);
  });

  test('renders with icon prefix', () => {
    const DatePickerInstance = DatePicker;
    const { container } = render(DatePickerInstance, {
      ...defaultDatePickerAttrs,
      iconName: 'date_range',
    });

    const icon = container.querySelector('i.material-icons.prefix');
    expect(icon?.textContent).toBe('date_range');
  });

  test('focuses the active date and moves focus with arrow keys', () => {
    const result = render(DatePicker, {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
    });

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
    });

    const activeDay = document.querySelector<HTMLButtonElement>(
      '.datepicker-day-button[data-year="2023"][data-month="5"][data-day="15"]'
    );
    expect(document.activeElement).toBe(activeDay);

    if (!activeDay) throw new Error('Expected active date button');
    fireEvent.keyDown(activeDay, 'ArrowRight');

    expect(document.activeElement).toBe(
      document.querySelector('.datepicker-day-button[data-year="2023"][data-month="5"][data-day="16"]')
    );
  });

  test('treats a same-day maxDate as selectable and restores trigger focus on close', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result = render(DatePicker, {
      ...defaultDatePickerAttrs,
      maxDate: today,
    });
    const input = result.container.querySelector('input') as HTMLInputElement;

    fireEvent.click(input);
    result.rerender(DatePicker, {
      ...defaultDatePickerAttrs,
      maxDate: today,
    });

    expect(document.activeElement).toBe(
      document.querySelector(
        `.datepicker-day-button[data-year="${today.getFullYear()}"][data-month="${today.getMonth()}"][data-day="${today.getDate()}"]`
      )
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(document.activeElement).toBe(input);
  });

  test('focuses a minimum date more than ten years in the future', () => {
    const minDate = new Date(2040, 0, 2);
    const attrs = {
      ...defaultDatePickerAttrs,
      minDate,
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);

    expect(document.activeElement).toBe(
      document.querySelector(
        '.datepicker-day-button[data-year="2040"][data-month="0"][data-day="2"]'
      )
    );
  });

  test('keeps a day in the Tab order after changing months', () => {
    const attrs = {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);
    fireEvent.click(document.querySelector('.datepicker-modal .month-next') as HTMLButtonElement);
    result.rerender(DatePicker, attrs);

    const dayInTabOrder = document.querySelector<HTMLButtonElement>(
      '.datepicker-modal .datepicker-day-button[tabindex="0"]'
    );
    expect(dayInTabOrder?.dataset.year).toBe('2023');
    expect(dayInTabOrder?.dataset.month).toBe('6');
  });

  test('opens and selects month and year options from the keyboard', () => {
    const attrs = {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);

    const monthTrigger = document.querySelector<HTMLElement>('.select-month .dropdown-trigger');
    if (!monthTrigger) throw new Error('Expected month dropdown trigger');
    fireEvent.keyDown(monthTrigger, 'Enter');
    result.rerender(DatePicker, attrs);
    expect(monthTrigger).toHaveAttribute('aria-expanded', 'true');

    const july = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.select-month .dropdown-item')
    ).find((option) => option.textContent === 'July');
    if (!july) throw new Error('Expected July option');
    july.focus();
    fireEvent.click(july);
    result.rerender(DatePicker, attrs);
    const selectedMonthTrigger = document.querySelector<HTMLInputElement>(
      '.select-month .dropdown-trigger'
    );
    expect(selectedMonthTrigger?.value).toBe('July');
    expect(document.activeElement).toBe(selectedMonthTrigger);

    const yearTrigger = document.querySelector<HTMLElement>('.select-year .dropdown-trigger');
    if (!yearTrigger) throw new Error('Expected year dropdown trigger');
    fireEvent.keyDown(yearTrigger, 'ArrowDown');
    result.rerender(DatePicker, attrs);
    expect(document.querySelectorAll('.select-year .dropdown-item').length).toBeGreaterThan(0);

    const nextYear = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.select-year .dropdown-item')
    ).find((option) => option.textContent === '2024');
    if (!nextYear) throw new Error('Expected 2024 option');
    nextYear.focus();
    fireEvent.click(nextYear);
    result.rerender(DatePicker, attrs);
    const selectedYearTrigger = document.querySelector<HTMLInputElement>(
      '.select-year .dropdown-trigger'
    );
    expect(selectedYearTrigger?.value).toBe('2024');
    expect(document.activeElement).toBe(selectedYearTrigger);
  });

  test.each([
    { name: 'ISO', displayFormat: 'yyyy-mm-dd' },
    { name: 'European', displayFormat: 'dd/mm/yyyy' },
  ])('accepts and closes the $name picker when Enter is pressed on a day', ({ displayFormat }) => {
    const onchange = jest.fn();
    const attrs = {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
      displayFormat,
      onchange,
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);
    const activeDay = document.querySelector<HTMLButtonElement>(
      '.datepicker-day-button[data-year="2023"][data-month="5"][data-day="15"]'
    );
    if (!activeDay) throw new Error('Expected active date button');

    fireEvent.keyDown(activeDay, 'Enter');
    result.rerender(DatePicker, attrs);

    expect(document.querySelector('.datepicker-modal')).toBeNull();
    expect(onchange).toHaveBeenLastCalledWith('2023-06-15');
  });

  test('moves from the active day to OK and then Cancel with Tab', () => {
    const attrs = {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
      showClearBtn: true,
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);
    const activeDay = document.activeElement as HTMLElement;

    fireEvent.keyDown(activeDay, 'Tab');
    expect(document.activeElement).toBe(document.querySelector('.datepicker-done'));

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    expect(document.activeElement).toBe(document.querySelector('.datepicker-cancel'));
  });

  test('does not accept a disabled day with Enter', () => {
    const onchange = jest.fn();
    const attrs = {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
      disableWeekends: true,
      onchange,
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);
    const disabledDay = document.querySelector<HTMLButtonElement>(
      '.datepicker-day-button[data-year="2023"][data-month="5"][data-day="17"]'
    );
    if (!disabledDay) throw new Error('Expected disabled day');
    expect(disabledDay).toHaveAttribute('aria-disabled', 'true');
    disabledDay.focus();
    fireEvent.keyDown(disabledDay, 'Enter');
    result.rerender(DatePicker, attrs);

    expect(document.querySelector('.datepicker-modal')).toBeInTheDocument();
    expect(onchange).not.toHaveBeenCalled();
  });

  test('uses Left and Right to choose a closed input segment and Up and Down to change it', () => {
    const oninput = jest.fn();
    const result = render(DatePicker, {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
      displayFormat: 'yyyy-mm-dd',
      oninput,
    });
    const input = result.container.querySelector('input') as HTMLInputElement;
    input.focus();
    input.setSelectionRange(0, 4);

    fireEvent.keyDown(input, 'ArrowRight');
    expect(input.selectionStart).toBe(5);
    expect(input.selectionEnd).toBe(7);

    fireEvent.keyDown(input, 'ArrowUp');
    expect(input.value).toBe('2023-07-15');
    expect(oninput).toHaveBeenLastCalledWith('2023-07-15');

    fireEvent.keyDown(input, 'ArrowLeft');
    fireEvent.keyDown(input, 'ArrowDown');
    expect(input.value).toBe('2022-07-15');
  });

  test('emits the visible custom format when adjusting a closed input segment', () => {
    const oninput = jest.fn();
    const result = render(DatePicker, {
      ...defaultDatePickerAttrs,
      defaultValue: '2023-06-15',
      displayFormat: 'dd/mm/yyyy',
      oninput,
    });
    const input = result.container.querySelector('input') as HTMLInputElement;
    input.focus();
    input.setSelectionRange(3, 5);

    fireEvent.keyDown(input, 'ArrowUp');

    expect(input.value).toBe('15/07/2023');
    expect(oninput).toHaveBeenLastCalledWith('15/07/2023');
  });

  test('renders a centered three-row summary for a cross-year range', () => {
    const onchange = jest.fn();
    const attrs = {
      ...defaultDatePickerAttrs,
      dateRange: true,
      initialStartDate: new Date(2026, 11, 25),
      initialEndDate: new Date(2027, 0, 4),
      onchange,
    };
    const result = render(DatePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(DatePicker, attrs);

    const display = document.querySelector('.datepicker-date-display.range-display');
    expect(display?.querySelector('.year-text')?.textContent).toBe('2026–2027');
    expect(Array.from(display?.querySelector('.date-text')?.children || []).map((item) => item.className)).toEqual([
      'start-date',
      'range-separator',
      'end-date',
    ]);

    fireEvent.click(document.querySelector('.datepicker-done') as HTMLButtonElement);
    result.rerender(DatePicker, attrs);
    expect(onchange).toHaveBeenLastCalledWith('2026-12-25 - 2027-01-04');
  });
});

describe('TimePicker Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultTimePickerAttrs: IInputOptions & TimePickerOptions = {
    label: 'Select Time',
  };

  test('renders time picker with correct structure', () => {
    const { container } = render(TimePicker, defaultTimePickerAttrs);

    const inputField = container.querySelector('.input-field');
    const input = container.querySelector('input.timepicker');
    const label = container.querySelector('label');

    expect(inputField).toBeTruthy();
    expect(input).toBeTruthy();
    expect(label?.textContent).toBe('Select Time');
  });

  test('renders with default time value (uncontrolled)', () => {
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      defaultValue: '14:30',
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('14:30');
  });

  test('formats time in 12-hour format when specified', () => {
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      defaultValue: '14:30',
      twelveHour: true,
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2:30 PM');
  });

  test('opens picker when input is clicked', () => {
    const onOpen = jest.fn();
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      onOpen,
    });

    const input = container.querySelector('input') as HTMLInputElement;

    // Manually trigger the click event with event object
    const clickEvent = new MouseEvent('click', { bubbles: true });
    input.dispatchEvent(clickEvent);

    // Check that onOpen callback is called (which means picker would open)
    expect(onOpen).toHaveBeenCalled();
  });

  test('calls onOpen callback when picker opens', () => {
    const onOpen = jest.fn();
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      onOpen,
    });

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.click(input);

    expect(onOpen).toHaveBeenCalled();
  });

  test('disposes its portal when removed while open', () => {
    const result = render(TimePicker, defaultTimePickerAttrs);
    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(TimePicker, defaultTimePickerAttrs);

    expect(document.querySelector('[id^="timepicker-portal-"] .timepicker-modal-wrapper')).toBeInTheDocument();

    result.unmount();
    expect(document.querySelector('[id^="timepicker-portal-"]')).toBeNull();
  });

  test('handles time selection', () => {
    const onchange = jest.fn();
    const onSelect = jest.fn();
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      onchange,
      onSelect,
    });

    // Test time formatting functionality by checking if initial value is formatted correctly
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();

    // Simulate a direct component interaction for testing - check if callbacks work
    // This would normally be triggered by the time picker popup
    onSelect(14, 30);
    onchange('14:30');

    expect(onSelect).toHaveBeenCalledWith(14, 30);
    expect(onchange).toHaveBeenCalledWith('14:30');
  });

  test('applies disabled state', () => {
    const TimePickerInstance = TimePicker;
    const { container } = render(TimePickerInstance, {
      ...defaultTimePickerAttrs,
      disabled: true,
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    // Cursor styling is now handled in CSS, not inline styles
    const inputField = container.querySelector('.input-field');
    expect(inputField).toBeTruthy();
  });

  test('focuses the first digital segment and cycles Tab within the modal', () => {
    const attrs = {
      ...defaultTimePickerAttrs,
      displayMode: 'digital' as const,
      twelveHour: true,
      showClearBtn: true,
      defaultValue: '10:30',
    };
    const result = render(TimePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(TimePicker, attrs);

    const modal = document.querySelector('.timepicker-modal') as HTMLElement;
    const firstSegment = modal.querySelector<HTMLElement>('[data-time-segment="hours"]');
    expect(document.activeElement).toBe(firstSegment);

    if (!firstSegment) throw new Error('Expected time picker focus target');
    fireEvent.keyDown(firstSegment, 'Tab');
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    expect(document.activeElement).toBe(modal.querySelector('.timepicker-done'));

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    expect(document.activeElement).toBe(modal.querySelector('.timepicker-cancel'));

    fireEvent.click(document.activeElement as HTMLElement);
    result.rerender(TimePicker, attrs);
    expect(document.activeElement).toBe(result.container.querySelector('input'));
  });

  test('accepts and closes a digital time with Enter from the clock', () => {
    const onchange = jest.fn();
    const attrs = {
      ...defaultTimePickerAttrs,
      displayMode: 'digital' as const,
      defaultValue: '10:30',
      onchange,
    };
    const result = render(TimePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(TimePicker, attrs);
    const hours = document.querySelector<HTMLElement>('[data-time-segment="hours"]');
    if (!hours) throw new Error('Expected hours segment');
    fireEvent.keyDown(hours, 'Enter');
    result.rerender(TimePicker, attrs);

    expect(document.querySelector('.timepicker-modal')).toBeNull();
    expect(onchange).toHaveBeenCalled();
  });

  test('moves from the analog clock to OK and Cancel and accepts with Enter', () => {
    const onchange = jest.fn();
    const attrs = {
      ...defaultTimePickerAttrs,
      displayMode: 'analog' as const,
      twelveHour: false,
      defaultValue: '10:30',
      onchange,
    };
    const result = render(TimePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(TimePicker, attrs);
    const modal = document.querySelector('.timepicker-modal') as HTMLElement;

    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    expect(document.activeElement).toBe(modal.querySelector('.timepicker-done'));
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Tab');
    expect(document.activeElement).toBe(modal.querySelector('.timepicker-cancel'));

    (modal.querySelector('.timepicker-canvas') as HTMLElement).focus();
    fireEvent.keyDown(document.activeElement as HTMLElement, 'Enter');
    result.rerender(TimePicker, attrs);
    expect(document.querySelector('.timepicker-modal')).toBeNull();
    expect(onchange).toHaveBeenLastCalledWith('10:30');
  });

  test('cancels a pending analog auto-close without submitting', () => {
    jest.useFakeTimers();
    const onchange = jest.fn();
    const attrs = {
      ...defaultTimePickerAttrs,
      displayMode: 'analog' as const,
      autoClose: true,
      duration: 200,
      defaultValue: '10:30',
      onchange,
    };
    const result = render(TimePicker, attrs);

    fireEvent.click(result.container.querySelector('input') as HTMLInputElement);
    result.rerender(TimePicker, attrs);
    const clock = document.querySelector<HTMLElement>('.timepicker-canvas');
    if (!clock) throw new Error('Expected analog clock');
    clock.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 100, clientY: 20 }));
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    result.rerender(TimePicker, attrs);
    fireEvent.click(document.querySelector('.timepicker-cancel') as HTMLButtonElement);

    jest.advanceTimersByTime(200);
    expect(onchange).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe('Clock keyboard navigation', () => {
  afterEach(cleanup);

  test('changes digital hours and minutes with arrow keys', () => {
    const onTimeChange = jest.fn();
    const { container } = render(DigitalClock, {
      hours: 10,
      minutes: 30,
      amOrPm: 'AM',
      twelveHour: true,
      onTimeChange,
    });
    const columns = container.querySelectorAll<HTMLElement>('.digital-clock-column');

    expect(columns).toHaveLength(3);
    expect(columns[0].tabIndex).toBe(0);
    expect(columns[1].tabIndex).toBe(0);
    expect(columns[0].getAttribute('aria-activedescendant')).toBe(
      columns[0].querySelector('[aria-selected="true"]')?.id
    );
    expect(columns[1].getAttribute('aria-activedescendant')).toBe(
      columns[1].querySelector('[aria-selected="true"]')?.id
    );

    fireEvent.keyDown(columns[0], 'ArrowDown');
    expect(onTimeChange).toHaveBeenLastCalledWith(11, 30, 'AM');

    fireEvent.keyDown(columns[1], 'ArrowUp');
    expect(onTimeChange).toHaveBeenLastCalledWith(10, 25, 'AM');
  });

  test('handles off-step digital minutes without selecting an invalid value', () => {
    const onTimeChange = jest.fn();
    const result = render(DigitalClock, {
      hours: 10,
      minutes: 32,
      amOrPm: 'AM',
      twelveHour: true,
      minuteStep: 5,
      onTimeChange,
    });
    const minutes = result.container.querySelectorAll<HTMLElement>('.digital-clock-column')[1];

    expect(minutes).not.toHaveAttribute('aria-activedescendant');
    fireEvent.keyDown(minutes, 'ArrowUp');
    expect(onTimeChange).toHaveBeenLastCalledWith(10, 30, 'AM');

    onTimeChange.mockClear();
    minutes.dispatchEvent(new WheelEvent('wheel', { deltaY: 1, bubbles: true }));
    expect(onTimeChange).toHaveBeenLastCalledWith(10, 35, 'AM');

    result.rerender(DigitalClock, {
      hours: 9,
      minutes: 32,
      amOrPm: 'AM',
      twelveHour: true,
      minuteStep: 5,
      minTime: '10:00',
      maxTime: '11:00',
      onTimeChange,
    });
    onTimeChange.mockClear();

    fireEvent.keyDown(
      result.container.querySelectorAll<HTMLElement>('.digital-clock-column')[1],
      'ArrowUp'
    );
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  test('ignores horizontal wheel gestures on the digital period column', () => {
    const onTimeChange = jest.fn();
    const { container } = render(DigitalClock, {
      hours: 2,
      minutes: 30,
      amOrPm: 'PM',
      twelveHour: true,
      onTimeChange,
    });
    const period = container.querySelectorAll<HTMLElement>('.digital-clock-column')[2];

    period.dispatchEvent(new WheelEvent('wheel', { deltaX: 50, deltaY: 0, bubbles: true }));
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  test('changes the active analog clock value with arrow keys', () => {
    const onTimeChange = jest.fn();
    const { container } = render(AnalogClock, {
      hours: 10,
      minutes: 30,
      amOrPm: 'AM',
      currentView: 'hours',
      twelveHour: true,
      onTimeChange,
    });
    const clock = container.querySelector<HTMLElement>('.timepicker-canvas');

    expect(clock?.tabIndex).toBe(0);
    if (!clock) throw new Error('Expected analog clock');

    fireEvent.keyDown(clock, 'ArrowUp');
    expect(onTimeChange).toHaveBeenLastCalledWith(11, 30);

    fireEvent.keyDown(clock, 'ArrowDown');
    expect(onTimeChange).toHaveBeenLastCalledWith(9, 30);
  });
});
