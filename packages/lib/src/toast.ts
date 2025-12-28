import { FactoryComponent } from 'mithril';

export interface ToastAction {
  /** Icon name for the action button */
  icon?: string;
  /** Text label for the action button (if no icon provided) */
  label?: string;
  /** Callback function called when action is clicked */
  onclick: () => void;
  /** Whether to use flat button style (default) or icon button style */
  variant?: 'flat' | 'icon';
}

export interface ToastOptions {
  /** HTML content for the toast */
  html?: string;
  /** Display length in milliseconds */
  displayLength?: number;
  /** Animation in duration in milliseconds */
  inDuration?: number;
  /** Animation out duration in milliseconds */
  outDuration?: number;
  /**
   * Additional CSS classes
   * @deprecated Use className instead. This property will be removed in a future version.
   */
  classes?: string;
  /** Additional CSS classes (preferred over deprecated 'classes' property) */
  className?: string;
  /** Callback function called when toast is dismissed */
  completeCallback?: () => void;
  /** Activation percentage for swipe dismissal */
  activationPercent?: number;
  /** Optional action button (for simple confirmations or undo actions) */
  action?: ToastAction;
}

interface ToastState {
  panning: boolean;
  timeRemaining: number;
  startingXPos: number;
  xPos: number;
  velocityX: number;
  time: number;
  deltaX: number;
  wasSwiped: boolean;
  counterInterval?: number;
}

export class Toast {
  public el: HTMLElement;
  public options: Required<ToastOptions>;
  private state: ToastState;

  private static _toasts: Toast[] = [];
  private static _container: HTMLElement | null = null;
  private static _draggedToast: Toast | null = null;

