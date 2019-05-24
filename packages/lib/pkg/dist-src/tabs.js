import m from 'mithril';
export const Tabs = () => {
    const state = {};
    const createId = (title, id) => (id ? id : title.replace(/ /, '').toLowerCase());
    return {
        view: ({ attrs: { tabWidth, selectedTabId, tabs, className: cn, style, duration, onShow, swipeable, responsiveThreshold }, }) => {
            const activeTab = tabs.filter(t => t.active).shift();
            const select = selectedTabId || (activeTab ? createId(activeTab.title, activeTab.id) : '');
            if (select && state.instance) {
                setTimeout(() => state.instance.select(select), 0);
            }
            return m('.row', [
                m('.col.s12', m(`ul.tabs${tabWidth === 'fill' ? '.tabs-fixed-width' : ''}`, {
                    className: cn,
                    style,
                    oncreate: ({ dom }) => {
                        M.Tabs.init(dom, {
                            duration,
                            onShow,
                            responsiveThreshold,
                            swipeable,
                        });
                        state.instance = M.Tabs.getInstance(dom);
                    },
                    onremove: () => state.instance.destroy(),
                }, tabs.map(({ className, title, id, active, disabled, target, href }) => m(`li.tab${disabled ? '.disabled' : ''}${tabWidth === 'fixed' ? `.col.s${Math.floor(12 / tabs.length)}` : ''}`, { className }, m(`a${active ? '.active' : ''}`, { target, href: href || `#${createId(title, id)}` }, title))))),
                tabs
                    .filter(({ href }) => typeof href === 'undefined')
                    .map(({ id, title, vnode }) => m(`.col.s12[id=${createId(title, id)}]`, vnode)),
            ]);
        },
    };
};
//# sourceMappingURL=tabs.js.map