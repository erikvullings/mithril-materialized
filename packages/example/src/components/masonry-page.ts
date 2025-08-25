import { Masonry, CodeBlock, Switch, RangeInput } from 'mithril-materialized';
import m from 'mithril';

export const MasonryPage = () => {
  const state = {
    columns: 3,
    spacing: 16,
    cssOnly: false,
    animationDelay: 100,
    showAnimation: true,
  };

  const generateCardContent = (index: number, height?: number) => {
    const heights = height ? [height] : [200, 250, 180, 300, 220, 160, 280, 190, 240, 210];
    const colors = [
      '#ffcdd2',
      '#f8bbd9',
      '#e1bee7',
      '#d1c4e9',
      '#c5cae9',
      '#bbdefb',
      '#b3e5fc',
      '#b2ebf2',
      '#b2dfdb',
      '#c8e6c9',
    ];
    const cardHeight = heights[index % heights.length];
    const cardColor = colors[index % colors.length];

    return m(
      '.card',
      {
        style: {
          height: `${cardHeight}px`,
          backgroundColor: cardColor,
          margin: 0,
        },
      },
      [
        m('.card-content', [
          m('span.card-title', `Card ${index + 1}`),
          m(
            'p',
            `This is card content ${
              index + 1
            }. Cards can have varying heights to create an interesting masonry layout. This card has a height of ${cardHeight}px.`
          ),
        ]),
      ]
    );
  };

  const generateImageContent = (index: number) => {
    const widths = [300, 400, 350, 320, 380, 290, 360, 340, 310, 330];
    const heights = [200, 300, 250, 180, 220, 160, 280, 190, 240, 210];
    const width = widths[index % widths.length];
    const height = heights[index % heights.length];

    return m('.card', { style: { margin: 0 } }, [
      m('img.card-image', {
        src: `https://picsum.photos/${width}/${height}?random=${index}`,
        alt: `Random image ${index + 1}`,
        style: { width: '100%', height: 'auto' },
      }),
      m('.card-content', [m('p', `Image ${index + 1} (${width}×${height})`)]),
    ]);
  };

  const handleItemClick = (index: number, event: Event) => {
    console.log(`Clicked masonry item ${index + 1}`, event);
  };

  // Generate different types of content
  const cardItems = Array.from({ length: 20 }, (_, i) => generateCardContent(i));
  const imageItems = Array.from({ length: 15 }, (_, i) => generateImageContent(i));
  const mixedItems = Array.from({ length: 12 }, (_, i) =>
    i % 3 === 0 ? generateImageContent(i) : generateCardContent(i)
  );

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Masonry'),
        m('p', 'Pinterest-style layout that arranges items in columns with optimal positioning to minimize gaps.'),

        // Controls
        m('.row', [
          m('.col.s12.m6', [
            m(RangeInput as any, {
              label: 'Columns',
              min: 1,
              max: 6,
              initialValue: state.columns,
              showValue: true,
              onchange: (value: number) => {
                state.columns = value;
              },
            }),
          ]),
          m('.col.s12.m6', [
            m(RangeInput as any, {
              label: 'Spacing (px)',
              min: 4,
              max: 32,
              step: 4,
              initialValue: state.spacing,
              showValue: true,
              onchange: (value: number) => {
                state.spacing = value;
              },
            }),
          ]),
        ]),

        m('.row', [
          m('.col.s12.m4', [
            m(Switch, {
              label: 'CSS-Only Mode',
              checked: state.cssOnly,
              onchange: (checked) => (state.cssOnly = checked),
            }),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Enable Animation',
              checked: state.showAnimation,
              onchange: (checked) => (state.showAnimation = checked),
            }),
          ]),
          m('.col.s12.m4', [
            m('label', 'Animation Delay (ms):'),
            m('input[type=number]', {
              min: 0,
              max: 500,
              step: 50,
              value: state.animationDelay,
              disabled: !state.showAnimation,
              oninput: (e: InputEvent) => (state.animationDelay = parseInt((e.target as HTMLInputElement).value)),
            }),
          ]),
        ]),

        // Basic Masonry with Cards
        m('h3.header', 'Basic Masonry - Cards'),
        m('.row', [
          m('.col.s12', [
            m(
              Masonry,
              {
                // children: cardItems,
                columns: state.columns,
                spacing: state.spacing,
                cssOnly: state.cssOnly,
                animationDelay: state.showAnimation ? state.animationDelay : undefined,
                onItemClick: handleItemClick,
              },
              cardItems
            ),
          ]),
        ]),

        // Responsive Masonry
        m('h3.header', 'Responsive Masonry - Images'),
        m('p', 'This masonry layout uses responsive breakpoints for column counts.'),
        m('.row', [
          m('.col.s12', [
            m(
              Masonry,
              {
                columns: {
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
                },
                spacing: state.spacing,
                cssOnly: state.cssOnly,
                animationDelay: state.showAnimation ? state.animationDelay : undefined,
              },
              imageItems
            ),
          ]),
        ]),

        // Mixed Content Masonry
        m('h3.header', 'Mixed Content Masonry'),
        m('p', 'Masonry can handle mixed content types with varying heights.'),
        m('.row', [
          m('.col.s12', [
            m(
              Masonry,
              {
                columns: 3,
                spacing: 12,
                cssOnly: state.cssOnly,
                animationDelay: state.showAnimation ? 80 : undefined,
                onItemClick: (index) => {
                  console.log(`Mixed content item ${index} clicked`);
                },
              },
              mixedItems
            ),
          ]),
        ]),

        // Equal Height Demo
        m('h3.header', 'Equal Height Items'),
        m('p', 'When items have equal heights, masonry creates a regular grid.'),
        m('.row', [
          m('.col.s12', [
            m(Masonry, {
              children: Array.from({ length: 12 }, (_, i) => generateCardContent(i, 200)),
              columns: 4,
              spacing: 16,
              cssOnly: state.cssOnly,
            }),
          ]),
        ]),

        // Code Examples
        m(CodeBlock, {
          code: `// Basic Masonry
m(Masonry, {
  columns: 3,
  spacing: 16
}, [
    m('.card', 'Card 1'),
    m('.card', 'Card 2'),
    m('.card', 'Card 3')
  ],
)

// Responsive Masonry
m(Masonry, {
  columns: {
    xs: 1,  // 1 column on extra small screens
    sm: 2,  // 2 columns on small screens  
    md: 3,  // 3 columns on medium screens
    lg: 4,  // 4 columns on large screens
    xl: 5   // 5 columns on extra large screens
  },
  spacing: 20
}, cardItems)

// Interactive Masonry with Animation
m(Masonry, {
  columns: 3,
  spacing: 16,
  animationDelay: 100,  // 100ms delay between items
  onItemClick: (index, event) => {
    console.log(\`Clicked item \${index}\`);
  }
}, items)

// CSS-Only Masonry (fallback mode)
m(Masonry, {
  columns: 4,
  spacing: 12,
  cssOnly: true  // Uses CSS Grid instead of JavaScript positioning
}, items)`,
        }),

        // Performance Notes
        m('.card.blue-grey.lighten-5', [
          m('.card-content', [
            m('span.card-title', 'Performance Notes'),
            m('ul', [
              m('li', 'JavaScript mode provides optimal positioning but requires more computation'),
              m('li', 'CSS-only mode is more performant but may have larger gaps between items'),
              m('li', 'ResizeObserver automatically recalculates layout when items change size'),
              m('li', 'Animation delays create a staggered entrance effect for visual appeal'),
              m('li', 'Large numbers of items (>100) may benefit from virtualization'),
            ]),
          ]),
        ]),
      ]),
  };
};
