export type ComboboxKeyAction = 'none' | 'open' | 'close' | 'selectFocused' | 'selectAction';

export interface ComboboxKeyInput {
  key: string;
  isOpen: boolean;
  focusedIndex: number;
  optionCount: number;
  includeActionRow: boolean;
}

export interface ComboboxKeyResult {
  isOpen: boolean;
  focusedIndex: number;
  action: ComboboxKeyAction;
  preventDefault: boolean;
}

export type ComboboxViewState = 'loading' | 'error' | 'empty' | 'ready';

export interface AsyncComboboxState<TOption> {
  options: TOption[];
  isLoading: boolean;
  error: string | null;
  latestRequestId: number;
}

export interface SelectionOption<T extends string | number> {
  id: T;
  disabled?: boolean;
}

export type SelectionCommand<T extends string | number> =
  | {
      type: 'toggle';
      selectedIds: T[];
      option: SelectionOption<T>;
      mode: 'single' | 'multiple';
      maxSelected?: number;
    }
  | {
      type: 'remove';
      selectedIds: T[];
      id: T;
    };

export interface SelectionResult<T extends string | number> {
  selectedIds: T[];
  accepted: boolean;
  close: boolean;
}

export interface SelectionKeyInput<T extends string | number> {
  key: string;
  isOpen: boolean;
  focusedIndex: number;
  options: SelectionOption<T>[];
  includeActionRow?: boolean;
  openOnArrowUp?: boolean;
}

export interface SelectionInteraction<T extends string | number> {
  selection: (command: SelectionCommand<T>) => SelectionResult<T>;
  keyboard: (input: SelectionKeyInput<T>) => ComboboxKeyResult;
}

const isHandledKey = (key: string): boolean =>
  key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ' || key === 'Escape';

export const createSelectionInteraction = <T extends string | number>(): SelectionInteraction<T> => {
  const selection = (command: SelectionCommand<T>): SelectionResult<T> => {
    if (command.type === 'remove') {
      return {
        selectedIds: command.selectedIds.filter((id) => id !== command.id),
        accepted: true,
        close: false,
      };
    }

    const { selectedIds, option, mode, maxSelected } = command;
    if (option.disabled) {
      return { selectedIds, accepted: false, close: false };
    }

    if (mode === 'single') {
      return { selectedIds: [option.id], accepted: true, close: true };
    }

    if (selectedIds.includes(option.id)) {
      return {
        selectedIds: selectedIds.filter((id) => id !== option.id),
        accepted: true,
        close: false,
      };
    }

    if (maxSelected && selectedIds.length >= maxSelected) {
      return maxSelected === 1
        ? { selectedIds: [option.id], accepted: true, close: false }
        : { selectedIds, accepted: false, close: false };
    }

    return { selectedIds: [...selectedIds, option.id], accepted: true, close: false };
  };

  const keyboard = ({
    key,
    isOpen,
    focusedIndex,
    options,
    includeActionRow = false,
    openOnArrowUp = true,
  }: SelectionKeyInput<T>): ComboboxKeyResult => {
    if (!isHandledKey(key)) {
      return { isOpen, focusedIndex, action: 'none', preventDefault: false };
    }

    if (key === 'Escape') {
      return { isOpen: false, focusedIndex: -1, action: 'close', preventDefault: true };
    }

    const focusableIndices = options.reduce<number[]>((indices, option, index) => {
      if (!option.disabled) {
        indices.push(index);
      }
      return indices;
    }, []);
    if (includeActionRow) {
      focusableIndices.push(options.length);
    }

    if (!isOpen) {
      if (key === 'ArrowUp' && !openOnArrowUp) {
        return { isOpen, focusedIndex, action: 'none', preventDefault: true };
      }
      return {
        isOpen: true,
        focusedIndex: focusableIndices[0] ?? -1,
        action: 'open',
        preventDefault: true,
      };
    }

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const currentPosition = focusableIndices.indexOf(focusedIndex);
      const nextPosition =
        key === 'ArrowDown'
          ? Math.min(currentPosition + 1, focusableIndices.length - 1)
          : Math.max(currentPosition < 0 ? 0 : currentPosition - 1, 0);

      return {
        isOpen: true,
        focusedIndex: focusableIndices[nextPosition] ?? -1,
        action: 'none',
        preventDefault: true,
      };
    }

    if (focusedIndex < 0 || !focusableIndices.includes(focusedIndex)) {
      return { isOpen, focusedIndex, action: 'none', preventDefault: true };
    }

    return {
      isOpen,
      focusedIndex,
      action: includeActionRow && focusedIndex === options.length ? 'selectAction' : 'selectFocused',
      preventDefault: true,
    };
  };

  return { selection, keyboard };
};

export const getComboboxKeyResult = ({
  key,
  isOpen,
  focusedIndex,
  optionCount,
  includeActionRow,
}: ComboboxKeyInput): ComboboxKeyResult =>
  createSelectionInteraction<number>().keyboard({
    key,
    isOpen,
    focusedIndex,
    options: Array.from({ length: Math.max(0, optionCount) }, (_, id) => ({ id })),
    includeActionRow,
  });

export const getComboboxOptionId = (baseId: string, optionIndex: number): string => `${baseId}-option-${optionIndex}`;

export const createAsyncComboboxState = <TOption>(initialOptions: TOption[] = []): AsyncComboboxState<TOption> => ({
  options: initialOptions,
  isLoading: false,
  error: null,
  latestRequestId: 0,
});

export const startAsyncComboboxRequest = <TOption>(
  state: AsyncComboboxState<TOption>
): { requestId: number; nextState: AsyncComboboxState<TOption> } => {
  const requestId = state.latestRequestId + 1;
  return {
    requestId,
    nextState: {
      ...state,
      isLoading: true,
      error: null,
      latestRequestId: requestId,
    },
  };
};

export const resolveAsyncComboboxRequest = <TOption>(
  state: AsyncComboboxState<TOption>,
  requestId: number,
  options: TOption[]
): AsyncComboboxState<TOption> => {
  if (requestId !== state.latestRequestId) {
    return state;
  }

  return {
    ...state,
    options,
    isLoading: false,
    error: null,
  };
};

export const rejectAsyncComboboxRequest = <TOption>(
  state: AsyncComboboxState<TOption>,
  requestId: number,
  errorMessage: string
): AsyncComboboxState<TOption> => {
  if (requestId !== state.latestRequestId) {
    return state;
  }

  return {
    ...state,
    options: [],
    isLoading: false,
    error: errorMessage,
  };
};

export const getComboboxViewState = ({
  isLoading,
  error,
  optionCount,
}: {
  isLoading: boolean;
  error: string | null;
  optionCount: number;
}): ComboboxViewState => {
  if (isLoading) {
    return 'loading';
  }
  if (error) {
    return 'error';
  }
  if (optionCount === 0) {
    return 'empty';
  }
  return 'ready';
};
