/**
 * @fileoverview Core TypeScript utility types for mithril-materialized library
 * These types improve type safety and developer experience across all components
 */

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Component size variants used throughout the library
 * @example
 * ```typescript
 * const buttonSize: ComponentSize = 'medium';
 * const iconSize: ComponentSize = 'small';
 * ```
 */
export type ComponentSize = 'tiny' | 'small' | 'medium' | 'large';

/**
 * Material Design positioning options
 * @example
 * ```typescript
 * const tooltipPosition: MaterialPosition = 'top';
 * const dropdownPosition: MaterialPosition = 'bottom';
 * ```
 */
export type MaterialPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Extended positioning including corners and center
 */
export type ExtendedPosition = MaterialPosition | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

/**
 * Validation result - either success (true/empty string) or error (false/error message)
 * @example
 * ```typescript
 * const validator = (value: string): ValidationResult => {
 *   return value.length >= 3 || 'Must be at least 3 characters';
 * };
 * ```
 */
export type ValidationSuccess = true | '';
export type ValidationError = false | string;
export type ValidationResult = ValidationSuccess | ValidationError;

/**
 * Generic event handler type with proper typing for value and optional event
 * @template T - The type of the value being handled
 */
export interface EventHandler<T = any> {
  (value: T, event?: Event): void;
}

/**
 * Keyboard event handler with proper typing
 * @template T - The type of the associated value
 */
export interface KeyboardEventHandler<T = string> {
  (event: KeyboardEvent, value?: T): void;
}

/**
 * Valid ID types for components - allows strings and numbers
 */
export type ValidId = string | number;

/**
 * Component ID type - string branded for type safety
 */
export type ComponentId = string & { readonly __componentId: unique symbol };

/**
 * Conditional type to make ID required or optional
 * @template T - The base type
 * @template Required - Whether ID should be required
 */
export type WithId<T, Required extends boolean = false> = Required extends true
  ? T & { id: ComponentId }
  : T & { id?: ComponentId };

/**
 * Validation function interface
 * @template T - The type of value being validated
 */
export interface ValidatorFunction<T> {
  /**
   * Validates a value
   * @param value - The value to validate
   * @param element - Optional HTML element for context
   * @returns True/empty string for success, false/error message for failure
   */
  (value: T, element?: HTMLInputElement): ValidationResult;
}

/**
 * Type guard to check if validation result indicates success
 * @param result - The validation result to check
 * @returns True if validation passed
 */
export const isValidationSuccess = (result: ValidationResult): result is ValidationSuccess =>
  result === true || result === '';

/**
 * Type guard to check if validation result indicates an error
 * @param result - The validation result to check
 * @returns True if validation failed
 */
export const isValidationError = (result: ValidationResult): result is ValidationError => !isValidationSuccess(result);

// ============================================================================
// COMPONENT-SPECIFIC TYPES
// ============================================================================

/**
 * Button variant discriminated union for type-safe button configurations
 */
export type ButtonVariant =
  | { type: 'button'; submit?: never; modalId?: never }
  | { type: 'submit'; modalId?: never }
  | { type: 'modal'; modalId: string; submit?: never }
  | { type: 'reset'; modalId?: never; submit?: never };

/**
 * Input type union with proper HTML input types
 */
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number'
  | 'range'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'color'
  | 'file'
  | 'hidden';

/**
 * Input value type based on input type
 * @template T - The input type
 */
export type InputValue<T extends InputType> = T extends 'number' | 'range'
  ? number
  : T extends 'date' | 'datetime-local' | 'month' | 'time' | 'week'
  ? Date | string
  : T extends 'file'
  ? FileList | File[]
  : string;

/**
 * Icon class using template literal types for better IntelliSense
 */
export type IconClass = ComponentSize | MaterialPosition | `${ComponentSize} ${MaterialPosition}`;

/**
 * Modal type discriminated union
 */
export type ModalType =
  | { type: 'standard'; fixedFooter?: never; bottomSheet?: never }
  | { type: 'fixed-footer'; fixedFooter: true; bottomSheet?: never }
  | { type: 'bottom-sheet'; bottomSheet: true; fixedFooter?: never };

/**
 * Selection mode for components that support item selection
 */
export type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * Sort direction for sortable components
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Theme variant for components that support theming
 */
export type ThemeVariant = 'light' | 'dark' | 'auto';

/**
 * Color palette based on Material Design
 */
export type MaterialColor =
  | 'red'
  | 'pink'
  | 'purple'
  | 'deep-purple'
  | 'indigo'
  | 'blue'
  | 'light-blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'light-green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deep-orange'
  | 'brown'
  | 'grey'
  | 'blue-grey';

/**
 * Color intensity levels
 */
export type ColorIntensity =
  | 'lighten-5'
  | 'lighten-4'
  | 'lighten-3'
  | 'lighten-2'
  | 'lighten-1'
  | 'base'
  | 'darken-1'
  | 'darken-2'
  | 'darken-3'
  | 'darken-4'
  | 'accent-1'
  | 'accent-2'
  | 'accent-3'
  | 'accent-4';

/**
 * Full color specification with intensity
 */
export type MaterialColorSpec = MaterialColor | `${MaterialColor} ${ColorIntensity}`;

// ============================================================================
// ADVANCED UTILITY TYPES
// ============================================================================

/**
 * Makes specified keys required while keeping others optional
 * @template T - The base type
 * @template K - Keys to make required
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Makes specified keys optional while keeping others as-is
 * @template T - The base type
 * @template K - Keys to make optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extracts function parameter types
 * @template T - The function type
 */
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Creates a deep readonly version of a type
 * @template T - The type to make readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Represents a component that can be focused
 */
export interface Focusable {
  focus(): void;
  blur(): void;
}

/**
 * Represents a component that can be validated
 */
export interface Validatable<T = any> {
  validate(): ValidationResult;
  readonly isValid: boolean;
  readonly value: T;
}

/**
 * Configuration for components with validation
 * @template T - The type of value being validated
 */
export interface ValidationConfig<T = any> {
  /** Whether the field is required */
  required?: boolean;
  /** Minimum length for string values */
  minLength?: number;
  /** Maximum length for string values */
  maxLength?: number;
  /** Pattern to match for validation */
  pattern?: RegExp;
  /** Custom validation function */
  validator?: ValidatorFunction<T>;
  /** Whether to show validation messages inline */
  showValidationMessage?: boolean;
}

// ============================================================================
// EXPORTS
// ============================================================================

// All types are already exported via individual export declarations above
