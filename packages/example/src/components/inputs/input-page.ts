import {
  DatePicker,
  Select,
  ColorInput,
  NumberInput,
  TextInput,
  IInputOptions,
  CodeBlock,
  TextArea,
  EmailInput,
  TimePicker,
  Options,
  UrlInput,
  Switch,
  RangeInput,
  RadioButtons,
  Autocomplete,
} from 'mithril-materialized';
import m from 'mithril';

export const InputPage = () => {
  const onchange = (v: unknown) => alert(`Input changed. New value: ${v}`);
  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Inputs'),
        m('h3.header', 'TextInput'),
        m(
          'div',
          m(TextInput, {
            label: 'What is your name?',
            helperText: 'Please, be honest!',
            onchange,
            maxLength: 50,
          } as IInputOptions)
        ),
        m(CodeBlock, {
          code: `        m(TextInput, {
          label: 'What is your name?',
          helperText: 'Please, be honest!',
          onchange,
          maxLength: 50,
        } as IInputOptions)
`,
        }),
        m(
          'div',
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
        } as IInputOptions)
`,
        }),

        m('h3.header', 'Autocomplete'),
        m(
          'div',
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
        } as IInputOptions)
`,
        }),

        m('h3.header', 'TextArea'),
        m('div', m(TextArea, { label: 'Can you describe yourself?', helperText: `Don't be shy`, onchange })),
        m(CodeBlock, {
          code: `        m(TextArea, { label: 'Can you describe yourself?', helperText: 'Don\'t be shy', onchange })`,
        }),

        m('h3.header', 'EmailInput'),
        m(
          'div',
          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
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
          'div',
          m(UrlInput, {
            label: 'What is your favorite website?',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(UrlInput, {
            label: 'What is your favorite website?',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })`,
        }),

        m('h3.header', 'NumberInput'),
        m(
          'div',
          m(NumberInput, {
            min: 0,
            max: 120,
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 0 and 120.',
            onchange,
          })
        ),
        m(CodeBlock, {
          code: `          m(NumberInput, {
            min: 0,
            max: 120,
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 0 and 120.',
            onchange,
          })
`,
        }),

        m('h3.header', 'RangeInput'),
        m(
          'div',
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
          })
`,
        }),

        m('h3.header', 'ColorInput'),
        m(
          'div',
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
