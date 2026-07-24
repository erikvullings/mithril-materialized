# 0006 Async select and combobox primitives

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: 0003, 0004

## Context
Add high-value selection primitives to improve real-world usage for remote and large option sets.

## Acceptance Criteria
- Async selection flow exists with loading, empty, and error states.
- SearchSelect supports async usage or a new AsyncSelect component is introduced.
- A reusable combobox primitive is defined or implemented for shared behavior.
- Keyboard and accessibility behavior is documented and tested.

## Implementation Notes
- Candidate files:
  - packages/lib/src/search-select.ts
  - packages/lib/src/select.ts
  - packages/lib/src/dropdown.ts
  - packages/example/src/components/selections/selection-page.ts
- Keep component API coherent with existing controlled/uncontrolled patterns.

## Agent Notes
- Split from 0001 as Phase 5 implementation task.
- 2026-07-24 copilot: added reusable combobox primitives in `packages/lib/src/combobox.ts` (keyboard navigation, async request-state helpers, and view-state derivation), wired async SearchSelect support via `loadOptions` with loading/empty/error states and ARIA combobox/listbox attributes in `packages/lib/src/search-select.ts`, and added a remote async SearchSelect example in `packages/example/src/components/selections/selection-page.ts`. Verified with `npm test -- combobox.test.ts async-search-select.test.ts` (10 tests), full `npm test` (14 files, 153 tests with 1 skipped), `npm exec -- tsc --noEmit -p tsconfig.json`, and `pnpm run build` in `packages/example`.
