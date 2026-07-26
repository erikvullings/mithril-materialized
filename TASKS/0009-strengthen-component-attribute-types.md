# 0009 Strengthen component attribute types

Status: blocked
Priority: medium
Owner: unassigned
Agent: codex
Area: types
Depends on: none

## Context

`InputAttrs` is being made a closed component-attribute type on branch
`feat/strict-component-attributes`. This rejects misspelled component
attributes and preserves arbitrary native attributes through `inputAttrs`.

Useful diagnostics for direct `m(Component, attrs)` calls additionally depend
on DefinitelyTyped PR #75307 being accepted and released in `@types/mithril`:
https://github.com/DefinitelyTyped/DefinitelyTyped/pull/75307.

## Acceptance Criteria

- Update the Mithril dependency/types after PR #75307 is available and verify
  direct invalid component calls report the component-property error rather
  than the selector-overload fallback.
- Audit every public component attribute interface that extends Mithril
  `Attributes` or otherwise inherits its open string index signature.
- Replace those open component interfaces with explicit public attributes,
  permitting `aria-*` and `data-*` where appropriate.
- Provide an explicit native-element attribute escape hatch (following
  `InputAttrs.inputAttrs`) only for components that forward attributes to a
  native element.
- Add compile-time regression tests for a wrong value type, a missing required
  attribute, and an unknown component attribute for each changed attribute
  family.
- Run the library typecheck, library tests, and example build.

## Implementation Notes

- Do not tighten types before the upstream Mithril overload-diagnostic fix is
  released; otherwise direct `m(Component, attrs)` calls retain an unhelpful
  overload error.
- Start with a search for `extends Attributes` in `packages/lib/src` and audit
  each result individually. Do not remove attributes merely because they are
  not currently documented; check their runtime forwarding behavior first.
- Keep component APIs closed. Place intentionally arbitrary HTML attributes in
  a named nested object rather than reopening the component interface with a
  broad string index signature.

## Agent Notes

- 2026-07-26 codex: blocked pending DefinitelyTyped PR #75307. The current
  branch contains the initial `InputAttrs` implementation and its type tests;
  use it as the reference pattern after upstream is released.
