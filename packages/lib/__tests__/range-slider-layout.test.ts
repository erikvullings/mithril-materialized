import fs from 'node:fs';
import path from 'node:path';
import { SingleRangeSlider } from '../src/range-slider';
import { cleanup, render } from './test-utils';

describe('SingleRangeSlider layout', () => {
  afterEach(cleanup);

  it('marks an always-visible value so the field can reserve label clearance', () => {
    const { container } = render(SingleRangeSlider, {
      id: 'progress',
      label: 'Progress',
      showValue: true,
    });

    expect(container.querySelector('.range-field')).toHaveClass('has-visible-value');
  });

  it('centres the horizontal track, progress, and thumb on one axis', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../sass/components/forms/_range-enhanced.scss'),
      'utf8'
    );

    expect(source).toMatch(/\.track\s*\{[\s\S]*?&\.horizontal\s*\{[^}]*top:\s*50%/s);
    expect(source).toMatch(/\.range-progress\s*\{[\s\S]*?&\.horizontal\s*\{[^}]*top:\s*50%/s);
    expect(source).toMatch(/\.thumb\s*\{[\s\S]*?&\.horizontal\s*\{[^}]*top:\s*50%/s);
  });
});
