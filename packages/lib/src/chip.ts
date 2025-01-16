import m from 'mithril';
import { uniqueId } from './utils';
import { HelperText, Label } from './label';

export interface ChipData {
  tag: string;
  image?: string;
}

export interface AutocompleteOption {
  text: string;
  value?: string;
  image?: string;
}

export interface IChipsOptions {
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

export const Chips: m.FactoryComponent<IChipsOptions> = () => {
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

  let currentVnode: m.VnodeDOM<IChipsOptions, any> | null = null;

  const processAutocompleteData = (
    data: Record<string, string | null> | AutocompleteOption[]
  ): AutocompleteOption[] => {
    if (Array.isArray(data)) {
      return data.map((item) => {
        if (typeof item === 'string') {
          return { text: item };
        }
        return item;
      });
    }
    return Object.entries(data).map(([text, value]) => ({
      text,
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
    const filtered = allOptions.filter((option) => option.text.toLowerCase().includes(input));

    const limit = currentVnode.attrs.autocompleteOptions.limit || Infinity;
    state.autocompleteItems = filtered.slice(0, limit);
    state.showAutocomplete = state.autocompleteItems.length > 0;
    state.selectedAutocompleteIndex = -1;
  };

  const selectAutocompleteItem = (item: AutocompleteOption) => {
    addChip({
      tag: item.text,
      image: item.image,
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
        m.redraw();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        state.selectedAutocompleteIndex = Math.max(state.selectedAutocompleteIndex - 1, -1);
        m.redraw();
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
    } else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && !target.value && state.chipsData.length) {
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

    // onupdate: (vnode) => {
    //   currentVnode = vnode;
    //   const { data } = vnode.attrs;
    //   if (data && JSON.stringify(data) !== JSON.stringify(state.chipsData)) {
    //     state.chipsData = data;
    //   }
    // },

    onremove: () => {
      currentVnode = null;
    },

    view: ({ attrs }) => {
      // console.log(state);
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

      return m('div.input-field', { id, className }, [
        m(
          '.chips.chips-initial',
          {
            class: `chips-container ${state.focused ? 'focused' : ''} ${placeholder ? 'chips-placeholder' : ''}`,
          },
          [
            // Chips
            state.chipsData.map((chip, index) =>
              m(
                '.chip',
                {
                  key: `${chip.tag}-${index}`,
                  tabindex: 0,
                  class: state.selectedChip === index ? 'selected' : '',
                  onkeydown: (e: KeyboardEvent) => handleChipKeydown(e, index),
                },
                [
                  chip.image &&
                    m('img', {
                      src: chip.image,
                      alt: chip.tag,
                    }),
                  chip.tag,
                  m(
                    'i.material-icons.close',
                    {
                      onclick: (e: MouseEvent) => {
                        e.stopPropagation();
                        deleteChip(index);
                      },
                    },
                    'close'
                  ),
                ]
              )
            ),

            // Input
            m('input.chips-input.input', {
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
                  state.selectedChip = null;
                  m.redraw();
                }, 100);
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
                    width: '120px',
                    left: '0px',
                    top: '45px',
                    height: '50px',
                    transformOrigin: '0px 0px',
                  },
                },
                state.autocompleteItems.map((item, index) =>
                  m(
                    'li.autocomplete-item',
                    {
                      key: item.text,
                      class: state.selectedAutocompleteIndex === index ? 'selected' : '',
                      onmousedown: (e: MouseEvent) => {
                        e.preventDefault();
                        selectAutocompleteItem(item);
                      },
                    },
                    [
                      item.image &&
                        m('img.autocomplete-item-image', {
                          src: item.image,
                          alt: item.text,
                        }),
                      m('span.autocomplete-item-text', item.text),
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
