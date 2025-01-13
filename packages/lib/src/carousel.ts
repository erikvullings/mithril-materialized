import m, { FactoryComponent, Attributes } from 'mithril';

export interface ICarouselItem extends Attributes {
  /** Relative page link, e.g. '#one' */
  href: string;
  /** Image source */
  src: string;
  /** Alternative name */
  alt?: string;
}

export interface ICarousel extends Partial<M.CarouselOptions>, Attributes {
  /** The list of images */
  items: ICarouselItem[];
}

export const CarouselItem: FactoryComponent<ICarouselItem> = () => {
  return {
    view: ({ attrs: { href, src, alt, ...params } }) => {
      return m('a.carousel-item', { ...params, href }, m('img', { src, alt }));
    },
  };
};

/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/carousel.html
 */
export const Carousel: FactoryComponent<ICarousel> = () => {
  return {
    view: ({ attrs }) => {
      const { items } = attrs;
      return items && items.length > 0
        ? m(
            '.carousel',
            {
              oncreate: ({ dom }) => {
                M.Carousel.init(dom, attrs);
              },
            },
            items.map((item) => m(CarouselItem, item))
          )
        : undefined;
    },
  };
};
