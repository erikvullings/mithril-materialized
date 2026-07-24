import m from 'mithril';
import { Button, Fieldset, FormSection, TextInput, ValidationSummaryError } from 'mithril-materialized';
import { HighlightedCodeBlock } from '../highlighted-code-block';

export const FormSectionPage = () => {
  const state = {
    name: '',
    email: '',
    emailUpdates: false,
    submitted: false,
  };

  const errors = (): ValidationSummaryError[] => {
    if (!state.submitted) return [];
    return [
      !state.name.trim() && { fieldId: 'profile-name', message: 'Enter your name.' },
      !/^\S+@\S+\.\S+$/.test(state.email) && { fieldId: 'profile-email', message: 'Enter a valid email address.' },
    ].filter(Boolean) as ValidationSummaryError[];
  };

  return {
    view: () => {
      const validationErrors = errors();
      const nameError = validationErrors.find((error) => error.fieldId === 'profile-name');
      const emailError = validationErrors.find((error) => error.fieldId === 'profile-email');

      return m('.col.s12', [
        m('h2.header', 'Form Sections'),
        m('p', 'Use Fieldset to semantically group related controls and FormSection to organise a larger form area with a validation summary.'),
        m('form', {
          onsubmit: (event: SubmitEvent) => {
            event.preventDefault();
            state.submitted = true;
          },
        }, [
          m(FormSection, {
            title: 'Profile details',
            description: 'These details appear on your account.',
            errors: validationErrors,
          }, [
            m('.row', [
              m(TextInput, {
                id: 'profile-name',
                label: 'Name',
                value: state.name,
                required: true,
                dataError: nameError?.message as string | undefined,
                oninput: (value) => (state.name = value),
              }),
              m(TextInput, {
                id: 'profile-email',
                label: 'Email address',
                type: 'email',
                value: state.email,
                required: true,
                dataError: emailError?.message as string | undefined,
                oninput: (value) => (state.email = value),
              }),
            ]),
            m(Fieldset, {
              legend: 'Contact preferences',
              description: 'Choose how we may send account updates.',
              required: true,
            },
              m('p', m('label', [
                m('input[type=checkbox]', {
                  checked: state.emailUpdates,
                  onchange: (event: Event) => (state.emailUpdates = (event.target as HTMLInputElement).checked),
                }),
                m('span', ' Email updates'),
              ]))
            ),
          ]),
          m(Button, { label: 'Validate form', variant: 'submit' }),
        ]),
        m('h3.header', 'TypeScript'),
        m(HighlightedCodeBlock, {
          language: 'typescript',
          code: `const errors: ValidationSummaryError[] = [
  !name && { fieldId: 'profile-name', message: 'Enter your name.' },
  !isValidEmail(email) && { fieldId: 'profile-email', message: 'Enter a valid email address.' },
].filter(Boolean) as ValidationSummaryError[];

m(FormSection, {
  title: 'Profile details',
  description: 'These details appear on your account.',
  errors,
}, [
  m(TextInput, { id: 'profile-name', label: 'Name' }),
  m(TextInput, { id: 'profile-email', label: 'Email address' }),
  m(Fieldset, {
    legend: 'Contact preferences',
    description: 'Choose how we may send account updates.',
    required: true,
  }, m('label', [m('input[type=checkbox]'), ' Email updates']))
]);`,
        }),
        m('h3.header', 'CSS'),
        m(HighlightedCodeBlock, {
          language: 'css',
          code: `.mm-fieldset {
  border: 1px solid var(--mm-border-color);
  border-radius: 4px;
  padding: 1rem;
}

.mm-validation-summary {
  border-left: 4px solid var(--mm-error-color);
  color: var(--mm-error-color);
}`,
        }),
      ]);
    },
  };
};
