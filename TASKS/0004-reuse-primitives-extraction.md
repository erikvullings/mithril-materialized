# 0004 Reuse primitives extraction

Status: open
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
