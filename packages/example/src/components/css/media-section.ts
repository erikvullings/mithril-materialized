import m from 'mithril';
import { CodeBlock } from 'mithril-materialized';

export const MediaSection = () => ({
  view: () =>
    m('.col.s12', [
      m('h3.header', 'Media'),
      m('p', 'Materialize provides classes to make images and videos responsive.'),

      m('h4', 'Responsive Images'),
      m('p', [
        'Add ',
        m('code', '.responsive-img'),
        ' to make an image scale with its parent container while maintaining aspect ratio.',
      ]),
      m('.row', [
        m('.col.s12.m8', [
          m('img.responsive-img', {
            src: 'https://picsum.photos/800/400',
            alt: 'Responsive image example',
          }),
        ]),
      ]),

      m(CodeBlock, {
        code: `<img class="responsive-img" src="photo.jpg" alt="Responsive">`,
      }),

      m('h4', 'Responsive Video'),
      m('p', [
        'Wrap iframes and videos in ',
        m('code', '.video-container'),
        ' to maintain the 16:9 aspect ratio across all screen sizes.',
      ]),

      m(CodeBlock, {
        code: `<div class="video-container">
  <iframe width="853" height="480"
    src="https://www.youtube.com/embed/Q8TXgCzxEnw"
    frameborder="0" allowfullscreen></iframe>
</div>`,
      }),

      m('h4', 'Materialbox'),
      m('p', [
        'Add ',
        m('code', '.materialboxed'),
        ' to images to enable a lightbox effect on click. ',
        'See the ',
        m('strong', 'Miscellaneous'),
        ' section for a live demo.',
      ]),

      m(CodeBlock, {
        code: `<img class="materialboxed" src="photo.jpg" alt="Click to expand"
  data-caption="Optional caption text">`,
      }),
    ]),
});
