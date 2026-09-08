import { createControllableFieldState } from '../src/controllable-field';
import { vi } from 'vitest';

interface FieldAttrs {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onchange?: (value: string) => void;
}

const createState = () =>
  createControllableFieldState<FieldAttrs, string>({
    controlled: (attrs) => attrs.value !== undefined && attrs.onchange !== undefined,
    value: (attrs) => attrs.value,
    defaultValue: (attrs) => attrs.defaultValue,
    fallback: () => '',
    nonInteractive: (attrs) => attrs.disabled,
    warning: (attrs) =>
      attrs.value !== undefined
        ? "Field received 'value' without 'onchange'. Use 'defaultValue' or add 'onchange'."
        : undefined,
  });

describe('Controllable field state', () => {
  it('always reads controlled values and does not retain local updates', () => {
    const state = createState();
    const attrs = { value: 'first', onchange: vi.fn() };

    state.sync(attrs);
    expect(state.controlled(attrs)).toBe(true);
    expect(state.current(attrs)).toBe('first');

    state.update(attrs, 'local');
    expect(state.current(attrs)).toBe('first');
    expect(state.current({ ...attrs, value: 'second' })).toBe('second');
  });

  it('initializes from an uncontrolled default and retains updates', () => {
    const state = createState();
    const attrs = { defaultValue: 'initial' };

    state.sync(attrs);
    expect(state.controlled(attrs)).toBe(false);
    expect(state.current(attrs)).toBe('initial');

    state.update(attrs, 'updated');
    expect(state.current({ defaultValue: 'replacement' })).toBe('updated');
  });

  it('gives non-interactive defaults precedence over values and internal updates', () => {
    const state = createState();
    const attrs = { value: 'fallback', defaultValue: 'preferred', disabled: true };

    state.sync(attrs);
    state.update(attrs, 'internal');

    expect(state.current(attrs)).toBe('preferred');
    expect(state.current({ value: 'fallback', disabled: true })).toBe('fallback');
  });

  it('warns for incomplete controlled usage but not controlled or non-interactive usage', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    createState().sync({ value: 'incomplete' });
    createState().sync({ value: 'controlled', onchange: vi.fn() });
    createState().sync({ value: 'read-only', disabled: true });

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "Field received 'value' without 'onchange'. Use 'defaultValue' or add 'onchange'."
    );

    warn.mockRestore();
  });

  it('adopts prop values until the first uncontrolled user update', () => {
    const state = createControllableFieldState<FieldAttrs, string>({
      controlled: (attrs) => attrs.value !== undefined && attrs.onchange !== undefined,
      value: (attrs) => attrs.value,
      defaultValue: (attrs) => attrs.defaultValue,
      fallback: () => '',
      adoptValueUntilInteraction: (attrs) => attrs.value,
    });

    state.sync({ value: 'first' });
    expect(state.current({ value: 'first' })).toBe('first');

    state.sync({ value: 'second' });
    expect(state.current({ value: 'second' })).toBe('second');

    state.update({ value: 'controlled', onchange: vi.fn() }, 'ignored controlled update');
    state.sync({ value: 'third' });
    expect(state.current({ value: 'third' })).toBe('third');

    state.update({ value: 'third' }, 'user update');
    state.sync({ value: 'fourth' });
    expect(state.current({ value: 'fourth' })).toBe('user update');
  });

  it('does not adopt changed props during a read', () => {
    const state = createControllableFieldState<FieldAttrs, string>({
      controlled: () => false,
      value: (attrs) => attrs.value,
      defaultValue: (attrs) => attrs.defaultValue,
      fallback: () => '',
      adoptValueUntilInteraction: (attrs) => attrs.value,
    });

    state.sync({ value: 'synced' });
    expect(state.current({ value: 'not-synced' })).toBe('synced');
  });
});
