# 0001 Library improvement backlog

Status: open
Priority: high
Owner: unassigned
Agent: copilot
Area: lib
Depends on: none

## Context
Review findings for the library identified opportunities in five areas:
- more reuse (shared controllable state and shared overlay logic)
- missing/high-value components (async selection primitives)
- easier use (attribute naming and API consistency)
- safer rendering and behavior correctness
- simpler CSS and more class-driven flex/grid usage

This task captures the backlog so implementation can be planned and tracked incrementally.

## Acceptance Criteria
- A prioritized implementation plan exists for all findings listed below.
- Critical correctness/security fixes are implemented first.
- API consistency changes include a backward-compatible migration path.
- New or changed behavior is covered by tests.
- Documentation is updated for any public API or behavior changes.

## Implementation Notes
### Phase 1: Critical fixes (correctness/security)
- [x] Replace unsafe HTML rendering defaults in selection/input components.
  - [x] Remove default use of `m.trust(...)` for user-provided labels/descriptions in `radio.ts`.
  - [x] In `autocomplete.ts`, escape user input before creating dynamic RegExp.
  - [x] In `autocomplete.ts`, render highlight matches without injecting raw HTML.
  - [x] If rich HTML labels are needed, add explicit opt-in props (e.g. `labelHtml`) with clear docs.
- [x] Fix `readOnly` handling consistency in input components.
  - [x] Normalize `readOnly` as canonical prop internally.
  - [x] Keep backward compatibility for legacy `readonly` access if currently relied upon.
  - [x] Align with documented controlled/uncontrolled rules.

### Phase 2: API surface and consistency
- [x] Fix barrel exports and API discoverability.
  - [x] Export `ToggleButton` from `packages/lib/src/index.ts`.
  - [x] Remove duplicate exports (`datepicker`, `timepicker`) from `packages/lib/src/index.ts`.
- [x] Improve button semantics and accessibility.
  - [x] Prefer `<button>` for action components.
  - [x] Reserve `<a>` usage for navigation semantics.
  - [x] Avoid invalid/irrelevant attributes per element type (e.g. `type` on anchors).
- [x] Standardize style typing across attrs.
  - [x] Expand `style` types where needed to support both string and style-object patterns.
- [ ] Normalize selection/input naming conventions for easier use.
  - [ ] Define a vNext convention for `value/defaultValue/onchange` and multi-select variants.
  - [ ] Provide compatibility adapters and deprecation notes for `checkedId/defaultCheckedId` where appropriate.

### Phase 3: Reuse and architecture cleanup
- [x] Extract shared controllable-state helper used by components with controlled/uncontrolled logic.
  - Candidate files: `input.ts`, `select.ts`, `dropdown.ts`, `radio.ts`, `rating.ts`, `likert-scale.ts`, `search-select.ts`, `autocomplete.ts`.
- [x] Extract shared overlay/dropdown portal positioning lifecycle helper.
  - Candidate files: `select.ts`, `dropdown.ts`, `search-select.ts`, `utils.ts`.
- [x] Introduce a shared form-field wrapper primitive.
  - Consolidate label/helper/error/required rendering patterns.

### Phase 4: CSS simplification and layout consistency
- [x] Reduce inline style objects in TS components where class-based styling is clearer.
- [x] Consolidate repeated row/cluster/stack patterns into shared utility classes.
- [x] Prefer flex/grid utility classes over ad-hoc inline layout styles in components.
- [x] Verify responsive behavior after CSS refactors.

### Phase 5: Missing/high-value components
- [x] Add `AsyncSelect` or async mode for `SearchSelect` with loading/empty/error states.
- [x] Consider a reusable `Combobox` primitive as foundation for Select/SearchSelect/Autocomplete.
- [ ] Add form-section primitives (`Fieldset`/`FormSection`) for grouped controls and validation summaries.

### Testing and docs
- [x] Add tests for:
  - [x] autocomplete regex escaping edge cases
  - [x] safe rendering behavior replacing implicit HTML trust
  - [x] readOnly/disabled resolution precedence
  - [x] barrel exports/API regressions
  - [x] overlay behavior parity after shared helper extraction
- [x] Update docs:
  - [x] `CONTROLLED_COMPONENTS.md`
  - [x] root `README.md`
  - [x] package docs/examples where public props change

## Agent Notes
- Created from a repository review focused on reuse, missing components, API consistency, and CSS simplification.
- Recommended execution order: Phase 1, then Phase 2, then Phase 3/4, then Phase 5.
- Subtasks created:
  - 0002 critical fixes safety and readonly
  - 0003 api surface and consistency
  - 0004 reuse primitives extraction
  - 0005 css layout simplification
  - 0006 async select and combobox primitives
  - 0007 tests and docs alignment
- 2026-07-24 codex: audited completed subtasks 0002–0007 against this checklist and marked implemented items complete. This backlog remains open for button element semantics, a vNext selection/input naming convention with compatibility adapters, and form-section primitives.
- 2026-07-24 codex: action variants (`Button`, `LargeButton`, `SmallButton`, and `FlatButton`) now render native buttons, while `href` selects anchor navigation semantics. Added regression coverage and migration guidance in both public READMEs. Verified with `npm test -- button.test.ts` (12 tests), full library tests, typecheck, and the example production build.
