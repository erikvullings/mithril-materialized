import m, { Attributes, FactoryComponent } from 'mithril';

export interface ValidationSummaryError {
  /** The ID of the invalid field. Used to link and focus the field from the summary. */
  fieldId?: string;
  /** Use a custom target when the error does not belong to a focusable field. */
  href?: string;
  /** Error text shown in the summary. */
  message: m.Children;
}

export interface FieldsetAttrs extends Attributes {
  /** Accessible label for the group of controls. */
  legend: m.Children;
  /** Optional explanatory text below the legend. */
  description?: m.Children;
  /** Mark the group as required. */
  required?: boolean;
  /** Disable native controls contained in the group. */
  disabled?: boolean;
  /** Group-level validation message. */
  error?: m.Children;
}

/** A semantic native fieldset for related controls. */
export const Fieldset: FactoryComponent<FieldsetAttrs> = () => ({
  view: ({ attrs, children }) => {
    const { legend, description, required, disabled, error, className, ...params } = attrs;
    const descriptionId = params.id ? `${params.id}-description` : undefined;
    const errorId = params.id ? `${params.id}-error` : undefined;
    const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ') || undefined;

    return m('fieldset.mm-fieldset', { ...params, className, disabled, 'aria-describedby': describedBy }, [
      m('legend.mm-fieldset__legend', [legend, required && m('span.mm-fieldset__required[aria-hidden=true]', ' *')]),
      description && m('p.mm-fieldset__description', { id: descriptionId }, description),
      children,
      error && m('p.mm-fieldset__error[role=alert]', { id: errorId }, error),
    ]);
  },
});

export interface FormSectionAttrs extends Attributes {
  /** Visible section heading. */
  title?: m.Children;
  /** Optional explanatory text below the heading. */
  description?: m.Children;
  /** Errors supplied by the application's form validation state. */
  errors?: ValidationSummaryError[];
  /** Heading used by the validation summary. */
  summaryTitle?: m.Children;
}

const focusErrorTarget = (fieldId?: string) => {
  if (!fieldId || typeof document === 'undefined') return;
  document.getElementById(fieldId)?.focus();
};

/** A visual form section with an optional accessible validation summary. */
export const FormSection: FactoryComponent<FormSectionAttrs> = () => ({
  view: ({ attrs, children }) => {
    const { title, description, errors = [], summaryTitle = 'Please correct the following errors', className, ...params } = attrs;

    return m('section.mm-form-section', { ...params, className }, [
      (title || description) &&
        m('.mm-form-section__header', [
          title && m('h3.mm-form-section__title', title),
          description && m('p.mm-form-section__description', description),
        ]),
      errors.length > 0 &&
        m('div.mm-validation-summary[role=alert][aria-live=assertive]', [
          m('p.mm-validation-summary__title', summaryTitle),
          m(
            'ul.mm-validation-summary__list',
            errors.map((error, index) => {
              const href = error.href ?? (error.fieldId ? `#${error.fieldId}` : undefined);
              return m('li', { key: `${error.fieldId ?? href ?? 'error'}-${index}` },
                href
                  ? m('a', { href, onclick: () => focusErrorTarget(error.fieldId) }, error.message)
                  : error.message
              );
            })
          ),
        ]),
      children,
    ]);
  },
});
