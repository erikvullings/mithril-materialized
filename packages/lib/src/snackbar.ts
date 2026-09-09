import { uniqueId } from './utils';

export type SnackbarId = string;
export type SnackbarDismissReason =
  | 'timeout'
  | 'action'
  | 'dismiss'
  | 'programmatic'
  | 'clear'
  | 'overflow';

export interface SnackbarAction {
  label: string;
  onclick: () => void;
  /** Dismiss after invoking the action. @default true */
  dismiss?: boolean;
}

export interface SnackbarOptions {
  message: string;
  action?: SnackbarAction;
  /** Show a dismiss button. @default false */
  dismissible?: boolean;
  /** Visible duration in milliseconds. Use `Infinity` to disable timeout. @default 5000 */
  duration?: number;
  onComplete?: (reason: SnackbarDismissReason, id: SnackbarId) => void;
}

export interface SnackbarQueueOptions {
  /** Maximum active and queued entries. The oldest waiting entry is dropped when full. @default 10 */
  maxLength?: number;
  /** Default visible duration in milliseconds. @default 5000 */
  defaultDuration?: number;
  /** Live-region politeness. @default 'polite' */
  politeness?: 'polite' | 'assertive';
}

interface SnackbarEntry extends SnackbarOptions {
  id: SnackbarId;
}

const defaultQueueOptions: Required<SnackbarQueueOptions> = {
  maxLength: 10,
  defaultDuration: 5000,
  politeness: 'polite',
};

/**
 * Ordered snackbar queue. Duplicate messages are allowed and announced independently.
 * Only the active entry is rendered; queued entries remain outside the live region.
 */
export class SnackbarQueue {
  private readonly options: Required<SnackbarQueueOptions>;
  private readonly entries: SnackbarEntry[] = [];
  private container: HTMLElement | null = null;
  private timer: number | undefined;
  private remaining = Infinity;
  private timerStartedAt = 0;
  private pointerInside = false;
  private focusInside = false;
  private destroyed = false;

  constructor(options: SnackbarQueueOptions = {}) {
    this.options = { ...defaultQueueOptions, ...options };
    if (!Number.isInteger(this.options.maxLength) || this.options.maxLength < 1) {
      throw new Error('SnackbarQueue maxLength must be a positive integer.');
    }
  }

  enqueue(options: SnackbarOptions): SnackbarId {
    if (this.destroyed) {
      throw new Error('Cannot enqueue a snackbar after the queue has been destroyed.');
    }

    const entry: SnackbarEntry = { ...options, id: `snackbar-${uniqueId()}` };
    let dropped: SnackbarEntry | undefined;
    if (this.entries.length >= this.options.maxLength) {
      if (this.entries.length === 1) {
        entry.onComplete?.('overflow', entry.id);
        return entry.id;
      }
      [dropped] = this.entries.splice(1, 1);
    }
    this.entries.push(entry);
    if (this.entries.length === 1) this.renderActive();
    dropped?.onComplete?.('overflow', dropped.id);
    return entry.id;
  }

  dismiss(id: SnackbarId): boolean {
    const index = this.entries.findIndex((entry) => entry.id === id);
    if (index < 0) return false;

    const [entry] = this.entries.splice(index, 1);
    if (index === 0) {
      this.clearTimer();
      this.renderActive();
    }
    entry.onComplete?.('programmatic', entry.id);
    return true;
  }

  clear(): void {
    this.clearTimer();
    const entries = this.entries.splice(0);
    this.removeContainer();
    entries.forEach((entry) => entry.onComplete?.('clear', entry.id));
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.clear();
  }

  private renderActive(): void {
    const active = this.entries[0];
    if (!active) {
      this.removeContainer();
      return;
    }

    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'mm-snackbar-container';
      this.container.setAttribute(
        'role',
        this.options.politeness === 'assertive' ? 'alert' : 'status'
      );
      this.container.setAttribute('aria-live', this.options.politeness);
      this.container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(this.container);
    }

    const snackbar = document.createElement('div');
    snackbar.className = 'mm-snackbar';
    snackbar.id = active.id;
    snackbar.addEventListener('pointerenter', () => {
      this.pointerInside = true;
      this.pauseTimer();
    });
    snackbar.addEventListener('pointerleave', () => {
      this.pointerInside = false;
      this.resumeTimer();
    });
    snackbar.addEventListener('focusin', () => {
      this.focusInside = true;
      this.pauseTimer();
    });
    snackbar.addEventListener('focusout', () => {
      this.focusInside = false;
      this.resumeTimer();
    });

    const message = document.createElement('span');
    message.className = 'mm-snackbar-message';
    message.textContent = active.message;
    snackbar.appendChild(message);

    if (active.action) {
      const action = active.action;
      const actionButton = document.createElement('button');
      let invoked = false;
      actionButton.type = 'button';
      actionButton.className = 'mm-snackbar-action';
      actionButton.textContent = action.label;
      actionButton.onclick = () => {
        if (invoked) return;
        invoked = true;
        try {
          action.onclick();
        } finally {
          if (action.dismiss !== false && this.entries[0]?.id === active.id) {
            this.completeActive('action');
          }
        }
      };
      snackbar.appendChild(actionButton);
    }

    if (active.dismissible) {
      const dismissButton = document.createElement('button');
      dismissButton.type = 'button';
      dismissButton.className = 'mm-snackbar-dismiss';
      dismissButton.setAttribute('aria-label', 'Dismiss notification');
      dismissButton.textContent = '\u00d7';
      dismissButton.onclick = () => this.completeActive('dismiss');
      snackbar.appendChild(dismissButton);
    }

    this.container.replaceChildren(snackbar);

    this.pointerInside = false;
    this.focusInside = false;
    this.remaining = active.duration ?? this.options.defaultDuration;
    this.resumeTimer();
  }

  private completeActive(reason: SnackbarDismissReason): void {
    const active = this.entries.shift();
    if (!active) return;
    this.clearTimer();
    this.renderActive();
    active.onComplete?.(reason, active.id);
  }

  private clearTimer(): void {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private pauseTimer(): void {
    if (this.timer === undefined) return;
    this.remaining = Math.max(0, this.remaining - (Date.now() - this.timerStartedAt));
    this.clearTimer();
  }

  private resumeTimer(): void {
    if (
      this.timer !== undefined ||
      this.remaining === Infinity ||
      this.pointerInside ||
      this.focusInside
    ) {
      return;
    }
    this.timerStartedAt = Date.now();
    this.timer = window.setTimeout(
      () => this.completeActive('timeout'),
      Math.max(0, this.remaining)
    );
  }

  private removeContainer(): void {
    this.container?.remove();
    this.container = null;
  }
}

/** Shared application queue for convenient imperative usage. */
export const snackbarQueue = new SnackbarQueue();

/** Enqueue a snackbar on the shared application queue. */
export const snackbar = (options: SnackbarOptions): SnackbarId => snackbarQueue.enqueue(options);
