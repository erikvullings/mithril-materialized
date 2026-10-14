import { Button, ConfirmButton, FlatButton, RoundIconButton, SubmitButton } from '../src/button';
import { ToggleButton } from '../src';
import { FloatingActionButton } from '../src/floating-action-button';
import { render, fireEvent, cleanup } from './test-utils';
import { getByRole } from '@testing-library/dom';

describe('Button Components', () => {
  afterEach(cleanup);

  describe('Button', () => {
    it('renders built-in icons without a font and preserves labels for links', () => {
      const { container } = render(Button, { label: 'Delete', iconName: 'delete', href: '/remove' });
      const link = getByRole(container, 'link', { name: 'Delete' });
      expect(link.querySelector('svg path')).toBeInTheDocument();
      expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with label', () => {
      const { getByText } = render(Button, { label: 'Test Button' });
      const button = getByText('Test Button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
    });

    it('renders with icon', () => {
      const { container } = render(Button, {
        label: 'Test Button',
        iconName: 'add',
      });
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('add');
    });

    it('handles click events', () => {
      const mockClick = jest.fn();
      const { getByText } = render(Button, {
        label: 'Test Button',
        onclick: mockClick,
      });

      const button = getByText('Test Button');
      fireEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('renders action buttons as native buttons', () => {
      const { getByText } = render(Button, {
        label: 'Submit Button',
        variant: 'submit',
      });

      const button = getByText('Submit Button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders buttons with href as links without a type attribute', () => {
      const { getByText } = render(Button, {
        label: 'Documentation',
        href: '/docs',
        variant: 'submit',
      });

      const link = getByText('Documentation');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/docs');
      expect(link).not.toHaveAttribute('type');
    });

    it('renders with tooltip', () => {
      const { getByText } = render(Button, {
        label: 'Tooltip Button',
        tooltip: 'This is a tooltip',
        tooltipPostion: 'bottom',
      });

      const button = getByText('Tooltip Button');
      expect(button).toHaveClass('tooltipped');
      expect(button).toHaveAttribute('data-tooltip', 'This is a tooltip');
      expect(button).toHaveAttribute('data-position', 'bottom');
    });

    it('applies custom className', () => {
      const { getByText } = render(Button, {
        label: 'Custom Button',
        className: 'custom-class',
      });

      const button = getByText('Custom Button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders disabled button', () => {
      const { getByText } = render(Button, {
        label: 'Disabled Button',
        disabled: true,
      });

      const button = getByText('Disabled Button');
      expect(button).toHaveAttribute('disabled');
    });
  });

  describe('FlatButton', () => {
    it('renders with flat button classes', () => {
      const { getByText } = render(FlatButton, { label: 'Flat Button' });
      const button = getByText('Flat Button');
      expect(button).toHaveClass('btn-flat');
      expect(button).toHaveClass('waves-teal');
    });
  });

  describe('RoundIconButton', () => {
    it('renders with floating action button classes', () => {
      const { container } = render(RoundIconButton, { iconName: 'add' });
      const button = container.querySelector('button');
      expect(button).toHaveClass('btn-floating');
      expect(button).toHaveClass('waves-effect');
      expect(button).toHaveClass('waves-light');
    });
  });

  describe('ConfirmButton', () => {
    it('uses decorative SVG icons and a single written label in both states', () => {
      const attrs = { label: 'Delete', iconName: 'delete', confirmIconName: 'check' };
      const result = render(ConfirmButton, attrs);
      const button = getByRole(result.container, 'button', { name: 'Delete' });
      expect(button.querySelector('svg path')).toBeInTheDocument();
      expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(button).not.toHaveTextContent('delete');

      fireEvent.click(button);
      result.rerender(ConfirmButton, attrs);
      expect(getByRole(result.container, 'button', { name: 'Delete' }).querySelector('svg path')).toBeInTheDocument();
      expect(button).not.toHaveTextContent('check');
    });

    it('names icon-only confirmation states and honors caller-provided names', () => {
      const result = render(ConfirmButton, {});
      const button = getByRole(result.container, 'button', { name: 'Delete' });
      fireEvent.click(button);
      result.rerender(ConfirmButton, {});
      expect(getByRole(result.container, 'button', { name: 'Confirm delete' })).toBeInTheDocument();

      const explicit = render(ConfirmButton, { 'aria-label': 'Remove item' });
      expect(getByRole(explicit.container, 'button', { name: 'Remove item' })).toBeInTheDocument();
      fireEvent.click(explicit.container.querySelector('button') as HTMLButtonElement);
      explicit.rerender(ConfirmButton, { 'aria-label': 'Remove item' });
      expect(getByRole(explicit.container, 'button', { name: 'Remove item' })).toBeInTheDocument();
    });

    it('uses a theme-overridable size while awaiting confirmation', () => {
      const result = render(ConfirmButton, {});
      const { container } = result;

      fireEvent.click(container.querySelector('button') as HTMLButtonElement);
      result.rerender(ConfirmButton, {});

      const button = container.querySelector('button') as HTMLButtonElement;
      expect(button.style.width).toBe('var(--mm-confirm-button-size, 36px)');
      expect(button.style.height).toBe('var(--mm-confirm-button-size, 36px)');
    });
  });

  describe('SubmitButton', () => {
    it('renders with submit type', () => {
      const { container } = render(SubmitButton, { label: 'Submit' });
      const button = container.querySelector('button[type="submit"]');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn');
    });
  });

  describe('FloatingActionButton', () => {
    it('names icon-only actions and hides closed child actions from tab order', () => {
      const attrs = {
        iconName: 'expand',
        buttons: [{ iconName: 'delete', ariaLabel: 'Delete record' }],
      };
      const result = render(FloatingActionButton, attrs);
      const { container } = result;
      const main = getByRole(container, 'button', { name: 'expand' });
      expect(main.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(container.querySelector('ul a')).toHaveAttribute('tabindex', '-1');
      fireEvent.click(main);
      result.rerender(FloatingActionButton, attrs);
      expect(getByRole(container, 'button', { name: 'Delete record' })).toHaveAttribute('tabindex', '0');
    });
  });

  describe('package root exports', () => {
    it('exports ToggleButton from the package root', () => {
      const { container } = render(ToggleButton, { value: 'bold', label: 'Bold' });

      expect(container.querySelector('button.toggle-button')).toHaveTextContent('Bold');
    });
  });
});
