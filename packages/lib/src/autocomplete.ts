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
    inputValue: '',
    isOpen: false,
    suggestions: [] as Array<{ key: string; value: string | null }>,
    selectedIndex: -1
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
      
      return m('.autocomplete-wrapper', {
        className: cn,
        style
      }, [
        m('.input-field', [
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
            onkeydown: (e: KeyboardEvent) => handleKeydown(e, attrs),
            onfocus: () => {
              if (state.inputValue.length >= minLength) {
                state.isOpen = state.suggestions.length > 0;
              }
            }
          }),
          m(Label, { 
            label, 
            id, 
            isMandatory, 
            isActive: state.inputValue.length > 0 || attrs.placeholder
          }),
          m(HelperText, { helperText }),
          
          // Autocomplete dropdown
          state.isOpen && m('.autocomplete-content', {
            style: {
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'white',
              boxShadow: 'var(--md-shadow-2)',
              borderRadius: 'var(--md-radius-small)',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: '1000',
              marginTop: '4px'
            }
          }, state.suggestions.map((suggestion, index) => 
            m('li', {
              key: suggestion.key,
              className: index === state.selectedIndex ? 'selected' : '',
              style: {
                listStyle: 'none',
                padding: 'var(--md-spacing-sm) var(--md-spacing-md)',
                cursor: 'pointer',
                borderBottom: '1px solid var(--md-grey-200)',
                backgroundColor: index === state.selectedIndex ? 'var(--md-grey-100)' : 'transparent',
                transition: 'background-color var(--md-transition-fast)'
              },
              onclick: () => selectSuggestion(suggestion, attrs),
              onmouseover: () => { state.selectedIndex = index; }
            }, [
              m('span', suggestion.key),
              suggestion.value && m('small', {
                style: {
                  color: 'var(--md-grey-600)',
                  marginLeft: 'var(--md-spacing-sm)'
                }
              }, suggestion.value)
            ])
          ))
        ])
      ]);
    },
  };
};
