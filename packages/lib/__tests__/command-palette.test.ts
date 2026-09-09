import { CommandPalette } from '../src/command-palette';
import { cleanup, fireEvent, render, waitFor } from './test-utils';

const Palette = CommandPalette<'home' | 'settings'>();

describe('CommandPalette', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('filters commands through the search input', () => {
    const attrs = {
      commands: [
        { id: 'home', label: 'Go home', execute: () => undefined },
        {
          id: 'settings',
          label: 'Open settings',
          description: 'Manage preferences',
          execute: () => undefined,
        },
      ],
      defaultOpen: true,
    } as const;
    const result = render(Palette, attrs);

    fireEvent.change(result.getByRole('combobox') as HTMLInputElement, 'preferences');
    result.rerender(Palette, attrs);

    expect(result.queryByText('Go home')).toBeNull();
    expect(result.getByRole('option')).toHaveTextContent('Open settings');
  });

  it('labels grouped command results', () => {
    const result = render(Palette, {
      commands: [
        {
          id: 'home',
          label: 'Go home',
          group: 'Navigation',
          execute: () => undefined,
        },
        {
          id: 'settings',
          label: 'Open settings',
          group: 'Navigation',
          execute: () => undefined,
        },
      ],
      defaultOpen: true,
    });

    const group = result.getByRole('group', { name: 'Navigation' });

    expect(group.querySelectorAll('[role="option"]')).toHaveLength(2);
  });

  it('skips disabled commands and executes the active command at most once', () => {
    const executeHome = jest.fn();
    const executeSettings = jest.fn();
    const onClose = jest.fn();
    const result = render(Palette, {
      commands: [
        {
          id: 'home',
          label: 'Go home',
          disabled: true,
          execute: executeHome,
        },
        {
          id: 'settings',
          label: 'Open settings',
          execute: executeSettings,
        },
      ],
      defaultOpen: true,
      onClose,
    });
    const input = result.getByRole('combobox');

    fireEvent.keyDown(input, 'Enter');
    fireEvent.keyDown(input, 'Enter');

    expect(executeHome).not.toHaveBeenCalled();
    expect(executeSettings).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith('execution');
  });

  it('routes the global shortcut to one palette and cleans registrations up', () => {
    const FirstPalette = CommandPalette<'home'>();
    const SecondPalette = CommandPalette<'settings'>();
    const onFirstToggle = jest.fn();
    const onSecondToggle = jest.fn();
    const first = render(FirstPalette, {
      commands: [{ id: 'home', label: 'Go home', execute: () => undefined }],
      enableGlobalShortcut: true,
      onToggle: onFirstToggle,
    });
    const second = render(SecondPalette, {
      commands: [
        {
          id: 'settings',
          label: 'Open settings',
          execute: () => undefined,
        },
      ],
      enableGlobalShortcut: true,
      onToggle: onSecondToggle,
    });

    fireEvent.keyDown(document.body, 'k', { ctrlKey: true });

    expect(onFirstToggle).not.toHaveBeenCalled();
    expect(onSecondToggle).toHaveBeenCalledWith(true);

    second.unmount();
    onSecondToggle.mockClear();
    fireEvent.keyDown(document.body, 'k', { metaKey: true });

    expect(onFirstToggle).toHaveBeenCalledWith(true);
    expect(onSecondToggle).not.toHaveBeenCalled();

    first.unmount();
    onFirstToggle.mockClear();
    fireEvent.keyDown(document.body, 'k', { ctrlKey: true });

    expect(onFirstToggle).not.toHaveBeenCalled();
  });

  it('closes with Escape and restores focus to the invoker', async () => {
    const invoker = document.createElement('button');
    invoker.textContent = 'Open commands';
    document.body.appendChild(invoker);
    invoker.focus();
    const onClose = jest.fn();
    const result = render(Palette, {
      commands: [
        { id: 'home', label: 'Go home', execute: () => undefined },
      ],
      defaultOpen: true,
      onClose,
    });

    expect(document.activeElement).toBe(result.getByRole('combobox'));

    fireEvent.keyDown(document.body, 'Escape');

    expect(onClose).toHaveBeenCalledWith('escape');
    await waitFor(() => expect(document.activeElement).toBe(invoker));
  });

  it('moves the active result with arrows, Home, and End', () => {
    const attrs = {
      commands: [
        { id: 'home', label: 'Go home', execute: () => undefined },
        {
          id: 'settings',
          label: 'Open settings',
          execute: () => undefined,
        },
      ],
      defaultOpen: true,
    } as const;
    const result = render(Palette, attrs);
    const input = result.getByRole('combobox');
    const options = result.container.querySelectorAll('[role="option"]');

    fireEvent.keyDown(input, 'ArrowDown');
    result.rerender(Palette, attrs);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, 'Home');
    result.rerender(Palette, attrs);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, 'End');
    result.rerender(Palette, attrs);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('resets search when controlled visibility closes and reopens', () => {
    const attrs = {
      commands: [
        { id: 'home' as const, label: 'Go home', execute: () => undefined },
      ],
    };
    const result = render(Palette, { ...attrs, isOpen: true });
    const input = result.getByRole('combobox') as HTMLInputElement;

    fireEvent.change(input, 'home');
    result.rerender(Palette, { ...attrs, isOpen: true });
    expect(input).toHaveValue('home');

    result.rerender(Palette, { ...attrs, isOpen: false });
    result.rerender(Palette, { ...attrs, isOpen: true });

    expect(result.getByRole('combobox')).toHaveValue('');
  });

  it('uses custom command filtering without replacing listbox behavior', () => {
    const commandsForCustomFilter = [
      { id: 'home' as const, label: 'Go home', execute: () => undefined },
      {
        id: 'settings' as const,
        label: 'Open settings',
        execute: () => undefined,
      },
    ];
    const filterCommands = jest.fn(
      (commands: readonly (typeof commandsForCustomFilter)[number][]) =>
        commands.slice().reverse()
    );
    const result = render(Palette, {
      commands: commandsForCustomFilter,
      defaultOpen: true,
      filterCommands,
    });
    const options = result.container.querySelectorAll('[role="option"]');

    expect(filterCommands).toHaveBeenCalledWith(commandsForCustomFilter, '');
    expect(options[0]).toHaveTextContent('Open settings');
  });

  it('distinguishes an empty command set from no search matches', () => {
    const emptyAttrs = {
      commands: [] as const,
      defaultOpen: true,
      emptyText: 'Nothing configured',
      noResultsText: 'Nothing found',
    };
    const empty = render(Palette, emptyAttrs);

    expect(empty.getByText('Nothing configured')).toBeInTheDocument();
    expect(empty.getByRole('listbox')).toBeInTheDocument();
    empty.unmount();

    const commandsAttrs = {
      commands: [
        { id: 'home' as const, label: 'Go home', execute: () => undefined },
      ],
      defaultOpen: true,
      noResultsText: 'Nothing found',
    };
    const noMatch = render(Palette, commandsAttrs);

    fireEvent.change(
      noMatch.getByRole('combobox') as HTMLInputElement,
      'unmatched'
    );
    noMatch.rerender(Palette, commandsAttrs);

    expect(noMatch.getByText('Nothing found')).toBeInTheDocument();
    expect(noMatch.getByRole('listbox')).toBeInTheDocument();
  });

  it('keeps Tab and Shift+Tab on the search input', () => {
    const result = render(Palette, {
      commands: [
        { id: 'home', label: 'Go home', execute: () => undefined },
      ],
      defaultOpen: true,
    });
    const input = result.getByRole('combobox');

    fireEvent.keyDown(input, 'Tab');
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(input, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(input);
  });

  it('preserves filtered order when command groups are interleaved', () => {
    const result = render(Palette, {
      commands: [
        {
          id: 'home',
          label: 'First navigation',
          group: 'Navigation',
          execute: () => undefined,
        },
        {
          id: 'settings',
          label: 'Middle action',
          group: 'Actions',
          execute: () => undefined,
        },
        {
          id: 'home',
          label: 'Last navigation',
          group: 'Navigation',
          execute: () => undefined,
        },
      ],
      defaultOpen: true,
    });

    expect(
      Array.from(result.container.querySelectorAll('[role="option"]')).map(
        (option) => option.textContent?.trim()
      )
    ).toEqual(['First navigation', 'Middle action', 'Last navigation']);
  });

  it('does not execute a command while confirming IME input', () => {
    const execute = jest.fn();
    const result = render(Palette, {
      commands: [{ id: 'home', label: 'Go home', execute }],
      defaultOpen: true,
    });

    fireEvent.keyDown(result.getByRole('combobox'), 'Enter', {
      isComposing: true,
    });

    expect(execute).not.toHaveBeenCalled();
  });
});
