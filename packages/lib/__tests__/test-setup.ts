import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('./styles/input.css', () => ({}));
jest.mock('./styles/switch.css', () => ({}));
jest.mock('./styles/codeblock.css', () => ({}));
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
