import m from 'mithril';
import { uniqueId } from './utils';
import { HelperText, Label } from './label';
import { MaterialIcon } from './material-icon';

export interface ChipData {
  tag: string;
  image?: string;
  alt?: string;
}

export interface AutocompleteOption extends ChipData {
  value?: string;
}

export interface ChipsAttrs {
  id?: string;
  data?: ChipData[];
  placeholder?: string;
  secondaryPlaceholder?: string;
  autocompleteOptions?: {
    data: Record<string, string | null> | AutocompleteOption[];
    limit?: number;
    minLength?: number;
  };
  limit?: number;
  required?: boolean;
  isMandatory?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  onchange?: (data: ChipData[]) => void;
  onChipAdd?: (chip: ChipData) => void;
  onChipDelete?: (chip: ChipData) => void;
  onChipSelect?: (chip: ChipData) => void;
}

export const Chips: m.FactoryComponent<ChipsAttrs> = () => {
  interface ChipsState {
    chipsData: ChipData[];
    selectedChip: number | null;
    focused: boolean;
    inputValue: string;
    inputId: string;
    autocompleteItems: AutocompleteOption[];
    selectedAutocompleteIndex: number;
    showAutocomplete: boolean;
  }

  const state: ChipsState = {
    chipsData: [],
    selectedChip: null,
    focused: false,
    inputValue: '',
    inputId: uniqueId(),
    autocompleteItems: [],
    selectedAutocompleteIndex: -1,
    showAutocomplete: false,
  };

  let currentVnode: m.VnodeDOM<ChipsAttrs, any> | null = null;

  const processAutocompleteData = (
    data: Record<string, string | null> | AutocompleteOption[]
  ): AutocompleteOption[] => {
    if (Array.isArray(data)) {
      return data.map((item) => {
        if (typeof item === 'string') {
          return { tag: item };
        }
        return item;
      });
    }
    return Object.entries(data).map(([text, value]) => ({
      tag: text,
      value: value || text,
    }));
  };

  const updateAutocomplete = () => {
    if (!currentVnode?.attrs.autocompleteOptions?.data) {
      state.autocompleteItems = [];
      return;
    }

    const { data, minLength = 1 } = currentVnode.attrs.autocompleteOptions;
    const input = state.inputValue.toLowerCase();

    if (input.length < minLength) {
      state.autocompleteItems = [];
      state.showAutocomplete = false;
      return;
    }

    const allOptions = processAutocompleteData(data);
    const filtered = allOptions.filter((option) => option.tag.toLowerCase().includes(input));

    const limit = currentVnode.attrs.autocompleteOptions.limit || Infinity;
    state.autocompleteItems = filtered.slice(0, limit);
    state.showAutocomplete = state.autocompleteItems.length > 0;
    state.selectedAutocompleteIndex = -1;
  };

  const selectAutocompleteItem = (item: AutocompleteOption) => {
    addChip({
      tag: item.tag,
      image: item.image,
      alt: item.alt, // Preserve alt text when converting to chip
    });
    state.inputValue = '';
    state.showAutocomplete = false;
    state.selectedAutocompleteIndex = -1;
  };

  const isValid = (chip: ChipData, currentChips: ChipData[]): boolean => {
    if (!chip.tag || chip.tag.trim() === '') return false;
    return !currentChips.some((c) => c.tag === chip.tag);
  };

  const addChip = (chip: ChipData) => {
    if (!currentVnode) return;

    const { limit = Infinity, onChipAdd, onchange } = currentVnode.attrs;

    if (!isValid(chip, state.chipsData) || state.chipsData.length >= limit) {
      return;
    }

    state.chipsData = [...state.chipsData, chip];
    state.inputValue = '';

    if (onChipAdd) onChipAdd(chip);
    if (onchange) onchange(state.chipsData);
  };

  const deleteChip = (index: number) => {
    if (!currentVnode) return;

    const { onChipDelete, onchange } = currentVnode.attrs;
    const chip = state.chipsData[index];

    state.chipsData = state.chipsData.filter((_, i) => i !== index);
    state.selectedChip = null;

    if (onChipDelete) onChipDelete(chip);
    if (onchange) onchange(state.chipsData);
  };

  const selectChip = (index: number) => {
    if (!currentVnode) return;

    const { onChipSelect } = currentVnode.attrs;
    state.selectedChip = index;

    if (onChipSelect && state.chipsData[index]) {
      onChipSelect(state.chipsData[index]);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    if (state.showAutocomplete) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        state.selectedAutocompleteIndex = Math.min(
          state.selectedAutocompleteIndex + 1,
          state.autocompleteItems.length - 1
        );
        const selectedItem = currentVnode?.dom.querySelector('.autocomplete-item.selected') as HTMLElement;
        if (selectedItem) {
          selectedItem.scrollIntoView({ block: 'nearest' });
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        state.selectedAutocompleteIndex = Math.max(state.selectedAutocompleteIndex - 1, -1);
        const selectedItem = currentVnode?.dom.querySelector('.autocomplete-item.selected') as HTMLElement;
        if (selectedItem) {
          selectedItem.scrollIntoView({ block: 'nearest' });
        }
        return;
      }

      if (e.key === 'Enter' && state.selectedAutocompleteIndex >= 0) {
        e.preventDefault();
        selectAutocompleteItem(state.autocompleteItems[state.selectedAutocompleteIndex]);
        return;
      }
    }

    if (e.key === 'Enter' && target.value.trim()) {
      e.preventDefault();
      addChip({ tag: target.value.trim() });
    } else if (e.key === 'Backspace' && !target.value && state.chipsData.length > 0) {
      e.preventDefault();
      // Delete the last chip immediately when backspace is pressed in an empty input
      deleteChip(state.chipsData.length - 1);
    } else if (e.key === 'ArrowLeft' && !target.value && state.chipsData.length) {
      e.preventDefault();
      selectChip(state.chipsData.length - 1);
    }
  };

  const handleChipKeydown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      deleteChip(index);
      const newIndex = Math.max(index - 1, 0);
      if (state.chipsData.length) selectChip(newIndex);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      selectChip(index - 1);
    } else if (e.key === 'ArrowRight') {
      if (index < state.chipsData.length - 1) {
        selectChip(index + 1);
      } else {
        const input = currentVnode?.dom.querySelector('.chips-input') as HTMLInputElement;
        if (input) input.focus();
      }
    }
  };

  return {
    oninit: ({ attrs }) => {
      state.chipsData = attrs.data || [];
    },

    oncreate: (vnode) => {
      currentVnode = vnode;
    },

    onremove: () => {
      currentVnode = null;
    },

    view: ({ attrs }) => {
      const {
        id,
        required,
        isMandatory = required,
        className = 'col s12',
        label,
        helperText,
        placeholder,
        secondaryPlaceholder,
      } = attrs;

      const getPlaceholder = () => {
        if (!state.chipsData.length && placeholder) {
          return placeholder;
        }
        if (state.chipsData.length && secondaryPlaceholder) {
          return secondaryPlaceholder;
        }
        return '';
      };

      return m('.input-field', { id, className }, [
        m(
          '.chips.chips-initial',
          {
            class: `chips-container${state.focused ? ' focused' : ''}${placeholder ? ' chips-placeholder' : ''}`,
          },
          [
            // Chips
            state.chipsData.map((chip, index) =>
              m(
                '.chip',
                {
                  key: `${chip.tag}-${index}`,
                  tabindex: 0,
                  class: state.selectedChip === index ? 'selected' : undefined,
                  onkeydown: (e: KeyboardEvent) => handleChipKeydown(e, index),
                },
                [
                  chip.image &&
                    m('img', {
                      src: chip.image,
                      alt: chip.alt || chip.tag,
                    }),
                  chip.tag,
                  m(MaterialIcon, {
                    name: 'close',
                    className: 'close',
                    onclick: (e: MouseEvent) => {
                      e.stopPropagation();
                      deleteChip(index);
                    },
                  }),
                ]
              )
            ),

            // Input
            m('input[type=text].chips-input.input.browser-default', {
              id: state.inputId,
              title: 'label',
              value: state.inputValue,
              placeholder: getPlaceholder(),
              oninput: (e: InputEvent) => {
                state.inputValue = (e.target as HTMLInputElement).value;
                updateAutocomplete();
              },
              onfocus: () => {
                state.focused = true;
                state.selectedChip = null;
                updateAutocomplete();
              },
              onblur: () => {
                state.focused = false;
                setTimeout(() => {
                  state.showAutocomplete = false;
                  state.selectedChip = null;
                }, 150);
              },
              onkeydown: handleKeydown,
            }),

            state.showAutocomplete &&
              m(
                'ul.autocomplete-content.dropdown-content',
                {
                  style: {
                    display: 'block',
                    opacity: 1,
                    transform: 'scaleX(1) scaleY(1)',
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    top: '100%',
                    maxHeight: '200px',
                    overflow: 'auto',
                    zIndex: 1000,
                    backgroundColor: 'var(--mm-surface-color, #fff)',
                    boxShadow:
                      '0 2px 2px 0 var(--mm-shadow-penumbra, rgba(0,0,0,0.14)), 0 3px 1px -2px var(--mm-shadow-umbra, rgba(0,0,0,0.12)), 0 1px 5px 0 var(--mm-shadow-ambient, rgba(0,0,0,0.2))',
                  },
                },
                state.autocompleteItems.map((item, index) =>
                  m(
                    'li.autocomplete-item',
                    {
                      key: item.tag,
                      class: state.selectedAutocompleteIndex === index ? 'selected' : '',
                      style: {
                        padding: '12px 16px',
                        cursor: 'pointer',
                        backgroundColor: state.selectedAutocompleteIndex === index ? 'var(--mm-border-color, #eee)' : 'transparent',
                        color: 'var(--mm-text-primary, inherit)',
                      },
                      onmousedown: (e: MouseEvent) => {
                        e.preventDefault();
                        selectAutocompleteItem(item);
                      },
                      onmouseover: () => {
                        state.selectedAutocompleteIndex = index;
                      },
                    },
                    [
                      item.image &&
                        m('img.autocomplete-item-image', {
                          src: item.image,
                          alt: item.alt || item.tag,
                          style: {
                            width: '24px',
                            height: '24px',
                            marginRight: '8px',
                            verticalAlign: 'middle',
                          },
                        }),
                      m('span.autocomplete-item-text', item.tag),
                    ]
                  )
                )
              ),
          ]
        ),
        label &&
          m(Label, {
            label,
            id: state.inputId,
            isMandatory,
            isActive: state.focused || state.chipsData.length || placeholder ? true : false,
          }),
        helperText && m(HelperText, { helperText }),
      ]);
    },
  };
};
