import m, { Component, Attributes } from 'mithril';
import { uniqueId, toAttributeString,  } from './utils';

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
export const Label = (): Component<IMaterialLabel> => {
  const isLabelActive = (s?: string | boolean) => (s ? '.active' : '');

  return {
    view: ({ attrs }) => {
      const { label, id, isMandatory, isActive } = attrs;
      return label
        ? m(`label${isLabelActive(isActive)}[for=${id || uniqueId()}]`, attrs, [
            m.trust(label),
            isMandatory ? m(Mandatory) : undefined,
          ])
        : undefined;
    },
  };
};

/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
export const HelperText = (): Component<{ helperText?: string; dataError?: string; dataSuccess?: string }> => {
  return {
    view: ({ attrs: { helperText, dataError, dataSuccess } }) => {
      const a = dataError || dataSuccess ? toAttributeString({ dataError, dataSuccess }) : '';
      return helperText || a ? m(`span.helper-text${a}`, helperText ? m.trust(helperText) : '') : undefined;
    },
  };
};
