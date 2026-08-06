import m, { type FactoryComponent, type Vnode, type Attributes } from 'mithril';
import { FlatButton } from './button';
import { uniqueId } from './utils';
// Styles are imported via the main index or individual component imports

export interface ModalState {
  isOpen: boolean;
  id: string;
  modalElement: HTMLElement | null;
  lastFocusedElement: HTMLElement | null;
}

export interface ModalAttrs extends Attributes {
  id?: string;
  title: string;
  description?: string | Vnode<unknown, unknown>;
  /** Set to true when the description contains HTML */
  richContent?: boolean;
  /** Fixate the footer, so you can show more content. */
  fixedFooter?: boolean;
  /** Display on the bottom */
  bottomSheet?: boolean;
  /** Menu buttons, from left to right */
  buttons?: Array<{
    label: string;
    iconName?: string;
    disabled?: boolean;
    onclick?: (e: UIEvent) => void;
    className?: string;
  }>;
  /** Control modal visibility externally */
  isOpen?: boolean;
  /** Called when modal should be opened/closed */
  onToggle?: (open: boolean) => void;
  /** Called when modal is closed */
  onClose?: () => void;
  /** Show close button in top right (default true) */
  showCloseButton?: boolean;
  /** Close modal when clicking backdrop (default true) */
  closeOnBackdropClick?: boolean;
  /** Close modal when clicking a button (default false) */
  closeOnButtonClick?: boolean;
  /** Close modal when pressing escape key */
  closeOnEsc?: boolean;
}

/**
 * CSS-only Modal Panel component - no JavaScript dependencies
 * Uses modern CSS techniques for modal functionality
 */
export const ModalPanel: FactoryComponent<ModalAttrs> = () => {
  const state: ModalState = {
    isOpen: false,
    id: '',
    modalElement: null,
    lastFocusedElement: null,
  };

  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  const blurFocusedElementInsideModal = () => {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) return;
    if (state.modalElement?.contains(activeElement)) {
      activeElement.blur();
    }
  };

  const restoreFocusToInvoker = () => {
    const elementToFocus = state.lastFocusedElement;
    state.lastFocusedElement = null;
    if (elementToFocus?.isConnected) {
      requestAnimationFrame(() => elementToFocus.focus());
    }
  };

  const closeModal = (attrs: ModalAttrs) => {
    blurFocusedElementInsideModal();
    state.isOpen = false;
    if (attrs.onToggle) attrs.onToggle(false);
    if (attrs.onClose) attrs.onClose();

    // Remove keyboard listener
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }

    // Restore body scroll
    document.body.style.overflow = '';
    restoreFocusToInvoker();
    m.redraw();
  };

  const openModal = (attrs: ModalAttrs) => {
    const activeElement = document.activeElement;
    state.lastFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;
    state.isOpen = true;
    if (attrs.onToggle) attrs.onToggle(true);

    // Add keyboard listener
    keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && attrs.closeOnEsc !== false && state.isOpen) {
        closeModal(attrs);
      }
    };
    document.addEventListener('keydown', keydownHandler);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id ?? uniqueId();
      if (attrs.isOpen) {
        openModal(attrs);
      }
    },

    onremove: () => {
      // Cleanup on component removal
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
      }
      document.body.style.overflow = '';
      state.modalElement = null;
      state.lastFocusedElement = null;
    },

    view: ({ attrs }) => {
      // Sync external isOpen prop with internal state - do this in view for immediate response
      if (attrs.isOpen !== undefined && attrs.isOpen !== state.isOpen) {
        if (attrs.isOpen) {
          openModal(attrs);
        } else {
          closeModal(attrs);
        }
      }

      const {
        id,
        title,
        description,
        fixedFooter,
        bottomSheet,
        buttons,
        richContent,
        className,
        showCloseButton = true,
        closeOnBackdropClick = true,
        closeOnButtonClick = false,
      } = attrs;

      const modalClasses = [
        'modal',
        'mm-modal-surface',
        className || '',
        fixedFooter ? 'modal-fixed-footer' : '',
        bottomSheet ? 'bottom-sheet' : '',
        state.isOpen ? 'active' : '',
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

      const overlayClasses =
        ['modal-overlay', 'mm-modal-overlay', state.isOpen ? 'active' : ''].filter(Boolean).join(' ').trim() || undefined;

      return m('div', { className: 'modal-container' }, [
        // Modal overlay
        m('div', {
          className: overlayClasses,
          onclick: closeOnBackdropClick ? () => closeModal(attrs) : undefined,
        }),

        // Modal content
        m(
          'div',
          {
            id,
            className: modalClasses,
            oncreate: ({ dom }) => {
              state.modalElement = dom as HTMLElement;
            },
            onupdate: ({ dom }) => {
              state.modalElement = dom as HTMLElement;
            },
            'aria-hidden': state.isOpen ? 'false' : 'true',
            role: 'dialog',
            'aria-labelledby': `${id}-title`,
            'aria-describedby': description ? `${id}-desc` : undefined,
          },
          [
            // Close button
            showCloseButton &&
              m(
                'button',
                {
                  className: 'modal-close btn-flat mm-modal-close-button',
                  onclick: () => closeModal(attrs),
                  'aria-label': 'Close modal',
                },
                '×'
              ),

            // Modal content
            m(
              'div',
              {
                className: ['modal-content', 'mm-modal-content', showCloseButton ? 'mm-modal-content-with-close' : '']
                  .filter(Boolean)
                  .join(' '),
              },
              [
                m('h4', { id: `${id}-title`, className: 'mm-modal-title' }, title),
                description &&
                  m(
                    'div',
                    {
                      id: `${id}-desc`,
                      ...(richContent && typeof description === 'string' ? { innerHTML: description } : {}),
                    },
                    richContent && typeof description === 'string' ? undefined : description
                  ),
              ]
            ),

            // Modal footer with buttons
            buttons &&
              buttons.length > 0 &&
              m(
                '.modal-footer',
                {
                  className: 'modal-footer mm-modal-footer',
                },
                buttons.map((buttonProps) =>
                  m(FlatButton, {
                    // key: `modal-button-${index}`,
                    ...buttonProps,
                    className: `modal-close ${buttonProps.className || ''}`,
                    onclick: (e: UIEvent) => {
                      if (buttonProps.onclick) buttonProps.onclick(e);
                      closeOnButtonClick && closeModal(attrs);
                    },
                  })
                )
              ),
          ]
        ),
      ]);
    },
  };
};
