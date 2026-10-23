# 0020 SearchSelect single selection and grouped options

Status: todo
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: none

## Context
Scenario Spark uses mithril-materialized 4.1.4 `Select` for 45+ scenario types split into "My scenario types" and "Starter kit" groups. That list is long enough to need search, but `SearchSelect` does not yet work as a grouped, searchable single-select replacement.

This task builds on the combobox primitives and async `loadOptions` support from 0006, which is already complete.

Current source (`packages/lib/src/search-select.ts`, v4.1.4):
- `filteredOptions` excludes every option in `selectedIds`, so the current choice disappears from the list.
- Selected values always render as `SelectedChip`s, including when `maxSelectedOptions === 1`.
- When `maxSelectedOptions` is reached, the list shows a "max selections reached" message. In single mode, users must remove the chip before choosing another option.
- `InputOption.group` (`option.ts`) is used by `Select`, but `SearchSelect` ignores it and renders no group headings.

The acceptance criteria below are design proposals, not a finalized API.

## Acceptance Criteria
- Add an explicit single-selection mode, for example `multiple: false` or `mode: 'single'`; choose the final name during implementation. In this mode, choosing another option replaces the current selection immediately without removing a chip first.
- In single mode, show the selected option's label in the trigger/input. Do not use chips, a checkbox, or a max-reached message. Multi-select keeps its chips.
- In single mode, keep the selected option in the list and mark it with `aria-selected="true"` and a visual state.
- Render `InputOption.group` headings in source order, preserve them while filtering, and hide groups with no matching options. Ungrouped options keep working.
- Keyboard: ArrowUp/ArrowDown skip group headings, Enter selects the focused option, Escape closes without changing the value, and Tab closes and moves focus normally. Single-mode selection closes the list.
- Accessible combobox/listbox semantics: use `role="group"` with `aria-labelledby`, or an equivalent pattern, for group headings. Keep `aria-activedescendant` correct while headings are present.
- Add tests in `packages/lib/src/__tests__` for single-selection replacement, the selected-label display, grouped filtering and hiding empty groups, keyboard behavior, and ARIA attributes. Include async `loadOptions`.
- Add docs and an example in `packages/example/src/components/selections/selection-page.ts` for grouped searchable single selection. Update the README and component docs where relevant.
- Preserve multi-select behavior and the existing `maxSelectedOptions` semantics. Record the backwards-compatibility assessment in Agent Notes. Do not silently redefine `maxSelectedOptions: 1` as single mode. If aliasing is proposed, justify it and document it as a behavior change.

## Implementation Notes
- Candidate files:
  - packages/lib/src/search-select.ts
  - packages/lib/src/combobox.ts (keyboard navigation over options while skipping headings)
  - packages/lib/src/option.ts (`InputOption.group`)
  - packages/lib/src/select.ts (reference for existing group rendering)
  - packages/lib/sass/components (styles for group headings and selected states)
  - packages/example/src/components/selections/selection-page.ts
- Check the `onchange` payload shape for single mode, which takes an array today. Prefer keeping the array for consistency, or document any alternative.
- Do not release as part of this task.

## Related Observation (context only, not in scope)
- Compact Minimal's `.dropdown-trigger:focus-visible` shows a focus ring on clicked readonly `Select` inputs in Chrome. Task 0021 tracks the fix. The single-mode trigger here should use the same non-text trigger pattern.

## Agent Notes
- 2026-10-23 copilot: created from Scenario Spark feedback. Confirmed the current behavior against source.
