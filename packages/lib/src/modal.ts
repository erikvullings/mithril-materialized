import m, { FactoryComponent, Vnode, Attributes } from 'mithril';
import { FlatButton } from './button';
import { uniqueId } from './utils';
// Styles are imported via the main index or individual component imports

export interface ModalState {
  isOpen: boolean;
  id: string;
}

export interface ModalAttrs extends Attributes {
  id?: string;
  title: string;
  description?: string | Vnode<any, any>;
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
  };

  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  const closeModal = (attrs: ModalAttrs) => {
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
    m.redraw();
  };

  const openModal = (attrs: ModalAttrs) => {
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
        className || '',
        fixedFooter ? 'modal-fixed-footer' : '',
        bottomSheet ? 'bottom-sheet' : '',
        state.isOpen ? 'active' : '',
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

      const overlayClasses =
        ['modal-overlay', state.isOpen ? 'active' : ''].filter(Boolean).join(' ').trim() || undefined;

      return m('div', { className: 'modal-container' }, [
        // Modal overlay
        m('div', {
          className: overlayClasses,
          onclick: closeOnBackdropClick ? () => closeModal(attrs) : undefined,
          style: {
            display: state.isOpen ? 'block' : 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1002',
          },
        }),

        // Modal content
        m(
          'div',
          {
            id,
            className: modalClasses,
            'aria-hidden': state.isOpen ? 'false' : 'true',
            role: 'dialog',
            'aria-labelledby': `${id}-title`,
            'aria-describedby': description ? `${id}-desc` : undefined,
            style: {
              display: state.isOpen ? 'flex' : 'none',
              position: 'fixed',
              ...(bottomSheet
                ? {
                    // Bottom sheet positioning
                    top: 'auto',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    transform: 'none',
                    maxWidth: '100%',
                    borderRadius: '8px 8px 0 0',
                  }
                : {
                    // Regular modal positioning
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '75%',
                    borderRadius: '4px',
                  }),
              backgroundColor: 'var(--mm-modal-background, #fff)',
              maxHeight: '85%',
              overflow: 'auto',
              zIndex: '1003',
              padding: '0',
              flexDirection: 'column',
              boxShadow:
                '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)',
            },
            // onclick: (e: Event) => e.stopPropagation(), // Prevent backdrop click when clicking inside modal
          },
          [
            // Close button
            showCloseButton &&
              m(
                'button',
                {
                  className: 'modal-close btn-flat',
                  style: {
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '8px',
                    minWidth: 'auto',
                    lineHeight: 1,
                  },
                  onclick: () => closeModal(attrs),
                  'aria-label': 'Close modal',
                },
                '×'
              ),

            // Modal content
            m(
              '.modal-content',
              {
                style: {
                  padding: '24px',
                  paddingTop: showCloseButton ? '48px' : '24px',
                  minHeight: 'auto',
                  flex: '1 1 auto',
                },
              },
              [
                m('h4', { id: `${id}-title`, style: { margin: '0 0 20px 0' } }, title),
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
                  style: {
                    padding: '4px 6px',
                    borderTop: '1px solid var(--mm-border-color, rgba(160,160,160,0.2))',
                    textAlign: 'right',
                  },
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
