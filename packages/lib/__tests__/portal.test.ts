import m from 'mithril';
import { createPortalHandle } from '../src/portal';
import {
  clearPortal,
  getPortalContainer,
  releasePortalContainer,
  renderToPortal,
  syncPortalContent,
} from '../src/utils';
import { cleanup } from './test-utils';

describe('Portal lifecycle', () => {
  afterEach(cleanup);

  it('acquires, updates, clears, reopens, and disposes through one handle', () => {
    const portal = createPortalHandle({ id: 'portal-lifecycle', zIndex: 1234 });

    portal.sync(m('.content', 'First'));
    const firstContainer = document.getElementById('portal-lifecycle');
    expect(firstContainer).toHaveStyle({ zIndex: '1234' });
    expect(firstContainer).toHaveTextContent('First');

    portal.sync(m('.content', 'Updated'));
    expect(document.getElementById('portal-lifecycle')).toBe(firstContainer);
    expect(firstContainer).toHaveTextContent('Updated');

    portal.sync(null);
    expect(document.getElementById('portal-lifecycle')).toBeNull();
    portal.sync(null);

    portal.sync(m('.content', 'Reopened'));
    expect(document.getElementById('portal-lifecycle')).toHaveTextContent('Reopened');

    portal.dispose();
    expect(document.getElementById('portal-lifecycle')).toBeNull();
  });

  it('disposes idempotently whether open or closed', () => {
    const openPortal = createPortalHandle({ id: 'open-dispose' });
    openPortal.sync(m('span', 'Open'));
    openPortal.dispose();
    openPortal.dispose();
    openPortal.sync(m('span', 'Ignored after dispose'));
    expect(document.getElementById('open-dispose')).toBeNull();

    const closedPortal = createPortalHandle({ id: 'closed-dispose' });
    closedPortal.dispose();
    closedPortal.dispose();
    expect(document.getElementById('closed-dispose')).toBeNull();
  });

  it('keeps shared containers and remaining owner content until the final release', () => {
    const first = createPortalHandle({ id: 'shared-portal' });
    const second = createPortalHandle({ id: 'shared-portal' });

    first.sync(m('.first', 'First owner'));
    second.sync(m('.second', 'Second owner'));
    second.dispose();

    expect(document.getElementById('shared-portal')).toBeInTheDocument();
    expect(document.querySelector('#shared-portal .first')).toHaveTextContent('First owner');

    first.dispose();
    expect(document.getElementById('shared-portal')).toBeNull();
  });

  it('keeps legacy ownership acquired after a handle until legacy clear', () => {
    const portal = createPortalHandle({ id: 'mixed-ownership' });
    portal.sync(m('.handle-content', 'Handle'));

    renderToPortal('mixed-ownership', m('.legacy-content', 'Legacy'));
    renderToPortal('mixed-ownership', m('.legacy-content', 'Updated legacy'));
    portal.dispose();

    expect(document.getElementById('mixed-ownership')).toBeInTheDocument();
    expect(document.querySelector('#mixed-ownership .legacy-content')).toHaveTextContent('Updated legacy');

    clearPortal('mixed-ownership');
    expect(document.getElementById('mixed-ownership')).toBeNull();
  });

  it('unmounts and mounts across handle ownership changes with matching selectors', () => {
    const events: string[] = [];
    const first = createPortalHandle({ id: 'owner-lifecycle' });
    const second = createPortalHandle({ id: 'owner-lifecycle' });

    first.sync(
      m('.same-selector', {
        oncreate: () => events.push('first-create'),
        onremove: () => events.push('first-remove'),
      })
    );
    second.sync(
      m('.same-selector', {
        oncreate: () => events.push('second-create'),
        onremove: () => events.push('second-remove'),
      })
    );
    first.dispose();
    second.dispose();

    expect(events).toEqual(['first-create', 'first-remove', 'second-create', 'second-remove']);
    expect(document.getElementById('owner-lifecycle')).toBeNull();
  });

  it('preserves get and release reference-count compatibility', () => {
    const first = getPortalContainer('legacy-container', 4321);
    const second = getPortalContainer('legacy-container', 9999);
    expect(second).toBe(first);
    expect(first).toHaveStyle({ zIndex: '4321' });

    releasePortalContainer('legacy-container');
    expect(document.getElementById('legacy-container')).toBe(first);

    releasePortalContainer('legacy-container');
    expect(document.getElementById('legacy-container')).toBeNull();
  });

  it('preserves render, clear, and sync compatibility adapters', () => {
    renderToPortal('legacy-render', m('.content', 'First'));
    renderToPortal('legacy-render', m('.content', 'Updated'));
    expect(document.querySelector('#legacy-render .content')).toHaveTextContent('Updated');
    clearPortal('legacy-render');
    expect(document.getElementById('legacy-render')).toBeNull();

    syncPortalContent({
      containerId: 'legacy-sync',
      shouldRender: true,
      vnode: m('.content', 'Synced'),
    });
    expect(document.querySelector('#legacy-sync .content')).toHaveTextContent('Synced');
    syncPortalContent({
      containerId: 'legacy-sync',
      shouldRender: false,
      vnode: null,
    });
    expect(document.getElementById('legacy-sync')).toBeNull();
  });
});
