# 0015 CommandPalette

Status: open
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: unassigned
Depends on: 0011

## Context

Applications with many routes and actions benefit from a keyboard-first command launcher. Add a `CommandPalette` that composes the shared dialog behavior from 0011 with the existing combobox/search primitives rather than creating another bespoke modal and filtering implementation.

## Acceptance Criteria

- A typed command model supports identifiers, labels, optional descriptions/icons/shortcuts, groups, disabled state, and execution callbacks.
- The palette supports controlled/uncontrolled open state and an opt-in global shortcut such as `Ctrl/Cmd+K`.
- Search handles keyboard input, highlights the active result, and supports empty and no-match states.
- Arrow keys, Home/End, Enter, Escape, and Tab behave predictably while focus remains inside the palette.
- Commands execute at most once and the close/focus-restoration policy is documented.
- Multiple palette instances do not install conflicting global shortcut handlers.
- Filtering can be customized without requiring consumers to replace the accessible list behavior.
- Tests cover shortcut registration/cleanup, filtering, grouped results, keyboard execution, disabled commands, and focus restoration.
- The example app demonstrates navigation and action commands with visible shortcut hints.

## Implementation Notes

- Build on `Dialog` from 0011 and combobox primitives in `packages/lib/src/combobox.ts`.
- Keep fuzzy-search libraries out of the core dependency graph unless a concrete need and size impact are documented.
- Async command providers are optional for the first iteration; design the API so they can be added without breaking synchronous usage.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. 0011 is a hard dependency so focus trapping, Escape behavior, and overlay ownership are not duplicated.
