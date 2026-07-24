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

const isHandledKey = (key: string): boolean =>
  key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ' || key === 'Escape';

const getTotalRows = (optionCount: number, includeActionRow: boolean): number =>
  Math.max(0, optionCount) + (includeActionRow ? 1 : 0);

export const getComboboxKeyResult = ({
  key,
  isOpen,
  focusedIndex,
  optionCount,
  includeActionRow,
}: ComboboxKeyInput): ComboboxKeyResult => {
  const totalRows = getTotalRows(optionCount, includeActionRow);

  if (!isHandledKey(key)) {
    return { isOpen, focusedIndex, action: 'none', preventDefault: false };
  }

  if (key === 'Escape') {
    return { isOpen: false, focusedIndex: -1, action: 'close', preventDefault: true };
  }

  if (key === 'ArrowDown') {
    if (!isOpen) {
      return {
        isOpen: true,
        focusedIndex: totalRows > 0 ? 0 : -1,
        action: 'open',
        preventDefault: true,
      };
    }

    return {
      isOpen: true,
      focusedIndex: totalRows > 0 ? Math.min(focusedIndex + 1, totalRows - 1) : -1,
      action: 'none',
      preventDefault: true,
    };
  }

  if (key === 'ArrowUp') {
    if (!isOpen) {
      return {
        isOpen: true,
        focusedIndex: totalRows > 0 ? 0 : -1,
        action: 'open',
        preventDefault: true,
      };
    }

    return {
      isOpen: true,
      focusedIndex: totalRows > 0 ? Math.max(focusedIndex - 1, 0) : -1,
      action: 'none',
      preventDefault: true,
    };
  }

  if (!isOpen) {
    return {
      isOpen: true,
      focusedIndex: totalRows > 0 ? 0 : -1,
      action: 'open',
      preventDefault: true,
    };
  }

  if (focusedIndex < 0) {
    return { isOpen, focusedIndex, action: 'none', preventDefault: true };
  }

  const isActionRow = includeActionRow && focusedIndex === optionCount;
  return {
    isOpen,
    focusedIndex,
    action: isActionRow ? 'selectAction' : 'selectFocused',
    preventDefault: true,
  };
};

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
