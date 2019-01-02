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
    oncreate: ({ dom, attrs }) => {
      M.Parallax.init(dom, attrs);
    },
    view: ({ attrs: { src } }) => (src ? m('.parallax-container', m('.parallax', m(`img[src=${src}]`))) : undefined),
  };
};
