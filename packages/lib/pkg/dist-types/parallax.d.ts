/// <reference types="materialize-css" />
import { FactoryComponent, Attributes } from 'mithril';
export interface IParallax extends Partial<M.ParallaxOptions>, Attributes {
    /** Image source */
    src: string;
}
/**
 * Parallax component:
 * Parallax is an effect where the background content or image in this case,
 * is moved at a different speed than the foreground content while scrolling.
 * @see https://materializecss.com/parallax.html
 */
export declare const Parallax: FactoryComponent<IParallax>;
