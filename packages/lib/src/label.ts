import m, { FactoryComponent, Component, Attributes } from 'mithril';
// import './styles/input.css';

export const Mandatory: Component = { view: ({ attrs }) => m('span.mandatory', attrs, '*') };

export interface LabelAttrs extends Attributes {
  /** Optional title/label */
  label?: string;
  /** Optional ID */
  id?: string;
  /** If true, add a mandatory '*' after the label */
  isMandatory?: boolean;
  /** Add the active class to the label */
  isActive?: boolean | string;
}

/** Simple label element, used for most components. */
export const Label: FactoryComponent<LabelAttrs> = () => {
  return {
    view: ({ attrs: { label, id, isMandatory, isActive, className, ...params } }) =>
      label
        ? m(
            'label',
            {
              ...params,
              className: [className, isActive ? 'active' : ''].filter(Boolean).join(' ').trim() || undefined,
              for: id,
            },
            [m.trust(label), isMandatory ? m(Mandatory) : undefined]
          )
        : undefined,
  };
};

export interface HelperTextOptions extends Attributes {
  helperText?: string;
  dataError?: string;
  dataSuccess?: string;
}

/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
export const HelperText: FactoryComponent<HelperTextOptions> = () => {
  return {
    view: ({ attrs: { helperText, dataError, dataSuccess, className } }) => {
      return helperText || dataError || dataSuccess
        ? m(
            'span.helper-text.left',
            { className, 'data-error': dataError, 'data-success': dataSuccess },
            dataError ? m.trust(dataError) : dataSuccess ? m.trust(dataSuccess) : helperText ? m.trust(helperText) : ''
          )
        : undefined;
    },
  };
};
