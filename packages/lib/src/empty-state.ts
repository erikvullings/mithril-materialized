import m, { type Attributes, type Component } from 'mithril';
import { Button, FlatButton, type ButtonAttrs } from './button';
import { Icon } from './icon';

export type EmptyStateAction = ButtonAttrs & {
  label: string;
} & (
    | {
        href: string;
        onclick?: (event: MouseEvent) => void;
      }
    | {
        href?: undefined;
        onclick: (event: MouseEvent) => void;
      }
  );

export interface EmptyStateAttrs extends Attributes {
  title: m.Children;
  /** Semantic level for the title. @default 3 */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  description?: m.Children;
  /** Material Icons font name used when no illustration is supplied. */
  iconName?: string;
  /** Custom illustration or icon slot. */
  illustration?: m.Children;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** Supplemental content rendered below the actions. */
  content?: m.Children;
}

/** Presentational no-data state with optional illustration and actions. */
export const EmptyState: Component<EmptyStateAttrs> = {
  view: ({ attrs }) => {
    const {
      title,
      headingLevel = 3,
      description,
      iconName,
      illustration,
      primaryAction,
      secondaryAction,
      content,
      className,
      ...htmlAttrs
    } = attrs;
    const classes = ['mm-empty-state', className].filter(Boolean).join(' ');
    const titleElement = `h${headingLevel}.mm-empty-state-title`;

    return m('section', { ...htmlAttrs, className: classes }, [
      illustration
        ? m('.mm-empty-state-illustration', { 'aria-hidden': 'true' }, illustration)
        : iconName
          ? m(Icon, {
              iconName,
              className: 'mm-empty-state-icon',
              'aria-hidden': 'true',
            })
          : undefined,
      m(titleElement, title),
      description
        ? m('.mm-empty-state-description', description)
        : undefined,
      primaryAction || secondaryAction
        ? m('.mm-empty-state-actions', [
            primaryAction ? m(Button, primaryAction) : undefined,
            secondaryAction ? m(FlatButton, secondaryAction) : undefined,
          ])
        : undefined,
      content ? m('.mm-empty-state-content', content) : undefined,
    ]);
  },
};
