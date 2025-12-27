import m from 'mithril';
import {
  CircularProgress,
  LinearProgress,
  CircularProgressAttrs,
  LinearProgressAttrs,
  CodeBlock,
  SingleRangeSlider,
} from 'mithril-materialized';

export const ProgressPage = () => {
  // Component state
  let determinateValue = 65;
  let selectedCircularSize = 'medium' as 'small' | 'medium' | 'large';
  let selectedLinearSize = 'medium' as 'small' | 'medium' | 'large';
  let selectedCircularColor = 'teal';
  let selectedLinearColor = 'blue';
  let showCircularLabel = true;
  let showLinearLabel = true;
  let showCircularPercentage = false;
  let showLinearPercentage = true;
  let customCircularLabel = '';
  let customLinearLabel = '';

  // Simulate progress for demo
  let simulatedProgress = 0;
  let isSimulating = false;
  let simulationInterval: number | undefined;

  const startSimulation = () => {
    if (isSimulating) return;
    isSimulating = true;
    simulatedProgress = 0;

    simulationInterval = window.setInterval(() => {
      simulatedProgress += 1;
      if (simulatedProgress >= 100) {
        simulatedProgress = 0;
      }
      m.redraw();
    }, 100);
  };

  const stopSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = undefined;
    }
    isSimulating = false;
    simulatedProgress = 0;
  };

  return {
    onremove: () => {
      stopSimulation();
    },

    view: () =>
      m('.col.s12', [
        m('h2.header', 'Progress'),
        m('p.caption', 'Progress indicators for loading states and task completion'),

        // Indeterminate Progress
        m('h3.header', 'Indeterminate Progress'),
        m('p', 'Use indeterminate mode for loading states with unknown duration.'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular Indeterminate'),
            m(
              '.demo-container',
              { style: { padding: '20px', textAlign: 'center' } },
              m(CircularProgress, {
                mode: 'indeterminate',
                color: 'teal',
              } as CircularProgressAttrs)
            ),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear Indeterminate'),
            m(
              '.demo-container',
              { style: { padding: '20px' } },
              m(LinearProgress, {
                mode: 'indeterminate',
                color: 'teal',
              } as LinearProgressAttrs)
            ),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Circular indeterminate
m(CircularProgress, {
  mode: 'indeterminate',
  color: 'teal',
})

// Linear indeterminate
m(LinearProgress, {
  mode: 'indeterminate',
  color: 'teal',
})`,
        }),

        // Determinate Progress
        m('h3.header', 'Determinate Progress'),
        m('p', 'Use determinate mode to show specific progress values.'),
        m('.row', [
          m('.col.s12', [
            m(SingleRangeSlider, {
              id: 'progress-slider',
              label: 'Progress Value',
              initialValue: determinateValue,
              min: 0,
              max: 100,
              step: 1,
              showValue: true,
              onchange: (value: number) => {
                determinateValue = value;
              },
            }),
          ]),
        ]),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular Determinate'),
            m(
              '.demo-container',
              { style: { padding: '20px', textAlign: 'center' } },
              m(CircularProgress, {
                mode: 'determinate',
                value: determinateValue,
                showPercentage: true,
                color: 'blue',
              } as CircularProgressAttrs)
            ),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear Determinate'),
            m(
              '.demo-container',
              { style: { padding: '20px' } },
              m(LinearProgress, {
                mode: 'determinate',
                value: determinateValue,
                showPercentage: true,
                color: 'blue',
              } as LinearProgressAttrs)
            ),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Circular determinate with percentage
m(CircularProgress, {
  mode: 'determinate',
  value: ${determinateValue},
  showPercentage: true,
  color: 'blue',
})

// Linear determinate with percentage
m(LinearProgress, {
  mode: 'determinate',
  value: ${determinateValue},
  showPercentage: true,
  color: 'blue',
})`,
        }),

        // Size Variants
        m('h3.header', 'Size Variants'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular Sizes'),
            m('.demo-container', { style: { padding: '20px', textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' } }, [
              m(CircularProgress, {
                mode: 'determinate',
                value: 75,
                size: 'small',
                showPercentage: true,
                color: 'purple',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 75,
                size: 'medium',
                showPercentage: true,
                color: 'purple',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 75,
                size: 'large',
                showPercentage: true,
                color: 'purple',
              } as CircularProgressAttrs),
            ]),
            m('p.center-align', 'Small, Medium, Large'),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear Sizes'),
            m('.demo-container', { style: { padding: '20px' } }, [
              m('p', 'Small'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 75,
                size: 'small',
                color: 'purple',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '16px' } }, 'Medium'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 75,
                size: 'medium',
                color: 'purple',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '16px' } }, 'Large'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 75,
                size: 'large',
                color: 'purple',
              } as LinearProgressAttrs),
            ]),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Size variants: 'small' | 'medium' | 'large'
