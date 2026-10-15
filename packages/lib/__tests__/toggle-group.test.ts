import { ToggleGroup } from '../src/toggle-group';
import { ToggleButton } from '../src/toggle-button';
import { cleanup, render } from './test-utils';

describe('ToggleGroup controllable state', () => {
  afterEach(cleanup);

  it('does not adopt a defaultValue added after undefined initialization', () => {
    const items = [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ];
    const result = render(ToggleGroup, { items });

    expect(result.getByRole('button', { name: 'Left' })).not.toHaveClass('checked');

    result.rerender(ToggleGroup, { items, defaultValue: 'left' });

    expect(result.getByRole('button', { name: 'Left' })).not.toHaveClass('checked');
  });
});

describe('ToggleButton icon spacing', () => {
  afterEach(cleanup);

  it('marks icon-only buttons so presets do not rely on :only-child', () => {
    const result = render(ToggleButton, { value: 'bold', iconName: 'format_bold', tooltip: 'Bold' });
    expect(result.container.querySelector('.toggle-button')).toHaveClass('toggle-button--icon-only');
  });

  it('does not mark icon + label buttons as icon-only, even while a waves ripple is present', () => {
    const result = render(ToggleButton, { value: 'overview', iconName: 'table_chart', label: 'Overview' });
    const button = result.container.querySelector('.toggle-button') as HTMLElement;
    expect(button).not.toHaveClass('toggle-button--icon-only');
    button.appendChild(Object.assign(document.createElement('div'), { className: 'waves-ripple' }));
    expect(button).not.toHaveClass('toggle-button--icon-only');
  });

  it('does not mark label-only buttons as icon-only', () => {
    const result = render(ToggleButton, { value: 'left', label: 'Left' });
    expect(result.container.querySelector('.toggle-button')).not.toHaveClass('toggle-button--icon-only');
  });
});
