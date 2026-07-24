import m from 'mithril';
import { Button, ThemeSwitcher, ThemeToggle, CodeBlock, Theme } from 'mithril-materialized';

export const ThemePage = () => {
  const state = {
    currentTheme: 'auto' as Theme,
    primaryColor: '#26a69a',
  };

  const setPrimaryColor = (
    color: string,
    darkColor: string,
    secondaryColor: string,
    selectedBackground: string,
    onPrimaryColor: string
  ) => {
    state.primaryColor = color;
    document.documentElement.style.setProperty('--mm-primary-color', color);
    document.documentElement.style.setProperty('--mm-primary-color-dark', darkColor);
    document.documentElement.style.setProperty('--mm-secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--mm-dropdown-selected', selectedBackground);
    document.documentElement.style.setProperty('--mm-button-text', onPrimaryColor);
    document.documentElement.style.setProperty('--mm-nav-active-text', '#ffffff');
  };

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Theme'),
        m('p', [
          'Components for switching between light and dark modes. ',
          'The theme switcher allows users to choose between light, dark, and auto (system preference) themes.',
        ]),

        m('h3.header[id=primarycolor]', 'Primary Color'),
        m('p', [
          'The default primary color is teal (',
          m('code', '#26a69a'),
          '). Override ',
          m('code', '--mm-primary-color'),
          ' in your stylesheet to match your brand. Changes to this variable update components that use the primary color.',
        ]),
        m('.row', [
          m('.col.s12', [
            m('p', [
              'Try it live: ',
              m('span', {
                style: `display: inline-block; width: 16px; height: 16px; margin: 0 6px -3px 0; border-radius: 50%; background: ${state.primaryColor};`,
              }),
              state.primaryColor,
            ]),
            m(Button, {
              label: 'Use Teal',
              onclick: () => setPrimaryColor('#26a69a', '#00897b', '#ff6f00', '#e0f2f1', '#000000'),
            }),
            m(Button, {
              label: 'Use Indigo',
              onclick: () => setPrimaryColor('#3f51b5', '#303f9f', '#ff6f00', '#e8eaf6', '#ffffff'),
            }),
            m(Button, {
              label: 'Use Deep Orange',
              onclick: () => setPrimaryColor('#e64a19', '#bf360c', '#1565c0', '#fbe9e7', '#000000'),
            }),
          ]),
        ]),
        m(CodeBlock, {
          code: `/* Global primary color override */
:root {
  --mm-primary-color: #3f51b5;
  --mm-primary-color-dark: #303f9f;
  --mm-secondary-color: #ff6f00;
  --mm-dropdown-selected: #e8eaf6;
  --mm-button-text: #ffffff;
  --mm-nav-active-text: #ffffff;
}`,
        }),

        m('h3.header[id=themeswitcher]', 'Theme Switcher'),
        m('p', 'Full theme switcher with light/dark/auto options:'),
        m('.row', [
          m('.col.s12.m6', [
            m(ThemeSwitcher, {
              theme: state.currentTheme,
              showLabels: true,
              onThemeChange: (theme) => {
                state.currentTheme = theme;
                console.log('Theme changed to:', theme);
              },
            }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { ThemeSwitcher } from 'mithril-materialized';

m(ThemeSwitcher, {
  theme: 'auto', // 'light' | 'dark' | 'auto'
  showLabels: true,
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
  },
})`,
        }),

        m('h3.header[id=themetoggle]', 'Theme Toggle'),
        m('p', 'Simple toggle button that switches between light and dark themes:'),
        m('.row', [
          m('.col.s12.m6', [
            m('p', 'Theme toggle button: '),
            m(ThemeToggle, {
              className: 'left',
            }),
            m('.clearfix', { style: 'clear: both; height: 20px;' }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { ThemeToggle } from 'mithril-materialized';

m(ThemeToggle, {
  className: 'left', // Optional CSS classes
})`,
        }),

        m('h3.header', 'Features'),
        m('ul.collection', [
          m('li.collection-item', [
            m('strong', 'Theme System'),
            m('ul', [
              m('li', 'CSS custom properties for runtime theme switching'),
              m('li', 'Light, dark, and auto (system preference) themes'),
              m('li', 'localStorage persistence of theme choice'),
              m('li', 'Programmatic theme control via ThemeManager class'),
            ]),
          ]),
        ]),

        m('h3.header', 'CSS Custom Properties'),
        m('p', 'The theme system uses CSS custom properties that can be customized:'),
        m(CodeBlock, {
          code: `:root {
  --mm-primary-color: #26a69a;
  --mm-background-color: #ffffff;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
  --mm-border-color: rgba(0, 0, 0, 0.12);
  /* ... and many more */
}

[data-theme="dark"] {
  --mm-primary-color: #80cbc4;
  --mm-background-color: #121212;
  --mm-text-primary: rgba(255, 255, 255, 0.87);
  --mm-border-color: rgba(255, 255, 255, 0.12);
  /* ... dark theme overrides */
}`,
        }),
      ]),
  };
};
