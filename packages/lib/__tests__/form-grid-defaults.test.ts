import { FileUpload } from '../src/file-upload';
import { LikertScale } from '../src/likert-scale';
import { Options } from '../src/option';
import { RadioButtons } from '../src/radio';
import { DoubleRangeSlider, SingleRangeSlider } from '../src/range-slider';
import { Rating } from '../src/rating';
import { SearchSelect } from '../src/search-select';
import { ToggleButton } from '../src/toggle-button';
import { ToggleGroup } from '../src/toggle-group';
import { cleanup, render, type MithrilTestUtils } from './test-utils';

interface FieldCase {
  name: string;
  renderField: (className?: string) => MithrilTestUtils;
  selector: string;
}

const fieldCases: FieldCase[] = [
  {
    name: 'SearchSelect',
    renderField: (className) => render(SearchSelect<string>(), { options: [], className }),
    selector: '.multi-select-dropdown',
  },
  {
    name: 'FileUpload',
    renderField: (className) => render(FileUpload, { className }),
    selector: '.file-upload-container',
  },
  {
    name: 'LikertScale',
    renderField: (className) => render(LikertScale, { className }),
    selector: '.likert-scale',
  },
  {
    name: 'Rating',
    renderField: (className) => render(Rating, { className }),
    selector: '.rating',
  },
  {
    name: 'SingleRangeSlider',
    renderField: (className) => render(SingleRangeSlider, { id: 'single-range', className }),
    selector: '.input-field',
  },
  {
    name: 'DoubleRangeSlider',
    renderField: (className) =>
      render(DoubleRangeSlider, { id: 'double-range', minmax: true, className }),
    selector: '.input-field',
  },
];

describe('form grid defaults', () => {
  afterEach(cleanup);

  it.each(fieldCases)('$name defaults its outer wrapper to col s12', ({ renderField, selector }) => {
    const { container } = renderField();

    expect(container.querySelector(selector)).toHaveClass('col', 's12');
  });

  it.each(fieldCases)('$name replaces the default grid width with className', ({ renderField, selector }) => {
    const { container } = renderField('col s6');
    const wrapper = container.querySelector(selector);

    expect(wrapper).toHaveClass('col', 's6');
    expect(wrapper).not.toHaveClass('s12');
  });

  it.each([
    {
      name: 'ToggleButton',
      component: ToggleButton,
      attrs: { value: 'bold', label: 'Bold' },
      selector: '.toggle-button',
    },
    {
      name: 'ToggleGroup',
      component: ToggleGroup,
      attrs: { items: [{ value: 'bold', label: 'Bold' }] },
      selector: '.toggle-group',
    },
  ])('$name remains an inline control without grid classes', ({ component, attrs, selector }) => {
    const { container } = render(component, attrs);
    const wrapper = container.querySelector(selector);

    expect(wrapper).not.toHaveClass('col', 's12');
  });

  it.each([
    {
      name: 'Options',
      component: Options<string>(),
      attrs: { id: 'options', options: [{ id: 'one', label: 'One' }] },
    },
    {
      name: 'RadioButtons',
      component: RadioButtons<string>(),
      attrs: { id: 'radios', options: [{ id: 'one', label: 'One' }] },
    },
  ])('$name does not add a second grid gutter to its internal choices', ({ component, attrs }) => {
    const { container } = render(component, attrs);

    expect(container.querySelector('form .col')).toBeNull();
  });

  it.each([
    {
      name: 'Options',
      component: Options<string>(),
      attrs: {
        id: 'options-grid',
        options: [{ id: 'one', label: 'One', className: 'col s4' }],
      },
    },
    {
      name: 'RadioButtons',
      component: RadioButtons<string>(),
      attrs: {
        id: 'radios-grid',
        options: [{ id: 'one', label: 'One' }],
        checkboxClass: 'col s4',
      },
    },
  ])('$name gives grid option columns a compensating row', ({ component, attrs }) => {
    const { container } = render(component, attrs);

    expect(container.querySelector('form')).toHaveClass('row');
  });
});
