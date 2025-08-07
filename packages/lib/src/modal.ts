import m, { FactoryComponent, Vnode, Attributes } from 'mithril';
import { FlatButton } from './button';
// Styles are imported via the main index or individual component imports

export interface IModalState {
  isOpen: boolean;
  id: string;
}

export interface IMaterialModal extends Attributes {
  id: string;
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
  /** Show close button in top right */
  showCloseButton?: boolean;
  /** Close modal when clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Close modal when pressing escape key */
  closeOnEsc?: boolean;
}

/**
 * CSS-only Modal Panel component - no JavaScript dependencies
 * Uses modern CSS techniques for modal functionality
 */
export const ModalPanel: FactoryComponent<IMaterialModal> = () => {
  const state: IModalState = {
    isOpen: false,
    id: '',
  };

  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  const closeModal = (attrs: IMaterialModal) => {
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
  };

  const openModal = (attrs: IMaterialModal) => {
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
      state.id = attrs.id;
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

      const overlayClasses = ['modal-overlay', state.isOpen ? 'active' : ''].filter(Boolean).join(' ').trim();

      return m('div', { className: 'modal-container' }, [
        // Modal overlay
        m('div', {
          className: overlayClasses,
          onclick: closeOnBackdropClick ? () => closeModal(attrs) : undefined,
          style: { display: state.isOpen ? 'block' : 'none' },
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
            style: { display: state.isOpen ? 'block' : 'none' },
            onclick: (e: Event) => e.stopPropagation(), // Prevent backdrop click when clicking inside modal
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
            m('.modal-content', [
              m('h4', { id: `${id}-title` }, title),
              description &&
                m(
                  'div',
                  {
                    id: `${id}-desc`,
                    ...(richContent && typeof description === 'string' ? { innerHTML: description } : {}),
                  },
                  richContent && typeof description === 'string' ? undefined : description
                ),
            ]),

            // Modal footer with buttons
            buttons &&
              buttons.length > 0 &&
              m(
                '.modal-footer',
                buttons.map((buttonProps) =>
                  m(FlatButton, {
                    // key: `modal-button-${index}`,
                    ...buttonProps,
                    className: `modal-close ${buttonProps.className || ''}`,
                    onclick: (e: UIEvent) => {
                      if (buttonProps.onclick) buttonProps.onclick(e);
                      closeModal(attrs);
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
