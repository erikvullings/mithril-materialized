import m from 'mithril';

interface PortalContainer {
  element: HTMLElement;
  owners: Map<symbol, m.Children>;
  legacyRefCount: number;
  legacyRenderOwned: boolean;
  legacyContent: m.Children;
  activeOwner?: symbol;
}

export interface PortalHandle {
  sync: (vnode: m.Children | null) => void;
  dispose: () => void;
}

export interface PortalSyncOptions {
  containerId: string;
  shouldRender: boolean;
  vnode: m.Children | null;
  zIndex?: number;
}

const portalContainers = new Map<string, PortalContainer>();
const legacyOwner = Symbol('legacy-portal-owner');

const createContainer = (id: string, zIndex: number): PortalContainer => {
  const element = document.createElement('div');
  element.id = id;
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.width = '100%';
  element.style.height = '100%';
  element.style.pointerEvents = 'none';
  element.style.zIndex = zIndex.toString();
  document.body.appendChild(element);

  const container = {
    element,
    owners: new Map<symbol, m.Children>(),
    legacyRefCount: 0,
    legacyRenderOwned: false,
    legacyContent: null,
  };
  portalContainers.set(id, container);
  return container;
};

const getContainer = (id: string, zIndex: number): PortalContainer => {
  const existing = portalContainers.get(id);
  if (existing?.element.isConnected) {
    return existing;
  }
  if (existing) {
    portalContainers.delete(id);
  }
  return createContainer(id, zIndex);
};

const renderOwner = (container: PortalContainer, owner?: symbol, vnode?: m.Children): void => {
  if (container.activeOwner !== owner) {
    if (container.activeOwner !== undefined) {
      m.render(container.element, null);
    }
    container.activeOwner = undefined;
    if (owner !== undefined) {
      m.render(container.element, vnode);
      container.activeOwner = owner;
    }
    return;
  }

  if (owner !== undefined) {
    m.render(container.element, vnode);
  }
};

const renderRemainingContent = (container: PortalContainer): void => {
  const remainingOwner = Array.from(container.owners.entries()).pop();
  if (remainingOwner) {
    renderOwner(container, remainingOwner[0], remainingOwner[1]);
  } else if (container.legacyRenderOwned) {
    renderOwner(container, legacyOwner, container.legacyContent);
  } else {
    renderOwner(container);
  }
};

const removeIfUnowned = (id: string, container: PortalContainer): void => {
  if (container.owners.size > 0 || container.legacyRefCount > 0) {
    return;
  }
  renderOwner(container);
  container.element.remove();
  if (portalContainers.get(id) === container) {
    portalContainers.delete(id);
  }
};

export const createPortalHandle = ({
  id,
  zIndex = 1004,
}: {
  id: string;
  zIndex?: number;
}): PortalHandle => {
  const owner = Symbol(id);
  let ownedContainer: PortalContainer | undefined;
  let disposed = false;

  const release = () => {
    if (!ownedContainer) return;

    const container = ownedContainer;
    ownedContainer = undefined;
    container.owners.delete(owner);
    if (container.activeOwner === owner) {
      renderRemainingContent(container);
    }
    removeIfUnowned(id, container);
  };

  return {
    sync: (vnode) => {
      if (disposed) return;
      if (vnode === null) {
        release();
        return;
      }

      const container = getContainer(id, zIndex);
      if (ownedContainer && ownedContainer !== container) {
        release();
      }
      ownedContainer = container;
      container.owners.delete(owner);
      container.owners.set(owner, vnode);
      renderOwner(container, owner, vnode);
    },
    dispose: () => {
      if (disposed) return;
      release();
      disposed = true;
    },
  };
};

export const getPortalContainer = (id: string, zIndex: number = 1004): HTMLElement => {
  const container = getContainer(id, zIndex);
  container.legacyRefCount++;
  return container.element;
};

export const releasePortalContainer = (id: string): void => {
  const container = portalContainers.get(id);
  if (!container) return;

  container.legacyRefCount = Math.max(0, container.legacyRefCount - 1);
  if (container.legacyRefCount === 0 && container.legacyRenderOwned) {
    container.legacyRenderOwned = false;
    if (container.activeOwner === legacyOwner) {
      renderRemainingContent(container);
    }
  }
  removeIfUnowned(id, container);
};

export const renderToPortal = (containerId: string, vnode: m.Children, zIndex: number = 1004): void => {
  let container = portalContainers.get(containerId);
  if (!container?.element.isConnected) {
    container = getContainer(containerId, zIndex);
  }
  if (!container.legacyRenderOwned) {
    if (container.legacyRefCount === 0) {
      container.legacyRefCount++;
    }
    container.legacyRenderOwned = true;
  }
  container.legacyContent = vnode;
  renderOwner(container, legacyOwner, vnode);
};

export const clearPortal = (containerId: string): void => {
  const container = portalContainers.get(containerId);
  if (!container) return;

  container.legacyRenderOwned = false;
  container.legacyContent = null;
  container.legacyRefCount = Math.max(0, container.legacyRefCount - 1);
  if (container.activeOwner === legacyOwner) {
    renderRemainingContent(container);
  }
  removeIfUnowned(containerId, container);
};

export const syncPortalContent = ({
  containerId,
  shouldRender,
  vnode,
  zIndex = 1004,
}: PortalSyncOptions): void => {
  if (!shouldRender || vnode === null) {
    clearPortal(containerId);
    return;
  }
  renderToPortal(containerId, vnode, zIndex);
};
