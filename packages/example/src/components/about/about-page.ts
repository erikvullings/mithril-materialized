import m from 'mithril';

export const AboutPage = () => ({
  view: () =>
    m('.row', [
      m('h1', 'About'),
      m('h1', 'Attribution'),
      m('ul.collection', [m('li.collection-item', 'Logo: ideation by Vytautas Alech from the Noun Project.')]),
    ]),
});
