import m, { type Attributes, type FactoryComponent } from 'mithril';
import { ModalPanel, type ModalAttrs } from './modal';
import { uniqueId } from './utils';

/**
 * An action rendered in a {@link Dialog} footer.
 */
export interface DialogAction extends Attributes {
  /** Visible action label. */
  label: string;
  /** Optional Material icon name. */
  iconName?: string;
  /** Prevent interaction with this action. */
  disabled?: boolean;
  /** Marks an irreversible action and applies destructive styling. */
  destructive?: boolean;
  /** Called when the action is activated. */
  onclick?: (event: UIEvent) => void;
}

/**
 * Attributes shared by regular and alert dialogs.
 */
export interface DialogAttrs extends Omit<ModalAttrs, 'buttons' | 'content' | 'description' | 'title'> {
  /** Accessible dialog name and visible heading. */
  title: string;
  /** Supporting text announced with the dialog. */
  description?: m.Children;
  /** Main dialog content. */
  content?: m.Children;
  /** Most prominent action, rendered last. */
  primaryAction?: DialogAction;
  /** Alternative action, rendered immediately before the primary action. */
  secondaryAction?: DialogAction;
  /** Additional actions, rendered before the secondary and primary actions. */
  actions?: DialogAction[];
}

/**
 * Attributes for a confirmation that needs alert-dialog semantics.
 */
export interface AlertDialogAttrs extends DialogAttrs {
  /** Confirmation action. Mark it destructive for irreversible operations. */
  primaryAction: DialogAction;
}

const toModalButton = (
  action: DialogAction,
  position: 'extra' | 'secondary' | 'primary',
  dialogId: string
) => ({
  label: action.label,
  iconName: action.iconName,
  disabled: action.disabled,
  onclick: action.onclick,
  'aria-describedby': action.destructive ? `${dialogId}-destructive-hint` : undefined,
  'data-destructive': action.destructive ? 'true' : undefined,
  className: [
    'mm-dialog-action',
    `mm-dialog-${position}-action`,
    action.destructive ? 'mm-dialog-action-destructive' : '',
    action.className,
  ]
    .filter(Boolean)
    .join(' '),
});

const createDialog = <T extends DialogAttrs>(
  role: 'dialog' | 'alertdialog',
  defaults: Pick<ModalAttrs, 'closeOnBackdropClick' | 'showCloseButton' | 'initialFocus' | 'trapFocus'>
): FactoryComponent<T> => () => {
  const generatedId = uniqueId();

  return {
    view: ({ attrs }) => {
      const {
        id = generatedId,
        title,
        description,
        content,
        primaryAction,
        secondaryAction,
        actions = [],
        className,
        closeOnBackdropClick = defaults.closeOnBackdropClick,
        showCloseButton = defaults.showCloseButton,
        closeOnButtonClick = true,
        initialFocus = defaults.initialFocus,
        trapFocus = defaults.trapFocus,
        ...modalAttrs
      } = attrs;
      const hasDestructiveAction = [primaryAction, secondaryAction, ...actions].some((action) => action?.destructive);
      const dialogDescription =
        description !== undefined ? m('.mm-dialog-description', description) : undefined;
      const dialogContent =
        content !== undefined || hasDestructiveAction
          ? m.fragment({}, [
              content !== undefined ? m('.mm-dialog-body', content) : undefined,
              hasDestructiveAction
                ? m('span.mm-dialog-sr-only', { id: `${id}-destructive-hint` }, 'Destructive action')
                : undefined,
            ])
          : undefined;
      const buttons = [
        ...actions.map((action) => toModalButton(action, 'extra', id)),
        ...(secondaryAction ? [toModalButton(secondaryAction, 'secondary', id)] : []),
        ...(primaryAction ? [toModalButton(primaryAction, 'primary', id)] : []),
      ];

      return m(ModalPanel, {
        ...modalAttrs,
        id,
        title,
        description: dialogDescription,
        content: dialogContent,
        buttons,
        role,
        closeOnBackdropClick,
        showCloseButton,
        closeOnButtonClick,
        initialFocus,
        trapFocus,
        className: ['mm-dialog', className].filter(Boolean).join(' '),
      });
    },
  };
};

/**
 * A labelled modal surface with content and consistently ordered actions.
 */
export const Dialog = createDialog<DialogAttrs>('dialog', {
  closeOnBackdropClick: true,
  showCloseButton: true,
  initialFocus: '.mm-dialog-primary-action',
  trapFocus: true,
});

/**
 * A modal confirmation with alert-dialog semantics and constrained dismissal.
 */
export const AlertDialog = createDialog<AlertDialogAttrs>('alertdialog', {
  closeOnBackdropClick: false,
  showCloseButton: false,
  initialFocus: '.mm-dialog-secondary-action',
  trapFocus: true,
});
