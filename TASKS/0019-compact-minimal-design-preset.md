# 0019 Compact minimal design preset

Status: done
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: 0010

## Context

The default Materialized presentation is intentionally spacious, which works well for general-purpose and touch-friendly interfaces but forces consumers of dense desktop applications to maintain extensive overrides. Procyon, for example, needs a compact, minimal visual language suited to a keyboard-and-mouse file manager.

Implement one reusable, opt-in `compact-minimal` design preset. This task deliberately does not introduce a family of presets: the default remains unchanged, and additional visual styles should only be considered after this preset establishes a stable token and compatibility model.

The preset must remain independent from the existing light/dark/auto color theme. Consumers should be able to combine compact-minimal density and geometry with any supported color theme.

## Acceptance Criteria

- Consumers can opt into the compact-minimal preset globally without setting variant props on individual components.
- The existing default design remains visually and behaviorally backward-compatible when the preset is not enabled.
- The preset composes correctly with explicit light and dark themes and automatic system theme selection.
- Shared CSS custom properties cover the preset's meaningful density and visual decisions, including:
  - spacing scale and component padding
  - control, menu-item, navigation-item, and table-row heights
  - typography scale and line height
  - border radii
  - borders, dividers, and elevation
  - hover, focus, selected, disabled, and active states
- The first implementation covers the desktop application surfaces most relevant to a file manager:
  - buttons and icon buttons
  - text, numeric, and search inputs
  - select, SearchSelect, dropdown, Menu, and ContextMenu
  - Sidenav and navigation items
  - Dialog, ModalPanel, and CommandPalette
  - DataTable and VirtualList rows
  - Snackbar, Avatar, Skeleton, and EmptyState where shared density tokens apply
- Interactive targets remain accessible; compact sizing must not remove keyboard focus visibility or make touch-target tradeoffs implicit.
- Logical CSS properties preserve left-to-right and right-to-left behavior.
- The package exposes a documented import or root-attribute activation contract, for example `mithril-materialized/presets/compact-minimal.css` and/or `data-mm-preset="compact-minimal"`.
- The example app includes a runtime comparison between default and compact-minimal presentation in both light and dark modes.
- Automated tests cover preset activation, token presence, default-style isolation, and key component class/attribute contracts.
- Browser verification covers Edge/Chromium at desktop and narrow widths, including menus, forms, navigation, dialogs, and large virtualized tables.
- Both root and package READMEs document installation, activation, composition with color themes, supported surfaces, and intentional limitations.

## Implementation Notes

- Complete the planning and token inventory in 0010 before implementation.
- Prefer root-level CSS custom properties and stable slot classes over `compact`, `dense`, or `minimal` props on every component.
- Keep behavioral and calculated values in component code. Do not tokenize portal coordinates, measured widths, progress values, virtual-scroll offsets, or similar runtime geometry.
- Treat density and visual style as separate concepts internally even though this first public preset combines both:
  - density: smaller spacing, padding, row heights, and typography
  - minimal style: reduced elevation, restrained borders, and modest radii
- Establish semantic tokens rather than component-specific values where practical, for example:
  - `--mm-density-unit`
  - `--mm-control-height`
  - `--mm-row-height`
  - `--mm-menu-item-height`
  - `--mm-control-padding-inline`
  - `--mm-surface-radius`
  - `--mm-surface-shadow`
- Use component-specific tokens only where a shared semantic token cannot express the requirement without regressions.
- Avoid copying Marta branding or proprietary assets. The target is a generic compact desktop-tool aesthetic informed by Procyon's needs.
- Relevant foundations:
  - `packages/lib/sass/components/_theme-variables.scss`
  - `packages/lib/sass/components/_variables.scss`
  - `packages/lib/src/theme-switcher.ts`
  - `packages/lib/src/components.scss`
  - `packages/lib/sass/materialize.scss`

## Agent Notes

- 2026-09-10 copilot: Created as the implementation follow-up to planning task 0010. Scope is intentionally limited to one opt-in compact-minimal preset; the default design and future preset families are out of scope.
- 2026-09-10 copilot: Started implementation after completing 0010. The public contract will be a standalone `presets/compact-minimal.css` import plus `data-mm-preset="compact-minimal"` on the document root. Component APIs and runtime-calculated geometry remain unchanged.
- 2026-09-10 copilot: Implemented the scoped preset, package export and build target, Theme-page comparison, search entry, and README guidance. Covered forms, actions, menus, navigation, overlays, data display, feedback, identity, and loading/empty states; coarse pointers raise interaction targets to 40px. Browser validation covered default isolation, light/dark composition, desktop/touch layouts, input-label clearance, and horizontal overflow. All 305 library tests pass and both production packages build. The example's standalone typecheck retains unrelated pre-existing `unknown`-to-`string` errors in `navigation-page.ts`.
- 2026-09-10 copilot: Follow-up added a compact semantic heading/body scale, restored flush TextInput content alignment, and centered prefix icons against compact controls. Logical label/content offsets and explicit Material Icon RTL correction keep prefixed TextInput and Select layouts aligned in both directions.
