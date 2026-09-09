# 0014 Skeleton and EmptyState

Status: done
Priority: low
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: none

## Context

Loading and no-data views are currently assembled ad hoc in consuming applications. Add lightweight `Skeleton` and `EmptyState` components so data-heavy screens can communicate pending and empty states consistently without embedding application-specific layout decisions in the library.

## Acceptance Criteria

- `Skeleton` supports text, rectangular, and circular shapes with typed size/count options.
- Skeleton animation is optional, tokenized, hidden from assistive technology, and disabled under reduced-motion preferences.
- `EmptyState` supports an icon or illustration slot, title, description, primary action, secondary action, and arbitrary supplemental content.
- Empty-state actions use existing button components and remain usable with long or localized labels.
- Both components adapt to light/dark themes and expose stable class hooks and CSS custom properties.
- Layout remains usable at narrow widths and does not impose fixed application-page dimensions.
- Unit tests cover output variants and accessibility attributes.
- The example app demonstrates list/card skeletons and empty states with and without actions.

## Implementation Notes

- Keep both components presentational; loading, retry, and data-fetch state remain owned by consumers.
- Use existing typography, spacing, icon, and button primitives.
- Avoid animating layout-affecting properties.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. Treat Skeleton and EmptyState as a paired loading/no-results experience while keeping their exports independently usable.
- 2026-09-09 copilot: Implementing separate presentational `Skeleton` and `EmptyState` exports. Skeleton dimensions accept CSS lengths, text count renders independent lines, and EmptyState actions reuse `Button`/`FlatButton` through typed action descriptors.
- 2026-09-09 copilot: Completed both exports with theme-aware and reduced-motion styling, configurable heading semantics, click or navigation actions, responsive examples, search entries, and five focused tests. Full library suite passes with 270 tests.
