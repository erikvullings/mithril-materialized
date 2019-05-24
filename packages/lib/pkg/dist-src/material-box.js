import m from 'mithril';
/**
 * Create an image box, that, when clicked upon, fills the screen.
 * @see https://materializecss.com/media.html
 */
export const MaterialBox = () => {
    return {
        oncreate: ({ dom, attrs }) => {
            M.Materialbox.init(dom, attrs);
        },
        view: ({ attrs }) => {
            const { src, width, height } = attrs;
            const w = width ? `[width=${width}]` : '';
            const h = height ? `[height=${height}]` : '';
            return m(`img.materialboxed[src=${src}]${w}${h}`, attrs);
        },
    };
};
//# sourceMappingURL=material-box.js.map