import { createSelectionInteraction, getComboboxOptionId, getComboboxKeyResult } from '../src/combobox';

describe('selection interaction', () => {
  const interaction = createSelectionInteraction<string>();
  const options = [
    { id: 'a' },
    { id: 'disabled', disabled: true },
    { id: 'b' },
  ];

  it('selects one option and requests close in single mode', () => {
    expect(
      interaction.selection({
        type: 'toggle',
        selectedIds: ['a'],
        option: options[2],
        mode: 'single',
      })
    ).toEqual({ selectedIds: ['b'], accepted: true, close: true });
  });

  it('toggles and removes ids in multiple mode', () => {
    const added = interaction.selection({
      type: 'toggle',
      selectedIds: ['a'],
      option: options[2],
      mode: 'multiple',
    });
    const toggledOff = interaction.selection({
      type: 'toggle',
      selectedIds: added.selectedIds,
      option: options[0],
      mode: 'multiple',
    });
    const removed = interaction.selection({
      type: 'remove',
      selectedIds: toggledOff.selectedIds,
      id: 'b',
    });

    expect(added.selectedIds).toEqual(['a', 'b']);
    expect(toggledOff.selectedIds).toEqual(['b']);
    expect(removed.selectedIds).toEqual([]);
  });

  it('rejects disabled options', () => {
    expect(
      interaction.selection({
        type: 'toggle',
        selectedIds: ['a'],
        option: options[1],
        mode: 'multiple',
      })
    ).toEqual({ selectedIds: ['a'], accepted: false, close: false });
  });

  it('enforces maximum selection and replaces when max is one', () => {
    expect(
      interaction.selection({
        type: 'toggle',
        selectedIds: ['a'],
        option: options[2],
        mode: 'multiple',
        maxSelected: 1,
      }).selectedIds
    ).toEqual(['b']);

    expect(
      interaction.selection({
        type: 'toggle',
        selectedIds: ['a', 'b'],
        option: { id: 'c' },
        mode: 'multiple',
        maxSelected: 2,
      })
    ).toEqual({ selectedIds: ['a', 'b'], accepted: false, close: false });
  });

  it('opens on the first enabled option and navigates around disabled options', () => {
    const opened = interaction.keyboard({
      key: 'ArrowDown',
      isOpen: false,
      focusedIndex: -1,
      options,
    });
    const moved = interaction.keyboard({
      key: 'ArrowDown',
      isOpen: opened.isOpen,
      focusedIndex: opened.focusedIndex,
      options,
    });
    const movedBack = interaction.keyboard({
      key: 'ArrowUp',
      isOpen: moved.isOpen,
      focusedIndex: moved.focusedIndex,
      options,
    });

    expect(opened).toMatchObject({ isOpen: true, focusedIndex: 0, action: 'open' });
    expect(moved.focusedIndex).toBe(2);
    expect(movedBack.focusedIndex).toBe(0);
  });

  it.each(['Enter', ' '])('returns a selection action for %j', (key) => {
    expect(
      interaction.keyboard({
        key,
        isOpen: true,
        focusedIndex: 2,
        options,
      })
    ).toMatchObject({ action: 'selectFocused', preventDefault: true });
  });

  it('closes and clears focus on Escape', () => {
    expect(
      interaction.keyboard({
        key: 'Escape',
        isOpen: true,
        focusedIndex: 2,
        options,
      })
    ).toMatchObject({ isOpen: false, focusedIndex: -1, action: 'close' });
  });

  it('navigates to and selects the action row', () => {
    const actionFocused = interaction.keyboard({
      key: 'ArrowDown',
      isOpen: true,
      focusedIndex: 2,
      options,
      includeActionRow: true,
    });

    expect(actionFocused.focusedIndex).toBe(3);
    expect(
      interaction.keyboard({
        key: 'Enter',
        isOpen: true,
        focusedIndex: actionFocused.focusedIndex,
        options,
        includeActionRow: true,
      }).action
    ).toBe('selectAction');
  });
});

describe('combobox compatibility primitives', () => {
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
