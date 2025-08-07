import '@testing-library/jest-dom';

// // Mock Materialize CSS global object for tests that still use it
// global.M = {
//   AutoInit: jest.fn(),
//   Autocomplete: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Carousel: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   CharacterCounter: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Collapsible: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Datepicker: {
//     init: jest.fn(() => ({
//       date: new Date(),
//       destroy: jest.fn()
//     })),
//     getInstance: jest.fn()
//   },
//   Dropdown: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   FloatingActionButton: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   FormSelect: {
//     init: jest.fn(() => ({
//       getSelectedValues: jest.fn(() => [])
//     })),
//     getInstance: jest.fn()
//   },
//   Materialbox: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Modal: {
//     init: jest.fn(() => ({
//       open: jest.fn(),
//       close: jest.fn(),
//       destroy: jest.fn()
//     })),
//     getInstance: jest.fn()
//   },
//   Parallax: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Range: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Tabs: {
//     init: jest.fn(),
//     getInstance: jest.fn()
//   },
//   Timepicker: {
//     init: jest.fn(() => ({
//       time: '12:00',
//       destroy: jest.fn()
//     })),
//     getInstance: jest.fn()
//   },
//   textareaAutoResize: jest.fn()
// } as any;

// Mock CSS imports
jest.mock('./styles/input.css', () => ({}));
jest.mock('./styles/switch.css', () => ({}));
jest.mock('./styles/codeblock.css', () => ({}));
jest.mock('./styles/map-editor.css', () => ({}));
jest.mock('./styles/timeline.css', () => ({}));

// Add custom matchers if needed
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && document.body.contains(received);
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});
