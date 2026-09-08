// Utility functions for the library
import m from 'mithril';
import { HelperText, Label } from './label';
import { SortSelected } from './select';
import { InputOption } from '.';
import { createControllableFieldState } from './controllable-field';

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
 * Sort options array based on sorting configuration
 * @param options - Array of options to sort
 * @param sortConfig - Sort configuration: 'asc', 'desc', 'none', or custom comparator function
 * @returns Sorted array (or original if 'none' or undefined)
 */
export const sortOptions = <T extends string | number>(
  options: InputOption<T>[],
  sortConfig?: SortSelected<T>
): { id: T; label?: string }[] => {
  if (!sortConfig || sortConfig === 'none') {
    return options;
  }

  const sorted = [...options]; // Create a copy to avoid mutating original

  if (typeof sortConfig === 'function') {
    return sorted.sort(sortConfig);
  }

  // Sort by label, fallback to id if no label
  return sorted.sort((a, b) => {
    const aLabel = (a.label || a.id.toString()).toLowerCase();
    const bLabel = (b.label || b.id.toString()).toLowerCase();

    const comparison = aLabel.localeCompare(bLabel);
    return sortConfig === 'asc' ? comparison : -comparison;
  });
};

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

export const normalizeSelection = <T>(value?: T | T[]): T[] => {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export interface ControllableValueOptions<T> {
  controlled: boolean;
  disabled?: boolean;
  controlledValue?: T;
  defaultValue?: T;
  internalValue?: T;
  fallbackValue: T;
}

export const resolveControllableValue = <T>(options: ControllableValueOptions<T>): T => {
  const valueState = createControllableFieldState<ControllableValueOptions<T>, T>({
    controlled: (attrs) => attrs.controlled,
    value: (attrs) => attrs.controlledValue,
    defaultValue: (attrs) => (attrs.disabled ? attrs.defaultValue : attrs.internalValue ?? attrs.defaultValue),
    fallback: (attrs) => attrs.fallbackValue,
    nonInteractive: (attrs) => attrs.disabled,
  });
  valueState.sync(options);
  return valueState.current(options);
};

export interface FieldChromeOptions {
  label?: string;
  id?: string;
  isMandatory?: boolean;
  isActive?: boolean | string;
  initialValue?: boolean;
  helperText?: string;
  dataError?: string;
  dataSuccess?: string;
}

export const renderFieldChrome = ({
  label,
  id,
  isMandatory,
  isActive,
  initialValue,
  helperText,
  dataError,
  dataSuccess,
}: FieldChromeOptions): m.Children[] => {
  return [
    label
      ? m(Label, {
          label,
          id,
          isMandatory,
          isActive,
          initialValue,
        })
      : undefined,
    helperText || dataError || dataSuccess
      ? m(HelperText, {
          helperText,
          dataError,
          dataSuccess,
        })
      : undefined,
  ].filter(Boolean) as m.Children[];
};

// Keep only essential dropdown positioning styles
export const getDropdownStyles = (
  inputRef?: HTMLElement | null,
  overlap = false,
  options?: {
    /** ID property of the selected item */
    id?: string | number;
    /** Label to show in the dropdown */
    label?: string;
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

    // Match the select dropdown's CSS max-height. Positioning with the full
    // option count would otherwise leave a gap above an input near the bottom
    // of the viewport when the rendered menu is capped at 400px.
    estimatedHeight = Math.min(totalOptions * itemHeight + groups.size * groupHeaderHeight, 400);
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

  const styles: any = {
    display: 'block',
    opacity: 1,
    position: 'absolute',
    left: '0',
    zIndex: 1000,
    width: `${rect.width}px`,
  };

  if (shouldPositionAbove) {
    // This menu is absolutely positioned inside the select wrapper. A negative
    // `top` calculated from viewport coordinates becomes wrong when an ancestor
    // scrolls (as ScenarioSpark's main area does). Anchor the menu to its local
    // containing block instead; its height can then change without detaching it
    // from the input.
    styles.top = 'auto';
    styles.bottom = `${isDropDown ? -18 : inputRef.offsetHeight - 12}px`;
  } else {
    styles.top = overlap ? 0 : '100%';
  }

  // Only add scrolling constraints when necessary
  if (needsScrolling) {
    styles.maxHeight = `${actualHeight}px`;
    styles.overflowY = 'auto';
  }

  return styles;
};

/**
 * Generate a range of numbers from a to and including b, i.e. [a, b]
 * @example: console.log(range(5, 10)); // [5, 6, 7, 8, 9, 10]
 */
export const range = (a: number, b: number): number[] => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export {
  clearPortal,
  getPortalContainer,
  releasePortalContainer,
  renderToPortal,
  syncPortalContent,
} from './portal';
export type { PortalSyncOptions } from './portal';
