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