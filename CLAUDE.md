# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a TypeScript monorepo using pnpm workspaces that provides Mithril.js components wrapping Materialize CSS functionality. The project consists of two main packages:

- `packages/lib/` - The main library published to npm as `mithril-materialized`
- `packages/example/` - Example application demonstrating all components, served as documentation site

## Development Commands

### Root Level Commands
- `pnpm start` - Start development servers for both lib and example in parallel
- `npm run build` - Build the library package only
- `npm run build:example` - Build the example package only
- `npm run build:domain` - Clean docs and build both packages for deployment
- `npm run clean` - Clean all build artifacts and node_modules

### Library Package (`packages/lib/`)
- `npm run dev` - Watch mode build using microbundle
- `npm run build` - Production build using microbundle with external dependencies (mithril, materialize-css)
- `npm run typedoc` - Generate TypeScript documentation
- `npm run patch-release` - Clean, build, version bump (patch), publish to npm, and push tags

### Example Package (`packages/example/`)
- `npm start` - Start webpack dev server with hot reload on localhost
- `npm run build` - Production webpack build
- `npm run clean` - Remove .cache and docs directories

## Architecture Overview

### Library Architecture
The library is built using microbundle and exports components as ES modules, CommonJS, and UMD formats. Key architectural patterns:

- Each component is in its own TypeScript file in `packages/lib/src/`
- Components are Mithril vnodes that wrap Materialize CSS functionality
- External dependencies (mithril, materialize-css) are marked as external in the build
- Custom CSS overrides are in `packages/lib/src/styles/` and bundled into `dist/index.css`
- All components are re-exported from `packages/lib/src/index.ts`

### Component Categories
- **Buttons**: Button, FlatButton, RoundButton, SubmitButton
- **Inputs**: TextInput, TextArea, AutoComplete, various typed inputs, Chips
- **Pickers**: DatePicker, TimePicker  
- **Selections**: Select, RadioButtons, Switch, Dropdown
- **Collections**: Collections, Collapsible/accordion
- **Modals & Media**: ModalPanel, MaterialBox, Carousel, Parallax
- **Custom Components**: CodeBlock, SearchSelect, MapEditor, Timeline

### Example Application
The example app uses webpack and serves as both development environment and documentation. It showcases all library components with live examples.

## Build System

- **Library**: Uses microbundle for multiple output formats (ESM, CJS, UMD)
- **Example**: Uses webpack with TypeScript, CSS processing, and dev server
- **Workspace Management**: pnpm workspaces with parallel script execution
- **Documentation**: TypeDoc for API docs, example app for component demos

## Release Process

Releases are handled through the library package with automatic versioning:
- `npm run patch-release` - Automated patch release with git tagging and npm publish
- `npm run minor-release` - Automated minor release  
- `npm run major-release` - Automated major release

## Testing

Currently no automated test suite is configured. The example application serves as manual testing and documentation.