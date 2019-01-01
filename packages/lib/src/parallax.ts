import m, { Component } from 'mithril';

export interface IParallax extends Partial<M.ParallaxOptions> {
  /** Image source */
  src: string;
}

/**
 * Parallax component:
 * Parallax is an effect where the background content or image in this case,
 * is moved at a different speed than the foreground content while scrolling.
 * @see https://materializecss.com/parallax.html
 */
export const Parallax = (): Component<IParallax> => {
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll('.parallax');
      if (elems) {
        M.Parallax.init(elems, attrs);
      }
    },
    view: ({ attrs: { src } }) => (src ? m('.parallax-container', m('.parallax', m(`img[src=${src}]`))) : undefined),
  };
};
