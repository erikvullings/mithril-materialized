import m from 'mithril';
import { Sidenav, SidenavItem } from 'mithril-materialized';
import { ColorSection } from './color-section';
import { GridSection } from './grid-section';
import { HelpersSection } from './helpers-section';
import { MediaSection } from './media-section';
import { PulseSection } from './pulse-section';
import { SassSection } from './sass-section';
import { ShadowSection } from './shadow-section';
import { TableSection } from './table-section';
import { TransitionsSection } from './transitions-section';
import { TypographySection } from './typography-section';
import { ThemingSection } from './theming-section';

const SIDENAV_EXPANDED_WIDTH = 180;
const SIDENAV_COLLAPSED_WIDTH = 60;
// Materialize default navbar height
const NAVBAR_HEIGHT = 64;

const cssSections = [
  { section: 'color',       label: 'Color',       icon: 'palette' },
  { section: 'grid',        label: 'Grid',         icon: 'grid_on' },
  { section: 'helpers',     label: 'Helpers',      icon: 'build' },
  { section: 'media',       label: 'Media',        icon: 'photo' },
  { section: 'pulse',       label: 'Pulse',        icon: 'radio_button_checked' },
  { section: 'sass',        label: 'Sass',         icon: 'code' },
  { section: 'shadow',      label: 'Shadow',       icon: 'layers' },
  { section: 'table',       label: 'Table',        icon: 'table_chart' },
  { section: 'transitions', label: 'Transitions',  icon: 'animation' },
  { section: 'typography',  label: 'Typography',   icon: 'text_fields' },
  { section: 'theming',     label: 'Theming',      icon: 'tune' },
];

const sectionComponents: Record<string, m.ComponentTypes> = {
  color:       ColorSection,
  grid:        GridSection,
  helpers:     HelpersSection,
  media:       MediaSection,
  pulse:       PulseSection,
  sass:        SassSection,
  shadow:      ShadowSection,
  table:       TableSection,
  transitions: TransitionsSection,
  typography:  TypographySection,
  theming:     ThemingSection,
};

const activeSection = () => {
  const match = m.route.get().match(/\/css\/(.+)/);
  return match ? match[1] : 'color';
};

export const CssPage = () => {
  let isExpanded = false;

  return {
    view: () => {
      const section = activeSection();
      const SectionComponent = sectionComponents[section] || ColorSection;
      const sidenavWidth = isExpanded ? SIDENAV_EXPANDED_WIDTH : SIDENAV_COLLAPSED_WIDTH;

      return m('.col.s12', { style: 'padding: 0;' }, [
        // Inline style to position the Sidenav below the navbar
        m('style', `
          .css-docs-sidenav.sidenav {
            top: ${NAVBAR_HEIGHT}px !important;
            height: calc(100% - ${NAVBAR_HEIGHT}px) !important;
            overflow-y: auto;
            box-shadow: 2px 0 5px rgba(0,0,0,0.15);
          }
        `),

        m(Sidenav, {
          className: 'css-docs-sidenav',
          fixed: true,
          isOpen: true,
          expandable: true,
          isExpanded,
          width: SIDENAV_EXPANDED_WIDTH,
          showBackdrop: false,
          onExpandChange: (expanded) => { isExpanded = expanded; m.redraw(); },
        },
          cssSections.map(({ section: s, label, icon }) =>
            m(SidenavItem, {
              text: label,
              icon,
              active: section === s,
              onclick: () => m.route.set(`/css/${s}`),
            })
          )
        ),

        // Content area shifts right to avoid the fixed sidenav
        m('.row', {
          style: `margin-left: ${sidenavWidth}px; transition: margin-left 300ms; padding: 0 16px;`,
        }, [
          m(SectionComponent),
        ]),
      ]);
    },
  };
};
