import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const ShadowSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Shadow'),
      m('p', [
        'Materialize provides shadow depth utilities based on Material Design\'s elevation system. ',
        'Use ',
        m('code', '.z-depth-0'),
        ' through ',
        m('code', '.z-depth-5'),
        ' to control the shadow intensity.',
      ]),

      m('h4', 'Live Demo'),
      m('.row', [
        ...[0, 1, 2, 3, 4, 5].map(n =>
          m('.col.s12.m4', { style: 'margin-bottom: 16px;' }, [
            m(`.z-depth-${n}`, {
              style: 'padding: 24px; background: var(--mm-card-background); color: var(--mm-text-primary); text-align: center; border-radius: 4px;',
            }, [
              m('strong', `.z-depth-${n}`),
              m('br'),
              m('small', n === 0 ? 'No shadow' : `Elevation level ${n}`),
            ]),
          ])
        ),
      ]),

      m(CodeBlock, {
        code: `<!-- Shadow depth classes -->
<div class="z-depth-0">No shadow</div>
<div class="z-depth-1">Subtle shadow</div>
<div class="z-depth-2">Light shadow</div>
<div class="z-depth-3">Medium shadow</div>
<div class="z-depth-4">Deep shadow</div>
<div class="z-depth-5">Deepest shadow</div>`,
      }),

      m('h4', 'Usage Tips'),
      m('ul.browser-default', [
        m('li', [m('code', '.z-depth-1'), ' is suitable for cards and form elements.']),
        m('li', [m('code', '.z-depth-2'), ' works well for dropdowns and menus.']),
        m('li', [m('code', '.z-depth-3'), ' to ', m('code', '.z-depth-5'), ' suit modals and overlays.']),
        m('li', 'Use ', m('code', '.z-depth-0'), ' to remove shadow from an element that has one by default.'),
      ]),

      m('h4', 'Half-size Variant'),
      m('p', [
        'There is also a ',
        m('code', '.z-depth-1-half'),
        ' class for a slightly stronger version of ',
        m('code', '.z-depth-1'),
        ':',
      ]),
      m('.row', [
        m('.col.s12.m4', [
          m('.z-depth-1-half', {
            style: 'padding: 24px; background: var(--mm-card-background); color: var(--mm-text-primary); text-align: center; border-radius: 4px;',
          }, m('strong', '.z-depth-1-half')),
        ]),
      ]),
    ]),
});
