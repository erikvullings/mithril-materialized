import m, { FactoryComponent, Attributes, Vnode } from 'mithril';

export interface IInternalPaginationOption extends IPaginationOption {
  active?: boolean;
  title: number | Vnode<any, any>;
}

export interface IPaginationOption extends Attributes {
  href: string;
  disabled?: boolean;
}

const PaginationItem: FactoryComponent<IInternalPaginationOption> = () => ({
  view: ({ attrs: { title, href, active, disabled } }) =>
    m(
      'li',
      { className: active ? 'active' : disabled ? 'disabled' : 'waves-effect' },
      typeof title === 'number' ? m(m.route.Link, { href }, title) : title
    ),
});

export interface IPaginationOptions extends Attributes {
  /**
   * How many items do we show
   * @default 9 or items.length
   */
  size?: number;
  /** The active page index */
  curPage?: number;
  items: IPaginationOption[];
}

export const Pagination: FactoryComponent<IPaginationOptions> = () => {
  const state = {
    pagIndex: 0,
  };
  return {
    view: ({ attrs: { items, curPage, size = Math.min(9, items.length) } }) => {
      const { pagIndex } = state;
      const startPage = pagIndex * size;
      const endPage = startPage + size;
      const canGoBack = pagIndex > 0;
      const canGoForward = (pagIndex + 1) * size < items.length;
      const displayedItems = [
        {
          title: m(
            'a',
            {
              onclick: () => canGoBack && state.pagIndex--,
            },
            m('i.material-icons', 'chevron_left')
          ),
          disabled: !canGoBack,
        },
        // tslint:disable-next-line:variable-name
        ...items.filter((_item, i) => startPage <= i && i < endPage),
        {
          title: m(
            'a',
            {
              onclick: () => canGoForward && state.pagIndex++,
            },
            m('i.material-icons', 'chevron_right')
          ),
          disabled: !canGoForward,
        },
      ];
      return m(
        'ul.pagination',
        displayedItems
          .map(
            (item, i) =>
              ({
                title: startPage + i,
                ...item,
                active: i === curPage,
              } as IInternalPaginationOption)
          )
          .map(item => m(PaginationItem, item))
      );
    },
  };
};
