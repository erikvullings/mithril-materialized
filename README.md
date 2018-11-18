# mithril-materialized

An incomplete [materialize-css](https://materializecss.com) library for the Mithril framework, making it easier to use a Materialize theme in your application. The main focus of this library is on creating Mithril components for the more complicated Materialize code snippets.

## Usage instructions

See the [documentation](https://erikvullings.github.io/mithril-materialized) for examples on how to use this library in your own application. Please note that the library does not include mithril, nor the materialize-css JavaScript or CSS, so you have to include them yourself, as documented.

## Build instructions

This repository consists of two packages, combined using `lerna`: the actual `mithril-materialized` package that is published to `npm`, as well as an example project which uses this library to display the Mithril components that it contains.

To install the dependencies, you can use `npm i`, or, alternatively, use `pnpm m i` (assuming you have installed `pnpm` as alternative package manager using `npm i -g pnpm`) to perform a multi-repository install. Next, build everything using `npm start` and visit the documentation page on [http://localhost:1234](http://localhost:1234) in case port 1234 is not occupied already.
