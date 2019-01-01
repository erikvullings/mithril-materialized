import m, { Component } from 'mithril';

export interface ICarouselItem {
  /** Relative page link, e.g. '#one' */
  href: string;
  /** Image source */
  src: string;
}

export interface ICarousel extends Partial<M.CarouselOptions> {
  /** The list of images */
  items: ICarouselItem[];
}

export const CarouselItem = (): Component<ICarouselItem> => {
  return {
    view: ({ attrs: { href, src } }) => {
      return m('a.carousel-item', { href }, m(`img[src=${src}]`));
    },
  };
};

/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/carousel.html
 */
export const Carousel = (): Component<ICarousel> => {
  return {
    oncreate: ({ attrs }) => {
      const elems = document.querySelectorAll('.carousel');
      if (elems) {
        M.Carousel.init(elems, attrs);
      }
    },
    view: ({ attrs }) => {
      const { items } = attrs;
      return items && items.length > 0 ? m('.carousel', items.map(item => m(CarouselItem, item))) : undefined;
    },
  };
};