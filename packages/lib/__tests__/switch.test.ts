import { Switch } from '../src/switch';
import { render, fireEvent, cleanup } from '../src/test-utils';

describe('Switch Component', () => {
  afterEach(cleanup);

  it('renders with default labels', () => {
    const { container } = render(Switch, {});
    
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toContain('Off');
    expect(label?.textContent).toContain('On');
  });

  it('renders with custom labels', () => {
    const { container } = render(Switch, {
      left: 'Disabled',
      right: 'Enabled'
    });
    
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toContain('Disabled');
    expect(label?.textContent).toContain('Enabled');
  });

  it('renders with label', () => {
    const { getByText } = render(Switch, {
      label: 'Enable notifications'
    });
    
    expect(getByText('Enable notifications')).toBeInTheDocument();
  });

  it('handles initial checked state', () => {
    const { container } = render(Switch, {
      checked: true
    });
    
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('handles change events', () => {
    const mockChange = jest.fn();
    const { container } = render(Switch, {
      onchange: mockChange
    });
    
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    
    expect(mockChange).toHaveBeenCalledWith(true);
  });

  it('renders disabled state', () => {
    const { container } = render(Switch, {
      disabled: true
    });
    
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });

  it('shows mandatory indicator when required', () => {
    const { container } = render(Switch, {
      label: 'Required Switch',
      isMandatory: true
    });
    
    const mandatory = container.querySelector('span.mandatory');
    expect(mandatory).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(Switch, {
      className: 'custom-switch'
    });
    
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('custom-switch');
  });

  it('includes lever element for styling', () => {
    const { container } = render(Switch, {});
    
    const lever = container.querySelector('span.lever');
    expect(lever).toBeInTheDocument();
  });

  it('handles toggle from unchecked to checked', () => {
    const mockChange = jest.fn();
    const { container } = render(Switch, {
      checked: false,
      onchange: mockChange
    });
    
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    expect(mockChange).toHaveBeenCalledWith(true);
  });

  it('handles toggle from checked to unchecked', () => {
    const mockChange = jest.fn();
    const { container } = render(Switch, {
      checked: true,
      onchange: mockChange
    });
    
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(mockChange).toHaveBeenCalledWith(false);
  });
});