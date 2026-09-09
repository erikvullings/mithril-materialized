# 0013 Snackbar queue with actions

Status: done
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: copilot
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
- 2026-09-09 copilot: Implementing a separate `SnackbarQueue` so the existing `Toast` API remains backward compatible. The queue will show one entry at a time, allow duplicates, and retain at most 10 entries by dropping the oldest waiting entry when full.
- 2026-09-09 copilot: Added `packages/lib/src/snackbar.ts` with the typed queue, shared `snackbar()` API, persistent live region, bounded FIFO behavior, action/dismiss callbacks, and remaining-duration pause/resume. Added theme-aware reduced-motion Sass, eight focused tests, exports, search entries, and queued/Undo examples in the Misc page. Completion is synchronous and action dismissal is bound to the originating entry to remain safe under callback reentrancy.
