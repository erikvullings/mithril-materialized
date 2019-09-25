import m, { FactoryComponent } from 'mithril';

export interface IFloatingActionButton extends Partial<M.FloatingActionButtonOptions> {
  /** Optional classes to add to the top element */
  className?: string;
  /** Optional style to add to the top element, e.g. for positioning it inline */
  style?: string;
  /** Material-icons name for the main FAB, @see https://materializecss.com/icons.html */
  iconName: string;
  /** Helper option to place the FAB inline instead of the bottom right of the display */
  position?: 'left' | 'right' | 'inline-left' | 'inline-right';
  /**
   * Optional icon class, e.g. tiny (1em), small (2em), medium (4em), large (6em), or 'tiny right'.
   * @default large
   */
  iconClass?: string;
  /** The buttons you want to show */
  buttons?: Array<{
    /** Optional classes you want to add to the main element */
    className?: string;
    /** Name of the icon */
    iconName: string;
    /** Classes of the icon */
    iconClass?: string;
    /** On click function */
    onClick?: (e: UIEvent) => void;
  }>;
}

/**
 * A Floating Action Button.
 *
 * @example FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
 */
export const FloatingActionButton: FactoryComponent<IFloatingActionButton> = () => {
  return {
    view: ({
      attrs: {
        className,
        iconName,
        iconClass = 'large',
        position,
        style = position === 'left' || position === 'inline-left'
          ? 'position: absolute; display: inline-block; left: 24px;'
          : position === 'right' || position === 'inline-right'
          ? 'position: absolute; display: inline-block; right: 24px;'
          : undefined,
        buttons,
        ...options
      },
    }) => {
      const fab = m(
        '.fixed-action-btn',
        {
          style,
          oncreate: ({ dom }) => M.FloatingActionButton.init(dom, options),
        },
        [
          m('a.btn-floating.btn-large', { className }, m('i.material-icons', { classNames: iconClass }, iconName)),
          buttons
            ? m(
                'ul',
                buttons.map(b =>
                  m(
                    'li',
                    m(
                      'a.btn-floating',
                      { className: b.className, onclick: (e: UIEvent) => b.onClick && b.onClick(e) },
                      m('i.material-icons', { className: b.iconClass }, b.iconName)
                    )
                  )
                )
              )
            : undefined,
        ]
      );
      return position === 'inline-right' || position === 'inline-left'
        ? m('div', { style: 'position: relative; height: 70px;' }, fab)
        : fab;
    },
  };
};
