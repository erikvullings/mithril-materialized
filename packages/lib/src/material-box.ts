import m, { FactoryComponent, Attributes } from 'mithril';

export interface IMaterialBox extends Partial<M.MaterialboxOptions>, Attributes {
  /** Source image path */
  src: string;
  /**
   * Width of the image
   * @default 650
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
    view: ({ attrs }) => {
      const { src, width = 650, height } = attrs;
      const w = `[width=${width}]`;
      const h = height ? `[height=${height}]` : '';
      return m(`img.materialboxed[src=${src}]${w}${h}`, attrs);
    },
  };
};
