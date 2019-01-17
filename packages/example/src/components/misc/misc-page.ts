import { MaterialBox, CodeBlock, Collabsible, Carousel, Parallax, Pagination } from 'mithril-materialized';
import m from 'mithril';
import gogh from '../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg';

export const MiscPage = () => {
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Miscellaneous'),
        m('p', [
          'Some miscellaneous components, like the ',
          m('a[href=https://materializecss.com/media.html][target=_blank]', 'Material box'),
          ', ',
          m('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collabsible'),
          ', ',
          m('a[href=https://materializecss.com/carousel.html][target=_blank]', 'Carousel'),
          ', ',
          m('a[href=https://materializecss.com/parallax.html][target=_blank]', 'Pagination'),
          ' and the ',
          m('a[href=https://materializecss.com/pagination.html][target=_blank]', 'Parallax'),
          '.',
        ]),

        m('h3.header', 'Parallax'),
        m(Parallax, { src: gogh }),
        m(CodeBlock, {
          code: `          m(Parallax, { src: gogh }) // should be embedded in layout so the width is not limited`,
        }),

        m('h3.header', 'Material box'),
        m('row', m(MaterialBox, { src: gogh, width: 600 })),
        m(CodeBlock, {
          code: `          import gogh from 'gogh.jpg'; // using webpack
          m(MaterialBox, { src: gogh, width: 600 })`,
        }),

        m('h3.header', 'Collabsible'),
        m(
          'row',
          m(Collabsible, {
            items: [
              { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
              { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
              { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Collabsible, { items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
        }),

        m('h3.header', 'Carousel'),
        m(
          'row',
          m(Carousel, {
            items: [
              { href: '#one!', src: 'https://lorempixel.com/250/250/nature/1' },
              { href: '#two!', src: 'https://lorempixel.com/250/250/nature/2' },
              { href: '#three!', src: 'https://lorempixel.com/250/250/nature/3' },
              { href: '#four!', src: 'https://lorempixel.com/250/250/nature/4' },
              { href: '#five!', src: 'https://lorempixel.com/250/250/nature/5' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Carousel, { items: [
            { href: '#one!', src: 'https://lorempixel.com/250/250/nature/1' },
            { href: '#two!', src: 'https://lorempixel.com/250/250/nature/2' },
            { href: '#three!', src: 'https://lorempixel.com/250/250/nature/3' },
            { href: '#four!', src: 'https://lorempixel.com/250/250/nature/4' },
            { href: '#five!', src: 'https://lorempixel.com/250/250/nature/5' },
          ] })`,
        }),

        m('h3.header', 'Pagination'),
        m(
          'row',
          m(Pagination, {
            size: 5,
            items: [
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Pagination, {
            size: 5,
            items: [
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
              { href: '/' },
            ],
          })`,
        }),
      ]),
  };
};
