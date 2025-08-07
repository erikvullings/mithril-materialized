import { Button, FlatButton, RoundIconButton, SubmitButton } from '../src/button';
import { render, fireEvent, cleanup } from './test-utils';

describe('Button Components', () => {
  afterEach(cleanup);

  describe('Button', () => {
    it('renders with label', () => {
      const { getByText } = render(Button, { label: 'Test Button' });
      const button = getByText('Test Button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
    });

    it('renders with icon', () => {
      const { container } = render(Button, { 
        label: 'Test Button', 
        iconName: 'add' 
      });
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('add');
    });

    it('handles click events', () => {
      const mockClick = jest.fn();
      const { getByText } = render(Button, { 
        label: 'Test Button',
        onclick: mockClick
      });
      
      const button = getByText('Test Button');
      fireEvent.click(button);
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('renders with modal trigger', () => {
      const { getByText } = render(Button, { 
        label: 'Modal Button',
        modalId: 'test-modal'
      });
      
      const button = getByText('Modal Button');
      expect(button).toHaveClass('modal-trigger');
      expect(button).toHaveAttribute('href', '#test-modal');
    });

    it('renders with tooltip', () => {
      const { getByText } = render(Button, { 
        label: 'Tooltip Button',
        tooltip: 'This is a tooltip',
        tooltipPostion: 'bottom'
      });
      
      const button = getByText('Tooltip Button');
      expect(button).toHaveClass('tooltipped');
      expect(button).toHaveAttribute('data-tooltip', 'This is a tooltip');
      expect(button).toHaveAttribute('data-position', 'bottom');
    });

    it('applies custom className', () => {
      const { getByText } = render(Button, { 
        label: 'Custom Button',
        className: 'custom-class'
      });
      
      const button = getByText('Custom Button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders disabled button', () => {
      const { getByText } = render(Button, { 
        label: 'Disabled Button',
        disabled: true
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

  describe('SubmitButton', () => {
    it('renders with submit type', () => {
      const { container } = render(SubmitButton, { label: 'Submit' });
      const button = container.querySelector('button[type="submit"]');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('btn');
    });
  });
});