import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const PulseSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Pulse'),
      m('p', [
        'The ',
        m('code', '.pulse'),
        ' class adds a pulsating animation to draw attention to elements. ',
        'It works well on floating action buttons or notification icons.',
      ]),

      m('h4', 'Live Demo'),
      m('.row', [
        m('.col.s12', { style: 'height: 100px; display: flex; align-items: center; gap: 32px; padding: 16px;' }, [
          m('a.btn-floating.btn-large.pulse.red', [
            m('i.material-icons', 'add'),
          ]),
          m('a.btn-floating.pulse.blue', [
            m('i.material-icons', 'notifications'),
          ]),
          m('a.btn-floating.btn-small.pulse.green', [
            m('i.material-icons', 'star'),
          ]),
        ]),
      ]),

      m(CodeBlock, {
        code: `<!-- Pulsating FAB button -->
<a class="btn-floating btn-large pulse red">
  <i class="material-icons">add</i>
</a>

<!-- Pulsating notification button -->
<a class="btn-floating pulse blue">
  <i class="material-icons">notifications</i>
</a>`,
      }),

      m('h4', 'Notes'),
      m('ul.browser-default', [
        m('li', [
          'The pulse animation is defined in Materialize\'s CSS and uses a radial expand + fade effect.',
        ]),
        m('li', 'Use sparingly — too many pulsing elements compete for attention.'),
        m('li', [
          'Works best on circular elements like ',
          m('code', '.btn-floating'),
          '.',
        ]),
      ]),
    ]),
});
