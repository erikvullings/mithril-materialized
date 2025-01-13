import m, { FactoryComponent, Vnode, Attributes } from 'mithril';
import { FlatButton } from './button';

export interface IMaterialModal extends Attributes {
  id: string;
  title: string;
  description?: string | Vnode<any, any>;
  /** Set to true when the description contains HTML */
  richContent?: boolean;
  /** Fixate the footer, so you can show more content. */
  fixedFooter?: boolean;
  /** Display on the bottom */
  bottomSheet?: boolean;
  /** Materialize css' modal options */
  options?: Partial<M.ModalOptions>;
  /** Menu buttons, from left to right */
  buttons?: Array<{ label: string; iconName?: string; disabled?: boolean; onclick?: (e: UIEvent) => void }>;
  /** Get the modal instance, so you can control it programmatically */
  onCreate?: (modal: M.Modal) => void;
}

/** Builds a modal panel, which can be triggered using its id */
export const ModalPanel: FactoryComponent<IMaterialModal> = () => ({
  oncreate: ({ dom, attrs: { options, onCreate } }) => {
    const modal = M.Modal.init(dom, options);
    if (onCreate) {
      onCreate(modal);
    }
  },
  view: ({ attrs: { id, title, description, fixedFooter, bottomSheet, buttons, richContent, className } }) => {
    const cn = [className, fixedFooter ? 'modal-fixed-footer' : '', bottomSheet ? 'bottom-sheet' : '']
      .filter(Boolean)
      .join(' ')
      .trim();
    return m(
      '.modal',
      {
        id,
        className: cn,
      },
      [
        m('.modal-content', [
          m('h4', title),
          richContent && typeof description === 'string'
            ? m.trust(description || '')
            : typeof description === 'string'
            ? m('p', description)
            : description,
        ]),
        buttons
          ? m(
              '.modal-footer',
              buttons.map((props) => m(FlatButton, { ...props, className: 'modal-close' }))
            )
          : undefined,
      ]
    );
  },
});
