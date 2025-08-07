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
            onkeydown: (e: KeyboardEvent) => {
              handleKeydown(e, attrs);
              
              // Call original onkeydown if provided
              if (attrs.onkeydown) {
                attrs.onkeydown(e, state.inputValue);
              }
            },
            oncreate: ({ dom }) => {
              const input = dom as HTMLInputElement;
              const parentElement = input.parentElement as HTMLElement;
              const label = parentElement.querySelector('label');

              const updateLabelState = () => {
                if (label) {
                  if (input.value !== '' || document.activeElement === input || input.placeholder) {
                    label.classList.add('active');
                  } else {
                    label.classList.remove('active');
                  }
                }
              };

              input.addEventListener('focus', updateLabelState);
              input.addEventListener('blur', updateLabelState);
              input.addEventListener('input', updateLabelState);
              
              // Initial label state
              updateLabelState();
            },
            onfocus: () => {
              if (state.inputValue.length >= minLength) {
                state.isOpen = state.suggestions.length > 0;
              }
            },
            onblur: (e: FocusEvent) => {
              // Delay closing to allow clicks on suggestions
              setTimeout(() => {
                if (!e.relatedTarget || !((e.relatedTarget as Element).closest('.autocomplete-content'))) {
                  state.isOpen = false;
                  state.selectedIndex = -1;
                  m.redraw();
                }
              }, 150);
            }
          }),
          m(Label, { 
            label, 
            id, 
            isMandatory, 
            isActive: state.inputValue.length > 0 || !!attrs.placeholder || !!attrs.initialValue
          }),
          m(HelperText, { helperText }),
          
          // Autocomplete dropdown
          state.isOpen && m('ul.autocomplete-content.dropdown-content', {
            style: {
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: '#fff',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: '2px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: '1000',
              margin: '0',
              padding: '0',
              marginTop: '1px',
              border: '1px solid #e0e0e0'
            }
          }, state.suggestions.map((suggestion, index) => 
            m('li', {
              key: suggestion.key,
              className: `autocomplete-option ${index === state.selectedIndex ? 'selected' : ''}`,
              style: {
                listStyle: 'none',
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: index < state.suggestions.length - 1 ? '1px solid #eeeeee' : 'none',
                backgroundColor: index === state.selectedIndex ? '#eeeeee' : 'transparent',
                transition: 'background-color 0.3s ease',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center'
              },
              onclick: (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                selectSuggestion(suggestion, attrs);
              },
              onmouseover: () => { 
                state.selectedIndex = index;
                m.redraw();
              }
            }, [
              m('.autocomplete-option', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--md-spacing-sm)'
                }
              }, [
                // Check if value contains image URL or icon
                suggestion.value && suggestion.value.includes('http') 
                  ? m('img', {
                      src: suggestion.value,
                      style: {
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--md-radius-small)',
                        objectFit: 'cover'
                      },
                      onerror: (e: Event) => {
                        // Hide image if it fails to load
                        (e.target as HTMLElement).style.display = 'none';
                      }
                    })
                  : suggestion.value && suggestion.value.startsWith('icon:')
                  ? m('i.material-icons', {
                      style: {
                        fontSize: '24px',
                        color: 'var(--md-grey-600)'
                      }
                    }, suggestion.value.replace('icon:', ''))
                  : null,
                m('.option-text', {
                  style: { flex: '1' }
                }, [
                  m('span', suggestion.key),
                  suggestion.value && !suggestion.value.includes('http') && !suggestion.value.startsWith('icon:') 
                    ? m('small', {
                        style: {
                          display: 'block',
                          color: 'var(--md-grey-600)',
                          fontSize: '12px',
                          marginTop: '2px'
                        }
                      }, suggestion.value)
                    : null
                ])
              ])
            ])
          ))
        ])
      ]);
    },
  };
};
