import m from 'mithril';
import { AlertDialog, Dialog } from '../src/dialog';
import { cleanup, fireEvent, render } from './test-utils';

describe('Dialog', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('renders labelled content and actions in extra, secondary, primary order', () => {
    const { container, getByText } = render(Dialog, {
      id: 'edit-profile',
      title: 'Edit profile',
      description: 'Update the visible account details.',
      content: m('label', 'Display name'),
      actions: [{ label: 'Help' }],
      secondaryAction: { label: 'Cancel' },
      primaryAction: { label: 'Save' },
      isOpen: true,
    });

    const dialog = container.querySelector('[role="dialog"]');
    const actionLabels = Array.from(container.querySelectorAll('.mm-dialog-action')).map((action) =>
      action.textContent?.trim()
    );

    expect(dialog).toHaveAttribute('aria-labelledby', 'edit-profile-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'edit-profile-desc');
    expect(getByText('Display name')).toBeInTheDocument();
    expect(actionLabels).toEqual(['Help', 'Cancel', 'Save']);
  });

  it('keeps structured content outside the accessible description', () => {
    const { container } = render(Dialog, {
      id: 'form-dialog',
      title: 'Account details',
      description: 'Complete the required fields.',
      content: m('form', m('input', { 'aria-label': 'Display name' })),
      primaryAction: { label: 'Save' },
      isOpen: true,
    });

    const description = container.querySelector('#form-dialog-desc');

    expect(description).toHaveTextContent('Complete the required fields.');
    expect(description?.querySelector('form')).toBeNull();
    expect(container.querySelector('.mm-dialog-body form')).toBeInTheDocument();
  });

  it('renders an alert dialog with an announced destructive action', () => {
    const { container } = render(AlertDialog, {
      id: 'delete-project',
      title: 'Delete project?',
      description: 'This cannot be undone.',
      secondaryAction: { label: 'Cancel' },
      primaryAction: { label: 'Delete', destructive: true },
      isOpen: true,
    });

    const dialog = container.querySelector('[role="alertdialog"]');
    const destructiveAction = container.querySelector('.mm-dialog-action-destructive');

    expect(dialog).toHaveAttribute('aria-labelledby', 'delete-project-title');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(destructiveAction).toHaveAttribute('data-destructive', 'true');
    expect(destructiveAction).toHaveAttribute('aria-describedby', 'delete-project-destructive-hint');
    expect(container.querySelector('#delete-project-destructive-hint')).toHaveTextContent('Destructive action');
    expect(container.querySelector('.mm-modal-close-button')).toBeNull();
  });

  it('uses native disabled semantics for unavailable actions', () => {
    const { getByText } = render(Dialog, {
      title: 'Incomplete form',
      primaryAction: { label: 'Continue', disabled: true },
      defaultOpen: true,
    });

    expect(getByText('Continue')).toBeDisabled();
  });

  it('reports an action close reason', () => {
    const onClose = jest.fn();
    const onToggle = jest.fn();
    const { getByText } = render(Dialog, {
      title: 'Save changes?',
      primaryAction: { label: 'Save' },
      defaultOpen: true,
      onClose,
      onToggle,
    });

    fireEvent.click(getByText('Save'));

    expect(onClose).toHaveBeenCalledWith('action');
    expect(onToggle).toHaveBeenLastCalledWith(false);
  });

  it('focuses the primary action and traps tab focus within the dialog', () => {
    const { container } = render(Dialog, {
      title: 'Publish changes?',
      actions: [{ label: 'Preview' }],
      secondaryAction: { label: 'Cancel' },
      primaryAction: { label: 'Publish' },
      defaultOpen: true,
    });
    const actions = Array.from(container.querySelectorAll<HTMLButtonElement>('.mm-dialog-action'));
    const closeButton = container.querySelector<HTMLButtonElement>('.mm-modal-close-button');

    expect(document.activeElement).toBe(actions[2]);

    fireEvent.keyDown(actions[2], 'Tab');
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(closeButton as HTMLButtonElement, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(actions[2]);
  });

  it('focuses the safer secondary action when an alert dialog opens', () => {
    const { getByText } = render(AlertDialog, {
      title: 'Delete project?',
      secondaryAction: { label: 'Cancel' },
      primaryAction: { label: 'Delete', destructive: true },
      defaultOpen: true,
    });

    expect(document.activeElement).toBe(getByText('Cancel'));
  });

  it('does not dismiss an alert dialog from its backdrop by default', () => {
    const onClose = jest.fn();
    const { container } = render(AlertDialog, {
      title: 'Delete project?',
      primaryAction: { label: 'Delete', destructive: true },
      defaultOpen: true,
      onClose,
    });

    fireEvent.click(container.querySelector('.mm-modal-overlay') as HTMLElement);

    expect(onClose).not.toHaveBeenCalled();
    expect(container.querySelector('.mm-modal-surface')).toHaveClass('active');
  });

  it('can disable escape dismissal for an alert dialog', () => {
    const onClose = jest.fn();
    render(AlertDialog, {
      title: 'Session expired',
      primaryAction: { label: 'Sign in again' },
      defaultOpen: true,
      closeOnEsc: false,
      onClose,
    });

    fireEvent.keyDown(document.body, 'Escape');

    expect(onClose).not.toHaveBeenCalled();
  });
});