  private static defaults: ToastOptions = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    className: '',
    completeCallback: undefined,
    activationPercent: 0.8,
    action: undefined,
  };

  constructor(options: ToastOptions = {}) {
    this.options = { ...Toast.defaults, ...options } as Required<ToastOptions>;

    this.state = {
      panning: false,
      timeRemaining: this.options.displayLength,
      startingXPos: 0,
      xPos: 0,
      velocityX: 0,
      time: 0,
      deltaX: 0,
      wasSwiped: false,
    };

    if (Toast._toasts.length === 0) {
      Toast._createContainer();
    }

    // Create new toast
    Toast._toasts.push(this);
    this.el = this._createToast();
    this._animateIn();
    this._setTimer();
  }

  static getInstance(el: HTMLElement): Toast | undefined {
    return (el as any).M_Toast;
  }

  static _createContainer(): void {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-container');

    // Add event handlers
    container.addEventListener('touchstart', Toast._onDragStart);
    container.addEventListener('touchmove', Toast._onDragMove);
    container.addEventListener('touchend', Toast._onDragEnd);

    container.addEventListener('mousedown', Toast._onDragStart);
    document.addEventListener('mousemove', Toast._onDragMove);
    document.addEventListener('mouseup', Toast._onDragEnd);

    document.body.appendChild(container);
    Toast._container = container;
  }

  static _removeContainer(): void {
    document.removeEventListener('mousemove', Toast._onDragMove);
    document.removeEventListener('mouseup', Toast._onDragEnd);

    if (Toast._container) {
      Toast._container.remove();
      Toast._container = null;
    }
  }

  static _onDragStart = (e: Event): void => {
    const target = e.target as HTMLElement;
    const toastEl = target.closest('.toast') as HTMLElement;

    if (toastEl) {
      const toast = (toastEl as any).M_Toast as Toast;
      if (toast) {
        toast.state.panning = true;
        Toast._draggedToast = toast;
        toast.el.classList.add('panning');
        toast.el.style.transition = '';
        toast.state.startingXPos = Toast._xPos(e);
        toast.state.time = Date.now();
        toast.state.xPos = Toast._xPos(e);
      }
    }
  };

  static _onDragMove = (e: Event): void => {
    if (Toast._draggedToast) {
      e.preventDefault();
      const toast = Toast._draggedToast;
      toast.state.deltaX = Math.abs(toast.state.xPos - Toast._xPos(e));
      toast.state.xPos = Toast._xPos(e);
      toast.state.velocityX = toast.state.deltaX / (Date.now() - toast.state.time);
      toast.state.time = Date.now();

      const totalDeltaX = toast.state.xPos - toast.state.startingXPos;
      const activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
      toast.el.style.transform = `translateX(${totalDeltaX}px)`;
      toast.el.style.opacity = String(1 - Math.abs(totalDeltaX / activationDistance));
    }
  };

  static _onDragEnd = (): void => {
    if (Toast._draggedToast) {
      const toast = Toast._draggedToast;
      toast.state.panning = false;
      toast.el.classList.remove('panning');

      const totalDeltaX = toast.state.xPos - toast.state.startingXPos;
      const activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
      const shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.state.velocityX > 1;

      if (shouldBeDismissed) {
        toast.state.wasSwiped = true;
        toast.dismiss();
      } else {
        toast.el.style.transition = 'transform .2s, opacity .2s';
        toast.el.style.transform = '';
        toast.el.style.opacity = '';
      }
      Toast._draggedToast = null;
    }
  };

  static _xPos(e: Event): number {
    const touchEvent = e as TouchEvent;
    const mouseEvent = e as MouseEvent;

    if (touchEvent.targetTouches && touchEvent.targetTouches.length >= 1) {
      return touchEvent.targetTouches[0].clientX;
    }
    return mouseEvent.clientX;
  }

  static dismissAll(): void {
    Toast._toasts.forEach((toast) => toast.dismiss());
  }

  _createToast(): HTMLElement {
    const toast = document.createElement('div');
    toast.classList.add('toast');

    // Add custom classes (prefer className over deprecated classes)
    const customClasses = this.options.className || this.options.classes;
    if (customClasses) {
      toast.classList.add(...customClasses.split(' ').filter((c) => c));
    }

    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = 'display: flex; align-items: center; gap: 12px;';

    // Set message content
    const messageEl = document.createElement('div');
    messageEl.style.flex = '1';
    const message = this.options.html;
    if (typeof message === 'object' && message && 'nodeType' in message) {
      messageEl.appendChild(message);
    } else {
      messageEl.innerHTML = message;
    }
    contentWrapper.appendChild(messageEl);

    // Add action button if provided
    if (this.options.action) {
      const action = this.options.action;
      const actionBtn = document.createElement('button');
      actionBtn.className = 'btn-flat toast-action';
      actionBtn.style.cssText = 'margin: 0; padding: 0 8px; min-width: auto; height: 36px;';

      if (action.variant === 'icon' && action.icon) {
        // Icon button variant
        actionBtn.innerHTML = `<i class="material-icons">${action.icon}</i>`;
        actionBtn.setAttribute('aria-label', action.label || action.icon);
      } else {
        // Flat button variant (default)
        if (action.icon) {
          actionBtn.innerHTML = `<i class="material-icons left">${action.icon}</i>${action.label || ''}`;
        } else {
          actionBtn.textContent = action.label || '';
        }
      }

      actionBtn.onclick = (e) => {
        e.stopPropagation();
        action.onclick();
        this.dismiss();
      };

      contentWrapper.appendChild(actionBtn);
    }

    toast.appendChild(contentWrapper);

    // Store reference
    (toast as any).M_Toast = this;

    // Measure natural width BEFORE appending to avoid interference from other toasts
    // Temporarily append to body in an isolated position
    toast.style.cssText = 'position: absolute; visibility: hidden; left: -9999px; display: flex;';
    document.body.appendChild(toast);

    // Force layout and measure
    const naturalWidth = toast.offsetWidth;

    // Remove from body
    document.body.removeChild(toast);

    // Lock the width to prevent changes based on other toasts
    toast.style.cssText = `width: ${naturalWidth}px;`;

    // Append to container
    Toast._container!.appendChild(toast);
    return toast;
  }

  _animateIn(): void {
    // Width is already locked from _createToast
    // Set initial animation state (transitions are defined in CSS)
    this.el.style.transform = 'translateY(35px)';
    this.el.style.opacity = '0';

    // Trigger animation after a brief delay to ensure styles are applied
    setTimeout(() => {
      this.el.style.transform = 'translateY(0)';
      this.el.style.opacity = '1';
    }, 10);
  }

  _setTimer(): void {
    if (this.state.timeRemaining !== Infinity) {
      this.state.counterInterval = window.setInterval(() => {
        if (!this.state.panning) {
          this.state.timeRemaining -= 20;
        }

        if (this.state.timeRemaining <= 0) {
          this.dismiss();
        }
      }, 20);
    }
  }

  dismiss(): void {
    if (this.state.counterInterval) {
      window.clearInterval(this.state.counterInterval);
    }

    const activationDistance = this.el.offsetWidth * this.options.activationPercent;

    if (this.state.wasSwiped) {
      // Override transition temporarily for swipe
      this.el.style.transition = 'transform .05s, opacity .05s';
      this.el.style.transform = `translateX(${activationDistance}px)`;
      this.el.style.opacity = '0';

      // Reset transition after swipe animation
      setTimeout(() => {
        this.el.style.transition = `opacity ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                      max-height ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                      margin-top ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                      padding-top ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                      padding-bottom ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
      }, 50);
    } else {
      // Set collapse transition timing
      this.el.style.transition = `opacity ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                    max-height ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                    margin-top ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                    padding-top ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                                    padding-bottom ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
    }

    // Animate out - collapse height smoothly
    this.el.style.opacity = '0';
    this.el.style.maxHeight = '0';
    this.el.style.marginTop = '0';
    this.el.style.paddingTop = '0';
    this.el.style.paddingBottom = '0';
    this.el.style.overflow = 'hidden';

    setTimeout(() => {
      // Call completion callback
      if (this.options.completeCallback) {
        this.options.completeCallback();
      }

      // Remove toast from DOM
      this.el.remove();

      // Remove from toasts array
      const index = Toast._toasts.indexOf(this);
      if (index > -1) {
        Toast._toasts.splice(index, 1);
      }

      // Remove container if no more toasts
      if (Toast._toasts.length === 0) {
        Toast._removeContainer();
      }
    }, this.options.outDuration);
  }
}

// Factory function for creating toasts
export const toast = (options: ToastOptions): Toast => {
  return new Toast(options);
};

// Component for declarative usage (optional)
export interface ToastComponentAttrs extends ToastOptions {
  /** Whether to show the toast */
  show?: boolean;
}

export const ToastComponent: FactoryComponent<ToastComponentAttrs> = () => {
  let toastInstance: Toast | null = null;

  return {
    view: ({ attrs }) => {
      if (attrs.show && !toastInstance) {
        toastInstance = new Toast(attrs);
      } else if (!attrs.show && toastInstance) {
        toastInstance.dismiss();
        toastInstance = null;
      }

      return null; // This component doesn't render anything itself
    },

    onremove: () => {
      if (toastInstance) {
        toastInstance.dismiss();
        toastInstance = null;
      }
    },
  };
};
