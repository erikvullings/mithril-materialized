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
  let textAreaValue = `Test De lucht is niet echt blauw, maar het lijkt wel zo. Het is een uitdrukking dat we gebruiken om te zeggen dat iemand verdrietig of bedruikt is.

In de aardatmosfeer is de kleur van de lucht gemaakt door de reflectie van de zonneschijn en andere lichtbronnen. De blauwe kleur van de lucht is het resultaat van een fenomen dat wordt genoemd Rayleigh-scattering.

Wanneer de zonneschijn door de luchtkolonnen in de aardatmosfeer passeert, wordt de lichtgolf gedeeltelijk doorgedrukt en ontwikkeld. De kleinere deeltjes van de lucht, zoals nitrogen- en oxygentypische moleculen, scatterschen het licht op kleine hoeken. Dit maakt de lichtgolf langwerpig en rood en geeft de lucht een blauwe tint.

De reden waarom de blauwe kleur van de lucht zover reikt is dat de luchtkolonnen in de aardatmosfeer heel klein zijn. De kleinere deeltjes scatterschen het licht op kleine hoeken, waardoor de blauwe kleur verder kan reiken dan andere kleuren.

In 1666 stelde de Engelse natuurkundige Isaac Newton dat de kleur van de lucht afhankelijk was van de lengte van de lichtgolf. Hij ontdekte dat de kleinere deeltjes in de luchtkolonnen de lichtgolven op kleine hoeken scatterschen, waardoor de blauwe kleur verder kan reiken dan andere kleuren.

Sindsdien is het wetenschappelijk consens dat de blauwe kleur van de lucht het resultaat is van Rayleigh-scattering en de eigenschappen van de aardatmosfeer.`;
  let autocompleteValue = '';
  let emailValue = '';
  let urlValue = '';
  let pwdValue = '';
  let colorValue = '#00ff00';
  let numberValue: undefined | number;
  let selectedOptions = [] as string[];
  let selectedCountry = [] as string[];
  let selectedCategory = [] as string[];
  let selectedFruits = [] as string[];
  const oninput = (v: unknown) => console.log(`Input changed. New value: ${v}`);
  let value = 'click_clear_to_remove.me';

  const searchSelectOptions = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
  ];

  // Large dataset for demonstrating maxDisplayedOptions
  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'North Korea',
    'South Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ].map((country, index) => ({ id: `country-${index}`, label: country }));

  const categories = [
    { id: 'tech', label: 'Technology' },
    { id: 'science', label: 'Science' },
    { id: 'art', label: 'Art' },
    { id: 'music', label: 'Music' },
    { id: 'sports', label: 'Sports' },
  ];

  const fruits = [
    { id: 'banana', label: 'Banana' },
    { id: 'apple', label: 'Apple' },
    { id: 'orange', label: 'Orange' },
    { id: 'grape', label: 'Grape' },
    { id: 'mango', label: 'Mango' },
    { id: 'pineapple', label: 'Pineapple' },
    { id: 'strawberry', label: 'Strawberry' },
    { id: 'watermelon', label: 'Watermelon' },
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
            oninput: (v) => (textInputValue = v),
            validate: (v) => v && v.toLowerCase() === 'google',
          } as InputAttrs)
        ),
        m(CodeBlock, {
          code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            value: textInputValue,
            oninput: (v) => (textInputValue = v),
            validate: v => v && v.toLowerCase() === 'google',
          } as InputAttrs)`,
        }),

        m('h4.header', 'Readonly TextInput (no validation)'),
        m('p', 'Readonly inputs should not show validation styling when clicked or blurred:'),
        m(
          '.row',
          m('.col.s12', [
            m(TextInput, {
              iconName: 'category',
              label: 'Category',
              oninput: () => {},
              readonly: true,
              value: 'Read Only Value',
            } as InputAttrs),
          ])
        ),
        m(CodeBlock, {
          code: `          m(TextInput, {
            iconName: 'category',
            label: 'Category',
            oninput: () => {},
            readonly: true,
            value: 'Read Only Value',
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
            console.log('Selected:', selectedOptions);
          },
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
            // Option is automatically stored internally by the component
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
            console.log('Selected:', selectedOptions);
          },
          oncreateNewOption: (searchTerm) => {
            console.log('Creating new option:', searchTerm);
            const newOption = { id: uniqueId(), label: searchTerm };
            // Option is automatically stored internally by the component
            // Press ENTER or click to add the new option
            return newOption;
          },
          label: 'Select option or add new option',
          placeholder: 'No options selected',
        })`,
        }),

        m('h3.header', 'Search and select with performance optimizations'),
        m('p', [
          'When dealing with large datasets, use ',
          m('code', 'maxDisplayedOptions'),
          ' to limit the number of rendered options for better performance. The component will show a message indicating how many results are available.',
        ]),
        m(SearchSelect<string>, {
          options: countries,
          label: 'Select countries (large dataset)',
          searchPlaceholder: 'Search countries...',
          checkedId: selectedCountry,
          onchange: (v) => {
            selectedCountry = v;
            console.log('Selected countries:', selectedCountry);
          },
          maxDisplayedOptions: 50,
          i18n: {
            showingXofY: 'Showing {shown} of {total} countries - refine your search',
            noOptionsFound: 'No countries found',
          },
        }),
        m(CodeBlock, {
          code: `        // Large dataset (195 countries)
        const countries = [...].map((country, index) =>
          ({ id: \`country-\${index}\`, label: country })
        );

        m(SearchSelect, {
          options: countries,
          label: 'Select countries (large dataset)',
          searchPlaceholder: 'Search countries...',
          checkedId: selectedCountry,
          onchange: (v) => {
            selectedCountry = v;
            console.log('Selected countries:', selectedCountry);
          },
          maxDisplayedOptions: 50, // Only show 50 options at a time
          i18n: {
            showingXofY: 'Showing {shown} of {total} countries - refine your search',
            noOptionsFound: 'No countries found',
          },
        })`,
        }),

        m('h3.header', 'Search and select with max selection limit'),
        m('p', [
          'Use ',
          m('code', 'maxSelectedOptions'),
          ' to limit how many items can be selected. When ',
          m('code', 'maxSelectedOptions=1'),
          ', checkboxes are hidden and it behaves like a single-select dropdown.',
        ]),
        m(SearchSelect<string>, {
          options: categories,
          label: 'Select category (single select)',
          searchPlaceholder: 'Search categories...',
          checkedId: selectedCategory,
          onchange: (v) => {
            selectedCategory = v;
            console.log('Selected category:', selectedCategory);
          },
          maxSelectedOptions: 1, // Single select - checkboxes hidden
          placeholder: 'No category selected',
        }),
        m(CodeBlock, {
          code: `        m(SearchSelect, {
          options: categories,
          label: 'Select category (single select)',
          searchPlaceholder: 'Search categories...',
          checkedId: selectedCategory,
          onchange: (v) => {
            selectedCategory = v;
            console.log('Selected category:', selectedCategory);
          },
          maxSelectedOptions: 1, // Checkboxes hidden, single select behavior
          placeholder: 'No category selected',
        })`,
        }),

        m('h3.header', 'Search and select with sorted selections'),
        m('p', [
          'Use ',
          m('code', 'sortSelected'),
          ' to sort selected items alphabetically. Options: ',
          m('code', "'asc'"),
          ' (A-Z), ',
          m('code', "'desc'"),
          ' (Z-A), ',
          m('code', "'none'"),
          ' (insertion order), or provide a custom sort function.',
        ]),
        m(SearchSelect<string>, {
          options: fruits,
          label: 'Select fruits (sorted alphabetically)',
          searchPlaceholder: 'Search fruits...',
          checkedId: selectedFruits,
          onchange: (v) => {
            selectedFruits = v;
            console.log('Selected fruits:', selectedFruits);
          },
          sortSelected: 'asc', // Sort selected items A-Z
          placeholder: 'No fruits selected',
        }),
        m(CodeBlock, {
          code: `        const fruits = [
          { id: 'banana', label: 'Banana' },
          { id: 'apple', label: 'Apple' },
          { id: 'orange', label: 'Orange' },
          // ... more fruits
        ];

        m(SearchSelect, {
          options: fruits,
          label: 'Select fruits (sorted alphabetically)',
          searchPlaceholder: 'Search fruits...',
          checkedId: selectedFruits,
          onchange: (v) => {
            selectedFruits = v;
            console.log('Selected fruits:', selectedFruits);
          },
          sortSelected: 'asc', // Sort chips alphabetically A-Z
          placeholder: 'No fruits selected',
        })`,
        }),

        m('h3.header', 'TextArea'),
        m(
          '.row',
          m(TextArea, {
            label: 'Please, describe yourself',
            helperText: `Don't be shy`,
            maxLength: 100,
            defaultValue: textAreaValue,
            onchange: (v) => {
              textAreaValue = v;
              console.log('TextArea:', textAreaValue);
            },
          })
        ),
        m(
          '.row',
          m(
            '.col.s6',
            m(CodeBlock, {
              code: `
          // Uncontrolled example
          m(TextArea, {
            label: 'Please, describe yourself',
            helperText: 'Don\'t be shy',
            maxLength: 100,
            defaultValue: textAreaValue,
            onchange: (v) => {
              textAreaValue = v;
              console.log('TextArea:', textAreaValue);
            },
          })`,
            })
          ),
          m(
            '.col.s6',
            m(CodeBlock, {
              code: `
              // Controlled example
              m(TextArea, {
                label: 'Please, describe yourself',
                helperText: 'Don\'t be shy',
                maxLength: 100,
                value: textAreaValue,
                oninput: (v) => {
                  textAreaValue = v;
                  console.log('TextArea:', textAreaValue);
                },
              })`,
            })
          )
        ),
        m('h4.header', 'Height Comparison: TextInput vs TextArea'),
        m('p', 'When both have the same single-line content, they should have the same height:'),
        m('.row', [
          m(TextInput, {
            label: 'TextInput (single line)',
            defaultValue: 'Short text',
            className: 'col s6',
            onchange: (v) => console.log('TextInput:', v),
          }),
          m(TextArea, {
            label: 'TextArea (single line)',
            defaultValue: 'Short text',
            className: 'col s6',
            onchange: (v) => console.log('TextArea:', v),
          }),
        ]),
        m(CodeBlock, {
          code: `        // Both components with same content should have same height
        m('.row', [
          m('.col.s6',
            m(TextInput, {
              label: 'TextInput (single line)',
              defaultValue: 'Short text',
              onchange: (v) => console.log('TextInput:', v),
            })
          ),
          m('.col.s6',
            m(TextArea, {
              label: 'TextArea (single line)',
              value: 'Short text',
              onchange: (v) => console.log('TextArea:', v),
            })
          ),
        ])`,
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
            defaultValue: emailValue,
            onchange: (v) => (emailValue = v),
          })
        ),
        m(CodeBlock, {
          code: `          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
            dataSuccess: 'OK',
            defaultValue: emailValue,
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
            defaultValue: pwdValue,
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
            defaultValue: numberValue,
            // oninput: (v) => (numberValue = v),
            onchange: (v) => console.log(`RangeInput final value: ${v}`),
          })
        ),
        m(CodeBlock, {
          code: `          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            defaultValue: numberValue,
            onchange: v => numberValue = v,
          })`,
        }),

        m('h4.header', 'RangeInput with valueDisplay options'),
        m('.row', [
          m('.col.s12', m('h6', 'Always show value (uncontrolled)')),
          m(
            '.col.s12',
            m(RangeInput, {
              min: 0,
              max: 100,
              defaultValue: 75,
              label: 'Always visible tooltip',
              valueDisplay: 'always',
              tooltipPos: 'top',
              onchange: (value: number) => console.log('Range final value:', value),
            } as InputAttrs<number>)
          ),
          m('.col.s12', { style: 'margin-top: 20px;' }, m('h6', 'Show value only during drag (uncontrolled)')),
          m(
            '.col.s12',
            m(RangeInput, {
              min: 0,
              max: 100,
              defaultValue: 50,
              label: 'Tooltip on drag',
              valueDisplay: 'auto',
              tooltipPos: 'bottom',
              onchange: (value: number) => console.log('Range final value:', value),
            } as InputAttrs<number>)
          ),
        ]),
        m(CodeBlock, {
          code: `// Always show tooltip (uncontrolled)
m(RangeInput, {
  min: 0,
  max: 100,
  defaultValue: 75,
  label: 'Always visible tooltip',
  valueDisplay: 'always', // 'auto' | 'always' | 'none'
  tooltipPos: 'top',
  onchange: (value: number) => console.log('Range final value:', value),
})

// Show tooltip only during drag (uncontrolled, recommended)
m(RangeInput, {
  min: 0,
  max: 100,
  defaultValue: 50,
  label: 'Tooltip on drag',
  valueDisplay: 'auto', // Show during interaction only
  tooltipPos: 'bottom',
  onchange: (value: number) => console.log('Range final value:', value),
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
              defaultValue: 50,
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
            defaultValue: 50,
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
