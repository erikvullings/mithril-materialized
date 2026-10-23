# 0021 Non-text select triggers for correct focus rings

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: none

## Context
Select-like triggers rendered as readonly text inputs, causing Chrome to apply `:focus-visible` after pointer interaction. Compact Minimal should keep a focus ring for keyboard navigation without showing one after a click.

Affected triggers include Select, Dropdown, DatePicker month/year selection, and SearchSelect.

## Acceptance Criteria
- Select, Dropdown, and DatePicker month/year triggers render as `button[type=button]` comboboxes, not text inputs. SearchSelect retains its existing non-text trigger.
- Triggers retain their dropdown classes and ARIA relationships, accessible names, disabled states, and keyboard behavior.
- Tab closes an open list and moves focus normally; Escape closes it.
- Keep existing visual presentation across themes and Compact Minimal, including value text, ellipsis, placeholder, disabled state, caret, underline/border, and keyboard-visible focus.
- Update tests for trigger semantics, ARIA, keyboard behavior, and selectors.
- Document that consumer CSS targeting `input.select-dropdown` must migrate to `.select-dropdown` (or `button.select-dropdown`).
- Triggers are not form fields; existing native form controls remain unaffected.

## Implementation Notes
- Consumer selectors targeting `input.select-dropdown` are a potentially breaking change. Keep `.select-dropdown` and `.dropdown-trigger` classes.
- No release is included in this task.

## Agent Notes
- 2026-10-23 copilot: replaced readonly Select, Dropdown, and DatePicker month/year text inputs with non-submitting button comboboxes; retained class hooks, ARIA controls, native focus-visible behavior, and keyboard dismissal.
