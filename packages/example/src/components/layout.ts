import m, { FactoryComponent, Vnode } from 'mithril';
import { dashboardSvc, searchIndex, SearchEntry } from '../services/dashboard-service';
import { DashboardGroup } from '../models/dashboard';
import { ThemeToggle } from 'mithril-materialized';
import './layout.css';

interface NavGroup {
  id: DashboardGroup;
  label: string;
  icon: string;
}

const NAV_GROUPS: NavGroup[] = [
  { id: 'general',    label: 'General',        icon: 'home' },
  { id: 'forms',      label: 'Forms & Inputs',  icon: 'edit' },
  { id: 'components', label: 'Components',      icon: 'widgets' },
  { id: 'display',    label: 'Display',         icon: 'view_module' },
  { id: 'styling',    label: 'Styling',         icon: 'palette' },
];

const navigateTo = (entry: SearchEntry) => {
  m.route.set(entry.route);
  if (entry.hash) {
    setTimeout(() => {
      document.getElementById(entry.hash!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
};

const isActive = (route: string) => m.route.get().startsWith(route);

export const Layout: FactoryComponent = () => {
  let sidenavOpen = false;
  let searchQuery = '';
  let showSearchResults = false;
  const openGroups = new Set<DashboardGroup>(['general', 'forms', 'components', 'display', 'styling']);

  const filteredResults = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as SearchEntry[];
    return searchIndex
      .filter((e) => e.title.toLowerCase().includes(q) || e.page.toLowerCase().includes(q))
      .slice(0, 14);
  };

  const pages = () => dashboardSvc.getList().filter((d) => d.visible);

  return {
    view: (vnode: Vnode) => {
      const results = filteredResults();

      return m('.mm-layout', [
        // ── Top bar ──────────────────────────────────────────────────────
        m('header.mm-topbar', [
          m(
            'button.mm-hamburger[type=button]',
            { onclick: () => { sidenavOpen = !sidenavOpen; } },
            m('i.material-icons', 'menu')
          ),
          m('span.mm-brand', 'mithril-materialized'),
          m('.mm-topbar-spacer'),
          m(ThemeToggle, { className: 'white-text' }),
        ]),

        // ── Overlay (mobile) ─────────────────────────────────────────────
        sidenavOpen &&
          m('.mm-overlay', {
            onclick: () => { sidenavOpen = false; },
          }),

        // ── Sidenav ──────────────────────────────────────────────────────
        m(`nav.mm-sidenav${sidenavOpen ? '.mm-sidenav--open' : ''}`, [

          // Search box
          m('.mm-search', [
            m('i.material-icons.mm-search-icon', 'search'),
            m('input.mm-search-input[type=text][placeholder=Search components…]', {
              value: searchQuery,
              oninput: (e: InputEvent) => {
                searchQuery = (e.target as HTMLInputElement).value;
                showSearchResults = true;
              },
              onfocus: () => { showSearchResults = true; },
              onblur: () => { setTimeout(() => { showSearchResults = false; m.redraw(); }, 180); },
            }),
            searchQuery &&
              m(
                'button.mm-search-clear[type=button]',
                { onclick: () => { searchQuery = ''; showSearchResults = false; } },
                m('i.material-icons', 'close')
              ),

            // Dropdown results
            showSearchResults &&
              results.length > 0 &&
              m(
                '.mm-search-results',
                results.map((entry) =>
                  m(
                    '.mm-search-result',
                    {
                      onmousedown: (e: MouseEvent) => {
                        e.preventDefault();
                        navigateTo(entry);
                        searchQuery = '';
                        showSearchResults = false;
                        sidenavOpen = false;
                      },
                    },
                    [
                      m('span.mm-search-result-title', entry.title),
                      m('span.mm-search-result-page', entry.page),
                    ]
                  )
                )
              ),
          ]),

          // Grouped navigation
          ...NAV_GROUPS.map((group) => {
            const groupPages = pages().filter((d) => d.group === group.id);
            if (groupPages.length === 0) return null;
            const isOpen = openGroups.has(group.id);

            return m('.mm-nav-group', [
              m(
                'button.mm-nav-group-header[type=button]',
                {
                  onclick: () => {
                    if (isOpen) openGroups.delete(group.id);
                    else openGroups.add(group.id);
                  },
                },
                [
                  m('i.material-icons', group.icon),
                  m('span', group.label),
                  m('i.material-icons.mm-nav-group-arrow', isOpen ? 'expand_less' : 'expand_more'),
                ]
              ),
              isOpen &&
                m(
                  '.mm-nav-items',
                  groupPages.map((d) =>
                    m(
                      `a.mm-nav-item${isActive(d.route) ? '.mm-nav-item--active' : ''}`,
                      {
                        href: `#!${d.route}`,
                        onclick: () => { sidenavOpen = false; },
                      },
                      [
                        d.icon && m('i.material-icons', d.icon),
                        m('span', d.title),
                      ]
                    )
                  )
                ),
            ]);
          }),

          // GitHub link
          m(
            'a.mm-github-link[href=https://github.com/erikvullings/mithril-materialized][target=_blank][rel=noopener]',
            [m('i.material-icons', 'code'), m('span', 'View on GitHub')]
          ),
        ]),

        // ── Main content ──────────────────────────────────────────────────
        m('main.mm-content', vnode.children),
      ]);
    },
  };
};
