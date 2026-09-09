import m, { type Attributes, type FactoryComponent } from 'mithril';
import { createSelectionInteraction } from './combobox';
import { Dialog } from './dialog';
import { Icon } from './icon';
import type { ModalCloseReason } from './modal';
import { uniqueId } from './utils';

export interface Command<T extends string | number> {
  id: T;
  label: string;
  description?: string;
  iconName?: string;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
  execute: () => void;
}

export type CommandPaletteCloseReason = ModalCloseReason | 'execution';

export interface CommandPaletteAttrs<T extends string | number> extends Attributes {
  commands: readonly Command<T>[];
  title?: string;
  placeholder?: string;
  emptyText?: string;
  noResultsText?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  /** Receives visibility requests in controlled and uncontrolled modes. */
  onToggle?: (isOpen: boolean) => void;
  /**
   * Called after an interaction closes the palette. Focus returns to the
   * element active when the underlying dialog opened.
   */
  onClose?: (reason: CommandPaletteCloseReason) => void;
  /**
   * Enable Ctrl+K and Command+K. When multiple enabled palettes are mounted,
   * the most recently mounted palette exclusively handles the shortcut.
   */
  enableGlobalShortcut?: boolean;
  /** Customize filtering or ranking without replacing accessible result markup. */
  filterCommands?: (
    commands: readonly Command<T>[],
    query: string
  ) => readonly Command<T>[];
}

interface GlobalShortcutRegistration {
  owner: symbol;
  activate: () => void;
}

const globalShortcutRegistrations: GlobalShortcutRegistration[] = [];
let globalShortcutHandler: ((event: KeyboardEvent) => void) | undefined;

const registerGlobalShortcut = (
  owner: symbol,
  activate: () => void
) => {
  if (globalShortcutRegistrations.some((registration) => registration.owner === owner)) {
    return;
  }
  globalShortcutRegistrations.push({ owner, activate });
  if (globalShortcutHandler) return;

  globalShortcutHandler = (event) => {
    if (
      event.defaultPrevented ||
      event.key.toLocaleLowerCase() !== 'k' ||
      (!event.ctrlKey && !event.metaKey) ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }
    const registration =
      globalShortcutRegistrations[globalShortcutRegistrations.length - 1];
    if (!registration) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    registration.activate();
  };
  document.addEventListener('keydown', globalShortcutHandler);
};

const unregisterGlobalShortcut = (owner: symbol) => {
  const index = globalShortcutRegistrations.findIndex(
    (registration) => registration.owner === owner
  );
  if (index >= 0) globalShortcutRegistrations.splice(index, 1);
  if (globalShortcutRegistrations.length || !globalShortcutHandler) return;
  document.removeEventListener('keydown', globalShortcutHandler);
  globalShortcutHandler = undefined;
};

const defaultFilter = <T extends string | number>(
  commands: readonly Command<T>[],
  query: string
) => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return commands;

  return commands.filter((command) =>
    [command.label, command.description, command.group, command.shortcut]
      .filter(Boolean)
      .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery))
  );
};

/**
 * Creates a typed command palette. Instantiate once per palette and keep the
 * returned component stable between redraws.
 */
export const CommandPalette = <
  T extends string | number
