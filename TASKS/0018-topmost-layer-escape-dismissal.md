# 0018 Topmost layer Escape dismissal

Status: done
Priority: high
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: 0011, 0012

## Context

When a menu, dropdown, or modal is open above a Sidenav, pressing Escape can close the Sidenav instead of the active foreground surface. Independent document-level key handlers compete, so dismissal order depends on listener registration rather than visual and interaction order.

## Acceptance Criteria

- Escape dismisses only the topmost open dismissible layer.
- Nested surfaces close in last-opened-first-closed order: menu/dropdown before modal, and modal before Sidenav.
- A single Escape press never dismisses multiple layers.
- Closing a foreground layer restores focus according to that component's existing behavior.
- Components unregister their layer ownership and event listeners when closed or removed.
- Focused tests cover competing layers and repeated Escape presses.

## Implementation Notes

- Prefer a shared dismissible-layer coordinator over component-specific event propagation workarounds.
- Preserve each component's existing `closeOnEsc`/`closeOnEscape` opt-out.
- Keep non-layer keyboard behavior local to the owning component.

## Agent Notes

- 2026-09-09 copilot: Created after reproducing Escape closing the example Sidenav while a foreground menu was open. Initial inspection found independent handlers in `modal.ts`, `menu.ts`, `dropdown.ts`, and `sidenav.ts`; Sidenav also removes a different anonymous listener than it registers.
- 2026-09-09 copilot: Added the LIFO coordinator in `packages/lib/src/dismissible-layer.ts` and integrated Menu, Dropdown, ModalPanel/Dialog, Sidenav, DatePicker, TimePicker, TimeRangePicker, and MaterialBox. Escape now dismisses one topmost layer per press; non-dismissible layers block lower layers, focus restoration remains component-owned, and MaterialBox timers/listeners are cleaned up. Added `packages/lib/__tests__/dismissible-layer.test.ts` for layered ordering, opt-outs, Dropdown, and MaterialBox behavior.
