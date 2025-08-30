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
  let textInputValue = '';
  let textAreaValue = '';
  let autocompleteValue = '';
  let emailValue = '';
  let urlValue = '';
  let pwdValue = '';
  let colorValue = '#00ff00';
  let numberValue: undefined | number;
  let selectedOptions = [] as string[];
  const oninput = (v: unknown) => console.log(`Input changed. New value: ${v}`);
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
        m('h4.header', 'Controlled text input'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your name?',
            // placeholder: 'Erik was here',
            required: true,
            helperText: 'Controlled component!',
            autocomplete: 'off',
            onkeyup: (ev, value) => console.log(value),
            autofocus: true,
            maxLength: 50,
            canClear: true,
            value: textInputValue,
            oninput: (v) => (console.log(`Oninput TextInput: ${v}`), (textInputValue = v)),
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          required: true,
          helperText: 'Controlled component!',
          onchange,
          onkeyup: (ev, value) => console.log(value),
          autofocus: true // This may also be a function that resolves to a boolean
          maxLength: 50,
          value: textInputValue,
          oninput: (v) => (textInputValue = v),
        } as InputAttrs)`,
        }),

        m('h4.header', 'Uncontrolled text input'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your favorite hobby?',
            helperText: 'Uncontrolled component with defaultValue!',
            defaultValue: 'Reading books',
            maxLength: 50,
            onchange: (v) => console.log('Uncontrolled TextInput change:', v),
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your favorite hobby?',
          helperText: 'Uncontrolled component with defaultValue!',
          defaultValue: 'Reading books',
          maxLength: 50,
          onchange: (v) => console.log('Uncontrolled TextInput change:', v),
        } as InputAttrs)`,
        }),

        m('h4.header', 'TextInput with icon'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your name?',
            iconName: 'account_circle',
            maxLength: 50,
            onchange: (v) => console.log(v),
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          iconName: 'account_circle',
          maxLength: 50,
          onchange: (v) => console.log(v),
        } as InputAttrs)`,
        }),

        m('h4.header', 'TextInput with custom validation'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            value: textInputValue,
            onchange: (v) => (textInputValue = v),
            validate: (v) => v && v.toLowerCase() === 'google',
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            value: textInputValue,
            onchange: (v) => (textInputValue = v),
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
            value: autocompleteValue,
            onchange: (v) => (autocompleteValue = v),
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
            value: autocompleteValue,
            onchange: (v) => (autocompleteValue = v),
        } as InputAttrs)`,
        }),

        m('h3.header', 'Search and select, optionally add'),
        m(SearchSelect<string>, {
          options: searchSelectOptions,
          label: 'Select search options',
          searchPlaceholder: 'Find an option...', // Custom search placeholder
          checkedId: selectedOptions,
          onchange: (v) => {
            selectedOptions = v;
            console.log('Selected:', selectedOptions);
          },
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
          label: 'Select search options',
          searchPlaceholder: 'Find an option...',
          checkedId: selectedOptions,
          onchange: (v) => {
            selectedOptions = v;
            console.log('Selected:', selectedOptions)},
        })`,
        }),
        m(SearchSelect<string>, {
          options: searchSelectOptions,
          checkedId: selectedOptions,
          onchange: (v) => {
            selectedOptions = v;
            console.log('Selected:', selectedOptions);
          },
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
          checkedId: selectedOptions,
          onchange: (v) => {
            selectedOptions = v;
            console.log('Selected:', selectedOptions)},
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
            value: textAreaValue,
            onchange: (v) => {
              textAreaValue = v;
              console.log('TextArea:', textAreaValue);
            },
          })
        ),
        m(CodeBlock, {
          code: `        m(TextArea, {
            label: 'Please, describe yourself',
            helperText: 'Don\'t be shy',
            maxLength: 100,
            value: textAreaValue,
            onchange: (v) => {
              textAreaValue = v;
              console.log('TextArea:', textAreaValue)},
            })`,
        }),

        m('h3.header', 'NumberInput'),
        m(
          '.row',
          m(NumberInput, {
            min: 1,
            max: 120,
            step: 1,
            value: numberValue,
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 1 and 120.',
            onchange: (v) => (numberValue = v),
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
            value: emailValue,
            onchange: (v) => (emailValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
            dataSuccess: 'OK',
            value: emailValue,
            onchange: v => emailValue = v,
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
            onchange: (v) => (urlValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(UrlInput, {
            label: 'What is your favorite website?',
            placeholder: 'http(s)://',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            value: urlValue,
            onchange: v => urlValue = v,
          })`,
        }),

        m('h3.header', 'PasswordInput'),
        m(
          '.row',
          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            value: pwdValue,
            onchange: (v) => (pwdValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            value: pwdValue,
            onchange: v => pwdValue = v,
          })`,
        }),

        m('h3.header', 'FileInput'),
        m(
          '.row',
          m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
            value: value,
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
            value: value,
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
            showValue: true,
            label: 'What is your favorite number between 0 and 100?',
            value: numberValue,
            onchange: (v) => (numberValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            value: numberValue,
            onchange: v => numberValue = v,
          })`,
        }),

        m('h4.header', 'RangeInput with valueDisplay options'),
        m('.row', [
          m('.col.s12', m('h6', 'Always show value')),
          m(
            '.col.s12',
            m(RangeInput, {
              min: 0,
              max: 100,
              value: 75,
              label: 'Always visible tooltip',
              valueDisplay: 'always',
              tooltipPos: 'top',
              oninput: (value: number) => console.log('Range input:', value),
              // value: numberValue,
              // onchange: v => numberValue = v,
            } as InputAttrs<number>)
          ),
          m('.col.s12', { style: 'margin-top: 20px;' }, m('h6', 'Show value only during drag')),
          m(
            '.col.s12',
            m(RangeInput, {
              min: 0,
              max: 100,
              value: 50,
              label: 'Tooltip on drag',
              valueDisplay: 'auto',
              tooltipPos: 'bottom',
              oninput: (value: number) => console.log('Range input:', value),
              //    value: numberValue,
              // onchange: v => numberValue = v,
            } as InputAttrs<number>)
          ),
        ]),
        m(CodeBlock, {
          code: `// Always show tooltip
m(RangeInput, {
  min: 0,
  max: 100,
  value: 75,
  label: 'Always visible tooltip',
  valueDisplay: 'always', // 'auto' | 'always' | 'none'
  tooltipPos: 'top',
  onchange: (value: number) => console.log('Range change:', value),
})

// Show tooltip only during drag (recommended)
m(RangeInput, {
  min: 0,
  max: 100,
  value: 50,
  label: 'Tooltip on drag',
  valueDisplay: 'auto', // Show during interaction only
  tooltipPos: 'bottom',
  onchange: (value: number) => console.log('Range change:', value),
})`,
        }),

        m('h3.header', 'Enhanced Range Sliders'),

        m('h4.header', 'Vertical Range Slider'),
        m(
          '.row',
          m(
            '.col.s6',
            m(RangeInput, {
              min: 18,
              max: 67,
              value: 50,
              label: 'Vertical Slider',
              height: '150px',
              vertical: true,
              valueDisplay: 'auto',
              tooltipPos: 'right',
              oninput: (value: number) => console.log('Vertical slider input:', value),
              onchange: (value: number) => console.log('Vertical slider change:', value),
            } as InputAttrs<number>)
          )
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 18,
            max: 67,
            value: 50,
            label: 'Vertical Slider',
            height: '150px',
            vertical: true,
            valueDisplay: 'auto', // Show tooltip on drag
            tooltipPos: 'right', // Better for vertical sliders
            onchange: (value: number) => console.log('Vertical slider:', value),
          } as InputAttrs<number>)`,
        }),

        m('h4.header', 'Double Range Slider (From/To)'),
        m(
          '.row',
          m(RangeInput, {
            min: 0,
            max: 100,
            minValue: 20,
            maxValue: 80,
            label: 'Select Range',
            valueDisplay: 'always',
            minmax: true,
            onchange: (minVal: number, maxVal: number) => console.log('Range:', minVal, '-', maxVal),
          } as InputAttrs<number>)
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 0,
            max: 100,
            minValue: 20,
            maxValue: 80,
            label: 'Select Range',
            valueDisplay: 'always', // Always show values
            minmax: true,
            onchange: (minVal: number, maxVal: number) => console.log('Range:', minVal, '-', maxVal),
          } as InputAttrs<number>)`,
        }),

        m('h4.header', 'Vertical Double Range Slider'),
        m(
          '.row',
          m(
            '.col.s6',
            m(RangeInput, {
              min: 0,
              max: 100,
              minValue: 30,
              maxValue: 70,
              label: 'Vertical Range',
              height: '250px',
              vertical: true,
              minmax: true,
              valueDisplay: 'auto',
              tooltipPos: 'right',
              oninput: (minVal: number, maxVal: number) => console.log('Vertical range input:', minVal, '-', maxVal),
              onchange: (minVal: number, maxVal: number) => console.log('Vertical range change:', minVal, '-', maxVal),
            } as InputAttrs<number>)
          )
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 0,
            max: 100,
            minValue: 30,
            maxValue: 70,
            label: 'Vertical Range',
            height: '250px',
            vertical: true,
            minmax: true,
            valueDisplay: 'auto', // Show tooltips during drag
            tooltipPos: 'right', // Position for vertical sliders
            onchange: (minVal: number, maxVal: number) => console.log('Vertical range:', minVal, '-', maxVal),
          } as InputAttrs<number>)`,
        }),

        m('h3.header', 'Chips'),
        m(
          '.row',
          m(Chips, {
            onchange: (chips) => console.log(JSON.stringify(chips)),
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
            defaultValue: colorValue,
            onchange: (v) => (colorValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(ColorInput, {
            label: 'What is your favorite color?',
            defaultValue: colorValue,
            onchange: (v) => (colorValue = v),
          })`,
        }),
      ]),
  };
};
