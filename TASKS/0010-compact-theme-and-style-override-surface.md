# 0010 Compact theme and style override surface

Status: open
Priority: medium
Owner: unassigned
Agent: unassigned
Area: styles
Depends on: none

## Context

The library already supports runtime color themes (light/dark/auto), but density and many visual details are still hardcoded in component TS/Sass. We want to make consumer-level style overrides easier, similar to the recent `ModalPanel` refactor, while intentionally ignoring:

- purely dynamic/behavioral styles (portal positioning, calculated widths/heights, progress fill percentages)
- very low-value micro-tweaks where creating tokens/hooks would add maintenance cost without practical override benefit

The user also wants a compact modern theme (denser controls/spacing), but this task should define scope and plan only. Do not start implementation in this task.

## Acceptance Criteria

- A prioritized component list exists for "modal-style overrideability" updates, excluding dynamic-only style concerns.
- The list identifies which components should get stable slot classes and/or `--mm-*` tokens first.
- A compact theme strategy is defined that separates color theme from density theme.
- The compact theme strategy identifies the minimum token set needed for a pilot.
- A phased rollout plan is documented (pilot first, broader rollout later), including test/verification expectations.

## Implementation Notes

- Candidate components to update first (high override value, mostly static presentation styles):
  - `packages/lib/src/sidenav.ts`
  - `packages/lib/src/search-select.ts`
  - `packages/lib/src/dropdown.ts`
  - `packages/lib/src/select.ts`
  - `packages/lib/src/input.ts`
  - `packages/lib/src/chip.ts`
  - `packages/lib/src/datepicker.ts`
  - `packages/lib/src/timepicker.ts`
  - `packages/lib/src/time-range-picker.ts`
- Lower priority / usually skip for this initiative unless needed later:
  - strongly dynamic components such as `datatable.ts` sizing internals, progress-like inline widths, analog clock geometry
  - tiny one-off visual nits in components where className already provides sufficient control
- Theme and density foundation references:
  - `packages/lib/src/theme-switcher.ts`
  - `packages/lib/sass/components/_theme-variables.scss`
  - `packages/lib/sass/components/_variables.scss`
- Suggested compact pilot target:
  - forms + select/search + buttons + modal + table row density

## Agent Notes

- 2026-08-06 copilot: created from follow-up discussion after modal refactor. This task is planning/scope only. No code implementation started.