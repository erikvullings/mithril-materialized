# 0006 Async select and combobox primitives

Status: open
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
