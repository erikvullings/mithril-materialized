import { Breadcrumb } from '../src/breadcrumb';
import { cleanup, render } from './test-utils';

describe('Breadcrumb', () => {
  afterEach(cleanup);

  it('preserves its root class when no custom class is supplied', () => {
    const { container } = render(Breadcrumb, {
      items: [{ text: 'Home', href: '/' }, { text: 'Files' }],
    });

    expect(container.querySelector('nav')).toHaveClass('breadcrumb');
  });

  it('adds a custom class without replacing its root class', () => {
    const { container } = render(Breadcrumb, {
      className: 'project-path',
      items: [{ text: 'Home', href: '/' }, { text: 'Files' }],
    });

    expect(container.querySelector('nav')).toHaveClass('breadcrumb', 'project-path');
  });
});
