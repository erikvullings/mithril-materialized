import m from 'mithril';
import { cleanup } from './test-utils';
import {
  renderFieldChrome,
  resolveControllableValue,
  syncPortalContent,
} from '../src/utils';

describe('Primitive helpers', () => {
  afterEach(cleanup);

  it('resolves controlled and uncontrolled values with the expected precedence', () => {
    expect(
      resolveControllableValue({
        controlled: true,
        controlledValue: ['a'],
        defaultValue: ['b'],
        internalValue: ['c'],
        fallbackValue: [],
      })
    ).toEqual(['a']);

    expect(
      resolveControllableValue({
        controlled: false,
        defaultValue: ['b'],
        internalValue: ['c'],
        fallbackValue: [],
      })
    ).toEqual(['c']);
  });

  it('renders form field chrome with label, helper text, and validation messages', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    m.render(
      container,
      renderFieldChrome({
        label: 'Field label',
        id: 'field-id',
        isMandatory: true,
        isActive: true,
        initialValue: true,
        helperText: 'Helper text',
        dataError: 'Error text',
        dataSuccess: 'Success text',
      })
    );

    expect(container.querySelector('label[for="field-id"]')).toHaveTextContent('Field label');
    expect(container.querySelector('span.mandatory')).toBeInTheDocument();
    expect(container.querySelector('.helper-text')).toHaveTextContent('Error text');
  });

  it('creates and clears portal content through the shared portal helper', () => {
    syncPortalContent({
      containerId: 'primitive-portal',
      shouldRender: true,
      vnode: m('div.portal-content', 'Hello portal'),
      zIndex: 1234,
    });

    expect(document.getElementById('primitive-portal')).toBeInTheDocument();
    expect(document.querySelector('#primitive-portal .portal-content')).toHaveTextContent('Hello portal');

    syncPortalContent({
      containerId: 'primitive-portal',
      shouldRender: false,
      vnode: null,
      zIndex: 1234,
    });

    expect(document.getElementById('primitive-portal')).toBeNull();
  });
});