/// <reference types="materialize-css" />
import { FactoryComponent, Attributes } from 'mithril';
export interface ICarouselItem extends Attributes {
    /** Relative page link, e.g. '#one' */
    href: string;
    /** Image source */
    src: string;
}
export interface ICarousel extends Partial<M.CarouselOptions>, Attributes {
    /** The list of images */
    items: ICarouselItem[];
}
export declare const CarouselItem: FactoryComponent<ICarouselItem>;
/**
 * Creates a collabsible or accordion (via the accordion option, default true) component.
 * @see https://materializecss.com/carousel.html
 */
export declare const Carousel: FactoryComponent<ICarousel>;
