# 0005 CSS layout simplification

Status: done
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
- 2026-07-24 copilot: extracted shared row/stack/cluster flex utilities into `packages/lib/sass/components/_global.scss` (with CSS-variable fallbacks), tokenized form-group grid gap in `packages/lib/sass/components/forms/_form-groups.scss`, and migrated repeated inline layout blocks in `dropdown.ts`, `search-select.ts`, and `sidenav.ts` to utility-class usage. Verified with `npm test -- layout-simplification.test.ts` (3 new tests), full `npm test` (12 suites, 143 tests, 1 skipped), `npm exec -- tsc --noEmit -p tsconfig.json`, `pnpm run build` in `packages/example`, and desktop/mobile page checks on `/#!/selections`.
