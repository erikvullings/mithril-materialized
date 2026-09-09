export interface DismissibleLayerHandle {
  sync: (active: boolean) => void;
  dispose: () => void;
}

interface DismissibleLayer {
  active: boolean;
  onEscape: (event: KeyboardEvent) => 'dismissed' | 'blocked' | false;
}

const layers: DismissibleLayer[] = [];
let listening = false;

const removeLayer = (layer: DismissibleLayer) => {
  const index = layers.indexOf(layer);
  if (index >= 0) layers.splice(index, 1);
  layer.active = false;
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || event.defaultPrevented) return;

  while (layers.length > 0) {
    const layer = layers[layers.length - 1];
    removeLayer(layer);
    const result = layer.onEscape(event);
    if (!result) continue;
    if (result === 'blocked') {
      layer.active = true;
      layers.push(layer);
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    break;
  }

  syncListener();
};

const syncListener = () => {
  if (typeof window === 'undefined') return;

  if (layers.length > 0 && !listening) {
    window.addEventListener('keydown', handleEscape);
    listening = true;
  } else if (layers.length === 0 && listening) {
    window.removeEventListener('keydown', handleEscape);
    listening = false;
  }
};

export const createDismissibleLayer = (
  onEscape: (event: KeyboardEvent) => 'dismissed' | 'blocked' | false
): DismissibleLayerHandle => {
  const layer: DismissibleLayer = { active: false, onEscape };
  let disposed = false;

  return {
    sync: (active) => {
      if (disposed || active === layer.active) return;
      if (active) {
        layer.active = true;
        layers.push(layer);
      } else {
        removeLayer(layer);
      }
      syncListener();
    },
    dispose: () => {
      if (disposed) return;
      removeLayer(layer);
      disposed = true;
      syncListener();
    },
  };
};
