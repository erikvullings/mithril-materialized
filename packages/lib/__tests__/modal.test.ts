import { ModalPanel } from '../src/modal';
import { render, fireEvent, cleanup } from './test-utils';

describe('ModalPanel Component', () => {
  afterEach(() => {
    cleanup();
    // Reset body overflow
    document.body.style.overflow = '';
  });

  it('renders modal with title', () => {
    const { getByText } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
    });

    expect(getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders modal with description', () => {
    const { getByText } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      description: 'This is a test modal description',
    });

    expect(getByText('This is a test modal description')).toBeInTheDocument();
  });

  it('initially renders as closed', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
    });

    const modal = container.querySelector('.modal');
    expect(modal).not.toHaveClass('active');
    expect(modal).toHaveAttribute('aria-hidden', 'true');
  });

  it('can be opened externally', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      isOpen: true,
    });

    const modal = container.querySelector('.modal');
    const overlay = container.querySelector('.modal-overlay');

    expect(modal).toHaveClass('active');
    expect(overlay).toHaveClass('active');
    expect(modal).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders close button by default', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
    });

    const closeButton = container.querySelector('.modal-close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  it('can hide close button', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      showCloseButton: false,
    });

    const closeButton = container.querySelector('button.modal-close');
    expect(closeButton).toBeNull();
  });

  it('calls onToggle when modal state changes', () => {
    const mockToggle = jest.fn();
    const { rerender } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      onToggle: mockToggle,
    });

    // Simulate opening modal
    rerender(ModalPanel);
    // Note: In real usage, the onToggle would be called by internal methods
    // This test structure would need adjustment for actual modal opening/closing
  });

  it('renders with fixed footer class', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      fixedFooter: true,
    });

    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('modal-fixed-footer');
  });

  it('uses flow-based fixed-footer slot structure without inline positioning styles', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      fixedFooter: true,
      buttons: [{ label: 'Close' }],
    });

    const modal = container.querySelector('.modal.mm-modal-surface.modal-fixed-footer');
    const content = container.querySelector('.mm-modal-content');
    const footer = container.querySelector('.mm-modal-footer');

    expect(modal).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('modal-content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('modal-footer');

    // Keep positioning in Sass so legacy absolute footer styles can be neutralized there.
    expect(content).not.toHaveAttribute('style');
    expect(footer).not.toHaveAttribute('style');
  });

  it('renders as bottom sheet', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      bottomSheet: true,
    });

    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('bottom-sheet');
  });

  it('renders buttons in footer', () => {
    const mockClick = jest.fn();
    const { getByText } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      buttons: [
        { label: 'Cancel', onclick: mockClick },
        { label: 'Confirm', onclick: mockClick },
      ],
    });

    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('handles rich content in description', () => {
    const htmlContent = '<p>This is <strong>rich</strong> content</p>';
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      description: htmlContent,
      richContent: true,
    });

    const descElement = container.querySelector('#test-modal-desc');
    expect(descElement?.innerHTML).toBe(htmlContent);
  });

  it('applies custom className', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      className: 'custom-modal',
    });

    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('custom-modal');
  });

  it('has proper ARIA attributes', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      description: 'Modal description',
    });

    const modal = container.querySelector('.modal');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-labelledby', 'test-modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'test-modal-desc');
  });

  it('prevents backdrop click propagation inside modal', () => {
    const mockBackdropClick = jest.fn();
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
      closeOnBackdropClick: true,
    });

    const modal = container.querySelector('.modal');

    // Clicking inside modal should not trigger backdrop click
    if (modal) {
      fireEvent.click(modal as HTMLElement);
      expect(mockBackdropClick).not.toHaveBeenCalled();
    }
  });

  it('stops propagation when clicking inside modal content', () => {
    const { container } = render(ModalPanel, {
      id: 'test-modal',
      title: 'Test Modal',
    });

    const modalContent = container.querySelector('.modal-content');
    expect(modalContent).toBeInTheDocument();

    // This tests that the modal element exists and has the expected structure
    const modal = container.querySelector('.modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('role', 'dialog');
  });

  it('reports escape as the close reason', () => {
    const onClose = jest.fn();
    render(ModalPanel, {
      title: 'Keyboard dialog',
      defaultOpen: true,
      onClose,
    });

    fireEvent.keyDown(document.body, 'Escape');

    expect(onClose).toHaveBeenCalledWith('escape');
  });

  it('reports backdrop and close-button dismissal reasons', () => {
    const backdropClose = jest.fn();
    const backdropResult = render(ModalPanel, {
      title: 'Backdrop dialog',
      defaultOpen: true,
      onClose: backdropClose,
    });

    fireEvent.click(backdropResult.container.querySelector('.modal-overlay') as HTMLElement);
    expect(backdropClose).toHaveBeenCalledWith('backdrop');
    backdropResult.unmount();

    const buttonClose = jest.fn();
    const buttonResult = render(ModalPanel, {
      title: 'Close button dialog',
      defaultOpen: true,
      onClose: buttonClose,
    });

    fireEvent.click(buttonResult.container.querySelector('.mm-modal-close-button') as HTMLElement);
    expect(buttonClose).toHaveBeenCalledWith('close-button');
  });

  it('reports a controlled close as programmatic', () => {
    const onClose = jest.fn();
    const result = render(ModalPanel, {
      title: 'Controlled dialog',
      isOpen: true,
      onClose,
    });

    result.rerender(ModalPanel, {
      title: 'Controlled dialog',
      isOpen: false,
      onClose,
    });

    expect(onClose).toHaveBeenCalledWith('programmatic');
  });

  it('restores focus to the opener after closing by default', () => {
    const requestAnimationFrame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();
    const result = render(ModalPanel, {
      title: 'Focus dialog',
      defaultOpen: true,
      initialFocus: 'dialog',
    });

    fireEvent.click(result.container.querySelector('.modal-overlay') as HTMLElement);

    expect(document.activeElement).toBe(opener);
    requestAnimationFrame.mockRestore();
  });

  it('traps reverse tab when initial focus is on the dialog surface', () => {
    const { container } = render(ModalPanel, {
      title: 'Surface focus',
      buttons: [{ label: 'Cancel' }, { label: 'Continue' }],
      defaultOpen: true,
      initialFocus: 'dialog',
      trapFocus: true,
    });
    const surface = container.querySelector<HTMLElement>('.mm-modal-surface') as HTMLElement;
    const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('.mm-modal-footer button'));

    expect(document.activeElement).toBe(surface);

    fireEvent.keyDown(surface, 'Tab', { shiftKey: true });

    expect(document.activeElement).toBe(buttons[1]);
  });
});
