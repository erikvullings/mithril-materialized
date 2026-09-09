# 0012 Menu and context menu

Status: done
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: none

## Context

The library has dropdown and selection primitives, but no general-purpose action menu or pointer-positioned context menu. Consumers need a consistent way to present short action lists from a button, keyboard invocation, or right-click without treating the content as a form select.

## Acceptance Criteria

- A typed `Menu` API supports trigger anchoring, controlled/uncontrolled open state, items, separators, disabled items, icons, and selection callbacks.
- Context-menu usage supports right-click and the keyboard context-menu gesture (`ContextMenu` or `Shift+F10`).
- Arrow keys, Home/End, Enter/Space, Escape, and typeahead follow menu interaction conventions.
- Focus enters the first appropriate item, skips disabled/separator entries, and returns to the invoker after close.
- Positioning handles viewport edges, scrolling, and both left-to-right and right-to-left layouts.
- Menu semantics use `menu`/`menuitem` roles without reusing select/listbox semantics incorrectly.
- Unit tests cover keyboard navigation, dismissal, disabled items, focus restoration, and collision positioning.
- The example app demonstrates an anchored action menu and a context menu.

## Implementation Notes

- Reuse the shared portal/positioning lifecycle used by dropdown and selection components.
- Keep nested submenus out of the initial scope unless they can be added without compromising focus and pointer behavior.
- Avoid global listeners that survive component removal.
- Ensure opening a context menu suppresses only the intended native context menu.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. This is an action menu, not another Select variant; preserve the semantic distinction in API and accessibility tests.
- 2026-09-09 copilot: Added portal-backed `Menu` and `ContextMenu` components in `packages/lib/src/menu.ts` with render-prop triggers, controlled/uncontrolled state, roving focus, typeahead, context-menu gestures, coordinated dismissal, and collision-aware LTR/RTL positioning. Added menu Sass, unit coverage, package exports, and anchored/context examples on the modal page.
