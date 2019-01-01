import m, { Component } from 'mithril';

export interface IMaterialBox extends Partial<M.MaterialboxOptions> {
  /** Source image path */
  src: string;
  /**
   * Width of the image
   * @default 650
   */
  width?: number;
}

/**
 * Create an image box, that, when clicked upon, fills the screen.
 * @see https://materializecss.com/media.html
 */
export const MaterialBox = (): Component<IMaterialBox> => {
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll('.materialboxed');
      if (elems) {
        M.Materialbox.init(elems, attrs);
      }
    },
    view: ({ attrs: { src, width } }) => {
      return m(`img.materialboxed[src=${src}][width=${width || 650}]`);
    },
  };
};