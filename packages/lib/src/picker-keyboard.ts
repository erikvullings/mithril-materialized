const focusableSelector = [
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  '[tabindex="0"]',
].join(',');

export const getPickerFocusableElements = (
  container: HTMLElement,
  orderedActionSelectors: string[] = []
): HTMLElement[] => {
  const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true'
  );
  if (orderedActionSelectors.length === 0) return focusable;

  const orderedActions = orderedActionSelectors
    .map((selector) => container.querySelector<HTMLElement>(selector))
    .filter((element): element is HTMLElement => Boolean(element && focusable.includes(element)));
  const actionSet = new Set(orderedActions);
  return [...focusable.filter((element) => !actionSet.has(element)), ...orderedActions];
};

export const focusFirstPickerControl = (container: HTMLElement, preferredSelector?: string): void => {
  const preferred = preferredSelector ? container.querySelector<HTMLElement>(preferredSelector) : null;
  (preferred || getPickerFocusableElements(container)[0])?.focus();
};

export const trapPickerTabKey = (
  event: KeyboardEvent,
  container: HTMLElement,
  orderedActionSelectors: string[] = []
): void => {
  if (event.key !== 'Tab') return;

  const focusable = getPickerFocusableElements(container, orderedActionSelectors);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeElement = document.activeElement;
  const activeIndex = focusable.indexOf(activeElement as HTMLElement);
  if (activeIndex < 0) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (orderedActionSelectors.length > 0) {
    event.preventDefault();
    const direction = event.shiftKey ? -1 : 1;
    focusable[(activeIndex + direction + focusable.length) % focusable.length].focus();
  } else if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};
