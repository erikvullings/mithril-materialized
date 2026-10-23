# 0021 Non-text select triggers for correct focus rings

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: none

## Context
Select-like triggers currently render as readonly text inputs (`input[type=text][readonly=true].select-dropdown.dropdown-trigger`). Chrome applies `:focus-visible` to text inputs even when they are focused with the mouse. As a result, Compact Minimal's `.dropdown-trigger:focus-visible` rule (`packages/lib/src/presets/compact-minimal.scss`) shows a focus ring when users click a `Select`. Scenario Spark currently works around this in app CSS by suppressing the ring for pointer interaction.

Focus rings must stay available for keyboard users (WCAG 2.4.7, Focus Visible). The fix is to render triggers as non-text focusable elements so the browser's own `:focus-visible` rules apply: no ring after a click, a ring after Tab.

Affected triggers:
- `packages/lib/src/select.ts` (around line 467)
- `packages/lib/src/dropdown.ts` (around line 341)
- `packages/lib/src/datepicker.ts` (month/year selects around lines 1059 and 1114)
- `packages/lib/src/search-select.ts` (readonly trigger around line 498; coordinate with 0020)

## Acceptance Criteria
- Each select-like trigger renders as a `button[type=button]` or as an element with `role="combobox"` and `tabindex="0"`, not as a text input. Use one pattern consistently.
- The trigger keeps its ARIA: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, an accessible name linked to the label, and `aria-disabled` or `disabled`.
- Keyboard behavior stays the same: Enter/Space/ArrowDown open the list, Escape closes it, and Tab moves focus on.
- Clicking a trigger in Chrome shows no focus ring; tabbing to it shows one. Check this in the default theme and in Compact Minimal.
- Looks match the current design: label float/active state, the selected-value text, overflow ellipsis, the placeholder, the disabled state, the dropdown caret, and the underline or border in every theme and preset. Update the SCSS that targets `input.select-dropdown`.
- Update the existing tests (`select.test.ts`, `outside-click-close.test.ts`, and the datepicker tests) to use the new selectors. Add tests for the role/ARIA attributes and keyboard opening.
- Assess backwards compatibility: consumer CSS and test selectors that target `input.select-dropdown` will break. Keep the `.select-dropdown.dropdown-trigger` classes, and document the change in the changelog/README as a potentially breaking change.
- Once the new element ships, Spark can drop its pointer-focus workaround. Spark changes are not part of this task.

## Implementation Notes
- Keep `.select-dropdown` and `.dropdown-trigger` class names so theme hooks keep working.
- Make sure the trigger is never submitted as a form field. Forms that rely on hidden native selects or inputs must keep working.
- Do not remove or weaken `:focus-visible` styles anywhere.
- Do not release as part of this task.

## Agent Notes
- 2026-10-23 copilot: created after the Scenario Spark focus-ring discussion. We chose the semantic non-text trigger approach over pointer-focus tracking.
- 2026-10-23 copilot: replaced readonly Select, Dropdown, and DatePicker month/year text inputs with non-submitting button comboboxes; SearchSelect retains its non-text trigger. Retained class hooks, ARIA controls, focus-visible styling, and keyboard dismissal. Documented the potentially breaking CSS selector change in both READMEs.
