import { ToggleGroup } from '../src/toggle-group';
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
