# 0016 Avatar and AvatarGroup

Status: done
Priority: low
Subsystem: frontend
Owner: unassigned
Agent: copilot
Depends on: none

## Context

The library lacks a standard identity primitive for people, teams, and entities. Add `Avatar` for image, initials, or icon content and `AvatarGroup` for compact collections with deterministic overflow behavior.

## Acceptance Criteria

- `Avatar` supports image, initials/text, icon, alt text, size variants, shape variants, and disabled/de-emphasized presentation.
- Broken or missing images use a deterministic fallback without repeatedly requesting the failed resource.
- Decorative avatars are hidden from assistive technology; meaningful avatars have an accessible name.
- `AvatarGroup` controls overlap, maximum visible count, total-count overflow, and accessible group labelling.
- Group order and overflow remain correct in both left-to-right and right-to-left layouts.
- Colors, borders, spacing, and focus indicators are tokenized for light/dark themes.
- Interactive avatars use native interactive elements or explicit consumer-provided wrappers rather than click handlers on non-interactive markup.
- Tests cover fallback behavior, initials, accessibility, group overflow, and RTL ordering.
- The example app demonstrates individual, fallback, and grouped avatars.

## Implementation Notes

- Reuse `MaterialIcon` and shared component style types.
- Define deterministic initials extraction for whitespace, single-word names, and multi-word names; document truncation.
- Do not bundle placeholder images or perform remote avatar lookup.

## Agent Notes

- 2026-09-09 copilot: Created from the suggested component backlog. Keep identity fetching and privacy-sensitive lookup outside the component.
- 2026-09-09 copilot: Implementing `Avatar` with deterministic image fallback and `AvatarGroup` with logical-direction overlap. The group accepts child vnodes so consumers can use native links or buttons for interactive avatars.
- 2026-09-09 copilot: Completed image, text, initials, icon, size, shape, disabled, and decorative avatar variants plus labelled groups with configurable overlap and deterministic overflow. Browser checks covered light/dark theme tokens and the example; the full suite passes with 301 tests.
