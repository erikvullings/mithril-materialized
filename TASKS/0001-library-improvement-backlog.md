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
- [ ] Replace unsafe HTML rendering defaults in selection/input components.
  - [ ] Remove default use of `m.trust(...)` for user-provided labels/descriptions in `radio.ts`.
  - [ ] In `autocomplete.ts`, escape user input before creating dynamic RegExp.
  - [ ] In `autocomplete.ts`, render highlight matches without injecting raw HTML.
  - [ ] If rich HTML labels are needed, add explicit opt-in props (e.g. `labelHtml`) with clear docs.
- [ ] Fix `readOnly` handling consistency in input components.
  - [ ] Normalize `readOnly` as canonical prop internally.
  - [ ] Keep backward compatibility for legacy `readonly` access if currently relied upon.
  - [ ] Align with documented controlled/uncontrolled rules.

### Phase 2: API surface and consistency
- [ ] Fix barrel exports and API discoverability.
  - [ ] Export `ToggleButton` from `packages/lib/src/index.ts`.
  - [ ] Remove duplicate exports (`datepicker`, `timepicker`) from `packages/lib/src/index.ts`.
- [ ] Improve button semantics and accessibility.
  - [ ] Prefer `<button>` for action components.
  - [ ] Reserve `<a>` usage for navigation semantics.
  - [ ] Avoid invalid/irrelevant attributes per element type (e.g. `type` on anchors).
- [ ] Standardize style typing across attrs.
  - [ ] Expand `style` types where needed to support both string and style-object patterns.
- [ ] Normalize selection/input naming conventions for easier use.
  - [ ] Define a vNext convention for `value/defaultValue/onchange` and multi-select variants.
  - [ ] Provide compatibility adapters and deprecation notes for `checkedId/defaultCheckedId` where appropriate.

### Phase 3: Reuse and architecture cleanup
- [ ] Extract shared controllable-state helper used by components with controlled/uncontrolled logic.
  - Candidate files: `input.ts`, `select.ts`, `dropdown.ts`, `radio.ts`, `rating.ts`, `likert-scale.ts`, `search-select.ts`, `autocomplete.ts`.
- [ ] Extract shared overlay/dropdown portal positioning lifecycle helper.
  - Candidate files: `select.ts`, `dropdown.ts`, `search-select.ts`, `utils.ts`.
- [ ] Introduce a shared form-field wrapper primitive.
  - Consolidate label/helper/error/required rendering patterns.

### Phase 4: CSS simplification and layout consistency
- [ ] Reduce inline style objects in TS components where class-based styling is clearer.
- [ ] Consolidate repeated row/cluster/stack patterns into shared utility classes.
- [ ] Prefer flex/grid utility classes over ad-hoc inline layout styles in components.
- [ ] Verify responsive behavior after CSS refactors.

### Phase 5: Missing/high-value components
- [ ] Add `AsyncSelect` or async mode for `SearchSelect` with loading/empty/error states.
- [ ] Consider a reusable `Combobox` primitive as foundation for Select/SearchSelect/Autocomplete.
- [ ] Add form-section primitives (`Fieldset`/`FormSection`) for grouped controls and validation summaries.

### Testing and docs
- [ ] Add tests for:
  - [ ] autocomplete regex escaping edge cases
  - [ ] safe rendering behavior replacing implicit HTML trust
  - [ ] readOnly/disabled resolution precedence
  - [ ] barrel exports/API regressions
  - [ ] overlay behavior parity after shared helper extraction
- [ ] Update docs:
  - [ ] `CONTROLLED_COMPONENTS.md`
  - [ ] root `README.md`
  - [ ] package docs/examples where public props change

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