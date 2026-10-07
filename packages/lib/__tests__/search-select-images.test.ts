import { vi } from 'vitest';
import { SearchSelect } from '../src/search-select';
import type { InputOption } from '../src/option';
import { cleanup, fireEvent, render } from './test-utils';

const options: InputOption<string>[] = [
  { id: 'mountains', label: 'Mountains', img: '/icons/mountains.svg' },
  { id: 'sea', label: 'Sea', img: '/icons/sea.svg' },
  { id: 'city', label: 'City' },
  { id: 'closed', label: 'Closed', img: '/icons/closed.svg', disabled: true },
];

describe('SearchSelect option images', () => {
  afterEach(cleanup);

  it('renders decorative images beside text without changing text-only or disabled options', () => {
    const component = SearchSelect<string>();
    const attrs = { options };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    const rows = result.container.querySelectorAll('li[role="option"]');
    const image = rows[0].querySelector('label > span > img') as HTMLImageElement;
    expect(image).toHaveAttribute('src', '/icons/mountains.svg');
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveClass('search-select-option-image');
    expect(image.parentElement).toHaveTextContent('Mountains');
    expect(image.previousSibling?.textContent).toBe('Mountains');
    expect(rows[0].querySelector('label > input + span')).toBe(image.parentElement);
    expect(rows[2].querySelector('img')).toBeNull();
    expect(rows[2].querySelector('label > span')).not.toHaveClass('search-select-option-with-image');
    expect(rows[3]).toHaveClass('disabled');
    expect(rows[3].querySelector('img')).toHaveAttribute('src', '/icons/closed.svg');
    expect(rows[3].querySelector('input')).toBeDisabled();
    fireEvent.click(rows[3].querySelector('img') as HTMLElement);
    result.rerender(component, attrs);
    expect(result.container.querySelector('.chip')).toBeNull();
  });

  it('selects the same ID when clicking an image and keeps uncontrolled selection', () => {
    const component = SearchSelect<string>();
    const attrs = { options };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    fireEvent.click(result.container.querySelector('img[src="/icons/mountains.svg"]') as HTMLElement);
    result.rerender(component, attrs);

    expect(result.container.querySelector('.chip')).toHaveTextContent('Mountains');
    expect(result.container.querySelector('input.sr-only')).toHaveValue('Mountains');
    expect(result.container.querySelector('img[src="/icons/mountains.svg"]')).toBeNull();
  });

  it('supports searching and keyboard selection with image options in controlled mode', () => {
    const onchange = vi.fn();
    const component = SearchSelect<string>();
    const attrs = { options, checkedId: [] as string[], onchange };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    const search = result.container.querySelector('.search-select-input') as HTMLInputElement;
    fireEvent.change(search, 'Sea');
    result.rerender(component, attrs);
    expect(result.container.querySelectorAll('li[role="option"]')).toHaveLength(1);
    expect(result.container.querySelector('li[role="option"] img')).toHaveAttribute('src', '/icons/sea.svg');

    fireEvent.keyDown(search, 'ArrowDown');
    fireEvent.keyDown(search, 'Enter');
    expect(onchange).toHaveBeenCalledWith(['sea']);

    result.rerender(component, { ...attrs, checkedId: ['sea'] });
    expect(result.container.querySelector('.chip')).toHaveTextContent('Sea');
  });

  it('renders and selects async-loaded images with checkboxes hidden', async () => {
    const onchange = vi.fn();
    const loadOptions = vi.fn(async () => options.slice(0, 2));
    const component = SearchSelect<string>();
    const attrs = { options: [] as InputOption<string>[], loadOptions, maxSelectedOptions: 1, onchange };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    await Promise.resolve();
    result.rerender(component, attrs);

    const row = result.container.querySelector('li[role="option"]') as HTMLElement;
    expect(row.querySelector('input[type="checkbox"]')).toBeNull();
    expect(row.querySelector('img')).toHaveAttribute('src', '/icons/mountains.svg');
    expect(row.querySelector('label > span')).toHaveTextContent('Mountains');
    fireEvent.click(row.querySelector('img') as HTMLElement);
    expect(onchange).toHaveBeenCalledWith(['mountains']);
  });

  it('uses singular and plural defaults for the selection limit', () => {
    for (const maxSelectedOptions of [1, 2]) {
      const component = SearchSelect<string>();
      const attrs = {
        options,
        defaultCheckedId: options.slice(0, maxSelectedOptions).map((option) => option.id),
        maxSelectedOptions,
      };
      const result = render(component, attrs);
      fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
      result.rerender(component, attrs);

      const status = result.container.querySelector('.search-select-max-info');
      expect(status).toHaveAttribute('role', 'status');
      expect(status).toHaveTextContent(
        maxSelectedOptions === 1 ? 'You can select only 1 option' : 'You can select only 2 options'
      );
      result.unmount();
    }
  });

  it('allows separate localized singular and plural selection-limit messages', () => {
    const component = SearchSelect<string>();
    const attrs = {
      options,
      defaultCheckedId: 'mountains',
      maxSelectedOptions: 1,
      i18n: {
        maxSelectionReached: 'Limite de {max} sélection atteinte',
        maxSelectionsReached: 'Limite de {max} sélections atteinte',
      },
    };
    const result = render(component, attrs);
    fireEvent.click(result.container.querySelector('.chips-container') as HTMLElement);
    result.rerender(component, attrs);

    expect(result.container.querySelector('.search-select-max-info')).toHaveTextContent(
      'Limite de 1 sélection atteinte'
    );

    const pluralAttrs = {
      ...attrs,
      defaultCheckedId: ['mountains', 'sea'],
      maxSelectedOptions: 2,
    };
    const pluralComponent = SearchSelect<string>();
    const pluralResult = render(pluralComponent, pluralAttrs);
    fireEvent.click(pluralResult.container.querySelector('.chips-container') as HTMLElement);
    pluralResult.rerender(pluralComponent, pluralAttrs);
    expect(pluralResult.container.querySelector('.search-select-max-info')).toHaveTextContent(
      'Limite de 2 sélections atteinte'
    );
  });
});
