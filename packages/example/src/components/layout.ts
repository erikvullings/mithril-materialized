import m, { FactoryComponent, Vnode } from 'mithril';
import { dashboardSvc, searchIndex, SearchEntry } from '../services/dashboard-service';
import { DashboardGroup } from '../models/dashboard';
import { Sidenav, TextInput, ThemeToggle } from 'mithril-materialized';
import logo from '../assets/favicon-32x32.png';
import './layout.css';

interface NavGroup {
  id: DashboardGroup;
  label: string;
  icon: string;
}

const NAV_GROUPS: NavGroup[] = [
  { id: 'general', label: 'General', icon: 'home' },
  { id: 'forms', label: 'Forms & Inputs', icon: 'edit' },
  { id: 'components', label: 'Components', icon: 'widgets' },
  { id: 'display', label: 'Display', icon: 'view_module' },
  { id: 'styling', label: 'Styling', icon: 'palette' },
];

const DESKTOP_BP = 992;

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
  let isDesktop = window.innerWidth >= DESKTOP_BP;
  let sidenavOpen = isDesktop;
  let searchQuery = '';
  let showSearchResults = false;
  const openGroups = new Set<DashboardGroup>(['general', 'forms', 'components', 'display', 'styling']);

  const onResize = () => {
    const nowDesktop = window.innerWidth >= DESKTOP_BP;
    if (nowDesktop !== isDesktop) {
      isDesktop = nowDesktop;
      sidenavOpen = nowDesktop;
      m.redraw();
    }
  };

  const filteredResults = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as SearchEntry[];
    return searchIndex
      .filter((e) => e.title.toLowerCase().includes(q) || e.page.toLowerCase().includes(q))
      .slice(0, 14);
  };

  const pages = () => dashboardSvc.getList().filter((d) => d.visible);

  return {
    oninit: () => {
      window.addEventListener('resize', onResize);
    },
    onremove: () => {
      window.removeEventListener('resize', onResize);
    },

    view: (vnode: Vnode) => {
      const results = filteredResults();

      return m('.mm-layout', [
        m(
          Sidenav,
          {
            isOpen: sidenavOpen,
            onToggle: (open) => {
              sidenavOpen = open;
            },
            mode: 'overlay',
            width: 260,
            showBackdrop: !isDesktop,
            closeOnBackdropClick: true,
            closeOnEscape: true,
            header: {
              text: 'Mithril-materialized',
              icon: { type: 'image', content: logo },
              className: 'mm-sidenav-header',
            },
            footer: {
              text: 'GitHub',
              icon: 'code',
              href: 'https://github.com/erikvullings/mithril-materialized',
              className: 'mm-sidenav-footer-link',
            },
          },
          [
            // ── Search ─────────────────────────────────────────────────
            m('li.mm-search-li', [
              m('.mm-search', [
                m(TextInput, {
                  className: 'mm-search-field',
                  label: 'Search components',
                  iconName: 'search',
                  value: searchQuery,
                  canClear: true,
                  oninput: (value: string) => {
                    searchQuery = value || '';
                    showSearchResults = searchQuery.trim().length > 0;
                  },
                  onblur: () => {
                    setTimeout(() => {
                      showSearchResults = false;
                      m.redraw();
                    }, 180);
                  },
                }),
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
                            if (!isDesktop) sidenavOpen = false;
                          },
                        },
                        [m('span.mm-search-result-title', entry.title), m('span.mm-search-result-page', entry.page)]
                      )
                    )
                  ),
              ]),
            ]),

            // ── Grouped navigation ────────────────────────────────────
            // Each group is ONE li so the array structure never changes
            ...NAV_GROUPS.map((group) => {
              const groupPages = pages().filter((d) => d.group === group.id);
              if (groupPages.length === 0) return null;
              const isOpen = openGroups.has(group.id);

              return m('li.mm-nav-group', [
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
                m(
                  `ul.mm-nav-items${isOpen ? '' : '.mm-nav-items--hidden'}`,
                  groupPages.map((d) =>
                    m(
                      `a.mm-nav-item${isActive(d.route) ? '.mm-nav-item--active' : ''}`,
                      {
                        href: `#!${d.route}`,
                        onclick: () => {
                          if (!isDesktop) sidenavOpen = false;
                        },
                      },
                      [d.icon && m('i.material-icons', d.icon), m('span', d.title)]
                    )
                  )
                ),
              ]);
            }),

            m('li.mm-theme-toggle-li', [m(ThemeToggle)]),
          ]
        ),

        // ── Main content ────────────────────────────────────────────────
        m(`main.mm-content${isDesktop ? '.mm-content--desktop' : ''}`, [
          !isDesktop &&
            m(
              'button.mm-hamburger[type=button]',
              {
                onclick: () => {
                  sidenavOpen = true;
                },
              },
              m('i.material-icons', 'menu')
            ),
          vnode.children,
        ]),
      ]);
    },
  };
};
