import m, { FactoryComponent, Attributes } from 'mithril';

export interface IParallaxOptions {
  /** Enable responsive parallax (disable on mobile for performance) */
  responsiveThreshold?: number;
}

export interface IParallax extends IParallaxOptions, Attributes {
  /** Image source */
  src: string;
  /** Alt text for the image */
  alt?: string;
}

/**
 * MaterializeCSS Parallax component with dynamic positioning
 * Port of the original MaterializeCSS parallax logic
 */
export const Parallax: FactoryComponent<IParallax> = () => {
  let containerEl: HTMLElement | null = null;
  let imgEl: HTMLImageElement | null = null;
  let scrollThrottle: number | null = null;
  let lastScrollTop = -1;

  // MaterializeCSS parallax logic - exact port from original source
  const updateParallax = () => {
    if (!containerEl || !imgEl) return;

    const containerHeight = containerEl.offsetHeight > 0 ? containerEl.offsetHeight : containerEl.parentElement?.offsetHeight || 1;
    const imgHeight = imgEl.offsetHeight;
    const parallaxDist = imgHeight - containerHeight;
    const bottom = containerEl.offsetTop + containerHeight;
    const top = containerEl.offsetTop;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const windowBottom = scrollTop + windowHeight;
    const percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
    
    // MaterializeCSS formula: start at negative parallaxDist/2, move toward positive parallaxDist/2
    const parallax = Math.round((parallaxDist * percentScrolled) - (parallaxDist / 2));

    // Only update if we're in the viewport and scroll position changed
    if (bottom > scrollTop && top < windowBottom && scrollTop !== lastScrollTop) {
      // Match MaterializeCSS transform format: translate3d(-50%, Ypx, 0px) with opacity
      imgEl.style.transform = `translate3d(-50%, ${parallax}px, 0px)`;
      imgEl.style.opacity = '1';
      lastScrollTop = scrollTop;
    }
  };

  const handleScroll = () => {
    if (scrollThrottle) return;

    scrollThrottle = requestAnimationFrame(() => {
      updateParallax();
      scrollThrottle = null;
    });
  };

  const handleResize = () => {
    updateParallax();
  };

  const setupParallax = (containerElement: HTMLElement, responsiveThreshold: number) => {
    containerEl = containerElement;
    imgEl = containerElement.querySelector('.parallax img') as HTMLImageElement;

    if (!imgEl) return;

    // Check if we should enable parallax based on screen size
    const shouldEnableParallax = window.innerWidth >= responsiveThreshold;

    if (shouldEnableParallax) {
      // Set initial MaterializeCSS styles on the image
      imgEl.style.transform = 'translate3d(-50%, 0px, 0px)';
      imgEl.style.opacity = '1';

      // Wait for image to load before calculating parallax
      if (imgEl.complete) {
        updateParallax();
      } else {
        imgEl.onload = () => updateParallax();
      }

      // Add event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });

      // Store cleanup function
      (containerEl as any)._parallaxCleanup = () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (scrollThrottle) {
          cancelAnimationFrame(scrollThrottle);
          scrollThrottle = null;
        }
      };
    }
  };

  const cleanup = () => {
    if (containerEl && (containerEl as any)._parallaxCleanup) {
      (containerEl as any)._parallaxCleanup();
    }
    containerEl = null;
    imgEl = null;
    if (scrollThrottle) {
      cancelAnimationFrame(scrollThrottle);
      scrollThrottle = null;
    }
    lastScrollTop = -1;
  };

  return {
    oncreate: ({ dom, attrs }) => {
      const { responsiveThreshold = 768 } = attrs;
      setupParallax(dom as HTMLElement, responsiveThreshold);
    },

    onremove: () => {
      cleanup();
    },

    view: ({ attrs }) => {
      const { src, alt = '' } = attrs;

      if (!src) return undefined;

      return m('.parallax-container', [
        m('.parallax', [
          m('img', {
            src,
            alt,
            onerror: (e: Event) => {
              console.warn('Parallax image failed to load:', src);
              const img = e.target as HTMLImageElement;
              img.style.backgroundColor = '#ddd';
              img.alt = 'Image failed to load';
            },
          }),
        ]),
      ]);
    },
  };
};
