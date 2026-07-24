# 0007 Tests and docs alignment

Status: done
Priority: high
Owner: unassigned
Agent: copilot
Area: quality
Depends on: 0002, 0003, 0004, 0005, 0006

## Context
Close quality and communication gaps by adding targeted regression tests and documentation updates for all implemented changes.

## Acceptance Criteria
- Regression tests cover safety, readOnly precedence, exports, and overlay behavior.
- Public API docs match implemented behavior.
- Controlled component guidance remains accurate after refactors.
- Example pages demonstrate at least one new or changed behavior.

## Implementation Notes
- Candidate files:
  - packages/lib/__tests__/select.test.ts
  - packages/lib/__tests__/input.test.ts
  - packages/lib/__tests__/switch.test.ts
  - CONTROLLED_COMPONENTS.md
  - README.md
  - packages/lib/README.md
- Include notes on migration/deprecations where applicable.

## Agent Notes
- Split from 0001 to consolidate final verification and docs work.
- 2026-07-24 codex: added three regression tests covering legacy `readonly` precedence, the `ToggleButton` package-root export, and repeated shared-portal updates followed by cleanup. Fixed the portal helper so redraws reuse the existing container instead of retaining it after close. Aligned the published package README with the root documentation for async `SearchSelect`, `ToggleButton`, and combobox accessibility; documented `readonly` as a deprecated typed compatibility alias. Verified with `npm test -- primitive-helpers.test.ts safety-and-readonly.test.ts button.test.ts` (22 tests), full `npm test` (14 files, 155 passed, 1 skipped), `npm exec -- tsc --noEmit -p tsconfig.json`, and `pnpm run build` in `packages/example`.
