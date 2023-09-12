import m, { FactoryComponent, Component, Attributes } from 'mithril';
import './styles/input.css';

export const Mandatory: Component = { view: ({ attrs }) => m('span.mandatory', attrs, '*') };

export interface IMaterialLabel extends Attributes {
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
export const Label: FactoryComponent<IMaterialLabel> = () => {
  return {
    view: ({ attrs: { label, id, isMandatory, isActive, ...params } }) =>
      label
        ? m(`label${isActive ? '.active' : ''}${id ? `[for=${id}]` : ''}`, params, [
            m.trust(label),
            isMandatory ? m(Mandatory) : undefined,
          ])
        : undefined,
  };
};

export interface IHelperTextOptions extends Attributes {
  helperText?: string;
  dataError?: string;
  dataSuccess?: string;
}

/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
export const HelperText: FactoryComponent<IHelperTextOptions> = () => {
  return {
    view: ({ attrs: { helperText, dataError, dataSuccess } }) => {
      return helperText || dataError || dataSuccess
        ? m('span.helper-text', { dataError, dataSuccess }, helperText ? m.trust(helperText) : '')
        : undefined;
    },
  };
};
