import { TextInput, NumberInput, TextArea, EmailInput, PasswordInput, RangeInput } from '../src/input';
import { render, fireEvent, cleanup } from './test-utils';

describe('Input Components', () => {
  afterEach(cleanup);

  describe('TextInput', () => {
    it('renders with label', () => {
      const { getByLabelText } = render(TextInput, { 
        label: 'Name',
        id: 'name-input'
      });
      
      const input = getByLabelText('Name');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders with default value (uncontrolled)', () => {
      const { getByDisplayValue } = render(TextInput, { 
        label: 'Name',
        defaultValue: 'John Doe'
      });
      
      const input = getByDisplayValue('John Doe');
      expect(input).toBeInTheDocument();
    });

    it('keeps the parent value until a controlled rerender supplies the update', () => {
      const oninput = jest.fn();
      const attrs = { label: 'Name', value: 'First', oninput };
      const result = render(TextInput, attrs);
      const input = result.getByLabelText('Name') as HTMLInputElement;

      fireEvent.change(input, 'Local');
      expect(oninput).toHaveBeenCalledWith('Local');

      result.rerender(TextInput, { ...attrs, value: 'Second' });
      expect(input.value).toBe('Second');
    });

    it('handles change events', () => {
      const mockChange = jest.fn();
      const { getByLabelText } = render(TextInput, { 
        label: 'Name',
        onchange: mockChange
      });
      
      const input = getByLabelText('Name') as HTMLInputElement;
      fireEvent.change(input, 'New Value');
      fireEvent.blur(input); // onchange is triggered on blur
      expect(mockChange).toHaveBeenCalledWith('New Value');
    });

    it('renders with helper text', () => {
      const { getByText } = render(TextInput, { 
        label: 'Email',
        helperText: 'Enter your email address'
      });
      
      expect(getByText('Enter your email address')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      const { container } = render(TextInput, { 
        label: 'Search',
        iconName: 'search'
      });
      
      const icon = container.querySelector('i.material-icons.prefix');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('search');
    });

    it('shows mandatory indicator', () => {
      const { container } = render(TextInput, { 
        label: 'Required Field',
        isMandatory: true
      });
      
      const mandatory = container.querySelector('span.mandatory');
      expect(mandatory).toBeInTheDocument();
    });

    it('applies validation', () => {
      const mockValidate = jest.fn(() => true);
      const { getByLabelText } = render(TextInput, { 
        label: 'Validated Input',
        validate: mockValidate
      });
      
      const input = getByLabelText('Validated Input') as HTMLInputElement;
      fireEvent.change(input, 'test value');
      fireEvent.blur(input); // Validation now happens on blur
      expect(mockValidate).toHaveBeenCalledWith('test value', input);
    });

    it('handles keyboard events', () => {
      const mockKeyUp = jest.fn();
      const mockKeyDown = jest.fn();
      const { getByLabelText } = render(TextInput, { 
        label: 'Keyboard Input',
        onkeyup: mockKeyUp,
        onkeydown: mockKeyDown
      });
      
      const input = getByLabelText('Keyboard Input') as HTMLInputElement;
      fireEvent.keyDown(input, 'Enter');
      fireEvent.keyUp(input, 'Enter');
      
      expect(mockKeyDown).toHaveBeenCalled();
      expect(mockKeyUp).toHaveBeenCalled();
    });
  });

  describe('NumberInput', () => {
    it('renders with number type', () => {
      const { getByLabelText } = render(NumberInput, { 
        label: 'Age'
      });
      
      const input = getByLabelText('Age');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('handles numeric values', () => {
      const mockChange = jest.fn();
      const { getByLabelText } = render(NumberInput, { 
        label: 'Count',
        onchange: mockChange
      });
      
      const input = getByLabelText('Count') as HTMLInputElement;
      fireEvent.change(input, '42');
      fireEvent.blur(input); // onchange is triggered on blur
      expect(mockChange).toHaveBeenCalledWith(42);
    });

    it('hides increment and decrement controls when hideSpinners is true', () => {
      const { container } = render(NumberInput, {
        label: 'Quantity',
        hideSpinners: true,
      });

      expect(container.querySelector('.number-input-controls')).toBeNull();
    });
  });

  describe('EmailInput', () => {
    it('renders with email type', () => {
      const { getByLabelText } = render(EmailInput, { 
        label: 'Email'
      });
      
      const input = getByLabelText('Email');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('PasswordInput', () => {
    it('renders with password type', () => {
      const { getByLabelText } = render(PasswordInput, { 
        label: 'Password'
      });
      
      const input = getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('TextArea', () => {
    it('renders textarea element', () => {
      const { getByLabelText } = render(TextArea, { 
        label: 'Description'
      });
      
      const textarea = getByLabelText('Description');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('handles change events', () => {
      const mockChange = jest.fn();
      const { getByLabelText } = render(TextArea, { 
        label: 'Message',
        onchange: mockChange
      });
      
      const textarea = getByLabelText('Message') as HTMLTextAreaElement;
      fireEvent.change(textarea, 'New message content');
      fireEvent.blur(textarea); // onchange is triggered on blur
      expect(mockChange).toHaveBeenCalledWith('New message content');
    });

    it('renders with default value (uncontrolled)', () => {
      const { getByDisplayValue } = render(TextArea, { 
        label: 'Bio',
        defaultValue: 'Initial bio content'
      });
      
      const textarea = getByDisplayValue('Initial bio content');
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('RangeInput', () => {
    it('retains uncontrolled slider updates', () => {
      const onchange = jest.fn();
      const attrs = {
        label: 'Volume',
        defaultValue: 20,
        valueDisplay: 'always' as const,
        onchange,
      };
      const result = render(RangeInput, attrs);
      const slider = result.container.querySelector('.single-range-slider') as HTMLElement;

      expect(slider).toHaveAttribute('aria-valuenow', '20');
      fireEvent.keyDown(slider, 'ArrowRight');
      expect(onchange).toHaveBeenCalledWith(21);
      result.rerender(RangeInput, attrs);
      expect(result.container.querySelector('.single-range-slider')).toHaveAttribute('aria-valuenow', '21');
    });

    it('reads updated controlled slider values on rerender', () => {
      const oninput = jest.fn();
      const attrs = {
        label: 'Volume',
        value: 20,
        valueDisplay: 'always' as const,
        oninput,
      };
      const result = render(RangeInput, attrs);
      const slider = result.container.querySelector('.single-range-slider') as HTMLElement;

      expect(slider).toHaveAttribute('aria-valuenow', '20');
      result.rerender(RangeInput, { ...attrs, value: 40 });
      expect(result.container.querySelector('.single-range-slider')).toHaveAttribute('aria-valuenow', '40');
    });

    it('retains the latest controlled single value when becoming uncontrolled', () => {
      const attrs = {
        value: 40,
        valueDisplay: 'always' as const,
        oninput: jest.fn(),
      };
      const result = render(RangeInput, attrs);

      result.rerender(RangeInput, { valueDisplay: 'always' });

      expect(result.container.querySelector('.single-range-slider')).toHaveAttribute('aria-valuenow', '40');
    });

    it('retains the latest controlled double values when becoming uncontrolled', () => {
      const oninput = jest.fn();
      const result = render(RangeInput, {
        minmax: true,
        minValue: 20,
        maxValue: 80,
        oninput,
      });

      result.rerender(RangeInput, {
        minmax: true,
        minValue: 30,
        maxValue: 70,
        oninput,
      });
      result.rerender(RangeInput, { minmax: true });

      expect(result.container.querySelector('.min-thumb')).toHaveAttribute('aria-valuenow', '30');
      expect(result.container.querySelector('.max-thumb')).toHaveAttribute('aria-valuenow', '70');
    });

    it('commits the dragged controlled single value on mouseup', () => {
      const oninput = jest.fn();
      const onchange = jest.fn();
      const { container } = render(RangeInput, {
        value: 20,
        valueDisplay: 'always',
        oninput,
        onchange,
      });
      const slider = container.querySelector('.single-range-slider') as HTMLElement;
      const thumb = slider.querySelector('.thumb') as HTMLElement;
      slider.getBoundingClientRect = () =>
        ({
          left: 0,
          right: 100,
          top: 0,
          bottom: 20,
          width: 100,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }) as DOMRect;

      thumb.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 20 }));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 70 }));
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(oninput).toHaveBeenLastCalledWith(70);
      expect(onchange).toHaveBeenLastCalledWith(70);
    });

    it('commits the dragged controlled double values on mouseup', () => {
      const oninput = jest.fn();
      const onchange = jest.fn();
      const { container } = render(RangeInput, {
        minmax: true,
        minValue: 20,
        maxValue: 80,
        oninput,
        onchange,
      });
      const slider = container.querySelector('.double-range-slider') as HTMLElement;
      const minThumb = slider.querySelector('.min-thumb') as HTMLElement;
      slider.getBoundingClientRect = () =>
        ({
          left: 0,
          right: 100,
          top: 0,
          bottom: 20,
          width: 100,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }) as DOMRect;

      minThumb.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: 20 }));
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 35 }));
      document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

      expect(oninput).toHaveBeenLastCalledWith(35, 80);
      expect(onchange).toHaveBeenLastCalledWith(35, 80);
    });
  });
});
