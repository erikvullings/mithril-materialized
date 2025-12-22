import m, { FactoryComponent, Attributes } from 'mithril';

export interface MaterialBoxOptions {
  /** Animation duration in ms */
  inDuration?: number;
  /** Animation duration in ms for closing */
  outDuration?: number;
  /** Callback when materialbox is opened */
  onOpenStart?: () => void;
  /** Callback when materialbox is closed */
  onCloseStart?: () => void;
  /** Callback when materialbox opening animation is complete */
  onOpenEnd?: () => void;
  /** Callback when materialbox closing animation is complete */
  onCloseEnd?: () => void;
}

export interface MaterialBoxAttrs extends MaterialBoxOptions, Attributes {
  /** Source image path */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /**
   * Width of the image
   * @default undefined
   */
  width?: number;
  /**
   * Height of the image
   * @default undefined
   */
  height?: number;
  /** Caption for the image overlay */
  caption?: string;
}

/**
 * Pure TypeScript MaterialBox - creates an image lightbox that fills the screen when clicked
 * Uses CSS classes from _materialbox.scss
 */
export const MaterialBox: FactoryComponent<MaterialBoxAttrs> = () => {
  const state = {
    isOpen: false,
    originalImage: null as HTMLImageElement | null,
    overlay: null as HTMLElement | null,
    overlayImage: null as HTMLImageElement | null,
  };

  const openBox = (img: HTMLImageElement, attrs: MaterialBoxAttrs) => {
    if (state.isOpen) return;

    state.isOpen = true;
    state.originalImage = img;

    if (attrs.onOpenStart) attrs.onOpenStart();

    const inDuration = attrs.inDuration || 275;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'materialbox-overlay';
    overlay.style.transition = `opacity ${inDuration}ms ease`;

    // Create enlarged image
    const enlargedImg = document.createElement('img');
    enlargedImg.src = img.src;
    enlargedImg.alt = img.alt || '';
    enlargedImg.className = 'materialbox-image';

    // Get original image dimensions and position
    const imgRect = img.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate final size maintaining aspect ratio
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const maxWidth = windowWidth * 0.9;
    const maxHeight = windowHeight * 0.9;

    let finalWidth = maxWidth;
    let finalHeight = maxWidth / aspectRatio;

    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = maxHeight * aspectRatio;
    }

    // Set initial position and size (same as original image)
    enlargedImg.style.top = `${imgRect.top}px`;
    enlargedImg.style.left = `${imgRect.left}px`;
    enlargedImg.style.width = `${imgRect.width}px`;
    enlargedImg.style.height = `${imgRect.height}px`;
    enlargedImg.style.transition = `all ${inDuration}ms ease`;

    // Add caption if provided
    let caption: HTMLElement | null = null;
    if (attrs.caption) {
      caption = document.createElement('div');
      caption.className = 'materialbox-caption';
      caption.textContent = attrs.caption;
      caption.style.transition = `opacity ${inDuration}ms ease ${inDuration}ms`;
    }

    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(enlargedImg);
    if (caption) document.body.appendChild(caption);

    // Store references
    state.overlay = overlay;
    state.overlayImage = enlargedImg;

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Trigger animations
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      enlargedImg.style.top = `${(windowHeight - finalHeight) / 2}px`;
      enlargedImg.style.left = `${(windowWidth - finalWidth) / 2}px`;
      enlargedImg.style.width = `${finalWidth}px`;
      enlargedImg.style.height = `${finalHeight}px`;

      if (caption) {
        caption.style.opacity = '1';
      }
    });

    // Add close handlers
    const closeHandler = () => closeBox(attrs);
    overlay.addEventListener('click', closeHandler);
    enlargedImg.addEventListener('click', closeHandler);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeHandler();
    });

    // Call onOpenEnd after animation
    setTimeout(() => {
      if (attrs.onOpenEnd) attrs.onOpenEnd();
    }, inDuration);
  };

  const closeBox = (attrs: MaterialBoxAttrs) => {
    if (!state.isOpen || !state.originalImage || !state.overlay || !state.overlayImage) return;

    if (attrs.onCloseStart) attrs.onCloseStart();

    const originalRect = state.originalImage.getBoundingClientRect();

    // Animate back to original position
    state.overlay.style.opacity = '0';
    state.overlayImage.style.top = `${originalRect.top}px`;
    state.overlayImage.style.left = `${originalRect.left}px`;
    state.overlayImage.style.width = `${originalRect.width}px`;
    state.overlayImage.style.height = `${originalRect.height}px`;

    // Hide caption
    const caption = document.querySelector('.materialbox-caption');
    if (caption) {
      (caption as HTMLElement).style.opacity = '0';
    }

    // Clean up after animation
    setTimeout(() => {
      if (state.overlay) {
        document.body.removeChild(state.overlay);
        state.overlay = null;
      }
      if (state.overlayImage) {
        document.body.removeChild(state.overlayImage);
        state.overlayImage = null;
      }
      if (caption) {
        document.body.removeChild(caption);
      }

      // Restore body scroll
      document.body.style.overflow = '';

      state.isOpen = false;
      state.originalImage = null;

      if (attrs.onCloseEnd) attrs.onCloseEnd();
      m.redraw();
    }, attrs.outDuration || 200);
  };

  return {
    onremove: () => {
      // Clean up if component is removed while open
      if (state.isOpen) {
        if (state.overlay) document.body.removeChild(state.overlay);
        if (state.overlayImage) document.body.removeChild(state.overlayImage);
        const caption = document.querySelector('.materialbox-caption');
        if (caption) document.body.removeChild(caption);
        document.body.style.overflow = '';
      }
    },

    view: ({ attrs }) => {
      const { src, alt, width, height, caption, className, style, ...otherAttrs } = attrs;

      // Build style attribute - handle both string and object styles
      let imgStyle: string | Record<string, string> = style || {};

      if (typeof style !== 'string') {
        // If style is an object or undefined, add default styles as object
        imgStyle = {
          cursor: 'zoom-in',
          transition: 'opacity 200ms ease',
          ...(style || {}),
        };
      }

      return m('img.materialboxed', {
        ...otherAttrs,
        src,
        alt: alt || '',
        width,
        height,
        className: ['materialboxed', className].filter(Boolean).join(' ') || undefined,
        style: imgStyle,
        onclick: (e: Event) => {
          e.preventDefault();
          openBox(e.target as HTMLImageElement, attrs);
        },
      });
    },
  };
};
