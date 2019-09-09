import {
  ColorInput,
  NumberInput,
  TextInput,
  IInputOptions,
  CodeBlock,
  TextArea,
  EmailInput,
  UrlInput,
  RangeInput,
  Autocomplete,
  PasswordInput,
  Chips,
  FileInput,
} from 'mithril-materialized';
import m from 'mithril';

export const InputPage = () => {
  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);
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
            helperText: 'Please, be honest!',
            onchange,
            autocomplete: 'off',
            onkeyup: (ev, value) => console.log(value),
            autofocus: true,
            maxLength: 50,
          } as IInputOptions)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          helperText: 'Please, be honest!',
          onchange,
          onkeyup: (ev, value) => console.log(value),
          autofocus: true // This may also be a function that resolves to a boolean
          maxLength: 50,
        } as IInputOptions)`,
        }),
        m('h4.header', 'TextInput with icon'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is your name?',
            iconName: 'account_circle',
            onchange,
            maxLength: 50,
          } as IInputOptions)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          iconName: 'account_circle',
          onchange,
          maxLength: 50,
        } as IInputOptions)`,
        }),

        m('h4.header', 'TextInput with custom validation'),
        m(
          '.row',
          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: v => v && v.toLowerCase() === 'google',
          } as IInputOptions)
        ),
        m(CodeBlock, {
          code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: v => v && v.toLowerCase() === 'google',
          } as IInputOptions)`,
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
              PHILIPS: 'http://hdlighting-suriname.com/wp-content/uploads/2013/12/philips.png',
              TNO: 'https://github.com/TNOCS/spec-tool/raw/master/src/assets/tno.png',
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
              PHILIPS: 'http://hdlighting-suriname.com/wp-content/uploads/2013/12/philips.png',
              TNO: 'https://github.com/TNOCS/spec-tool/raw/master/src/assets/tno.png',
            },
            onchange,
        } as IInputOptions)`,
        }),

        m('h3.header', 'TextArea'),
        m(
          '.row',
          m(TextArea, { label: 'Please, describe yourself', helperText: `Don't be shy`, maxLength: 100, onchange })
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
            accept: ['image/*', '.pdf'],
            onchange: (files: FileList) => console.table(files),
          })
        ),
        m(CodeBlock, {
          code: `        m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
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
            onchange: (chips: M.ChipData[]) => onchange(JSON.stringify(chips)),
            label: 'An optional label',
            helperText: 'Optional help instructions',
            placeholder: 'Add a tag',
            secondaryPlaceholder: '+Tag',
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
            onchange: (chips: M.ChipData[]) => onchange(JSON.stringify(chips)),
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
