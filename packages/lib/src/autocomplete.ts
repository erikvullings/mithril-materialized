import m, { FactoryComponent } from 'mithril';
import { uniqueId } from './utils';
import { IInputOptions } from './input-options';
import { Label, HelperText } from './label';

export interface IAutoCompleteOptions extends IInputOptions<string> {
  /** The data object defining the autocomplete options */
  data?: Record<string, string | null>;
  /** Limit of how many options are shown. Default: Infinity */
  limit?: number;
  /** Minimum length of input before autocomplete shows. Default: 1 */
  minLength?: number;
  /** Function called when an option is selected */
  onAutocomplete?: (value: string) => void;
}

/** Component to auto complete your text input - Pure Mithril implementation */
export const Autocomplete: FactoryComponent<IAutoCompleteOptions> = () => {
  const state = {
    id: uniqueId(),
    isActive: false,
    inputValue: '',
    isOpen: false,
    suggestions: [] as Array<{ key: string; value: string | null }>,
    selectedIndex: -1,
  };

  const filterSuggestions = (input: string, data: Record<string, string | null>, limit: number, minLength: number) => {
    if (!input || input.length < minLength) {
      return [];
    }

    const filtered = Object.entries(data || {})
      .filter(([key]) => key.toLowerCase().includes(input.toLowerCase()))
      .map(([key, value]) => ({ key, value }))
      .slice(0, limit);

    return filtered;
  };

  const selectSuggestion = (suggestion: { key: string; value: string | null }, attrs: IAutoCompleteOptions) => {
    state.inputValue = suggestion.key;
    state.isOpen = false;
    state.selectedIndex = -1;

    if (attrs.onchange) {
      attrs.onchange(suggestion.key);
    }
    if (attrs.onAutocomplete) {
      attrs.onAutocomplete(suggestion.key);
    }

    // Force redraw to update label state
    m.redraw();
  };

  const handleKeydown = (e: KeyboardEvent, attrs: IAutoCompleteOptions) => {
    if (!state.isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        state.selectedIndex = Math.min(state.selectedIndex + 1, state.suggestions.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        state.selectedIndex = Math.max(state.selectedIndex - 1, -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (state.selectedIndex >= 0 && state.suggestions[state.selectedIndex]) {
          selectSuggestion(state.suggestions[state.selectedIndex], attrs);
        }
        break;
      case 'Escape':
        e.preventDefault();
        state.isOpen = false;
        state.selectedIndex = -1;
        break;
    }
  };

  const closeDropdown = (e: Event) => {
    const target = e.target as Element;
    if (!target.closest('.autocomplete-wrapper')) {
      state.isOpen = false;
      state.selectedIndex = -1;
    }
  };

  return {
    oninit: ({ attrs }) => {
      state.inputValue = attrs.initialValue || '';
      document.addEventListener('click', closeDropdown);
    },

    onremove: () => {
      document.removeEventListener('click', closeDropdown);
    },

    view: ({ attrs }) => {
      const id = attrs.id || state.id;
      const {
        label,
        helperText,
        onchange,
        newRow,
        className = 'col s12',
        style,
        iconName,
        isMandatory,
        data = {},
        limit = Infinity,
        minLength = 1,
        ...params
      } = attrs;

      const cn = newRow ? className + ' clear' : className;

      // Update suggestions when input changes
      state.suggestions = filterSuggestions(state.inputValue, data, limit, minLength);
      state.isOpen = state.suggestions.length > 0 && state.inputValue.length >= minLength;

      const replacer = new RegExp(`(${state.inputValue})`, 'i');

      return m(
        '.input-field',
        {
          className: cn,
          style,
        },
        [
          iconName ? m('i.material-icons.prefix', iconName) : '',
          m('input', {
            ...params,
            className: 'autocomplete',
            type: 'text',
            tabindex: 0,
            id,
            value: state.inputValue,
            oninput: (e: Event) => {
              const target = e.target as HTMLInputElement;
              state.inputValue = target.value;
              state.selectedIndex = -1;

              if (onchange) {
                onchange(target.value);
              }
            },
            onkeydown: (e: KeyboardEvent) => {
              handleKeydown(e, attrs);

              // Call original onkeydown if provided
              if (attrs.onkeydown) {
                attrs.onkeydown(e, state.inputValue);
              }
            },
            onfocus: () => {
              state.isActive = true;
              if (state.inputValue.length >= minLength) {
                state.isOpen = state.suggestions.length > 0;
              }
            },
            onblur: (e: FocusEvent) => {
              state.isActive = false;
              // Delay closing to allow clicks on suggestions
              setTimeout(() => {
                if (!e.relatedTarget || !(e.relatedTarget as Element).closest('.autocomplete-content')) {
                  state.isOpen = false;
                  state.selectedIndex = -1;
                  m.redraw();
                }
              }, 150);
            },
          }),

          // Autocomplete dropdown
          state.isOpen &&
            m(
              'ul.autocomplete-content.dropdown-content',
              {
                style: {
                  display: 'block',
                  width: '845.5px',
                  left: '11.25px',
                  top: '46px',
                  height: `${state.suggestions.length * 50}px`,
                  transformOrigin: '0px 0px',
                  opacity: 1,
                  transform: 'scaleX(1) scaleY(1)',
                },
              },
              state.suggestions.map((suggestion, index) =>
                m(
                  'li',
                  {
                    key: suggestion.key,
                    onclick: (e: Event) => {
                      e.preventDefault();
                      e.stopPropagation();
                      selectSuggestion(suggestion, attrs);
                    },
                    onmouseover: () => {
                      state.selectedIndex = index;
                      m.redraw();
                    },
                  },
                  [
                    // Check if value contains image URL or icon
                    suggestion.value && suggestion.value.includes('http')
                      ? m('img', {
                          src: suggestion.value,
                          class: 'right circle',
                          onerror: (e: Event) => {
                            // Hide image if it fails to load
                            (e.target as HTMLElement).style.display = 'none';
                          },
                        })
                      : suggestion.value && suggestion.value.startsWith('icon:')
                      ? m(
                          'i.material-icons',
                          {
                            style: {
                              fontSize: '24px',
                              color: 'var(--md-grey-600)',
                            },
                          },
                          suggestion.value.replace('icon:', '')
                        )
                      : null,
                    m(
                      'span',
                      suggestion.key
                        ? m.trust(suggestion.key.replace(replacer, (i) => `<span class="highlight">${i}</span>`))
                        : ''
                    ),
                  ]
                )
              )
            ),
          m(Label, {
            label,
            id,
            isMandatory,
            isActive: state.isActive || state.inputValue.length > 0 || !!attrs.placeholder || !!attrs.initialValue,
          }),
          m(HelperText, { helperText }),
        ]
      );
    },
  };
};
