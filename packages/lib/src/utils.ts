import m, { FactoryComponent } from 'mithril';

/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns id followed by 8 hexadecimal characters.
 */
export const uniqueId = () => {
  // tslint:disable-next-line:no-bitwise
  return 'idxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));
};

/**
 * Create a GUID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/** Check if a string or number is numeric. @see https://stackoverflow.com/a/9716488/319711 */
export const isNumeric = (n: string | number) => !isNaN(parseFloat(n as string)) && isFinite(n as number);

/**
 * Pad left, default width 2 with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} [width=2]
 * @param {string} [z='0']
 * @returns
 */
export const padLeft = (n: string | number, width: number = 2, z: string = '0') => String(n).padStart(width, z);

export const Caret: FactoryComponent = () => {
  return {
    view: () => {
      return m(
        'svg',
        { class: 'caret', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
        [m('path', { d: 'M7 10l5 5 5-5z' }), m('path', { d: 'M0 0h24v24H0z', fill: 'none' })]
      );
    },
  };
};

// Keep only essential dropdown positioning styles
export const getDropdownStyles = (
  inputRef?: HTMLElement | null,
  overlap = false,
  options?: {
    /** ID property of the selected item */
    id?: string | number;
    /** Label to show in the dropdown */
    label: string;
    /** Optional group  */
    group?: string;
    /** Can we select the item */
    disabled?: boolean;
    /** Add a divider */
    divider?: boolean;
  }[],
  isDropDown = false
) => {
  if (!inputRef) {
    return {
      display: 'block',
      opacity: 1,
      position: 'absolute',
      top: overlap ? 0 : '100%',
      left: '0',
      zIndex: 1000,
      width: '100%',
    };
  }

  const rect = inputRef.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Calculate dropdown height based on options
  let estimatedHeight = 200; // Default fallback
  const itemHeight = 52; // Standard height for dropdown items
  if (options) {
    const groupHeaderHeight = 52; // Height for group headers

    // Count groups and total options
    const groups = new Set();
    let totalOptions = 0;

    options
      .filter((o) => !o.divider)
      .forEach((option) => {
        totalOptions++;
        if (option.group) {
          groups.add(option.group);
        }
      });

    // Calculate total height: options + group headers + padding
    estimatedHeight = totalOptions * itemHeight + groups.size * groupHeaderHeight;
  }
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  // If there's not enough space below and more space above, position dropdown above
  const shouldPositionAbove = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

  // Calculate available space and whether scrolling is needed
  const availableSpace = shouldPositionAbove ? spaceAbove : spaceBelow;

  // When positioning above, we need to consider the actual space from viewport top to input
  let effectiveAvailableSpace = availableSpace;
  if (shouldPositionAbove) {
    effectiveAvailableSpace = rect.top - 10; // Space from viewport top to input, minus margin
  }

  const needsScrolling = estimatedHeight > effectiveAvailableSpace;

  // Calculate the actual height the dropdown will take
  const actualHeight = needsScrolling ? effectiveAvailableSpace : estimatedHeight;

  // Calculate positioning when dropdown should appear above
  let topOffset;
  if (shouldPositionAbove) {
    // Calculate how much space we actually have from top of viewport to top of input
    const availableSpaceFromViewportTop = rect.top;

    // If dropdown fits comfortably above input, use normal positioning
    if (actualHeight <= availableSpaceFromViewportTop) {
      topOffset = 12 - actualHeight + (isDropDown ? itemHeight : 0); // Bottom of dropdown aligns with top of input
    } else {
      // If dropdown is too tall, position it at the very top of viewport
      // This makes the dropdown use all available space from viewport top to input top
      topOffset = -availableSpaceFromViewportTop + 5; // 5px margin from viewport top
    }
  } else {
    topOffset = overlap ? 0 : '100%';
  }

  const styles: any = {
    display: 'block',
    opacity: 1,
    position: 'absolute',
    top: typeof topOffset === 'number' ? `${topOffset}px` : topOffset,
    left: '0',
    zIndex: 1000,
    width: `${rect.width}px`,
  };

  // Only add scrolling constraints when necessary
  if (needsScrolling) {
    styles.maxHeight = `${actualHeight}px`;
    styles.overflowY = 'auto';
  }

  return styles;
};
