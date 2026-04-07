import m, { FactoryComponent, Vnode } from 'mithril';
import { dashboardSvc, searchIndex, SearchEntry } from '../services/dashboard-service';
import { DashboardGroup } from '../models/dashboard';
import { Sidenav, ThemeToggle } from 'mithril-materialized';
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
    oninit: () => { window.addEventListener('resize', onResize); },
    onremove: () => { window.removeEventListener('resize', onResize); },

    view: (vnode: Vnode) => {
      const results = filteredResults();

      return m('.mm-layout', [
        m(
          Sidenav,
          {
            isOpen: sidenavOpen,
            onToggle: (open) => { sidenavOpen = open; },
            mode: 'overlay',
            width: 260,
            showBackdrop: !isDesktop,
            closeOnBackdropClick: true,
            closeOnEscape: true,
          },
          [
            // ── Header: brand + close button ───────────────────────────
            m('li.mm-sidenav-brand', [
              m('span.mm-brand', 'mithril-materialized'),
              !isDesktop &&
                m(
                  'button.mm-close-btn[type=button]',
                  { onclick: () => { sidenavOpen = false; } },
                  m('i.material-icons', 'close')
                ),
            ]),

            // ── Search ─────────────────────────────────────────────────
            m('li.mm-search-li', [
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
                showSearchResults &&
                  results.length > 0 &&
                  m(
                    '.mm-search-results',
                    results.map((entry) =>
                      m('.mm-search-result', {
                        onmousedown: (e: MouseEvent) => {
                          e.preventDefault();
                          navigateTo(entry);
                          searchQuery = '';
                          showSearchResults = false;
                          if (!isDesktop) sidenavOpen = false;
                        },
                      }, [
                        m('span.mm-search-result-title', entry.title),
                        m('span.mm-search-result-page', entry.page),
                      ])
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
                        onclick: () => { if (!isDesktop) sidenavOpen = false; },
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

            // ── Footer: GitHub link + theme toggle ────────────────────
            m('li.mm-sidenav-footer', [
              m(
                'a.mm-github-link[href=https://github.com/erikvullings/mithril-materialized][target=_blank][rel=noopener]',
                [m('i.material-icons', 'code'), m('span', 'GitHub')]
              ),
              m(ThemeToggle),
            ]),
          ]
        ),

        // ── Main content ────────────────────────────────────────────────
        m(`main.mm-content${isDesktop ? '.mm-content--desktop' : ''}`, [
          !isDesktop &&
            m(
              'button.mm-hamburger[type=button]',
              { onclick: () => { sidenavOpen = true; } },
              m('i.material-icons', 'menu')
            ),
          vnode.children,
        ]),
      ]);
    },
  };
};
