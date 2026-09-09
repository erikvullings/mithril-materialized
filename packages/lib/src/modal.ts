import m, { type FactoryComponent, type Attributes } from 'mithril';
import { FlatButton } from './button';
import { createDismissibleLayer } from './dismissible-layer';
import { uniqueId } from './utils';
// Styles are imported via the main index or individual component imports

export interface ModalState {
  isOpen: boolean;
  id: string;
  modalElement: HTMLElement | null;
  lastFocusedElement: HTMLElement | null;
}

export type ModalCloseReason = 'escape' | 'backdrop' | 'close-button' | 'action' | 'programmatic';
export type ModalInitialFocus = 'first' | 'dialog' | string | HTMLElement | false;

export interface ModalAttrs extends Attributes {
  id?: string;
  title: string;
  description?: m.Children;
  /** Content rendered after the optional accessible description. */
  content?: m.Children;
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
  /** Initial visibility when the modal manages its own state */
  defaultOpen?: boolean;
  /** Called when modal should be opened/closed */
  onToggle?: (open: boolean) => void;
  /** Called when modal is closed */
  onClose?: (reason: ModalCloseReason) => void;
  /** Show close button in top right (default true) */
  showCloseButton?: boolean;
  /** Close modal when clicking backdrop (default true) */
  closeOnBackdropClick?: boolean;
  /** Close modal when clicking a button (default false) */
  closeOnButtonClick?: boolean;
  /** Close modal when pressing escape key */
  closeOnEsc?: boolean;
  /** Accessible modal role. */
  role?: 'dialog' | 'alertdialog';
  /** Element to focus when opening. A CSS selector is resolved within the modal. */
  initialFocus?: ModalInitialFocus;
  /** Keep keyboard focus within the open modal. */
  trapFocus?: boolean;
  /** Restore focus to the element active before opening (default true). */
  restoreFocus?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

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
  let currentAttrs: ModalAttrs;
  let needsInitialFocus = false;

  const getFocusableElements = () =>
    state.modalElement
      ? Array.from(state.modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
          (element) => element.getAttribute('aria-hidden') !== 'true'
        )
      : [];

  const focusInitialElement = (attrs: ModalAttrs) => {
    if (!needsInitialFocus || !state.isOpen) return;

    const configuredTarget = attrs.initialFocus;
    needsInitialFocus = false;
    if (configuredTarget === false || configuredTarget === undefined) return;

    const focusableElements = getFocusableElements();
    let target: HTMLElement | null = null;
    if (configuredTarget instanceof HTMLElement) {
      target =
        state.modalElement?.contains(configuredTarget) && focusableElements.includes(configuredTarget)
          ? configuredTarget
          : null;
    } else if (configuredTarget === 'dialog') {
      target = state.modalElement;
    } else if (configuredTarget === 'first') {
      target = focusableElements[0] ?? state.modalElement;
    } else {
      const selectedElement = state.modalElement?.querySelector<HTMLElement>(configuredTarget) ?? null;
      target = selectedElement && focusableElements.includes(selectedElement) ? selectedElement : null;
      target ??= focusableElements[0] ?? state.modalElement;
    }

    target?.focus();
  };

  const trapTabKey = (event: KeyboardEvent) => {
    if (!currentAttrs.trapFocus || !state.modalElement) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      state.modalElement.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;
    const activeElementIsFocusable =
      activeElement instanceof HTMLElement && focusableElements.includes(activeElement);
    if (event.shiftKey && (!activeElementIsFocusable || activeElement === firstElement)) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && (!activeElementIsFocusable || activeElement === lastElement)) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const blurFocusedElementInsideModal = () => {
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) return;
    if (state.modalElement?.contains(activeElement)) {
      activeElement.blur();
    }
  };

  const restoreFocusToInvoker = (attrs: ModalAttrs) => {
    const elementToFocus = state.lastFocusedElement;
    state.lastFocusedElement = null;
    if (attrs.restoreFocus !== false && elementToFocus?.isConnected) {
      requestAnimationFrame(() => elementToFocus.focus());
    }
  };

  const closeModal = (attrs: ModalAttrs, reason: ModalCloseReason) => {
    if (!state.isOpen) return;

    blurFocusedElementInsideModal();
    state.isOpen = false;
    escapeLayer.sync(false);
    if (attrs.onToggle) attrs.onToggle(false);
    if (attrs.onClose) attrs.onClose(reason);

    // Remove keyboard listener
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }

    // Restore body scroll
    document.body.style.overflow = '';
    restoreFocusToInvoker(attrs);
    m.redraw();
  };

  const escapeLayer = createDismissibleLayer(() => {
    if (!state.isOpen || !state.modalElement?.isConnected) return false;
    if (currentAttrs.closeOnEsc === false) return 'blocked';
    closeModal(currentAttrs, 'escape');
    return 'dismissed';
  });

  const openModal = (attrs: ModalAttrs) => {
    if (state.isOpen) return;

    const activeElement = document.activeElement;
    state.lastFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;
    state.isOpen = true;
    escapeLayer.sync(true);
    needsInitialFocus = true;
    if (attrs.onToggle) attrs.onToggle(true);

    // Add keyboard listener
    keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && state.isOpen) {
        trapTabKey(e);
      }
    };
    document.addEventListener('keydown', keydownHandler);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  return {
    oninit: ({ attrs }) => {
      state.id = attrs.id ?? uniqueId();
      currentAttrs = attrs;
      if (attrs.isOpen ?? attrs.defaultOpen) {
        openModal(attrs);
      }
    },

    onremove: () => {
      // Cleanup on component removal
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler);
        keydownHandler = null;
      }
      escapeLayer.dispose();
      document.body.style.overflow = '';
      if (state.isOpen) {
        restoreFocusToInvoker(currentAttrs);
      }
      state.modalElement = null;
      state.lastFocusedElement = null;
    },

    view: ({ attrs }) => {
      currentAttrs = attrs;
      // Sync external isOpen prop with internal state - do this in view for immediate response
      if (attrs.isOpen !== undefined && attrs.isOpen !== state.isOpen) {
        if (attrs.isOpen) {
          openModal(attrs);
        } else {
          closeModal(attrs, 'programmatic');
        }
      }

      const {
        id: providedId,
        title,
        description,
        content,
        fixedFooter,
        bottomSheet,
        buttons,
        richContent,
        className,
        showCloseButton = true,
        closeOnBackdropClick = true,
        closeOnButtonClick = false,
        role = 'dialog',
      } = attrs;
      const id = providedId ?? state.id;

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
          onclick: closeOnBackdropClick ? () => closeModal(attrs, 'backdrop') : undefined,
        }),

        // Modal content
        m(
          'div',
          {
            id,
            className: modalClasses,
            oncreate: ({ dom }) => {
              state.modalElement = dom as HTMLElement;
              focusInitialElement(attrs);
            },
            onupdate: ({ dom }) => {
              state.modalElement = dom as HTMLElement;
              focusInitialElement(attrs);
            },
            tabindex: -1,
            'aria-hidden': state.isOpen ? 'false' : 'true',
            'aria-modal': state.isOpen ? 'true' : undefined,
            role,
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
                  onclick: () => closeModal(attrs, 'close-button'),
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
                content,
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
                      closeOnButtonClick && closeModal(attrs, 'action');
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
