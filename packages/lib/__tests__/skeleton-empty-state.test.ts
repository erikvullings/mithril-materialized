import m from 'mithril';
import { EmptyState } from '../src/empty-state';
import { Skeleton } from '../src/skeleton';
import { cleanup, fireEvent, render } from './test-utils';

describe('Skeleton', () => {
  afterEach(cleanup);

  it('renders a hidden text placeholder for each requested line', () => {
    const result = render(Skeleton, {
      shape: 'text',
      count: 3,
      width: '80%',
      height: 18,
    });
    const skeletons = result.container.querySelectorAll('.mm-skeleton');

    expect(skeletons).toHaveLength(3);
    expect(result.container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(skeletons[0]).toHaveClass('mm-skeleton--text');
    expect(skeletons[0]).toHaveStyle({ width: '80%', height: '18px' });
  });

  it('supports rectangular and circular static placeholders', () => {
    const rectangular = render(Skeleton, {
      shape: 'rectangular',
      width: 240,
      height: 120,
      animated: false,
    });

    expect(rectangular.container.querySelector('.mm-skeleton')).toHaveClass(
      'mm-skeleton--rectangular'
    );
    expect(rectangular.container.querySelector('.mm-skeleton')).not.toHaveClass(
      'mm-skeleton--animated'
    );
    rectangular.unmount();

    const circular = render(Skeleton, { shape: 'circular', width: 48 });

    expect(circular.container.querySelector('.mm-skeleton')).toHaveClass(
      'mm-skeleton--circular'
    );
    expect(circular.container.querySelector('.mm-skeleton')).toHaveStyle({
      width: '48px',
      height: '48px',
    });
  });
});

describe('EmptyState', () => {
  afterEach(cleanup);

  it('renders content slots and invokes existing button actions', () => {
    const primary = jest.fn();
    const secondary = jest.fn();
    const result = render(
      EmptyState,
      {
        title: 'No projects yet',
        headingLevel: 2,
        description: 'Create a project to start organizing your work.',
        illustration: m('div.custom-illustration', 'Illustration'),
        content: m('a[href="/templates"]', 'Browse templates'),
        primaryAction: {
          label: 'Create a project with a localized long label',
          onclick: primary,
        },
        secondaryAction: { label: 'Import existing project', onclick: secondary },
      },
      undefined
    );

    expect(result.getByText('No projects yet').tagName).toBe('H2');
    expect(result.getByText('No projects yet')).toHaveClass('mm-empty-state-title');
    expect(result.container.querySelector('.custom-illustration')).toBeInTheDocument();
    expect(result.getByText('Browse templates')).toHaveAttribute('href', '/templates');

    fireEvent.click(result.getByText('Create a project with a localized long label'));
    fireEvent.click(result.getByText('Import existing project'));

    expect(primary).toHaveBeenCalledTimes(1);
    expect(secondary).toHaveBeenCalledTimes(1);
  });

  it('supports a material icon and supplemental content without actions', () => {
    const result = render(
      EmptyState,
      {
        title: 'No results',
        iconName: 'search',
      },
      undefined
    );

    expect(result.container.querySelector('.mm-empty-state-icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
    expect(result.container.querySelector('.mm-empty-state-actions')).toBeNull();
  });

  it('supports navigation actions through the existing button API', () => {
    const result = render(EmptyState, {
      title: 'No templates',
      primaryAction: { label: 'Browse templates', href: '/templates' },
    });

    expect(result.getByText('Browse templates')).toHaveAttribute('href', '/templates');
  });
});
