import m from 'mithril';
import { Avatar, AvatarGroup } from '../src/avatar';
import { cleanup, render } from './test-utils';

describe('Avatar', () => {
  afterEach(cleanup);

  it('derives at most two initials from a display name', () => {
    const result = render(Avatar, { name: '  Ada   Lovelace  ', alt: 'Ada Lovelace' });

    expect(result.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');

    result.rerender(Avatar, { name: 'Plato', alt: 'Plato' });

    expect(result.getByRole('img', { name: 'Plato' })).toHaveTextContent('PL');
  });

  it('stops rendering a failed image and uses the same deterministic fallback', () => {
    const result = render(Avatar, {
      src: '/missing-avatar.png',
      name: 'Grace Hopper',
      alt: 'Grace Hopper',
    });
    const image = result.container.querySelector('img');

    expect(image).toHaveAttribute('src', '/missing-avatar.png');
    image?.dispatchEvent(new Event('error'));
    result.rerender(Avatar);

    expect(result.container.querySelector('img')).not.toBeInTheDocument();
    expect(result.getByRole('img', { name: 'Grace Hopper' })).toHaveTextContent('GH');

    result.rerender(Avatar, {
      src: '/missing-avatar.png',
      name: 'Grace Hopper',
      alt: 'Grace Hopper',
    });

    expect(result.container.querySelector('img')).not.toBeInTheDocument();
  });

  it('supports decorative, icon, size, shape, and disabled presentations', () => {
    const result = render(Avatar, {
      alt: '',
      iconName: 'person',
      size: 'large',
      shape: 'rounded',
      disabled: true,
    });
    const avatar = result.container.querySelector('.mm-avatar');

    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatar).not.toHaveAttribute('role');
    expect(avatar).toHaveClass(
      'mm-avatar--large',
      'mm-avatar--rounded',
      'mm-avatar--disabled'
    );
    expect(avatar?.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('AvatarGroup', () => {
  afterEach(cleanup);

  it('keeps child order and reports deterministic overflow in RTL layouts', () => {
    const result = render({
      view: () =>
        m(
          AvatarGroup,
          {
            max: 2,
            totalCount: 5,
            ariaLabel: 'Project contributors',
            dir: 'rtl',
            overlap: 12,
          },
          [
            m(
              'a[href="/people/ada"]',
              m(Avatar, { name: 'Ada Lovelace', alt: 'Ada Lovelace' })
            ),
            m(Avatar, { name: 'Grace Hopper', alt: 'Grace Hopper' }),
            m(Avatar, { name: 'Katherine Johnson', alt: 'Katherine Johnson' }),
          ]
        ),
    });
    const group = result.getByRole('group', { name: 'Project contributors' });
    const items = group.querySelectorAll('.mm-avatar-group-item');

    expect(group).toHaveAttribute('dir', 'rtl');
    expect(group).toHaveStyle({ '--mm-avatar-group-overlap': '12px' });
    expect(Array.from(items, (item) => item.textContent)).toEqual(['AL', 'GH', '+3']);
    expect(result.getByRole('img', { name: '3 more' })).toBeInTheDocument();
    expect(group.querySelector('a')).toHaveAttribute('href', '/people/ada');
  });
});
