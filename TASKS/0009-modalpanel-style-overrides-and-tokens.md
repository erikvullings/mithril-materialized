# 0009 ModalPanel style overrides and tokens

Status: done
Priority: medium
Owner: unassigned
Agent: copilot
Area: styles
Depends on: none

## Context

`ModalPanel` currently hardcodes many visual/layout rules as inline style objects in `packages/lib/src/modal.ts` (overlay, surface geometry, close button placement, content spacing, footer border/padding). These inline rules are hard to override and diverge from existing modal Sass defaults in `packages/lib/sass/components/_modal.scss`.

Goal: make modal styling reliably overridable while keeping behavior stable.

User constraints for this task:
- Small visual normalizations are acceptable.
- Support both customization strategies equally: CSS variables and class-based overrides.
- Preserve the current open/close modal animations; do not add new animations in this task.

## Acceptance Criteria

- Visual defaults for modal presentation are primarily class/Sass-driven, not inline-style-driven.
- Inline styles in `ModalPanel` are reduced to behavior-critical dynamic values only (if any).
- Existing open/close animation behavior is preserved.
- Stable slot-level class hooks exist for targeted overrides (overlay, surface, close button, content, footer), while retaining compatibility with existing `.modal*` classes.
- CSS custom properties are added for core modal tokens (at least overlay background, z-index layering, radius, dimensions, spacing, and shadow) with sensible fallbacks.
- Modal Sass and `ModalPanel` no longer have conflicting defaults for the same visual properties.
- Backward compatibility is documented for consumers currently overriding via `!important`.

## Implementation Notes

- Primary files:
  - `packages/lib/src/modal.ts`
  - `packages/lib/sass/components/_modal.scss`
  - `packages/lib/src/components.scss` (only if import layering adjustments are needed)
  - `packages/lib/README.md` (document new/normalized override surface)
- Refactor plan:
  - Introduce explicit slot classes in `ModalPanel` (non-breaking additions).
  - Move presentational inline rules into Sass selectors for those slot classes.
  - Replace hardcoded literals with `--mm-modal-*` custom properties.
  - Keep state toggles/class changes that are needed for behavior, but avoid style ownership in TS where CSS can own it.
- Verify in example app that regular modal, fixed-footer modal, and bottom-sheet modal still open/close as before.

## Agent Notes

- 2026-08-06 copilot: created from modal override review. Key issue: split style ownership between inline TS and Sass causes hard-to-override defaults and drift. This task captures a non-breaking first refactor to re-center ownership in Sass + tokens, with no animation expansion.
- 2026-08-06 copilot: started implementation. Refactored `packages/lib/src/modal.ts` to remove inline presentational style objects and add stable slot classes (`mm-modal-overlay`, `mm-modal-surface`, `mm-modal-close-button`, `mm-modal-content`, `mm-modal-content-with-close`, `mm-modal-title`, `mm-modal-footer`). Added tokenized Sass ownership in `packages/lib/sass/components/_modal.scss` with compatibility-preserving `.modal*` classes retained. Verified `__tests__/modal.test.ts` passes with vitest in `packages/lib`.
- 2026-08-06 copilot: fixed follow-up regressions from Example modal page testing. Cause: `.modal.mm-modal-surface` used `width: auto`, which made normal modals too narrow and allowed fixed-footer modals to collapse (their children are largely absolutely positioned). Updated `packages/lib/sass/components/_modal.scss` to `width: var(--mm-modal-width, 75%)` while keeping `max-width: var(--mm-modal-max-width, 75%)`. Re-verified with `__tests__/modal.test.ts` (15/15 passing).
- 2026-08-06 copilot: completed task. Added close-button stacking token (`--mm-modal-close-z-index`) to keep close affordance clickable above content in fixed-footer and other variants. Verified Example app behavior on `#!/modals` via browser automation: normal modal opens at width ratio 0.75 and closes cleanly; fixed-footer modal opens with visible content/footer and closes cleanly; bottom-sheet modal opens with expected bottom anchoring and closes cleanly. Documented the new ModalPanel slot classes, token surface, and migration guidance in `packages/lib/README.md`.
- 2026-08-06 copilot: accessibility follow-up fix for console warning "Blocked aria-hidden on an element because its descendant retained focus". Updated `packages/lib/src/modal.ts` to track modal DOM element + invoking focus element, blur focused descendants before close, and restore focus to the invoker after close. Verified with browser automation on `#!/modals` that normal/fixed-footer/bottom-sheet open-close flows now emit zero occurrences of the warning.