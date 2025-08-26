import m, { FactoryComponent } from 'mithril';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeSwitcherAttrs {
  /** Current theme selection */
  theme?: Theme;
  /** Callback when theme changes */
  onThemeChange?: (theme: Theme) => void;
  /** Show labels on the toggle buttons */
  showLabels?: boolean;
  /** Custom class for the container */
  className?: string;
}

/**
 * Theme switching utilities and component
 */
export class ThemeManager {
  private static currentTheme: Theme = 'auto';

  /**
   * Set the theme for the entire application
   */
  static setTheme(theme: Theme): void {
    this.currentTheme = theme;
    const root = document.documentElement;

    if (theme === 'auto') {
      // Remove explicit theme, let CSS media query handle it
      root.removeAttribute('data-theme');
    } else {
      // Set explicit theme
      root.setAttribute('data-theme', theme);
    }

    // Store preference in localStorage
    try {
      localStorage.setItem('mm-theme', theme);
    } catch (e) {
      // localStorage might not be available
    }
  }

  /**
   * Get the current theme
   */
  static getTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Get the effective theme (resolves 'auto' to actual theme)
   */
  static getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme !== 'auto') {
      return this.currentTheme;
    }

    // Check CSS media query for auto mode
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  static initialize(): void {
    let savedTheme: Theme = 'auto';

    try {
      const stored = localStorage.getItem('mm-theme') as Theme;
      if (stored && ['light', 'dark', 'auto'].includes(stored)) {
        savedTheme = stored;
      }
    } catch (e) {
      // localStorage might not be available
    }

    this.setTheme(savedTheme);
  }

  /**
   * Toggle between light and dark themes
   */
  static toggle(): void {
    const current = this.getEffectiveTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }
}

/**
 * Theme Switcher Component
 * Provides UI controls for changing themes
 */
export const ThemeSwitcher: FactoryComponent<ThemeSwitcherAttrs> = () => {
  return {
    oninit: () => {
      // Initialize theme manager if not already done
      if (typeof window !== 'undefined') {
        ThemeManager.initialize();
      }
    },

    view: ({ attrs = {} }) => {
      const { theme = ThemeManager.getTheme(), onThemeChange, showLabels = true, className } = attrs;

      const handleThemeChange = (newTheme: Theme) => {
        ThemeManager.setTheme(newTheme);
        if (onThemeChange) {
          onThemeChange(newTheme);
        }
      };

      return m('.theme-switcher', { className }, [
        showLabels && m('span.theme-switcher-label', 'Theme:'),

        m('.theme-switcher-buttons', [
          m(
            'button.btn-flat',
            {
              class: theme === 'light' ? 'active' : '',
              onclick: () => handleThemeChange('light'),
              title: 'Light theme',
            },
            [m('i.material-icons', 'light_mode'), showLabels && m('span', 'Light')]
          ),

          m(
            'button.btn-flat',
            {
              class: theme === 'auto' ? 'active' : '',
              onclick: () => handleThemeChange('auto'),
              title: 'Auto theme (system preference)',
            },
            [m('i.material-icons', 'brightness_auto'), showLabels && m('span', 'Auto')]
          ),

          m(
            'button.btn-flat',
            {
              class: theme === 'dark' ? 'active' : '',
              onclick: () => handleThemeChange('dark'),
              title: 'Dark theme',
            },
            [m('i.material-icons', 'dark_mode'), showLabels && m('span', 'Dark')]
          ),
        ]),
      ]);
    },
  };
};

/**
 * Simple theme toggle button (just switches between light/dark)
 */
export const ThemeToggle: FactoryComponent<{ className?: string }> = () => {
  return {
    oninit: () => {
      // Initialize theme manager if not already done
      if (typeof window !== 'undefined') {
        ThemeManager.initialize();
      }
    },

    view: ({ attrs = {} }) => {
      const currentTheme = ThemeManager.getEffectiveTheme();

      return m(
        'button.btn-flat.theme-toggle',
        {
          class: attrs.className || '',
          onclick: () => {
            ThemeManager.toggle();
          },
          title: `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`,
          style: 'margin: 0; height: 64px; line-height: 64px; border-radius: 0; min-width: 64px; padding: 0;',
        },
        [
          m(
            'i.material-icons',
            {
              style: 'color: inherit; font-size: 24px;',
            },
            currentTheme === 'light' ? 'dark_mode' : 'light_mode'
          ),
        ]
      );
    },
  };
};
