# 0011 Dialog and AlertDialog abstraction

Status: open
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: unassigned
Depends on: none

## Context

The library has `ModalPanel`, but consumers still need to assemble common dialogs and destructive confirmations themselves. Add reusable `Dialog` and `AlertDialog` APIs that build on the existing modal lifecycle instead of creating a second overlay implementation.

`Dialog` should cover a labelled surface with content and ordered actions. `AlertDialog` should add the semantics and constrained interaction expected for important confirmations, including a clearly distinguishable destructive action.

## Acceptance Criteria

- `Dialog` and `AlertDialog` are exported from the package root with typed, documented attrs.
- Both controlled and uncontrolled open state follow the library's existing `isOpen`/`onToggle` conventions.
- Title, description/content, primary action, secondary action, and optional extra actions can be supplied without manually constructing modal footer markup.
- `AlertDialog` exposes appropriate alert-dialog semantics and requires an accessible name.
- Escape, backdrop dismissal, initial focus, focus trapping, and focus restoration are configurable and reuse the existing modal behavior.
- Disabled and destructive actions are visually and semantically distinct.
- Keyboard behavior and close reasons are covered by tests.
- The example app demonstrates a regular dialog and a destructive confirmation in light and dark themes.

## Implementation Notes

- Primary files are likely `packages/lib/src/modal.ts`, a new dialog source file, `packages/lib/src/index.ts`, modal Sass, and the example modal page.
- Prefer composition over copying `ModalPanel` portal, transition, and focus-management code.
- Define action ordering that remains predictable on narrow screens and under localized labels.
- Preserve `ModalPanel` compatibility; this task should be additive.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. Reuse the completed modal slot/token work in 0009 and watch for duplicated overlay lifecycle ownership.
