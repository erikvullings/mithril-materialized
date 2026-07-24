# 0007 Tests and docs alignment

Status: open
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
