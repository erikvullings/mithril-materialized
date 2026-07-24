# 0003 API surface and consistency

Status: in_progress
Priority: high
Owner: unassigned
Agent: copilot
Area: lib
Depends on: 0001

## Context
Improve public API consistency and discoverability with minimal breakage.

## Acceptance Criteria
- Barrel exports are complete and deduplicated.
- ToggleButton is importable from the package root.
- Button semantics are improved for accessibility.
- Attr typing for style is consistent with supported usage patterns.
- Any API naming harmonization includes compatibility notes.

## Implementation Notes
- Target files:
  - packages/lib/src/index.ts
  - packages/lib/src/button.ts
  - packages/lib/src/select.ts
  - packages/lib/src/input-options.ts
  - packages/lib/src/floating-action-button.ts
  - README.md
- Prefer additive compatibility over breaking renames.

## Agent Notes
- Split from 0001 as Phase 2 implementation task.
- Started with low-risk API surface cleanup: root barrel export deduplication and ToggleButton root export.
- Implemented initial cleanup in `packages/lib/src/index.ts`:
  - removed duplicate `datepicker` and `timepicker` exports
  - added root export for `toggle-button`
- Implemented button semantics adjustment in `packages/lib/src/button.ts`:
  - apply `type` attribute only when rendered element is `<button>`
  - avoid invalid `type` attribute on anchor-based button variants
- Standardized attr typing in key components to support style objects:
  - `packages/lib/src/input-options.ts`
  - `packages/lib/src/select.ts`
  - `packages/lib/src/floating-action-button.ts`
