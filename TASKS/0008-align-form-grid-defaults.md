# 0008 Align form grid defaults

Status: open
Priority: medium
Owner: unassigned
Agent: unassigned
Area: lib
Depends on: none

## Context

Most conventional field controls render a `col s12` wrapper by default, but several input-like components do not. This makes grid composition inconsistent and encourages consumers to wrap components in nested `.col` elements, which causes Materialize grid misalignment.

Make the layout behavior consistent in the next major release. The change is visually breaking for consumers that currently rely on the components having no grid column class.

## Acceptance Criteria

- In the next major release, `SearchSelect`, `FileUpload`, `LikertScale`, `Rating`, `SingleRangeSlider`, and `DoubleRangeSlider` default their outer field wrapper to `col s12`.
- Passing `className` continues to replace the default grid width, for example `className: 'col s6'`.
- `ToggleButton` and `ToggleGroup` remain inline controls without a default grid column.
- Regression tests assert both the default class and an explicit `className` override for each changed component.
- Public documentation and the Example FAQ state the new convention and include a migration note for consumers affected by the visual change.

## Implementation Notes

- Treat this as a major-version change; do not backport it to a minor release.
- Review the outer wrapper of each component before changing it: the class must be applied to the element that participates in the grid.
- Relevant sources include `packages/lib/src/search-select.ts`, `packages/lib/src/file-upload.ts`, `packages/lib/src/likert-scale.ts`, `packages/lib/src/rating.ts`, and `packages/lib/src/range-slider.ts`.
- Update `packages/example/src/components/faq/faq-page.ts` after the implementation, because it currently documents the pre-major-release exceptions.

## Agent Notes

- 2026-07-25 codex: created from the Example-app grid-layout FAQ work. The current inconsistent components were audited from source; `ToggleButton` and `ToggleGroup` are intentionally excluded because their common toolbar/inline use should not gain a full-width wrapper.
