import { SnackbarQueue } from '../src/snackbar';
import { cleanup } from './test-utils';

describe('SnackbarQueue', () => {
  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it('presents enqueued messages one at a time in insertion order', () => {
    jest.useFakeTimers();
    const queue = new SnackbarQueue();

    const firstId = queue.enqueue({ message: 'Saved first', duration: 1000 });
    const secondId = queue.enqueue({ message: 'Saved second', duration: 1000 });

    expect(firstId).not.toBe(secondId);
    const liveRegion = document.querySelector('[role="status"]');
    expect(liveRegion).toHaveTextContent('Saved first');
    expect(document.body).not.toHaveTextContent('Saved second');

    jest.advanceTimersByTime(1000);

    expect(document.querySelector('[role="status"]')).toHaveTextContent('Saved second');
    expect(document.querySelector('[role="status"]')).toBe(liveRegion);

    queue.destroy();
  });

  it('invokes an action once from the keyboard and advances the queue', () => {
    const action = jest.fn();
    const onComplete = jest.fn();
    const queue = new SnackbarQueue();

    queue.enqueue({
      message: 'Item deleted',
      duration: Infinity,
      action: { label: 'Undo', onclick: action },
      onComplete,
    });
    queue.enqueue({ message: 'Next message', duration: Infinity });

    const actionButton = document.querySelector<HTMLButtonElement>('.mm-snackbar-action');
    actionButton?.click();
    actionButton?.click();

    expect(action).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('action', expect.any(String));
    expect(document.querySelector('[role="status"]')).toHaveTextContent('Next message');

    queue.destroy();
  });

  it('pauses the remaining timeout during pointer and focus interaction', () => {
    jest.useFakeTimers();
    const queue = new SnackbarQueue();

    queue.enqueue({
      message: 'Undo available',
      duration: 1000,
      action: { label: 'Undo', onclick: jest.fn(), dismiss: false },
    });
    const snackbar = document.querySelector<HTMLElement>('.mm-snackbar')!;
    const action = document.querySelector<HTMLButtonElement>('.mm-snackbar-action')!;

    jest.advanceTimersByTime(400);
    snackbar.dispatchEvent(new PointerEvent('pointerenter'));
    jest.advanceTimersByTime(1000);
    expect(document.body).toHaveTextContent('Undo available');

    snackbar.dispatchEvent(new PointerEvent('pointerleave'));
    jest.advanceTimersByTime(300);
    action.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    jest.advanceTimersByTime(1000);
    expect(document.body).toHaveTextContent('Undo available');

    action.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    jest.advanceTimersByTime(299);
    expect(document.body).toHaveTextContent('Undo available');

    jest.advanceTimersByTime(1);
    expect(document.querySelector('.mm-snackbar')).toBeNull();

    queue.destroy();
  });

  it('dismisses from an accessible control and reports the completion reason', () => {
    const onComplete = jest.fn();
    const queue = new SnackbarQueue();
    const id = queue.enqueue({
      message: 'Connection restored',
      dismissible: true,
      duration: Infinity,
      onComplete,
    });

    const dismissButton = document.querySelector<HTMLButtonElement>(
      '[aria-label="Dismiss notification"]'
    );
    dismissButton?.click();

    expect(onComplete).toHaveBeenCalledWith('dismiss', id);
    expect(document.querySelector('.mm-snackbar-container')).toBeNull();

    queue.destroy();
  });

  it('allows duplicates and drops the oldest waiting entry when the queue is full', () => {
    const dropped = jest.fn();
    const queue = new SnackbarQueue({ maxLength: 2 });

    const activeId = queue.enqueue({ message: 'Saved', duration: Infinity });
    const droppedId = queue.enqueue({
      message: 'Saved',
      duration: Infinity,
      onComplete: dropped,
    });
    queue.enqueue({ message: 'Latest', duration: Infinity });

    expect(dropped).toHaveBeenCalledWith('overflow', droppedId);
    expect(document.querySelector('[role="status"]')).toHaveTextContent('Saved');

    queue.dismiss(activeId);

    expect(document.querySelector('[role="status"]')).toHaveTextContent('Latest');

    queue.destroy();
  });

  it('clears active and queued entries and removes its live region', () => {
    const firstComplete = jest.fn();
    const secondComplete = jest.fn();
    const queue = new SnackbarQueue();

    queue.enqueue({ message: 'First', duration: Infinity, onComplete: firstComplete });
    queue.enqueue({ message: 'Second', duration: Infinity, onComplete: secondComplete });
    queue.clear();

    expect(firstComplete).toHaveBeenCalledWith('clear', expect.any(String));
    expect(secondComplete).toHaveBeenCalledWith('clear', expect.any(String));
    expect(document.querySelector('.mm-snackbar-container')).toBeNull();

    queue.destroy();
  });

  it('does not dismiss the next entry when an action dismisses itself', () => {
    const queue = new SnackbarQueue();
    let firstId = '';
    firstId = queue.enqueue({
      message: 'First',
      duration: Infinity,
      action: {
        label: 'Handle',
        onclick: () => queue.dismiss(firstId),
      },
    });
    queue.enqueue({ message: 'Second', duration: Infinity });

    document.querySelector<HTMLButtonElement>('.mm-snackbar-action')?.click();

    expect(document.querySelector('[role="status"]')).toHaveTextContent('Second');

    queue.destroy();
  });

  it('cannot be resurrected by a completion callback during destruction', () => {
    const queue = new SnackbarQueue();
    queue.enqueue({
      message: 'First',
      duration: Infinity,
      onComplete: () => queue.enqueue({ message: 'Resurrected', duration: Infinity }),
    });

    expect(() => queue.destroy()).toThrow(
      'Cannot enqueue a snackbar after the queue has been destroyed.'
    );
    expect(document.querySelector('.mm-snackbar-container')).toBeNull();
  });
});
