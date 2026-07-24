# 0004 Reuse primitives extraction

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: lib
Depends on: 0002, 0003

## Context
Reduce duplication by extracting shared primitives for controllable state, overlays, and form-field rendering.

## Acceptance Criteria
- A shared controllable-state helper is used by at least two existing components.
- Overlay/dropdown portal lifecycle helper is extracted and reused.
- Form-field wrapper primitive consolidates repeated label/helper/error logic.
- Behavior parity is maintained for migrated components.

## Implementation Notes
- Candidate files:
  - packages/lib/src/input.ts
  - packages/lib/src/select.ts
  - packages/lib/src/dropdown.ts
  - packages/lib/src/search-select.ts
  - packages/lib/src/radio.ts
  - packages/lib/src/rating.ts
  - packages/lib/src/likert-scale.ts
  - packages/lib/src/utils.ts
- Introduce small, focused utilities instead of a large abstraction layer.

## Agent Notes
- Split from 0001 as Phase 3 implementation task.
- 2026-07-24 copilot: extracted shared primitives into `packages/lib/src/utils.ts` for controllable-value resolution, portal sync, and form-field chrome rendering; wired them into `select.ts`, `dropdown.ts`, and `input.ts`. Verified with `/Users/erik.vullings/.nvs/default/bin/npm exec -- tsc --noEmit -p tsconfig.json`, `/Users/erik.vullings/.nvs/default/bin/npm test -- primitive-helpers.test.ts select.test.ts input.test.ts`, and the full package suite via `/Users/erik.vullings/.nvs/default/bin/npm test` (11 suites, 140 tests). No README/CLAUDE updates were needed because the refactor stayed internal.
