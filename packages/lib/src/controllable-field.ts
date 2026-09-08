export interface ControllableFieldPolicy<Attrs, Value> {
  controlled: (attrs: Attrs) => boolean;
  value: (attrs: Attrs) => Value | undefined;
  defaultValue: (attrs: Attrs) => Value | undefined;
  fallback: (attrs: Attrs) => Value;
  nonInteractive?: (attrs: Attrs) => boolean | undefined;
  warning?: (attrs: Attrs) => string | undefined;
  /**
   * Returns a prop-derived value to retain as the prospective uncontrolled
   * value during sync, until the first uncontrolled user update.
   */
  adoptValueUntilInteraction?: (attrs: Attrs) => Value | undefined;
}

export interface ControllableFieldState<Attrs, Value> {
  /** Synchronize once per render before reading the current value. */
  sync: (attrs: Attrs) => void;
  current: (attrs: Attrs) => Value;
  update: (attrs: Attrs, value: Value) => void;
  controlled: (attrs: Attrs) => boolean;
}

export const createControllableFieldState = <Attrs, Value>(
  policy: ControllableFieldPolicy<Attrs, Value>
): ControllableFieldState<Attrs, Value> => {
  let internalValue: Value | undefined;
  let initialized = false;
  let hasUncontrolledInteraction = false;

  const controlled = (attrs: Attrs) => policy.controlled(attrs);
  const fallback = (attrs: Attrs) => policy.fallback(attrs);

  const sync = (attrs: Attrs) => {
    const isControlled = controlled(attrs);
    if (!initialized) {
      initialized = true;

      const isNonInteractive = Boolean(policy.nonInteractive?.(attrs));
      const warning = policy.warning?.(attrs);
      if (warning && !isControlled && !isNonInteractive) {
        console.warn(warning);
      }

      internalValue = isControlled ? fallback(attrs) : policy.defaultValue(attrs) ?? fallback(attrs);
    }

    if (!hasUncontrolledInteraction && policy.adoptValueUntilInteraction) {
      const adoptedValue = policy.adoptValueUntilInteraction(attrs);
      if (adoptedValue !== undefined) {
        internalValue = adoptedValue;
      }
    }
  };

  const current = (attrs: Attrs): Value => {
    if (controlled(attrs)) {
      return policy.value(attrs) ?? fallback(attrs);
    }

    if (policy.nonInteractive?.(attrs)) {
      return policy.defaultValue(attrs) ?? policy.value(attrs) ?? fallback(attrs);
    }

    if (!initialized) {
      return policy.defaultValue(attrs) ?? fallback(attrs);
    }

    return internalValue as Value;
  };

  const update = (attrs: Attrs, value: Value) => {
    if (!controlled(attrs)) {
      hasUncontrolledInteraction = true;
      internalValue = value;
    }
  };

  return { sync, current, update, controlled };
};
