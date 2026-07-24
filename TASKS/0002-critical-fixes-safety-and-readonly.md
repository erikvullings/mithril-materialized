# 0002 Critical fixes safety and readonly

Status: done
Priority: high
Owner: unassigned
Agent: copilot
Area: lib
Depends on: 0001

## Context
Implement the highest-risk review findings first: unsafe rendering defaults and readOnly behavior inconsistencies.

## Acceptance Criteria
- Unsafe default HTML trust paths are removed or made explicit opt-in.
- Autocomplete highlighting works without raw HTML injection.
- Dynamic autocomplete matching cannot throw on regex-special user input.
- Input readOnly behavior is consistent with documented rules.
- Backward compatibility is preserved where practical.

## Implementation Notes
- Target files:
  - packages/lib/src/autocomplete.ts
  - packages/lib/src/radio.ts
  - packages/lib/src/input.ts
  - packages/lib/src/input-options.ts
  - CONTROLLED_COMPONENTS.md
- Keep public API stable unless change is required for safety.
- Add tests for regex escaping and readOnly precedence.

## Agent Notes
- Split from 0001 as Phase 1 implementation task.
- Started implementation: safe autocomplete highlighting, explicit opt-in HTML rendering for radio labels/description, and readOnly normalization in input handling.
- Implemented changes:
  - `packages/lib/src/autocomplete.ts`: removed dynamic RegExp and `m.trust` usage for highlighting; added safe segmented highlight rendering.
  - `packages/lib/src/radio.ts`: added `allowHtml` opt-in; plain text rendering is now default.
  - `packages/lib/src/input.ts`: normalized `readOnly` handling with legacy `readonly` compatibility.
  - `packages/lib/__tests__/safety-and-readonly.test.ts`: added regression coverage.
  - `CONTROLLED_COMPONENTS.md`, `README.md`, `packages/lib/README.md`: documented new safety/default behavior.
- Validation:
  - `/Users/erik.vullings/.nvs/default/bin/npm test -- safety-and-readonly.test.ts input.test.ts`
  - Result: 2 suites passed, 21 tests passed.
