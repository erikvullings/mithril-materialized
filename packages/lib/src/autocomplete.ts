import m, { FactoryComponent } from 'mithril';
import { uniqueId } from './utils';
import { InputAttrs } from './input-options';
import { Label, HelperText } from './label';

export interface AutoCompleteAttrs extends InputAttrs<string> {
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
export const Autocomplete: FactoryComponent<AutoCompleteAttrs> = () => {
  const state = {
    id: uniqueId(),
    isActive: false,
    internalValue: '',
    isOpen: false,
    suggestions: [] as Array<{ key: string; value: string | null }>,
    selectedIndex: -1,
    inputElement: null as HTMLInputElement | null,
  };

  const isControlled = (attrs: AutoCompleteAttrs) =>
    'value' in attrs && typeof attrs.value !== 'undefined' && typeof attrs.oninput === 'function';

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

  const selectSuggestion = (suggestion: { key: string; value: string | null }, attrs: AutoCompleteAttrs) => {
    const controlled = isControlled(attrs);

    // Update internal state for uncontrolled mode
    if (!controlled) {
      state.internalValue = suggestion.key;
    }

    state.isOpen = false;
    state.selectedIndex = -1;

    if (attrs.oninput) {
      attrs.oninput(suggestion.key);
    }
    if (attrs.onchange) {
      attrs.onchange(suggestion.key);
    }
    if (attrs.onAutocomplete) {
      attrs.onAutocomplete(suggestion.key);
    }
  };

  const handleKeydown = (e: KeyboardEvent, attrs: AutoCompleteAttrs) => {
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
          state.isOpen = false;
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
    const autocompleteWrapper = target.closest('.autocomplete-wrapper');
    const dropdownContent = target.closest('.autocomplete-content');

    // Close if clicking outside both the input wrapper and dropdown content
    if (!autocompleteWrapper && !dropdownContent) {
      state.isOpen = false;
      state.selectedIndex = -1;
    }
  };

  const getDropdownStyles = () => {
    if (!state.inputElement) {
      return {
        display: 'block',
        width: '100%',
        height: `${state.suggestions.length * 50}px`,
        transformOrigin: '0px 0px',
        opacity: state.isOpen ? 1 : 0,
        transform: 'scaleX(1) scaleY(1)',
      };
    }

    const rect = state.inputElement.getBoundingClientRect();
    const inputWidth = rect.width;

    return {
      display: 'block',
      width: `${inputWidth}px`,
      height: `${state.suggestions.length * 50}px`,
      transformOrigin: '0px 0px',
      opacity: state.isOpen ? 1 : 0,
      transform: 'scaleX(1) scaleY(1)',
      position: 'absolute',
      top: '100%',
      left: '0',
      zIndex: 1000,
    };
  };

  return {
    oninit: ({ attrs }) => {
      // Initialize internal value for uncontrolled mode
      if (!isControlled(attrs)) {
        state.internalValue = attrs.defaultValue || '';
      }
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

      const controlled = isControlled(attrs);
      const currentValue = controlled ? attrs.value || '' : state.internalValue;
      const cn = newRow ? className + ' clear' : className;

      // Update suggestions when input changes
      state.suggestions = filterSuggestions(currentValue, data, limit, minLength);

      // Check if there's a perfect match (exact key match, case-insensitive)
      const hasExactMatch =
        currentValue.length >= minLength &&
        Object.keys(data).some((key) => key.toLowerCase() === currentValue.toLowerCase());

      // Only open dropdown if there are suggestions and no perfect match
      state.isOpen = state.suggestions.length > 0 && currentValue.length >= minLength && !hasExactMatch;

      const replacer = new RegExp(`(${currentValue})`, 'i');

      return m(
        '.input-field.autocomplete-wrapper',
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
            value: currentValue,
            oncreate: (vnode) => {
              state.inputElement = vnode.dom as HTMLInputElement;

              // Set initial value for uncontrolled mode
              if (!controlled && attrs.defaultValue) {
                (vnode.dom as HTMLInputElement).value = attrs.defaultValue;
              }
            },
            oninput: (e: Event) => {
              const target = e.target as HTMLInputElement;
              const inputValue = target.value;
              state.selectedIndex = -1;

              // Update internal state for uncontrolled mode
              if (!controlled) {
                state.internalValue = inputValue;
              }

              // Call oninput and onchange if provided
              if (attrs.oninput) {
                attrs.oninput(inputValue);
              }
              if (onchange) {
                onchange(inputValue);
              }
            },
            onkeydown: (e: KeyboardEvent) => {
              handleKeydown(e, attrs);

              // Call original onkeydown if provided
              if (attrs.onkeydown) {
                attrs.onkeydown(e, currentValue);
              }
            },
            onfocus: () => {
              state.isActive = true;
              if (currentValue.length >= minLength) {
                // Check for perfect match on focus too
                const hasExactMatch = Object.keys(data).some((key) => key.toLowerCase() === currentValue.toLowerCase());
                state.isOpen = state.suggestions.length > 0 && !hasExactMatch;
              }
            },
            onblur: (e: FocusEvent) => {
              state.isActive = false;
              if (!e.relatedTarget || !(e.relatedTarget as Element).closest('.autocomplete-content')) {
                state.isOpen = false;
                state.selectedIndex = -1;
              }
            },
          }),

          // Autocomplete dropdown
          state.isOpen &&
            m(
              'ul.autocomplete-content.dropdown-content',
              {
                style: getDropdownStyles(),
              },
              state.suggestions.map((suggestion, index) =>
                m(
                  'li',
                  {
                    key: suggestion.key,
                    class: state.selectedIndex === index ? 'active' : '',
                    onclick: (e: Event) => {
                      e.preventDefault();
                      e.stopPropagation();
                      selectSuggestion(suggestion, attrs);
                    },
                    onmouseover: () => {
                      state.selectedIndex = index;
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
            isActive: state.isActive || currentValue.length > 0 || !!attrs.placeholder || !!attrs.value,
          }),
          m(HelperText, { helperText }),
        ]
      );
    },
  };
};
