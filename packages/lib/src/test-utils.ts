import m, { Component, ComponentTypes } from 'mithril';
import { 
  getByRole, 
  getByLabelText, 
  getByText, 
  getByDisplayValue,
  queryByRole, 
  queryByLabelText, 
  queryByText 
} from '@testing-library/dom';

export interface MithrilTestUtils {
  container: HTMLElement;
  getByRole: typeof getByRole;
  getByLabelText: typeof getByLabelText;
  getByText: typeof getByText;
  getByDisplayValue: typeof getByDisplayValue;
  queryByRole: typeof queryByRole;
  queryByLabelText: typeof queryByLabelText;
  queryByText: typeof queryByText;
  rerender: (component: ComponentTypes) => void;
  unmount: () => void;
}

/**
 * Render a Mithril component for testing
 */
export function render<T>(
  component: ComponentTypes<T, any>,
  attrs?: T,
  container?: HTMLElement
): MithrilTestUtils {
  const testContainer = container || document.createElement('div');
  document.body.appendChild(testContainer);
  
  // For FactoryComponent, let Mithril handle the instantiation
  // Just pass the function and let Mithril call it at the right time
  m.render(testContainer, m(component, attrs));
  
  return {
    container: testContainer,
    getByRole: (role, options?) => getByRole(testContainer, role, options),
    getByLabelText: (text, options?) => getByLabelText(testContainer, text, options),
    getByText: (text, options?) => getByText(testContainer, text, options),
    getByDisplayValue: (value, options?) => getByDisplayValue(testContainer, value, options),
    queryByRole: (role, options?) => queryByRole(testContainer, role, options),
    queryByLabelText: (text, options?) => queryByLabelText(testContainer, text, options),
    queryByText: (text, options?) => queryByText(testContainer, text, options),
    rerender: (newComponent: ComponentTypes) => {
      m.render(testContainer, m(newComponent, attrs));
    },
    unmount: () => {
      m.render(testContainer, []);
      if (testContainer.parentNode) {
        testContainer.parentNode.removeChild(testContainer);
      }
    }
  };
}

/**
 * Simulate user events on Mithril components
 */
export const fireEvent = {
  click: (element: HTMLElement) => {
    element.click();
    // Trigger Mithril's auto-redraw
    m.redraw.sync();
  },
  
  change: (element: HTMLInputElement, value: string) => {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    m.redraw.sync();
  },
  
  focus: (element: HTMLElement) => {
    element.focus();
    element.dispatchEvent(new Event('focus', { bubbles: true }));
    m.redraw.sync();
  },
  
  blur: (element: HTMLElement) => {
    element.blur();
    element.dispatchEvent(new Event('blur', { bubbles: true }));
    m.redraw.sync();
  },
  
  keyDown: (element: HTMLElement, key: string, options: KeyboardEventInit = {}) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...options }));
    m.redraw.sync();
  },
  
  keyUp: (element: HTMLElement, key: string, options: KeyboardEventInit = {}) => {
    element.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true, ...options }));
    m.redraw.sync();
  }
};

/**
 * Wait for async operations to complete
 */
export const waitFor = async (callback: () => void | Promise<void>, timeout = 5000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      await callback();
      return;
    } catch (error) {
      // Wait a bit before trying again
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  throw new Error(`waitFor timed out after ${timeout}ms`);
};

/**
 * Clean up after tests
 */
export const cleanup = () => {
  document.body.innerHTML = '';
};