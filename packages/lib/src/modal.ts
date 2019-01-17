import m, { FactoryComponent, Attributes } from 'mithril';

export interface IMaterialModal extends Attributes {
  id: string;
  title: string;
  description?: string;
  /** Set to true when the description contains HTML */
  richContent?: boolean;
  /** Fixate the footer, so you can show more content. */
  fixedFooter?: boolean;
  /** Display on the bottom */
  bottomSheet?: boolean;
  /** Materialize css' modal options */
  options?: Partial<M.ModalOptions>;
  /** Menu buttons, from left to right */
  buttons?: Array<{ label: string; onclick?: () => void }>;
}

/** Builds a modal panel, which can be triggered using its id */
export const ModalPanel: FactoryComponent<IMaterialModal> = () => ({
  oncreate: ({ dom, attrs: { options } }) => {
    M.Modal.init(dom, options);
  },
  view: ({ attrs: { id, title, description, fixedFooter, bottomSheet, buttons, richContent } }) => {
    const ff = fixedFooter ? '.modal-fixed-footer' : '';
    const bs = bottomSheet ? '.bottom-sheet' : '';
    return m(`.modal${ff}${bs}[id=${id}]`, [
      m('.modal-content', [m('h4', title), richContent ? m.trust(description || '') : m('p', description)]),
      buttons
        ? m(
            '.modal-footer',
            buttons.map(b => m('a.modal-close.waves-effect.waves-green.btn-flat', { onclick: b.onclick }, b.label))
          )
        : undefined,
    ]);
  },
});
