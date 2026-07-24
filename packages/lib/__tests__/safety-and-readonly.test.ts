import { TextArea, TextInput } from '../src/input';
import { Autocomplete } from '../src/autocomplete';
import { RadioButtons } from '../src/radio';
import { cleanup, render } from './test-utils';

describe('Safety and readOnly behavior', () => {
  afterEach(cleanup);

  it('uses defaultValue precedence for readOnly TextInput', () => {
    const { getByDisplayValue } = render(TextInput, {
      label: 'Read only field',
      readOnly: true,
      value: 'fallback value',
      defaultValue: 'preferred value',
    });

    expect(getByDisplayValue('preferred value')).toBeInTheDocument();
  });

  it('uses defaultValue precedence for readOnly TextArea', () => {
    const { getByDisplayValue } = render(TextArea, {
      label: 'Read only area',
      readOnly: true,
      value: 'fallback area',
      defaultValue: 'preferred area',
    });

    expect(getByDisplayValue('preferred area')).toBeInTheDocument();
  });

  it('keeps legacy readonly support with the same non-interactive value precedence', () => {
    const { getByDisplayValue } = render(TextInput, {
      label: 'Legacy read only field',
      readonly: true,
      value: 'fallback value',
      defaultValue: 'preferred value',
    });

    expect(getByDisplayValue('preferred value')).toBeInTheDocument();
  });

  it('renders autocomplete suggestions with regex-like input safely', () => {
    const { getByText } = render(Autocomplete, {
      label: 'Autocomplete',
      defaultValue: '[',
      data: {
        'Alpha[One]': null,
        'Beta.Two': null,
      },
    });

    expect(
      getByText(
        (_: string, element: Element | null) =>
          Boolean(element?.textContent?.includes('Alpha[One]')) && element?.tagName === 'SPAN'
      )
    ).toBeInTheDocument();
  });

  it('does not inject HTML from autocomplete suggestion labels', () => {
    const { container, getByText } = render(Autocomplete, {
      label: 'Autocomplete',
      defaultValue: 'img',
      data: {
        '<img src=x onerror=alert(1)>': null,
      },
    });

    expect(
      getByText(
        (_: string, element: Element | null) =>
          Boolean(element?.textContent?.includes('<img src=x onerror=alert(1)>')) && element?.tagName === 'SPAN'
      )
    ).toBeInTheDocument();
    expect(container.querySelector('img[src="x"]')).toBeNull();
  });

  it('renders radio labels as plain text by default', () => {
    const { container, getByText } = render(RadioButtons<string>(), {
      options: [{ id: 'a', label: '<b>Unsafe</b>' }],
    });

    expect(getByText('<b>Unsafe</b>')).toBeInTheDocument();
    expect(container.querySelector('b')).toBeNull();
  });

  it('renders radio labels as HTML only when allowHtml is enabled', () => {
    const { container } = render(RadioButtons<string>(), {
      allowHtml: true,
      options: [{ id: 'a', label: '<b>Trusted</b>' }],
    });

    expect(container.querySelector('b')).not.toBeNull();
  });
});
