# [3.2.0](https://github.com/erikvullings/mithril-materialized/compare/v3.1.0...v3.2.0) (2025-08-30)


### Bug Fixes

* Make iconClass less restrictive. ([39b8aa9](https://github.com/erikvullings/mithril-materialized/commit/39b8aa9bab43f149760228b1bbf98a94c6be7b93))


### Features

* most components can now operate in controlled or uncontrolled mode. ([8c44672](https://github.com/erikvullings/mithril-materialized/commit/8c4467248f8f1a217a1d9302d730e099e9743e56))

# [3.1.0](https://github.com/erikvullings/mithril-materialized/compare/v3.0.0...v3.1.0) (2025-08-26)

# [3.0.0](https://github.com/erikvullings/mithril-materialized/compare/v2.0.1...v3.0.0) (2025-08-26)


### Bug Fixes

* correct modal examples to show proper usage ([7bae1ee](https://github.com/erikvullings/mithril-materialized/commit/7bae1eecd512c8932fc434634d51afb0997f7bfa))
* simplify Button variant API and remove broken modalId functionality ([297640d](https://github.com/erikvullings/mithril-materialized/commit/297640d1e293c08e8e8c0ed4abb311e259a95d4b))


### BREAKING CHANGES

* Button variant prop changed from complex object to simple string

- Changed ButtonVariant from complex discriminated union to simple string type
- Removed broken modalId functionality that was incompatible with CSS-only modals
- Simplified variant API: 'button' | 'submit' | 'reset' instead of objects
- Updated JSDoc examples to show cleaner, simpler usage
- Fixed button tests to match new simplified API
- All existing functionality preserved except modal triggers

Migration:
Before: variant: { type: 'submit' }
After:  variant: 'submit'

Before: modalId: 'my-modal' (broken)
After:  Use modal state management with isOpen/onToggle

## [2.0.1](https://github.com/erikvullings/mithril-materialized/compare/v2.0.0...v2.0.1) (2025-08-26)


### Bug Fixes

* resolve Mithril attrs reuse warnings ([79c8446](https://github.com/erikvullings/mithril-materialized/commit/79c8446723d89ce1317c88d0d6af2c4d3f20091f))

# [2.0.0](https://github.com/erikvullings/mithril-materialized/compare/v1.4.2...v2.0.0) (2025-08-26)


* feat!: remove external JS library dependencies ([0f122ae](https://github.com/erikvullings/mithril-materialized/commit/0f122aed3d8f116021da0a0e56735e199c8633ee))


### Bug Fixes

* correct CSS import path and ensure full CSS bundle ([e55cc68](https://github.com/erikvullings/mithril-materialized/commit/e55cc688b7d935d16acbddcb90f6d4d27c89f8e0))
* correct module resolution by fixing package.json exports ([2d81de1](https://github.com/erikvullings/mithril-materialized/commit/2d81de15ffc46ed88b05aa49de7cd8d8c7c8a25b))
* date range picker input display formatting ([8689dce](https://github.com/erikvullings/mithril-materialized/commit/8689dce06be62b7b3495a57ac9da8921a7141f95))
* ensure consistent CSS output between index.css and index.min.css ([262a2fd](https://github.com/erikvullings/mithril-materialized/commit/262a2fd03f0787311fd1ab9274e27e3ea5fcd70b))
* resolve range slider drag and tab navigation issues ([6899db7](https://github.com/erikvullings/mithril-materialized/commit/6899db7451cd0639808287901def0c60863d3120))
* update failing tests to match component behavior ([a2b6e83](https://github.com/erikvullings/mithril-materialized/commit/a2b6e83f123536468f5174f4504e159bf35c30a2))


### Features

* Add layout components and enhance RangeInput ([8592d4b](https://github.com/erikvullings/mithril-materialized/commit/8592d4bdb6c9fb63b70c6c09a1c15362a5a369ad))
* comprehensive dark theme improvements, modal fixes, and component enhancements ([bcca040](https://github.com/erikvullings/mithril-materialized/commit/bcca040574bad7ee4332da05b9e0a2c725c7f62b))
* Create new beta release ([a2b1379](https://github.com/erikvullings/mithril-materialized/commit/a2b13796c146a6dec60b52c3f8ebcbccf50b89df))
* enhance RangeInput with vertical and double-thumb support ([8f73efd](https://github.com/erikvullings/mithril-materialized/commit/8f73efd5180f034e88007d83bdc0c3791618787c))
* enhance TreeView with connector line improvements ([077a0a6](https://github.com/erikvullings/mithril-materialized/commit/077a0a6d4b7d9d98c3fa28add4f634d79bdf6586))
* finalize semantic-release configuration and version alignment ([af86262](https://github.com/erikvullings/mithril-materialized/commit/af862624a880df96fe1a54fafb4863d958dc9daf))
* implement comprehensive date range picker functionality ([cda1b55](https://github.com/erikvullings/mithril-materialized/commit/cda1b55013ad0e5fe81ba8c6571a3c480a4b8270))
* initialize release candidate branch with v2.0.0-rc.1 ([5019823](https://github.com/erikvullings/mithril-materialized/commit/501982364c8ec423c78c0e98bc7d754943fe0bc0))
* trigger v2.0.0 stable release from rc.2 ([f644dbf](https://github.com/erikvullings/mithril-materialized/commit/f644dbfab837faf3f9ae5c28443b91cfd6863c14))


### BREAKING CHANGES

* Promote release candidate to stable v2.0.0
* DatePicker onSelect callback now receives (startDate, endDate) for range mode

Closes: date range picker implementation
* Removed external JavaScript library dependencies to reduce bundle size and improve performance. This may affect components that previously relied on external libraries.

# [2.0.0-rc.2](https://github.com/erikvullings/mithril-materialized/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2025-08-26)

# [2.0.0-rc.1](https://github.com/erikvullings/mithril-materialized/compare/v1.4.2...v2.0.0-rc.1) (2025-08-25)


* feat!: remove external JS library dependencies ([0f122ae](https://github.com/erikvullings/mithril-materialized/commit/0f122aed3d8f116021da0a0e56735e199c8633ee))


### Bug Fixes

* correct CSS import path and ensure full CSS bundle ([e55cc68](https://github.com/erikvullings/mithril-materialized/commit/e55cc688b7d935d16acbddcb90f6d4d27c89f8e0))
* correct module resolution by fixing package.json exports ([2d81de1](https://github.com/erikvullings/mithril-materialized/commit/2d81de15ffc46ed88b05aa49de7cd8d8c7c8a25b))
* date range picker input display formatting ([8689dce](https://github.com/erikvullings/mithril-materialized/commit/8689dce06be62b7b3495a57ac9da8921a7141f95))
* ensure consistent CSS output between index.css and index.min.css ([262a2fd](https://github.com/erikvullings/mithril-materialized/commit/262a2fd03f0787311fd1ab9274e27e3ea5fcd70b))
* resolve range slider drag and tab navigation issues ([6899db7](https://github.com/erikvullings/mithril-materialized/commit/6899db7451cd0639808287901def0c60863d3120))
* update failing tests to match component behavior ([a2b6e83](https://github.com/erikvullings/mithril-materialized/commit/a2b6e83f123536468f5174f4504e159bf35c30a2))


### Features

* Add layout components and enhance RangeInput ([8592d4b](https://github.com/erikvullings/mithril-materialized/commit/8592d4bdb6c9fb63b70c6c09a1c15362a5a369ad))
* comprehensive dark theme improvements, modal fixes, and component enhancements ([bcca040](https://github.com/erikvullings/mithril-materialized/commit/bcca040574bad7ee4332da05b9e0a2c725c7f62b))
* Create new beta release ([a2b1379](https://github.com/erikvullings/mithril-materialized/commit/a2b13796c146a6dec60b52c3f8ebcbccf50b89df))
* enhance RangeInput with vertical and double-thumb support ([8f73efd](https://github.com/erikvullings/mithril-materialized/commit/8f73efd5180f034e88007d83bdc0c3791618787c))
* enhance TreeView with connector line improvements ([077a0a6](https://github.com/erikvullings/mithril-materialized/commit/077a0a6d4b7d9d98c3fa28add4f634d79bdf6586))
* finalize semantic-release configuration and version alignment ([af86262](https://github.com/erikvullings/mithril-materialized/commit/af862624a880df96fe1a54fafb4863d958dc9daf))
* implement comprehensive date range picker functionality ([cda1b55](https://github.com/erikvullings/mithril-materialized/commit/cda1b55013ad0e5fe81ba8c6571a3c480a4b8270))
* initialize release candidate branch with v2.0.0-rc.1 ([5019823](https://github.com/erikvullings/mithril-materialized/commit/501982364c8ec423c78c0e98bc7d754943fe0bc0))


### BREAKING CHANGES

* DatePicker onSelect callback now receives (startDate, endDate) for range mode

Closes: date range picker implementation
* Removed external JavaScript library dependencies to reduce bundle size and improve performance. This may affect components that previously relied on external libraries.

# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Features
- Complete dependency update including Mithril 2.3.5
- Add layout components and enhance RangeInput
- Comprehensive date range picker functionality  
- Dark theme improvements, modal fixes, and component enhancements
- Enhanced RangeInput with vertical and double-thumb support
- Enhanced TreeView with connector line improvements

### Bug Fixes
- Date range picker input display formatting
- Range slider drag and tab navigation issues

### Dependencies
- Updated semantic-release and plugins
- Updated mithril 2.3.3 → 2.3.5
- Updated webpack and build tools
- Updated testing dependencies  
- Updated pnpm 10.11.0 → 10.15.0

### BREAKING CHANGES
- DatePicker onSelect callback now receives (startDate, endDate) for range mode

## [1.4.2] - 2023-09-19

### Bug Fixes
- **autocomplete:** fix callback function signature
