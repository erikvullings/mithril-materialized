import {
  ColorInput,
  NumberInput,
  TextInput,
  InputAttrs,
  CodeBlock,
  TextArea,
  EmailInput,
  UrlInput,
  RangeInput,
  Autocomplete,
  PasswordInput,
  Chips,
  FileInput,
  SearchSelect,
  uniqueId,
} from 'mithril-materialized';
import m from 'mithril';

export const InputPage = () => {
  const oninput = (v: unknown) => console.log(`Input changed. New value: ${v}`);
  const onchange = (v: unknown) => console.log(`Final value: ${v}`);
  let value = 'click_clear_to_remove.me';

  const searchSelectOptions = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ];

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Inputs'),

        m('h3.header', 'TextInput'),
        m('h4.header', 'Normal text input'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your name?',
            // placeholder: 'Erik was here',
            required: true,
            helperText: 'Please, be honest!',
            oninput,
            onchange,
            autocomplete: 'off',
            onkeyup: (ev, value) => console.log(value),
            autofocus: true,
            maxLength: 50,
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          required: true,
          helperText: 'Please, be honest!',
          onchange,
          onkeyup: (ev, value) => console.log(value),
          autofocus: true // This may also be a function that resolves to a boolean
          maxLength: 50,
        } as InputAttrs)`,
        }),
        m('h4.header', 'TextInput with icon'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your name?',
            iconName: 'account_circle',
            onchange,
            maxLength: 50,
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          iconName: 'account_circle',
          onchange,
          maxLength: 50,
        } as InputAttrs)`,
        }),

        m('h4.header', 'TextInput with custom validation'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: (v) => v && v.toLowerCase() === 'google',
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: v => v && v.toLowerCase() === 'google',
          } as InputAttrs)`,
        }),

        m('h3.header', 'Autocomplete'),
        m(
          '.row',
          m(Autocomplete, {
            label: 'What is your favorite company?',
            data: {
              Apple: null,
              Google: null,
              Facebook: null,
              PHILIPS:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Philips_logo.svg/800px-Philips_logo.svg.png',
              TNO: 'https://tno.github.io/crime_scripts/f418cfa539199976.svg',
            },
            onchange,
          })
        ),
        m('span', m('a[target=_blank][href=https://materializecss.com/autocomplete.html]', 'Documentation')),
        m(CodeBlock, {
          code: `        m(Autocomplete, {
            label: 'What is your favorite company?',
            data: {
              Apple: null,
              Google: null,
              Facebook: null,
              PHILIPS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Philips_logo.svg/800px-Philips_logo.svg.png',
              TNO: 'https://tno.github.io/crime_scripts/f418cfa539199976.svg',
            },
            onchange,
        } as InputAttrs)`,
        }),

        m('h3.header', 'Search and select, optionally add'),
        m(SearchSelect, {
          options: searchSelectOptions,
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          label: 'Select search options',
          searchPlaceholder: 'Find an option...', // Custom search placeholder
        }),
        m(CodeBlock, {
          code: `        const searchSelectOptions = [
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' },
        ];
        ...
        m(SearchSelect, {
          options: searchSelectOptions,
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          label: 'Select search options',
          searchPlaceholder: 'Find an option...',
        })`,
        }),
        m(SearchSelect, {
          options: searchSelectOptions,
          initialValue: ['option1'],
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          oncreateNewOption: (searchTerm) => {
            console.log('Creating new option:', searchTerm);
            const newOption = { id: uniqueId(), label: searchTerm };
            // Add the new option to your options array
            searchSelectOptions.push(newOption);
            return newOption;
          },
          label: 'Select option or add new option',
          placeholder: 'No options selected',
        }),
        m(CodeBlock, {
          code: `        m(SearchSelect, {
          options: searchSelectOptions,
          initialValue: ['option1'],
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          oncreateNewOption: (searchTerm) => {
            console.log('Creating new option:', searchTerm);
            const newOption = { id: uniqueId(), label: searchTerm };
            // Add the new option to your options array
            searchSelectOptions.push(newOption);
            return newOption;
          },
          label: 'Select option or add new option',
          placeholder: 'No options selected',
        })`,
        }),

        m('h3.header', 'TextArea'),
        m(
          '.row',
          m(TextArea, {
            label: 'Please, describe yourself',
            helperText: `Don't be shy`,
            maxLength: 100,
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `        m(TextArea, {
            label: 'Please, describe yourself',
            helperText: 'Don\'t be shy',
            maxLength: 100,
            onchange })`,
        }),

        m('h3.header', 'NumberInput'),
        m(
          '.row',
          m(NumberInput, {
            min: 1,
            max: 120,
            step: 1,
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 1 and 120.',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(NumberInput, {
            min: 1,
            max: 120,
            step: 1, // Default value is step increments of 1
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 1 and 120.',
            onchange,
          })`,
        }),

        m('h4.header', 'NumberInput with custom validation'),
        m(
          '.row',
          m(NumberInput, {
            label: 'What is the result of 35 + 7?',
            dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
            dataError: 'Back to grammar school',
            validate: (v: number) => v === 42,
          })
        ),
        m(CodeBlock, {
          code: `          m(NumberInput, {
            label: 'What is the result of 35 + 7?',
            dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
            dataError: 'Back to grammar school',
            validate: (v: number) => v === 42,
          })`,
        }),

        m('h3.header', 'EmailInput'),
        m(
          '.row',
          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Please use username@org.com',
            dataSuccess: 'OK',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
            dataSuccess: 'OK',
            onchange,
          })`,
        }),

        m('h3.header', 'UrlInput'),
        m(
          '.row',
          m(UrlInput, {
            label: 'What is your favorite website?',
            placeholder: 'http(s)://',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(UrlInput, {
            label: 'What is your favorite website?',
            placeholder: 'http(s)://',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })`,
        }),

        m('h3.header', 'PasswordInput'),
        m(
          '.row',
          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            onchange,
          })`,
        }),

        m('h3.header', 'FileInput'),
        m(
          '.row',
          m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
            initialValue: value,
            accept: ['image/*', '.pdf'],
            onchange: (files: FileList) => {
              value = '';
              console.table(files);
            },
          })
        ),
        m(CodeBlock, {
          code: `        m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
            initialValue: value,
            accept: ['image/*', '.pdf'],
            onchange: (files: FileList) => console.table(files),
          })`,
        }),

        m('h3.header', 'RangeInput'),
        m(
          '.row',
          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            onchange,
          })`,
        }),

        m('h3.header', 'Chips'),
        m(
          '.row',
          m(Chips, {
            onchange: (chips: any[]) => onchange(JSON.stringify(chips)),
            label: 'An optional label',
            helperText: 'Optional help instructions',
            placeholder: 'Add a tag',
            secondaryPlaceholder: '+Tag',
            required: true,
            data: [
              {
                tag: 'Hello',
              },
              {
                tag: 'World',
              },
            ],
          })
        ),
        m(CodeBlock, {
          code: `          m(Chips, {
            onchange: (chips: any[]) => onchange(JSON.stringify(chips)),
            label: 'An optional label',
            helperText: 'Optional help instructions',
            placeholder: 'Add a tag',
            secondaryPlaceholder: '+Tag',
            data: [{
              tag: 'Hello',
            }, {
              tag: 'World',
            }],
          })`,
        }),

        m('h3.header', 'Chips with auto-complete'),
        m(
          '.row',
          m(Chips, {
            label: 'Cloud providers',
            autocompleteOptions: {
              data: {
                Apple: null,
                Microsoft: null,
                Google: null,
              },
              limit: Infinity,
              minLength: 1,
            },
          })
        ),
        m(CodeBlock, {
          code: `          m(Chips, {
            label: 'Cloud providers',
            autocompleteOptions: {
              data: {
                Apple: null,
                Microsoft: null,
                Google: null,
              },
              limit: Infinity,
              minLength: 1,
            },
          })`,
        }),

        m('h3.header', 'ColorInput'),
        m(
          '.row',
          m(ColorInput, {
            label: 'What is your favorite color?',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(ColorInput, {
            label: 'What is your favorite color?',
            onchange,
          })`,
        }),
      ]),
  };
};
