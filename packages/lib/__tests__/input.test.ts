import { TextInput, NumberInput, TextArea, EmailInput, PasswordInput } from '../src/input';
import { render, fireEvent, cleanup } from '../src/test-utils';

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

    it('renders with initial value', () => {
      const { getByDisplayValue } = render(TextInput, { 
        label: 'Name',
        initialValue: 'John Doe'
      });
      
      const input = getByDisplayValue('John Doe');
      expect(input).toBeInTheDocument();
    });

    it('handles change events', () => {
      const mockChange = jest.fn();
      const { getByLabelText } = render(TextInput, { 
        label: 'Name',
        onchange: mockChange
      });
      
      const input = getByLabelText('Name') as HTMLInputElement;
      fireEvent.change(input, 'New Value');
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
      expect(mockChange).toHaveBeenCalledWith(42);
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
      expect(mockChange).toHaveBeenCalledWith('New message content');
    });

    it('renders with initial value', () => {
      const { getByDisplayValue } = render(TextArea, { 
        label: 'Bio',
        initialValue: 'Initial bio content'
      });
      
      const textarea = getByDisplayValue('Initial bio content');
      expect(textarea).toBeInTheDocument();
    });
  });
});