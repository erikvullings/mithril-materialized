import m from 'mithril';
export const CarouselItem = () => {
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
export const Carousel = () => {
    return {
        view: ({ attrs }) => {
            const { items } = attrs;
            return items && items.length > 0
                ? m('.carousel', {
                    oncreate: ({ dom }) => {
                        M.Carousel.init(dom, attrs);
                    },
                }, items.map(item => m(CarouselItem, item)))
                : undefined;
        },
    };
};
//# sourceMappingURL=carousel.js.map