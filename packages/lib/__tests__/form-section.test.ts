import { Fieldset, FormSection } from '../src/form-section';
import { cleanup, fireEvent, render } from './test-utils';

describe('form section primitives', () => {
  afterEach(cleanup);

  it('renders a semantic fieldset with its legend, description, and group error', () => {
    const { container } = render(Fieldset, {
      id: 'preferences',
      legend: 'Contact preferences',
      description: 'Choose at least one option.',
      required: true,
      error: 'Select a contact method.',
    });

    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('aria-describedby', 'preferences-description preferences-error');
    expect(container.querySelector('legend')).toHaveTextContent('Contact preferences *');
    expect(container.querySelector('[role=alert]')).toHaveTextContent('Select a contact method.');
  });

  it('renders only supplied errors and focuses their field from the summary', () => {
    const { container } = render(FormSection, {
      title: 'Personal details',
      errors: [{ fieldId: 'email', message: 'Enter a valid email address.' }],
    });
    const input = document.createElement('input');
    input.id = 'email';
    document.body.appendChild(input);

    const summary = container.querySelector('[role=alert]');
    const errorLink = container.querySelector('a[href="#email"]') as HTMLAnchorElement;
    expect(summary).toHaveTextContent('Please correct the following errors');
    expect(errorLink).toHaveTextContent('Enter a valid email address.');

    fireEvent.click(errorLink);
    expect(document.activeElement).toBe(input);
  });

  it('does not render a validation summary without errors', () => {
    const { container } = render(FormSection, { title: 'Personal details' });
    expect(container.querySelector('[role=alert]')).toBeNull();
  });
});
