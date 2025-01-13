import m, { FactoryComponent, Attributes } from 'mithril';

export interface IMaterialBox extends Partial<M.MaterialboxOptions>, Attributes {
  /** Source image path */
  src: string;
  /**
   * Width of the image
   * @default undefined
   */
  width?: number;
  /**
   * Height of the image
   * @default undefined
   */
  height?: number;
}

/**
 * Create an image box, that, when clicked upon, fills the screen.
 * @see https://materializecss.com/media.html
 */
export const MaterialBox: FactoryComponent<IMaterialBox> = () => {
  return {
    oncreate: ({ dom, attrs }) => {
      M.Materialbox.init(dom, attrs);
    },
    view: ({ attrs }) => m('img.materialboxed', attrs),
  };
};
