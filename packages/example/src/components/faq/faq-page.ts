import { HighlightedCodeBlock } from '../highlighted-code-block';
import m from 'mithril';

export const FaqPage = () => ({
  view: () =>
    m('.col.s12.m10.l9', [
      m('h2.header', 'FAQ & Layout Pitfalls'),

      m('h3.header[id=grid-columns]', 'How should I place form controls in a grid?'),
      m('p', [
        'Most conventional field controls add a ',
        m('code', 'col s12'),
        ' wrapper by default. Do not wrap them in another grid column: nested ',
        m('code', '.col'),
        ' elements cause misalignment.',
      ]),
      m(HighlightedCodeBlock, {
        language: 'typescript',
        code: `// Avoid: Comp1 renders its own .col.s12 inside this .col.s6
m('.row', [
  m('.col.s6', m(Comp1, { /* ... */ })),
  m('.col.s6', m(Comp2, { /* ... */ })),
]);

// Prefer: override the component's own grid classes
m('.row', [
  m(Comp1, { className: 'col s6', /* ... */ }),
  m(Comp2, { className: 'col s6', /* ... */ }),
]);`,
      }),

      m('h3.header', 'Which components add col s12 by default?'),
      m('p', [
        'Field-like controls default to a full-width ',
        m('code', 'col s12'),
        ' wrapper: ',
        m(
          'code',
          'TextInput, TextArea, NumberInput, EmailInput, UrlInput, PasswordInput, ColorInput, RangeInput, SingleRangeSlider, DoubleRangeSlider, FileInput, FileUpload, Autocomplete, Select, SearchSelect, Dropdown, Chips, Switch, RadioButtons, Options, LikertScale, Rating, DatePicker, TimePicker, and TimeRangePicker.'
        ),
      ]),
      m('p', [
        m('code', 'ToggleButton'),
        ' and ',
        m('code', 'ToggleGroup'),
        ' remain inline controls and do not add ',
        m('code', 'col s12'),
        ' by default.',
      ]),

      m('h3.header', 'What changed in the form grid convention?'),
      m('p', [
        'Starting with the next major release, ',
        m(
          'code',
          'SearchSelect, FileUpload, LikertScale, Rating, SingleRangeSlider, and DoubleRangeSlider'
        ),
        ' also default to ',
        m('code', 'col s12'),
        '. If your layout relied on one of these controls having no grid class, pass ',
        m('code', "className: ''"),
        '. Otherwise, pass the intended grid width explicitly, for example ',
        m('code', "className: 'col s6'"),
        '.',
      ]),

      m('h3.header', 'Why does className use spaces instead of dots?'),
      m('p', [
        m('code', 'className'),
        ' is an HTML class attribute, so write ',
        m('code', "className: 'col s6'"),
        '. Dotted notation (',
        m('code', "m('.col.s6')"),
        ') is Mithril selector syntax and belongs only in the first argument to ',
        m('code', 'm()'),
        '.',
      ]),
    ]),
});
