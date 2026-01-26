import m, { FactoryComponent } from 'mithril';
import { MaterialIcon } from './material-icon';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeSwitcherI18n {
  /** Label for the theme switcher */
  theme?: string;
  /** Light theme label */
  light?: string;
  /** Dark theme label */
  dark?: string;
  /** Auto theme label */
  auto?: string;
  /** Light theme title/tooltip */
  lightTitle?: string;
  /** Dark theme title/tooltip */
  darkTitle?: string;
  /** Auto theme title/tooltip */
  autoTitle?: string;
  /** Toggle button title when switching to dark */
  switchToDark?: string;
  /** Toggle button title when switching to light */
  switchToLight?: string;
}

const defaultI18n: Required<ThemeSwitcherI18n> = {
  theme: 'Theme:',
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
  lightTitle: 'Light theme',
  darkTitle: 'Dark theme',
  autoTitle: 'Auto theme (system preference)',
  switchToDark: 'Switch to dark theme',
  switchToLight: 'Switch to light theme',
};

export interface ThemeSwitcherAttrs {
  /** Current theme selection */
  theme?: Theme;
  /** Callback when theme changes */
  onThemeChange?: (theme: Theme) => void;
  /** Show labels on the toggle buttons */
  showLabels?: boolean;
  /** Custom class for the container */
  className?: string;
  /** Internationalization */
  i18n?: ThemeSwitcherI18n;
}

/**
 * Theme switching utilities and component
 */
export class ThemeManager {
  private static currentTheme: Theme = 'auto';
  private static useLocalStorage: boolean = true;

  /**
   * Configure whether ThemeManager should use localStorage for persistence.
   * When disabled, you can manage theme state externally and pass it via component attrs.
   * @param enabled - Whether to use localStorage (default: true)
   */
  static setUseLocalStorage(enabled: boolean): void {
    this.useLocalStorage = enabled;
  }

  /**
   * Check if localStorage persistence is enabled
   */
  static isUsingLocalStorage(): boolean {
    return this.useLocalStorage;
  }

  /**
   * Set the theme for the entire application
   * @param theme - The theme to set
   * @param persist - Override localStorage behavior for this call (optional)
   */
  static setTheme(theme: Theme, persist?: boolean): void {
    this.currentTheme = theme;
    const root = document.documentElement;

    if (theme === 'auto') {
      // Remove explicit theme, let CSS media query handle it
      root.removeAttribute('data-theme');
    } else {
      // Set explicit theme
      root.setAttribute('data-theme', theme);
    }

    // Store preference in localStorage if enabled
    const shouldPersist = persist ?? this.useLocalStorage;
    if (shouldPersist) {
      try {
        localStorage.setItem('mm-theme', theme);
      } catch (e) {
        // localStorage might not be available
      }
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
   * Initialize theme from localStorage or system preference.
   * If localStorage is disabled, initializes to the provided default or 'auto'.
   * @param defaultTheme - Default theme to use when localStorage is disabled or empty
   */
  static initialize(defaultTheme: Theme = 'auto'): void {
    let savedTheme: Theme = defaultTheme;

    if (this.useLocalStorage) {
      try {
        const stored = localStorage.getItem('mm-theme') as Theme;
        if (stored && ['light', 'dark', 'auto'].includes(stored)) {
          savedTheme = stored;
        }
      } catch (e) {
        // localStorage might not be available
      }
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

  /**
   * Clear the stored theme from localStorage
   */
  static clearStoredTheme(): void {
    try {
      localStorage.removeItem('mm-theme');
    } catch (e) {
      // localStorage might not be available
    }
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
      const { theme = ThemeManager.getTheme(), onThemeChange, showLabels = true, className, i18n } = attrs;
      const labels = { ...defaultI18n, ...i18n };

      const handleThemeChange = (newTheme: Theme) => {
        ThemeManager.setTheme(newTheme);
        if (onThemeChange) {
          onThemeChange(newTheme);
        }
      };

      return m('.theme-switcher', { className }, [
        showLabels && m('span.theme-switcher-label', labels.theme),

        m('.theme-switcher-buttons', [
          m(
            'button.btn-flat',
            {
              type: 'button',
              class: theme === 'light' ? 'active' : '',
              onclick: () => handleThemeChange('light'),
              title: labels.lightTitle,
            },
            [m(MaterialIcon, { name: 'light_mode' }), showLabels && m('span', labels.light)]
          ),

          m(
            'button.btn-flat',
            {
              type: 'button',
              class: theme === 'auto' ? 'active' : '',
              onclick: () => handleThemeChange('auto'),
              title: labels.autoTitle,
            },
            [m('i.material-icons', 'brightness_auto'), showLabels && m('span', labels.auto)]
          ),

          m(
            'button.btn-flat',
            {
              type: 'button',
              class: theme === 'dark' ? 'active' : '',
              onclick: () => handleThemeChange('dark'),
              title: labels.darkTitle,
            },
            [m(MaterialIcon, { name: 'dark_mode' }), showLabels && m('span', labels.dark)]
          ),
        ]),
      ]);
    },
  };
};

/**
 * Simple theme toggle button (just switches between light/dark)
 */
export const ThemeToggle: FactoryComponent<{ className?: string; i18n?: ThemeSwitcherI18n }> = () => {
  return {
    oninit: () => {
      // Initialize theme manager if not already done
      if (typeof window !== 'undefined') {
        ThemeManager.initialize();
      }
    },

    view: ({ attrs = {} }) => {
      const currentTheme = ThemeManager.getEffectiveTheme();
      const labels = { ...defaultI18n, ...attrs.i18n };

      return m(
        'button.btn-flat.theme-toggle',
        {
          type: 'button',
          class: attrs.className || '',
          onclick: () => {
            ThemeManager.toggle();
          },
          title: currentTheme === 'light' ? labels.switchToDark : labels.switchToLight,
        },
        [
          m(MaterialIcon, {
            name: currentTheme === 'light' ? 'dark_mode' : 'light_mode',
          }),
        ]
      );
    },
  };
};
