import m, { FactoryComponent, Attributes, Vnode } from 'mithril';
import { Icon } from './icon';
import { WavesEffect } from './waves';

/**
 * Attributes for the ToggleButton component.
 *
 * A toggle button is a button that can be in a checked or unchecked state.
 * It is typically used within a ToggleGroup to create button groups where
 * one or more buttons can be selected.
 */
export interface ToggleButtonAttrs extends Attributes {
  /** The value of the button. This is returned when the button is selected. */
  value: string | number;
  /** The label text to display next to the icon. */
  label?: string;
  /** The name of the Material Design icon to display. */
  iconName?: string;
  /** A custom SVG icon vnode to display instead of a Material icon. */
  icon?: Vnode<any, any>;
  /** Additional CSS class for the icon element. */
  iconClass?: string;
  /** Whether the button is in a checked/selected state. */
  checked?: boolean;
  /** Whether the button is disabled and cannot be interacted with. */
  disabled?: boolean;
  /** Optional tooltip text to display on hover. */
  tooltip?: string;
  /** Callback function invoked when the button is clicked. */
  onchange?: () => void;
}

/**
 * ToggleButton component.
 *
 * A button that can be toggled on/off. Typically used within a ToggleGroup
 * to create grouped button controls where one or more buttons can be selected.
 *
 * @example
 * ```typescript
 * m(ToggleButton, {
 *   value: 'bold',
 *   iconName: 'format_bold',
 *   checked: true,
 *   tooltip: 'Bold',
 *   onchange: () => console.log('Toggled')
 * })
 * ```
 */
export const ToggleButton: FactoryComponent<ToggleButtonAttrs> = () => {
  return {
    view: ({ attrs }) => {
      const { checked, iconName, icon, label, onchange, className, tooltip, ...rest } = attrs;
      const classes = [className, checked ? 'checked' : ''].filter(Boolean).join(' ');
      return m(
        'button.btn-flat.waves-effect.toggle-button',
        {
          ...rest,
          className: classes,
          title: tooltip,
          onclick: () => {
            if (onchange) {
              onchange();
            }
          },
          onmousedown: WavesEffect.onMouseDown,
          onmouseup: WavesEffect.onMouseUp,
          onmouseleave: WavesEffect.onMouseLeave,
          ontouchstart: WavesEffect.onTouchStart,
          ontouchend: WavesEffect.onTouchEnd,
        },
        [icon, iconName && m(Icon, { iconName, className: attrs.iconClass }), label]
      );
    },
  };
};
