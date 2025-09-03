import m from 'mithril';
import { Rating, RatingAttrs, CodeBlock, Switch, Select, TextInput, NumberInput } from 'mithril-materialized';

export const RatingPage = () => {
  // Component state - this will trigger re-renders when modified

  let basicRating = 3;
  let halfStepRating = 2.5;
  let customIconRating = 4;
  let clearableRating = 0;
  let tooltipRating = 3;
  let isreadonly = false;
  let isDisabled = false;
  let selectedSize = 'medium' as 'small' | 'medium' | 'large';
  let selectedDensity = 'standard' as 'compact' | 'standard' | 'comfortable';
  let maxRating = 5;
  let stepSize = 1;

  // Custom tooltip labels
  const qualityLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];
  const difficultyLabels = ['Very Easy', 'Easy', 'Moderate', 'Hard', 'Very Hard'];

  const customHeartIcon = {
    filled: '❤️',
    empty: '🤍',
  };

  const customRadioIcon = {
    filled: '●',
    empty: '○',
  };

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Rating'),
        m('p.caption', 'Interactive rating components for user feedback and evaluation'),

        // Basic Usage
        m('h3.header', 'Basic Usage'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Controlled Rating'),
            m(Rating, {
              value: basicRating,
              onchange: (value: number) => {
                basicRating = value;
                console.log('Basic rating changed:', value);
              },
              'aria-label': 'Overall Rating',
            } as RatingAttrs),
            m('p', `Current rating: ${basicRating} stars`),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Read-only Rating'),
            m(Rating, {
              value: 4.2,
              readonly: true,
              allowHalfSteps: true,
              ariaLabel: 'Product Rating: 4.2 out of 5 stars',
            } as RatingAttrs),
            m('p', 'Average rating: 4.2/5 (read-only)'),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Basic controlled rating
m(Rating, {
  value: basicRating,
  onchange: (value: number) => {
    basicRating = value;
    console.log('Rating changed:', value);
  },
  'aria-label': 'Overall Rating',
})

// Read-only rating with fractional display
m(Rating, {
  value: 4.2,
  readonly: true,
  allowHalfSteps: true,
  'aria-label': 'Product Rating: 4.2 out of 5 stars',
})`,
        }),

        // Half Steps and Fractional Ratings
        m('h3.header', 'Half Steps & Fractional Ratings'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Half-step Rating'),
            m(Rating, {
              value: halfStepRating,
              step: 0.5,
              allowHalfSteps: true,
              onchange: (value: number) => {
                halfStepRating = value;
              },
              'aria-label': 'Rating with half steps',
            } as RatingAttrs),
            m('p', `Rating: ${halfStepRating} stars`),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Clearable Rating'),
            m(Rating, {
              value: clearableRating,
              clearable: true,
              onchange: (value: number) => {
                clearableRating = value;
              },
              'aria-label': 'Clearable Rating',
            } as RatingAttrs),
            m('p', clearableRating === 0 ? 'No rating selected' : `Rating: ${clearableRating} stars`),
            m('small.grey-text', 'Click the same star again to clear'),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Half-step rating
m(Rating, {
  value: rating,
  step: 0.5,
  allowHalfSteps: true,
  onchange: (value: number) => { rating = value; },
})

// Clearable rating
m(Rating, {
  value: rating,
  clearable: true,
  onchange: (value: number) => { rating = value; },
})`,
        }),

        // Custom Icons
        m('h3.header', 'Custom Icons'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Heart Icons'),
            m(Rating, {
              value: customIconRating,
              icon: customHeartIcon,
              onchange: (value: number) => {
                customIconRating = value;
              },
              'aria-label': 'Heart Rating',
            } as RatingAttrs),
            m('p', `Hearts: ${customIconRating}/5`),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Radio Button Icons'),
            m(Rating, {
              defaultValue: 3,
              icon: customRadioIcon,
              readonly: true,
              'aria-label': 'Radio Button Rating: 3 out of 5',
            } as RatingAttrs),
            m('p', 'Radio buttons: 3/5 (read-only)'),
          ]),
        ]),

        m(CodeBlock, {
          code: `const customHeartIcon = {
  filled: '❤️',
  empty: '🤍',
};

const customRadioIcon = {
  filled: '●',
  empty: '○',
};

m(Rating, {
  value: rating,
  icon: customHeartIcon,
  onchange: (value: number) => { rating = value; },
  'aria-label': 'Heart Rating',
})`,
        }),

        // Helper Text and Labels
        m('h3.header', 'Helper Text & Custom Labels'),
        m(
          'p.caption',
          'Tooltips provide descriptive text for each rating value, acting as helper text to explain the meaning of each level'
        ),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Quality Rating with Helper Text'),
            m(Rating, {
              value: tooltipRating,
              showTooltips: true,
              tooltipLabels: qualityLabels,
              onchange: (value: number) => {
                tooltipRating = value;
              },
              getLabelText: (value: number, max: number) =>
                value === 0 ? 'No rating' : `${qualityLabels[value - 1]} (${value}/${max})`,
            } as RatingAttrs),
            m('p', `Quality: ${tooltipRating > 0 ? qualityLabels[tooltipRating - 1] : 'Not rated'}`),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Difficulty Rating'),
            m(Rating, {
              value: 2,
              showTooltips: true,
              tooltipLabels: difficultyLabels,
              readonly: true,
              getLabelText: (value: number) => `Difficulty: ${difficultyLabels[value - 1]}`,
            } as RatingAttrs),
            m('p', 'Difficulty: Easy (read-only)'),
          ]),
        ]),

        m(CodeBlock, {
          code: `const qualityLabels = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

m(Rating, {
  value: rating,
  showTooltips: true,
  tooltipLabels: qualityLabels,
  onchange: (value: number) => { rating = value; },
  getLabelText: (value: number, max: number) => 
    value === 0 ? 'No rating' : \`\${qualityLabels[value - 1]} (\${value}/\${max})\`,
})`,
        }),

        // Size and Density Variants
        m('h3.header', 'Size & Density Variants'),
        m('.row', [
          m('.col.s12.m4', [
            m('h6', 'Small'),
            m(Rating, {
              value: 4,
              size: 'small',
              readonly: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Medium (Default)'),
            m(Rating, {
              value: 4,
              size: 'medium',
              readonly: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Large'),
            m(Rating, {
              value: 4,
              size: 'large',
              readonly: true,
            } as RatingAttrs),
          ]),
        ]),

        m('.row', [
          m('.col.s12.m4', [
            m('h6', 'Compact Density'),
            m(Rating, {
              value: 3,
              density: 'compact',
              readonly: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Standard Density'),
            m(Rating, {
              value: 3,
              density: 'standard',
              readonly: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m4', [
            m('h6', 'Comfortable Density'),
            m(Rating, {
              value: 3,
              density: 'comfortable',
              readonly: true,
            } as RatingAttrs),
          ]),
        ]),

        // Material Design Layout Integration
        m('h3.header', 'Material Design Layout Integration'),
        m('p.caption', 'Rating components align properly with other Material Design form elements'),
        m('.row', [
          m('.col.s12.m6', [
            m(TextInput, {
              label: 'Product Name',
              value: 'Sample Product',
              readonly: true,
            }),
          ]),
          m('.col.s12.m6', [
            m('label.rating-label', 'Product Rating'),
            m(Rating, {
              value: 4,
              onchange: () => {},
              'aria-label': 'Product Rating',
              style: { marginTop: '8px' }, // Align with TextInput baseline
            } as RatingAttrs),
          ]),
        ]),

        m('.row', [
          m('.col.s12.m4', [
            m(NumberInput, {
              label: 'Price ($)',
              value: 29.99,
              min: 0,
              step: 0.01,
              oninput: () => {},
            }),
          ]),
          m('.col.s12.m4', [
            m('label.rating-label', 'Value Rating'),
            m(Rating, {
              value: 3,
              max: 5,
              onchange: () => {},
              'aria-label': 'Value for money rating',
              style: { marginTop: '8px' },
            } as RatingAttrs),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Recommended',
              checked: true,
              onchange: () => {},
            }),
          ]),
        ]),

        // Interactive Configuration
        m('h3.header', 'Interactive Configuration'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Configurable Rating'),
            m(Rating, {
              value: basicRating,
              max: maxRating,
              step: stepSize,
              size: selectedSize,
              density: selectedDensity,
              readonly: isreadonly,
              disabled: isDisabled,
              allowHalfSteps: stepSize === 0.5,
              onchange: (value) => {
                basicRating = value;
              },
            } as RatingAttrs),
            m('p', `Current: ${basicRating}/${maxRating}`),
          ]),
          m('.col.s12.m6', [
            m('.row', [
              m('.col.s6', [
                m(NumberInput, {
                  label: 'Max Rating',
                  min: 3,
                  max: 10,
                  value: maxRating,
                  oninput: (value) => {
                    maxRating = value || 5;
                    if (basicRating > maxRating) basicRating = maxRating;
                  },
                }),
              ]),
              m('.col.s6', [
                m(Select<number>, {
                  label: 'Step Size',
                  checkedId: stepSize,
                  options: [
                    { id: 1, label: '1 (Integer)' },
                    { id: 0.5, label: '0.5 (Half steps)' },
                  ],
                  onchange: (value) => {
                    stepSize = value[0];
                  },
                }),
              ]),
            ]),
            m('.row', [
              m('.col.s6', [
                m(Select<'small' | 'medium' | 'large'>, {
                  label: 'Size',
                  checkedId: selectedSize,
                  options: [
                    { id: 'small', label: 'Small' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'large', label: 'Large' },
                  ],
                  onchange: (value) => {
                    selectedSize = value[0];
                  },
                }),
              ]),
              m('.col.s6', [
                m(Select<'compact' | 'standard' | 'comfortable'>, {
                  label: 'Density',
                  checkedId: selectedDensity,
                  options: [
                    { id: 'compact', label: 'Compact' },
                    { id: 'standard', label: 'Standard' },
                    { id: 'comfortable', label: 'Comfortable' },
                  ],
                  onchange: (value) => {
                    selectedDensity = value[0];
                  },
                }),
              ]),
            ]),
            m('.row', [
              m('.col.s6', [
                m(Switch, {
                  label: 'Read Only',
                  checked: isreadonly,
                  onchange: (checked) => {
                    isreadonly = checked;
                  },
                }),
              ]),
              m('.col.s6', [
                m(Switch, {
                  label: 'Disabled',
                  checked: isDisabled,
                  onchange: (checked) => {
                    isDisabled = checked;
                  },
                }),
              ]),
            ]),
          ]),
        ]),

        // States Demo
        m('h3.header', 'Component States'),
        m('.row', [
          m('.col.s12.m3', [
            m('h6', 'Default'),
            m(Rating, {
              value: 3,
              onchange: () => {},
            } as RatingAttrs),
          ]),
          m('.col.s12.m3', [
            m('h6', 'Read-only'),
            m(Rating, {
              value: 3,
              readonly: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m3', [
            m('h6', 'Disabled'),
            m(Rating, {
              value: 3,
              disabled: true,
            } as RatingAttrs),
          ]),
          m('.col.s12.m3', [
            m('h6', 'No Rating'),
            m(Rating, {
              value: 0,
              onchange: () => {},
            } as RatingAttrs),
          ]),
        ]),

        // Accessibility Demo
        m('h3.header', 'Accessibility Features'),
        m('ul', [
          m('li', 'Full keyboard navigation: Use Tab to focus, Arrow keys to change rating, Enter/Space to confirm'),
          m('li', 'Screen reader support: Announces current rating and changes'),
          m('li', 'ARIA labels: Provides descriptive labels for assistive technologies'),
          m('li', 'Focus indicators: Clear visual feedback when navigating with keyboard'),
          m('li', 'High contrast support: Adapts to user preferences for better visibility'),
        ]),

        m('h5', 'Keyboard Navigation Test'),
        m('p', 'Try using Tab and Arrow keys to navigate these ratings:'),
        m('.row', [
          m('.col.s4', [
            m(Rating, {
              value: 2,
              onchange: () => {},
              'aria-label': 'First rating for keyboard test',
            } as RatingAttrs),
          ]),
          m('.col.s4', [
            m(Rating, {
              value: 4,
              onchange: () => {},
              'aria-label': 'Second rating for keyboard test',
            } as RatingAttrs),
          ]),
          m('.col.s4', [
            m(Rating, {
              value: 1,
              onchange: () => {},
              'aria-label': 'Third rating for keyboard test',
            } as RatingAttrs),
          ]),
        ]),

        // Add custom styles for rating labels
        m(
          'style',
          `
.rating-label {
  display: block;
  font-size: 0.8rem;
  color: #9e9e9e;
  margin-bottom: 4px;
  font-weight: 400;
  transform: translateY(0);
  transform-origin: 0% 50%;
  text-align: initial;
  transform: none;
  left: 0;
  top: 0;
  position: relative;
}
`
        ),

        // API Documentation
        m('h3.header', 'API Documentation'),
        m('h5', 'Properties'),
        m('table.striped', [
          m('thead', [m('tr', [m('th', 'Property'), m('th', 'Type'), m('th', 'Default'), m('th', 'Description')])]),
          m('tbody', [
            m('tr', [
              m('td', 'value'),
              m('td', 'number'),
              m('td', 'undefined'),
              m('td', 'Current rating value (controlled)'),
            ]),
            m('tr', [
              m('td', 'defaultValue'),
              m('td', 'number'),
              m('td', '0'),
              m('td', 'Initial value (uncontrolled)'),
            ]),
            m('tr', [m('td', 'max'), m('td', 'number'), m('td', '5'), m('td', 'Maximum rating value')]),
            m('tr', [m('td', 'step'), m('td', 'number'), m('td', '1'), m('td', 'Step size for increments')]),
            m('tr', [
              m('td', 'readonly'),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Whether rating is read-only'),
            ]),
            m('tr', [m('td', 'disabled'), m('td', 'boolean'), m('td', 'false'), m('td', 'Whether rating is disabled')]),
            m('tr', [
              m('td', 'clearable'),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Whether rating can be cleared'),
            ]),
            m('tr', [
              m('td', 'size'),
              m('td', "'small' | 'medium' | 'large'"),
              m('td', "'medium'"),
              m('td', 'Size variant'),
            ]),
            m('tr', [
              m('td', 'density'),
              m('td', "'compact' | 'standard' | 'comfortable'"),
              m('td', "'standard'"),
              m('td', 'Density/spacing variant'),
            ]),
            m('tr', [
              m('td', 'allowHalfSteps'),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Enable fractional display'),
            ]),
            m('tr', [
              m('td', 'showTooltips'),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Show helper text on hover'),
            ]),
            m('tr', [
              m('td', 'tooltipLabels'),
              m('td', 'string[]'),
              m('td', 'undefined'),
              m('td', 'Custom helper text for each rating value'),
            ]),
            m('tr', [
              m('td', 'icon'),
              m('td', 'RatingIconConfig'),
              m('td', 'star icons'),
              m('td', 'Custom icon configuration'),
            ]),
            m('tr', [
              m('td', 'onchange'),
              m('td', '(value: number) => void'),
              m('td', 'undefined'),
              m('td', 'Callback when rating changes'),
            ]),
            m('tr', [
              m('td', 'onmouseover'),
              m('td', '(value: number) => void'),
              m('td', 'undefined'),
              m('td', 'Callback on hover preview'),
            ]),
            m('tr', [
              m('td', 'getLabelText'),
              m('td', '(value: number, max: number) => string'),
              m('td', 'undefined'),
              m('td', 'Custom accessibility labels'),
            ]),
          ]),
        ]),

        m('h5', 'Events'),
        m('ul', [
          m('li', m('strong', 'onchange'), ' - Triggered when rating value changes'),
          m(
            'li',
            m('strong', 'onmouseover'),
            ' - Triggered when hovering over rating items (preview mode, useful for helper text)'
          ),
        ]),

        m(CodeBlock, {
          code: `// Complete example with all features
m(Rating, {
  value: rating,
  max: 5,
  step: 0.5,
  size: 'large',
  density: 'comfortable',
  clearable: true,
  allowHalfSteps: true,
  showTooltips: true,
  tooltipLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'], // Helper text
  icon: {
    filled: '★',
    empty: '☆',
  },
  onchange: (value: number) => {
    rating = value;
    console.log('Rating changed:', value);
  },
  onmouseover: (value: number) => {
    console.log('Hovering:', value);
  },
  getLabelText: (value: number, max: number) =>
    \`\${value} out of \${max} stars\`,
  'aria-label': 'Product quality rating',
})`,
        }),
      ]),
  };
};
