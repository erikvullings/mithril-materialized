# 0005 CSS layout simplification

Status: open
Priority: medium
Owner: unassigned
Agent: copilot
Area: styles
Depends on: 0004

## Context
Simplify component layout styling by moving repeated inline styles to reusable class-based flex/grid utilities.

## Acceptance Criteria
- Repeated inline layout style blocks are reduced in key components.
- Shared utility classes exist for common row/stack/cluster patterns.
- Responsive behavior is preserved across affected example pages.
- Dark/light theming behavior is unaffected.

## Implementation Notes
- Candidate files:
  - packages/lib/src/dropdown.ts
  - packages/lib/src/search-select.ts
  - packages/lib/src/sidenav.ts
  - packages/lib/sass/components/forms/_form-groups.scss
  - packages/lib/sass/components/_global.scss
- Prefer CSS variables and existing theme tokens.

## Agent Notes
- Split from 0001 as Phase 4 implementation task.
