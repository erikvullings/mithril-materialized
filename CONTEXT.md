# Domain Context

## Field

A Field is an interactive value editor such as `TextInput`, `TextArea`,
`NumberInput`, `Autocomplete`, `RadioButtons`, `Select`, `SearchSelect`,
`Dropdown`, `Rating`, `LikertScale`, `RangeInput`, or `ToggleGroup`.

Field values may be controlled by caller-provided value and change attributes or
uncontrolled through a default value. Each exported Field keeps its established
event contract, while controllable Field state centralizes ownership,
initialization, non-interactive precedence, and internal updates.

## Selection

Selection is the set of selected option identifiers and the interaction rules
that change it. Selection interaction covers single and multiple selection,
disabled options, maximum selection counts, removal, open state, keyboard focus,
and keyboard actions.

Async loading, option creation, filtering, summaries, and rendering are separate
concerns that consume Selection results.

## Portal

A Portal renders content outside its caller's DOM hierarchy so overlays can
escape stacking contexts. Portal lifecycle covers container acquisition,
content synchronization, shared ownership, clearing, and disposal.

Each Portal owner uses an instance-scoped handle. Legacy portal utility
functions remain supported as compatibility adapters.

## Tabs

Tabs are a navigable collection with one active tab. Tabs state covers generated
identifiers, active-tab synchronization, click transitions, and swipe
transitions.

Indicator geometry is measured separately from Tabs state so state transitions
do not depend on the DOM.

## DataTable

A DataTable presents structured records with optional sorting, filtering,
selection, pagination, and custom cell rendering.
