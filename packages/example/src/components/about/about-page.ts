import m from 'mithril';

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m('h1', 'About'),
      m(
        'p',
        'mithril-materialized is a TypeScript-first Material Design component library for Mithril.js with no runtime JavaScript dependency on Materialize or jQuery.'
      ),
      m('h2', 'Recent Release Changelog'),
      m('p', [
        'This overview focuses on recent feature releases and major fixes. For the complete history, see ',
        m('a[href=https://github.com/erikvullings/mithril-materialized/blob/master/CHANGELOG.md]', 'CHANGELOG.md'),
        '.',
      ]),
      m('ul.collection', [
        m('li.collection-item', [
          m('h6', 'v3.16.0 (2026-04-07)'),
          m('ul.browser-default', [
            m('li', 'Introduced a new example app layout with grouped sidenav navigation and component search.'),
            m('li', 'Consolidated the example layout around the library Sidenav component.'),
            m('li', 'Improved TypeScript 6 compatibility across the project.'),
            m('li', 'Fixed DatePicker month/year selection redraw behavior.'),
            m('li', 'Resolved example-side sidenav integration issues (fragment key mismatch and scrollbar styling propagation).'),
          ]),
        ]),
        m('li.collection-item', [
          m('h6', 'v3.15.0 (2026-03-19)'),
          m('ul.browser-default', [
            m('li', 'Added comprehensive CSS documentation with a collapsible documentation sidenav.'),
            m('li', 'Enhanced DataTable responsiveness with horizontal scrolling on smaller viewports.'),
          ]),
        ]),
        m('li.collection-item', [
          m('h6', 'v3.14.0 to v3.14.5 (2026-01-19 to 2026-01-26)'),
          m('ul.browser-default', [
            m('li', 'Added ConfirmButton for deliberate confirmation of destructive actions.'),
            m('li', 'Added LikertScale and support for rich content inside Collection items.'),
            m('li', 'Improved Rating tooltip behavior.'),
            m('li', 'Delivered important stabilization fixes after release: MaterialIcon fallback/warnings, modal action-close behavior, ConfirmButton alignment, and ThemeManager custom settings support.'),
          ]),
        ]),
        m('li.collection-item', [
          m('h6', 'v3.10.0 to v3.13.0 (2025-12-28 to 2026-01-15)'),
          m('ul.browser-default', [
            m('li', 'Expanded the component set with Badge, Toast actions, and survey-oriented components.'),
            m('li', 'Improved composability for content-heavy UI patterns through richer collection item support.'),
          ]),
        ]),
        m('li.collection-item', [
          m('h6', 'v3.6.0 to v3.9.0 (2025-12-23 to 2025-12-27)'),
          m('ul.browser-default', [
            m('li', 'Introduced TimeRangePicker and expanded time UI support.'),
            m('li', 'Added ToggleGroup, ToggleButton, CircularProgress, and LinearProgress.'),
            m('li', 'Improved SearchSelect usability with result limiting.'),
          ]),
        ]),
      ]),
      m('h2', 'Attribution'),
      m('ul.collection', [m('li.collection-item', 'Logo: ideation by Vytautas Alech from the Noun Project.')]),
    ]),
});
