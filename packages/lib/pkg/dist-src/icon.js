import m from 'mithril';
/**
 * A simple material icon, defined by its icon name.
 *
 * @example m(Icon, { class: 'small' }, 'create') renders a small 'create' icon
 * @example m(Icon, { class: 'prefix' }, iconName) renders the icon as a prefix
 */
export const Icon = () => ({
    view: ({ attrs }) => {
        const passThrough = { ...attrs, iconName: undefined };
        return m('i.material-icons', passThrough, attrs.iconName);
    },
});
//# sourceMappingURL=icon.js.map