import { getComboboxOptionId, getComboboxKeyResult } from '../src/combobox';

describe('combobox primitives', () => {
  it('opens and focuses the first option on ArrowDown from closed state', () => {
    const result = getComboboxKeyResult({
      key: 'ArrowDown',
      isOpen: false,
      focusedIndex: -1,
      optionCount: 3,
      includeActionRow: false,
    });

    expect(result.isOpen).toBe(true);
    expect(result.focusedIndex).toBe(0);
    expect(result.action).toBe('open');
    expect(result.preventDefault).toBe(true);
  });

  it('moves focus within available options when open', () => {
    const down = getComboboxKeyResult({
      key: 'ArrowDown',
      isOpen: true,
      focusedIndex: 0,
      optionCount: 2,
      includeActionRow: true,
    });

    const up = getComboboxKeyResult({
      key: 'ArrowUp',
      isOpen: true,
      focusedIndex: down.focusedIndex,
      optionCount: 2,
      includeActionRow: true,
    });

    expect(down.focusedIndex).toBe(1);
    expect(up.focusedIndex).toBe(0);
  });

  it('returns action to select focused option on Enter', () => {
    const result = getComboboxKeyResult({
      key: 'Enter',
      isOpen: true,
      focusedIndex: 1,
      optionCount: 3,
      includeActionRow: false,
    });

    expect(result.action).toBe('selectFocused');
    expect(result.preventDefault).toBe(true);
  });

  it('closes on Escape and resets focus', () => {
    const result = getComboboxKeyResult({
      key: 'Escape',
      isOpen: true,
      focusedIndex: 2,
      optionCount: 3,
      includeActionRow: false,
    });

    expect(result.isOpen).toBe(false);
    expect(result.focusedIndex).toBe(-1);
    expect(result.action).toBe('close');
  });

  it('creates stable option ids for aria-activedescendant usage', () => {
    expect(getComboboxOptionId('search-select-1', 0)).toBe('search-select-1-option-0');
    expect(getComboboxOptionId('search-select-1', 5)).toBe('search-select-1-option-5');
  });
});
