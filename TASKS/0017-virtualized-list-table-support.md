# 0017 Virtualized list and table support

Status: done
Priority: medium
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: none

## Context

Rendering thousands of rows makes list and table views slow and produces an unnecessarily large DOM. Add a reusable virtualization primitive and integrate it with list/table usage so consumers can render only the visible window plus overscan while preserving scrolling, keyboard access, and existing DataTable behavior.

## Acceptance Criteria

- A typed virtualization primitive renders a bounded visible window for at least 10,000 fixed-height items.
- Overscan, viewport height, item height, item count, item rendering, and stable item identity are configurable.
- Programmatic scrolling to an index works at the start, middle, and end of the collection.
- Scrolling does not produce blank gaps, duplicate rows, or incorrect total scroll height.
- DataTable can opt into virtualization without changing the default non-virtualized API or breaking sorting, selection, pagination, and empty states.
- Keyboard focus remains usable when focused rows move outside the rendered window, with the supported behavior explicitly documented.
- Table/list semantics and row position/count metadata remain meaningful to assistive technology.
- Tests cover window calculations, overscan boundaries, resize/scroll updates, focus behavior, and DataTable integration.
- A benchmark or deterministic test demonstrates that the rendered row count remains bounded as the data set grows.
- The example app includes a large-data demo and documents fixed-height limitations.

## Implementation Notes

- Start with fixed-height rows; variable-height virtualization requires separate measurement, invalidation, and anchoring design.
- Separate pure range/offset calculations from DOM observation so the algorithm can be tested without a browser.
- Reuse `ResizeObserver` only behind a guarded lifecycle with cleanup and a testable fallback.
- Avoid adding a heavy virtualization dependency unless bundle-size and maintenance tradeoffs are documented.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. This is the broadest item; preserve an additive opt-in path and establish the reusable list primitive before coupling it to DataTable.
- 2026-09-09 copilot: Implementing a fixed-height `VirtualList<T>()` with pure inclusive range calculations, stable keyed item wrappers, and an optional controller. DataTable receives an additive `virtualization` configuration and keeps sorting, filtering, pagination, and selection ahead of windowing.
- 2026-09-09 copilot: Completed fixed-height list and DataTable virtualization with bounded overscan, controller alignment, exact scroll height, stable identity, focus handoff, ARIA position metadata, cached selection aggregates, and a 10,000-row example. The full suite passes with 297 tests.
- 2026-09-09 copilot: Removed per-row compositor promotion and raised the sticky header group so Edge cannot paint hovered virtual rows through header cells.