m(CircularProgress, {
  mode: 'determinate',
  value: 75,
  size: 'small', // 36px
  showPercentage: true,
})

m(LinearProgress, {
  mode: 'determinate',
  value: 75,
  size: 'large', // 12px height
})`,
        }),

        // Color Variants
        m('h3.header', 'Color Variants'),
        m('p', 'Use Materialize color classes to customize the appearance.'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular Colors'),
            m('.demo-container', { style: { padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' } }, [
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'red',
                label: 'Red',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'pink',
                label: 'Pink',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'purple',
                label: 'Purple',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'blue',
                label: 'Blue',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'teal',
                label: 'Teal',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'green',
                label: 'Green',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 80,
                color: 'orange',
                label: 'Orange',
              } as CircularProgressAttrs),
            ]),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear Colors'),
            m('.demo-container', { style: { padding: '20px' } }, [
              m('p', 'Red'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 80,
                color: 'red',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '12px' } }, 'Blue'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 80,
                color: 'blue',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '12px' } }, 'Teal'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 80,
                color: 'teal',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '12px' } }, 'Green'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 80,
                color: 'green',
              } as LinearProgressAttrs),
              m('p', { style: { marginTop: '12px' } }, 'Orange'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 80,
                color: 'orange',
              } as LinearProgressAttrs),
            ]),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Available colors: red, pink, purple, deep-purple, indigo, blue,
// light-blue, cyan, teal, green, light-green, lime, yellow,
// amber, orange, deep-orange, brown, grey, blue-grey

m(CircularProgress, {
  mode: 'determinate',
  value: 80,
  color: 'purple',
})`,
        }),

        // Labels
        m('h3.header', 'Labels'),
        m('p', 'Add labels to provide context. Circular labels appear inside the circle, linear labels appear at the end.'),
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular with Labels'),
            m('.demo-container', { style: { padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' } }, [
              m(CircularProgress, {
                mode: 'determinate',
                value: 60,
                showPercentage: true,
                color: 'cyan',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'determinate',
                value: 85,
                label: 'Done',
                color: 'green',
              } as CircularProgressAttrs),
              m(CircularProgress, {
                mode: 'indeterminate',
                label: '...',
                color: 'amber',
              } as CircularProgressAttrs),
            ]),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear with Labels'),
            m('.demo-container', { style: { padding: '20px' } }, [
              m(LinearProgress, {
                mode: 'determinate',
                value: 60,
                showPercentage: true,
                color: 'cyan',
              } as LinearProgressAttrs),
              m('br'),
              m(LinearProgress, {
                mode: 'determinate',
                value: 85,
                label: 'Complete',
                color: 'green',
              } as LinearProgressAttrs),
              m('br'),
              m(LinearProgress, {
                mode: 'indeterminate',
                label: 'Loading...',
                color: 'amber',
              } as LinearProgressAttrs),
            ]),
          ]),
        ]),

        m(CodeBlock, {
          code: `// Auto percentage label
m(CircularProgress, {
  mode: 'determinate',
  value: 60,
  showPercentage: true,
})

// Custom label
m(LinearProgress, {
  mode: 'determinate',
  value: 85,
  label: 'Complete',
})`,
        }),

        // Interactive Demo
        m('h3.header', 'Interactive Demo'),
        m('p', 'Try the interactive progress simulation:'),
        m('.row', [
          m('.col.s12', [
            m('button.btn.waves-effect.waves-light', {
              onclick: isSimulating ? stopSimulation : startSimulation,
            }, isSimulating ? 'Stop Simulation' : 'Start Simulation'),
          ]),
        ]),
        isSimulating && m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Circular'),
            m(
              '.demo-container',
              { style: { padding: '20px', textAlign: 'center' } },
              m(CircularProgress, {
                mode: 'determinate',
                value: simulatedProgress,
                showPercentage: true,
                color: 'deep-purple',
              } as CircularProgressAttrs)
            ),
          ]),
          m('.col.s12.m6', [
            m('h5', 'Linear'),
            m(
              '.demo-container',
              { style: { padding: '20px' } },
              m(LinearProgress, {
                mode: 'determinate',
                value: simulatedProgress,
                showPercentage: true,
                color: 'deep-purple',
              } as LinearProgressAttrs)
            ),
          ]),
        ]),

        // API Reference
        m('h3.header', 'API Reference'),
        m('h5', 'CircularProgress Attributes'),
        m('table.striped.responsive-table', [
          m('thead', [
            m('tr', [
              m('th', 'Attribute'),
              m('th', 'Type'),
              m('th', 'Default'),
              m('th', 'Description'),
            ]),
          ]),
          m('tbody', [
            m('tr', [
              m('td', m('code', 'mode')),
              m('td', "'determinate' | 'indeterminate'"),
              m('td', "'indeterminate'"),
              m('td', 'Progress mode'),
            ]),
            m('tr', [
              m('td', m('code', 'value')),
              m('td', 'number'),
              m('td', '0'),
              m('td', 'Progress value (0-100) for determinate mode'),
            ]),
            m('tr', [
              m('td', m('code', 'size')),
              m('td', "'small' | 'medium' | 'large'"),
              m('td', "'medium'"),
              m('td', 'Size variant (36px, 50px, 64px)'),
            ]),
            m('tr', [
              m('td', m('code', 'color')),
              m('td', 'MaterialColor'),
              m('td', "'teal'"),
              m('td', 'Materialize color class'),
            ]),
            m('tr', [
              m('td', m('code', 'label')),
              m('td', 'string | number'),
              m('td', 'undefined'),
              m('td', 'Label to display inside the circle'),
            ]),
            m('tr', [
              m('td', m('code', 'showPercentage')),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Auto-show percentage inside circle'),
            ]),
          ]),
        ]),

        m('h5', { style: { marginTop: '40px' } }, 'LinearProgress Attributes'),
        m('table.striped.responsive-table', [
          m('thead', [
            m('tr', [
              m('th', 'Attribute'),
              m('th', 'Type'),
              m('th', 'Default'),
              m('th', 'Description'),
            ]),
          ]),
          m('tbody', [
            m('tr', [
              m('td', m('code', 'mode')),
              m('td', "'determinate' | 'indeterminate'"),
              m('td', "'indeterminate'"),
              m('td', 'Progress mode'),
            ]),
            m('tr', [
              m('td', m('code', 'value')),
              m('td', 'number'),
              m('td', '0'),
              m('td', 'Progress value (0-100) for determinate mode'),
            ]),
            m('tr', [
              m('td', m('code', 'size')),
              m('td', "'small' | 'medium' | 'large'"),
              m('td', "'medium'"),
              m('td', 'Height variant (4px, 8px, 12px)'),
            ]),
            m('tr', [
              m('td', m('code', 'color')),
              m('td', 'MaterialColor'),
              m('td', "'teal'"),
              m('td', 'Materialize color class'),
            ]),
            m('tr', [
              m('td', m('code', 'label')),
              m('td', 'string | number'),
              m('td', 'undefined'),
              m('td', 'Label to display at the end (right side)'),
            ]),
            m('tr', [
              m('td', m('code', 'showPercentage')),
              m('td', 'boolean'),
              m('td', 'false'),
              m('td', 'Auto-show percentage at the end'),
            ]),
          ]),
        ]),
      ]),
  };
};
