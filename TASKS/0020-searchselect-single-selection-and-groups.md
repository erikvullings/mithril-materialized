# 0020 SearchSelect single selection and grouped options

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: none

## Context
Scenario Spark uses `Select` for 45+ scenario types split into "My scenario types" and "Starter kit" groups. That list is long enough to need search, but `SearchSelect` did not yet work as a grouped, searchable single-select replacement.

This task builds on the combobox primitives and async `loadOptions` support from 0006.

## Acceptance Criteria
- Add an explicit single-selection mode using the inherited `multiple: false` API. Choosing another option immediately replaces the current selection without removing a chip first.
- In single mode, show the selected option's label in the trigger. Do not use chips, a checkbox, or a max-reached message. Multi-select keeps its chips.
- In single mode, keep the selected option in the list and mark it with `aria-selected="true"` and a visual state.
- Render `InputOption.group` headings in source order, preserve them while filtering, and hide groups with no matching options. Ungrouped options keep working.
- Keyboard: ArrowUp/ArrowDown skip group headings, Enter selects the focused option, Escape closes without changing the value, and Tab closes and moves focus normally. Single-mode selection closes the list.
- Use accessible combobox/listbox semantics, including labelled `role="group"` headings and a correct `aria-activedescendant`.
- Add tests for replacement, selected-label display, grouped filtering and empty-group hiding, keyboard behavior, ARIA attributes, async `loadOptions`, and `maxSelectedOptions` compatibility.
- Add a grouped single-select example and update README/component documentation.
- Preserve multi-select behavior and existing `maxSelectedOptions` semantics. `maxSelectedOptions: 1` does not activate single mode.

## Implementation Notes
- `onchange` continues to receive an array, including in single mode.
- No release is included in this task.

## Agent Notes
- 2026-10-23 copilot: implemented `multiple: false` single-selection replacement, grouped filtering/rendering, selected labels and accessible keyboard/listbox behavior; added static and async regression coverage and a grouped example. Existing multi-select and `maxSelectedOptions: 1` behavior remain distinct.
