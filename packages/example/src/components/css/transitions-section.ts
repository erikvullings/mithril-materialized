import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const TransitionsSection = () => {
  const state = { showScale: false };

  return {
    view: () =>
      m('.col.s12', [
        m('h3.header', 'Transitions'),
        m('p', 'Materialize provides CSS transition helper classes for common enter/exit animations.'),

        m('h4', 'Scale Transition'),
        m('p', [
          m('code', '.scale-transition'),
          ' combined with ',
          m('code', '.scale-out'),
          ' or ',
          m('code', '.scale-in'),
          ' animates an element\'s scale.',
        ]),
        m('.row', [
          m('.col.s12', { style: 'display: flex; align-items: center; gap: 16px; flex-wrap: wrap;' }, [
            m('button.btn.waves-effect.waves-light', {
              onclick: () => { state.showScale = !state.showScale; },
            }, state.showScale ? 'Hide' : 'Show'),
            m('.scale-transition', {
              class: state.showScale ? 'scale-in' : 'scale-out',
              style: 'display: inline-block;',
            }, [
              m('div.z-depth-1', {
                style: 'padding: 16px 24px; border-radius: 4px; background: var(--mm-primary-color); color: #fff;',
              }, 'Scale animated!'),
            ]),
          ]),
        ]),

        m(CodeBlock, {
          code: `<!-- Toggle scale with JS -->
<div class="scale-transition scale-in">Visible</div>
<div class="scale-transition scale-out">Hidden</div>`,
        }),

        m('h4', 'Fade In'),
        m('p', [
          'Add ',
          m('code', '.fade-in'),
          ' to an element to animate it fading in on page load.',
        ]),

        m(CodeBlock, {
          code: `<div class="fade-in">This fades in</div>`,
        }),

        m('h4', 'Available Classes'),
        m('table.striped.responsive-table', [
          m('thead', m('tr', [m('th', 'Class'), m('th', 'Effect')])),
          m('tbody', [
            m('tr', [m('td', m('code', '.scale-transition')), m('td', 'Base class for scale transitions')]),
            m('tr', [m('td', m('code', '.scale-in')), m('td', 'Scale from 0 to 1 (enter)')]),
            m('tr', [m('td', m('code', '.scale-out')), m('td', 'Scale from 1 to 0 (exit)')]),
            m('tr', [m('td', m('code', '.fade-in')), m('td', 'Opacity 0 → 1 animation')]),
          ]),
        ]),
      ]),
  };
};
