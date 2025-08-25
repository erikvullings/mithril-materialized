import { Timeline, CodeBlock, Switch } from 'mithril-materialized';
import m from 'mithril';

export const TimelinePage = () => {
  const state = {
    position: 'right' as 'left' | 'right' | 'alternate',
    showConnector: true,
    showTimestamps: true,
    compact: false,
  };

  const basicTimelineItems = [
    {
      id: '1',
      label: 'Project Started',
      description: 'Initial planning and setup phase begins',
      timestamp: '2024-01-15',
      icon: 'play_arrow',
      color: 'success' as const,
    },
    {
      id: '2',
      label: 'Design Phase',
      description: 'UI/UX design and prototyping',
      timestamp: '2024-02-01',
      icon: 'design_services',
      color: 'primary' as const,
    },
    {
      id: '3',
      label: 'Development',
      description: 'Core implementation and feature development',
      timestamp: '2024-03-15',
      icon: 'code',
      color: 'info' as const,
    },
    {
      id: '4',
      label: 'Testing',
      description: 'Quality assurance and bug fixes',
      timestamp: '2024-04-20',
      icon: 'bug_report',
      color: 'warning' as const,
    },
    {
      id: '5',
      label: 'Launch',
      description: 'Product release and deployment',
      timestamp: '2024-05-01',
      icon: 'rocket_launch',
      color: 'success' as const,
    },
  ];

  const handleTimelineClick = (item: any, event: Event) => {
    console.log('Timeline item clicked:', item);
    // Could show a modal or navigate to detail page
  };

  return {
    view: () => {
      const customContentItems = [
        {
          id: 'custom-1',
          timestamp: '10:00 AM',
          content: m('.card', [
            m('.card-content', [
              m('span.card-title', 'Meeting with Client'),
              m('p', 'Discussed project requirements and timeline adjustments.'),
            ]),
          ]),
          color: 'primary' as const,
        },
        {
          id: 'custom-2',
          timestamp: '2:30 PM',
          content: m('.card', [
            m('.card-content', [
              m('span.card-title', 'Code Review'),
              m('p', 'Reviewed pull requests and provided feedback to team members.'),
              m('.chip', 'High Priority'),
            ]),
          ]),
          color: 'warning' as const,
        },
        {
          id: 'custom-3',
          timestamp: '4:45 PM',
          content: m('.card', [
            m('.card-content', [
              m('span.card-title', 'Deploy to Production'),
              m('p', 'Successfully deployed version 2.1.0 with new features.'),
              m('.chip.green', 'Completed'),
            ]),
          ]),
          color: 'success' as const,
        },
      ];

      return m('.col.s12', [
        m('h2.header', 'Timeline'),
        m('p', 'Display sequences of events in chronological order with Material Design styling.'),

        // Controls
        m('.row', [
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Show Connector Line',
              checked: state.showConnector,
              onchange: (checked) => (state.showConnector = checked),
            }),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Show Timestamps',
              checked: state.showTimestamps,
              onchange: (checked) => (state.showTimestamps = checked),
            }),
          ]),
          m('.col.s12.m4', [
            m(Switch, {
              label: 'Compact Mode',
              checked: state.compact,
              onchange: (checked) => (state.compact = checked),
            }),
          ]),
        ]),

        // Position controls (vertical only)
        m('.row', [
          m('.col.s12', [
            m('label', 'Content Position:'),
            m('p', [
              m('label', [
                m('input[type=radio][name=position]', {
                  checked: state.position === 'right',
                  onchange: () => (state.position = 'right'),
                }),
                m('span', 'Right'),
              ]),
            ]),
            m('p', [
              m('label', [
                m('input[type=radio][name=position]', {
                  checked: state.position === 'left',
                  onchange: () => (state.position = 'left'),
                }),
                m('span', 'Left'),
              ]),
            ]),
            m('p', [
              m('label', [
                m('input[type=radio][name=position]', {
                  checked: state.position === 'alternate',
                  onchange: () => (state.position = 'alternate'),
                }),
                m('span', 'Alternating'),
              ]),
            ]),
          ]),
        ]),

        // Basic Timeline Example
        m('h3.header', 'Basic Timeline'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: basicTimelineItems,
              position: state.position,
              showConnector: state.showConnector,
              showTimestamps: state.showTimestamps,
              compact: state.compact,
            }),
          ]),
        ]),

        // Simple Timeline Preview
        m('h3.header', 'Simple Timeline (No Card Wrappers)'),
        m('p', 'A minimal timeline without card styling for cleaner presentation.'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: [
                { label: 'Eat', timestamp: '8:00 AM' },
                { label: 'Code', timestamp: '9:00 AM' },
                { label: 'Sleep', timestamp: '11:00 PM' },
                { label: 'Repeat', timestamp: '8:00 AM (next day)' },
              ],
              position: 'alternate',
              showConnector: true,
              showTimestamps: false,
              compact: true,
            }),
          ]),
        ]),

        // Interactive Timeline
        m('h3.header', 'Interactive Timeline'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: basicTimelineItems.map((item) => ({
                ...item,
                onClick: handleTimelineClick,
              })),
              position: state.position,
              showConnector: state.showConnector,
              showTimestamps: state.showTimestamps,
              compact: state.compact,
            }),
          ]),
        ]),

        // Custom Content Timeline
        m('h3.header', 'Timeline with Custom Content'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: customContentItems as any,
              position: 'right',
              showConnector: true,
              showTimestamps: true,
            }),
          ]),
        ]),

        // Color Variations
        m('h3.header', 'Color Variations'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: [
                { label: 'Primary Color', icon: 'star', color: 'primary' },
                { label: 'Secondary Color', icon: 'favorite', color: 'secondary' },
                { label: 'Success Color', icon: 'check_circle', color: 'success' },
                { label: 'Warning Color', icon: 'warning', color: 'warning' },
                { label: 'Error Color', icon: 'error', color: 'error' },
                { label: 'Info Color', icon: 'info', color: 'info' },
              ],
              position: 'alternate',
              showConnector: true,
              showTimestamps: false,
            }),
          ]),
        ]),

        // Icon Timeline Example
        m('h3.header', 'Timeline with Icons'),
        m('.row', [
          m('.col.s12', [
            m(Timeline, {
              items: [
                {
                  id: 'start',
                  label: 'Project Started',
                  description: 'Initial planning and requirements gathering',
                  timestamp: '09:00 AM',
                  icon: 'play_arrow',
                  color: 'success' as const,
                },
                {
                  id: 'design',
                  label: 'Design Phase',
                  description: 'UI/UX design and prototyping',
                  timestamp: '10:30 AM',
                  icon: 'design_services',
                  color: 'info' as const,
                },
                {
                  id: 'develop',
                  label: 'Development',
                  description: 'Core implementation and coding',
                  timestamp: '12:00 PM',
                  icon: 'code',
                  color: 'primary' as const,
                },
                {
                  id: 'test',
                  label: 'Testing',
                  description: 'Quality assurance and bug fixes',
                  timestamp: '03:00 PM',
                  icon: 'bug_report',
                  color: 'warning' as const,
                },
                {
                  id: 'deploy',
                  label: 'Deployment',
                  description: 'Production release and launch',
                  timestamp: '05:00 PM',
                  icon: 'rocket_launch',
                  color: 'success' as const,
                },
              ],
              position: 'alternate',
              showConnector: true,
              showTimestamps: true,
            }),
          ]),
        ]),

        // Code Examples
        m(CodeBlock, {
          code: `// Basic Timeline
m(Timeline, {
  items: [
    {
      label: 'Project Started',
      description: 'Initial planning phase',
      timestamp: '2024-01-15',
      icon: 'play_arrow',
      color: 'success'
    },
    {
      label: 'Development',
      description: 'Core implementation',
      timestamp: '2024-03-15', 
      icon: 'code',
      color: 'primary'
    }
  ],
  position: 'right',
  showConnector: true
})

// Interactive Timeline
m(Timeline, {
  items: timelineItems.map(item => ({
    ...item,
    onClick: (item, event) => {
      console.log('Clicked:', item);
    }
  })),
})

// Custom Content Timeline
m(Timeline, {
  items: [
    {
      timestamp: '10:00 AM',
      content: m('.card', [
        m('.card-content', [
          m('span.card-title', 'Custom Content'),
          m('p', 'Any Mithril vnode can be used as content')
        ])
      ]),
      color: 'primary'
    }
  ]
})`,
        }),
      ]);
    },
  };
};
