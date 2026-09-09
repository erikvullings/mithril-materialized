# 0013 Snackbar queue with actions

Status: open
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: unassigned
Depends on: none

## Context

The existing Toast API can show transient messages, but applications need ordered feedback when several operations finish close together. Add a snackbar queue that presents messages predictably, supports one contextual action, and does not cause later messages to overwrite or visually stack on top of one another.

## Acceptance Criteria

- A typed queue API can enqueue, dismiss, and clear snackbars and returns a stable identifier for each entry.
- Entries are presented in insertion order with a documented policy for queue length and duplicate messages.
- A snackbar supports text, an optional action, an optional dismiss control, duration, and completion callbacks.
- Action invocation runs once, dismisses according to the documented policy, and remains usable from the keyboard.
- Timers pause while focus or pointer interaction is within the snackbar and resume without losing the remaining duration.
- Announcements use an appropriate live region without repeatedly announcing queued-but-hidden messages.
- Reduced-motion preferences and light/dark theme tokens are respected.
- Tests cover ordering, timers, actions, dismissal, cleanup, and accessibility attributes.
- The example app demonstrates several queued messages and an Undo action.

## Implementation Notes

- Investigate whether to evolve `toast.ts` behind a shared queue manager or introduce `Snackbar` while keeping `toast()` backward compatible.
- Keep application state outside global DOM nodes; portal nodes and timers must be cleaned up.
- Do not render multiple assertive live regions for the same queue.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. Preserve the existing Toast API unless a documented compatibility layer is included.
