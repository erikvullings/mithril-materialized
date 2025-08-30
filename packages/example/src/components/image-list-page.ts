import { ImageList, CodeBlock, Switch, Select, RangeInput } from 'mithril-materialized';
import m from 'mithril';

export const ImageListPage = () => {
  const state = {
    variant: 'standard' as 'standard' | 'quilted' | 'masonry' | 'woven',
    columns: 3,
    gap: 4,
    showTitles: true,
    showActions: true,
    loading: 'lazy' as 'lazy' | 'eager',
  };

  // Generate sample image data
  const generateImageItems = (count: number, withVariedSizes = false) => {
    return Array.from({ length: count }, (_, i) => {
      const width = 400;
      const height = withVariedSizes ? [200, 300, 250, 180, 350, 220, 280][i % 7] : 300;

      return {
        src: `https://picsum.photos/${width}/${height}?random=${i + 1}`,
        alt: `Sample image ${i + 1}`,
        title: `Image ${i + 1}`,
        subtitle: `${width}×${height} pixels`,
        cols: withVariedSizes && state.variant === 'quilted' ? [1, 2, 1, 1, 2, 1, 1][i % 7] : 1,
        rows: withVariedSizes && state.variant === 'quilted' ? [1, 2, 1, 2, 1, 1, 2][i % 7] : 1,
        featured: withVariedSizes && i % 7 === 1,
        onclick: (item: any) => {
          console.log('Image clicked:', item.title);
        },
        actionButton: {
          icon: 'favorite',
          position: 'top-right' as const,
          onclick: (item: any) => {
            console.log('Favorited:', item.title);
          },
          ariaLabel: `Add Image ${i + 1} to favorites`,
        },
      };
    });
  };

  const standardImages = generateImageItems(20);
  const quiltedImages = generateImageItems(15, true);
  const masonryImages = generateImageItems(25, true);

  const handleImageClick = (item: any, event: Event) => {
    console.log('Image clicked:', item);
    // Could open a modal or lightbox here
  };

  const handleActionClick = (item: any, event: Event) => {
    console.log('Action clicked for:', item.title);
    // Could toggle favorite state, download, share, etc.
  };

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'ImageList'),
        m('p', 'Display collections of images in various grid layouts with Material Design styling.'),

        // Controls
        m('.row', [
          m('.col.s12.m6', [
            m(Select, {
              label: 'Layout Variant',
              options: [
                { id: 'standard', label: 'Standard Grid' },
                { id: 'quilted', label: 'Quilted (Varied Sizes)' },
                { id: 'masonry', label: 'Masonry (Pinterest-style)' },
                { id: 'woven', label: 'Woven Pattern' },
              ],
              value: state.variant,
              onchange: (value) => {
                state.variant = value[0] as 'standard' | 'quilted' | 'masonry' | 'woven';
              },
            }),
          ]),
          m('.col.s12.m6', [
            m(RangeInput, {
              label: 'Columns',
              min: 1,
              max: 6,
              value: state.columns,
              showValue: true,
              onchange: (value: number) => {
                state.columns = value;
              },
            }),
          ]),
        ]),

        m('.row', [
          m('.col.s12.m4', [
            m(RangeInput, {
              label: 'Gap (px)',
              min: 0,
              max: 20,
              value: state.gap,
              showValue: true,
              onchange: (value: number) => {
                state.gap = value;
              },
            }),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Show Titles',
              checked: state.showTitles,
              onchange: (checked) => (state.showTitles = checked),
            }),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Show Actions',
              checked: state.showActions,
              onchange: (checked) => (state.showActions = checked),
            }),
          ]),
        ]),

        // Standard Grid Layout
        m('h3.header', 'Standard Grid'),
        m('p', 'Regular grid layout with equal-sized items.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: standardImages.slice(0, 12),
              variant: state.variant,
              cols: state.columns,
              gap: state.gap,
              showTitles: state.showTitles,
              showActions: state.showActions,
              loading: state.loading,
              // rowHeight: 200,
            }),
          ]),
        ]),

        // Quilted Layout
        m('h3.header', 'Quilted Layout'),
        m('p', 'Grid with varied item sizes for featured content.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: quiltedImages,
              variant: 'quilted',
              cols: 4,
              gap: state.gap,
              showTitles: state.showTitles,
              showActions: state.showActions,
              rowHeight: 150,
            }),
          ]),
        ]),

        // Masonry Layout
        m('h3.header', 'Masonry Layout'),
        m('p', 'Pinterest-style layout with optimal positioning.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: masonryImages,
              variant: 'masonry',
              cols: state.columns,
              gap: state.gap,
              showTitles: state.showTitles,
              showActions: state.showActions,
              loading: state.loading,
            }),
          ]),
        ]),

        // Woven Layout
        m('h3.header', 'Woven Layout'),
        m('p', 'Alternating pattern layout with dynamic heights.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: standardImages.slice(0, 16).map((item, i) => ({
                ...item,
                rows: i % 3 === 0 ? 2 : 1,
              })),
              variant: 'woven',
              cols: 4,
              gap: state.gap,
              showTitles: state.showTitles,
              showActions: state.showActions,
              rowHeight: 120,
            }),
          ]),
        ]),

        // Responsive Layout
        m('h3.header', 'Responsive Layout'),
        m('p', 'Automatically adjusts columns based on screen size.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: standardImages.slice(0, 20),
              variant: 'standard',
              cols: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
              },
              gap: 8,
              showTitles: true,
              showActions: true,
              rowHeight: 180,
            }),
          ]),
        ]),

        // Action Positions Demo
        m('h3.header', 'Action Button Positions'),
        m('p', 'Demonstration of different action button positions.'),
        m('.row', [
          m('.col.s12', [
            m(ImageList, {
              items: [
                {
                  ...standardImages[0],
                  title: 'Top Left Action',
                  actionButton: {
                    icon: 'favorite',
                    position: 'top-left',
                    onclick: handleActionClick,
                    ariaLabel: 'Favorite',
                  },
                },
                {
                  ...standardImages[1],
                  title: 'Top Right Action',
                  actionButton: {
                    icon: 'share',
                    position: 'top-right',
                    onclick: handleActionClick,
                    ariaLabel: 'Share',
                  },
                },
                {
                  ...standardImages[2],
                  title: 'Bottom Left Action',
                  actionButton: {
                    icon: 'download',
                    position: 'bottom-left',
                    onclick: handleActionClick,
                    ariaLabel: 'Download',
                  },
                },
                {
                  ...standardImages[3],
                  title: 'Bottom Right Action',
                  actionButton: {
                    icon: 'more_vert',
                    position: 'bottom-right',
                    onclick: handleActionClick,
                    ariaLabel: 'More options',
                  },
                },
              ],
              variant: 'standard',
              cols: 4,
              gap: 8,
              showTitles: true,
              showActions: true,
              rowHeight: 200,
            }),
          ]),
        ]),

        // Code Examples
        m(CodeBlock, {
          code: `// Standard ImageList
m(ImageList, {
  items: [
    {
      src: 'image1.jpg',
      alt: 'Description',
      title: 'Image Title',
      subtitle: 'Image subtitle',
      onclick: (item) => console.log('Clicked:', item)
    }
  ],
  variant: 'standard',
  cols: 3,
  gap: 4,
  rowHeight: 200
})

// Quilted Layout with Featured Items
m(ImageList, {
  items: [
    {
      src: 'featured.jpg',
      title: 'Featured Image',
      cols: 2,  // Spans 2 columns
      rows: 2,  // Spans 2 rows
      featured: true
    },
    // ... more items
  ],
  variant: 'quilted',
  cols: 4,
  rowHeight: 150
})

// Responsive ImageList
m(ImageList, {
  items: imageItems,
  variant: 'masonry',
  cols: {
    xs: 1,   // 1 column on mobile
    sm: 2,   // 2 columns on small tablets
    md: 3,   // 3 columns on tablets  
    lg: 4,   // 4 columns on desktop
    xl: 5    // 5 columns on large screens
  },
  gap: 8,
  showTitles: true,
  showActions: true
})

// With Action Buttons
m(ImageList, {
  items: images.map(img => ({
    ...img,
    actionButton: {
      icon: 'favorite',
      position: 'top-right',
      onclick: (item) => toggleFavorite(item),
      ariaLabel: 'Add to favorites'
    }
  })),
  showActions: true
})`,
        }),

        // Feature Comparison Table
        m('.card.blue-grey.lighten-5', [
          m('.card-content', [
            m('span.card-title', 'Layout Variants Comparison'),
            m('table.striped', [
              m('thead', [
                m('tr', [m('th', 'Variant'), m('th', 'Use Case'), m('th', 'Features'), m('th', 'Performance')]),
              ]),
              m('tbody', [
                m('tr', [
                  m('td', 'Standard'),
                  m('td', 'Regular photo galleries'),
                  m('td', 'Equal sizes, predictable grid'),
                  m('td', 'Excellent'),
                ]),
                m('tr', [
                  m('td', 'Quilted'),
                  m('td', 'Featured content, magazines'),
                  m('td', 'Varied sizes, featured items'),
                  m('td', 'Good'),
                ]),
                m('tr', [
                  m('td', 'Masonry'),
                  m('td', 'Pinterest-style feeds'),
                  m('td', 'Optimal spacing, no gaps'),
                  m('td', 'Moderate'),
                ]),
                m('tr', [
                  m('td', 'Woven'),
                  m('td', 'Artistic layouts'),
                  m('td', 'Pattern-based arrangement'),
                  m('td', 'Good'),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
  };
};