>(): FactoryComponent<CommandPaletteAttrs<T>> => () => {
  const inputId = `command-palette-${uniqueId()}`;
  const listId = `${inputId}-list`;
  const shortcutOwner = Symbol('command-palette-shortcut');
  const interaction = createSelectionInteraction<T>();
  let currentAttrs: CommandPaletteAttrs<T>;
  const state = {
    isOpen: false,
    query: '',
    focusedIndex: -1,
    executedWhileOpen: false,
    lastRenderedOpen: false,
  };

  const isOpen = (attrs: CommandPaletteAttrs<T>) =>
    attrs.isOpen ?? state.isOpen;

  const setOpen = (
    attrs: CommandPaletteAttrs<T>,
    nextOpen: boolean,
    reason?: CommandPaletteCloseReason
  ) => {
    if (isOpen(attrs) === nextOpen) return;
    if (attrs.isOpen === undefined) state.isOpen = nextOpen;
    if (nextOpen) {
      state.executedWhileOpen = false;
    } else {
      state.query = '';
      state.focusedIndex = -1;
      if (reason) attrs.onClose?.(reason);
    }
    attrs.onToggle?.(nextOpen);
    m.redraw();
  };

  const executeCommand = (
    attrs: CommandPaletteAttrs<T>,
    command: Command<T> | undefined
  ) => {
    if (!command || command.disabled || state.executedWhileOpen) return;
    state.executedWhileOpen = true;
    try {
      command.execute();
    } finally {
      setOpen(attrs, false, 'execution');
    }
  };

  return {
    oninit: ({ attrs }) => {
      currentAttrs = attrs;
      state.isOpen = attrs.defaultOpen ?? false;
      state.lastRenderedOpen = isOpen(attrs);
    },

    onremove: () => {
      unregisterGlobalShortcut(shortcutOwner);
    },

    view: ({ attrs }) => {
      currentAttrs = attrs;
      if (attrs.enableGlobalShortcut) {
        registerGlobalShortcut(shortcutOwner, () =>
          setOpen(
            currentAttrs,
            !isOpen(currentAttrs),
            isOpen(currentAttrs) ? 'programmatic' : undefined
          )
        );
      } else {
        unregisterGlobalShortcut(shortcutOwner);
      }
      const open = isOpen(attrs);
      if (open !== state.lastRenderedOpen) {
        state.lastRenderedOpen = open;
        state.query = '';
        state.focusedIndex = -1;
        if (open) state.executedWhileOpen = false;
      }
      const filteredCommands = (
        attrs.filterCommands ?? defaultFilter
      )(attrs.commands, state.query);
      const visibleCommands = Array.from(filteredCommands);
      if (
        state.focusedIndex < 0 ||
        state.focusedIndex >= visibleCommands.length ||
        visibleCommands[state.focusedIndex]?.disabled
      ) {
        state.focusedIndex = visibleCommands.findIndex(
          (command) => !command.disabled
        );
      }
      const activeCommand = visibleCommands[state.focusedIndex];
      const groups = visibleCommands.reduce<
        Array<{ label?: string; commands: Array<{ command: Command<T>; index: number }> }>
      >((result, command, index) => {
        let group = result[result.length - 1];
        if (!group || group.label !== command.group) {
          group = { label: command.group, commands: [] };
          result.push(group);
        }
        group.commands.push({ command, index });
        return result;
      }, []);
      const renderCommand = (command: Command<T>, index: number) =>
        m(
          '.mm-command-palette-command',
          {
            id: `${inputId}-option-${index}`,
            role: 'option',
            tabindex: -1,
            'aria-disabled': command.disabled ? 'true' : undefined,
            'aria-selected': index === state.focusedIndex ? 'true' : 'false',
            onmousemove: () => {
              if (!command.disabled) state.focusedIndex = index;
            },
            onclick: () => executeCommand(attrs, command),
          },
          [
            command.iconName
              ? m(Icon, {
                  iconName: command.iconName,
                  'aria-hidden': 'true',
                })
              : undefined,
            m('.mm-command-palette-command-copy', [
              m('.mm-command-palette-command-label', command.label),
              command.description
                ? m(
                    '.mm-command-palette-command-description',
                    command.description
                  )
                : undefined,
            ]),
            command.shortcut ? m('kbd', command.shortcut) : undefined,
          ]
        );

      return m(Dialog, {
        title: attrs.title ?? 'Command palette',
        isOpen: open,
        onClose: (reason: ModalCloseReason) => setOpen(attrs, false, reason),
        initialFocus: `#${inputId}`,
        showCloseButton: false,
        className: ['mm-command-palette', attrs.className]
          .filter(Boolean)
          .join(' '),
        content: m('.mm-command-palette-content', [
          m('.mm-command-palette-search', [
            m(Icon, {
              iconName: 'search',
              className: 'mm-command-palette-search-icon',
              'aria-hidden': 'true',
            }),
            m('input', {
              id: inputId,
              type: 'search',
              role: 'combobox',
              autocomplete: 'off',
              placeholder: attrs.placeholder ?? 'Type a command',
              'aria-label': attrs.placeholder ?? 'Type a command',
              'aria-autocomplete': 'list',
              'aria-controls': listId,
              'aria-expanded': open ? 'true' : 'false',
              'aria-activedescendant': activeCommand
                ? `${inputId}-option-${state.focusedIndex}`
                : undefined,
              value: state.query,
              oninput: (event: InputEvent) => {
                const query = (event.target as HTMLInputElement).value;
                state.query = query;
                const nextCommands = Array.from(
                  (attrs.filterCommands ?? defaultFilter)(attrs.commands, query)
                );
                state.focusedIndex =
                  nextCommands.findIndex((command) => !command.disabled);
              },
              onkeydown: (event: KeyboardEvent) => {
                if (event.isComposing || event.keyCode === 229) return;
                const enabledIndices = visibleCommands.reduce<number[]>(
                  (indices, command, index) => {
                    if (!command.disabled) indices.push(index);
                    return indices;
                  },
                  []
                );
                if (event.key === 'Home' || event.key === 'End') {
                  event.preventDefault();
                  state.focusedIndex =
                    event.key === 'Home'
                      ? enabledIndices[0] ?? -1
                      : enabledIndices[enabledIndices.length - 1] ?? -1;
                  return;
                }
                if (
                  event.key !== 'ArrowDown' &&
                  event.key !== 'ArrowUp' &&
                  event.key !== 'Enter'
                ) {
                  return;
                }
                const result = interaction.keyboard({
                  key: event.key,
                  isOpen: true,
                  focusedIndex: state.focusedIndex,
                  options: visibleCommands,
                });
                if (result.preventDefault) event.preventDefault();
                state.focusedIndex = result.focusedIndex;
                if (result.action === 'selectFocused') {
                  executeCommand(
                    attrs,
                    visibleCommands[result.focusedIndex]
                  );
                }
              },
            }),
          ]),
          m(
            'div.mm-command-palette-results',
            { id: listId, role: 'listbox', 'aria-label': 'Commands' },
            visibleCommands.length
              ? groups.map((group, groupIndex) =>
                  group.label
                    ? m(
                        '.mm-command-palette-group',
                        {
                          role: 'group',
                          'aria-labelledby': `${inputId}-group-${groupIndex}`,
                        },
                        [
                          m(
                            '.mm-command-palette-group-label',
                            { id: `${inputId}-group-${groupIndex}` },
                            group.label
                          ),
                          group.commands.map(({ command, index }) =>
                            renderCommand(command, index)
                          ),
                        ]
                      )
                    : group.commands.map(({ command, index }) =>
                        renderCommand(command, index)
                      )
                )
              : m(
                  '.mm-command-palette-empty',
                  { role: 'status' },
                  state.query
                    ? attrs.noResultsText ?? 'No matching commands'
                    : attrs.emptyText ?? 'No commands available'
                )
          ),
        ]),
      });
    },
  };
};
